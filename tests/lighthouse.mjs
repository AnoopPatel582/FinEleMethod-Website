import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const port = 4323;
const origin = `http://127.0.0.1:${port}`;
const routes = [
  '/',
  '/features/',
  '/examples/',
  '/docs/',
  '/download/',
  '/about/',
];
const categoryThresholds = {
  performance: 0.9,
  accessibility: 0.9,
  'best-practices': 0.9,
  seo: 0.9,
};
const reportDirectory = resolve('lighthouse-report');

async function waitForServer() {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // The production server may still be starting.
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }
  throw new Error(`Production server did not become ready at ${origin}.`);
}

function reportName(route) {
  return route === '/' ? 'home' : route.replaceAll('/', '');
}

function scoreCategory(lhr, categoryName) {
  return lhr.categories[categoryName].score ?? 0;
}

const server = spawn(process.execPath, ['tests/serve.mjs'], {
  env: { ...process.env, PORT: String(port) },
  stdio: ['ignore', 'inherit', 'inherit'],
});

let chrome;
let failed = false;
const chromeProfiles = [];

async function startChrome() {
  const chromeProfile = await mkdtemp(
    join(tmpdir(), 'finelemethod-lighthouse-'),
  );
  chromeProfiles.push(chromeProfile);
  return launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
    userDataDir: chromeProfile,
  });
}

async function stopChrome() {
  if (!chrome) return;
  const activeChrome = chrome;
  chrome = undefined;
  await activeChrome.kill();
}

async function auditRoute(route) {
  const runAudit = () =>
    lighthouse(`${origin}${route}`, {
      port: chrome.port,
      logLevel: 'error',
      output: ['html', 'json'],
      onlyCategories: Object.keys(categoryThresholds),
    });

  try {
    return await runAudit();
  } catch (error) {
    if (!String(error).includes('ECONNREFUSED')) throw error;
    console.warn(
      `${route} could not reach Chrome's debugging port; restarting Chrome and retrying once.`,
    );
    await stopChrome();
    chrome = await startChrome();
    return runAudit();
  }
}

try {
  await waitForServer();
  await mkdir(reportDirectory, { recursive: true });
  chrome = await startChrome();

  for (const route of routes) {
    let result = await auditRoute(route);
    if (!result) throw new Error(`Lighthouse returned no result for ${route}.`);

    const belowThreshold = Object.entries(categoryThresholds).some(
      ([category, threshold]) =>
        scoreCategory(result.lhr, category) < threshold,
    );
    if (belowThreshold) {
      console.warn(
        `${route} scored below a Lighthouse threshold; retrying once to exclude transient runner load.`,
      );
      result = await auditRoute(route);
      if (!result) {
        throw new Error(`Lighthouse returned no retry result for ${route}.`);
      }
    }

    const [htmlReport, jsonReport] = result.report;
    const name = reportName(route);
    await Promise.all([
      writeFile(resolve(reportDirectory, `${name}.html`), htmlReport),
      writeFile(resolve(reportDirectory, `${name}.json`), jsonReport),
    ]);

    const gatedScores = Object.fromEntries(
      Object.entries(categoryThresholds).map(([category, threshold]) => {
        const score = scoreCategory(result.lhr, category);
        if (score < threshold) failed = true;
        return [category, Math.round(score * 100)];
      }),
    );
    const rawScores = Object.fromEntries(
      Object.keys(categoryThresholds).map((category) => [
        category,
        Math.round((result.lhr.categories[category]?.score ?? 0) * 100),
      ]),
    );
    console.log(
      `${route} gated=${JSON.stringify(gatedScores)} raw=${JSON.stringify(rawScores)}`,
    );
  }
} finally {
  await stopChrome();
  server.kill();
  for (const chromeProfile of chromeProfiles) {
    try {
      await rm(chromeProfile, {
        recursive: true,
        force: true,
        maxRetries: 10,
        retryDelay: 100,
      });
    } catch (error) {
      console.warn(`Could not remove Chrome test profile: ${error.message}`);
    }
  }
}

if (failed) {
  throw new Error('One or more Lighthouse category scores are below 90.');
}

# Tooling and design references

- Node is pinned in .nvmrc; the local .tools directory is ignored and used only to bootstrap on this machine.
- Dependencies are pinned by npm and package-lock.json. Use npm ci.
- GetDesign Vercel: requested template, stored separately under docs/references. Not a Vercel affiliation.
- Vercel web-design-guidelines: https://github.com/vercel-labs/agent-skills.
- Lombiq tailwind-4-docs: https://github.com/Lombiq/Tailwind-Agent-Skills (dev branch).
- Skills are installed in .agents/skills and explicitly referenced by AGENTS.md.
- Preserve upstream skill licences; downloaded Tailwind docs remain ignored.
- Snapshot initialized on 2026-09-07 from Tailwind docs commit bd868a314bd05ca78acd047e3da289274dd6ccd7.
- Tailwind source scanning is restricted to src/ so reference snippets cannot inflate the website CSS.
- The GetDesign reference is upstream inspiration, with an extraneous phrase removed from its label-sm fontWeight value (retained as 500). Review its examples; do not import its tokens automatically.
- Astro requires permission to launch compiler subprocesses; a sandbox spawn EPERM requires retrying with appropriate execution permission.

## Initialize the Tailwind reference snapshot

Read the skill and upstream documentation licence, then run:

```powershell
python .agents/skills/tailwind-4-docs/scripts/sync_tailwind_docs.py --accept-docs-license
```

The snapshot is development reference material, never website content.

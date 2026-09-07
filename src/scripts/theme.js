// Runs in <head> before first paint; shared by every page.
(() => {
  const key = 'finelemethod-theme';
  const root = document.documentElement;
  const valid = (value) => value === 'light' || value === 'dark';
  let preference = 'system';
  try {
    const saved = localStorage.getItem(key);
    if (valid(saved)) preference = saved;
  } catch {
    /* Storage may be blocked; controls still work for this page. */
  }
  const media = window.matchMedia('(prefers-color-scheme: light)');
  const apply = () => {
    const theme =
      preference === 'system' ? (media.matches ? 'light' : 'dark') : preference;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#f5f7fa' : '#0b1220');
    document.querySelectorAll('[data-theme-select]').forEach((select) => {
      if (select instanceof HTMLSelectElement) select.value = preference;
    });
  };
  apply();
  media.addEventListener('change', () => {
    if (preference === 'system') apply();
  });
  window.addEventListener('storage', (event) => {
    if (event.key === key || event.key === null) {
      preference = valid(event.newValue) ? event.newValue : 'system';
      apply();
    }
  });
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      document.querySelectorAll('[data-theme-control]').forEach((control) => {
        if (control instanceof HTMLElement) control.hidden = false;
      });
      apply();
      document.querySelectorAll('[data-theme-select]').forEach((select) => {
        select.addEventListener('change', () => {
          if (!(select instanceof HTMLSelectElement)) return;
          preference = valid(select.value) ? select.value : 'system';
          try {
            if (preference === 'system') localStorage.removeItem(key);
            else localStorage.setItem(key, preference);
          } catch {
            /* Keep the choice in memory when storage is denied. */
          }
          apply();
        });
      });
    },
    { once: true },
  );
})();

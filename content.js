// Inject page-world script, then act as storage <-> page bridge.
const s = document.createElement('script');
s.src = chrome.runtime.getURL('inject.js');
s.onload = () => s.remove();
(document.head || document.documentElement).appendChild(s);

const STORAGE_KEYS = ['detectedLocale', 'localAction', 'defaultAction'];

function readSettingsOnce() {
  return new Promise((resolve) => {
    const tryArea = (area, fallback) => {
      try {
        area.get(STORAGE_KEYS, (result) => {
          if (chrome.runtime.lastError) fallback();
          else resolve(result || {});
        });
      } catch (_) {
        fallback();
      }
    };
    tryArea(chrome.storage.sync, () => tryArea(chrome.storage.local, () => resolve({})));
  });
}

function post(settings) {
  window.postMessage({ type: 'YTAutoCC:settings', settings }, '*');
}

readSettingsOnce().then(post);

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== 'sync' && areaName !== 'local') return;
  const relevant = STORAGE_KEYS.some((k) => k in changes);
  if (!relevant) return;
  readSettingsOnce().then(post);
});

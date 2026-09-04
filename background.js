// Chrome MV3 service worker. Handles first-install defaults for v0.3.0.
// Kept ES-module-free so it works as a plain service worker.

importScripts('languages.js');

const STORAGE_KEYS = ['detectedLocale', 'localAction', 'defaultAction'];

async function readSettings() {
  const areas = [chrome.storage.sync, chrome.storage.local];
  for (const area of areas) {
    try {
      return await new Promise((resolve, reject) => {
        area.get(STORAGE_KEYS, (result) => {
          if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
          else resolve(result);
        });
      });
    } catch (_) {
      continue;
    }
  }
  return {};
}

async function writeSettings(settings) {
  const areas = [chrome.storage.sync, chrome.storage.local];
  for (const area of areas) {
    try {
      await new Promise((resolve, reject) => {
        area.set(settings, () => {
          if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
          else resolve();
        });
      });
      return;
    } catch (_) {
      continue;
    }
  }
}

function resolveInitialLocale(uiLang) {
  if (!uiLang) return 'en';
  const lower = uiLang.toLowerCase();
  if (LANGUAGES[lower]) return lower;
  const prefix = lower.split('-')[0];
  if (LANGUAGES[prefix]) return prefix;
  return 'en';
}

chrome.runtime.onInstalled.addListener(async (details) => {
  const existing = await readSettings();
  const hasAny = STORAGE_KEYS.some((k) => existing[k] !== undefined);
  if (hasAny) return; // already initialized (upgrade path with prior v0.3.0+ settings)

  const detected = resolveInitialLocale(chrome.i18n.getUILanguage());
  await writeSettings({
    detectedLocale: detected,
    localAction: detected,
    defaultAction: 'en',
  });
  console.log('[YT Auto CC] Initialized settings:', { detectedLocale: detected, localAction: detected, defaultAction: 'en' });
});

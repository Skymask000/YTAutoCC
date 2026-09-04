const STORAGE_KEYS = ['detectedLocale', 'localAction', 'defaultAction'];

function labelFor(code) {
  const entry = LANGUAGES[code];
  if (!entry) return code;
  if (!entry.endonym || entry.endonym === entry.english) return entry.english;
  return entry.endonym + ' (' + entry.english + ')';
}

function makeOption(value, label, selected) {
  const o = document.createElement('option');
  o.value = value;
  o.textContent = label;
  if (selected) o.selected = true;
  return o;
}

function sortedLanguageCodes() {
  const codes = Object.keys(LANGUAGES);
  const collator = new Intl.Collator(undefined, { sensitivity: 'base' });
  codes.sort((a, b) => collator.compare(LANGUAGES[a].endonym, LANGUAGES[b].endonym));
  return codes;
}

function populateLocaleSelect(select, current) {
  select.innerHTML = '';
  for (const code of sortedLanguageCodes()) {
    select.appendChild(makeOption(code, labelFor(code), code === current));
  }
}

function populateActionSelect(select, current, i18n) {
  select.innerHTML = '';
  select.appendChild(makeOption('source', '\u21bb ' + i18n.useOriginal, current === 'source'));
  select.appendChild(makeOption('off', '\u2298 ' + i18n.noCaptions, current === 'off'));
  const sep = makeOption('', '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', false);
  sep.disabled = true;
  select.appendChild(sep);
  for (const code of sortedLanguageCodes()) {
    select.appendChild(makeOption(code, labelFor(code), code === current));
  }
}

function readSettings() {
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

function writeOne(key, value) {
  const obj = { [key]: value };
  const tryArea = (area, fallback) => {
    try {
      area.set(obj, () => {
        if (chrome.runtime.lastError) fallback();
      });
    } catch (_) {
      fallback();
    }
  };
  tryArea(chrome.storage.sync, () => tryArea(chrome.storage.local, () => {}));
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const msg = chrome.i18n.getMessage(key);
    if (msg) {
      if (el.tagName === 'TITLE') document.title = msg;
      else el.textContent = msg;
    }
  });
}

async function init() {
  applyI18n();

  const i18n = {
    useOriginal: chrome.i18n.getMessage('useOriginal') || 'Use original language',
    noCaptions: chrome.i18n.getMessage('noCaptions') || 'No captions',
  };

  const settings = await readSettings();
  const detected = settings.detectedLocale || 'en';
  const localAction = settings.localAction || detected;
  const defaultAction = settings.defaultAction || 'en';

  const localeSelect = document.getElementById('my-local-language');
  const localSelect = document.getElementById('local-action');
  const defaultSelect = document.getElementById('default-action');

  populateLocaleSelect(localeSelect, detected);
  populateActionSelect(localSelect, localAction, i18n);
  populateActionSelect(defaultSelect, defaultAction, i18n);

  localeSelect.addEventListener('change', () => writeOne('detectedLocale', localeSelect.value));
  localSelect.addEventListener('change', () => writeOne('localAction', localSelect.value));
  defaultSelect.addEventListener('change', () => writeOne('defaultAction', defaultSelect.value));
}

init();

#!/usr/bin/env node
// Generates _locales/<code>/messages.json for every entry in scripts/i18n-map.js.
// Run: node scripts/generate-locales.js
// Reruns are safe — overwrites existing files.

const fs = require('fs');
const path = require('path');
const { LANGUAGES } = require('../languages.js');
const map = require('./i18n-map.js');

const ROOT = path.join(__dirname, '..');
const LOCALES_DIR = path.join(ROOT, '_locales');

const EN = require('../_locales/en/messages.json');

let written = 0;
let skipped = 0;

for (const code of Object.keys(LANGUAGES)) {
  if (code === 'en') { skipped++; continue; }
  const t = map[code];
  if (!t) {
    console.warn('SKIP', code, '(no entry in i18n-map.js)');
    skipped++;
    continue;
  }
  const folder = code.replace('-', '_');
  const dir = path.join(LOCALES_DIR, folder);
  fs.mkdirSync(dir, { recursive: true });

  const out = {
    extName: { message: EN.extName.message, description: EN.extName.description },
    extDescription: { message: t.extDescription, description: EN.extDescription.description },
    myLocalLang: { message: t.myLocalLang, description: EN.myLocalLang.description },
    forLocalVideos: { message: t.forLocalVideos, description: EN.forLocalVideos.description },
    forOtherVideos: { message: t.forOtherVideos, description: EN.forOtherVideos.description },
    useOriginal: { message: t.useOriginal, description: EN.useOriginal.description },
    noCaptions: { message: t.noCaptions, description: EN.noCaptions.description },
    applyNote: { message: t.applyNote, description: EN.applyNote.description },
    autoDetected: { message: t.autoDetected, description: EN.autoDetected.description },
  };

  fs.writeFileSync(path.join(dir, 'messages.json'), JSON.stringify(out, null, 2) + '\n', 'utf8');
  written++;
}

console.log(`Generated: ${written} locale files. Skipped: ${skipped}.`);

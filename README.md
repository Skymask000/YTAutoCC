# YouTube Auto-Generated CC

Chrome/Edge extension. Automatically enables YouTube's auto-generated closed captions on every video, using per-language rules you set once.

## What it does

Every time you open a YouTube watch page, the extension picks the right auto-generated caption track for you — no more clicking through the CC menu on every video.

You set two rules in a small popup:

- **For videos in your local language** — show them in that language, in the video's original language, or don't show captions at all.
- **For all other videos** — translate to your preferred language, keep them in the original, or don't show captions.

Your "local language" is auto-detected from your browser's UI language on first install, and you can change it any time.

## Examples

- **Romanian speaker who understands English:** local = Romanian → show Romanian captions natively. Other → translate to English. Any French/Spanish/Japanese video gets English captions automatically; Romanian videos stay in Romanian.
- **English speaker learning Spanish:** local = English → show English. Other → use original language. Spanish videos get Spanish captions (great for language learning), English videos get English.
- **Prefers no captions on native tongue:** local = No captions; other = translate to English. Native-language videos stay clean, foreign videos get translated.

## Install

**From the Chrome Web Store:** (link forthcoming)

**Load unpacked for development:**

1. Clone this repo:
   ```
   git clone https://github.com/Skymask000/YTAutoCC.git
   ```
2. Open `chrome://extensions/` (or `edge://extensions/`).
3. Toggle **Developer mode**.
4. Click **Load unpacked** → select the cloned folder.

## Features

- Auto-detects your local language from your browser on first install; you can change it any time in the popup.
- Supports ~130 languages via native YouTube ASR + auto-translation.
- Prefers native ASR tracks when available (for multi-audio / AI-dubbed videos), falls back to translation when not.
- Popup UI localized into ~130 languages via Chrome's built-in `_locales` system.
- Live-apply: change a setting and it takes effect on the currently open video, no reload needed.
- Zero data collection. Zero network requests. Everything runs locally in the browser.

## Privacy

Full policy: [PRIVACY.md](PRIVACY.md).

Summary: three preference fields stored in `chrome.storage.sync` (so they follow you across your Chrome devices via built-in browser sync). No browsing history, no video watch history, no analytics, no telemetry, no servers. The extension makes zero network requests.

## Tech stack

- Chrome/Edge Manifest V3 extension
- Vanilla JavaScript, HTML, CSS — no framework, no bundler, no build step
- Two-file page-world/isolated-world architecture (`content.js` isolated-world bridge, `inject.js` page-world logic)
- Chrome's built-in `_locales/` system for UI localization
- `chrome.storage.sync` for cross-device settings, with fallback to `chrome.storage.local`

## Development

No test runner — the extension's behavior is verified via manual smoke tests in Chrome/Edge. See `HANDOFF.md` at the repo root for architecture notes, and `docs/superpowers/` for design specs and implementation plans.

## License

Not specified yet.

(() => {
  const READY_TIMEOUT_MS = 5000;
  const CAPTIONS_LOAD_TIMEOUT_MS = 2000;
  const POLL_INTERVAL_MS = 100;

  const isWatchPage = () => location.pathname === '/watch';

  const waitForPlayer = () => new Promise((resolve) => {
    const start = performance.now();
    const tick = () => {
      const p = document.getElementById('movie_player');
      const ready = p
        && typeof p.getOption === 'function'
        && typeof p.setOption === 'function'
        && typeof p.loadModule === 'function';
      if (ready) { resolve(p); return; }
      if (performance.now() - start > READY_TIMEOUT_MS) { resolve(null); return; }
      requestAnimationFrame(tick);
    };
    tick();
  });

  const getTracklist = async (player) => {
    let tracks;
    try {
      tracks = player.getOption('captions', 'tracklist', { includeAsr: true });
    } catch (_) { tracks = null; }
    if (tracks && tracks.length) return tracks;
    try { player.loadModule('captions'); } catch (_) { return null; }
    const start = performance.now();
    while (performance.now() - start < CAPTIONS_LOAD_TIMEOUT_MS) {
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
      try {
        tracks = player.getOption('captions', 'tracklist', { includeAsr: true });
        if (tracks && tracks.length) return tracks;
      } catch (_) {}
    }
    return null;
  };

  const normLang = (t) => (t.languageCode || '').toLowerCase();
  const normCode = (c) => (c || '').toLowerCase();

  const pickTrackAndTranslation = (asrTracks, settings) => {
    if (!asrTracks.length) return null;
    const isLocalVideo = normLang(asrTracks[0]) === normCode(settings.detectedLocale);
    const action = isLocalVideo ? settings.localAction : settings.defaultAction;
    if (action === 'off') return { track: null, translationLanguage: null };
    if (action === 'source') return { track: asrTracks[0], translationLanguage: null };
    const nativeMatch = asrTracks.find((t) => normLang(t) === normCode(action));
    if (nativeMatch) return { track: nativeMatch, translationLanguage: null };
    return { track: asrTracks[0], translationLanguage: { languageCode: action } };
  };

  let currentSettings = null;

  const run = async () => {
    if (!isWatchPage()) return;
    if (!currentSettings) return; // wait for first settings message
    const player = await waitForPlayer();
    if (!player) return;
    const tracks = await getTracklist(player);
    if (!tracks) return;
    const asrTracks = tracks.filter((t) => t.kind === 'asr');
    const pick = pickTrackAndTranslation(asrTracks, currentSettings);
    if (!pick || !pick.track) return; // no-op case
    try {
      player.setOption('captions', 'track', pick.track);
      try { player.setOption('captions', 'translationLanguage', pick.translationLanguage); } catch (_) {}
      const label = pick.track.languageName || pick.track.languageCode;
      const suffix = pick.translationLanguage ? ` → ${pick.translationLanguage.languageCode}` : '';
      console.log('[YT Auto CC] Enabled:', label + suffix);
    } catch (e) {
      console.log('[YT Auto CC] setOption failed:', e);
    }
  };

  window.addEventListener('message', (ev) => {
    if (ev.source !== window) return;
    const data = ev.data;
    if (!data || data.type !== 'YTAutoCC:settings') return;
    currentSettings = data.settings || {};
    console.log('[YT Auto CC] Settings received:', currentSettings);
    run();
  });

  document.addEventListener('yt-navigate-finish', run);
  // NOTE: no immediate run() here — settings arrive asynchronously; the settings
  // listener triggers the initial run once currentSettings is populated.
})();

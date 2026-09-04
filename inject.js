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
      if (ready) {
        resolve(p);
        return;
      }
      if (performance.now() - start > READY_TIMEOUT_MS) {
        resolve(null);
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();
  });

  const getTracklist = async (player) => {
    let tracks;
    try {
      tracks = player.getOption('captions', 'tracklist', { includeAsr: true });
    } catch (_) {
      tracks = null;
    }
    if (tracks && tracks.length) return tracks;

    try {
      player.loadModule('captions');
    } catch (_) {
      return null;
    }

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

  const isLang = (t, code) => (t.languageCode || '').toLowerCase().split('-')[0] === code;

  const run = async () => {
    if (!isWatchPage()) return;
    const player = await waitForPlayer();
    if (!player) return;
    const tracks = await getTracklist(player);
    if (!tracks) return;
    const asrTracks = tracks.filter((t) => t.kind === 'asr');
    if (!asrTracks.length) return;

    const roAsr = asrTracks.find((t) => isLang(t, 'ro'));
    const enAsr = asrTracks.find((t) => isLang(t, 'en'));
    const primaryAsr = asrTracks[0];
    const originalIsRomanian = isLang(primaryAsr, 'ro');

    let track;
    let translationLanguage = null;
    if (originalIsRomanian) {
      track = roAsr || primaryAsr;
    } else if (enAsr) {
      track = enAsr;
    } else {
      track = primaryAsr;
      translationLanguage = { languageCode: 'en' };
    }

    try {
      player.setOption('captions', 'track', track);
      try { player.setOption('captions', 'translationLanguage', translationLanguage); } catch (_) {}
      const label = track.languageName || track.languageCode;
      const suffix = translationLanguage ? ` → ${translationLanguage.languageCode}` : '';
      console.log('[YT Auto CC] Enabled:', label + suffix);
    } catch (e) {
      console.log('[YT Auto CC] setOption failed:', e);
    }
  };

  document.addEventListener('yt-navigate-finish', run);
  run();
})();

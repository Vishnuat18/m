/* Desk Buddy widget: drop-in, zero dependencies.
   Positioned bottom-left, smooth image slides every 4 seconds, zero walking animation.
   Usage:
     <link rel="stylesheet" href="desk-buddy.css">
     <script src="desk-buddy.js"></script>
   Optional custom configuration (place before script tag):
     window.DeskBuddyConfig = { path: 'assets/', interval: 4000, autoplay: true, messages: [...] };
*/
(function () {
  const cfg = Object.assign({
    path: 'assets/',
    interval: 4000,
    autoplay: true,
    messages: [
      ['Sending you finger hearts!', '💕'],
      ['Peace! You’re doing great.', '✌️'],
      ['Hey you! Great job today!', '🎉'],
      ['Oh, hi! Didn’t see you there.', '👀'],
      ['A big heart from me to you.', '💗'],
      ['Aww, thank you so much!', '🥹'],
      ['Hehe, you’re making me blush.', '🌸'],
      ['Shhh… focus time. I’ve got you.', '🤫'],
      ['Wait up! Are you coming?', '🏃'],
      ['Bye bye! See you soon!', '👋']
    ]
  }, window.DeskBuddyConfig || {});

  const N = cfg.messages.length;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const frames = cfg.messages.map((_, idx) => cfg.path + 'pose-' + String(idx + 1).padStart(2, '0') + '.jpg');

  // Preload all frames
  frames.forEach(src => {
    const im = new Image();
    im.src = src;
  });

  // Construct UI
  const root = document.createElement('div');
  root.className = 'db-root';
  root.innerHTML = `
    <div class="db-msg" aria-live="polite"></div>
    <div class="db-char">
      <img alt="Desk buddy reaction">
    </div>
    <button class="db-close" aria-label="Hide desk buddy" title="Hide">×</button>
    <button class="db-open" aria-label="Show desk buddy" title="Show">💕</button>
  `;
  document.body.appendChild(root);

  const msg = root.querySelector('.db-msg');
  const char = root.querySelector('.db-char');
  const img = char.querySelector('img');
  let i = -1;
  let timer = null;
  let busy = false;

  // Fallback to site/assets/ if assets/ path fails in root context
  img.addEventListener('error', function () {
    if (!this.dataset.fallbackTried) {
      this.dataset.fallbackTried = '1';
      const file = frames[i] ? frames[i].split('/').pop() : 'pose-01.jpg';
      this.src = 'site/assets/' + file;
    }
  });

  function burst(e) {
    if (!e) return;
    for (let k = 0; k < 5; k++) {
      const s = document.createElement('span');
      s.className = 'db-p';
      s.textContent = e;
      s.style.left = (18 + Math.random() * 58) + '%';
      s.style.top = (8 + Math.random() * 26) + '%';
      s.style.setProperty('--dx', (Math.random() * 90 - 45) + 'px');
      s.style.setProperty('--r', (Math.random() * 40 - 20) + 'deg');
      s.style.animationDelay = (k * 70) + 'ms';
      char.appendChild(s);
      setTimeout(() => s.remove(), 1600);
    }
  }

  async function show(n, immediate = false) {
    if (busy) return;
    busy = true;
    i = ((n % N) + N) % N;

    // Smooth horizontal slide transition without any walking/squashing
    if (!immediate && img.src) {
      char.classList.add('slide-out');
      await sleep(180);
      img.dataset.fallbackTried = '';
      img.src = frames[i];
      char.classList.remove('slide-out');
      char.classList.add('slide-in-start');
      void char.offsetHeight; // trigger reflow for smooth slide-in
      char.classList.remove('slide-in-start');
    } else {
      img.dataset.fallbackTried = '';
      img.src = frames[i];
    }

    // Update speech bubble with pop-in
    msg.style.animation = 'none';
    void msg.offsetWidth;
    msg.style.animation = '';
    msg.textContent = cfg.messages[i][0] + ' ' + cfg.messages[i][1];

    burst(cfg.messages[i][1]);
    busy = false;
    schedule();
  }

  function schedule() {
    clearTimeout(timer);
    if (cfg.autoplay && !document.hidden && !root.classList.contains('db-min')) {
      timer = setTimeout(() => show(i + 1), cfg.interval);
    }
  }

  // Tap desk buddy to manually cycle to next reaction slide
  char.addEventListener('click', () => {
    show(i + 1);
  });

  // Minimize and restore buttons
  root.querySelector('.db-close').onclick = (e) => {
    e.stopPropagation();
    root.classList.add('db-min');
    clearTimeout(timer);
  };

  root.querySelector('.db-open').onclick = (e) => {
    e.stopPropagation();
    root.classList.remove('db-min');
    show(i + 1, true);
  };

  document.addEventListener('visibilitychange', schedule);

  // Global control API
  window.DeskBuddy = {
    show: idx => show(idx, false),
    next: () => show(i + 1, false),
    prev: () => show(i - 1, false),
    say: (text, emoji = '') => {
      msg.textContent = text + (emoji ? ' ' + emoji : '');
      if (emoji) burst(emoji);
    },
    minimize: () => {
      root.classList.add('db-min');
      clearTimeout(timer);
    },
    maximize: () => {
      root.classList.remove('db-min');
      show(i, true);
    },
    getIndex: () => i,
    getConfig: () => cfg
  };

  // Initial load: show first pose
  show(0, true);
})();

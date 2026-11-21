
    // ===== SITE ENTRANCE (Synchronized with Archives - Mobile) =====
    let currentPass = '';
    const validPasscodes = ['2211', '1204'];

    function openDoors() {
      const dl = document.getElementById('door-layer');
      if (dl && !dl.classList.contains('open')) {
        dl.classList.add('open');
        setTimeout(() => {
          document.getElementById('lock-layer').classList.remove('hidden');
        }, 900);
      }
    }

    function dial(val) {
      const dots = document.querySelectorAll('#pass-display .dot');
      if (val === 'clear') {
        currentPass = '';
      } else if (val === 'del') {
        currentPass = currentPass.slice(0, -1);
      } else if (val === 'verify') {
        if (currentPass.length === 4) {
          if (validPasscodes.includes(currentPass)) unlockVault();
          else triggerError();
        } else triggerError();
        return;
      } else if (currentPass.length < 4) {
        currentPass += val;
      }

      dots.forEach((dot, i) => dot.classList.toggle('active', i < currentPass.length));
      if (currentPass.length === 4 && val !== 'verify') {
        setTimeout(() => dial('verify'), 300);
      }
    }

    // Keyboard support for mobile external keyboards
    window.addEventListener('keydown', e => {
      if (document.getElementById('lock-layer').classList.contains('hidden')) return;
      if (e.key >= '0' && e.key <= '9') dial(e.key);
      if (e.key === 'Backspace') dial('del');
      if (e.key === 'Enter') dial('verify');
    });

    function triggerError() {
      const dots = document.querySelectorAll('#pass-display .dot');
      document.getElementById('pass-display').classList.add('shake');
      document.getElementById('lock-err').classList.add('visible');
      setTimeout(() => {
        currentPass = '';
        dots.forEach(dot => dot.classList.remove('active'));
        document.getElementById('pass-display').classList.remove('shake');
        document.getElementById('lock-err').classList.remove('visible');
      }, 800);
    }

    function unlockVault() {
      document.getElementById('lock-layer').classList.add('hidden');
      const msgLayer = document.getElementById('msg-layer');
      msgLayer.classList.add('active');
      
      const txt = document.getElementById('welcome-text');
      const hint = document.getElementById('hint-text');
      
      const messages = [
        "Oru chinna surprise iruku... ❃",
        "I wish to give this to you at the last birthday, but I couldn't because we were lost in the silence of our own wounds. ❦",
        "I wanted to reach out, but the words were stuck in my throat, and the distance felt like an ocean we couldn't cross. ✧",
        "But today, I'm bringing back every memory, every whisper, and every moment we shared. ❂",
        "This isn't just a website; it's the heartbeat of our story that never stopped beating for you. ❃",
        "Happy Birthday, Maheswari ✾ ✦"
      ];
      
      let step = 0;
      const interval = setInterval(() => {
        txt.classList.remove('show');
        setTimeout(() => {
          if (step < messages.length) {
            txt.textContent = messages[step];
            txt.classList.add('show');
            step++;
          } else {
            clearInterval(interval);
            hint.classList.add('show');
            setTimeout(revealSite, 2000);
          }
        }, 800);
      }, 3000);
      
      if (!mPlaying) toggleMusic();
    }

    function revealSite() {
      const main = document.getElementById('main-site');
      main.style.display = 'block';
      document.body.classList.remove('locked');
      document.body.style.overflow = 'auto';
      
      setTimeout(() => {
        const msg = document.getElementById('msg-layer');
        if (msg) msg.style.opacity = '0';
        main.style.visibility = 'visible';
        main.style.opacity = '1';
        main.style.transition = 'opacity 2.5s cubic-bezier(0.16, 1, 0.3, 1)';
      }, 100);

      setTimeout(() => {
        const layers = ['msg-layer', 'lock-layer', 'door-layer'];
        layers.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.remove();
        });
      }, 3000);
    }

    // Legacy support
    function enterSite() { revealSite(); }

    // ===== CHAPTER LETTER POP (IntersectionObserver) =====
    const letterObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelector('.chapter-letter-bg')?.classList.add('pop-in');
        }
      });
    }, { threshold: 0.35 });
    document.querySelectorAll('.chapter').forEach(ch => letterObs.observe(ch));

    // Feedback logic
    let userRating = 0;
    function setRating(val) {
      userRating = val;
      const stars = document.querySelectorAll('.star');
      stars.forEach((s, i) => {
        s.classList.toggle('active', i < val);
      });
      checkFormValidity();
    }

    function checkFormValidity() {
      const text = (document.getElementById('feed-text')?.value || '').trim();
      const btn = document.getElementById('submit-btn');
      if (btn) {
        if (userRating > 0 || text.length > 0) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      }
    }

    let isRecording = false;
    function toggleVoice() {
      const btn = document.getElementById('voice-btn');
      const text = document.getElementById('voice-text');
      isRecording = !isRecording;
      if (isRecording) {
        btn.classList.add('recording');
        text.textContent = 'Listening to your voice...';
        setTimeout(() => {
          if (isRecording) toggleVoice();
          const feedText = document.getElementById('feed-text');
          if (feedText && !feedText.value) {
            feedText.value = 'Happy Birthday Vishnu! Everything is so beautiful and special. ❦';
            checkFormValidity();
          }
          alert("Voice captured! ❦");
        }, 4000);
      } else {
        btn.classList.remove('recording');
        text.textContent = 'Voice Captured';
      }
    }

    function submitFeedback() {
      const fbData = {
        rating: userRating,
        feeling: (document.getElementById('feed-text')?.value || '').trim(),
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('mahiFeedback', JSON.stringify(fbData));
      alert("Thank you Maheswari! Your feelings have been woven into the story forever. ❦");
    }

    // Existing Stars Canvas Logic
    const canvas = document.getElementById('sc'), ctx = canvas.getContext('2d'); let stars = [];
    function rc() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    function is() { stars = []; for (let i = 0; i < 140; i++)stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.2 + .2, speed: Math.random() * .003 + .001, tw: Math.random() * Math.PI * 2 }); }
    function ds() { ctx.clearRect(0, 0, canvas.width, canvas.height); stars.forEach(s => { s.tw += s.speed; const a = .2 + .5 * Math.abs(Math.sin(s.tw)); ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(200,180,232,${a})`; ctx.fill(); }); requestAnimationFrame(ds); }
    rc(); is(); ds(); window.addEventListener('resize', () => { rc(); is(); });

    // ===== PETALS (fewer on mobile for perf) =====
    function cp() {
      const p = document.createElement('div'); p.className = 'petal';
      const s = ['✿', '❀', '✾', '❁', '·'];
      p.textContent = s[Math.floor(Math.random() * s.length)];
      p.style.cssText = `left:${Math.random() * 100}%;font-size:${6 + Math.random() * 10}px;animation-duration:${10 + Math.random() * 15}s;animation-delay:${Math.random() * 3}s;color:rgba(200,150,232,${.1 + Math.random() * .2});`;
      document.getElementById('petals').appendChild(p);
      setTimeout(() => p.remove(), 28000);
    }
    setInterval(cp, 1600);

    // ===== PROGRESS BAR =====
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      document.getElementById('progress-bar').style.width = pct + '%';
    }, { passive: true });

    // ===== MUSIC =====
    const chapterSongs=[
      {title:'Kiss the Rain', ch:'Chapter I — Making', file: 'Music/kiss_d_rain_x_river --1.mp3'},
      {title:'Nuvole Bianche', ch:'Chapter II — Always', file: 'Music/nuvole_bianche_wedding --2.mp3'},
      {title:'A Thousand Years', ch:'Chapter III — Holding', file: 'Music/A_Thousand_years --3.mp3'},
      {title:"Comptine d'un autre été", ch:'Chapter IV — Every Day', file: "Music/Yann Tiersen - Comptine d'un autre été (Amélie) --4.mp3"},
      {title:'Experience (Slowed)', ch:'Chapter V — Storms', file: 'Music/Ludovico Einaudi - Experience (Slowed)  --5.mp3'},
      {title:'The Night We Met', ch:'Chapter VI — Wounds', file: 'Music/The night we met --6.m4a'},
      {title:'Your Hand in Mine', ch:'Chapter VII — Apart', file: 'Music/your hand in mine --7.m4a'},
      {title:'Dandelions Violin', ch:'Chapter VIII — Returning', file: 'Music/dandelions_violin  --8.mp3'},
      {title:'Kamin', ch:'Chapter IX — Infinity', file: 'Music/kamin --9.m4a'},
    ];
    let mPlaying=false,mIdx=0,mAudio=null;
    function toggleMusic(){
      mPlaying=!mPlaying;
      const btn = document.getElementById('mplay');
      if (mPlaying) {
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
      } else {
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"></path></svg>`;
      }
      document.getElementById('mdisc').classList.toggle('paused',!mPlaying);
      document.getElementById('mwaves').classList.toggle('paused',!mPlaying);
      if (mPlaying) {
        if (mAudio) mAudio.play();
        else updateMusicChapter(mIdx);
      } else {
        if (mAudio) mAudio.pause();
      }
    }
    function updateMusicChapter(idx){
      if(idx===mIdx && mAudio)return;
      mIdx=idx;
      const s=chapterSongs[idx];
      document.getElementById('mtitle').textContent=s.title;
      document.getElementById('mchap').textContent=s.ch;
      const mp=document.getElementById('music-player');
      mp.style.borderColor='rgba(155,114,207,.6)';
      setTimeout(()=>mp.style.borderColor='rgba(155,114,207,.25)',1500);

      if (mAudio) {
        mAudio.pause();
      }
      mAudio = new Audio(s.file);
      mAudio.loop = true;
      mAudio.volume = 0.5;
      if (mPlaying) {
        mAudio.play();
      }
    }

    // (Sequence handled by unlockVault above)



    // ===== CHAPTER OBSERVER =====
    const chSecs = document.querySelectorAll('.chapter[data-chapter]');
    const chObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = parseInt(e.target.dataset.chapter);
          updateMusicChapter(idx);
        }
      });
    }, { threshold: 0.4 });
    chSecs.forEach(s => chObs.observe(s));

    // ===== REVEAL =====
    const revEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
    const ro = new IntersectionObserver(en => { en.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: .1 });
    revEls.forEach(el => ro.observe(el));

    // ===== NAV ACTIVE =====
    const navLinks = document.querySelectorAll('.nav-letter');
    const navIds = ['ch-m', 'ch-a', 'ch-h', 'ch-e', 'ch-s', 'ch-w', 'ch-a2', 'ch-r', 'ch-i'];
    const navObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
          // scroll nav to active
          const active = document.querySelector('.nav-letter.active');
          if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });
    }, { threshold: .35 });
    navIds.forEach(id => { const el = document.getElementById(id); if (el) navObs.observe(el); });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // ===== GALLERY =====
    const captions = ['College days', 'First smiles', 'Bus memories', 'Mall moments', 'Ice cream days', 'Happy chaos', 'Late night vibes', 'Saree memory', 'Feb 14', 'Video call days', 'Favourite laugh', 'Quiet moment', 'Our fights', 'Our making up', 'Birthday wishes', 'Class memories', 'Nicknames era', 'Kolandha days', 'Thakkali days', 'Korangu energy', 'Ammu always', 'Dec nights', 'Comeback story', 'Universe knew', 'Friends forever', 'Eye to eye', 'Late night talks', 'Romantic chats', 'Holding hands', 'Just us', 'Butterfly chain', 'Ring memory', 'Eye pendant', 'Gift moments', 'Sweet nothings', 'First glance', 'Lab incident', 'Sorry accepted', 'Sight adichitu', 'Crush era', 'Love language', 'Virtual kisses', 'Live shows', 'Small gifts', 'Missing you', 'Star gazing', 'Night sky', 'Dancing alone', 'Coming home', 'Infinity', 'Always', 'Forever', 'Now & always', 'Our story', 'Kolandha ♾'];
    const images = ['IMG_20260307_220812_846.jpg','IMG_20260307_233444_590.jpg','IMG_20260307_233446_554.jpg','IMG_20260403_125101_529.jpg','IMG_20260403_125129_058.jpg','IMG_20260403_125132_672.jpg','IMG_20260403_125200_516.jpg','IMG_20260403_125203_175.jpg','IMG_20260403_125205_141.jpg','IMG_20260403_125206_657.jpg','IMG_20260403_125216_226.jpg','IMG_20260403_125218_416.jpg','IMG_20260403_125311_177.jpg','IMG_20260403_125324_918.jpg','IMG_20260403_125332_179.jpg','IMG_20260403_125340_096.jpg','IMG_20260403_125342_681.jpg','IMG_20260403_125348_968.jpg','IMG_20260403_125352_281.jpg','IMG_20260403_125453_114.jpg','IMG_20260403_125554_895.jpg','IMG_20260403_125600_453.jpg','IMG_20260403_125610_897.jpg','IMG_20260403_125613_647.jpg','IMG_20260403_125615_034.jpg','IMG_20260403_125616_604.jpg','IMG_20260403_125617_709.jpg','IMG_20260403_125641_083.jpg','IMG_20260403_125647_861.jpg','IMG_20260403_125708_144.jpg','IMG_20260403_125722_161.jpg','IMG_20260403_125729_328.jpg','IMG_20260403_125817_754.jpg','IMG_20260403_125916_224.jpg','IMG_20260403_125919_478.jpg','IMG_20260403_125927_605.jpg','IMG_20260403_125929_002.jpg','IMG_20260403_125934_016.jpg','IMG_20260403_125941_314.jpg','IMG_20260403_125942_755.jpg','IMG_20260403_125946_534.jpg','IMG_20260403_125954_860.jpg','IMG_20260403_130000_889.jpg','IMG_20260403_130004_048.jpg','IMG_20260403_130006_650.jpg','IMG_20260403_130030_172.jpg','IMG_20260403_130040_970.jpg','IMG_20260403_130045_723.jpg','IMG_20260403_130109_414.jpg','IMG_20260403_130112_482.jpg','IMG_20260403_130115_458.jpg','IMG_20260403_130119_948.jpg','IMG_20260403_130153_630.jpg','IMG_20260403_130155_146.jpg','IMG_20260403_130207_646.jpg','IMG_20260403_130211_239.jpg','IMG_20260403_130215_655.jpg','IMG_20260403_155001.JPG','IMG_20260404_012119.JPG','IMG_20260405_172340_291.jpg','IMG_20260405_172341_874.jpg','IMG_20260405_172502_691.jpg','IMG_20260405_172507_866.jpg','IMG_20260405_172514_242.jpg','IMG_20260405_172528_231.jpg','IMG_20260405_172548_409.jpg','IMG_20260405_172607_451.jpg','IMG_20260405_172609_216.jpg','IMG_20260405_172641_382.jpg','IMG_20260405_172644_925.jpg','IMG_20260405_172646_951.jpg','IMG_20260405_172649_349.jpg','IMG_20260405_172651_187.jpg','IMG_20260405_172653_024.jpg','IMG_20260405_172702_323.jpg','IMG_20260405_172707_047.jpg','IMG_20260405_172714_621.jpg','IMG_20260405_172730_426.jpg','IMG_20260405_172731_719.jpg','IMG_20260405_172733_331.jpg','IMG_20260405_172734_662.jpg','IMG_20260405_172801_300.jpg','IMG_20260405_172803_699.jpg','IMG_20260405_172828_163.jpg','IMG_20260405_172838_323.jpg','IMG_20260405_172842_822.jpg','IMG_20260405_172900_610.jpg','IMG_20260405_172907_563.jpg','IMG_20260405_172916_016.jpg','IMG_20260405_172917_722.jpg','IMG_20260405_172928_462.jpg','IMG_20260405_172931_721.jpg','IMG_20260405_172933_896.jpg','IMG_20260405_172942_443.jpg','IMG_20260405_172945_572.jpg','IMG_20260405_172947_408.jpg','IMG_20260405_172948_945.jpg','IMG_20260405_172950_669.jpg','IMG_20260405_173052_656.jpg','IMG_20260405_173100_318.jpg','IMG_20260405_173248_858.jpg','IMG_20260405_173300_743.jpg','IMG_20260405_173303_014.jpg','IMG_20260405_173306_238.jpg','IMG_20260405_173317_634.jpg','IMG_20260405_173337_786.jpg','IMG_20260405_173343_073.jpg','IMG_20260405_173403_994.jpg','IMG_20260405_173410_126.jpg','IMG_20260407_231902.JPG','photo_6257769115963559422_y.jpg','photo_6257769115963559423_y.jpg','splmem.jpg','spl/1.jpg','spl/2.jpg','spl/3.jpg','spl/4.jpg','spl/5.jpg','spl/6.jpg','spl/7.jpg','spl/8.jpg','spl/9.jpg'];
    function buildGallery() {
      const t1 = document.getElementById('track1');
      const t2 = document.getElementById('track2');
      const half = Math.ceil(images.length / 2);
      const row1 = images.slice(0, half);
      const row2 = images.slice(half);
      function makeItem(imgName, i) {
        const d = document.createElement('div');
        d.className = 'slide-item';
        const cap = captions[i % captions.length];
        d.innerHTML = `<img src="M-ui/${imgName}" alt="Memory" style="width:100%;height:100%;object-fit:cover;"><div class="slide-caption">${cap}</div>`;
        return d;
      }
      [...row1, ...row1].forEach((img, i) => t1.appendChild(makeItem(img, i)));
      [...row2, ...row2].forEach((img, i) => t2.appendChild(makeItem(img, i + half)));
    }
    buildGallery();

    

    // ===== AI VOICE STORY READER =====
    let synth = window.speechSynthesis;
    let isSpeaking = false;

    function toggleVoiceRead() {
      if (isSpeaking) {
        if(synth) synth.cancel();
        stopSpeaking();
        return;
      }
      startSpeaking();
    }

    function startSpeaking() {
      isSpeaking = true;
      document.getElementById('voice-fab')?.classList.add('speaking');
      document.getElementById('ai-status')?.classList.add('active');

      let textToRead = "Chronicle access granted. Reading the story of Maheswari. ";
      
      const stories = document.querySelectorAll('.chapter');
      stories.forEach(s => {
        const title = s.querySelector('.chapter-title')?.textContent || "";
        const story = s.querySelector('.chapter-story')?.innerText || "";
        const quote = s.querySelector('.chapter-quote')?.textContent || "";
        if(title) textToRead += ` Chapter: ${title}. `;
        if(story) textToRead += `${story}. `;
        if(quote) textToRead += ` Thought: ${quote}. `;
      });

      const utter = new SpeechSynthesisUtterance(textToRead);
      utter.rate = 0.95;
      utter.pitch = 1.05;
      
      const voices = synth.getVoices();
      const preferred = voices.find(v => v.name.includes('Google UK English Female') || v.name.includes('Female') || v.lang === 'en-GB');
      if(preferred) utter.voice = preferred;

      utter.onend = stopSpeaking;
      synth.speak(utter);
    }

    function stopSpeaking() {
      isSpeaking = false;
      document.getElementById('voice-fab')?.classList.remove('speaking');
      document.getElementById('ai-status')?.classList.remove('active');
    }

    // Initialize voices
    if (typeof window !== 'undefined' && window.speechSynthesis) { window.speechSynthesis.getVoices(); }
  
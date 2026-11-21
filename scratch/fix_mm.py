import re

with open("mm.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add missing lock styles into <style>
# Find where #lock-layer is in <style>
lock_layer_marker = """    #lock-layer {
      position: fixed;
      inset: 0;
      z-index: 4000;
      background: rgba(13, 8, 24, 0.98);
      backdrop-filter: blur(15px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 1;
      transition: opacity 1s ease;
    }
    #lock-layer.hidden { opacity: 0; pointer-events: none; }"""

lock_styles_to_insert = """    #lock-layer {
      position: fixed;
      inset: 0;
      z-index: 4000;
      background: rgba(13, 8, 24, 0.98);
      backdrop-filter: blur(15px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 1;
      transition: opacity 1s ease;
    }
    #lock-layer.hidden { opacity: 0; pointer-events: none; }

    .lock-container {
      width: 320px;
      max-width: 90vw;
      text-align: center;
    }

    .lock-title {
      font-family: 'Cinzel', serif;
      font-size: 0.85rem;
      letter-spacing: 0.35em;
      color: var(--lav);
      margin-bottom: 2.2rem;
      text-transform: uppercase;
    }

    .pass-display {
      display: flex;
      justify-content: center;
      gap: 1.4rem;
      margin-bottom: 2.5rem;
    }

    .dot {
      width: 15px;
      height: 15px;
      border: 2px solid var(--vio);
      border-radius: 50%;
      transition: all 0.25s ease;
    }

    .dot.active {
      background: var(--lav);
      box-shadow: 0 0 16px var(--lav);
      transform: scale(1.25);
      border-color: var(--lav);
    }

    .keypad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.9rem;
      width: 100%;
      max-width: 270px;
      margin: 0 auto;
    }

    .key {
      aspect-ratio: 1;
      border: 1px solid rgba(155, 114, 207, 0.25);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: 'Cinzel', serif;
      background: rgba(255, 255, 255, 0.02);
      color: var(--tmain);
      user-select: none;
    }

    .key:hover {
      background: rgba(155, 114, 207, 0.2);
      border-color: var(--vio);
      color: var(--lav);
      transform: scale(1.05);
    }

    .key:active {
      transform: scale(0.92);
    }

    .key.clear {
      grid-column: 1;
      border: none;
      font-size: 0.68rem;
      color: var(--tdim);
      letter-spacing: 0.1em;
    }

    .key.clear:hover {
      color: var(--lav);
      background: transparent;
    }

    .key.verify {
      grid-column: 3;
      border: none;
      font-size: 0.68rem;
      color: var(--gold);
      letter-spacing: 0.1em;
      font-weight: 600;
    }

    .key.verify:hover {
      color: #fff;
      background: transparent;
    }

    #lock-err {
      color: #ff6b6b;
      font-size: 0.72rem;
      margin-top: 1.5rem;
      opacity: 0;
      transition: 0.3s;
      font-family: 'Cinzel', serif;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    #lock-err.visible {
      opacity: 1;
    }"""

if lock_layer_marker in html:
    html = html.replace(lock_layer_marker, lock_styles_to_insert)
    print("Inserted lock styles")
else:
    print("Warning: lock_layer_marker not found")

# 2. Fix hero-title font-size clamp for elegant mobile fit
html = html.replace("font-size: 6.2vw;\n      font-weight: 300;\n      line-height: .9;", "font-size: clamp(2.4rem, 9.5vw, 6.5rem);\n      font-weight: 300;\n      line-height: .95;")

# 3. Add onclick to door panels
html = html.replace('<div class="door-panel door-left">', '<div class="door-panel door-left" onclick="openDoors()">')
html = html.replace('<div class="door-panel door-right">', '<div class="door-panel door-right" onclick="openDoors()">')

# 4. Fix Chapter H unclosed parenthesis
html = html.replace(
    "<p>Una saree la paakum bothuu Its nothing to say, its perfect(and adhu innoru beautiful moment Namma first time </p>",
    "<p>Una saree la paakum bothuu Its nothing to say, its perfect(and adhu innoru beautiful moment Namma first time)</p>"
)

# 5. Fix Feedback section: remove the survey questions part
old_feedback_html = """      <div class="feedback-form">
        <div class="feed-group">
          <label class="feed-q">What did you think about the gifts?</label>
          <input type="text" class="feed-input" placeholder="Your thoughts..." id="q-gift">
        </div>
        <div class="feed-group">
          <label class="feed-q">How's the design of our story?</label>
          <input type="text" class="feed-input" placeholder="Your thoughts..." id="q-design">
        </div>
        <div class="feed-group full">
          <label class="feed-q">Describe your feel about this (Minimum 100 words) ❤️</label>
          <div class="textarea-container">
            <textarea class="feed-input" id="feed-text" rows="6" placeholder="Write your heart out..." oninput="checkWordCount()"></textarea>
            <div class="word-count" id="word-count-display">0 / 100 words</div>
          </div>
          <button class="voice-btn" onclick="toggleVoice()" id="voice-btn">
            <span id="voice-icon">🎤</span> <span id="voice-text">Express via Voice</span>
          </button>
        </div>
        <button class="submit-feed" id="submit-btn" onclick="submitFeedback()">Submit Feedback ✦</button>
      </div>"""

new_feedback_html = """      <div class="feedback-form">
        <div class="feed-group full">
          <label class="feed-q">Leave a message from your heart ♡</label>
          <div class="textarea-container">
            <textarea class="feed-input" id="feed-text" rows="5" placeholder="Write your thoughts..." oninput="checkFormValidity()"></textarea>
          </div>
          <button class="voice-btn" onclick="toggleVoice()" id="voice-btn">
            <span id="voice-icon">🎤</span> <span id="voice-text">Express via Voice</span>
          </button>
        </div>
        <button class="submit-feed" id="submit-btn" onclick="submitFeedback()">Submit Feedback ✦</button>
      </div>"""

if old_feedback_html in html:
    html = html.replace(old_feedback_html, new_feedback_html)
    print("Replaced feedback form HTML (removed questions)")
else:
    print("Warning: old_feedback_html not found")

# 6. Update JavaScript logic:
# Passcode support for 2211 and 1204
old_pass_code = """    let currentPass = '';
    const correctPass = '2211';

    function openDoors() {
      document.getElementById('door-layer').classList.add('open');
      setTimeout(() => {
        document.getElementById('lock-layer').classList.remove('hidden');
      }, 1000);
    }

    function dial(val) {
      const dots = document.querySelectorAll('#pass-display .dot');
      if (val === 'clear') {
        currentPass = '';
      } else if (val === 'del') {
        currentPass = currentPass.slice(0, -1);
      } else if (val === 'verify') {
        if (currentPass.length === 4) {
          if (currentPass === correctPass) unlockVault();
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
    }"""

new_pass_code = """    let currentPass = '';
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
    }"""

if old_pass_code in html:
    html = html.replace(old_pass_code, new_pass_code)
    print("Updated passcode dial logic")
else:
    print("Warning: old_pass_code not found")

# 7. Fix revealSite() to remove 'locked' class from body and enable scrolling!
old_reveal = """    function revealSite() {
      const main = document.getElementById('main-site');
      main.style.display = 'block';
      document.body.style.overflow = '';
      
      setTimeout(() => {
        document.getElementById('msg-layer').style.opacity = '0';
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
    }"""

new_reveal = """    function revealSite() {
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
    }"""

if old_reveal in html:
    html = html.replace(old_reveal, new_reveal)
    print("Fixed revealSite() scrolling")
else:
    print("Warning: old_reveal not found")

# 8. Fix feedback JavaScript
old_feedback_js = """    // Feedback logic
    let userRating = 0;
    function setRating(val) {
      userRating = val;
      const stars = document.querySelectorAll('.star');
      stars.forEach((s, i) => {
        s.classList.toggle('active', i < val);
      });
      checkFormValidity();
    }

    function checkWordCount() {
      const text = document.getElementById('feed-text').value.trim();
      const words = text ? text.split(/\s+/).length : 0;
      const display = document.getElementById('word-count-display');
      display.textContent = `${words} / 100 words`;
      display.classList.toggle('valid', words >= 100);
      checkFormValidity();
    }

    function checkFormValidity() {
      const text = document.getElementById('feed-text').value.trim();
      const words = text ? text.split(/\s+/).length : 0;
      const btn = document.getElementById('submit-btn');
      if (words >= 100 && userRating > 0) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }

    let isRecording = false;
    function toggleVoice() {
      const btn = document.getElementById('voice-btn');
      const text = document.getElementById('voice-text');
      isRecording = !isRecording;
      if (isRecording) {
        btn.classList.add('recording');
        text.textContent = 'Recording Heartbeat...';
        // Simulating recording
        setTimeout(() => {
          if(isRecording) toggleVoice();
          alert("Voice captured! (Simulation)");
        }, 5000);
      } else {
        btn.classList.remove('recording');
        text.textContent = 'Voice Captured';
      }
    }

    function submitFeedback() {
      const fbData = {
        rating: userRating,
        gift: document.getElementById('q-gift').value.trim(),
        design: document.getElementById('q-design').value.trim(),
        feeling: document.getElementById('feed-text').value.trim(),
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('mahiFeedback', JSON.stringify(fbData));
      alert("Thank you Maheswari! Your feelings have been woven into the story forever. ❦");
    }"""

new_feedback_js = """    // Feedback logic
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
    }"""

if old_feedback_js in html:
    html = html.replace(old_feedback_js, new_feedback_js)
    print("Updated feedback JS (frictionless submission without word minimum)")
else:
    print("Warning: old_feedback_js not found")

# 9. Guard window.speechSynthesis
html = html.replace("window.speechSynthesis.getVoices();", "if (typeof window !== 'undefined' && window.speechSynthesis) { window.speechSynthesis.getVoices(); }")

with open("mm.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Finished updating mm.html successfully!")

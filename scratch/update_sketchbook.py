import re

# ==============================================================================
# 1. UPDATE style.css
# ==============================================================================
with open("my-sketchbook/style.css", "r", encoding="utf-8") as f:
    css = f.read()

# Replace sketchbook-viewport and book-3d
old_viewport = """/* 9:16 Portrait Sketchbook Frame */
.sketchbook-viewport {
  position: relative;
  width: min(calc(88vh * 9 / 16), 92vw, 440px);
  height: min(88vh, calc(92vw * 16 / 9), 782px);
  perspective: 2500px;
  -webkit-perspective: 2500px;
  border-radius: 12px;
  filter: drop-shadow(0 25px 45px rgba(0, 0, 0, 0.65));
}"""

new_viewport = """/* 9:16 Portrait Sketchbook Frame */
.sketchbook-viewport {
  position: relative;
  width: min(calc(88vh * 9 / 16), 92vw, 440px);
  height: min(88vh, calc(92vw * 16 / 9), 782px);
  perspective: 2200px;
  -webkit-perspective: 2200px;
  cursor: pointer;
}"""
css = css.replace(old_viewport, new_viewport)

old_book3d = """.book-3d {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
}"""

new_book3d = """.book-3d {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  box-shadow: 0 25px 50px -10px rgba(0, 0, 0, 0.75);
  border-radius: 4px 14px 14px 4px;
}"""
css = css.replace(old_book3d, new_book3d)

# Replace element pop-in & visibility
old_elements = """/* Base Scrapbook Element Wrapper (Positions & Staggered Pop-In) */
.sb-element {
  position: absolute;
  transform: rotate(var(--rot, 0deg));
  transform-origin: center center;
  z-index: var(--z, 10);
  opacity: 0;
  will-change: transform, opacity;
}

/* Active Page Pop-In Animation */
.page-leaf.active .sb-element.pop-in {
  animation: popIn 650ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: calc(var(--delay, 0ms));
}

.page-leaf.active .sb-element.drop-in {
  animation: dropIn 750ms cubic-bezier(0.25, 1.3, 0.5, 1) forwards;
  animation-delay: calc(var(--delay, 0ms));
}"""

new_elements = """/* Base Scrapbook Element Wrapper (Positions & Staggered Pop-In) */
.sb-element {
  position: absolute;
  transform: rotate(var(--rot, 0deg));
  transform-origin: center center;
  z-index: var(--z, 10);
  opacity: 1;
  will-change: transform, opacity;
}

/* Active Page Pop-In Animation */
.page-leaf.animate-in .sb-element.pop-in {
  animation: popIn 650ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-delay: calc(var(--delay, 0ms));
}

.page-leaf.animate-in .sb-element.drop-in {
  animation: dropIn 750ms cubic-bezier(0.25, 1.3, 0.5, 1) both;
  animation-delay: calc(var(--delay, 0ms));
}"""
css = css.replace(old_elements, new_elements)

# Replace texture corners and torn strips
old_textures = """/* 3. Vintage Torn Paper Edge */
.torn-strip-left {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 48px;
  background-size: cover;
  background-repeat: repeat-y;
  clip-path: polygon(0 0, 100% 0, 75% 15%, 95% 30%, 80% 50%, 100% 70%, 78% 85%, 90% 100%, 0 100%);
  filter: drop-shadow(4px 0 8px rgba(0, 0, 0, 0.25));
  opacity: 0.85;
}

/* 4. Torn Newspaper Corner */
.newspaper-corner {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 140px;
  height: 120px;
  background-size: cover;
  clip-path: polygon(100% 0, 20% 100%, 100% 100%);
  opacity: 0.85;
  filter: drop-shadow(-3px -3px 6px rgba(0,0,0,0.15));
}

/* 5. Gingham Corner */
.gingham-corner {
  position: absolute;
  top: 0;
  right: 0;
  width: 110px;
  height: 110px;
  background-size: 32px 32px;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
  opacity: 0.75;
}"""

new_textures = """/* 3. Vintage Torn Paper Edge */
.torn-strip-left, .torn-strip {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: repeat-y;
  clip-path: polygon(0 0, 100% 0, 75% 15%, 95% 30%, 80% 50%, 100% 70%, 78% 85%, 90% 100%, 0 100%);
  filter: drop-shadow(4px 0 8px rgba(0, 0, 0, 0.25));
  opacity: 0.85;
}

/* 4. Torn Newspaper Corner */
.newspaper-corner {
  width: 100%;
  height: 100%;
  background-size: cover;
  clip-path: polygon(100% 0, 0% 100%, 100% 100%);
  opacity: 0.85;
  filter: drop-shadow(-3px -3px 6px rgba(0,0,0,0.15));
}

/* 5. Gingham Corner */
.gingham-corner {
  width: 100%;
  height: 100%;
  background-size: 32px 32px;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
  opacity: 0.75;
}"""
css = css.replace(old_textures, new_textures)

# Replace tap-to-open
old_tap = """.tap-to-open {
  position: absolute;
  bottom: 12%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(244, 182, 200, 0.15);
  border: 1px dashed var(--blush);
  padding: 7px 18px;
  border-radius: 30px;
  color: var(--blush);
  font-family: var(--font-handwriting);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: floatPulse 2.5s ease-in-out infinite;
  cursor: pointer;
  z-index: 50;
}"""

new_tap = """.tap-to-open {
  width: 100%;
  background: rgba(244, 182, 200, 0.18);
  border: 1.5px dashed var(--blush);
  padding: 8px 16px;
  border-radius: 30px;
  color: var(--blush);
  font-family: var(--font-handwriting);
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  animation: floatPulse 2.5s ease-in-out infinite;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s ease, background 0.2s ease;
}

.tap-to-open:hover {
  background: rgba(244, 182, 200, 0.32);
  transform: scale(1.04);
}"""
css = css.replace(old_tap, new_tap)

with open("my-sketchbook/style.css", "w", encoding="utf-8") as f:
    f.write(css)
print("Updated style.css")


# ==============================================================================
# 2. UPDATE script.js
# ==============================================================================
with open("my-sketchbook/script.js", "r", encoding="utf-8") as f:
    js = f.read()

# Update tap-hint in BOOK
old_hint = """        // Tap to open indicator
        {
          type: "tap-hint",
          text: "tap to open ✦",
          z: 30
        }"""

new_hint = """        // Tap to open indicator
        {
          type: "tap-hint",
          text: "tap to open ✦",
          x: 25, y: 84, w: 50, rot: 0, z: 30
        }"""
js = js.replace(old_hint, new_hint)

# In createScrapbookElement: check undefined
old_wrap_style = """  wrap.style.left = `${elConfig.x}%`;
  wrap.style.top = `${elConfig.y}%`;
  wrap.style.width = `${elConfig.w}%`;

  if (elConfig.h) wrap.style.height = `${elConfig.h}%`;"""

new_wrap_style = """  if (elConfig.x !== undefined) wrap.style.left = `${elConfig.x}%`;
  if (elConfig.y !== undefined) wrap.style.top = `${elConfig.y}%`;
  if (elConfig.w !== undefined) wrap.style.width = `${elConfig.w}%`;
  if (elConfig.h !== undefined) wrap.style.height = `${elConfig.h}%`;"""
js = js.replace(old_wrap_style, new_wrap_style)

# Replace sections 5, 6, 7, 10
# Find start of section 5:
s5_marker = "// ==========================================================================\n// 5. BOOK BUILDER & RENDER ENGINE"
s5_idx = js.find(s5_marker)

replacement_engine = """// ==========================================================================
// 5. BOOK BUILDER & RENDER ENGINE
// ==========================================================================
function updateCaption(idx) {
  curPageNumEl.textContent = idx + 1;
  if (idx === 0) {
    coverCaptionEl.textContent = BOOK.coverCaption;
    coverCaptionEl.style.opacity = "1";
  } else if (idx === totalPages - 1) {
    coverCaptionEl.textContent = "The End ❦";
    coverCaptionEl.style.opacity = "0.85";
  } else {
    coverCaptionEl.textContent = BOOK.pages[idx].name || `Page ${idx}`;
    coverCaptionEl.style.opacity = "0.75";
  }
}

function buildBook() {
  bookEl.innerHTML = "";
  totalPagesNumEl.textContent = totalPages;
  updateCaption(0);

  BOOK.pages.forEach((p, idx) => {
    const leaf = document.createElement("div");
    leaf.className = `page-leaf ${idx === 0 ? "active animate-in" : ""}`;
    leaf.id = `leaf-${idx}`;
    leaf.dataset.pageIndex = idx;
    leaf.style.zIndex = idx === 0 ? 25 : (totalPages - idx);

    // Front Face (Scrapbook Page Content)
    const frontFace = document.createElement("div");
    frontFace.className = `page-face front ${p.background || "bg-paper-cream"}`;

    // Moving Shadow Overlay for 3D turn
    const shadowOverlay = document.createElement("div");
    shadowOverlay.className = "page-shadow-overlay";
    frontFace.appendChild(shadowOverlay);

    // Populate all elements on this page
    p.elements.forEach(elDef => {
      const elNode = createScrapbookElement(elDef);
      frontFace.appendChild(elNode);
    });

    // Back Face (Blank aged parchment texture for realistic sheet flip)
    const backFace = document.createElement("div");
    backFace.className = "page-face back";
    if (idx === 0) {
      backFace.style.backgroundColor = "#1a1622"; // inner cover
    }

    leaf.appendChild(frontFace);
    leaf.appendChild(backFace);
    bookEl.appendChild(leaf);
  });

  triggerPageTypewriters(document.getElementById("leaf-0"));
}

// ==========================================================================
// 6. 3D PAGE TURN PHYSICS & STATE MACHINE
// ==========================================================================
function reindexLeaves() {
  const leaves = document.querySelectorAll(".page-leaf");
  leaves.forEach((leaf, idx) => {
    if (idx < currentPage) {
      // Already turned pages: rotated -180deg
      leaf.classList.add("turned");
      leaf.classList.remove("active", "turning");
      leaf.style.zIndex = idx + 1;
    } else if (idx === currentPage) {
      // Currently active page: flat 0deg, on top of remaining stack
      leaf.classList.remove("turned", "turning");
      leaf.classList.add("active");
      leaf.style.zIndex = 25;
    } else {
      // Future pages: flat 0deg, stacked underneath
      leaf.classList.remove("turned", "active", "turning");
      leaf.style.zIndex = totalPages - idx;
    }
  });
}

function flipNext() {
  if (isFlipping || currentPage >= totalPages - 1) return;
  isFlipping = true;

  if (!audioPlayed) {
    startMusic();
  }

  const currentIdx = currentPage;
  const nextIdx = currentIdx + 1;
  const currentLeaf = document.getElementById(`leaf-${currentIdx}`);
  const nextLeaf = document.getElementById(`leaf-${nextIdx}`);

  // Bring current leaf to top z-index so it visibly flips over next leaf
  if (currentLeaf) {
    currentLeaf.style.zIndex = 50;
    currentLeaf.classList.add("turning");
  }

  // Reveal next leaf underneath
  if (nextLeaf) {
    nextLeaf.style.zIndex = 25;
    nextLeaf.classList.add("active", "animate-in");
    triggerPageTypewriters(nextLeaf);
  }

  // Turn current leaf
  if (currentLeaf) {
    currentLeaf.classList.add("turned");
  }

  updateCaption(nextIdx);

  setTimeout(() => {
    currentPage = nextIdx;
    if (currentLeaf) {
      currentLeaf.classList.remove("turning", "active");
    }
    reindexLeaves();
    isFlipping = false;
  }, 920);
}

function flipPrev() {
  if (isFlipping || currentPage <= 0) return;
  isFlipping = true;

  const currentIdx = currentPage;
  const prevIdx = currentIdx - 1;
  const currentLeaf = document.getElementById(`leaf-${currentIdx}`);
  const prevLeaf = document.getElementById(`leaf-${prevIdx}`);

  if (prevLeaf) {
    // Bring the returning leaf above current page
    prevLeaf.style.zIndex = 50;
    prevLeaf.classList.add("turning", "active", "animate-in");

    // Force reflow
    void prevLeaf.offsetWidth;

    // Flip back to 0deg
    prevLeaf.classList.remove("turned");
    triggerPageTypewriters(prevLeaf);
  }

  updateCaption(prevIdx);

  setTimeout(() => {
    currentPage = prevIdx;
    if (prevLeaf) prevLeaf.classList.remove("turning");
    if (currentLeaf) currentLeaf.classList.remove("active");
    reindexLeaves();
    isFlipping = false;
  }, 920);
}

function goToPage(targetIndex) {
  if (isFlipping) return;
  targetIndex = Math.max(0, Math.min(totalPages - 1, targetIndex));
  currentPage = targetIndex;
  reindexLeaves();
  updateCaption(currentPage);
  const activeLeaf = document.getElementById(`leaf-${currentPage}`);
  if (activeLeaf) {
    activeLeaf.classList.add("animate-in");
    triggerPageTypewriters(activeLeaf);
  }
}

// ==========================================================================
// 7. TYPEWRITER ANIMATION ENGINE FOR QUOTE STRIPS
// ==========================================================================
function triggerPageTypewriters(pageLeafEl) {
  if (!pageLeafEl) return;
  const quoteStrips = pageLeafEl.querySelectorAll(".quote-strip");
  quoteStrips.forEach((strip, sIdx) => {
    const raw = strip.dataset.rawText || "";
    if (strip._typeInterval) clearInterval(strip._typeInterval);
    strip.textContent = "";
    strip.classList.remove("done");

    let charIdx = 0;
    const startDelay = 450 + sIdx * 200;

    setTimeout(() => {
      strip._typeInterval = setInterval(() => {
        if (charIdx < raw.length) {
          strip.textContent += raw[charIdx];
          charIdx++;
        } else {
          clearInterval(strip._typeInterval);
          strip.classList.add("done");
        }
      }, 35);
    }, startDelay);
  });
}

// ==========================================================================
// 8. BACKGROUND FLOATING PARTICLES (Stars & Petals)
// ==========================================================================
function initAmbientCanvas() {
  const canvas = document.getElementById("ambient-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const particleChars = ["✦", "✧", "⋆", "❀", "♥", "·"];

  class Particle {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = 9 + Math.random() * 14;
      this.speedY = 0.35 + Math.random() * 0.75;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.char = particleChars[Math.floor(Math.random() * particleChars.length)];
      this.alpha = 0.12 + Math.random() * 0.35;
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.rot += this.rotSpeed;
      if (this.y < -30) this.reset();
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.fillStyle = `rgba(244, 182, 200, ${this.alpha})`;
      ctx.font = `${this.size}px serif`;
      ctx.fillText(this.char, 0, 0);
      ctx.restore();
    }
  }

  for (let i = 0; i < 35; i++) {
    particles.push(new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(loop);
  }
  loop();
}

// ==========================================================================
// 9. BACKGROUND MUSIC CONTROLLER
// ==========================================================================
function initAudio() {
  if (BOOK.musicSrc && bgAudio) {
    bgAudio.src = BOOK.musicSrc;
  }

  if (musicBtn) {
    musicBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (bgAudio.paused) {
        startMusic();
      } else {
        pauseMusic();
      }
    });
  }
}

function startMusic() {
  if (!bgAudio) return;
  bgAudio.play().then(() => {
    audioPlayed = true;
    if (musicBtn) {
      musicBtn.classList.add("playing");
      musicBtn.title = "Pause music";
    }
  }).catch(() => {
    // Autoplay blocked; requires click
  });
}

function pauseMusic() {
  if (!bgAudio) return;
  bgAudio.pause();
  if (musicBtn) {
    musicBtn.classList.remove("playing");
    musicBtn.title = "Play music";
  }
}

// ==========================================================================
// 10. GESTURES & INTUITIVE NAVIGATION
// ==========================================================================
function initNavigation() {
  // Arrow Buttons
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      flipNext();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      flipPrev();
    });
  }

  // Click handling on the entire sketchbook frame
  const viewport = document.querySelector(".sketchbook-viewport");
  if (viewport) {
    viewport.addEventListener("click", (e) => {
      // Don't flip if user clicked music or restart button
      if (e.target.closest("#music-btn") || e.target.closest(".restart-btn")) {
        return;
      }

      // On cover: any click anywhere on the cover opens the book
      if (currentPage === 0) {
        flipNext();
        return;
      }

      // Inside book: right half flips next, left half flips back
      const rect = viewport.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      if (clickX > rect.width * 0.45) {
        flipNext();
      } else {
        flipPrev();
      }
    });
  }

  // Keyboard navigation
  window.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
      e.preventDefault();
      flipNext();
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      flipPrev();
    }
  });

  // Touch Swipe Navigation (Mobile)
  let touchStartX = 0;
  let touchStartY = 0;
  if (viewport) {
    viewport.addEventListener("touchstart", e => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    viewport.addEventListener("touchend", e => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          flipNext(); // Swipe Left -> Next
        } else {
          flipPrev(); // Swipe Right -> Prev
        }
      }
    }, { passive: true });
  }
}

// ==========================================================================
// 11. INITIALIZATION
// ==========================================================================
window.addEventListener("DOMContentLoaded", () => {
  renderSpiralCoils();
  buildBook();
  initAmbientCanvas();
  initAudio();
  initNavigation();
});
"""

# Splice the script
js = js[:s5_idx] + replacement_engine

with open("my-sketchbook/script.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Updated script.js")

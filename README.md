# M.A.H.E.S.W.A.R.I • Digital Sketchbook & Story Application

A romantic, animated single-page web app built with React + Vite, featuring:
1. **Intro Screen with Lock PIN (Passcode: 2211)**:
   - React Bits WebGL2 `<Scanner />` effect sweeping behind split ornate doors.
   - Authentic 4-dot PIN verification display and 3x4 numeric keypad (passcode: `2211`, accepts `1204`). No lock emojis.
   - Error shake on wrong entry, and smooth door-split opening animation on success.
2. **Minimalist Home Screen (Matching Reference Image 1)**:
   - **Digital Sketchbook**: Displays the actual sketchbook front cover image as the card preview.
   - **Our Story Notes**: Miniature parchment note thumbnail linking to the diary chapters.
   - **Special Gift**: Personal romantic surprise card.
3. **Story Notes Section (Matching Reference Image 2)**:
   - Aged parchment paper note styling with warm borders and natural ink texture.
   - Top navigation: circular `(←)` button, title/date header, and circular `(▶)` button.
   - Full 9 chapters from **M** to **I** (M.A.H.E.S.W.A.R.I):
     - Chapter 1 (M): Making My First Glance at You
     - Chapter 2 (A): Always Laughing Like the World Was Ours
     - Chapter 3 (H): Holding Feelings I Couldn't Say Aloud
     - Chapter 4 (E): Every Day Felt Like the Beginning of Forever
     - Chapter 5 (S): Storms We Walked Into Without Knowing
     - Chapter 6 (W): Wounds That Wrote Themselves in Silence
     - Chapter 7 (A): Apart — But Never Fully Gone
     - Chapter 8 (R): Returning to Where I Always Belonged
     - Chapter 9 (I): Infinity — Because Some Stories Don't End
   - Character typing handwriting animation (`Caveat`) with instant tap-to-complete.
   - Bottom handwritten doodles (`▦ → ↓ ↗ ↓ ↓ ← ← ↑`) matching the reference screenshot.
4. **Sketchbook (`Sketchbook.html`)**:
   - Standalone 3D corner-peel flipbook embedded with portrait orientation warning overlay and "← Home" button.

---

## 🚀 Running Locally

```powershell
npm run dev
```
Open **http://localhost:5173** in your browser. Enter passcode **`2211`** to unlock!

Build for production:
```powershell
npm run build
```
Output is bundled in `dist/`.

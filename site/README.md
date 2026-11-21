# Desk Buddy Widget • Bottom-Left Reaction Companion

## Features
- **Bottom-Left Placement**: Floats fixed at the bottom-left corner of the webpage with safe-area insets.
- **Pure Image Slide Transition**: Changes poses every 4 seconds (`interval: 4000`) with smooth horizontal sliding transitions—no jumping, bouncing, or walking animations.
- **Reaction Speech Bubbles**: Shows speech bubbles with sweet messages, emojis, and floating particle bursts.
- **Interactive**: Tap her to cycle to the next reaction immediately; minimize/restore with the `×` and `💕` buttons.

## Add to Any Webpage
1. Ensure `desk-buddy.css`, `desk-buddy.js`, and `assets/` (with `pose-01.jpg` ... `pose-10.jpg`) are alongside your HTML page.
2. In your HTML `<head>` add:
   ```html
   <link rel="stylesheet" href="desk-buddy.css">
   ```
3. Just before `</body>` add:
   ```html
   <script src="desk-buddy.js"></script>
   ```

## Customization (Optional)
Place this script before `<script src="desk-buddy.js"></script>`:
```html
<script>
window.DeskBuddyConfig = {
  path: 'assets/',
  interval: 4000, // 4 seconds between reaction slides
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
};
</script>
```

## JavaScript API
```javascript
DeskBuddy.next();                // Advance to next reaction slide
DeskBuddy.prev();                // Go to previous reaction slide
DeskBuddy.show(2);               // Jump directly to pose index (0-9)
DeskBuddy.say('I love you!', '💖'); // Display custom text and burst emojis
DeskBuddy.minimize();            // Minimize to heart button
DeskBuddy.maximize();            // Restore companion
```

import React, { useState, useEffect, useRef, useCallback } from 'react';
import GALLERY_CATEGORIES from './gallery_categories.json';
import './MobileBirthdayPhone.css';

/* =====================================================================
   DATA: MUSIC TRACKS (Real audio files from Music folder)
   ===================================================================== */
const MUSIC_TRACKS = [
  { id: 1, title: 'Kiss the Rain x River Flows in You', artist: 'Yiruma', src: '/music/kiss_d_rain_x_river_--1.mp3', duration: '2:40' },
  { id: 2, title: 'Nuvole Bianche (Wedding)', artist: 'Ludovico Einaudi', src: '/music/nuvole_bianche_wedding_--2.mp3', duration: '3:15' },
  { id: 3, title: 'A Thousand Years', artist: 'Christina Perri', src: '/music/A_Thousand_years_--3.mp3', duration: '4:45' },
  { id: 4, title: "Comptine d'un autre été (Amélie)", artist: 'Yann Tiersen', src: "/music/Yann_Tiersen_-_Comptine_d'un_autre_été_Amélie_--4.mp3", duration: '2:20' },
  { id: 5, title: 'Experience (Slowed)', artist: 'Ludovico Einaudi', src: '/music/Ludovico_Einaudi_-_Experience_Slowed__--5.mp3', duration: '6:30' },
  { id: 6, title: 'The Night We Met', artist: 'Lord Huron', src: '/music/The_night_we_met_--6.m4a', duration: '3:28' },
  { id: 7, title: 'Your Hand in Mine', artist: 'Explosions in the Sky', src: '/music/your_hand_in_mine_--7.m4a', duration: '4:08' },
  { id: 8, title: 'Dandelions (Violin Version)', artist: 'Ruth B.', src: '/music/dandelions_violin__--8.mp3', duration: '2:50' },
  { id: 9, title: 'Kamin', artist: 'Romantic Instrumental', src: '/music/kamin_--9.m4a', duration: '3:40' },
  { id: 10, title: 'End of Beginning', artist: 'Djo', src: '/music/end_of_beginning.mp3', duration: '2:39' },
];

/* =====================================================================
   DATA: SCRAPBOOK PAGES (All 33 pages in numerical order)
   ===================================================================== */
const SCRAPBOOK_PAGES = Array.from({ length: 33 }, (_, i) => `/assets/scrapbook/slot-${i + 1}.jpg`);

/* =====================================================================
   DATA: SECRET VAULT EXCLUSIVE IMAGES
   ===================================================================== */
const VAULT_IMAGES = [
  '/assets/gallery/splmem.jpg',
  '/assets/gallery/photo_6257769115963559422_y.jpg',
  '/assets/gallery/photo_6257769115963559423_y.jpg',
  '/assets/gallery/IMG_20260407_231902.JPG',
  '/assets/gallery/IMG_20260404_012119.JPG',
  '/assets/gallery/IMG_20260403_155001.JPG',
];

/* =====================================================================
   DATA: CLEAR THE BOARD ARROW PUZZLES (Reference Image 3 style)
   ===================================================================== */
const ARROW_PUZZLE_LEVELS = [
  {
    level: 1,
    arrows: [
      { id: 'a1', d: 'M 100 40 L 70 40 L 70 20 L 40 20', head: [40, 20], angle: 180, blocks: [], blockedBy: [] },
      { id: 'a2', d: 'M 120 100 L 120 70 L 150 70 L 150 20', head: [150, 20], angle: -90, blocks: [], blockedBy: [] },
      { id: 'a3', d: 'M 180 100 L 180 60 L 240 60', head: [240, 60], angle: 0, blocks: [], blockedBy: [] },
      { id: 'a4', d: 'M 40 80 L 40 180', head: [40, 180], angle: 90, blocks: [], blockedBy: [] },
      { id: 'a5', d: 'M 100 170 L 100 110 L 70 110 L 70 240', head: [70, 240], angle: 90, blocks: [], blockedBy: ['a4'] },
      { id: 'a6', d: 'M 210 130 L 240 130 L 240 190', head: [240, 190], angle: 90, blocks: [], blockedBy: [] },
      { id: 'a7', d: 'M 160 190 L 160 230 L 130 230 L 130 260 L 90 260', head: [90, 260], angle: 180, blocks: [], blockedBy: ['a5'] },
      { id: 'a8', d: 'M 160 140 L 210 140 L 210 240 L 180 240 L 180 260 L 210 260', head: [210, 260], angle: 0, blocks: [], blockedBy: ['a6'] },
    ]
  },
  {
    level: 2,
    arrows: [
      { id: 'b1', d: 'M 60 50 L 60 20 L 140 20', head: [140, 20], angle: 0, blocks: [], blockedBy: [] },
      { id: 'b2', d: 'M 140 80 L 100 80 L 100 40', head: [100, 40], angle: -90, blocks: [], blockedBy: ['b1'] },
      { id: 'b3', d: 'M 200 40 L 200 140', head: [200, 140], angle: 90, blocks: [], blockedBy: [] },
      { id: 'b4', d: 'M 60 120 L 140 120 L 140 180', head: [140, 180], angle: 90, blocks: [], blockedBy: [] },
      { id: 'b5', d: 'M 180 180 L 180 240 L 80 240', head: [80, 240], angle: 180, blocks: [], blockedBy: [] },
      { id: 'b6', d: 'M 100 200 L 100 150 L 50 150', head: [50, 150], angle: 180, blocks: [], blockedBy: ['b4'] },
    ]
  }
];

/* Web Audio Tone Helper */
const playTone = (type = 'click') => {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.42);
    } else if (type === 'clear') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.22);
    } else if (type === 'bump') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.16);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.09);
    }
  } catch (e) {}
};

const triggerConfetti = () => {
  if (typeof window !== 'undefined' && window.confetti) {
    try {
      window.confetti({ particleCount: 85, spread: 65, origin: { y: 0.6 }, colors: ['#ff9ffc', '#e5a93c', '#38bdf8', '#c084fc', '#ffffff'] });
    } catch (e) {}
  }
};

/* =====================================================================
   MAIN COMPONENT: MobileBirthdayPhone
   ===================================================================== */
const MobileBirthdayPhone = ({ onSelectSection }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [currentTime, setCurrentTime] = useState('23:56');

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${h}:${m}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (appId) => {
    playTone('click');
    if (appId === 'diary') {
      onSelectSection('story');
      return;
    }
    setActiveModal(appId);
  };

  const closeModal = () => {
    playTone('click');
    setActiveModal(null);
  };

  /* =========================================================================
     1. SCRAPBOOK STATE (Portrait cover first, tells full screen, neat slideshow)
     ========================================================================= */
  const [scrapbookMode, setScrapbookMode] = useState('cover'); // 'cover' | 'slideshow'
  const [scrapbookIndex, setScrapbookIndex] = useState(0);
  const [scrapbookAutoPlay, setScrapbookAutoPlay] = useState(false);
  const touchStartXRef = useRef(null);

  // Auto-play slideshow every 3.5s when active
  useEffect(() => {
    let timer = null;
    if (activeModal === 'scrapbook' && scrapbookMode === 'slideshow' && scrapbookAutoPlay) {
      timer = setInterval(() => {
        setScrapbookIndex((prev) => (prev + 1) % SCRAPBOOK_PAGES.length);
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [activeModal, scrapbookMode, scrapbookAutoPlay]);

  const handleNextScrapbookPage = useCallback(() => {
    playTone('click');
    setScrapbookIndex((prev) => (prev + 1) % SCRAPBOOK_PAGES.length);
  }, []);

  const handlePrevScrapbookPage = useCallback(() => {
    playTone('click');
    setScrapbookIndex((prev) => (prev - 1 + SCRAPBOOK_PAGES.length) % SCRAPBOOK_PAGES.length);
  }, []);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null || !e.changedTouches || !e.changedTouches[0]) return;
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (diff > 50) {
      handlePrevScrapbookPage();
    } else if (diff < -50) {
      handleNextScrapbookPage();
    }
  };

  /* =========================================================================
     2. GALLERY & SECRET VAULT STATE (28 Categories + Passcode 2211 Vault)
     ========================================================================= */
  const [galleryLightboxImg, setGalleryLightboxImg] = useState(null);
  const [galleryLightboxIdx, setGalleryLightboxIdx] = useState(0);
  const [galleryActiveCategoryImgs, setGalleryActiveCategoryImgs] = useState([]);
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [showVaultKeypad, setShowVaultKeypad] = useState(false);
  const [vaultPinInput, setVaultPinInput] = useState('');
  const [vaultError, setVaultError] = useState(false);

  const openGalleryPhoto = (imgSrc, imgList, idx) => {
    playTone('click');
    setGalleryActiveCategoryImgs(imgList || [imgSrc]);
    setGalleryLightboxIdx(idx || 0);
    setGalleryLightboxImg(imgSrc);
  };

  const closeGalleryLightbox = () => {
    playTone('click');
    setGalleryLightboxImg(null);
  };

  const handleNextGalleryPhoto = () => {
    if (!galleryActiveCategoryImgs.length) return;
    const next = (galleryLightboxIdx + 1) % galleryActiveCategoryImgs.length;
    setGalleryLightboxIdx(next);
    setGalleryLightboxImg(galleryActiveCategoryImgs[next]);
  };

  const handlePrevGalleryPhoto = () => {
    if (!galleryActiveCategoryImgs.length) return;
    const prev = (galleryLightboxIdx - 1 + galleryActiveCategoryImgs.length) % galleryActiveCategoryImgs.length;
    setGalleryLightboxIdx(prev);
    setGalleryLightboxImg(galleryActiveCategoryImgs[prev]);
  };

  const handleVaultKeypadPress = (val) => {
    playTone('click');
    setVaultError(false);
    if (val === 'C') {
      setVaultPinInput('');
      return;
    }
    if (val === 'OK') {
      if (vaultPinInput === '2211' || vaultPinInput === '1204') {
        playTone('success');
        triggerConfetti();
        setVaultUnlocked(true);
        setShowVaultKeypad(false);
        setVaultPinInput('');
      } else {
        playTone('bump');
        setVaultError(true);
      }
      return;
    }
    if (vaultPinInput.length < 4) {
      const nextPin = vaultPinInput + String(val);
      setVaultPinInput(nextPin);
      if (nextPin.length === 4) {
        if (nextPin === '2211' || nextPin === '1204') {
          playTone('success');
          triggerConfetti();
          setVaultUnlocked(true);
          setShowVaultKeypad(false);
          setVaultPinInput('');
        } else {
          playTone('bump');
          setVaultError(true);
        }
      }
    }
  };

  /* =========================================================================
     3. MUSIC PLAYER STATE (REAL AUDIO PLAYER)
     ========================================================================= */
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState('0:00');
  const [audioCurrentTime, setAudioCurrentTime] = useState('0:00');
  const audioRef = useRef(null);

  const currentTrack = MUSIC_TRACKS[currentTrackIndex];

  const handlePlayPause = () => {
    playTone('click');
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleNextTrack = () => {
    playTone('click');
    const nextIdx = (currentTrackIndex + 1) % MUSIC_TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    setAudioProgress(0);
  };

  const handlePrevTrack = () => {
    playTone('click');
    const prevIdx = (currentTrackIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    setCurrentTrackIndex(prevIdx);
    setAudioProgress(0);
  };

  const handleSelectTrack = (idx) => {
    playTone('click');
    setCurrentTrackIndex(idx);
    setAudioProgress(0);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.src;
      if (isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  }, [currentTrackIndex, currentTrack.src, isPlaying]);

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    if (dur && !isNaN(dur)) {
      setAudioProgress((cur / dur) * 100);
      setAudioDuration(formatTime(dur));
    }
    setAudioCurrentTime(formatTime(cur));
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const val = Number(e.target.value);
    setAudioProgress(val);
    const dur = audioRef.current.duration;
    if (dur && !isNaN(dur)) {
      audioRef.current.currentTime = (val / 100) * dur;
    }
  };

  /* =========================================================================
     4. ARROW GAME ("CLEAR THE BOARD" - Reference Image 3)
     ========================================================================= */
  const [arrowLevelIdx, setArrowLevelIdx] = useState(0);
  const activeLevel = ARROW_PUZZLE_LEVELS[arrowLevelIdx] || ARROW_PUZZLE_LEVELS[0];
  const [clearedArrowIds, setClearedArrowIds] = useState([]);
  const [arrowLives, setArrowLives] = useState(3);
  const [bumpedArrowId, setBumpedArrowId] = useState(null);
  const [hintArrowId, setHintArrowId] = useState(null);
  const [hintCount, setHintCount] = useState(2);
  const [boardCleared, setBoardCleared] = useState(false);

  const resetArrowBoard = () => {
    setClearedArrowIds([]);
    setArrowLives(3);
    setBumpedArrowId(null);
    setHintArrowId(null);
    setBoardCleared(false);
  };

  const handleTapArrow = (arrow) => {
    if (boardCleared || arrowLives <= 0 || clearedArrowIds.includes(arrow.id)) return;
    const isBlocked = arrow.blockedBy.some((depId) => !clearedArrowIds.includes(depId));
    if (isBlocked) {
      playTone('bump');
      setBumpedArrowId(arrow.id);
      setArrowLives((prev) => Math.max(0, prev - 1));
      setTimeout(() => setBumpedArrowId(null), 400);
    } else {
      playTone('clear');
      const nextCleared = [...clearedArrowIds, arrow.id];
      setClearedArrowIds(nextCleared);
      setHintArrowId(null);
      if (nextCleared.length === activeLevel.arrows.length) {
        setBoardCleared(true);
        playTone('success');
        triggerConfetti();
      }
    }
  };

  const handleUseHint = () => {
    if (hintCount <= 0 || boardCleared) return;
    playTone('click');
    const unblocked = activeLevel.arrows.find(
      (a) => !clearedArrowIds.includes(a.id) && a.blockedBy.every((depId) => clearedArrowIds.includes(depId))
    );
    if (unblocked) {
      setHintArrowId(unblocked.id);
      setHintCount((c) => c - 1);
    }
  };

  /* =========================================================================
     5. MESSAGES STATE
     ========================================================================= */
  const [messagesList, setMessagesList] = useState([
    { sender: 'vishnu', text: 'Happy Birthday Maheswari! Wishing you the happiest and most magical day ever!', time: '10:00' },
    { sender: 'vishnu', text: 'I built this special digital universe just for you to celebrate every wonderful memory.', time: '10:01' },
    { sender: 'vishnu', text: 'Looking up at the same sky with you... always.', time: '10:02' },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (msgText) => {
    playTone('click');
    const newMsg = { sender: 'ammu', text: msgText, time: currentTime };
    setMessagesList((prev) => [...prev, newMsg]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      playTone('success');
      let reply = 'Always here for you, Ammu! Have the most wonderful birthday!';
      if (msgText.includes('sky')) reply = 'Under the same sky, our hearts are always connected.';
      else if (msgText.includes('Thank')) reply = 'You deserve all the love, happiness, and peace in the world!';
      setMessagesList((prev) => [...prev, { sender: 'vishnu', text: reply, time: currentTime }]);
    }, 1100);
  };

  /* =========================================================================
     6. PHONE DIALER STATE
     ========================================================================= */
  const [dialNumber, setDialNumber] = useState('');
  const [callActive, setCallActive] = useState(false);
  const [callTimer, setCallTimer] = useState(0);

  useEffect(() => {
    let iv = null;
    if (callActive) iv = setInterval(() => setCallTimer((t) => t + 1), 1000);
    else setCallTimer(0);
    return () => clearInterval(iv);
  }, [callActive]);

  /* =========================================================================
     7. CALCULATOR STATE
     ========================================================================= */
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcSecret, setCalcSecret] = useState(null);

  const handleCalcBtn = (btn) => {
    playTone('click');
    if (btn === 'C') {
      setCalcDisplay('0');
      setCalcSecret(null);
      return;
    }
    if (btn === '=') {
      if (calcDisplay === '2211' || calcDisplay === '1204') {
        playTone('success');
        triggerConfetti();
        setCalcSecret('Passcode unlocked: "Vishnu loves you to infinity and beyond, Ammu!"');
        return;
      }
      try {
        const sanitized = calcDisplay.replace(/[^0-9+\-*/.]/g, '');
        // eslint-disable-next-line no-eval
        const res = Function(`'use strict'; return (${sanitized})`)();
        setCalcDisplay(String(res));
      } catch (e) {
        setCalcDisplay('Error');
      }
      return;
    }
    setCalcDisplay((prev) => (prev === '0' || prev === 'Error' ? String(btn) : prev + String(btn)));
  };

  /* =========================================================================
     8. PIXABOWL (INSTAGRAM) STATE
     ========================================================================= */
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(22110);

  const toggleLike = () => {
    playTone('success');
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
      triggerConfetti();
    } else {
      setLiked(false);
      setLikeCount((c) => c - 1);
    }
  };

  /* =========================================================================
     APP GRID CONFIGURATION (Exact Reference Image 1 & 12 Apps)
     ========================================================================= */
  const apps = [
    { id: 'messages', label: 'Messages', bg: 'tile-messages', icon: 'messages', badge: '2' },
    { id: 'phone', label: 'Phone', bg: 'tile-phone', icon: 'phone' },
    { id: 'mail', label: 'Mail', bg: 'tile-mail', icon: 'mail', badge: '3' },
    { id: 'gallery', label: 'Gallery', bg: 'tile-gallery', icon: 'gallery' },
    { id: 'pixabowl', label: 'Pixabowl', bg: 'tile-pixabowl', icon: 'pixabowl' },
    { id: 'diary', label: 'Diary', bg: 'tile-diary', icon: 'diary', badge: '4', badgeColor: 'badge-amber' },
    { id: 'symmetry', label: 'Symmetry', bg: 'tile-symmetry', icon: 'symmetry', isBordered: true },
    { id: 'settings', label: 'Settings', bg: 'tile-settings', icon: 'settings', isBordered: true },
    { id: 'scrapbook', label: 'Scrapbook', isScrapbookCover: true },
    { id: 'music', label: 'Music', bg: 'tile-music', icon: 'music', badge: '10', badgeColor: 'badge-blue' },
    { id: 'arrowGame', label: 'Make Arrow', bg: 'tile-arrow', icon: 'arrow' },
    { id: 'calculator', label: 'Calculator', bg: 'tile-calc', icon: 'calc' },
  ];

  const renderIconSvg = (name) => {
    switch (name) {
      case 'messages':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 9H7V9h10v2zm-4 3H7v-2h6v2z" />
          </svg>
        );
      case 'phone':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
          </svg>
        );
      case 'mail':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        );
      case 'gallery':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        );
      case 'pixabowl':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        );
      case 'diary':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#f5e6cc' }}>
            <path d="M6 2h11a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h11V4H6zm2 3h7v2H8V7zm0 4h7v2H8v-2z" />
          </svg>
        );
      case 'symmetry':
        return (
          <svg className="app-svg" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09V21.35z" fill="#ef5350" />
            <path d="M12 5.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35V5.09z" fill="#4b5563" />
          </svg>
        );
      case 'settings':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
        );
      case 'music':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        );
      case 'arrow':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 8 8 12 12 16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        );
      case 'calc':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="native-phone-stage">
      {/* Hidden Audio element for Music Player */}
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleNextTrack} preload="auto" />

      <div className="native-phone-screen">
        {/* Status Bar */}
        <header className="native-status-bar">
          <span className="time-val">{currentTime}</span>
          <span className="carrier-val">MAHESWARI</span>
          <div className="status-indicators">
            <svg className="ind-svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
            </svg>
            <div className="battery-rect">
              <div className="battery-fill" />
            </div>
          </div>
        </header>

        {/* Hero Header - ONLY "Happy Birthday Maheswari" as requested (All other text removed) */}
        <div className="native-hero-header">
          <h1 className="hero-title">Happy Birthday Maheswari</h1>
        </div>

        {/* 12-App Unified Grid matching Reference Image 1 */}
        <main className="unified-app-grid">
          {apps.map((app) => (
            <button
              key={app.id}
              type="button"
              className={`app-cell-btn ${app.isScrapbookCover ? 'cell-scrapbook-featured' : ''}`}
              onClick={() => openApp(app.id)}
              aria-label={`Open ${app.label}`}
            >
              {app.isScrapbookCover ? (
                <div className="scrapbook-cover-tile">
                  <img
                    src="/assets/sketchbook-cover.jpg"
                    alt="Scrapbook Cover"
                    className="scrapbook-cover-img"
                    onError={(e) => {
                      e.target.src = 'assets/sketchbook-cover.jpg';
                    }}
                  />
                  <span className="badge-dot badge-gold">3D</span>
                </div>
              ) : (
                <div className={`generic-tile ${app.bg} ${app.isBordered ? 'tile-bordered' : ''}`}>
                  {renderIconSvg(app.icon)}
                  {app.badge && (
                    <span className={`badge-dot ${app.badgeColor || 'badge-red'}`}>{app.badge}</span>
                  )}
                </div>
              )}
              <span className="app-cell-label">{app.label}</span>
            </button>
          ))}
        </main>

        {/* Swipe Right for Secret Vault Hint Pill (Matching Reference Image 1) */}
        <div className="bottom-vault-hint-wrap">
          <button
            type="button"
            className="bottom-vault-hint-btn"
            onClick={() => {
              openApp('gallery');
              setShowVaultKeypad(true);
            }}
          >
            Swipe right for Secret Vault →
          </button>
        </div>
      </div>

      {/* =====================================================================
          MODAL 1: SCRAPBOOK (Cover Portrait First -> Tells Fullscreen Slideshow)
          ===================================================================== */}
      {activeModal === 'scrapbook' && (
        <div className="native-app-modal scrapbook-modal">
          {scrapbookMode === 'cover' ? (
            /* SCRAPBOOK COVER VIEW (Portrait first, tells full screen) */
            <div className="scrapbook-cover-stage">
              <header className="modal-top-bar bg-amber-950">
                <div className="modal-title-wrap">
                  <h2>Digital Scrapbook</h2>
                  <span className="modal-sub">Chapter M • 33 Handcrafted Pages</span>
                </div>
                <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
                  ✕
                </button>
              </header>

              <div className="scrapbook-cover-body">
                {/* Portrait Scrapbook Cover Card */}
                <div
                  className="cover-portrait-card"
                  onClick={() => {
                    playTone('click');
                    setScrapbookMode('slideshow');
                    setScrapbookIndex(0);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src="/assets/sketchbook-cover.jpg"
                    alt="Handcrafted Scrapbook Cover"
                    className="cover-portrait-img"
                  />
                  <div className="cover-glow-badge">Chapter M</div>
                </div>

                {/* Clear Fullscreen CTA Announcement */}
                <div className="fullscreen-tell-banner">
                  <h3 className="banner-heading">Handwritten Memories</h3>
                  <p className="banner-desc">
                    Tells full screen • High definition slideshow with swipe controls
                  </p>
                  <button
                    type="button"
                    className="enter-fullscreen-cta-btn"
                    onClick={() => {
                      playTone('click');
                      setScrapbookMode('slideshow');
                      setScrapbookIndex(0);
                    }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    <span>Open Fullscreen Slideshow</span>
                  </button>
                </div>

                {/* Quick Page Navigator Grid */}
                <div className="quick-page-picker">
                  <span className="picker-title">Jump to Page</span>
                  <div className="picker-grid">
                    {SCRAPBOOK_PAGES.map((_, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        className={`page-pill-btn ${scrapbookIndex === pIdx ? 'active' : ''}`}
                        onClick={() => {
                          playTone('click');
                          setScrapbookIndex(pIdx);
                          setScrapbookMode('slideshow');
                        }}
                      >
                        {pIdx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* SCRAPBOOK FULLSCREEN SLIDESHOW VIEW (Neat alignments, no conflicts) */
            <div
              className="scrapbook-fullscreen-stage"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Top Controls Bar */}
              <header className="slideshow-header-bar">
                <button
                  type="button"
                  className="slideshow-back-btn"
                  onClick={() => {
                    playTone('click');
                    setScrapbookMode('cover');
                  }}
                >
                  ← Cover
                </button>
                <div className="slideshow-counter">
                  Page {scrapbookIndex + 1} / {SCRAPBOOK_PAGES.length}
                </div>
                <div className="slideshow-right-actions">
                  <button
                    type="button"
                    className={`slideshow-auto-btn ${scrapbookAutoPlay ? 'auto-active' : ''}`}
                    onClick={() => {
                      playTone('click');
                      setScrapbookAutoPlay(!scrapbookAutoPlay);
                    }}
                  >
                    {scrapbookAutoPlay ? 'Pause' : 'Auto'}
                  </button>
                  <button type="button" className="slideshow-x-btn" onClick={closeModal} aria-label="Close">
                    ✕
                  </button>
                </div>
              </header>

              {/* Center Image Stage with Float Arrows */}
              <div className="slideshow-center-stage">
                <button
                  type="button"
                  className="slide-arrow-btn arrow-prev"
                  onClick={handlePrevScrapbookPage}
                  aria-label="Previous Page"
                >
                  ‹
                </button>

                <div className="slide-image-wrapper">
                  <img
                    src={SCRAPBOOK_PAGES[scrapbookIndex]}
                    alt={`Scrapbook Page ${scrapbookIndex + 1}`}
                    className="slide-main-image"
                  />
                </div>

                <button
                  type="button"
                  className="slide-arrow-btn arrow-next"
                  onClick={handleNextScrapbookPage}
                  aria-label="Next Page"
                >
                  ›
                </button>
              </div>

              {/* Bottom Scrubber & Navigation Bar */}
              <footer className="slideshow-bottom-bar">
                <button
                  type="button"
                  className="slide-nav-pill"
                  onClick={handlePrevScrapbookPage}
                >
                  Prev
                </button>
                <div className="slide-progress-track">
                  <div
                    className="slide-progress-fill"
                    style={{ width: `${((scrapbookIndex + 1) / SCRAPBOOK_PAGES.length) * 100}%` }}
                  />
                </div>
                <button
                  type="button"
                  className="slide-nav-pill"
                  onClick={handleNextScrapbookPage}
                >
                  Next
                </button>
              </footer>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          MODAL 2: GALLERY (28 Categories + Secret Hidden Gallery with PIN 2211)
          ===================================================================== */}
      {activeModal === 'gallery' && (
        <div className="native-app-modal gallery-modal">
          <header className="modal-top-bar bg-slate-900">
            <div className="modal-title-wrap">
              <h2>Moments &amp; Memories</h2>
              <span className="modal-sub">28 Collections • 108 Photographs</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="gallery-view-body">
            {/* VIP SECRET HIDDEN VAULT BANNER (Passcode 2211) */}
            <div className="secret-vault-banner-card">
              <div className="vault-banner-content">
                <div className="vault-badge-tag">RESTRICTED VAULT</div>
                <h3 className="vault-banner-title">Secret Hidden Memories</h3>
                <p className="vault-banner-subtitle">
                  {vaultUnlocked
                    ? 'Vault is Unlocked! View exclusive memories & Vishnu’s heartfelt note.'
                    : 'Protected by 4-digit Passcode (2211). Tap to unlock.'}
                </p>
              </div>
              <button
                type="button"
                className={`vault-action-trigger-btn ${vaultUnlocked ? 'unlocked' : ''}`}
                onClick={() => {
                  if (vaultUnlocked) {
                    setVaultUnlocked(false);
                    playTone('click');
                  } else {
                    setShowVaultKeypad(true);
                    playTone('click');
                  }
                }}
              >
                {vaultUnlocked ? 'Lock Vault' : 'Enter Passcode (2211)'}
              </button>
            </div>

            {/* UNLOCKED SECRET VAULT SECTION */}
            {vaultUnlocked && (
              <section className="unlocked-vault-section">
                <div className="vault-letter-card">
                  <h4 className="vault-letter-greeting">Dearest Ammu,</h4>
                  <p className="vault-letter-text">
                    &ldquo;Looking at all our memories, I am reminded of how blessed I am to have you in my life.
                    You bring endless light, quiet strength, and pure happiness into my world. Happy Birthday,
                    my queen! Looking up at the same sky with you... always.&rdquo;
                  </p>
                  <span className="vault-letter-sign">&mdash; Vishnu</span>
                </div>

                <div className="vault-photos-grid">
                  {VAULT_IMAGES.map((vImg, vIdx) => (
                    <div
                      key={vIdx}
                      className="vault-photo-item"
                      onClick={() => openGalleryPhoto(vImg, VAULT_IMAGES, vIdx)}
                    >
                      <img src={vImg} alt={`Secret Memory ${vIdx + 1}`} className="vault-img" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 28 GALLERY CATEGORIES (Generated from 108 Photos) */}
            {GALLERY_CATEGORIES.map((cat, cIdx) => (
              <section key={cIdx} className="gallery-category-block">
                <h3 className="gallery-section-title">{cat.title}</h3>
                <div className={`gallery-photo-row ${cat.layout === 'featured' ? 'layout-featured' : 'layout-two-col'}`}>
                  {cat.images.map((imgSrc, pIdx) => (
                    <div
                      key={pIdx}
                      className="gallery-photo-card"
                      onClick={() => openGalleryPhoto(imgSrc, cat.images, pIdx)}
                      role="button"
                      tabIndex={0}
                    >
                      <img
                        src={imgSrc}
                        alt={`${cat.title} ${pIdx + 1}`}
                        className="gallery-thumb-img"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* PASSCODE KEYPAD MODAL (FOR PIN 2211) */}
          {showVaultKeypad && (
            <div className="vault-keypad-overlay">
              <div className="vault-keypad-modal">
                <div className="keypad-header">
                  <h3>Enter Secret Passcode</h3>
                  <p>Enter 4-digit code to reveal hidden memories</p>
                </div>

                {/* 4 PIN Dots */}
                <div className={`pin-dots-display ${vaultError ? 'shake-anim' : ''}`}>
                  {[0, 1, 2, 3].map((dotIdx) => (
                    <div
                      key={dotIdx}
                      className={`pin-dot ${vaultPinInput.length > dotIdx ? 'filled' : ''}`}
                    />
                  ))}
                </div>

                {vaultError && (
                  <div className="pin-error-text">Incorrect code. Hint: 2211</div>
                )}

                {/* Keypad Grid */}
                <div className="keypad-grid">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className="key-btn"
                      onClick={() => handleVaultKeypadPress(num)}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="key-btn key-clear"
                    onClick={() => handleVaultKeypadPress('C')}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="key-btn"
                    onClick={() => handleVaultKeypadPress(0)}
                  >
                    0
                  </button>
                  <button
                    type="button"
                    className="key-btn key-ok"
                    onClick={() => handleVaultKeypadPress('OK')}
                  >
                    OK
                  </button>
                </div>

                <button
                  type="button"
                  className="keypad-cancel-btn"
                  onClick={() => setShowVaultKeypad(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* FULLSCREEN PHOTO LIGHTBOX */}
          {galleryLightboxImg && (
            <div className="gallery-lightbox-modal">
              <header className="lightbox-top-bar">
                <span>
                  Photo {galleryLightboxIdx + 1} of {galleryActiveCategoryImgs.length}
                </span>
                <button type="button" className="lightbox-close-btn" onClick={closeGalleryLightbox}>
                  ✕
                </button>
              </header>

              <div className="lightbox-image-stage">
                <button
                  type="button"
                  className="lightbox-arrow-btn left"
                  onClick={handlePrevGalleryPhoto}
                  aria-label="Previous"
                >
                  ‹
                </button>
                <img
                  src={galleryLightboxImg}
                  alt="Full preview"
                  className="lightbox-full-img"
                />
                <button
                  type="button"
                  className="lightbox-arrow-btn right"
                  onClick={handleNextGalleryPhoto}
                  aria-label="Next"
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          MODAL 3: MUSIC PLAYER (Real HTML5 Audio with 10 Tracks)
          ===================================================================== */}
      {activeModal === 'music' && (
        <div className="native-app-modal music-modal">
          <header className="modal-top-bar bg-sky-950">
            <div className="modal-title-wrap">
              <h2>Music Player</h2>
              <span className="modal-sub">10 Romantic Melodies</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="music-view-body">
            {/* Spinning Vinyl Visual */}
            <div className="music-player-hero">
              <div className={`music-disc-record ${isPlaying ? 'spinning-disc' : ''}`}>
                <div className="disc-grooves">
                  <div className="disc-center-label">
                    <span className="disc-title-text">{currentTrack.title.slice(0, 14)}...</span>
                  </div>
                </div>
              </div>
              <h3 className="playing-track-title">{currentTrack.title}</h3>
              <p className="playing-track-artist">{currentTrack.artist}</p>
            </div>

            {/* Seek Bar */}
            <div className="music-progress-wrap">
              <input
                type="range"
                min="0"
                max="100"
                value={audioProgress}
                onChange={handleSeek}
                className="music-seek-bar"
              />
              <div className="music-time-row">
                <span>{audioCurrentTime}</span>
                <span>{audioDuration}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="music-controls-row">
              <button type="button" className="ctrl-btn-round" onClick={handlePrevTrack} aria-label="Previous">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>
              <button
                type="button"
                className="ctrl-btn-main"
                onClick={handlePlayPause}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button type="button" className="ctrl-btn-round" onClick={handleNextTrack} aria-label="Next">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>
            </div>

            {/* Playlist Track List */}
            <div className="playlist-wrap">
              <h4 className="playlist-heading">All 10 Tracks</h4>
              <div className="track-items-list">
                {MUSIC_TRACKS.map((track, idx) => (
                  <div
                    key={track.id}
                    className={`track-item-card ${currentTrackIndex === idx ? 'playing-card' : ''}`}
                    onClick={() => handleSelectTrack(idx)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="track-left">
                      <span className="track-idx">{idx + 1}</span>
                      <div className="track-meta">
                        <span className="track-name">{track.title}</span>
                        <span className="track-singer">{track.artist}</span>
                      </div>
                    </div>
                    <span className="track-len">{track.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4: ARROW PUZZLE GAME ("Clear the Board")
          ===================================================================== */}
      {activeModal === 'arrowGame' && (
        <div className="native-app-modal arrow-modal">
          <header className="modal-top-bar bg-slate-900">
            <div className="modal-title-wrap">
              <h2>Clear the Board</h2>
              <span className="modal-sub">
                Level {activeLevel.level} &bull; Tap arrows whose exit path is clear
              </span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="arrow-game-body">
            {/* Game Stats Row */}
            <div className="game-stats-header">
              <div className="stat-capsule">
                <span className="stat-label">Remaining:</span>
                <span className="stat-value">
                  {activeLevel.arrows.length - clearedArrowIds.length} / {activeLevel.arrows.length}
                </span>
              </div>
              <div className="lives-row">
                {[1, 2, 3].map((heart) => (
                  <svg
                    key={heart}
                    className={`life-heart-svg ${arrowLives >= heart ? 'alive' : 'lost'}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ))}
              </div>
              <span className="level-badge">Level {activeLevel.level}</span>
            </div>

            {/* Dot Grid Arrow SVG Board */}
            <div className="arrow-svg-board">
              <svg viewBox="0 0 280 280" className="board-svg-canvas">
                {/* Dot plane background */}
                {[...Array(6)].map((_, r) =>
                  [...Array(6)].map((_, c) => (
                    <circle
                      key={`d-${r}-${c}`}
                      cx={35 + c * 42}
                      cy={35 + r * 42}
                      r="2.5"
                      fill="rgba(148, 163, 184, 0.4)"
                    />
                  ))
                )}

                {/* Arrow Paths */}
                {activeLevel.arrows.map((arr) => {
                  const isCleared = clearedArrowIds.includes(arr.id);
                  const isBumped = bumpedArrowId === arr.id;
                  const isHinted = hintArrowId === arr.id;
                  if (isCleared) return null;

                  return (
                    <g
                      key={arr.id}
                      className={`arrow-group ${isBumped ? 'bump-shake' : ''} ${isHinted ? 'hint-pulse' : ''}`}
                      onClick={() => handleTapArrow(arr)}
                      style={{ cursor: 'pointer' }}
                    >
                      <path
                        d={arr.d}
                        fill="none"
                        stroke={isHinted ? '#38bdf8' : isBumped ? '#ef4444' : '#1e293b'}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polygon
                        points={`${arr.head[0]},${arr.head[1] - 8} ${arr.head[0] + 10},${arr.head[1] + 8} ${arr.head[0] - 10},${arr.head[1] + 8}`}
                        fill={isHinted ? '#38bdf8' : isBumped ? '#ef4444' : '#1e293b'}
                        transform={`rotate(${arr.angle}, ${arr.head[0]}, ${arr.head[1]})`}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Game Over / Cleared Overlays */}
              {boardCleared && (
                <div className="board-cleared-banner">
                  <h4 className="congrats-text">Board Cleared!</h4>
                  <p className="congrats-sub">Ammu is a puzzle master!</p>
                  <button
                    type="button"
                    className="action-pill-btn"
                    onClick={() => {
                      if (arrowLevelIdx + 1 < ARROW_PUZZLE_LEVELS.length) {
                        setArrowLevelIdx((prev) => prev + 1);
                      } else {
                        setArrowLevelIdx(0);
                      }
                      resetArrowBoard();
                    }}
                  >
                    Next Level
                  </button>
                </div>
              )}

              {arrowLives <= 0 && !boardCleared && (
                <div className="board-cleared-banner retry-banner">
                  <h4 className="congrats-text">Out of Hearts!</h4>
                  <button type="button" className="action-pill-btn" onClick={resetArrowBoard}>
                    Try Again
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="arrow-controls-row">
              <button
                type="button"
                className="hint-btn-circle"
                onClick={handleUseHint}
                disabled={hintCount <= 0 || boardCleared}
                title="Hint"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 0 0-7-7z" />
                </svg>
                <span className="hint-counter-pill">{hintCount}</span>
              </button>
              <button type="button" className="restart-btn-circle" onClick={resetArrowBoard} title="Reset">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 5: MESSAGES APP
          ===================================================================== */}
      {activeModal === 'messages' && (
        <div className="native-app-modal messages-modal">
          <header className="modal-top-bar bg-blue-950">
            <div className="modal-title-wrap">
              <h2>Messages</h2>
              <span className="modal-sub">Chatting with Vishnu</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="messages-view-body">
            <div className="messages-stream">
              {messagesList.map((m, idx) => (
                <div key={idx} className={`chat-bubble ${m.sender === 'ammu' ? 'bubble-me' : 'bubble-them'}`}>
                  <p className="bubble-content">{m.text}</p>
                  <span className="bubble-ts">{m.time}</span>
                </div>
              ))}
              {isTyping && (
                <div className="chat-bubble bubble-them typing-indicator">
                  <span>Vishnu is typing...</span>
                </div>
              )}
            </div>

            {/* Quick Birthday Response Chips */}
            <div className="quick-replies-tray">
              <button
                type="button"
                className="reply-chip"
                onClick={() => handleSendMessage('Thank you so much Vishnu!')}
              >
                Thank you so much!
              </button>
              <button
                type="button"
                className="reply-chip"
                onClick={() => handleSendMessage('Looking up at the same sky with you... always.')}
              >
                Under the same sky...
              </button>
              <button
                type="button"
                className="reply-chip"
                onClick={() => handleSendMessage('This birthday phone is incredible!')}
              >
                I love this phone!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 6: PHONE DIALER
          ===================================================================== */}
      {activeModal === 'phone' && (
        <div className="native-app-modal phone-modal">
          <header className="modal-top-bar bg-emerald-950">
            <div className="modal-title-wrap">
              <h2>Phone</h2>
              <span className="modal-sub">Direct Line to Vishnu</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="phone-dialer-body">
            {callActive ? (
              <div className="call-active-stage">
                <div className="caller-avatar-circle">V</div>
                <h3 className="caller-name">Vishnu</h3>
                <span className="call-duration-text">{formatTime(callTimer)}</span>
                <p className="call-sweet-whisper">
                  &ldquo;I am always just one call away, Ammu. Happy Birthday!&rdquo;
                </p>
                <button
                  type="button"
                  className="end-call-btn"
                  onClick={() => {
                    playTone('bump');
                    setCallActive(false);
                  }}
                >
                  End Call
                </button>
              </div>
            ) : (
              <div className="dialer-stage">
                <div className="dialer-display-num">{dialNumber || 'Enter digits...'}</div>
                <div className="dialer-keypad-grid">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      className="dial-digit-btn"
                      onClick={() => {
                        playTone('click');
                        setDialNumber((prev) => prev + String(d));
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <div className="dialer-actions-row">
                  <button
                    type="button"
                    className="dialer-backspace-btn"
                    onClick={() => {
                      playTone('click');
                      setDialNumber((prev) => prev.slice(0, -1));
                    }}
                  >
                    ⌫
                  </button>
                  <button
                    type="button"
                    className="dialer-call-btn"
                    onClick={() => {
                      playTone('success');
                      setCallActive(true);
                    }}
                  >
                    Call
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 7: MAIL
          ===================================================================== */}
      {activeModal === 'mail' && (
        <div className="native-app-modal mail-modal">
          <header className="modal-top-bar bg-red-950">
            <div className="modal-title-wrap">
              <h2>Letters &amp; Mail</h2>
              <span className="modal-sub">Inbox (3 Messages)</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="mail-view-body">
            <div className="mail-card-item">
              <span className="mail-sender">From: Vishnu</span>
              <h4 className="mail-subject">Happy Birthday Ammu!</h4>
              <p className="mail-preview">
                Wishing you endless laughter, peace, and dreams that come true today and always...
              </p>
            </div>
            <div className="mail-card-item">
              <span className="mail-sender">From: Secret Vault</span>
              <h4 className="mail-subject">Passcode Reminder: 2211</h4>
              <p className="mail-preview">
                Your special hidden memories vault is ready with 108 photos and 28 collections.
              </p>
            </div>
            <div className="mail-card-item">
              <span className="mail-sender">From: The Universe</span>
              <h4 className="mail-subject">Looking Up At The Same Sky</h4>
              <p className="mail-preview">
                No matter where we are, we share the exact same sky and the exact same starry night.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 8: PIXABOWL (INSTAGRAM)
          ===================================================================== */}
      {activeModal === 'pixabowl' && (
        <div className="native-app-modal ingram-modal">
          <header className="modal-top-bar bg-purple-950">
            <div className="modal-title-wrap">
              <h2>Pixabowl</h2>
              <span className="modal-sub">@maheswari_ammu</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="ingram-view-body">
            <div className="ingram-post-card">
              <div className="post-author-row">
                <div className="author-avatar">M</div>
                <div className="author-meta">
                  <span className="author-handle">maheswari_ammu</span>
                  <span className="author-loc">Birthday Special Celebration</span>
                </div>
              </div>

              <div className="post-photo-stage">
                <img src="/assets/gallery/splmem.jpg" alt="Ammu portrait" className="post-img" />
              </div>

              <div className="post-actions-row">
                <button
                  type="button"
                  className={`heart-like-btn ${liked ? 'liked' : ''}`}
                  onClick={toggleLike}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill={liked ? '#ef4444' : 'none'} stroke={liked ? '#ef4444' : '#ffffff'} strokeWidth="2">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span>{likeCount.toLocaleString()} Likes</span>
                </button>
              </div>

              <div className="post-caption-box">
                <p>
                  <strong>maheswari_ammu:</strong> A year older, a thousand reasons more grateful.
                  Thank you for all the heartfelt love!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 9: SYMMETRY (Split Heart Celebration)
          ===================================================================== */}
      {activeModal === 'symmetry' && (
        <div className="native-app-modal symmetry-modal">
          <header className="modal-top-bar bg-slate-900">
            <div className="modal-title-wrap">
              <h2>Symmetry</h2>
              <span className="modal-sub">Two Hearts In Harmony</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="symmetry-view-body">
            <div className="dual-heart-graphic">
              <svg className="symmetry-svg" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09V21.35z" fill="#ef5350" />
                <path d="M12 5.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35V5.09z" fill="#38bdf8" />
              </svg>
            </div>
            <h3 className="symmetry-title">Vishnu &bull; Maheswari</h3>
            <p className="symmetry-prose">
              &ldquo;Two individuals, one connected heartbeat. Distance is just a number when two souls
              share the exact same sky.&rdquo;
            </p>
            <button
              type="button"
              className="shower-confetti-btn"
              onClick={() => {
                playTone('success');
                triggerConfetti();
              }}
            >
              Celebrate Our Bond
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 10: CALCULATOR
          ===================================================================== */}
      {activeModal === 'calculator' && (
        <div className="native-app-modal calc-modal">
          <header className="modal-top-bar bg-rose-950">
            <div className="modal-title-wrap">
              <h2>Calculator</h2>
              <span className="modal-sub">Try passcode 2211 =</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="calc-view-body">
            <div className="calc-screen-display">{calcDisplay}</div>
            {calcSecret && <div className="calc-easter-egg-banner">{calcSecret}</div>}
            <div className="calc-buttons-grid">
              {['C', '(', ')', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='].map((btn) => (
                <button
                  key={btn}
                  type="button"
                  className={`calc-btn ${btn === '=' ? 'btn-equals' : typeof btn === 'string' && ['/', '*', '-', '+'].includes(btn) ? 'btn-op' : ''}`}
                  onClick={() => handleCalcBtn(btn)}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 11: SETTINGS
          ===================================================================== */}
      {activeModal === 'settings' && (
        <div className="native-app-modal settings-modal">
          <header className="modal-top-bar bg-zinc-900">
            <div className="modal-title-wrap">
              <h2>Settings</h2>
              <span className="modal-sub">Maheswari Special Edition</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="settings-view-body">
            <div className="settings-section-card">
              <div className="set-row">
                <span>Passcode Lock</span>
                <span className="set-val active">Active (2211)</span>
              </div>
              <div className="set-row">
                <span>Sound &amp; Haptics</span>
                <span className="set-val">Enabled</span>
              </div>
              <div className="set-row">
                <span>Theme</span>
                <span className="set-val">Balcony Sunset Glow</span>
              </div>
            </div>
            <div className="settings-section-card">
              <div className="set-row">
                <span>Device</span>
                <span className="set-val">Ammu Special Phone</span>
              </div>
              <div className="set-row">
                <span>Owner</span>
                <span className="set-val">Maheswari (Ammu)</span>
              </div>
              <div className="set-row">
                <span>Developer</span>
                <span className="set-val highlight">Vishnu</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileBirthdayPhone;

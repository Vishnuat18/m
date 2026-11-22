import React, { useState, useEffect, useRef } from 'react';
import GALLERY_CATEGORIES from './gallery_categories.json';
import { useMusic } from '../context/MusicContext';
import './MobileBirthdayPhone.css';

/* =====================================================================
   DATA: GALLERY HIGHLIGHT PHOTOS (Same square size 2xN grid)
   ===================================================================== */
const HIGHLIGHT_PHOTOS = [
  '/assets/gallery/splmem.jpg',
  '/assets/gallery/photo_6257769115963559422_y.jpg',
  '/assets/gallery/photo_6257769115963559423_y.jpg',
  '/assets/gallery/IMG_20260407_231902.JPG',
  '/assets/gallery/IMG_20260404_012119.JPG',
  '/assets/gallery/IMG_20260403_155001.JPG',
];

/* Combined Categories with uniform square images */
const ALL_GALLERY_COLLECTIONS = [
  {
    title: 'Tonight \u2014 Birthday Eve',
    caption: 'This lighting is perfect',
    images: [
      '/assets/gallery/IMG_20260403_125101_529.jpg',
      '/assets/gallery/IMG_20260403_125129_058.jpg',
    ],
  },
  {
    title: 'Favorite Evenings',
    caption: 'Looking up at the same sky with you',
    images: [
      '/assets/gallery/IMG_20260403_125203_175.jpg',
      '/assets/gallery/IMG_20260403_125205_141.jpg',
    ],
  },
  {
    title: 'Hidden Vault Memories',
    caption: 'Special moments kept close to the heart',
    images: HIGHLIGHT_PHOTOS,
  },
  ...GALLERY_CATEGORIES.slice(2).map((cat) => ({
    ...cat,
    caption: 'Every smile captured in time',
  })),
];

/* =====================================================================
   DATA: BIRTHDAY MESSAGES (Updated: "Mahi" changed to "Mahes")
   ===================================================================== */
const FRIENDS_CHATS = {
  sanjuuu: {
    key: 'sanjuuu',
    name: 'Sanjuuu',
    handle: '@sanjuuu_bestie',
    avatar: 'S',
    color: '#f59e0b',
    timestamp: '11:16 PM',
    preview: 'Mahes dearrrr! Happiest Birthday to you! May this year bring endless...',
    initialMsgs: [
      { sender: 'them', text: 'Mahes dearrrr! Happiest Birthday to you!', time: '11:12 PM' },
      { sender: 'them', text: 'May this year bring you endless smiles, laughter, and pure happiness!', time: '11:13 PM' },
      { sender: 'them', text: 'You are truly one in a million and my sweetest bestie ever!', time: '11:14 PM' },
      { sender: 'them', text: 'Treat eppo thara pora? We have to celebrate big time!', time: '11:15 PM' },
      { sender: 'them', text: 'Never stop smiling Mahes, love you always!', time: '11:16 PM' },
    ],
    replies: [
      'Thank you so much Sanjuuu! You are the best!',
      'Hahaha treat kandippa undu! Love you too!',
      'Thanks for always being there with me Sanjuuu!',
      'So lucky to have a bestie like you!',
    ],
    replyResponse: 'Awww Mahes! Enjoy your day to the maximum! Sending you big virtual hugs!',
  },
  nikkii: {
    key: 'nikkii',
    name: 'NIkkii',
    handle: '@nikkii.vibes',
    avatar: 'N',
    color: '#3b82f6',
    timestamp: '10:59 PM',
    preview: 'Happy Birthday Mahes! Wishing you the most magical and...',
    initialMsgs: [
      { sender: 'them', text: 'Happy Birthday Mahes! Wishing you the most magical and beautiful day!', time: '10:58 PM' },
      { sender: 'them', text: 'May all your dreams turn into reality this year. Keep rocking like always, Mahes!', time: '10:59 PM' },
    ],
    replies: [
      'Thank you so much NIkkii!',
      'Love you NIkkii! So happy to have you!',
    ],
    replyResponse: 'Always here for you Mahes! Have a blasting birthday celebration!',
  },
  hemaa: {
    key: 'hemaa',
    name: 'Hemaa',
    handle: '@hemaa_sparkle',
    avatar: 'H',
    color: '#10b981',
    timestamp: '09:45 PM',
    preview: 'Happy Happy Birthday to my dear Mahes! Always stay blessed...',
    initialMsgs: [
      { sender: 'them', text: 'Happy Happy Birthday to my dear Mahes!', time: '09:42 PM' },
      { sender: 'them', text: 'God bless you with all peace, health, and endless joy! Always stay blessed!', time: '09:43 PM' },
      { sender: 'them', text: 'You bring so much positivity and sunshine into our lives!', time: '09:44 PM' },
      { sender: 'them', text: 'Have a super special celebration today, Mahes!', time: '09:45 PM' },
    ],
    replies: [
      'Thank you so much Hemaa!',
      'Thank you for your lovely blessings Hemaa!',
      'So sweet of you Hemaa! Thanks a lot!',
    ],
    replyResponse: 'Keep that glowing smile always, Mahes! Happy Birthday once again!',
  },
  ranjuu: {
    key: 'ranjuu',
    name: 'Ranjuu',
    handle: '@ranjuu_cherished',
    avatar: 'R',
    color: '#8b5cf6',
    timestamp: '09:41 PM',
    preview: 'Dearest Mahes! Wishing you a very Happy Birthday! You bring so much...',
    initialMsgs: [
      { sender: 'them', text: 'Dearest Mahes! Wishing you a very Happy Birthday!', time: '09:39 PM' },
      { sender: 'them', text: 'May your journey ahead be filled with sweet surprises, laughter, and success!', time: '09:40 PM' },
      { sender: 'them', text: 'You bring so much warmth and fun into our lives. Have the best year ahead, Mahes!', time: '09:41 PM' },
    ],
    replies: [
      'Thank you so much Ranjuu!',
      'Thanks for such warm wishes Ranjuu!',
      'So grateful for our friendship Ranjuu!',
    ],
    replyResponse: 'Cheers to many more wonderful years together! Enjoy your special day, Mahes!',
  },
  vishnu: {
    key: 'vishnu',
    name: 'Vishnu',
    handle: '@vishnu',
    avatar: 'V',
    color: '#0ea5e9',
    timestamp: '08:30 PM',
    preview: 'Looking up at the same sky with you... always.',
    initialMsgs: [
      { sender: 'them', text: 'Happy Birthday Maheswari! Wishing you the happiest and most magical day ever!', time: '08:27 PM' },
      { sender: 'them', text: 'I built this special digital universe just for you to celebrate every wonderful memory.', time: '08:28 PM' },
      { sender: 'them', text: 'Looking up at the same sky with you... always.', time: '08:29 PM' },
      { sender: 'them', text: 'You are my entire world, Ammu. Forever and always.', time: '08:30 PM' },
    ],
    replies: [
      'Thank you so much Vishnu!',
      'I love this surprise so much!',
      'Looking up at the same sky with you too...',
    ],
    replyResponse: 'You deserve all the love, happiness, and peace in the universe, Ammu! Always with you.',
  },
};

/* =====================================================================
   DATA: MAIL INBOX (Reference Image 1 & 2 Style with Atideto Logo)
   ===================================================================== */
const MAIL_INBOX_ITEMS = [
  {
    id: 'vishnu',
    sender: 'Vishnu R',
    email: 'vishnu@atideto.in',
    isAtidetoLogo: true,
    avatarImg: '/assets/atideto-logo.png',
    avatarLetter: 'V',
    avatarColor: '#2563eb',
    subject: 'Your annual memory archive is live',
    dateLabel: 'Today, 11:00 PM',
    bodyGreeting: 'Happy Birthday!',
    bodyLines: [
      'This phone was crafted as a living keepsake for you. Inside you will find hidden notes, illustrated memories, our handcrafted scrapbooks, and our sweetest moments together.',
      'Clue for Diary Page 3: What lights up the night sky above the hillside in our favorite memory?',
      'Looking up at the same sky with you... always.',
    ],
    signOff: [
      'Warmest birthday wishes,',
      'Vishnu R',
      'CEO, Atideto Technologies',
    ],
  },
  {
    id: 'stargazer',
    sender: 'Stargazer Society',
    email: 'skywatch@stargazer.org',
    isAtidetoLogo: false,
    avatarLetter: 'S',
    avatarColor: '#2563eb',
    subject: 'Hilltop observation log #1121',
    dateLabel: 'Today, 8:15 PM',
    bodyGreeting: 'Observation Notice #1121',
    bodyLines: [
      'Sky conditions tonight are crystal clear with maximum stellar visibility.',
      'A special celestial alignment shines over the hills tonight in celebration of a very special birthday.',
      'Keep your eyes on the evening horizon.',
    ],
    signOff: ['Stargazer Society Observatory Team'],
  },
  {
    id: 'cafe',
    sender: 'Midnight Cafe',
    email: 'reserve@midnightcafe.com',
    isAtidetoLogo: false,
    avatarLetter: 'M',
    avatarColor: '#9333ea',
    subject: 'Table for two by the rainy window',
    dateLabel: 'Yesterday',
    bodyGreeting: 'Reservation Confirmed',
    bodyLines: [
      'Your favorite corner table by the rainy window has been reserved.',
      'Warm drinks, soft acoustic melodies, and sweet conversations are waiting for you.',
    ],
    signOff: ['The Midnight Cafe Baristas'],
  },
  {
    id: 'gift',
    sender: 'Gift Vault Delivery',
    email: 'surprise@giftvault.delivery',
    isAtidetoLogo: false,
    avatarLetter: 'G',
    avatarColor: '#059669',
    subject: 'Redeemable Birthday Surprise Inside',
    dateLabel: '2 days ago',
    bodyGreeting: 'Special Package Notification',
    bodyLines: [
      'A personal surprise package packed with loving thoughts has been delivered to your digital phone.',
      'Tap Special Gift anytime to unwrap your celebration.',
    ],
    signOff: ['Gift Vault Concierge'],
  },
];

/* Tone audio helper */
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
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.42);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    }
  } catch (e) {}
};

/* =====================================================================
   MAIN COMPONENT: MobileBirthdayPhone
   ===================================================================== */
const MobileBirthdayPhone = ({ onSelectSection }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [currentTime, setCurrentTime] = useState('23:06');

  // Music Context (Plays Always across any page visits)
  const {
    currentTrackIndex,
    currentTrack,
    isPlaying,
    audioProgress,
    audioDuration,
    audioCurrentTime,
    handlePlayPause,
    handleNextTrack,
    handlePrevTrack,
    handleSeek,
    handleSelectTrack,
    MUSIC_TRACKS,
    startMusic,
  } = useMusic();

  // ONLY start music from Home Screen
  useEffect(() => {
    if (typeof startMusic === 'function') {
      startMusic();
    }
    const onHomeTouch = () => {
      if (typeof startMusic === 'function') {
        startMusic();
      }
    };
    window.addEventListener('touchstart', onHomeTouch, { once: true });
    window.addEventListener('click', onHomeTouch, { once: true });
    return () => {
      window.removeEventListener('touchstart', onHomeTouch);
      window.removeEventListener('click', onHomeTouch);
    };
  }, [startMusic]);

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

  // Special Gift State (Pose reveal + Scoped Confetti inside Gift Modal only)
  const [giftPose, setGiftPose] = useState(null);
  const [showGiftCelebration, setShowGiftCelebration] = useState(false);
  const giftCanvasRef = useRef(null);
  const giftConfettiRef = useRef(null);

  // Confetti instance strictly scoped to the Gift Modal canvas (never on Home Screen)
  useEffect(() => {
    if (activeModal === 'gift' && giftCanvasRef.current) {
      if (typeof window !== 'undefined' && window.confetti && typeof window.confetti.create === 'function') {
        try {
          giftConfettiRef.current = window.confetti.create(giftCanvasRef.current, {
            resize: true,
            useWorker: true,
          });
        } catch (e) {}
      }
    } else {
      if (giftConfettiRef.current) {
        try {
          giftConfettiRef.current.reset();
        } catch (e) {}
        giftConfettiRef.current = null;
      }
      if (typeof window !== 'undefined' && window.confetti && typeof window.confetti.reset === 'function') {
        try {
          window.confetti.reset();
        } catch (e) {}
      }
    }
    return () => {
      if (giftConfettiRef.current) {
        try {
          giftConfettiRef.current.reset();
        } catch (e) {}
        giftConfettiRef.current = null;
      }
    };
  }, [activeModal]);

  const handleShowerConfetti = () => {
    playTone('success');

    // Confetti runs ONLY inside this modal canvas - strictly NOT on home screen
    try {
      if (!giftConfettiRef.current && giftCanvasRef.current && typeof window !== 'undefined' && window.confetti && typeof window.confetti.create === 'function') {
        giftConfettiRef.current = window.confetti.create(giftCanvasRef.current, {
          resize: true,
          useWorker: true,
        });
      }
      if (giftConfettiRef.current) {
        giftConfettiRef.current({
          particleCount: 75,
          spread: 68,
          origin: { x: 0.5, y: 0.62 },
          colors: ['#ff9ffc', '#e5a93c', '#38bdf8', '#c084fc', '#ffffff', '#fb7185', '#fbbf24'],
          disableForReducedMotion: true,
        });
      }
    } catch (e) {}

    // Pick one of the 10 poses randomly (or cycle to a different one)
    let nextNum = Math.floor(Math.random() * 10) + 1;
    if (giftPose) {
      const match = giftPose.image.match(/pose-(\d+)\.png/);
      if (match) {
        const cur = parseInt(match[1], 10);
        if (nextNum === cur) {
          nextNum = (nextNum % 10) + 1;
        }
      }
    }
    const numStr = String(nextNum).padStart(2, '0');
    setGiftPose({
      image: `/assets/pose-${numStr}.png`,
      fallback: `/assets/pose-${numStr}.jpg`,
      num: numStr,
    });
    setShowGiftCelebration(true);
  };

  const openApp = (appId) => {
    playTone('click');
    if (appId === 'diary') {
      onSelectSection('story');
      return;
    }
    if (appId === 'scrapbook') {
      onSelectSection('sketchbook');
      return;
    }
    if (appId === 'gift') {
      setShowGiftCelebration(false);
      setGiftPose(null);
    }
    setActiveModal(appId);
  };

  const closeModal = () => {
    playTone('click');
    if (giftConfettiRef.current) {
      try {
        giftConfettiRef.current.reset();
      } catch (e) {}
      giftConfettiRef.current = null;
    }
    if (typeof window !== 'undefined' && window.confetti && typeof window.confetti.reset === 'function') {
      try {
        window.confetti.reset();
      } catch (e) {}
    }
    setActiveModal(null);
  };

  /* =========================================================================
     GALLERY STATE (Reference Image 3 & 4)
     ========================================================================= */
  const [galleryViewerImg, setGalleryViewerImg] = useState(null);
  const [galleryViewerIdx, setGalleryViewerIdx] = useState(0);
  const [galleryActiveCategoryImgs, setGalleryActiveCategoryImgs] = useState([]);
  const [galleryActiveCaption, setGalleryActiveCaption] = useState('This lighting is perfect');
  const [photoRotation, setPhotoRotation] = useState(0);

  const openGalleryPhoto = (imgSrc, imgList, idx, caption) => {
    playTone('click');
    setGalleryActiveCategoryImgs(imgList || [imgSrc]);
    setGalleryViewerIdx(idx || 0);
    setGalleryViewerImg(imgSrc);
    setGalleryActiveCaption(caption || 'This lighting is perfect');
    setPhotoRotation(0);
  };

  const closeGalleryViewer = () => {
    playTone('click');
    setGalleryViewerImg(null);
    setPhotoRotation(0);
  };

  const handleNextGalleryPhoto = () => {
    if (!galleryActiveCategoryImgs.length) return;
    const next = (galleryViewerIdx + 1) % galleryActiveCategoryImgs.length;
    setGalleryViewerIdx(next);
    setGalleryViewerImg(galleryActiveCategoryImgs[next]);
    setPhotoRotation(0);
  };

  const handlePrevGalleryPhoto = () => {
    if (!galleryActiveCategoryImgs.length) return;
    const prev = (galleryViewerIdx - 1 + galleryActiveCategoryImgs.length) % galleryActiveCategoryImgs.length;
    setGalleryViewerIdx(prev);
    setGalleryViewerImg(galleryActiveCategoryImgs[prev]);
    setPhotoRotation(0);
  };

  const handleRotatePhoto = () => {
    playTone('click');
    setPhotoRotation((prev) => (prev + 90) % 360);
  };

  /* =========================================================================
     MESSAGES APP STATE (Reference Image 3 Inbox)
     ========================================================================= */
  const [activeMessageFriendKey, setActiveMessageFriendKey] = useState(null);
  const [friendsThreads, setFriendsThreads] = useState(() => {
    const init = {};
    Object.keys(FRIENDS_CHATS).forEach((k) => {
      init[k] = [...FRIENDS_CHATS[k].initialMsgs];
    });
    return init;
  });
  const [isFriendTyping, setIsFriendTyping] = useState(false);

  const handleSendFriendMessage = (friendKey, msgText) => {
    playTone('click');
    const newMsg = { sender: 'me', text: msgText, time: currentTime };
    setFriendsThreads((prev) => ({
      ...prev,
      [friendKey]: [...(prev[friendKey] || []), newMsg],
    }));

    setIsFriendTyping(true);
    setTimeout(() => {
      setIsFriendTyping(false);
      playTone('success');
      const friendObj = FRIENDS_CHATS[friendKey];
      const replyText = friendObj ? friendObj.replyResponse : 'Happy Birthday Mahes!';
      setFriendsThreads((prev) => ({
        ...prev,
        [friendKey]: [...(prev[friendKey] || []), { sender: 'them', text: replyText, time: currentTime }],
      }));
    }, 1000);
  };

  /* =========================================================================
     MAIL STATE (Reference Image 1 & 2)
     ========================================================================= */
  const [activeMailItem, setActiveMailItem] = useState(null);

  /* =========================================================================
     PHONE DIALER STATE
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
     CALCULATOR STATE (Reference Image 2 Real Calculator)
     ========================================================================= */
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcFormula, setCalcFormula] = useState('');
  const [calcSecret, setCalcSecret] = useState(null);

  const handleCalcBtn = (action) => {
    playTone('click');
    if (action === 'AC') {
      setCalcDisplay('0');
      setCalcFormula('');
      setCalcSecret(null);
      return;
    }
    if (action === 'backspace') {
      setCalcDisplay((prev) => {
        if (prev.length <= 1 || prev === 'Error') return '0';
        return prev.slice(0, -1);
      });
      return;
    }
    if (action === '+/-') {
      setCalcDisplay((prev) => {
        if (prev === '0' || prev === 'Error') return prev;
        if (prev.startsWith('-')) return prev.slice(1);
        return '-' + prev;
      });
      return;
    }
    if (action === '%') {
      setCalcDisplay((prev) => {
        try {
          const val = parseFloat(prev);
          if (isNaN(val)) return 'Error';
          return String(val / 100);
        } catch (e) {
          return 'Error';
        }
      });
      return;
    }
    if (action === '=') {
      if (calcDisplay === '2211' || calcDisplay === '1204' || calcDisplay === '22') {
        playTone('success');
        setCalcFormula(calcDisplay + ' =');
        setCalcSecret('Vishnu loves you to infinity and beyond, Maheswari!');
        return;
      }
      try {
        setCalcFormula(calcDisplay + ' =');
        const sanitized = calcDisplay
          .replace(/÷/g, '/')
          .replace(/×/g, '*')
          .replace(/−/g, '-')
          .replace(/[^0-9+\-*/.]/g, '');
        // eslint-disable-next-line no-eval
        const res = Function(`'use strict'; return (${sanitized})`)();
        const formattedRes = Number.isInteger(res) ? String(res) : parseFloat(res.toFixed(6)).toString();
        setCalcDisplay(formattedRes);
      } catch (e) {
        setCalcDisplay('Error');
      }
      return;
    }

    const isOp = ['+', '−', '×', '÷'].includes(action);
    setCalcDisplay((prev) => {
      if (prev === 'Error') return isOp ? '0' + action : String(action);
      if (prev === '0') {
        if (isOp) return '0' + action;
        if (action === '.') return '0.';
        return String(action);
      }
      const lastChar = prev.slice(-1);
      if (['+', '−', '×', '÷'].includes(lastChar) && isOp) {
        return prev.slice(0, -1) + action;
      }
      return prev + String(action);
    });
  };

  /* =========================================================================
     APP GRID CONFIGURATION (8 APPS - ZERO PIXABOWL, ZERO ARROW, ZERO SYMMETRY)
     ========================================================================= */
  const apps = [
    { id: 'messages', label: 'Messages', bg: 'tile-messages', icon: 'messages', badge: '5' },
    { id: 'phone', label: 'Phone', bg: 'tile-phone', icon: 'phone' },
    { id: 'mail', label: 'Mail', bg: 'tile-mail', icon: 'mail', badge: '4' },
    { id: 'gallery', label: 'Gallery', bg: 'tile-gallery', icon: 'gallery' },
    { id: 'music', label: 'Music', bg: 'tile-music', icon: 'music', badge: '10', badgeColor: 'badge-blue' },
    { id: 'calculator', label: 'Calculator', bg: 'tile-calc', icon: 'calc' },
    { id: 'settings', label: 'Settings', bg: 'tile-settings', icon: 'settings', isBordered: true },
    { id: 'gift', label: 'Special Gift', bg: 'tile-gift', icon: 'gift' },
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
      case 'music':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
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
      case 'settings':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
        );
      case 'gift':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="18" height="4" rx="1" />
            <path d="M12 8v13" />
            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="native-phone-stage">
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

        {/* Hero Header - ONLY "Happy Birthday Maheswari" */}
        <div className="native-hero-header">
          <h1 className="hero-title">Happy Birthday Maheswari</h1>
        </div>

        {/* TWO BIG FEATURE CARDS: SCRAPBOOK & NOTES (Reference Image 1) */}
        <section className="featured-duo-cards-row">
          {/* Featured Card 1: Scrapbook */}
          <div
            className="big-featured-card card-scrapbook-duo"
            onClick={() => openApp('scrapbook')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') openApp('scrapbook');
            }}
            aria-label="Open Scrapbook"
          >
            <div className="duo-card-visual">
              <img
                src="/assets/sketchbook-cover.jpg"
                alt="Scrapbook Cover"
                className="duo-scrapbook-cover-img"
                onError={(e) => {
                  e.target.src = 'assets/sketchbook-cover.jpg';
                }}
              />
            </div>
            <span className="duo-card-title">Scrapbook</span>
          </div>

          {/* Featured Card 2: Notes */}
          <div
            className="big-featured-card card-notes-duo"
            onClick={() => openApp('diary')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') openApp('diary');
            }}
            aria-label="Open Notes"
          >
            <div className="duo-card-visual">
              <div className="duo-notes-paper-mock">
                <div className="notes-mock-header">Chapter M</div>
                <div className="notes-mock-lines">
                  <div className="mock-line" />
                  <div className="mock-line accent" />
                  <div className="mock-line" />
                  <div className="mock-line short" />
                  <div className="mock-line" />
                </div>
              </div>
            </div>
            <span className="duo-card-title">Notes</span>
          </div>
        </section>

        {/* 8-App Grid arranged neatly below the big cards */}
        <main className="unified-app-grid">
          {apps.map((app) => (
            <button
              key={app.id}
              type="button"
              className="app-cell-btn"
              onClick={() => openApp(app.id)}
              aria-label={`Open ${app.label}`}
            >
              <div className={`generic-tile ${app.bg} ${app.isBordered ? 'tile-bordered' : ''}`}>
                {renderIconSvg(app.icon)}
                {app.badge && (
                  <span className={`badge-dot ${app.badgeColor || 'badge-red'}`}>{app.badge}</span>
                )}
              </div>
              <span className="app-cell-label">{app.label}</span>
            </button>
          ))}
        </main>
      </div>

      {/* =====================================================================
          MODAL 1: MESSAGES APP (Reference Image 3 Style - "Mahi" -> "Mahes")
          ===================================================================== */}
      {activeModal === 'messages' && (
        <div className="native-app-modal messages-modal-redesign">
          {activeMessageFriendKey === null ? (
            /* MESSAGES INBOX THREAD LIST VIEW */
            <div className="messages-inbox-stage">
              <header className="messages-list-header">
                <h2 className="messages-list-title">Messages</h2>
                <button
                  type="button"
                  className="modal-x-btn"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </header>

              <div className="messages-threads-scroll">
                {Object.values(FRIENDS_CHATS).map((f) => (
                  <div
                    key={f.key}
                    className="thread-row-item"
                    onClick={() => {
                      playTone('click');
                      setActiveMessageFriendKey(f.key);
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="thread-avatar-circle" style={{ backgroundColor: f.color }}>
                      {f.avatar}
                    </div>
                    <div className="thread-text-block">
                      <div className="thread-top-line">
                        <span className="thread-contact-name">{f.name}</span>
                        <span className="thread-timestamp">{f.timestamp}</span>
                      </div>
                      <div className="thread-bottom-line">
                        <span className="thread-preview-text">{f.preview}</span>
                        <span className="thread-unread-cyan-dot" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* CONVERSATION VIEW WITH FRIEND */
            <div className="messages-conversation-stage">
              <header className="conversation-header-bar">
                <button
                  type="button"
                  className="conversation-back-btn"
                  onClick={() => {
                    playTone('click');
                    setActiveMessageFriendKey(null);
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <span>Back</span>
                </button>
                <div className="conversation-header-meta">
                  <span
                    className="header-avatar-mini"
                    style={{ backgroundColor: FRIENDS_CHATS[activeMessageFriendKey]?.color }}
                  >
                    {FRIENDS_CHATS[activeMessageFriendKey]?.avatar}
                  </span>
                  <div className="header-meta-text">
                    <span className="meta-name">{FRIENDS_CHATS[activeMessageFriendKey]?.name}</span>
                    <span className="meta-handle">{FRIENDS_CHATS[activeMessageFriendKey]?.handle}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="modal-x-btn"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </header>

              <div className="messages-stream">
                {(friendsThreads[activeMessageFriendKey] || []).map((m, idx) => (
                  <div
                    key={idx}
                    className={`chat-bubble ${m.sender === 'me' ? 'bubble-me' : 'bubble-them'}`}
                  >
                    <p className="bubble-content">{m.text}</p>
                    <span className="bubble-ts">{m.time}</span>
                  </div>
                ))}
                {isFriendTyping && (
                  <div className="chat-bubble bubble-them typing-indicator">
                    <span>{FRIENDS_CHATS[activeMessageFriendKey]?.name} is typing...</span>
                  </div>
                )}
              </div>

              {/* Quick Birthday Response Chips */}
              <div className="quick-replies-tray">
                {(FRIENDS_CHATS[activeMessageFriendKey]?.replies || []).map((replyTxt, rIdx) => (
                  <button
                    key={rIdx}
                    type="button"
                    className="reply-chip"
                    onClick={() => handleSendFriendMessage(activeMessageFriendKey, replyTxt)}
                  >
                    {replyTxt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          MODAL 2: GALLERY (Reference Image 3 & 4: Exact Same Size Images + Lightbox)
          ===================================================================== */}
      {activeModal === 'gallery' && (
        <div className="native-app-modal gallery-modal">
          {galleryViewerImg === null ? (
            /* GALLERY GRID VIEW (Matches Reference Image 3) */
            <div className="gallery-grid-stage">
              <header className="gallery-top-nav">
                <div className="gallery-nav-left">
                  <svg className="gallery-eye-svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                </div>
                <h2 className="gallery-nav-title">Gallery</h2>
                <button
                  type="button"
                  className="modal-x-btn"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </header>

              <div className="gallery-scroll-container">
                {/* Vault Photos Revealed Banner (Reference Image 3) */}
                <div className="vault-revealed-pill-banner">
                  <span>Hidden Vault photos revealed!</span>
                </div>

                {ALL_GALLERY_COLLECTIONS.map((cat, cIdx) => (
                  <section key={cIdx} className="gallery-category-group">
                    <h3 className="gallery-category-heading">{cat.title}</h3>
                    {/* All Images Exact Same Size */}
                    <div className="gallery-uniform-grid">
                      {cat.images.map((imgSrc, pIdx) => (
                        <div
                          key={pIdx}
                          className="gallery-uniform-card"
                          onClick={() => openGalleryPhoto(imgSrc, cat.images, pIdx, cat.caption)}
                          role="button"
                          tabIndex={0}
                        >
                          <img
                            src={imgSrc}
                            alt={`${cat.title} ${pIdx + 1}`}
                            className="uniform-photo-img"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          ) : (
            /* FULL IMAGE DETAIL VIEWER (Matches Reference Image 4) */
            <div className="gallery-image-detail-stage">
              {/* Top Bar matching Reference Image 4 */}
              <header className="gallery-detail-header">
                <button
                  type="button"
                  className="gallery-back-arrow-btn"
                  onClick={closeGalleryViewer}
                  aria-label="Back to Gallery"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <h2 className="gallery-nav-title">Gallery</h2>
                <button
                  type="button"
                  className="modal-x-btn"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </header>

              {/* Italic Quote on Top of Image matching Reference Image 4 */}
              <div className="detail-caption-box">
                <span className="detail-italic-caption">&ldquo;{galleryActiveCaption}&rdquo;</span>
              </div>

              {/* Center Main Photo Stage */}
              <div className="detail-photo-stage">
                <button
                  type="button"
                  className="detail-arrow-nav left"
                  onClick={handlePrevGalleryPhoto}
                  aria-label="Previous"
                >
                  ‹
                </button>
                <div
                  className="detail-img-wrapper"
                  style={{ transform: `rotate(${photoRotation}deg)` }}
                >
                  <img
                    src={galleryViewerImg}
                    alt="Memory detail"
                    className="detail-large-photo"
                  />
                </div>
                <button
                  type="button"
                  className="detail-arrow-nav right"
                  onClick={handleNextGalleryPhoto}
                  aria-label="Next"
                >
                  ›
                </button>
              </div>

              {/* Bottom 3 Action Tools matching Reference Image 4 */}
              <footer className="gallery-detail-bottom-tools">
                {/* 1. Frame / Crop Icon */}
                <button
                  type="button"
                  className="detail-tool-btn"
                  onClick={() => playTone('click')}
                  title="Frame Fit"
                  aria-label="Frame Fit"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                  </svg>
                </button>

                {/* 2. Rotate Icon (Rotates 90 degrees) */}
                <button
                  type="button"
                  className="detail-tool-btn rotate-btn"
                  onClick={handleRotatePhoto}
                  title="Rotate Photo"
                  aria-label="Rotate Photo"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                </button>

                {/* 3. Info / Note Icon */}
                <button
                  type="button"
                  className="detail-tool-btn"
                  onClick={() => {
                    playTone('success');
                    triggerConfetti();
                  }}
                  title="Special Memory"
                  aria-label="Special Memory"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </button>
              </footer>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          MODAL 3: MUSIC PLAYER (Plays Always & Continuous Audio)
          ===================================================================== */}
      {activeModal === 'music' && (
        <div className="native-app-modal music-modal">
          <header className="modal-top-bar bg-sky-950">
            <div className="modal-title-wrap">
              <h2>Music Player</h2>
              <span className="modal-sub">10 Romantic Melodies • Always Playing</span>
            </div>
            <button
              type="button"
              className="modal-x-btn"
              onClick={closeModal}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
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
              <button
                type="button"
                className="ctrl-btn-round"
                onClick={handlePrevTrack}
                aria-label="Previous Track"
              >
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
              <button
                type="button"
                className="ctrl-btn-round"
                onClick={handleNextTrack}
                aria-label="Next Track"
              >
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
          MODAL 4: PHONE DIALER (Reference Image 1: Violet Theme, Zoey's -> Maheswari's phone)
          ===================================================================== */}
      {activeModal === 'phone' && (
        <div className="native-app-modal violet-phone-modal">
          {/* Top Status Bar: Diamond, Clock-arrow, Device Name, Wifi, Battery */}
          <div className="phone-ref-top-status">
            <div className="phone-ref-status-left">
              <svg className="phone-ref-status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 12l10 10 10-10L12 2z" />
              </svg>
              <svg className="phone-ref-status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85 1.04 6.53 2.73L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
            </div>
            <span className="phone-ref-device-name">Maheswari&apos;s phone</span>
            <div className="phone-ref-status-right">
              <svg className="phone-ref-status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
              <div className="phone-ref-battery-badge">
                <div className="phone-ref-battery-level" />
              </div>
            </div>
          </div>

          {/* Main Header: History icon on left, "Phone" in center, Close "X" on right */}
          <header className="phone-ref-header">
            <button
              type="button"
              className="phone-ref-icon-btn"
              onClick={() => playTone('click')}
              aria-label="Call History"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 15" />
                <path d="M3.05 11a9 9 0 0 1 .5-2" />
              </svg>
            </button>

            <h2 className="phone-ref-title">Phone</h2>

            <button
              type="button"
              className="phone-ref-icon-btn"
              onClick={closeModal}
              aria-label="Close"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </header>

          <div className="phone-ref-body">
            {callActive ? (
              <div className="call-active-stage violet-call-active">
                <div className="caller-avatar-circle violet-avatar">V</div>
                <h3 className="caller-name">Vishnu</h3>
                <span className="call-duration-text">{callTimer}s</span>
                <p className="call-sweet-whisper">
                  &ldquo;I am always just one call away, Ammu. Happy Birthday Maheswari!&rdquo;
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
              <div className="phone-ref-dialer-wrap">
                {/* Dialed Digits Display if user typed */}
                {dialNumber ? (
                  <div className="phone-ref-display-row">
                    <span className="phone-ref-digits">{dialNumber}</span>
                    <button
                      type="button"
                      className="phone-ref-backspace-btn"
                      onClick={() => {
                        playTone('click');
                        setDialNumber((prev) => prev.slice(0, -1));
                      }}
                      aria-label="Delete"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                        <line x1="18" y1="9" x2="12" y2="15" />
                        <line x1="12" y1="9" x2="18" y2="15" />
                      </svg>
                    </button>
                  </div>
                ) : null}

                {/* Warning box matching Reference Image 1 */}
                <div className="phone-ref-warning-box">
                  <svg className="phone-ref-warning-icon" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p className="phone-ref-warning-text">
                    Calling functionality not detected on this device
                  </p>
                </div>

                {/* Keypad Grid: 3 x 4 rounded rectangle cards */}
                <div className="phone-ref-keypad-grid">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      className="phone-ref-key-card"
                      onClick={() => {
                        playTone('click');
                        setDialNumber((prev) => prev + String(d));
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                {/* Centered Call Button matching Reference Image 1 */}
                <div className="phone-ref-call-row">
                  <button
                    type="button"
                    className="phone-ref-call-btn"
                    onClick={() => {
                      playTone('success');
                      setCallActive(true);
                    }}
                    aria-label="Call"
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 5: MAIL APP (Reference Image 1 Inbox & Reference Image 2 Detail)
          ===================================================================== */}
      {activeModal === 'mail' && (
        <div className="native-app-modal mail-modal-redesign">
          {activeMailItem === null ? (
            /* MAIL INBOX LIST VIEW (Matches Reference Image 1) */
            <div className="mail-inbox-stage">
              <header className="mail-inbox-header">
                <span className="mail-inbox-tag">INBOX</span>
                <button
                  type="button"
                  className="modal-x-btn"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </header>

              <div className="mail-threads-scroll">
                {MAIL_INBOX_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="mail-row-item"
                    onClick={() => {
                      playTone('click');
                      setActiveMailItem(item);
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    {item.isAtidetoLogo ? (
                      <div className="mail-avatar-wrapper atideto-logo-avatar">
                        <img
                          src={item.avatarImg}
                          alt="Atideto Logo"
                          className="atideto-avatar-img"
                        />
                      </div>
                    ) : (
                      <div
                        className="mail-avatar-wrapper letter-avatar"
                        style={{ backgroundColor: item.avatarColor }}
                      >
                        {item.avatarLetter}
                      </div>
                    )}

                    <div className="mail-row-content">
                      <div className="mail-row-top">
                        <span className="mail-sender-name">{item.sender}</span>
                        <span className="mail-date-label">{item.dateLabel}</span>
                      </div>
                      <div className="mail-row-bottom">
                        <span className="mail-subject-snippet">{item.subject}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* MAIL DETAIL VIEW (Matches Reference Image 2) */
            <div className="mail-detail-stage">
              <header className="mail-detail-top-nav">
                <button
                  type="button"
                  className="mail-back-btn"
                  onClick={() => {
                    playTone('click');
                    setActiveMailItem(null);
                  }}
                  aria-label="Back to Inbox"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <h2 className="mail-nav-title">Mail</h2>
                <button
                  type="button"
                  className="modal-x-btn"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </header>

              <div className="mail-detail-body">
                {/* Subject with Gold Star matching Reference Image 2 */}
                <div className="mail-subject-star-row">
                  <h3 className="mail-opened-subject">{activeMailItem.subject}</h3>
                  <svg
                    className="gold-star-svg"
                    viewBox="0 0 24 24"
                    fill="#facc15"
                    stroke="#facc15"
                    strokeWidth="1"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>

                {/* Sender Info Row */}
                <div className="mail-sender-profile-row">
                  {activeMailItem.isAtidetoLogo ? (
                    <div className="mail-detail-avatar atideto-logo-avatar">
                      <img
                        src={activeMailItem.avatarImg}
                        alt="Atideto Logo"
                        className="atideto-avatar-img"
                      />
                    </div>
                  ) : (
                    <div
                      className="mail-detail-avatar letter-avatar"
                      style={{ backgroundColor: activeMailItem.avatarColor }}
                    >
                      {activeMailItem.avatarLetter}
                    </div>
                  )}

                  <div className="mail-sender-meta">
                    <span className="mail-sender-title">{activeMailItem.sender}</span>
                    <span className="mail-sender-email">&lt;{activeMailItem.email}&gt;</span>
                    <span className="mail-meta-date">{activeMailItem.dateLabel}</span>
                  </div>
                </div>

                <div className="mail-divider-line" />

                {/* Email Body Content */}
                <div className="mail-letter-content">
                  <p className="letter-greeting">{activeMailItem.bodyGreeting}</p>
                  {activeMailItem.bodyLines.map((line, lIdx) => (
                    <p key={lIdx} className="letter-paragraph">
                      {line}
                    </p>
                  ))}
                  {activeMailItem.signOff && (
                    <div className="letter-sign-off">
                      {activeMailItem.signOff.map((sLine, sIdx) => (
                        <span key={sIdx} className="sign-line">
                          {sLine}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          MODAL 6: SPECIAL GIFT
          ===================================================================== */}
      {activeModal === 'gift' && (
        <div className="native-app-modal gift-modal">
          {/* Scoped confetti canvas - Confetti is rendered HERE ONLY and never escapes to home screen */}
          <canvas
            ref={giftCanvasRef}
            className="gift-modal-confetti-canvas"
            aria-hidden="true"
          />
          <header className="modal-top-bar bg-amber-950">
            <div className="modal-title-wrap">
              <h2>Special Gift</h2>
              <span className="modal-sub">For Maheswari</span>
            </div>
            <button
              type="button"
              className="modal-x-btn"
              onClick={closeModal}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </header>

          <div className="gift-view-body">
            {!showGiftCelebration ? (
              <>
                <div className="gift-gold-box">
                  <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="#e5a93c" strokeWidth="1.5">
                    <rect x="3" y="8" width="18" height="4" rx="1" />
                    <path d="M12 8v13" />
                    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                  </svg>
                </div>
                <h3 className="gift-heading">A Heartfelt Birthday Gift</h3>
                <p className="gift-quote">
                  &ldquo;May your day be filled with warm sunshine, endless laughter, and all the love in the universe. Happy Birthday Ammu!&rdquo;
                </p>
              </>
            ) : (
              <div className="gift-celebration-container anim-pop-in">
                {giftPose && (
                  <div className="gift-pose-stage">
                    <div className="gift-pose-aura" aria-hidden="true"></div>
                    <img
                      src={giftPose.image}
                      alt="Birthday Pose"
                      className="gift-pose-photo"
                      onError={(e) => {
                        if (e.target.src !== giftPose.fallback) {
                          e.target.src = giftPose.fallback;
                        }
                      }}
                    />
                  </div>
                )}
                <div className="gift-vishnu-banner">
                  <span className="gift-vishnu-tag">A Special Celebration</span>
                  <h3 className="gift-vishnu-msg">
                    Happy Birthday Maheswari from Vishnu
                  </h3>
                </div>
              </div>
            )}

            <button
              type="button"
              className="shower-confetti-btn"
              onClick={handleShowerConfetti}
            >
              {showGiftCelebration ? 'Shower More Confetti' : 'Shower Birthday Confetti'}
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 7: CALCULATOR (Reference Image 2 Circular Keypad & Toolbar)
          ===================================================================== */}
      {activeModal === 'calculator' && (
        <div className="native-app-modal calc-modal-redesign">
          {/* Top Bar with Expand on left, Settings and Close on right */}
          <header className="calc-top-header">
            <button
              type="button"
              className="calc-header-icon-btn"
              onClick={() => playTone('click')}
              aria-label="Expand"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>

            <div className="calc-header-actions-right">
              <button
                type="button"
                className="calc-header-icon-btn"
                onClick={() => playTone('click')}
                aria-label="Settings"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </button>
              <button
                type="button"
                className="calc-header-icon-btn calc-close-btn"
                onClick={closeModal}
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </header>

          {/* Calculator Display */}
          <div className="calc-screen-wrap">
            <div className="calc-formula-line">{calcFormula}</div>
            <div className="calc-main-display">{calcDisplay}</div>
            {calcSecret && <div className="calc-secret-toast">{calcSecret}</div>}
          </div>

          {/* Middle Toolbar Row with 3 icons matching Reference Image 2 */}
          <div className="calc-mid-toolbar">
            <button
              type="button"
              className="calc-tool-btn"
              onClick={() => playTone('click')}
              aria-label="History"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 15" />
                <path d="M3.05 11a9 9 0 0 1 .5-2" />
              </svg>
            </button>

            <button
              type="button"
              className="calc-tool-btn"
              onClick={() => playTone('click')}
              aria-label="Formulas"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M7 8l4 8" />
                <path d="M11 8l-4 8" />
                <path d="M15 10h4" />
                <path d="M16 10v6" />
                <path d="M18 10v6" />
              </svg>
            </button>

            <button
              type="button"
              className="calc-tool-btn"
              onClick={() => playTone('click')}
              aria-label="Currency Converter"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19" />
                <path d="M12 9v6m-2-4.5c0-.83.67-1.5 1.5-1.5h1a1.5 1.5 0 0 1 0 3h-1a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 0 1.5-1.5" />
              </svg>
            </button>
          </div>

          <div className="calc-divider-line" />

          {/* Keypad: 4 Columns x 5 Rows of Circular Buttons */}
          <div className="calc-circular-keypad-grid">
            {/* Row 1 */}
            <button type="button" className="calc-round-btn btn-top-func" onClick={() => handleCalcBtn('AC')}>
              AC
            </button>
            <button type="button" className="calc-round-btn btn-top-func" onClick={() => handleCalcBtn('backspace')} aria-label="Backspace">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                <line x1="18" y1="9" x2="12" y2="15" />
                <line x1="12" y1="9" x2="18" y2="15" />
              </svg>
            </button>
            <button type="button" className="calc-round-btn btn-top-func" onClick={() => handleCalcBtn('+/-')}>
              +/-
            </button>
            <button type="button" className="calc-round-btn btn-top-func btn-op-accent" onClick={() => handleCalcBtn('÷')}>
              ÷
            </button>

            {/* Row 2 */}
            <button type="button" className="calc-round-btn btn-number" onClick={() => handleCalcBtn('7')}>7</button>
            <button type="button" className="calc-round-btn btn-number" onClick={() => handleCalcBtn('8')}>8</button>
            <button type="button" className="calc-round-btn btn-number" onClick={() => handleCalcBtn('9')}>9</button>
            <button type="button" className="calc-round-btn btn-top-func btn-op-accent" onClick={() => handleCalcBtn('×')}>×</button>

            {/* Row 3 */}
            <button type="button" className="calc-round-btn btn-number" onClick={() => handleCalcBtn('4')}>4</button>
            <button type="button" className="calc-round-btn btn-number" onClick={() => handleCalcBtn('5')}>5</button>
            <button type="button" className="calc-round-btn btn-number" onClick={() => handleCalcBtn('6')}>6</button>
            <button type="button" className="calc-round-btn btn-top-func btn-op-accent" onClick={() => handleCalcBtn('−')}>−</button>

            {/* Row 4 */}
            <button type="button" className="calc-round-btn btn-number" onClick={() => handleCalcBtn('1')}>1</button>
            <button type="button" className="calc-round-btn btn-number" onClick={() => handleCalcBtn('2')}>2</button>
            <button type="button" className="calc-round-btn btn-number" onClick={() => handleCalcBtn('3')}>3</button>
            <button type="button" className="calc-round-btn btn-top-func btn-op-accent" onClick={() => handleCalcBtn('+')}>+</button>

            {/* Row 5 */}
            <button type="button" className="calc-round-btn btn-top-func" onClick={() => handleCalcBtn('%')}>%</button>
            <button type="button" className="calc-round-btn btn-number" onClick={() => handleCalcBtn('0')}>0</button>
            <button type="button" className="calc-round-btn btn-number" onClick={() => handleCalcBtn('.')}>.</button>
            <button type="button" className="calc-round-btn btn-equal-circle" onClick={() => handleCalcBtn('=')}>=</button>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 8: SETTINGS
          ===================================================================== */}
      {activeModal === 'settings' && (
        <div className="native-app-modal settings-modal">
          <header className="modal-top-bar bg-zinc-900">
            <div className="modal-title-wrap">
              <h2>Settings</h2>
              <span className="modal-sub">Maheswari Special Edition</span>
            </div>
            <button
              type="button"
              className="modal-x-btn"
              onClick={closeModal}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </header>

          <div className="settings-view-body">
            <div className="settings-section-card">
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
                <span className="set-val">M phone</span>
              </div>
              <div className="set-row">
                <span>Owner</span>
                <span className="set-val">Maheswari</span>
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

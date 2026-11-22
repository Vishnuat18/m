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
   DATA: GALLERY HIGHLIGHT PHOTOS (2xN neat grid with zero hidden vault)
   ===================================================================== */
const HIGHLIGHT_PHOTOS = [
  '/assets/gallery/splmem.jpg',
  '/assets/gallery/photo_6257769115963559422_y.jpg',
  '/assets/gallery/photo_6257769115963559423_y.jpg',
  '/assets/gallery/IMG_20260407_231902.JPG',
  '/assets/gallery/IMG_20260404_012119.JPG',
  '/assets/gallery/IMG_20260403_155001.JPG',
];

/* Combined Categories list with Highlights upfront in 2xN grid */
const ALL_GALLERY_COLLECTIONS = [
  {
    title: 'Dearest Highlights',
    layout: 'two-col',
    images: HIGHLIGHT_PHOTOS,
  },
  ...GALLERY_CATEGORIES,
];

/* =====================================================================
   DATA: BIRTHDAY MESSAGES FROM HER FRIENDS (Reference Image 3 Style)
   ===================================================================== */
const FRIENDS_CHATS = {
  sanjuuu: {
    key: 'sanjuuu',
    name: 'Sanjuuu',
    handle: '@sanjuuu_bestie',
    avatar: 'S',
    color: '#f59e0b',
    timestamp: '11:16 PM',
    preview: 'Mahi dearrrr! Happiest Birthday to you! May this year bring endless...',
    initialMsgs: [
      { sender: 'them', text: 'Mahi dearrrr! Happiest Birthday to you! May this year bring endless smiles and laughter!', time: '11:14 PM' },
      { sender: 'them', text: 'You are truly one in a million and my sweetest friend ever! Treat eppo thara pora?', time: '11:15 PM' },
      { sender: 'them', text: 'Never stop smiling di, your happiness makes everyone around you happy! Love you always!', time: '11:16 PM' },
    ],
    replies: [
      'Thank you so much Sanjuuu! You are the best!',
      'Hahaha treat kandippa undu! Love you too!',
      'Thanks for always being there with me Sanjuuu!',
    ],
    replyResponse: 'Awww Ammu! Enjoy your day to the maximum! Sending you big virtual hugs!',
  },
  nikkii: {
    key: 'nikkii',
    name: 'NIkkii',
    handle: '@nikkii.vibes',
    avatar: 'N',
    color: '#3b82f6',
    timestamp: '10:59 PM',
    preview: 'Happy Birthday Maheswari! Wishing you the most magical and...',
    initialMsgs: [
      { sender: 'them', text: 'Happy Birthday Maheswari! Wishing you the most magical and beautiful day!', time: '10:57 PM' },
      { sender: 'them', text: 'May all your dreams turn into reality this year. Keep rocking like always!', time: '10:58 PM' },
      { sender: 'them', text: 'Stay as bright and sweet as you always are, Ammu!', time: '10:59 PM' },
    ],
    replies: [
      'Thank you so much NIkkii!',
      'Thanks dear! Means so much to me!',
      'Love you NIkkii! So happy to have you!',
    ],
    replyResponse: 'Always here for you Maheswari! Have a blasting birthday celebration!',
  },
  hemaa: {
    key: 'hemaa',
    name: 'Hemaa',
    handle: '@hemaa_sparkle',
    avatar: 'H',
    color: '#10b981',
    timestamp: '09:45 PM',
    preview: 'Happy Happy Birthday to my dear Maheswari! Always stay blessed...',
    initialMsgs: [
      { sender: 'them', text: 'Happy Happy Birthday to my dear Maheswari!', time: '09:43 PM' },
      { sender: 'them', text: 'God bless you with all peace, health, and endless joy! Always stay blessed!', time: '09:44 PM' },
      { sender: 'them', text: 'Have a super special celebration today, Ammu!', time: '09:45 PM' },
    ],
    replies: [
      'Thank you so much Hemaa!',
      'Thank you for your lovely blessings Hemaa!',
      'So sweet of you Hemaa! Thank you!',
    ],
    replyResponse: 'Keep that glowing smile always, dear! Happy Birthday once again!',
  },
  ranjuu: {
    key: 'ranjuu',
    name: 'Ranjuu',
    handle: '@ranjuu_cherished',
    avatar: 'R',
    color: '#8b5cf6',
    timestamp: '09:41 PM',
    preview: 'Dearest Mahi! Wishing you a very Happy Birthday! You bring so much...',
    initialMsgs: [
      { sender: 'them', text: 'Dearest Mahi! Wishing you a very Happy Birthday!', time: '09:39 PM' },
      { sender: 'them', text: 'May your journey ahead be filled with sweet surprises, laughter, and success!', time: '09:40 PM' },
      { sender: 'them', text: 'You bring so much warmth and fun into our lives. Have the best year ahead!', time: '09:41 PM' },
    ],
    replies: [
      'Thank you so much Ranjuu!',
      'Thanks for such warm wishes Ranjuu!',
      'So grateful for our friendship Ranjuu!',
    ],
    replyResponse: 'Cheers to many more wonderful years together! Enjoy your special day, Mahi!',
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
      { sender: 'them', text: 'Happy Birthday Maheswari! Wishing you the happiest and most magical day ever!', time: '08:28 PM' },
      { sender: 'them', text: 'I built this special digital universe just for you to celebrate every wonderful memory.', time: '08:29 PM' },
      { sender: 'them', text: 'Looking up at the same sky with you... always.', time: '08:30 PM' },
    ],
    replies: [
      'Thank you so much Vishnu!',
      'I love this surprise so much!',
      'Looking up at the same sky with you too...',
    ],
    replyResponse: 'You deserve all the love, happiness, and peace in the universe, Ammu! Always with you.',
  },
};

/* Audio tone helper */
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

const triggerConfetti = () => {
  if (typeof window !== 'undefined' && window.confetti) {
    try {
      window.confetti({
        particleCount: 85,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#ff9ffc', '#e5a93c', '#38bdf8', '#c084fc', '#ffffff'],
      });
    } catch (e) {}
  }
};

/* =====================================================================
   MAIN COMPONENT: MobileBirthdayPhone
   ===================================================================== */
const MobileBirthdayPhone = ({ onSelectSection }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [currentTime, setCurrentTime] = useState('23:06');

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

  /* =========================================================================
     MUSIC PLAYER STATE (PLAYS ALWAYS & CONTINUOUSLY)
     ========================================================================= */
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState('0:00');
  const [audioCurrentTime, setAudioCurrentTime] = useState('0:00');
  const audioRef = useRef(null);

  const currentTrack = MUSIC_TRACKS[currentTrackIndex];

  // Try to play audio continuously on first user interaction anywhere
  useEffect(() => {
    const startAudioOnTouch = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    window.addEventListener('touchstart', startAudioOnTouch, { once: true });
    window.addEventListener('click', startAudioOnTouch, { once: true });

    return () => {
      window.removeEventListener('touchstart', startAudioOnTouch);
      window.removeEventListener('click', startAudioOnTouch);
    };
  }, []);

  const handlePlayPause = () => {
    playTone('click');
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleNextTrack = useCallback(() => {
    playTone('click');
    const nextIdx = (currentTrackIndex + 1) % MUSIC_TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    setAudioProgress(0);
  }, [currentTrackIndex]);

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
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.src;
      if (isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
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
    setActiveModal(appId);
  };

  const closeModal = () => {
    playTone('click');
    setActiveModal(null);
  };

  /* =========================================================================
     GALLERY STATE (2xN NEAT GRID - NO HIDDEN VAULT / NO PASSWORD)
     ========================================================================= */
  const [galleryLightboxImg, setGalleryLightboxImg] = useState(null);
  const [galleryLightboxIdx, setGalleryLightboxIdx] = useState(0);
  const [galleryActiveCategoryImgs, setGalleryActiveCategoryImgs] = useState([]);

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

  /* =========================================================================
     MESSAGES APP STATE (REFERENCE IMAGE 3: THREAD LIST + CHAT)
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
      const replyText = friendObj ? friendObj.replyResponse : 'Happy Birthday Ammu!';
      setFriendsThreads((prev) => ({
        ...prev,
        [friendKey]: [...(prev[friendKey] || []), { sender: 'them', text: replyText, time: currentTime }],
      }));
    }, 1000);
  };

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
     CALCULATOR STATE
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
        setCalcSecret('Vishnu loves you to infinity and beyond, Ammu!');
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
     APP GRID CONFIGURATION (8 APPS - ZERO PIXABOWL, ZERO ARROW, ZERO SYMMETRY)
     ========================================================================= */
  const apps = [
    { id: 'messages', label: 'Messages', bg: 'tile-messages', icon: 'messages', badge: '5' },
    { id: 'phone', label: 'Phone', bg: 'tile-phone', icon: 'phone' },
    { id: 'mail', label: 'Mail', bg: 'tile-mail', icon: 'mail', badge: '3' },
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
      {/* Hidden Audio element for background continuous music */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNextTrack}
        preload="auto"
        loop={false}
      />

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

        {/* TWO BIG FEATURE CARDS: SCRAPBOOK & NOTES (Matching Reference Image 1) */}
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
          MODAL 1: MESSAGES APP (Reference Image 3 Style)
          ===================================================================== */}
      {activeModal === 'messages' && (
        <div className="native-app-modal messages-modal-redesign">
          {activeMessageFriendKey === null ? (
            /* MESSAGES INBOX THREAD LIST VIEW (Matches Reference Image 3) */
            <div className="messages-inbox-stage">
              <header className="messages-list-header">
                <h2 className="messages-list-title">Messages</h2>
                <button
                  type="button"
                  className="modal-x-btn"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  &times;
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
                  ‹ Back
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
                  &times;
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
          MODAL 2: GALLERY (2 x N NEAT GRID - NO HIDDEN VAULT, NO PASSCODE)
          ===================================================================== */}
      {activeModal === 'gallery' && (
        <div className="native-app-modal gallery-modal">
          <header className="modal-top-bar bg-slate-900">
            <div className="modal-title-wrap">
              <h2>Moments &amp; Memories</h2>
              <span className="modal-sub">28 Collections • 114 Photographs</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              &times;
            </button>
          </header>

          <div className="gallery-view-body">
            {ALL_GALLERY_COLLECTIONS.map((cat, cIdx) => (
              <section key={cIdx} className="gallery-category-block">
                <h3 className="gallery-section-title">{cat.title}</h3>
                <div className="gallery-2xn-grid">
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

          {/* FULLSCREEN PHOTO LIGHTBOX */}
          {galleryLightboxImg && (
            <div className="gallery-lightbox-modal">
              <header className="lightbox-top-bar">
                <span>
                  Photo {galleryLightboxIdx + 1} of {galleryActiveCategoryImgs.length}
                </span>
                <button type="button" className="lightbox-close-btn" onClick={closeGalleryLightbox}>
                  &times;
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
          MODAL 3: MUSIC PLAYER (Plays Always & Continuous Audio)
          ===================================================================== */}
      {activeModal === 'music' && (
        <div className="native-app-modal music-modal">
          <header className="modal-top-bar bg-sky-950">
            <div className="modal-title-wrap">
              <h2>Music Player</h2>
              <span className="modal-sub">10 Romantic Melodies • Always Playing</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              &times;
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
          MODAL 4: PHONE DIALER
          ===================================================================== */}
      {activeModal === 'phone' && (
        <div className="native-app-modal phone-modal">
          <header className="modal-top-bar bg-emerald-950">
            <div className="modal-title-wrap">
              <h2>Phone</h2>
              <span className="modal-sub">Direct Line to Vishnu</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              &times;
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
                    playTone('click');
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
          MODAL 5: MAIL
          ===================================================================== */}
      {activeModal === 'mail' && (
        <div className="native-app-modal mail-modal">
          <header className="modal-top-bar bg-red-950">
            <div className="modal-title-wrap">
              <h2>Letters &amp; Mail</h2>
              <span className="modal-sub">Inbox (3 Messages)</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              &times;
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
              <span className="mail-sender">From: Memories</span>
              <h4 className="mail-subject">Moments Together</h4>
              <p className="mail-preview">
                Your special memories gallery is ready with 114 photos across 28 collections.
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
          MODAL 6: SPECIAL GIFT
          ===================================================================== */}
      {activeModal === 'gift' && (
        <div className="native-app-modal gift-modal">
          <header className="modal-top-bar bg-amber-950">
            <div className="modal-title-wrap">
              <h2>Special Gift</h2>
              <span className="modal-sub">For Maheswari</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              &times;
            </button>
          </header>

          <div className="gift-view-body">
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
            <button
              type="button"
              className="shower-confetti-btn"
              onClick={() => {
                playTone('success');
                triggerConfetti();
              }}
            >
              Shower Birthday Confetti
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 7: CALCULATOR
          ===================================================================== */}
      {activeModal === 'calculator' && (
        <div className="native-app-modal calc-modal">
          <header className="modal-top-bar bg-rose-950">
            <div className="modal-title-wrap">
              <h2>Calculator</h2>
              <span className="modal-sub">Special Edition</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              &times;
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
          MODAL 8: SETTINGS (UPDATED: NO PASSWORD LOCK, OWNER: MAHESWARI, DEVICE: M PHONE)
          ===================================================================== */}
      {activeModal === 'settings' && (
        <div className="native-app-modal settings-modal">
          <header className="modal-top-bar bg-zinc-900">
            <div className="modal-title-wrap">
              <h2>Settings</h2>
              <span className="modal-sub">Maheswari Special Edition</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              &times;
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

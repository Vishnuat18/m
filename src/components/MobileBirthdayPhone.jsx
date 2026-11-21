import React, { useState, useEffect, useRef, useCallback } from 'react';
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
   DATA: GALLERY CATEGORIES (Reference Image 2 style)
   ===================================================================== */
const GALLERY_CATEGORIES = [{"title": "Tonight \u2014 Birthday Eve", "layout": "featured", "images": ["/assets/gallery/IMG_20260403_125101_529.jpg"]}, {"title": "Favorite Evenings", "layout": "two-col", "images": ["/assets/gallery/IMG_20260403_125129_058.jpg", "/assets/gallery/IMG_20260403_125132_672.jpg"]}, {"title": "Cherished Smiles", "layout": "two-col", "images": ["/assets/gallery/IMG_20260403_125200_516.jpg", "/assets/gallery/IMG_20260403_125203_175.jpg", "/assets/gallery/IMG_20260403_125205_141.jpg", "/assets/gallery/IMG_20260403_125206_657.jpg"]}, {"title": "Special Portraits", "layout": "two-col", "images": ["/assets/gallery/IMG_20260403_125216_226.jpg", "/assets/gallery/IMG_20260403_125218_416.jpg", "/assets/gallery/IMG_20260403_125311_177.jpg", "/assets/gallery/IMG_20260403_125324_918.jpg"]}, {"title": "All Memories (M-ui Collection)", "layout": "grid", "images": ["/assets/gallery/IMG_20260403_125101_529.jpg", "/assets/gallery/IMG_20260403_125129_058.jpg", "/assets/gallery/IMG_20260403_125132_672.jpg", "/assets/gallery/IMG_20260403_125200_516.jpg", "/assets/gallery/IMG_20260403_125203_175.jpg", "/assets/gallery/IMG_20260403_125205_141.jpg", "/assets/gallery/IMG_20260403_125206_657.jpg", "/assets/gallery/IMG_20260403_125216_226.jpg", "/assets/gallery/IMG_20260403_125218_416.jpg", "/assets/gallery/IMG_20260403_125311_177.jpg", "/assets/gallery/IMG_20260403_125324_918.jpg", "/assets/gallery/IMG_20260403_125332_179.jpg", "/assets/gallery/IMG_20260403_125340_096.jpg", "/assets/gallery/IMG_20260403_125342_681.jpg", "/assets/gallery/IMG_20260403_125348_968.jpg", "/assets/gallery/IMG_20260403_125554_895.jpg", "/assets/gallery/IMG_20260403_125600_453.jpg", "/assets/gallery/IMG_20260403_125610_897.jpg", "/assets/gallery/IMG_20260403_125613_647.jpg", "/assets/gallery/IMG_20260403_125615_034.jpg", "/assets/gallery/IMG_20260403_125616_604.jpg", "/assets/gallery/IMG_20260403_125617_709.jpg", "/assets/gallery/IMG_20260403_125641_083.jpg", "/assets/gallery/IMG_20260403_125647_861.jpg", "/assets/gallery/IMG_20260403_125708_144.jpg", "/assets/gallery/IMG_20260403_125722_161.jpg", "/assets/gallery/IMG_20260403_125729_328.jpg", "/assets/gallery/IMG_20260403_125817_754.jpg", "/assets/gallery/IMG_20260403_125916_224.jpg", "/assets/gallery/IMG_20260403_125919_478.jpg", "/assets/gallery/IMG_20260403_125927_605.jpg", "/assets/gallery/IMG_20260403_125929_002.jpg", "/assets/gallery/IMG_20260403_125934_016.jpg", "/assets/gallery/IMG_20260403_125941_314.jpg", "/assets/gallery/IMG_20260403_125942_755.jpg", "/assets/gallery/IMG_20260403_125946_534.jpg", "/assets/gallery/IMG_20260403_125954_860.jpg", "/assets/gallery/IMG_20260403_130000_889.jpg", "/assets/gallery/IMG_20260403_130004_048.jpg", "/assets/gallery/IMG_20260403_130006_650.jpg", "/assets/gallery/IMG_20260403_130030_172.jpg", "/assets/gallery/IMG_20260403_130040_970.jpg", "/assets/gallery/IMG_20260403_130045_723.jpg", "/assets/gallery/IMG_20260403_130109_414.jpg", "/assets/gallery/IMG_20260403_130112_482.jpg", "/assets/gallery/IMG_20260403_130115_458.jpg", "/assets/gallery/IMG_20260403_130119_948.jpg", "/assets/gallery/IMG_20260403_130153_630.jpg", "/assets/gallery/IMG_20260403_130155_146.jpg", "/assets/gallery/IMG_20260403_130207_646.jpg", "/assets/gallery/IMG_20260403_130211_239.jpg", "/assets/gallery/IMG_20260403_130215_655.jpg", "/assets/gallery/IMG_20260403_155001.JPG", "/assets/gallery/IMG_20260404_012119.JPG", "/assets/gallery/IMG_20260405_172340_291.jpg", "/assets/gallery/IMG_20260405_172341_874.jpg", "/assets/gallery/IMG_20260405_172502_691.jpg", "/assets/gallery/IMG_20260405_172507_866.jpg", "/assets/gallery/IMG_20260405_172514_242.jpg", "/assets/gallery/IMG_20260405_172528_231.jpg", "/assets/gallery/IMG_20260405_172548_409.jpg", "/assets/gallery/IMG_20260405_172607_451.jpg", "/assets/gallery/IMG_20260405_172609_216.jpg", "/assets/gallery/IMG_20260405_172641_382.jpg", "/assets/gallery/IMG_20260405_172644_925.jpg", "/assets/gallery/IMG_20260405_172646_951.jpg", "/assets/gallery/IMG_20260405_172649_349.jpg", "/assets/gallery/IMG_20260405_172651_187.jpg", "/assets/gallery/IMG_20260405_172653_024.jpg", "/assets/gallery/IMG_20260405_172702_323.jpg", "/assets/gallery/IMG_20260405_172707_047.jpg", "/assets/gallery/IMG_20260405_172714_621.jpg", "/assets/gallery/IMG_20260405_172730_426.jpg", "/assets/gallery/IMG_20260405_172731_719.jpg", "/assets/gallery/IMG_20260405_172733_331.jpg", "/assets/gallery/IMG_20260405_172734_662.jpg", "/assets/gallery/IMG_20260405_172801_300.jpg", "/assets/gallery/IMG_20260405_172803_699.jpg", "/assets/gallery/IMG_20260405_172828_163.jpg", "/assets/gallery/IMG_20260405_172838_323.jpg", "/assets/gallery/IMG_20260405_172842_822.jpg", "/assets/gallery/IMG_20260405_172900_610.jpg", "/assets/gallery/IMG_20260405_172907_563.jpg", "/assets/gallery/IMG_20260405_172916_016.jpg", "/assets/gallery/IMG_20260405_172917_722.jpg", "/assets/gallery/IMG_20260405_172928_462.jpg", "/assets/gallery/IMG_20260405_172931_721.jpg", "/assets/gallery/IMG_20260405_172933_896.jpg", "/assets/gallery/IMG_20260405_172942_443.jpg", "/assets/gallery/IMG_20260405_172945_572.jpg", "/assets/gallery/IMG_20260405_172947_408.jpg", "/assets/gallery/IMG_20260405_172948_945.jpg", "/assets/gallery/IMG_20260405_172950_669.jpg", "/assets/gallery/IMG_20260405_173052_656.jpg", "/assets/gallery/IMG_20260405_173100_318.jpg", "/assets/gallery/IMG_20260405_173248_858.jpg", "/assets/gallery/IMG_20260405_173300_743.jpg", "/assets/gallery/IMG_20260405_173303_014.jpg", "/assets/gallery/IMG_20260405_173306_238.jpg", "/assets/gallery/IMG_20260405_173317_634.jpg", "/assets/gallery/IMG_20260405_173337_786.jpg", "/assets/gallery/IMG_20260405_173343_073.jpg", "/assets/gallery/IMG_20260405_173403_994.jpg", "/assets/gallery/IMG_20260405_173410_126.jpg", "/assets/gallery/IMG_20260407_231902.JPG", "/assets/gallery/photo_6257769115963559422_y.jpg", "/assets/gallery/photo_6257769115963559423_y.jpg", "/assets/gallery/splmem.jpg"]}];

/* =====================================================================
   DATA: SCRAPBOOK IMAGES (All 33 photos from M-ui/spl)
   ===================================================================== */
const SCRAPBOOK_PAGES = ["/assets/scrapbook/slot-1.jpg", "/assets/scrapbook/slot-10.jpg", "/assets/scrapbook/slot-11.jpg", "/assets/scrapbook/slot-12.jpg", "/assets/scrapbook/slot-13.jpg", "/assets/scrapbook/slot-14.jpg", "/assets/scrapbook/slot-15.jpg", "/assets/scrapbook/slot-16.jpg", "/assets/scrapbook/slot-17.jpg", "/assets/scrapbook/slot-18.jpg", "/assets/scrapbook/slot-19.jpg", "/assets/scrapbook/slot-2.jpg", "/assets/scrapbook/slot-20.jpg", "/assets/scrapbook/slot-21.jpg", "/assets/scrapbook/slot-22.jpg", "/assets/scrapbook/slot-23.jpg", "/assets/scrapbook/slot-24.jpg", "/assets/scrapbook/slot-25.jpg", "/assets/scrapbook/slot-26.jpg", "/assets/scrapbook/slot-27.jpg", "/assets/scrapbook/slot-28.jpg", "/assets/scrapbook/slot-29.jpg", "/assets/scrapbook/slot-3.jpg", "/assets/scrapbook/slot-30.jpg", "/assets/scrapbook/slot-31.jpg", "/assets/scrapbook/slot-32.jpg", "/assets/scrapbook/slot-33.jpg", "/assets/scrapbook/slot-4.jpg", "/assets/scrapbook/slot-5.jpg", "/assets/scrapbook/slot-6.jpg", "/assets/scrapbook/slot-7.jpg", "/assets/scrapbook/slot-8.jpg", "/assets/scrapbook/slot-9.jpg"];

/* =====================================================================
   DATA: CLEAR THE BOARD ARROW PUZZLES (Reference Image 3 style)
   Board: 6x8 dot plane.
   Each arrow has an id, an SVG path string, arrowhead point, exit direction,
   and dependencies (which arrows block it from flying off).
   ===================================================================== */
const ARROW_PUZZLE_LEVELS = [
  {
    level: 1,
    arrows: [
      // Top-left: L shape pointing Left
      { id: 'a1', d: 'M 100 40 L 70 40 L 70 20 L 40 20', head: [40, 20], angle: 180, blocks: [], blockedBy: [] },
      // Top-center: Z shape pointing Up
      { id: 'a2', d: 'M 120 100 L 120 70 L 150 70 L 150 20', head: [150, 20], angle: -90, blocks: [], blockedBy: [] },
      // Top-right: L shape pointing Right
      { id: 'a3', d: 'M 180 100 L 180 60 L 240 60', head: [240, 60], angle: 0, blocks: [], blockedBy: [] },
      // Middle-left: Straight down
      { id: 'a4', d: 'M 40 80 L 40 180', head: [40, 180], angle: 90, blocks: [], blockedBy: [] },
      // Long U loop on left pointing Down
      { id: 'a5', d: 'M 100 170 L 100 110 L 70 110 L 70 240', head: [70, 240], angle: 90, blocks: [], blockedBy: ['a4'] },
      // Middle-right L shape pointing Down
      { id: 'a6', d: 'M 210 130 L 240 130 L 240 190', head: [240, 190], angle: 90, blocks: [], blockedBy: [] },
      // Bottom S shape pointing Left
      { id: 'a7', d: 'M 160 190 L 160 230 L 130 230 L 130 260 L 90 260', head: [90, 260], angle: 180, blocks: [], blockedBy: ['a5'] },
      // Bottom hook pointing Right
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
      window.confetti({ particleCount: 80, spread: 65, origin: { y: 0.6 }, colors: ['#ff9ffc', '#e5a93c', '#38bdf8', '#c084fc', '#ffffff'] });
    } catch (e) {}
  }
};

/* =====================================================================
   MAIN COMPONENT
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
     1. SCRAPBOOK FULL PHOTO VIEWER STATE
     ========================================================================= */
  const [scrapbookIndex, setScrapbookIndex] = useState(0);

  /* =========================================================================
     2. MUSIC PLAYER STATE (REAL AUDIO PLAYER)
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
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    playTone('click');
    const prevIdx = (currentTrackIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    setCurrentTrackIndex(prevIdx);
    setIsPlaying(true);
  };

  const handleSelectTrack = (idx) => {
    playTone('click');
    setCurrentTrackIndex(idx);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.src = currentTrack.src;
      audioRef.current.play().catch(() => {});
    }
  }, [currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 1;
    setAudioProgress((cur / dur) * 100);

    const m = Math.floor(cur / 60);
    const s = Math.floor(cur % 60);
    setAudioCurrentTime(`${m}:${s < 10 ? '0' : ''}${s}`);

    if (dur && !isNaN(dur)) {
      const dm = Math.floor(dur / 60);
      const ds = Math.floor(dur % 60);
      setAudioDuration(`${dm}:${ds < 10 ? '0' : ''}${ds}`);
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const seekPercent = parseFloat(e.target.value);
    audioRef.current.currentTime = (seekPercent / 100) * audioRef.current.duration;
    setAudioProgress(seekPercent);
  };

  /* =========================================================================
     3. GALLERY STATE (LIGHTBOX & CATEGORIES)
     ========================================================================= */
  const [galleryLightboxImg, setGalleryLightboxImg] = useState(null);
  const [galleryLightboxIdx, setGalleryLightboxIdx] = useState(0);

  const openGalleryLightbox = (imgSrc) => {
    playTone('click');
    const idx = gallery_imgs.indexOf(imgSrc);
    setGalleryLightboxIdx(idx >= 0 ? idx : 0);
    setGalleryLightboxImg(imgSrc);
  };

  const handleNextGalleryPhoto = () => {
    const next = (galleryLightboxIdx + 1) % gallery_imgs.length;
    setGalleryLightboxIdx(next);
    setGalleryLightboxImg(gallery_imgs[next]);
  };

  const handlePrevGalleryPhoto = () => {
    const prev = (galleryLightboxIdx - 1 + gallery_imgs.length) % gallery_imgs.length;
    setGalleryLightboxIdx(prev);
    setGalleryLightboxImg(gallery_imgs[prev]);
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

    // Check if blocked by any uncleared arrow
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
    // Find an arrow that is currently unblocked and not yet cleared
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
     8. INGRAM (INSTAGRAM) STATE
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
     APP GRID CONFIGURATION (12 Apps in a single unified grid, No bottom dock)
     ========================================================================= */
  const apps = [
    { id: 'scrapbook', label: 'Scrapbook', isScrapbookCover: true },
    { id: 'diary', label: 'Diary(Notes)', bg: 'bg-diary', icon: 'diary' },
    { id: 'gallery', label: 'Gallery', bg: 'bg-gallery', icon: 'gallery' },
    { id: 'ingram', label: 'Ingram', bg: 'bg-ingram', icon: 'ingram' },
    { id: 'music', label: 'Music', bg: 'bg-music', icon: 'music' },
    { id: 'arrowGame', label: 'Arrow Game', bg: 'bg-arrow', icon: 'arrow' },
    { id: 'calculator', label: 'Calculator', bg: 'bg-calc', icon: 'calc' },
    { id: 'gift', label: 'Special Gift', bg: 'bg-gift', icon: 'gift' },
    { id: 'messages', label: 'Messages', bg: 'bg-messages', icon: 'messages' },
    { id: 'phone', label: 'Phone', bg: 'bg-phone', icon: 'phone' },
    { id: 'mail', label: 'Mail', bg: 'bg-mail', icon: 'mail' },
    { id: 'settings', label: 'Settings', bg: 'bg-settings', icon: 'settings' },
  ];

  const renderIconSvg = (name) => {
    switch (name) {
      case 'diary':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        );
      case 'gallery':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        );
      case 'ingram':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
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
      case 'gift':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="18" height="4" rx="1" />
            <path d="M12 8v13" />
            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
          </svg>
        );
      case 'messages':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
          </svg>
        );
      case 'phone':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        );
      case 'mail':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        );
      case 'settings':
        return (
          <svg className="app-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
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

        {/* Hero Header */}
        <div className="native-hero-header">
          <div className="hero-badge">A SPECIAL BIRTHDAY CELEBRATION</div>
          <h1 className="hero-title">Happy Birthday Maheswari</h1>
          <p className="hero-subtitle">Handcrafted with love for Ammu</p>
        </div>

        {/* 12-App Unified Grid (All bottom apps merged with above apps) */}
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
                  <div className="cover-gold-badge">3D</div>
                </div>
              ) : (
                <div className={`generic-tile ${app.bg}`}>{renderIconSvg(app.icon)}</div>
              )}
              <span className="app-cell-label">{app.label}</span>
            </button>
          ))}
        </main>

        {/* Sky Tribute Widget */}
        <section className="native-sky-widget">
          <div className="sky-figure-wrap">
            <img
              src="/assets/pose-01.png"
              alt="Maheswari looking up"
              className="sky-figure-img"
              onError={(e) => {
                e.target.src = 'assets/pose-01.png';
              }}
            />
          </div>
          <div className="sky-text-wrap">
            <p className="sky-quote">&ldquo;Looking up at the same sky with you... always.&rdquo;</p>
            <span className="sky-author">&mdash; VISHNU</span>
          </div>
        </section>
      </div>

      {/* =====================================================================
          MODAL 1: SCRAPBOOK FULL PHOTO PREVIEW (No upload needed, Full Photo view)
          ===================================================================== */}
      {activeModal === 'scrapbook' && (
        <div className="native-app-modal scrapbook-modal">
          <header className="modal-top-bar bg-amber-950">
            <div className="modal-title-wrap">
              <h2>Digital Scrapbook</h2>
              <span className="modal-sub">
                Page {scrapbookIndex + 1} of {SCRAPBOOK_PAGES.length}
              </span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="scrapbook-viewer-body">
            {/* Full Image Main Stage */}
            <div className="scrapbook-main-stage">
              <img
                src={SCRAPBOOK_PAGES[scrapbookIndex]}
                alt={`Scrapbook Page ${scrapbookIndex + 1}`}
                className="scrapbook-full-photo"
              />
            </div>

            {/* Navigation Controls */}
            <div className="scrapbook-nav-controls">
              <button
                type="button"
                className="scrap-nav-btn"
                disabled={scrapbookIndex <= 0}
                onClick={() => setScrapbookIndex((i) => Math.max(0, i - 1))}
              >
                &larr; Prev Page
              </button>
              <button
                type="button"
                className="scrap-3d-btn"
                onClick={() => {
                  closeModal();
                  onSelectSection('sketchbook');
                }}
              >
                Open 3D Flipbook &rarr;
              </button>
              <button
                type="button"
                className="scrap-nav-btn"
                disabled={scrapbookIndex >= SCRAPBOOK_PAGES.length - 1}
                onClick={() => setScrapbookIndex((i) => Math.min(SCRAPBOOK_PAGES.length - 1, i + 1))}
              >
                Next Page &rarr;
              </button>
            </div>

            {/* Thumbnail Scroll Strip */}
            <div className="scrapbook-filmstrip">
              {SCRAPBOOK_PAGES.map((src, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`strip-thumb ${idx === scrapbookIndex ? 'active' : ''}`}
                  onClick={() => setScrapbookIndex(idx)}
                >
                  <img src={src} alt={`Thumbnail ${idx + 1}`} loading="lazy" />
                  <span className="strip-num">{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: MUSIC PLAYER (10 Romantic Audio Tracks)
          ===================================================================== */}
      {activeModal === 'music' && (
        <div className="native-app-modal music-modal">
          <header className="modal-top-bar bg-purple-950">
            <div className="modal-title-wrap">
              <h2>Music Player</h2>
              <span className="modal-sub">Birthday Playlist</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="music-player-body">
            {/* Spinning Disc / Album Art */}
            <div className="vinyl-deck">
              <div className={`vinyl-disc ${isPlaying ? 'spinning' : ''}`}>
                <div className="disc-grooves" />
                <div className="disc-center-label">
                  <span className="disc-symbol">♥</span>
                  <span className="disc-text">AMMU</span>
                </div>
              </div>
            </div>

            {/* Track Info */}
            <div className="music-info-card">
              <h3 className="music-track-title">{currentTrack.title}</h3>
              <p className="music-track-artist">{currentTrack.artist}</p>
            </div>

            {/* Progress Slider */}
            <div className="music-scrub-box">
              <input
                type="range"
                min="0"
                max="100"
                value={audioProgress || 0}
                onChange={handleSeek}
                className="music-progress-slider"
              />
              <div className="time-labels">
                <span>{audioCurrentTime}</span>
                <span>{audioDuration}</span>
              </div>
            </div>

            {/* Transport Controls */}
            <div className="music-control-row">
              <button type="button" className="ctrl-btn" onClick={handlePrevTrack} aria-label="Previous">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>
              <button type="button" className="ctrl-play-btn" onClick={handlePlayPause} aria-label="Play/Pause">
                {isPlaying ? (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button type="button" className="ctrl-btn" onClick={handleNextTrack} aria-label="Next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>
            </div>

            {/* Track List */}
            <div className="music-playlist-wrap">
              <h4 className="playlist-heading">All Songs ({MUSIC_TRACKS.length})</h4>
              <div className="playlist-scroll">
                {MUSIC_TRACKS.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`playlist-item ${idx === currentTrackIndex ? 'playing' : ''}`}
                    onClick={() => handleSelectTrack(idx)}
                  >
                    <span className="pl-num">{idx + 1}</span>
                    <div className="pl-meta">
                      <span className="pl-title">{t.title}</span>
                      <span className="pl-artist">{t.artist}</span>
                    </div>
                    <span className="pl-dur">{t.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: GALLERY (Categorized like Reference Image 2 + All M-ui Images)
          ===================================================================== */}
      {activeModal === 'gallery' && (
        <div className="native-app-modal gallery-modal">
          <header className="modal-top-bar bg-rose-950">
            <div className="modal-title-wrap">
              <h2>Photo Gallery</h2>
              <span className="modal-sub">M-ui Photo Collection</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="gallery-curated-body">
            {GALLERY_CATEGORIES.map((cat, ci) => (
              <section key={ci} className="gallery-section">
                <h3 className="section-title">{cat.title}</h3>
                {cat.layout === 'featured' && (
                  <div className="featured-hero-wrap" onClick={() => openGalleryLightbox(cat.images[0])}>
                    <img src={cat.images[0]} alt="Featured moment" className="featured-hero-img" loading="lazy" />
                  </div>
                )}
                {cat.layout === 'two-col' && (
                  <div className="two-col-grid">
                    {cat.images.map((src, imgIdx) => (
                      <div key={imgIdx} className="two-col-card" onClick={() => openGalleryLightbox(src)}>
                        <img src={src} alt="Memory" className="two-col-img" loading="lazy" />
                      </div>
                    ))}
                  </div>
                )}
                {cat.layout === 'grid' && (
                  <div className="all-photos-masonry">
                    {cat.images.map((src, imgIdx) => (
                      <div key={imgIdx} className="masonry-card" onClick={() => openGalleryLightbox(src)}>
                        <img src={src} alt={`Photo ${imgIdx + 1}`} className="masonry-img" loading="lazy" />
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Lightbox for Gallery */}
          {galleryLightboxImg && (
            <div className="native-lightbox-backdrop" onClick={() => setGalleryLightboxImg(null)}>
              <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="lightbox-x-btn" onClick={() => setGalleryLightboxImg(null)}>
                  ✕
                </button>
                <img src={galleryLightboxImg} alt="Enlarged" className="lightbox-full-img" />
                <div className="lightbox-bottom-bar">
                  <button type="button" className="lb-btn" onClick={handlePrevGalleryPhoto}>
                    &larr; Prev
                  </button>
                  <span className="lb-status">
                    {galleryLightboxIdx + 1} of {gallery_imgs.length}
                  </span>
                  <button type="button" className="lb-btn" onClick={handleNextGalleryPhoto}>
                    Next &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          MODAL 4: ARROW GAME ("CLEAR THE BOARD" - Reference Image 3)
          ===================================================================== */}
      {activeModal === 'arrowGame' && (
        <div className="native-app-modal arrow-game-modal">
          {/* Top Bar with Reference Image 3 layout */}
          <div className="clear-board-header">
            <button type="button" className="cb-back-btn" onClick={closeModal} aria-label="Back">
              &larr;
            </button>
            <div className="cb-level-title">Level {activeLevel.level}</div>
            <button type="button" className="cb-settings-btn" onClick={resetArrowBoard} aria-label="Reset">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
              </svg>
            </button>
          </div>

          <div className="clear-board-body">
            {/* Title */}
            <h2 className="cb-big-title">Clear the Board</h2>

            {/* Sub-header with Rocket, Hearts, Difficulty */}
            <div className="cb-stats-row">
              <div className="cb-stat-pill rocket-pill">
                <span className="stat-sym">&#10148;</span>
                <span>{112 + clearedArrowIds.length * 10}</span>
              </div>
              <div className="cb-hearts-row">
                {[1, 2, 3].map((h) => (
                  <span key={h} className={`cb-heart ${h <= arrowLives ? 'active' : 'lost'}`}>
                    &#9829;
                  </span>
                ))}
              </div>
              <div className="cb-stat-pill normal-pill">Normal</div>
            </div>

            {/* The SVG Board with dotted grid and bendy arrows */}
            <div className="cb-board-container">
              <svg className="cb-svg-canvas" viewBox="0 0 280 320">
                {/* Dotted plane points */}
                {Array.from({ length: 6 }).map((_, r) =>
                  Array.from({ length: 5 }).map((_, c) => (
                    <circle key={`${r}-${c}`} cx={40 + c * 50} cy={30 + r * 50} r="2.5" fill="#94a3b8" opacity="0.6" />
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
                      {/* Thick transparent touch target */}
                      <path d={arr.d} fill="none" stroke="transparent" strokeWidth="24" />
                      {/* Visible Arrow Line */}
                      <path
                        d={arr.d}
                        fill="none"
                        stroke={isHinted ? '#38bdf8' : '#0f172a'}
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Arrowhead Marker */}
                      <polygon
                        points={`${arr.head[0]},${arr.head[1]} ${arr.head[0] - 8},${arr.head[1] - 5} ${arr.head[0] - 8},${arr.head[1] + 5}`}
                        fill={isHinted ? '#38bdf8' : '#0f172a'}
                        transform={`rotate(${arr.angle}, ${arr.head[0]}, ${arr.head[1]})`}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Victory / Game Over overlay */}
            {boardCleared && (
              <div className="cb-victory-card">
                <div className="cb-victory-heart">&#9829;</div>
                <h3>Board Cleared!</h3>
                <p>&ldquo;Every path leads straight to you. Happy Birthday Maheswari!&rdquo;</p>
                <button type="button" className="cb-restart-btn" onClick={resetArrowBoard}>
                  Play Again
                </button>
              </div>
            )}

            {!boardCleared && arrowLives <= 0 && (
              <div className="cb-gameover-card">
                <h3>Out of Lives</h3>
                <p>An arrow bumped into another path! Try clearing the unblocked arrows first.</p>
                <button type="button" className="cb-restart-btn" onClick={resetArrowBoard}>
                  Retry Level
                </button>
              </div>
            )}

            {/* Bottom Controls: Hint & Shuffle */}
            <div className="cb-bottom-tools">
              <button type="button" className="cb-tool-btn hint-btn" onClick={handleUseHint} aria-label="Hint">
                <span className="tool-icon">&#9684;</span>
                <span className="tool-badge">{hintCount}</span>
              </button>
              <button type="button" className="cb-tool-btn shuffle-btn" onClick={resetArrowBoard} aria-label="Reset">
                <span className="tool-icon">#</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 5: INGRAM (Instagram-style birthday feed)
          ===================================================================== */}
      {activeModal === 'ingram' && (
        <div className="native-app-modal ingram-modal">
          <header className="modal-top-bar bg-purple-950">
            <div className="modal-title-wrap">
              <h2>Ingram &bull; @maheswari_birthday</h2>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="ingram-feed-body">
            <div className="ingram-stories-row">
              {['Celebration', 'Memories', 'Ammu', 'Smile', 'Forever'].map((s, i) => (
                <div key={i} className="story-pill">
                  <div className="story-ring-gold">
                    <div className="story-avatar-star">&#9733;</div>
                  </div>
                  <span className="story-title">{s}</span>
                </div>
              ))}
            </div>

            <article className="ingram-post-card">
              <div className="post-top">
                <div className="post-avi">M</div>
                <div>
                  <div className="post-name">maheswari_birthday</div>
                  <div className="post-loc">Special Birthday Edition</div>
                </div>
              </div>

              <div className="post-img-box" onDoubleClick={toggleLike}>
                <img
                  src="/assets/pose-04.png"
                  alt="Maheswari Birthday"
                  className="post-main-photo"
                  onError={(e) => {
                    e.target.src = 'assets/pose-04.png';
                  }}
                />
              </div>

              <div className="post-meta-row">
                <button type="button" className={`heart-btn ${liked ? 'active' : ''}`} onClick={toggleLike}>
                  &#9829;
                </button>
                <span className="likes-label">{likeCount.toLocaleString()} likes</span>
              </div>

              <div className="post-caption-box">
                <p>
                  <strong>vishnu:</strong> Celebrating the most precious day for the most wonderful girl in the world! Happy Birthday Ammu!
                </p>
                <div className="post-hashtags">#HappyBirthdayMaheswari #Forever #OurStory</div>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 6: MESSAGES (Interactive Chat)
          ===================================================================== */}
      {activeModal === 'messages' && (
        <div className="native-app-modal messages-modal">
          <header className="modal-top-bar bg-slate-900">
            <div className="modal-title-wrap">
              <h2>Vishnu</h2>
              <span className="modal-sub text-emerald-400">Online</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="messages-chat-body">
            <div className="chat-stream">
              {messagesList.map((m, i) => (
                <div key={i} className={`chat-line ${m.sender}`}>
                  <div className={`msg-bubble ${m.sender}`}>
                    <p>{m.text}</p>
                    <span className="msg-timestamp">{m.time}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-line vishnu">
                  <div className="msg-bubble typing">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </div>
                </div>
              )}
            </div>

            <div className="quick-reply-bar">
              <button type="button" className="qr-chip" onClick={() => handleSendMessage('Thank you Vishnu!')}>
                Thank you Vishnu!
              </button>
              <button type="button" className="qr-chip" onClick={() => handleSendMessage('Looking up at the same sky!')}>
                Looking up at the same sky!
              </button>
              <button type="button" className="qr-chip" onClick={() => handleSendMessage('Best Birthday Ever!')}>
                Best Birthday Ever!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 7: PHONE DIALER
          ===================================================================== */}
      {activeModal === 'phone' && (
        <div className="native-app-modal phone-modal">
          <header className="modal-top-bar bg-emerald-950">
            <div className="modal-title-wrap">
              <h2>Phone</h2>
              <span className="modal-sub">Keypad</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="phone-screen-body">
            {callActive ? (
              <div className="active-call-pane">
                <div className="call-avatar-circle">V</div>
                <h3>Vishnu</h3>
                <p className="call-duration">
                  {String(Math.floor(callTimer / 60)).padStart(2, '0')}:{String(callTimer % 60).padStart(2, '0')}
                </p>
                <div className="voice-note-card">
                  &ldquo;Happy Birthday Ammu! Hearing your voice is my favorite thing. Keep that lovely smile shining all year long!&rdquo;
                </div>
                <button type="button" className="end-call-btn" onClick={() => setCallActive(false)}>
                  End Call
                </button>
              </div>
            ) : (
              <div className="dialer-pane">
                <div className="dialer-screen-number">{dialNumber || 'Speed Dial: 2211'}</div>
                <div className="dialer-grid">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
                    <button
                      key={k}
                      type="button"
                      className="dial-digit-btn"
                      onClick={() => {
                        playTone('click');
                        setDialNumber((d) => (d.length < 10 ? d + k : d));
                      }}
                    >
                      {k}
                    </button>
                  ))}
                </div>
                <div className="dialer-actions">
                  <button
                    type="button"
                    className="call-green-btn"
                    onClick={() => {
                      playTone('success');
                      setCallActive(true);
                    }}
                  >
                    Call Vishnu
                  </button>
                  {dialNumber && (
                    <button type="button" className="backspace-btn" onClick={() => setDialNumber((d) => d.slice(0, -1))}>
                      ⌫
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 8: MAIL
          ===================================================================== */}
      {activeModal === 'mail' && (
        <div className="native-app-modal mail-modal">
          <header className="modal-top-bar bg-sky-950">
            <div className="modal-title-wrap">
              <h2>Mail</h2>
              <span className="modal-sub">Inbox (1 Unread)</span>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="mail-view-body">
            <article className="parchment-letter">
              <div className="letter-meta-header">
                <div>
                  <strong>From:</strong> Vishnu &lt;vishnu@heart.com&gt;
                </div>
                <div>
                  <strong>To:</strong> Maheswari &lt;ammu@love.com&gt;
                </div>
                <div>
                  <strong>Subject:</strong> Happy Birthday to the Light of My Life
                </div>
              </div>
              <hr className="letter-divider" />
              <div className="letter-body-text">
                <p>Dearest Maheswari,</p>
                <p>
                  Today is a celebration of the wonderful, kind, and resilient person you are. May your year ahead be blessed with boundless smiles, peace of mind, and the fulfillment of every dream.
                </p>
                <p>
                  No matter the distance, looking up at the sky reminds me that we share the exact same universe.
                </p>
                <p className="letter-sign-off">
                  With all my love,<br />
                  <strong>Vishnu</strong>
                </p>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 9: CALCULATOR
          ===================================================================== */}
      {activeModal === 'calculator' && (
        <div className="native-app-modal calc-modal">
          <header className="modal-top-bar bg-slate-900">
            <div className="modal-title-wrap">
              <h2>Calculator</h2>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="calc-view-body">
            <div className="calc-display-box">{calcDisplay}</div>
            {calcSecret && <div className="calc-secret-alert">{calcSecret}</div>}
            <div className="calc-keypad-grid">
              {['C', '+/-', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((b) => (
                <button
                  key={b}
                  type="button"
                  className={`calc-key ${b === '=' ? 'key-equals' : ''} ${['/', '*', '-', '+'].includes(b) ? 'key-op' : ''}`}
                  onClick={() => handleCalcBtn(b)}
                >
                  {b}
                </button>
              ))}
            </div>
            <p className="calc-hint-text">Tip: Enter passcode 2211 or 1204 and tap =</p>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 10: SETTINGS
          ===================================================================== */}
      {activeModal === 'settings' && (
        <div className="native-app-modal settings-modal">
          <header className="modal-top-bar bg-slate-900">
            <div className="modal-title-wrap">
              <h2>Settings</h2>
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
                <span className="set-val">Deep Romantic Night</span>
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

      {/* =====================================================================
          MODAL 11: SPECIAL GIFT
          ===================================================================== */}
      {activeModal === 'gift' && (
        <div className="native-app-modal gift-modal">
          <header className="modal-top-bar bg-amber-950">
            <div className="modal-title-wrap">
              <h2>Special Gift</h2>
            </div>
            <button type="button" className="modal-x-btn" onClick={closeModal} aria-label="Close">
              ✕
            </button>
          </header>

          <div className="gift-view-body">
            <div className="gift-gold-box">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#e5a93c" strokeWidth="1.5">
                <rect x="3" y="8" width="18" height="4" rx="1" />
                <path d="M12 8v13" />
                <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
              </svg>
            </div>
            <h3 className="gift-heading">A Heartfelt Surprise</h3>
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
    </div>
  );
};

export default MobileBirthdayPhone;

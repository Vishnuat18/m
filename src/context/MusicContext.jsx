import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export const MUSIC_TRACKS = [
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

const MusicContext = createContext(null);

export const MusicProvider = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState('0:00');
  const [audioCurrentTime, setAudioCurrentTime] = useState('0:00');
  const audioRef = useRef(null);

  const currentTrack = MUSIC_TRACKS[currentTrackIndex];

  // Start music method - ONLY called from the Home Screen
  const startMusic = useCallback(() => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, []);

  const handlePlayPause = useCallback(() => {
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
  }, [isPlaying]);

  const handleNextTrack = useCallback(() => {
    const nextIdx = (currentTrackIndex + 1) % MUSIC_TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    setAudioProgress(0);
  }, [currentTrackIndex]);

  const handlePrevTrack = useCallback(() => {
    const prevIdx = (currentTrackIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    setCurrentTrackIndex(prevIdx);
    setAudioProgress(0);
  }, [currentTrackIndex]);

  const handleSelectTrack = useCallback((idx) => {
    setCurrentTrackIndex(idx);
    setAudioProgress(0);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, []);

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

  return (
    <MusicContext.Provider
      value={{
        MUSIC_TRACKS,
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
        startMusic,
      }}
    >
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNextTrack}
        preload="auto"
      />
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

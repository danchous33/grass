import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [started, setStarted] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);

  useEffect(() => {
    // Use a local audio file to avoid autoplay restrictions and external embeds.
    const audio = new Audio(`${import.meta.env.BASE_URL}audio/creep.mp3`);
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleCanPlay = () => setAudioReady(true);
    const handleError = () => setAudioError('Не удалось загрузить аудио. Проверьте файл /public/audio/creep.mp3');

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
      // Release resource
      audio.src = '';
      audio.load();
      if (fadeRef.current !== null) {
        cancelAnimationFrame(fadeRef.current);
        fadeRef.current = null;
      }
    };
  }, []);

  const fadeInAudio = (audio: HTMLAudioElement, durationMs = 2000) => {
    if (fadeRef.current !== null) {
      cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }
    const start = performance.now();
    audio.volume = 0;
    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      audio.volume = t;
      if (t < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        fadeRef.current = null;
      }
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const handleStart = async () => {
    setStarted(true);
    setAudioError(null);
    const audio = audioRef.current;
    if (!audio) return;
    try {
      const startAtSeconds = 55;
      if (audio.readyState >= 1) {
        audio.currentTime = startAtSeconds;
      } else {
        const onMeta = () => {
          audio.currentTime = startAtSeconds;
          audio.removeEventListener('loadedmetadata', onMeta);
        };
        audio.addEventListener('loadedmetadata', onMeta);
      }
      await audio.play();
      fadeInAudio(audio, 2000);
    } catch {
      setAudioError('Браузер заблокировал воспроизведение. Нажмите кнопку ещё раз.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-sans">
      {/* Audio is handled via HTMLAudioElement to ensure user-gesture playback */}

      <AnimatePresence>
        {!started ? (
          <motion.div 
            key="start-screen"
            className="absolute inset-0 flex items-center justify-center z-50 bg-black"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <button 
              onClick={handleStart}
              className="px-12 py-6 text-2xl font-bold tracking-[0.2em] uppercase border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-700 hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]"
            >
              Начать
            </button>
            {audioError ? (
              <div className="absolute bottom-10 text-red-400 text-sm tracking-wide">
                {audioError}
              </div>
            ) : (
              <div className="absolute bottom-10 text-white/40 text-xs tracking-[0.4em] uppercase">
                {audioReady ? 'Audio ready' : 'Loading audio...'}
              </div>
            )}
          </motion.div>
        ) : (
          <MainExperience key="main-experience" />
        )}
      </AnimatePresence>
    </div>
  );
}

function MainExperience() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
      className="absolute inset-0 flex flex-col items-center justify-center"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black"></div>
      
      {/* Particles */}
      <Particles />

      {/* Main Text */}
      <motion.div 
        className="flex flex-col items-center justify-center z-10 mix-blend-screen"
        initial={{ scale: 0.8, filter: "blur(20px)", opacity: 0 }}
        animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
      >
        <h1 className="text-[12vw] font-display text-center leading-[0.85] tracking-tighter uppercase">
          <motion.span 
            className="block text-white/90" 
            style={{ textShadow: "0 0 40px rgba(255,255,255,0.2)" }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Иди
          </motion.span>
          <motion.span 
            className="block text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-800" 
            style={{ textShadow: "0 0 80px rgba(74, 222, 128, 0.4)" }}
            animate={{ 
              textShadow: [
                "0 0 40px rgba(74, 222, 128, 0.4)", 
                "0 0 100px rgba(74, 222, 128, 0.8)", 
                "0 0 40px rgba(74, 222, 128, 0.4)"
              ] 
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Траву
          </motion.span>
          <motion.span 
            className="block text-white/90" 
            style={{ textShadow: "0 0 40px rgba(255,255,255,0.2)" }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            Потрогай
          </motion.span>
        </h1>
      </motion.div>
      
      {/* Subtext */}
      <motion.p
        className="absolute bottom-12 text-green-500/40 tracking-[0.5em] uppercase text-xs z-10 font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 3 }}
      >
        Radiohead - Creep
      </motion.p>
    </motion.div>
  );
}

function Particles() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-green-400"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px rgba(74, 222, 128, 0.8)`,
          }}
          animate={{
            y: [0, -1000],
            x: [0, (Math.random() - 0.5) * 200],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

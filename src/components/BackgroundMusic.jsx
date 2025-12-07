import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import arcadeMusic from '/arcade.mp3';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const startMusic = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.volume = 0.2;
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          }).catch(err => {
            console.log('Audio autoplay prevented:', err);
            setHasInteracted(true); // Still mark as interacted
          });
        }
      }
    };

    // Try to start music on first user interaction
    const events = ['click', 'keydown', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, startMusic, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, startMusic);
      });
    };
  }, [hasInteracted]);

  const toggleMusic = (e) => {
    e.stopPropagation();

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch(err => {
            console.error('Error playing audio:', err);
          });
        }
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={arcadeMusic} type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {hasInteracted && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMusic}
            className="fixed bottom-4 right-[170px] md:right-[200px] z-50 bg-black/80 border-2 border-matrix-green rounded-full p-3 hover:border-gold transition-colors"
            title={isPlaying ? 'Mute Music' : 'Play Music'}
            style={{ boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)' }}
          >
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying ? { duration: 2, repeat: Infinity, ease: 'linear' } : {}}
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0f0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0f0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              )}
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Visual indicator when music starts */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-20 right-4 bg-black/90 border-2 border-matrix-green px-4 py-2 rounded-lg text-matrix-green text-xs z-50"
            style={{ boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)' }}
          >
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              🎵 Click anywhere to start music
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BackgroundMusic;

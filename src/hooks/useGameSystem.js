import { useState, useCallback, useEffect, useRef } from 'react';
import { soundEffects } from '../utils/soundEffects';

export const useGameSystem = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [konamiProgress, setKonamiProgress] = useState('');
  const previousLevelRef = useRef(1);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  const showAchievement = useCallback((message, type = 'default') => {
    const achievement = {
      id: Date.now() + Math.random(),
      message,
      type
    };

    setAchievements(prev => [...prev, achievement]);

    setTimeout(() => {
      setAchievements(prev => prev.filter(a => a.id !== achievement.id));
    }, 4000);
  }, []);

  const addScore = useCallback((points) => {
    setScore(prevScore => {
      const newScore = prevScore + points;
      const newLevel = Math.floor(newScore / 1000) + 1;

      if (newLevel !== level) {
        setLevel(newLevel);
      }

      return newScore;
    });
  }, [level]);

  // Handle level-up notifications in a separate effect
  useEffect(() => {
    if (level > previousLevelRef.current) {
      showAchievement(`LEVEL UP! Now at Level ${level}!`, 'level-up');
      soundEffects.playLevelUpSound();
      previousLevelRef.current = level;
    }
  }, [level, showAchievement]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;
      const normalizedKey = key.toLowerCase();

      // Get expected key (normalized)
      const expectedKey = konamiCode[konamiIndex];
      const normalizedExpected = expectedKey.toLowerCase();

      console.log(`Key pressed: ${key}, Expected: ${expectedKey}, Index: ${konamiIndex}`);

      if (normalizedKey === normalizedExpected || key === expectedKey) {
        const newIndex = konamiIndex + 1;
        setKonamiIndex(newIndex);

        // Update progress display
        const symbols = {
          'ArrowUp': '⬆️',
          'ArrowDown': '⬇️',
          'ArrowLeft': '⬅️',
          'ArrowRight': '➡️',
          'b': 'B',
          'a': 'A'
        };
        setKonamiProgress(prev => prev + (symbols[expectedKey] || key));

        console.log(`Correct! Progress: ${newIndex}/${konamiCode.length}`);

        if (newIndex === konamiCode.length) {
          console.log('KONAMI CODE COMPLETE!');

          // Play epic victory sound
          soundEffects.playKonamiSound();

          showAchievement('🎮 KONAMI CODE ACTIVATED! YOU SAVED THE UNIVERSE! 🎮', 'konami');
          addScore(3000);  // Reduced from 10000 to 3000 for level 4
          setKonamiIndex(0);
          setKonamiProgress('');

          // Trigger explosion and page fall
          window.dispatchEvent(new Event('konami-complete'));

          // Rainbow effect
          document.body.style.animation = 'rainbow 2s linear';
          setTimeout(() => {
            document.body.style.animation = '';
          }, 2000);
        }
      } else {
        if (konamiIndex > 0) {
          console.log('Wrong key! Resetting...');
        }
        setKonamiIndex(0);
        setKonamiProgress('');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [konamiIndex, addScore, showAchievement]);

  const resetGame = useCallback(() => {
    setScore(0);
    setLevel(1);
    setAchievements([]);
    setKonamiIndex(0);
    setKonamiProgress('');
    previousLevelRef.current = 1;
  }, []);

  return {
    score,
    level,
    achievements,
    addScore,
    showAchievement,
    konamiProgress,
    resetGame
  };
};

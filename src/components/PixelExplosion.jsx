import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const PixelExplosion = ({ isActive, onComplete }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isActive) {
      // Generate random pixel particles
      const newParticles = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 1000,
        vy: (Math.random() - 0.5) * 1000,
        size: Math.random() * 20 + 10,
        color: ['#0f0', '#FFD700', '#FF0000', '#0000FF', '#FF69B4', '#00FFFF'][Math.floor(Math.random() * 6)]
      }));
      setParticles(newParticles);

      // Complete after animation
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 1,
            opacity: 1
          }}
          animate={{
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            scale: 0,
            opacity: 0,
            rotate: 360
          }}
          transition={{
            duration: 2,
            ease: 'easeOut'
          }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 10px ${particle.color}`,
            imageRendering: 'pixelated'
          }}
        />
      ))}

      {/* Flash effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.5, times: [0, 0.1, 1] }}
        className="absolute inset-0 bg-white"
      />
    </div>
  );
};

export default PixelExplosion;

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { generatePDF } from '../utils/pdfGenerator';

const Ghost = ({ color, delay, onClick, disabled }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const ghost = document.getElementById(`ghost-${color}`);
      if (!ghost) return;

      const rect = ghost.getBoundingClientRect();
      const ghostX = rect.left + rect.width / 2;
      const ghostY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - ghostY, e.clientX - ghostX);
      const offsetX = Math.cos(angle) * 2;
      const offsetY = Math.sin(angle) * 2;

      setPosition({ x: offsetX, y: offsetY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [color]);

  const ghostColors = {
    red: '#FF0000',
    blue: '#0000FF',
    pink: '#FF69B4',
    orange: '#FFA500'
  };

  return (
    <motion.div
      id={`ghost-${color}`}
      initial={{ x: -60, opacity: 0 }}
      animate={{
        x: ['-60px', '110vw'],
        opacity: [0, 1, 1, 0]
      }}
      transition={{
        duration: 8,
        delay: delay,
        repeat: Infinity,
        ease: 'linear'
      }}
      onClick={disabled ? undefined : onClick}
      className={`absolute top-0 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-125'} transition-transform`}
      style={{ width: '40px', height: '40px' }}
    >
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path
          fill={ghostColors[color]}
          d="M 12 1 C 7.03 1 3 5.03 3 10 L 3 22 L 7 18 L 9 20 L 11 18 L 13 20 L 15 18 L 17 20 L 21 18 L 21 10 C 21 5.03 16.97 1 12 1 z"
        />
        <circle className="eye" cx="8.5" cy="7" r="2" fill="#FFF" />
        <circle className="eye" cx="15.5" cy="7" r="2" fill="#FFF" />
        <circle
          cx={8.5 + position.x}
          cy={7 + position.y}
          r="1.2"
          fill="#0000FF"
        />
        <circle
          cx={15.5 + position.x}
          cy={7 + position.y}
          r="1.2"
          fill="#0000FF"
        />
      </svg>
    </motion.div>
  );
};

const Header = ({ onGhostClick }) => {
  const [clickedGhosts, setClickedGhosts] = useState({
    red: false,
    blue: false,
    pink: false,
    orange: false
  });

  const handleGhostClick = (color, points) => {
    if (!clickedGhosts[color]) {
      setClickedGhosts(prev => ({ ...prev, [color]: true }));
      onGhostClick(points);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-8 relative"
    >
      <motion.h1
        className="text-3xl md:text-5xl lg:text-6xl text-matrix-green mb-6 animate-glitch"
        style={{
          textShadow: '2px 2px 0 #000, 4px 4px 0 #0f0, 0 0 10px #0f0'
        }}
      >
        Ionuț's Digital Journey
      </motion.h1>

      <div className="relative h-12 overflow-hidden mb-6">
        <Ghost color="red" delay={0} onClick={() => handleGhostClick('red', 50)} disabled={clickedGhosts.red} />
        <Ghost color="blue" delay={0.3} onClick={() => handleGhostClick('blue', 50)} disabled={clickedGhosts.blue} />
        <Ghost color="pink" delay={0.6} onClick={() => handleGhostClick('pink', 50)} disabled={clickedGhosts.pink} />
        <Ghost color="orange" delay={0.9} onClick={() => handleGhostClick('orange', 50)} disabled={clickedGhosts.orange} />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-matrix-green text-black px-6 py-3 rounded border-3 border-black font-bold text-sm md:text-base hover:bg-black hover:text-matrix-green transition-colors"
        onClick={generatePDF}
      >
        Download as PDF
      </motion.button>
    </motion.header>
  );
};

export default Header;

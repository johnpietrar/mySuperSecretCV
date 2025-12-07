import { motion } from 'framer-motion';
import { useState } from 'react';
import pedroGif from '/public/pedro.gif';

const LegoModal = ({ isOpen, onClose, onUnlock }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-[10000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: -100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: -100 }}
        className="bg-gradient-to-br from-gray-900 to-black border-4 border-gold rounded-2xl p-8 max-w-lg w-full text-center relative"
        style={{ boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-matrix-green text-3xl hover:text-gold transition-colors"
        >
          ×
        </button>

        <h2 className="text-2xl md:text-3xl text-gold mb-4" style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}>
          🧱 LEGO MASTER BUILDER UNLOCKED! 🧱
        </h2>

        <p className="text-matrix-green text-sm md:text-base mb-6">
          You've discovered the secret LEGO Easter Egg!
        </p>

        <div className="flex justify-center gap-4 mb-6 flex-wrap">
          {['red', 'blue', 'yellow', 'green'].map((color, index) => (
            <motion.div
              key={color}
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: index * 0.2 }}
              className={`w-16 h-10 rounded ${
                color === 'red' ? 'bg-red-500' :
                color === 'blue' ? 'bg-blue-500' :
                color === 'yellow' ? 'bg-yellow-400' :
                'bg-green-500'
              } relative shadow-lg`}
            >
              <div className="absolute -top-2 left-2 flex gap-5">
                <div className={`w-3 h-3 rounded-full ${
                  color === 'red' ? 'bg-red-600' :
                  color === 'blue' ? 'bg-blue-600' :
                  color === 'yellow' ? 'bg-yellow-500' :
                  'bg-green-600'
                }`}></div>
                <div className={`w-3 h-3 rounded-full ${
                  color === 'red' ? 'bg-red-600' :
                  color === 'blue' ? 'bg-blue-600' :
                  color === 'yellow' ? 'bg-yellow-500' :
                  'bg-green-600'
                }`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-matrix-green text-xs md:text-sm">
          Fun Fact: The LEGO Magazine infrastructure processes millions of requests monthly!
        </p>
      </motion.div>
    </motion.div>
  );
};

const Gamepad = ({ onStartClick, onLegoClick }) => {
  const [startHover, setStartHover] = useState(false);
  const [legoHover, setLegoHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-4 left-4 z-50"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 128"
          width="128"
          height="128"
          className="drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]"
        >
          {/* Gamepad body */}
          <rect x="8" y="28" width="112" height="60" fill="#333" stroke="#0f0" strokeWidth="4" />

          {/* D-pad */}
          <rect x="20" y="55" width="8" height="8" fill="#FFF" />
          <rect x="28" y="55" width="8" height="8" fill="#FFF" />
          <rect x="36" y="55" width="8" height="8" fill="#FFF" />
          <rect x="28" y="47" width="8" height="8" fill="#FFF" />
          <rect x="28" y="63" width="8" height="8" fill="#FFF" />

          {/* Four colored buttons */}
          <circle cx="91" cy="50" r="6" fill="#FF0000" />
          <circle cx="106" cy="50" r="6" fill="#00FF00" />
          <circle cx="90" cy="66" r="6" fill="#0000FF" />

          {/* Yellow button - LEGO Easter Egg */}
          <motion.circle
            cx="106"
            cy="66"
            r="6"
            fill={legoHover ? "#FFD700" : "#FFFF00"}
            className="cursor-pointer"
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setLegoHover(true)}
            onMouseLeave={() => setLegoHover(false)}
            onClick={onLegoClick}
            style={{
              filter: legoHover ? 'drop-shadow(0 0 8px #FFFF00)' : 'none',
              transformOrigin: '106px 66px'
            }}
          />

          {/* Start button */}
          <motion.rect
            x="52"
            y="58"
            width="10"
            height="4"
            fill={startHover ? "#FFD700" : "#FFF"}
            className="cursor-pointer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setStartHover(true)}
            onMouseLeave={() => setStartHover(false)}
            onClick={onStartClick}
            style={{ transformOrigin: '57px 60px' }}
          />

          {/* Select button */}
          <rect x="66" y="58" width="10" height="4" fill="#FFF" />

          {/* Cable */}
          <path d="M64,28 Q64,18 54,18 T44,8" stroke="#0f0" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

const Pedro = ({ onClick, disabled }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <motion.a
        href="https://www.youtube.com/shorts/jw3jjN8kCyo"
        target="_blank"
        rel="noopener noreferrer"
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        whileHover={disabled ? {} : { scale: 1.1, rotate: 5 }}
        whileTap={disabled ? {} : { scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ y: { repeat: Infinity, duration: 2 } }}
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        {!imageLoaded && (
          <div className="w-32 md:w-40 h-32 md:h-40 bg-black/50 border-2 border-matrix-green rounded-lg flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="text-2xl"
            >
              🦝
            </motion.div>
          </div>
        )}
        <img
          src={pedroGif}
          alt="Dancing Pedro the Raccoon"
          className={`w-32 md:w-40 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${imageLoaded ? 'block' : 'hidden'}`}
          style={{ imageRendering: 'pixelated' }}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </motion.a>
    </motion.div>
  );
};

const InteractiveElements = ({ onGamepadClick, onLegoClick, onPedroClick }) => {
  const [isLegoModalOpen, setIsLegoModalOpen] = useState(false);
  const [clicked, setClicked] = useState({
    gamepad: false,
    lego: false,
    pedro: false
  });

  const handleGamepadClick = () => {
    if (!clicked.gamepad) {
      setClicked(prev => ({ ...prev, gamepad: true }));
      window.open('https://www.google.com/logos/2010/pacman10-i.html', '_blank');
      onGamepadClick();
    }
  };

  const handleLegoClick = () => {
    if (!clicked.lego) {
      setClicked(prev => ({ ...prev, lego: true }));
      setIsLegoModalOpen(true);
      onLegoClick();
    }
  };

  const handlePedroClick = (e) => {
    if (!clicked.pedro) {
      setClicked(prev => ({ ...prev, pedro: true }));
      onPedroClick(e);
    } else {
      e.preventDefault();
    }
  };

  return (
    <>
      <Gamepad
        onStartClick={handleGamepadClick}
        onLegoClick={handleLegoClick}
      />
      <Pedro onClick={handlePedroClick} disabled={clicked.pedro} />
      <LegoModal
        isOpen={isLegoModalOpen}
        onClose={() => setIsLegoModalOpen(false)}
        onUnlock={onLegoClick}
      />
    </>
  );
};

export default InteractiveElements;

import { motion } from 'framer-motion';

const GameStats = ({ score, level }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-around items-center gap-4 p-4 bg-black border-2 border-matrix-green rounded-lg mb-4 text-xs md:text-sm"
    >
      <div className="flex items-center gap-2">
        <span className="text-matrix-green text-shadow-glow">LEVEL:</span>
        <motion.span
          key={level}
          initial={{ scale: 1.5, color: '#FFD700' }}
          animate={{ scale: 1, color: '#0f0' }}
          className="text-matrix-green font-bold"
        >
          {level}
        </motion.span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-matrix-green text-shadow-glow">SCORE:</span>
        <motion.span
          key={score}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-matrix-green font-bold"
        >
          {score}
        </motion.span>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-red-500">❤️</span>
        <span className="text-red-500">❤️</span>
        <span className="text-red-500">❤️</span>
      </div>
    </motion.div>
  );
};

export default GameStats;

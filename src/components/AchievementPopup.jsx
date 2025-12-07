import { motion, AnimatePresence } from 'framer-motion';

const AchievementPopup = ({ achievements }) => {
  return (
    <div className="fixed top-24 right-4 z-[9999] space-y-3">
      <AnimatePresence mode="popLayout">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ x: 400, opacity: 0, scale: 0.8 }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
              rotate: achievement.type === 'konami' ? [0, -2, 2, -2, 2, 0] : 0
            }}
            exit={{
              x: 400,
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.3 }
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              delay: index * 0.05
            }}
            className={`
              bg-gradient-to-r from-yellow-400 to-orange-500
              text-black font-bold px-6 py-4 rounded-lg
              border-4 border-black shadow-2xl
              max-w-sm text-xs md:text-sm
              relative overflow-hidden
            `}
            style={{
              boxShadow: achievement.type === 'konami'
                ? '0 0 30px rgba(255, 215, 0, 1), 0 0 60px rgba(255, 100, 0, 0.8)'
                : '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4)',
              animation: achievement.type === 'konami' ? 'rainbow 1s linear infinite' : 'none'
            }}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{
                duration: 1,
                repeat: achievement.type === 'konami' ? Infinity : 0,
                repeatDelay: 0.5
              }}
            />

            <div className="flex items-center gap-3 relative z-10">
              <motion.span
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  ease: "easeInOut"
                }}
                className="text-2xl"
              >
                {achievement.type === 'konami' ? '🎮' : '🏆'}
              </motion.span>
              <span className="leading-tight">{achievement.message}</span>
            </div>

            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-black/30"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 4, ease: 'linear' }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AchievementPopup;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameSystem } from './hooks/useGameSystem';
import { soundEffects } from './utils/soundEffects';

// Components
import LoadingScreen from './components/LoadingScreen';
import ParticleBackground from './components/ParticleBackground';
import GameStats from './components/GameStats';
import AchievementPopup from './components/AchievementPopup';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Experience from './components/Experience';
import CVSection from './components/CVSection';
import InteractiveElements from './components/InteractiveElements';
import BackgroundMusic from './components/BackgroundMusic';
import PixelExplosion from './components/PixelExplosion';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [sectionsViewed, setSectionsViewed] = useState(new Set());
  const [showExplosion, setShowExplosion] = useState(false);
  const [pageFalling, setPageFalling] = useState(false);
  const { score, level, achievements, addScore, showAchievement, konamiProgress } = useGameSystem();

  // Listen for Konami code completion
  useEffect(() => {
    const handleKonamiComplete = () => {
      setShowExplosion(true);
      setTimeout(() => {
        setPageFalling(true);
      }, 500);
      setTimeout(() => {
        // Bring page back up smoothly
        setPageFalling(false);
      }, 4500);
      setTimeout(() => {
        // Clear visual effects after 6.5 seconds total
        setShowExplosion(false);

        // Clear rainbow effect
        document.body.style.animation = '';
      }, 6500);
    };

    window.addEventListener('konami-complete', handleKonamiComplete);
    return () => window.removeEventListener('konami-complete', handleKonamiComplete);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        showAchievement('Welcome, Player! Start exploring to earn points!');
      }, 500);
    }
  }, [isLoading, showAchievement]);

  const handleSectionView = (points, sectionId) => {
    // Only add points if this section hasn't been viewed yet
    if (!sectionsViewed.has(sectionId)) {
      addScore(points);

      const newViewed = new Set(sectionsViewed);
      newViewed.add(sectionId);
      setSectionsViewed(newViewed);

      // Check if all sections viewed (10 total: 1 summary + 5 experience cards + 4 other sections)
      if (newViewed.size === 10) {
        showAchievement('CV Explorer! Viewed all sections! +500 bonus!');
        addScore(500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-matrix-green relative">
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <PixelExplosion isActive={showExplosion} onComplete={() => setShowExplosion(false)} />

      {!isLoading && (
        <>
          <ParticleBackground />

          <motion.div
            className="relative z-10"
            animate={pageFalling ? {
              y: window.innerHeight + 1000,
              rotateZ: 15,
              opacity: 0
            } : {
              y: 0,
              rotateZ: 0,
              opacity: 1
            }}
            transition={{
              duration: 2,
              ease: pageFalling ? 'easeIn' : 'easeOut'
            }}
          >
            <div className="container mx-auto px-4 py-8 max-w-6xl">
              {/* Konami Code Progress Indicator */}
              {konamiProgress && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/90 border-2 border-gold px-6 py-2 rounded-lg z-50 text-gold text-sm md:text-base"
                  style={{ boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}
                >
                  Konami Code: {konamiProgress}
                </motion.div>
              )}

              <GameStats score={score} level={level} />
              <Header onGhostClick={(points) => addScore(points)} />
              <Navigation onNavigate={(points) => addScore(points)} />

              <main className="relative">
                {/* Summary */}
                <CVSection
                  id="summary"
                  title="Professional Summary"
                  onView={(points) => handleSectionView(points, 'summary')}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-sm md:text-base space-y-4"
                  >
                    <p>
                      Passionate and experienced Engineering Team Lead with over 8 years in the industry.
                      Skilled in backend development, particularly with Node.js and AWS. Proven ability to
                      lead engineering teams, architect scalable systems, and deliver high-quality software
                      solutions on time.
                    </p>
                    <p>
                      Known for strong problem-solving skills, innovation, and the ability to work
                      independently and collaboratively within cross-functional teams.
                    </p>
                    <p className="text-gold">
                      Contact:{' '}
                      <a
                        href="mailto:johnpietrar@gmail.com"
                        className="hover:text-cyan-400 underline transition-colors"
                      >
                        johnpietrar@gmail.com
                      </a>
                    </p>
                  </motion.div>
                </CVSection>

                {/* Experience */}
                <Experience onSectionView={handleSectionView} />

                {/* Skills */}
                <CVSection id="skills" title="Skills" onView={(points) => handleSectionView(points, 'skills')}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base"
                  >
                    {[
                      { label: 'Languages', value: 'Node.js, TypeScript, C#, Python' },
                      { label: 'Cloud Services', value: 'Amazon Web Services (AWS)' },
                      { label: 'Databases', value: 'NoSQL, SQL, Databricks' },
                      { label: 'Practices', value: 'Microservices, Testing, CI/CD, GDPR Compliance' },
                      { label: 'Leadership', value: 'Team Lead, Mentoring, Code Review, Interviews' },
                      { label: 'Domains', value: 'E-commerce, Media, Manufacturing, IoT' }
                    ].map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border-l-4 border-matrix-green bg-matrix-green/5"
                      >
                        <strong className="text-gold">{skill.label}:</strong> {skill.value}
                      </motion.div>
                    ))}
                  </motion.div>
                </CVSection>

                {/* Education */}
                <CVSection id="education" title="Education" onView={(points) => handleSectionView(points, 'education')}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="p-6 border-2 border-matrix-green rounded-lg bg-black/50"
                  >
                    <h3 className="text-lg md:text-xl text-gold mb-2">
                      Politehnica University Timisoara
                    </h3>
                    <p className="text-sm md:text-base">Bachelor's degree, Computer Science</p>
                  </motion.div>
                </CVSection>

                {/* Achievements */}
                <CVSection id="achievements" title="Achievements" onView={(points) => handleSectionView(points, 'achievements')}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-3 text-sm md:text-base"
                  >
                    {[
                      'Innovation Award for contributions to project efficiency and new feature development at 3Pillar Global',
                      'Successfully led the development and deployment of multiple high-impact projects across LEGO, Dunelm, and Fortune Media',
                      'Built payment system processing millions of transactions with 99.9% uptime',
                      '🎮 Retro Gaming Secret: Try the classic cheat code... ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA'
                    ].map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                          p-4 border-l-4 border-matrix-green bg-matrix-green/5
                          ${index === 3 ? 'border-pink-400 text-pink-400 animate-pulse' : ''}
                        `}
                      >
                        {achievement}
                      </motion.div>
                    ))}
                  </motion.div>
                </CVSection>

                {/* Publications */}
                <CVSection id="publications" title="Publications" onView={(points) => handleSectionView(points, 'publications')}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-4 text-sm md:text-base"
                  >
                    {[
                      {
                        title: 'Architecting Robust Software: Embracing Modular Design',
                        url: 'https://medium.com/@ionutpietrar/architecting-robust-software-embracing-modular-design-6980ff3c3933'
                      },
                      {
                        title: 'Crafting Effective Documentation for TypeScript Microservices Projects',
                        url: 'https://medium.com/@ionutpietrar/crafting-effective-documentation-for-typescript-microservices-projects-94cec40e740b'
                      }
                    ].map((pub, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border-2 border-matrix-green rounded-lg bg-black/50 hover:border-cyan-400 transition-colors"
                      >
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold hover:text-cyan-400 underline"
                        >
                          {pub.title}
                        </a>
                      </motion.div>
                    ))}
                  </motion.div>
                </CVSection>
              </main>

              <motion.footer
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-16 pb-8 text-xs md:text-sm text-matrix-green/60"
              >
                <p>Built with React, Vite, Tailwind CSS & Framer Motion</p>
                <p className="mt-2">© {new Date().getFullYear()} Ionuț Pietrar</p>
              </motion.footer>
            </div>
          </motion.div>

          <AchievementPopup achievements={achievements} />
          <InteractiveElements
            onGamepadClick={() => {
              soundEffects.playPointsSound();
              addScore(50);
              showAchievement('Pac-Man Master! +50 points!');
            }}
            onLegoClick={() => {
              soundEffects.playAchievementSound();
              addScore(500);
              showAchievement('LEGO Master Builder discovered! +500 points!');
            }}
            onPedroClick={(e) => {
              e.preventDefault();
              soundEffects.playPointsSound();
              addScore(100);
              showAchievement('You found Pedro! +100 points!');
            }}
          />
          <BackgroundMusic />
        </>
      )}
    </div>
  );
}

export default App;

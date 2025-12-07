import { motion } from 'framer-motion';

const Navigation = ({ onNavigate }) => {
  const sections = [
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'publications', label: 'Publications' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onNavigate(10);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 bg-black/90 backdrop-blur-sm border-2 border-matrix-green rounded-lg p-4 mb-8"
    >
      <ul className="flex flex-wrap justify-center gap-2 md:gap-4">
        {sections.map((section, index) => (
          <motion.li
            key={section.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <motion.button
              whileHover={{ scale: 1.1, color: '#fff' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(section.id)}
              className="text-matrix-green text-xs md:text-sm px-2 md:px-4 py-2 hover:text-white transition-colors"
            >
              {section.label}
            </motion.button>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Navigation;

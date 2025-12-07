import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const CVSection = ({ id, title, children, onView }) => {
  const ref = useRef(null);
  const [hasViewed, setHasViewed] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView && !hasViewed && onView) {
      setHasViewed(true);
      onView(25);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-12 scroll-mt-24"
    >
      <h2 className="text-2xl md:text-3xl text-matrix-green mb-6 pb-2 border-b-2 border-matrix-green">
        {title}
      </h2>
      {children}
    </motion.section>
  );
};

export default CVSection;

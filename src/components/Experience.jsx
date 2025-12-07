import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const ExperienceCard = ({ job, isCurrent, index, onView }) => {
  const ref = useRef(null);
  const [hasViewed, setHasViewed] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && !hasViewed) {
      setHasViewed(true);
      onView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`
        mb-6 p-6 rounded-lg border-2 transition-all hover:transform hover:-translate-y-2
        ${isCurrent
          ? 'border-gold bg-gradient-to-br from-gray-900 to-black shadow-lg shadow-gold/30 relative overflow-hidden'
          : 'border-matrix-green bg-black/50 hover:border-cyan-400 hover:shadow-lg hover:shadow-matrix-green/30'
        }
      `}
    >
      {isCurrent && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent animate-[shine_3s_infinite]" />
          <div className="absolute top-4 right-4">
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded text-xs font-bold border-2 border-black"
              style={{ boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}
            >
              TECHNICAL LEAD
            </motion.span>
          </div>
        </>
      )}

      <div className="relative z-10">
        <h3 className="text-lg md:text-xl text-matrix-green mb-2">{job.company}</h3>
        <p className="text-sm md:text-base text-matrix-green/80 mb-3">{job.title} ({job.period})</p>

        {job.clients && (
          <div className="mb-3">
            {job.clients.map((client, idx) => (
              <p key={idx} className="text-gold font-bold text-sm mb-2" style={{ textShadow: '0 0 5px rgba(255, 215, 0, 0.5)' }}>
                {client}
              </p>
            ))}
          </div>
        )}

        {job.description && (
          <p className="text-pink-400 italic text-xs md:text-sm mb-3">{job.description}</p>
        )}

        <ul className="space-y-2 text-xs md:text-sm">
          {job.achievements.map((achievement, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + idx * 0.05 }}
              className={`
                pl-6 py-2 border-l-4 relative
                ${achievement.highlight
                  ? 'border-gold bg-gradient-to-r from-gold/10 to-transparent'
                  : 'border-matrix-green bg-matrix-green/5'
                }
              `}
            >
              {achievement.highlight && (
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute left-[-15px] top-2"
                >
                  ⭐
                </motion.span>
              )}
              <span className="text-matrix-green">{achievement.text}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Experience = ({ onSectionView }) => {
  const jobs = [
    {
      company: 'ArcForge Technologies (Node.js/AWS/SQL)',
      title: 'Engineering Team Lead',
      period: 'Oct 2024 - Present',
      clients: ['Client: LEGO Group, Denmark'],
      achievements: [
        { text: 'Leading engineering team for LEGO Magazine platform serving millions of users globally', highlight: true },
        { text: 'Architected and developed the complete infrastructure and backend for LEGO Magazine from the ground up', highlight: true },
        { text: 'Implemented comprehensive testing suite including unit, integration, and E2E tests ensuring 95%+ code coverage', highlight: true },
        { text: 'Created custom admin tool for magazine content management, streamlining editorial workflows', highlight: true },
        { text: 'Built automated data pipeline to Databricks for analytics and business intelligence', highlight: true },
        { text: 'Designed and implemented automated GDPR compliance system for data privacy requirements', highlight: true },
        { text: 'Leading technical decisions, mentoring team members, and establishing engineering best practices', highlight: false }
      ]
    },
    {
      company: 'Mindera (Node.js/AWS/NoSQL)',
      title: 'Senior Software Engineer',
      period: 'Apr 2022 - Oct 2024',
      clients: ['Client: Dunelm - UK\'s largest homewares retailer'],
      achievements: [
        { text: 'Led development for stock management system handling real-time inventory across 180+ stores', highlight: true },
        { text: 'Architected and built payment system processing millions of transactions with 99.9% uptime', highlight: true },
          { text: 'Optimized backend services for high-traffic retail platform serving millions of customers', highlight: true },
        { text: 'Built and maintained scalable e-commerce solutions using AWS and Node.js', highlight: false },
        { text: 'Conducted code reviews and mentored junior developers on microservices architecture', highlight: false }
      ]
    },
    {
      company: '3Pillar Global (Node.js/AWS/NoSQL)',
      title: 'Software Engineer',
      period: 'Aug 2019 - Apr 2022',
      clients: ['Client: Fortune (Fortune Media)'],
      achievements: [
        { text: 'Developed enterprise-grade web applications for Fortune Media using AWS and Node.js', highlight: true },
        { text: 'Participated in the full software development lifecycle for high-stakes media platform projects', highlight: true },
        { text: 'Implemented microservices architecture enhancing scalability for millions of users', highlight: true },
        { text: 'Delivered innovative solutions meeting strict enterprise security and compliance standards', highlight: false }
      ]
    },
    {
      company: 'Webamboos (Node.js/AWS/NoSQL)',
      title: 'Software Development Specialist',
      period: 'Aug 2018 - Aug 2019',
      description: 'Jack-of-all-trades developer handling diverse project categories',
      achievements: [
        { text: 'Tackled projects across every conceivable category - from e-commerce to IoT, fintech to content management', highlight: false },
        { text: 'Rapidly adapted to new technologies and domains, delivering solutions across varied tech stacks', highlight: false },
        { text: 'Specialized in developing server-side applications, APIs, and cloud integrations', highlight: false },
        { text: 'Optimized and enhanced existing codebases across multiple client projects', highlight: false }
      ]
    },
    {
      company: 'Flex (C#/SQL)',
      title: 'Software Development Engineer',
      period: 'May 2016 - Aug 2018',
      achievements: [
        { text: 'Collaborated directly with production line engineers to improve manufacturing systems', highlight: false },
        { text: 'Designed and developed software solutions optimizing factory floor operations', highlight: false },
        { text: 'Implemented real-time communication systems between production line equipment', highlight: false },
        { text: 'Enhanced system efficiency leading to measurable improvements in production output', highlight: false }
      ]
    }
  ];

  return (
    <section id="experience" className="mb-12">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl text-matrix-green mb-6 pb-2 border-b-2 border-matrix-green"
      >
        Professional Experience
      </motion.h2>

      {jobs.map((job, index) => (
        <ExperienceCard
          key={index}
          job={job}
          isCurrent={index === 0}
          index={index}
          onView={() => onSectionView(25, `experience-${index}`)}
        />
      ))}
    </section>
  );
};

export default Experience;

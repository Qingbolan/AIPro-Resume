import React from 'react';
import { motion } from 'framer-motion';

const ExperienceSection = ({ data, isDarkMode }) => (
  <ul className="space-y-6">
    {data.map((exp, index) => (
      <ExperienceItem key={index} exp={exp} isDarkMode={isDarkMode} index={index} />
    ))}
  </ul>
);

const ExperienceItem = React.memo(({ exp, isDarkMode, index }) => (
  <motion.li 
    className={`border-l-4 ${isDarkMode ? 'border-purple-500' : 'border-purple-400'} pl-4`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <h3 className="font-semibold text-lg">{exp.company}</h3>
    <p>{exp.role}</p>
    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exp.date}</p>
    <ul className="list-disc list-inside mt-2 text-sm">
      {exp.details.map((detail, i) => (
        <li key={i}>{detail}</li>
      ))}
    </ul>
  </motion.li>
));

export default ExperienceSection;
import React from 'react';
import { motion } from 'framer-motion';

const EducationSection = ({ data, isDarkMode }) => (
  <ul className="space-y-4">
    {data.map((edu, index) => (
      <EducationItem key={index} edu={edu} isDarkMode={isDarkMode} index={index} />
    ))}
  </ul>
);

const EducationItem = React.memo(({ edu, isDarkMode, index }) => (
  <motion.li 
    className={`border-l-4 ${isDarkMode ? 'border-purple-500' : 'border-purple-400'} pl-4`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <h3 className="font-semibold text-lg">{edu.school}</h3>
    <p>{edu.degree}</p>
    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{edu.date}</p>
    {edu.details && (
      <ul className="list-disc list-inside mt-2 text-sm">
        {edu.details.map((detail, i) => (
          <li key={i}>{detail}</li>
        ))}
      </ul>
    )}
  </motion.li>
));

export default EducationSection;
import React from 'react';
import { motion } from 'framer-motion';

const ResearchSection = ({ data, isDarkMode }) => (
  <ul className="space-y-6">
    {data.map((research, index) => (
      <ResearchItem key={index} research={research} isDarkMode={isDarkMode} index={index} />
    ))}
  </ul>
);

const ResearchItem = React.memo(({ research, isDarkMode, index }) => (
  <motion.li 
    className={`border-l-4 ${isDarkMode ? 'border-purple-500' : 'border-purple-400'} pl-4`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    <h3 className="font-semibold text-lg">{research.title}</h3>
    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{research.location} | {research.date}</p>
    <ul className="list-disc list-inside mt-2 text-sm">
      {research.details.map((detail, i) => (
        <li key={i}>{detail}</li>
      ))}
    </ul>
  </motion.li>
));

export default ResearchSection;
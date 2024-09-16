import React from 'react';
import { motion } from 'framer-motion';

const AwardsSection = ({ data, isDarkMode }) => (
  <ul className="space-y-2">
    {data.map((award, index) => (
      <AwardItem key={index} award={award} isDarkMode={isDarkMode} index={index} />
    ))}
  </ul>
);

const AwardItem = React.memo(({ award, isDarkMode, index }) => (
  <motion.li 
    className={`border-l-4 ${isDarkMode ? 'border-purple-500' : 'border-purple-400'} pl-4 py-2`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    {award}
  </motion.li>
));

export default AwardsSection;
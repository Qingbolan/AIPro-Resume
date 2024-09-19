import React from 'react';
import { motion } from 'framer-motion';

const PublicationsSection = ({ data, isDarkMode }) => (
  <ul className="space-y-2">
    {data.map((pub, index) => (
      <PublicationItem key={index} pub={pub} isDarkMode={isDarkMode} index={index} />
    ))}
  </ul>
);

const PublicationItem = React.memo(({ pub, isDarkMode, index }) => (
  <motion.li 
    className={`border-l-4 ${isDarkMode ? 'border-purple-500' : 'border-purple-400'} pl-4 py-2`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    {pub}
  </motion.li>
));

export default PublicationsSection;
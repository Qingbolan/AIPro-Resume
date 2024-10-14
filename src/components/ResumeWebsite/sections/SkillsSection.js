import React from 'react';
import { motion } from 'framer-motion';

const SkillsSection = ({ data, isDarkMode }) => (
  <motion.ul 
    className="flex flex-wrap gap-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    {data.map((skill, index) => (
      <SkillItem key={index} skill={skill} isDarkMode={isDarkMode} index={index} />
    ))}
  </motion.ul>
);

const SkillItem = React.memo(({ skill, isDarkMode, index }) => (
  <motion.li 
    className={`${isDarkMode ? 'bg-purple-700' : 'bg-purple-200'} px-3 py-1 rounded-full text-sm`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
  >
    {skill}
  </motion.li>
));

export default SkillsSection;
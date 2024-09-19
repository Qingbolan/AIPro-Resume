// src/components/Loader.js
import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => (
  <motion.div
    className="loader inline-block w-4 h-4 border-2 border-t-2 border-gray-200 rounded-full animate-spin ml-2"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  ></motion.div>
);

export default Loader;
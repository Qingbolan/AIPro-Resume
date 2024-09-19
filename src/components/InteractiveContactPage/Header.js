// src/components/Header.js
import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.header
      className="max-w-4xl mx-auto text-center mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-5xl font-bold mb-4 text-purple-700" variants={itemVariants}>
        Contact Silan Hu
      </motion.h1>
      <motion.p className="text-xl text-gray-600 mb-8" variants={itemVariants}>
        AI Researcher &amp; Full Stack Developer
      </motion.p>
      <motion.div className="flex items-center justify-center" variants={itemVariants}>
        <motion.img
          src="/logo.svg"
          alt="Silan Hu"
          className="w-16 h-16 rounded-full mr-4"
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
        <div className="text-left">
          <motion.h2 className="text-2xl font-semibold text-purple-700" variants={itemVariants}>
            Silan Hu (ZIYUN · 2025)
          </motion.h2>
          <motion.p className="text-gray-600" variants={itemVariants}>
            Silan.Hu@u.nus.edu | +65 86986181
          </motion.p>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
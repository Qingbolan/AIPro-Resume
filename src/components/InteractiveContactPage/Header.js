// src/components/Header.js
import React from 'react';

const Header = () => (
  <header className="max-w-4xl mx-auto text-center mb-12">
    <h1 className="text-5xl font-bold mb-4 text-purple-700">Contact Silan Hu</h1>
    <p className="text-xl text-gray-600 mb-8">
      AI Researcher &amp; Full Stack Developer
    </p>
    <div className="flex items-center justify-center">
      <img src="/logo.svg" alt="Silan Hu" className="w-16 h-16 rounded-full mr-4" />
      <div className="text-left">
        <h2 className="text-2xl font-semibold text-purple-700">Silan Hu (ZIYUN · 2025)</h2>
        <p className="text-gray-600">Silan.Hu@u.nus.edu | +65 86986181</p>
      </div>
    </div>
  </header>
);

export default Header;
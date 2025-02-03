import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/ResumeWebsite/Header';
import Navigation from '../components/ResumeWebsite/Navigation';
import ContentSection from '../components/ResumeWebsite/ContentSection';
import Footer from '../components/ResumeWebsite/Footer';
import { fetchResumeData } from '../api/resumeApi';
import { useLanguage } from '../components/LanguageContent';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../components/ThemeContent';
import * as THREE from 'three';
import IconLoading from 'components/basics/IconLoading';

const Background3D = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        isDarkMode: { value: isDarkMode ? 1 : 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float isDarkMode;
        varying vec2 vUv;
        void main() {
          vec3 color = isDarkMode == 1.0 ? vec3(0.1, 0.05, 0.2) : vec3(0.9, 0.85, 1.0);
          float alpha = sin(vUv.x * 10.0 + time) * 0.5 + 0.5;
          gl_FragColor = vec4(color, alpha * 0.1);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.001;
      torus.rotation.y += 0.002;
      material.uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDarkMode]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

const ResumeWebsite = () => {
  const [activeSection, setActiveSection] = useState('education');
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const getResumeData = async () => {
      setError(null);
      try {
        const data = await fetchResumeData(language);
        setResumeData(data);
      } catch (err) {
        setError(t('failed_to_fetch_resume_data'));
      }
      setLoading(false);
    };

    getResumeData();
  }, [language, t]);

  if (loading) {
    return (
      <IconLoading/>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-3xl font-bold text-red-500">{error}</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Background3D isDarkMode={isDarkMode} />
      <div className="relative z-10">
        <Header 
          name={resumeData.name}
          title={resumeData.title}
          contacts={resumeData.contacts}
          socialLinks={resumeData.socialLinks}
        />
        <Navigation 
          sections={resumeData.sections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <ContentSection 
          sections={resumeData.sections}
          activeSection={activeSection}
        />
        <Footer 
          name={resumeData.name}
          contacts={resumeData.contacts}
        />
      </div>
    </div>
  );
};

export default ResumeWebsite;
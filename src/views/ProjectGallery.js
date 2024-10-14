import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid, List, Calendar, Brain, Book, Cloud, Droplet, Wrench, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../components/ThemeContent';
import { useLanguage } from '../components/LanguageContent';
import { useTranslation } from 'react-i18next';

import ProjectCard from '../components/ProjectGallery/ProjectCard';
import TimelineView from '../components/ProjectGallery/TimelineView';
import ProjectDetailModal from '../components/ProjectGallery/ProjectDetailModal';
// import QuickToolsBar from '../components/ProjectGallery/QuickToolsBar';
import KnowledgeGraph from '../components/ProjectGallery/KnowledgeGraph';
import AnnualPlanDetail from '../components/ProjectGallery/ProjectCard/AnnualPlanDetail';
import AnnualPlanTimeline from '../components/ProjectGallery/AnnualPlanTimeline';
import { fetchProjects, fetchCategories, fetchAnnualPlans, fetchGraphData } from '../api/projectApi';

const ProjectGallery = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEcosystem, setShowEcosystem] = useState(false);
  const [showKnowledgeGraph, setShowKnowledgeGraph] = useState(false);
  const [selectedAnnualPlan, setSelectedAnnualPlan] = useState(null);
  const [showAnnualPlans, setShowAnnualPlans] = useState(true);
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const highlightColor = isDarkMode ? 'text-purple-300' : 'text-purple-600';

  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [annualPlans, setAnnualPlans] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [projectsData, categoriesData, annualPlansData, initialGraphData] = await Promise.all([
          fetchProjects(language),
          fetchCategories(language),
          fetchAnnualPlans(language),
          fetchGraphData(language)
        ]);
        setProjects(projectsData);
        setCategories(categoriesData);
        setAnnualPlans(annualPlansData);
        setGraphData(initialGraphData);
      } catch (err) {
        setError(t('failed_to_fetch_data'));
      }
      setLoading(false);
    };
    loadData();
  }, [language, t]);

  useEffect(() => {
    const updateGraphData = async () => {
      try {
        const newGraphData = await fetchGraphData(language, selectedCategory);
        setGraphData(newGraphData);
      } catch (err) {
        console.error('Failed to update graph data:', err);
      }
    };
    if (!loading) {
      updateGraphData();
    }
  }, [selectedCategory, language, loading]);

  const filteredProjects = projects.filter(project => 
    (selectedCategory === 'All' || project.tags.includes(selectedCategory)) &&
    (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
     project.year.toString().includes(searchTerm))
  );

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleAnnualPlanClick = (plan) => {
    setSelectedAnnualPlan(plan);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-3xl font-bold">{t('loading')}</div>
        </motion.div>
      </div>
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
    <div className={`min-h-screen p-4 sm:p-8`}>
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            className={`text-3xl sm:text-4xl font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          {t('my_project_gallery')}
          </motion.h1>
          <div className="flex items-center space-x-4">
            <motion.button
              className={`${isDarkMode ? 'bg-purple-700 text-white' : 'bg-purple-600 text-white'} px-4 py-2 rounded-lg flex items-center`}
              onClick={() => setShowAnnualPlans(!showAnnualPlans)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAnnualPlans ? <X size={18} className="mr-2" /> : <Calendar size={18} className="mr-2" />}
              {showAnnualPlans ? t('hide_plans') : t('show_plans')}
            </motion.button>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`${isDarkMode ? 'text-white' : 'text-gray-900'} hover:${highlightColor} transition-colors`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={24} aria-hidden="true" /> : <Moon size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <motion.p 
          className={`text-lg sm:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t('exploring_the_potential')}
        </motion.p>
  
        <AnimatePresence>
          {showAnnualPlans && (
            <AnnualPlanTimeline plans={annualPlans} onPlanClick={handleAnnualPlanClick} />
          )}
        </AnimatePresence>
  
        <AnimatePresence>
          {!showAnnualPlans && (
            <motion.div 
              className="relative mt-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <input
                type="text"
                placeholder={t('search_placeholder')}
                className={`w-full p-3 sm:p-4 pr-12 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-purple-500`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </header>
  
      <main className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base ${
                  selectedCategory === category
                    ? (isDarkMode ? 'bg-purple-700 text-white' : 'bg-purple-600 text-white')
                    : (isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-purple-600 hover:bg-purple-100')
                }`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
          <div className="flex space-x-2">
            {[
              { icon: Grid, mode: 'grid' },
              { icon: List, mode: 'list' },
              { icon: Calendar, mode: 'timeline' },
              { icon: Brain, mode: 'ecosystem' }
            ].map(({ icon: Icon, mode }) => (
              <button
                key={mode}
                className={`p-2 rounded ${
                  mode === 'ecosystem'
                    ? (showEcosystem ? (isDarkMode ? 'bg-purple-700 text-white' : 'bg-purple-600 text-white') : (isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-purple-600'))
                    : (viewMode === mode ? (isDarkMode ? 'bg-purple-700 text-white' : 'bg-purple-600 text-white') : (isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-purple-600'))
                }`}
                onClick={() => mode === 'ecosystem' ? setShowEcosystem(!showEcosystem) : setViewMode(mode)}
              >
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>
  
        <div className="mb-4 flex justify-end">
          <button
            className={`px-4 py-2 rounded-lg ${
              showKnowledgeGraph
                ? (isDarkMode ? 'bg-purple-700 text-white' : 'bg-purple-600 text-white')
                : (isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-purple-600')
            }`}
            onClick={() => setShowKnowledgeGraph(!showKnowledgeGraph)}
          >
            {showKnowledgeGraph ? t('hide_knowledge_graph') : t('show_knowledge_graph')}
          </button>
        </div>
  
        <AnimatePresence>
          {showEcosystem && (
            <motion.div 
              className={`mb-8 p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">Personal Ecosystem</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[
                  { icon: Cloud, label: 'Idea Cloud' },
                  { icon: Droplet, label: 'Thought Pool' },
                  { icon: Book, label: 'Knowledge Base' },
                  { icon: Wrench, label: 'Fast Tools' },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className={`flex items-center space-x-2 ${
                      isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
                    } transition-colors`}
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
  
        <AnimatePresence>
          {showKnowledgeGraph && graphData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <KnowledgeGraph data={graphData} />
            </motion.div>
          )}
        </AnimatePresence>
  
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {viewMode === 'timeline' ? (
              <TimelineView projects={filteredProjects} onProjectClick={handleProjectClick} />
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProjectCard project={project} isTimelineView={false} onProjectClick={handleProjectClick} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
  
      <footer className={`max-w-6xl mx-auto mt-12 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          &copy; {new Date().getFullYear()} Silan Hu. All rights reserved.
        </motion.p>
      </footer>
  
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
        {selectedAnnualPlan && (
          <AnnualPlanDetail plan={selectedAnnualPlan} onClose={() => setSelectedAnnualPlan(null)} />
        )}
      </AnimatePresence>
  
      {/* <QuickToolsBar /> */}
    </div>
  );
};

export default ProjectGallery;
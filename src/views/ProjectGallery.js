import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid, List, Calendar, ChevronRight, Brain, Book, Briefcase, Mail, Cloud, Droplet, Wrench, Github, ExternalLink, Code, FileText, BarChart2, Settings, X } from 'lucide-react';
import { ForceGraph2D } from 'react-force-graph';
import { useTheme } from '../components/ThemeContent';

const ProjectCard = ({ project, isTimelineView, onProjectClick }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div 
      className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer ${isTimelineView ? 'flex' : ''}`}
      whileHover={{ y: -5, boxShadow: isDarkMode ? "0 10px 20px rgba(255,255,255,0.1)" : "0 10px 20px rgba(0,0,0,0.1)" }}
      onClick={() => onProjectClick(project)}
    >
      <div className={`relative ${isTimelineView ? 'w-1/3' : 'w-full h-48'}`}>
        <img src={`/api/placeholder/${isTimelineView ? 150 : 300}/${isTimelineView ? 100 : 180}`} alt={project.name} className="object-cover w-full h-full" />
        <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-2 py-1 text-sm rounded-bl">
          {project.annualPlan}
        </div>
      </div>
      <div className={`p-4 ${isTimelineView ? 'w-2/3' : ''}`}>
        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2 ${isTimelineView ? 'line-clamp-2' : 'line-clamp-3'}`}>{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tags.map(tag => (
            <span key={tag} className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>{tag}</span>
          ))}
        </div>
        <span className="text-sm text-gray-500">{project.year}</span>
      </div>
    </motion.div>
  );
};

const TimelineView = ({ projects, onProjectClick }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="relative">
      <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${isDarkMode ? 'bg-purple-700' : 'bg-purple-300'}`}></div>
      {projects.map((project, index) => (
        <motion.div 
          key={project.id} 
          className={`mb-8 flex justify-${index % 2 === 0 ? 'end' : 'start'} items-center w-full`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
            <ProjectCard project={project} isTimelineView={true} onProjectClick={onProjectClick} />
          </div>
          <motion.div 
            className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full ${isDarkMode ? 'bg-purple-600' : 'bg-purple-500'} text-white flex items-center justify-center`}
            whileHover={{ scale: 1.2 }}
          >
            {project.year}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

const ProjectDetailModal = ({ project, onClose }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
          <img src={`/api/placeholder/600/300`} alt={project.name} className="w-full h-48 object-cover mb-4 rounded" />
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{project.description}</p>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Related Content:</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`flex items-center ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}>
                  <ExternalLink size={16} className="mr-2" />
                  Related Blog Post
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}>
                  <ExternalLink size={16} className="mr-2" />
                  Video Demonstration
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}>
                  <Github size={16} className="mr-2" />
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white transition-colors`}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const QuickToolsBar = () => {
  const tools = [
    { icon: Code, name: "Code Editor" },
    { icon: FileText, name: "Note Taking" },
    { icon: Calendar, name: "Schedule" },
    { icon: BarChart2, name: "Analytics" },
    { icon: Settings, name: "Settings" }
  ];

  return (
    <motion.div 
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg p-2 flex space-x-2"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {tools.map((tool, index) => (
        <motion.button
          key={tool.name}
          className="p-2 rounded-full bg-white text-purple-600 hover:bg-purple-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => console.log(`Opening ${tool.name}`)}
        >
          <tool.icon size={24} />
        </motion.button>
      ))}
    </motion.div>
  );
};

const KnowledgeGraph = ({ data }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`h-[400px] w-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg overflow-hidden`}>
      <ForceGraph2D
        graphData={data}
        nodeAutoColorBy="group"
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

          ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = isDarkMode ? node.color : 'white';
          ctx.fillText(label, node.x, node.y);
        }}
        linkColor={isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={d => d.value * 0.001}
      />
    </div>
  );
};

const AnnualPlanDetail = ({ plan, onClose }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg max-w-3xl w-full max-h-90vh overflow-y-auto`}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{plan.name} ({plan.year})</h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{plan.description}</p>
          
          <h3 className="text-xl font-semibold mb-3">Key Objectives</h3>
          <ul className="list-disc list-inside mb-6">
            {plan.objectives.map((objective, index) => (
              <li key={index} className="mb-2">{objective}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-3">Projects</h3>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {plan.projects.map((project) => (
              <div key={project.id} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <h4 className="font-semibold mb-2">{project.name}</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white transition-colors`}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AnnualPlanTimeline = ({ plans, onPlanClick }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8 overflow-x-auto"
    >
      <div className="flex space-x-4 pb-4">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.year}
            className={`flex-shrink-0 w-64 ${isDarkMode ? 'bg-gray-700 shadow-lg' : 'bg-white shadow-md'} rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow`}
            whileHover={{ y: -5, boxShadow: isDarkMode ? "0 10px 20px rgba(255,255,255,0.1)" : "0 10px 20px rgba(0,0,0,0.1)" }}
            onClick={() => onPlanClick(plan)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-sm font-semibold text-purple-600 mb-1">{plan.year}</div>
            <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{plan.name}</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-2 line-clamp-2`}>{plan.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-purple-500 text-sm">{plan.projectCount} Projects</span>
              <ChevronRight className="text-purple-500" size={16} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectGallery = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEcosystem, setShowEcosystem] = useState(false);
  const [showKnowledgeGraph, setShowKnowledgeGraph] = useState(false);
  const [selectedAnnualPlan, setSelectedAnnualPlan] = useState(null);
  const [showAnnualPlans, setShowAnnualPlans] = useState(true);
  const { isDarkMode } = useTheme();

  const projects = [
    { id: 1, name: "AI Chatbot", description: "An intelligent chatbot using natural language processing techniques to provide human-like interactions.", tags: ["AI", "NLP", "Python"], year: 2023, annualPlan: "ZIYUN2024" },
    { id: 2, name: "E-commerce Platform", description: "A full-stack online shopping platform with user authentication, product catalog, and secure payment integration.", tags: ["Web", "React", "Node.js"], year: 2022, annualPlan: "WENXIN2022" },
    { id: 3, name: "Data Visualization Tool", description: "Interactive data visualizations using D3.js to represent complex datasets in an intuitive and engaging manner.", tags: ["D3.js", "Data Science"], year: 2024, annualPlan: "ZIYUN2024" },
    { id: 4, name: "Mobile Fitness App", description: "A cross-platform mobile application for tracking workouts, nutrition, and personal fitness goals.", tags: ["Mobile", "React Native", "Firebase"], year: 2021, annualPlan: "WANXIANG2021" },
    { id: 5, name: "Blockchain Voting System", description: "A decentralized voting system using blockchain technology to ensure transparency and security in elections.", tags: ["Blockchain", "Solidity", "Web3"], year: 2023, annualPlan: "YANGFAN2023" },
  ];

  const categories = ["All", "Research", "Web Apps", "Mobile Apps", "AI Projects", "Tools"];

  const annualPlans = [
    {
      year: 2024,
      name: "ZIYUN2024",
      description: "Focusing on AI and advanced web technologies",
      projectCount: 3,
      objectives: [
        "Master advanced AI techniques",
        "Develop a cutting-edge web application",
        "Contribute to open-source projects"
      ],
      projects: [
        { id: 1, name: "AI Chatbot", description: "An intelligent chatbot using NLP" },
        { id: 3, name: "Data Visualization Tool", description: "Interactive data visualizations using D3.js" },
      ]
    },
    {
      year: 2023,
      name: "YANGFAN2023",
      description: "Exploring blockchain and decentralized applications",
      projectCount: 2,
      objectives: [
        "Develop a blockchain-based application",
        "Research on smart contract security",
        "Participate in a blockchain hackathon"
      ],
      projects: [
        { id: 5, name: "Blockchain Voting System", description: "A decentralized voting system using blockchain technology" },
      ]
    },
  ];

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

  const graphData = {
    nodes: [
      { id: "AI", group: 1 },
      { id: "Web Development", group: 2 },
      { id: "Mobile App", group: 3 },
      { id: "Data Science", group: 4 },
      { id: "Blockchain", group: 5 },
    ],
    links: [
      { source: "AI", target: "Data Science", value: 1 },
      { source: "Web Development", target: "Mobile App", value: 2 },
      { source: "Data Science", target: "Web Development", value: 1 },
      { source: "Blockchain", target: "Web Development", value: 1 },
    ]
  };

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
            My Project Gallery
          </motion.h1>
          <div className="flex items-center space-x-4">
            <motion.button
              className={`${isDarkMode ? 'bg-purple-700 text-white' : 'bg-purple-600 text-white'} px-4 py-2 rounded-lg flex items-center`}
              onClick={() => setShowAnnualPlans(!showAnnualPlans)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAnnualPlans ? <X size={18} className="mr-2" /> : <Calendar size={18} className="mr-2" />}
              {showAnnualPlans ? "Hide Plans" : "Show Plans"}
            </motion.button>
            {/* <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-600'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button> */}
          </div>
        </div>
        <motion.p 
          className={`text-lg sm:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explore my journey through innovative projects
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
                placeholder="Search projects by name, tech stack, or year"
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
            {showKnowledgeGraph ? "Hide Knowledge Graph" : "Show Knowledge Graph"}
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
                  { icon: Briefcase, label: 'Resume' },
                  { icon: Mail, label: 'Contact' }
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
          {showKnowledgeGraph && (
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
          © 2024 My Project Gallery. All rights reserved.
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
  
      <QuickToolsBar />
    </div>
  );
};

export default ProjectGallery;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './i18n/index'; // Initialize i18n
import MainLayout from './layout/MainLayout';
import ResumeWebsite from './views/ResumeWebsite';
import RecentUpdates from './views/RecentUpdates';
import InteractiveContactPage from './views/InteractiveContactPage';
import ProjectGallery from './views/ProjectGallery';
import ProjectDetail from './views/ProjectDetail';
import IdeaPage from './views/IdeaPage';
import IdeaDetail from './components/IdeaPage/IdeaDetail';
import BlogStack from './views/BlogStack';
import BlogDetail from './components/BlogStack/BlogDetail';
import { ThemeProvider } from './components/ThemeContext';
import { LanguageProvider } from './components/LanguageContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<ResumeWebsite />} />
              <Route path="/recent-updates" element={<RecentUpdates />} />
              <Route path="/contact" element={<InteractiveContactPage />} />
              <Route path="/projects" element={<ProjectGallery />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/ideas" element={<IdeaPage />} />
              <Route path="/ideas/:id" element={<IdeaDetail />} />
              <Route path="/blog" element={<BlogStack />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
            </Routes>
          </MainLayout>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App; 
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import ResumeWebsite from './views/ResumeWebsite';
import InteractiveContactPage from './views/InteractiveContactPage';
import ProjectGallery from './views/ProjectGallery';
import IdeaCollection from './views/IdeaCollection';
import BlogStack from './views/BlogStack';
import { ThemeProvider } from './components/ThemeContent';
import { LanguageProvider } from './components/LanguageContent';


function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<ResumeWebsite />} />
            <Route path="/contact" element={<InteractiveContactPage />} />
            <Route path="/projects" element={<ProjectGallery />} />
            {/* <Route path="/ideas" element={<IdeaCollection />} /> */}
            <Route path="/blog" element={<BlogStack />} />
          </Routes>
        </MainLayout>
      </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
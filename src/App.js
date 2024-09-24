import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import ResumeWebsite from './views/ResumeWebsite';
import InteractiveContactPage from './views/InteractiveContactPage';
import ProjectGallery from './views/ProjectGallery';
import { ThemeProvider } from './components/ThemeContent';


function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<ResumeWebsite />} />
            <Route path="/contact" element={<InteractiveContactPage />} />
            <Route path="/projects" element={<ProjectGallery />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
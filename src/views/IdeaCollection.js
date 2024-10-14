import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from '../components/ThemeContent';

import IdeaCloud from '../components/IdeaCollection/IdeaCloud';
import ThoughtPool from '../components/IdeaCollection/ThoughtPool';
import KnowledgeGraph from '../components/IdeaCollection/KnowledgeGraph';
import IdeaDetail from '../components/IdeaCollection/IdeaDetail';

const IdeaCollection = () => {
  const [ideas, setIdeas] = useState([]);
  const [thoughts, setThoughts] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // 模拟从API获取数据
    const fetchData = async () => {
      // 这里应该是实际的API调用
      const mockIdeas = [
        { id: 'idea1', title: 'AI-powered Personal Assistant', description: 'An AI assistant that can understand and predict user needs.', relatedProjects: [], relatedBlogPosts: ['post1', 'post3'] },
        { id: 'idea2', title: 'Blockchain for Supply Chain', description: 'Using blockchain to improve transparency in supply chains.', relatedProjects: [], relatedBlogPosts: ['post2'] },
        // 添加更多模拟数据...
      ];

      const mockThoughts = [
        { id: 'thought1', title: 'Machine Learning in Healthcare', content: 'Exploring potential applications of ML in diagnostic processes.' },
        { id: 'thought2', title: 'Sustainable Energy Solutions', content: 'Brainstorming innovative approaches to renewable energy storage.' },
        // 添加更多模拟数据...
      ];

      setIdeas(mockIdeas);
      setThoughts(mockThoughts);
    };

    fetchData();
  }, []);

  const handleAddThought = () => {
    // 实现添加新想法的逻辑
    const newThought = {
      id: `thought${thoughts.length + 1}`,
      title: 'New Thought',
      content: 'Content of the new thought...'
    };
    setThoughts([...thoughts, newThought]);
  };

  const handleIdeaClick = (idea) => {
    setSelectedIdea(idea);
  };

  return (
    <div className={`min-h-screen p-4 sm:p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <h1 className="text-3xl font-bold mb-8">Idea Ecosystem</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Idea Cloud</h2>
        <IdeaCloud ideas={ideas} onIdeaClick={handleIdeaClick} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Thought Pool</h2>
        <ThoughtPool thoughts={thoughts} onAddThought={handleAddThought} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Knowledge Graph</h2>
        <KnowledgeGraph data={{ nodes: ideas, links: [] }} /> {/* 简化的数据模型 */}
      </section>

      <AnimatePresence>
        {selectedIdea && (
          <IdeaDetail
            idea={selectedIdea}
            relatedProjects={[]} // 这里应该传入实际的相关项目
            relatedBlogPosts={[]} // 这里应该传入实际的相关博客文章
            onClose={() => setSelectedIdea(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default IdeaCollection;
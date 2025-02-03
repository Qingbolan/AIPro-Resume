import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import BlogCalendar from '../components/BlogStack/BlogCalendar';
import Carousel from 'components/BlogStack/BlogCarousel';
import BlogPost from 'components/BlogStack/BlogPost';
import RecentComments from 'components/BlogStack/BlogRecentComments';
import RecentUpdate from 'components/BlogStack/BlogRecentUpdate';
import SidebarSection from 'components/BlogStack/BlogSidebarSection';

const CategorySlider = ({ categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const sliderRef = useRef(null);
  
  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="mb-8 relative">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="搜索分类..."
          className="w-full p-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div ref={sliderRef} className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
              <img src={category.image} alt={category.title} className="w-full h-24 object-cover" />
              <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-500">
                <h3 className="font-semibold text-sm text-white">{category.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};



const BlogStack = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const { t } = useTranslation();


  useEffect(() => {
    // Simulating API data fetch
    setCarouselItems([
      { image: "/api/placeholder/1200/400", title: "Easy-AI", description: "探索AI如何改变我们的生活" },
      { image: "/api/placeholder/1200/400", title: "Deep-AI", description: "建设更美好的未来" },
      { image: "/api/placeholder/1200/400", title: "super-creater", description: "下一代计算技术的突破" },
    ]);

    setCategories([
      { title: "技术创新", image: "/api/placeholder/300/200" },
      { title: "可持续发展", image: "/api/placeholder/300/200" },
      { title: "AI应用", image: "/api/placeholder/300/200" },
      { title: "未来展望", image: "/api/placeholder/300/200" },
      { title: "数字化转型", image: "/api/placeholder/300/200" },
      { title: "智慧城市", image: "/api/placeholder/300/200" },
      { title: "新能源", image: "/api/placeholder/300/200" },
      { title: "生物科技", image: "/api/placeholder/300/200" },
    ]);

    setPosts([
        { id: 1, title: "AI在教育中的应用探索", excerpt: "本文探讨了AI如何改变传统教育模式，包括个性化学习、智能辅导系统等创新应用...", date: "2025-03-15", category: "技术创新", views: 1200, comments: 18, likes: 45, image: "/api/placeholder/600/400" },
        { id: 2, title: "可持续城市发展：绿色科技的角色", excerpt: "随着城市化进程加快，如何平衡发展和环保成为关键问题。本文分析了绿色科技在构建可持续城市中的重要作用...", date: "2025-03-10", category: "可持续发展", views: 980, comments: 24, likes: 67 },
        { id: 3, title: "量子计算：未来科技的新前沿", excerpt: "量子计算正在开启计算能力的新纪元。本文简述了量子计算的基本原理，以及它可能给各个行业带来的革命性变化...", date: "2025-03-05", category: "前沿科技", views: 1500, comments: 30, likes: 89, image: "/api/placeholder/600/400" },
        { id: 4, title: "5G与物联网的融合发展", excerpt: "5G技术的普及为物联网的发展带来了新的机遇。本文讨论了5G如何推动智能家居、智慧城市等领域的创新...", date: "2025-02-28", category: "技术创新", views: 1100, comments: 22, likes: 56 },
        { id: 5, title: "人工智能伦理：技术发展的道德指南", excerpt: "随着AI技术的快速发展，相关的伦理问题日益凸显。本文探讨了AI伦理的重要性及其对未来社会的影响...", date: "2025-02-20", category: "AI应用", views: 1300, comments: 35, likes: 72, image: "/api/placeholder/600/400" },
        { id: 6, title: "太空探索的新篇章：火星殖民计划", excerpt: "人类对火星的探索迈入新阶段。本文介绍了最新的火星殖民计划，以及相关的技术挑战和潜在影响...", date: "2025-02-15", category: "未来展望", views: 1800, comments: 40, likes: 95 },
      ]);
  
      setProjects(['ZIYUN2024', 'YANGFAN2023', 'WENXIN2022', 'WANXIANG2021']);
  
      setEvents([
        { date: '2025-03-15', title: '技术创新论坛' },
        { date: '2025-03-20', title: 'AI应用工作坊' },
        { date: '2025-03-25', title: '可持续发展研讨会' },
      ]);
  
      setUpdates([
        { date: '2025-03-18', title: 'ZIYUN2025项目更新' },
        { date: '2025-03-22', title: '新文章发布' },
        { date: '2025-03-28', title: '网站功能升级' },
      ]);
  
      setTweets([
        { content: "我们的AI教育应用研究取得了突破性进展！#AI #教育创新", date: "2025-03-14", likes: 230 },
        { content: "即将发布关于量子计算的深度报告，敬请期待！#量子计算 #科技前沿", date: "2025-03-12", likes: 189 },
        { content: "可持续发展不仅是口号，更需要切实可行的解决方案。我们在行动！#可持续发展 #绿色科技", date: "2025-03-10", likes: 275 },
      ]);
  
      setComments([
        { content: "这篇文章对AI在教育中的应用分析得很透彻，期待看到更多相关内容！", author: "技术爱好者", date: "2025-03-16" },
        { content: "量子计算确实是未来的重要方向，但我们也要考虑其潜在的安全风险。", author: "未来学家", date: "2025-03-06" },
        { content: "可持续城市发展这个话题很有意思，希望能多看到一些具体的实施案例。", author: "城市规划师", date: "2025-03-11" },
      ]);

      setEvents([
        { date: '2024-10-18', title: '项目截止日期', type: 'ddl' },
        { date: '2024-10-20', title: '发布新文章', type: 'article' },
        { date: '2024-10-20', title: '新产品想法', type: 'idea' },
        { date: '2024-10-25', title: '团队会议', type: 'schedule' }
      ]);
    }, []);
  
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    return (
      <div className="container mx-auto">
        <header className="flex flex-col md:flex-row justify-between">
            <motion.h1 
            className={`text-4xl sm:text-4xl font-bold`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            >
                <span 
                    className={`inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-2 leading-tight`}
                >
                    {t('My BlogStack')}       
                </span>
            </motion.h1>
          {/* <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="搜索文章..."
              className="w-full p-3 pl-10 text-md border border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
          </div> */}
        </header>
        
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <Carousel items={carouselItems} />
            {/* <CategorySlider categories={categories} /> */}
            {currentPosts.map(post => (
              <BlogPost key={post.id} {...post} />
            ))}
            <div className="flex justify-center mt-6">
              {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
                <motion.button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {i + 1}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <BlogCalendar events={events} updates={updates} />
            <RecentUpdate tweets={tweets} />
            <RecentComments comments={comments} />
            <SidebarSection title="年度项目" items={projects} />
            {/* <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">关于ZIYUN 2025</h3>
              <p className="text-md text-gray-600 leading-relaxed">
                ZIYUN 2025是一个致力于探索未来科技和可持续发展的项目。通过整合知识库、Idea Cloud和Thought Pool，我们构建了一个动态的思想生态系统，反映创新思维过程和未来展望。
              </p>
            </div> */}
          </div>
        </div>
      </div>
    );
  };
  
  export default BlogStack;
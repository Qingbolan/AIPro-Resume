import React, { useState } from 'react';
import MessageBox from 'components/IdeaPage/MessageBox';
import IdeaHeader from 'components/IdeaPage/IdeaHeader';
import OpenTopic from 'components/IdeaPage/OpenTopic';
import UpcomingGoals from 'components/IdeaPage/UpcomingGoals';
import IdeaClassify from 'components/IdeaPage/IdeaClassify';
import IdeaItem from 'components/IdeaPage/IdeaItem';



const IdeaPage = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // const formatDate = (date) => {
  //   return date.getFullYear() + '-' +
  //     String(date.getMonth() + 1).padStart(2, '0') + '-' +
  //     String(date.getDate()).padStart(2, '0');
  // };

  // const getDateString = (daysFromToday) => {
  //   const date = new Date();
  //   date.setDate(date.getDate() + daysFromToday);
  //   return formatDate(date);
  // };

  // const [tasks, setTasks] = useState([
  //   { id: 1, title: '早间冥想', start: `${formatDate(today)} 06:00:00`, end: `${formatDate(today)} 06:30:00`, percentComplete: 100, resource: '个人' },
  //   { id: 2, title: '项目会议', start: `${formatDate(today)} 09:00:00`, end: `${formatDate(today)} 10:30:00`, percentComplete: 0, resource: '工作' },
  //   { id: 3, title: '创意头脑风暴', start: `${formatDate(today)} 14:00:00`, end: `${formatDate(today)} 15:30:00`, percentComplete: 0, resource: '创意' },
  //   { id: 4, title: '健身时间', start: `${formatDate(today)} 18:00:00`, end: `${formatDate(today)} 19:00:00`, percentComplete: 0, resource: '个人' },
  //   { id: 5, title: '阅读时间', start: `${formatDate(today)} 21:00:00`, end: `${formatDate(today)} 22:00:00`, percentComplete: 0, resource: '个人' },
  //   // 周二任务
  //   { id: 6, title: 'CS5223课程', start: `${getDateString(1)} 09:00:00`, end: `${getDateString(1)} 11:00:00`, percentComplete: 0, resource: '学习' },
  //   { id: 7, title: '实验室会议', start: `${getDateString(1)} 14:00:00`, end: `${getDateString(1)} 15:30:00`, percentComplete: 0, resource: '研究' },

  //   // 周三任务
  //   { id: 8, title: 'AI研究项目讨论', start: `${getDateString(2)} 10:00:00`, end: `${getDateString(2)} 12:00:00`, percentComplete: 0, resource: '研究' },
  //   { id: 9, title: '论文写作', start: `${getDateString(2)} 14:00:00`, end: `${getDateString(2)} 17:00:00`, percentComplete: 0, resource: '学习' },

  //   // 周四任务
  //   { id: 10, title: '机器学习课程', start: `${getDateString(3)} 09:00:00`, end: `${getDateString(3)} 11:00:00`, percentComplete: 0, resource: '学习' },
  //   { id: 11, title: '导师会面', start: `${getDateString(3)} 15:00:00`, end: `${getDateString(3)} 16:00:00`, percentComplete: 0, resource: '学习' },

  //   // 周五任务
  //   { id: 12, title: '项目进展汇报', start: `${getDateString(4)} 10:00:00`, end: `${getDateString(4)} 11:30:00`, percentComplete: 0, resource: '工作' },
  //   { id: 13, title: '论文阅读讨论会', start: `${getDateString(4)} 14:00:00`, end: `${getDateString(4)} 16:00:00`, percentComplete: 0, resource: '学习' },

  //   // 周末任务
  //   { id: 14, title: '开源项目贡献', start: `${getDateString(5)} 10:00:00`, end: `${getDateString(5)} 12:00:00`, percentComplete: 0, resource: '编程' },
  //   { id: 15, title: '下周计划制定', start: `${getDateString(6)} 15:00:00`, end: `${getDateString(6)} 16:30:00`, percentComplete: 0, resource: '个人' },
  // ]);

  const [messages, setMessages] = useState([
    { content: "这个创意很有意思，你有考虑过在教育领域的应用吗？", time: "14:30", isUser: false },
    { content: "确实，我正在探索AI在个性化学习中的潜力。", time: "14:35", isUser: true },
    { content: "那太棒了！期待看到你的更多想法。", time: "14:40", isUser: false },
  ]);

  const [archivedIdeas, setArchivedIdeas] = useState([
    { title: 'LLM+Dymatic Graph', date: '2024-9-27' },
    { title: 'demonstration selection', date: '2024-9-28' },
    { title: 'few-shot learning', date: '2024-9-28' },
  ]);

  const handleSendMessage = (newMessage) => {
    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, '0') + ':' +
      now.getMinutes().toString().padStart(2, '0');
    setMessages([...messages, { content: newMessage, time: timeString, isUser: true }]);
  };

  const [upcomingGoals, setUpcomingGoals] = useState([
    '找到适合自己的研究方向',
    '较好的完成本学期的所有课程',
    '学会更高效的时间管理',
    '研究一套更好的适合自巨的知识积累方法',
    '找到合适的AI实习机会',
    '发表一篇高水平的AI论文',
  ]);

  const [reflectionTopic, setReflectionTopic] = useState('在研究生阶段，如何平衡学习、研究和个人生活？');

  const [items, setItems] = useState([
    {
      id: 1,
      type: 'achievement',
      title: "Thrilled to share a major milestone in my NUS journey! 🎉",
      mainAchievement: "Successfully passed the 200-step stress test for CS5223 Assignment One!",
      description: "This distributed systems course, known as one of the most challenging at NUS, pushed me to new heights. Despite juggling multiple projects and facing an overload for two consecutive weeks, I not only survived but thrived!",
      keyAchievements: [
        "Mastered Golang in a short timeframe",
        "Learned a new RPC framework (kitex)",
        "Explored and implemented a new UI framework (fyne)",
        "Completed the assignment with flying colors"
      ],
      shoutout: "A special shoutout to my teammate Shuiyao! Your collaboration and support were instrumental in our success. Teamwork truly makes the dream work! 🤝",
      reflection: "The experience reminded me of preparing for the Gaokao (China's college entrance exam), intense but incredibly rewarding. It's amazing to see how much I've grown and what I can accomplish under pressure.",
      image: "/api/placeholder/600/300",
      timestamp: "2小时前",
      likes: 14,
      comments: [
        { user: "Professor Chen", content: "Impressive work! Your dedication shows." },
        { user: "Classmate Li", content: "Congrats on the achievement!" }
      ],
      isBookmarked: true,
      tags: ["CS5223", "分布式系统", "成就"],
      insights: [
        {
          content: "这次经历让我意识到，面对挑战时保持积极态度和团队合作的重要性。我学会了如何在压力下更有效地工作和学习。",
          date: "2025-03-16 10:30"
        }
      ]
    },
    {
      id: 2,
      type: 'paper',
      title: 'Quantum Supremacy Using a Programmable Superconducting Processor',
      authors: ['John Martinis', 'Sergio Boixo'],
      journal: 'Nature',
      year: 2025,
      abstract: 'This paper demonstrates quantum supremacy using a programmable superconducting processor. Google AI Quantum and collaborators at various institutions have performed a computation in 200 seconds that would take a state-of-the-art supercomputer 10,000 years.',
      date: '2025-03-18 09:15',
      likes: 28,
      comments: [
        { user: 'Professor Zhang', content: '这篇论文真是颠覆性的！' },
        { user: 'PhD Student Wang', content: '这为量子计算的未来开辟了新的可能性。' }
      ],
      isBookmarked: true,
      tags: ["量子计算", "量子优越性", "超导处理器"],
      insights: [
        {
          content: "这篇论文展示了量子计算的巨大潜力。我认为这可能会在密码学和药物发现领域带来重大突破。需要进一步研究如何将这种计算能力应用到实际问题中。",
          date: "2025-03-20 15:30"
        }
      ]
    },
    {
      id: 3,
      type: 'thought',
      title: '人工智能伦理的思考',
      content: '随着AI技术的快速发展，我们需要更加认真地考虑AI伦理问题。如何确保AI的发展不会对人类社会造成负面影响？我们需要在技术进步和伦理约束之间找到平衡点。',
      date: '2025-04-05 20:45',
      likes: 42,
      comments: [
        { user: '伦理学教授李', content: '这是一个非常重要的话题，我们确实需要更多的讨论和研究。' },
        { user: 'AI研究员张', content: '同意，我们在开发AI时也一直在考虑这些问题。' }
      ],
      isBookmarked: false,
      tags: ["AI伦理", "技术发展", "社会影响"],
      insights: [
        {
          content: "这个话题让我意识到，作为一个未来的AI研究者，我不仅需要关注技术本身，还要考虑技术对社会的广泛影响。我决定参加更多关于AI伦理的讨论和课程。",
          date: "2025-04-06 10:15"
        }
      ]
    },
    {
      id: 4,
      type: 'article',
      title: '深度学习在医疗诊断中的应用',
      summary: '这篇文章详细介绍了深度学习技术如何被应用于医疗诊断领域，特别是在图像识别方面的突破。文章讨论了几个成功的案例，包括利用CNN进行肺部X光片分析和使用RNN预测患者的健康趋势。',
      source: 'AI in Healthcare Journal',
      date: '2025-05-10 14:20',
      likes: 56,
      comments: [
        { user: '医学博士王', content: '这些技术确实在辅助诊断方面提供了很大帮助。' },
        { user: 'AI研究生李', content: '医疗AI是一个充满希望的应用领域，期待看到更多突破。' }
      ],
      isBookmarked: true,
      tags: ["深度学习", "医疗诊断", "CNN", "RNN"],
      insights: [
        {
          content: "这篇文章让我看到了AI在医疗领域的巨大潜力。我开始思考如何将我在NUS学到的机器学习知识应用到医疗问题上。这可能是一个有价值的研究方向。",
          date: "2025-05-11 09:30"
        }
      ]
    },
    {
      id: 5,
      type: 'link',
      title: 'GitHub - TensorFlow 2.0 教程',
      url: 'https://github.com/example/tensorflow-2.0-tutorial',
      description: '这是一个非常全面的TensorFlow 2.0教程，涵盖了从基础到高级的所有主题。包括理论解释和实践代码，非常适合深度学习初学者和进阶学习者。',
      date: '2025-06-01 11:00',
      likes: 89,
      comments: [
        { user: '机器学习爱好者陈', content: '太棒了！这个教程对我帮助很大。' },
        { user: 'NUS学生张', content: '正在学习TensorFlow，这个资源来得正是时候！' }
      ],
      isBookmarked: true,
      tags: ["TensorFlow", "深度学习", "教程", "GitHub"],
      insights: [
        {
          content: "这个教程资源非常全面，我计划利用暑假时间深入学习TensorFlow 2.0。这将有助于我在未来的课程项目和研究中更好地应用深度学习技术。",
          date: "2025-06-02 15:45"
        }
      ]
    }
  ]);

  const handleLike = (id) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const handleAddComment = (id, content) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, comments: [...item.comments, { user: '我', content }] }
          : item
      )
    );
  };

  const handleAddPersonalComment = (id, content) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, personalComment: content } : item
      )
    );
  };

  const handleAddTag = (id, tag) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, tags: [...(item.tags || []), tag] }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen">
      <IdeaHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* <ScheduleSection tasks={tasks} /> */}
          {items.map(item => (
            <IdeaItem
              key={item.id}
              item={item}
              onLike={handleLike}
              onAddComment={handleAddComment}
              onAddPersonalComment={handleAddPersonalComment}
              onAddTag={handleAddTag}
            />
          ))}
        </div>

        <div className="lg:col-span-1 space-y-8">
          <MessageBox messages={messages} onSendMessage={handleSendMessage} />
          <IdeaClassify archivedIdeas={archivedIdeas} />
          <UpcomingGoals goals={upcomingGoals} />
          <OpenTopic topic={reflectionTopic} />
        </div>
      </div>
    </div>
  );
};


export default IdeaPage;
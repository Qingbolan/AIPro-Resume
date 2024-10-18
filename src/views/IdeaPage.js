import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, ChevronRight, Send, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart } from "react-google-charts";

const GanttChart = ({ tasks, view }) => {
  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  const now = new Date();

  const getViewDates = (tasks, view) => {
    let startDate, endDate;

    // Helper function to set time to 6:00 AM
    const setTo6AM = (date) => {
      date.setHours(6, 0, 0, 0);
      return date;
    };

    if (tasks.length > 0) {
      startDate = new Date(Math.min(...tasks.map(task => new Date(task.start))));
      endDate = new Date(Math.max(...tasks.map(task => new Date(task.end))));

      if (view === 'day') {
        startDate = setTo6AM(new Date(startDate));
        endDate = setTo6AM(new Date(endDate));
        if (startDate.getTime() === endDate.getTime()) {
          endDate.setDate(endDate.getDate() + 1);
        }
      } else if (view === 'week') {
        startDate = setTo6AM(new Date(startDate));
        startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7)); // Adjust to previous Monday
        endDate = setTo6AM(new Date(endDate));
        endDate.setDate(endDate.getDate() + (7 - endDate.getDay()) % 7 + 1); // Adjust to next Monday
      }
    } else {
      // If no tasks, default to current day or week
      startDate = setTo6AM(new Date(now));
      if (view === 'week') {
        startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7)); // Adjust to Monday
      }
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + (view === 'week' ? 7 : 1));
    }

    return { startDate, endDate };
  };

  const { startDate: viewStartDate, endDate: viewEndDate } = getViewDates(tasks, view);

  let data, options;

  if (view === 'week') {
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const rows = weekDays.map((day, index) => {
      const dayStart = new Date(viewStartDate);
      dayStart.setDate(dayStart.getDate() + index);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);

      return [
        day,
        day,
        null,
        dayStart,
        dayEnd,
        null,
        0,
        null
      ];
    });

    tasks.forEach(task => {
      const taskStart = new Date(task.start);
      const taskEnd = new Date(task.end);
      const dayIndex = (taskStart.getDay() + 6) % 7; // Adjust so Monday is 0

      if (taskStart >= viewStartDate && taskStart < viewEndDate) {
        rows[dayIndex].push({
          task_id: task.id,
          task_name: task.title,
          resource: task.resource,
          start_date: taskStart,
          end_date: taskEnd,
          duration: null,
          percent_complete: task.percentComplete || 0,
          dependencies: null
        });
      }
    });

    data = [columns, ...rows];
    options = {
      height: '100%',
      width: '100%',
      timeline: {
        showRowLabels: true,
        groupByRowLabel: false
      },
      hAxis: {
        format: 'HH:mm',
        minValue: viewStartDate,
        maxValue: viewEndDate
      }
    };
  } else {
    // Day view
    const rows = tasks
      .filter(task => {
        const taskStart = new Date(task.start);
        const taskEnd = new Date(task.end);
        return taskStart < viewEndDate && taskEnd > viewStartDate;
      })
      .map((task) => {
        const startDate = new Date(task.start);
        const endDate = new Date(task.end);
        if (isNaN(startDate.valueOf()) || isNaN(endDate.valueOf())) {
          console.error(`Invalid date for task: ${task.title}`);
          return null;
        }
        return [
          task.id.toString(),
          task.title,
          task.resource || "",
          startDate,
          endDate,
          null,
          task.percentComplete || 0,
          null,
        ];
      })
      .filter(row => row !== null);

    // Add dummy tasks to ensure full 24-hour view
    rows.push([
      "start_dummy",
      "",
      null,
      viewStartDate,
      new Date(viewStartDate.getTime() + 1000), // 1 second after start
      null,
      100,
      null
    ]);
    rows.push([
      "end_dummy",
      "",
      null,
      new Date(viewEndDate.getTime() - 1000), // 1 second before end
      viewEndDate,
      null,
      100,
      null
    ]);

    data = [columns, ...rows];
    options = {
      height: '100%',
      width: '100%',
      gantt: {
        trackHeight: 30,
        barHeight: 20,
        criticalPathEnabled: false,
        innerGridHorizLine: { stroke: '#e0e0e0', strokeWidth: 1 },
        innerGridTrack: { fill: '#f5f5f5' },
        innerGridDarkTrack: { fill: '#e9e9e9' }
      },
      hAxis: {
        format: 'HH:mm',
        gridlines: { count: 24, units: { hours: { format: ['HH:mm'] } } },
        textStyle: { fontSize: 10 },
        minValue: viewStartDate,
        maxValue: viewEndDate
      },
      vAxis: { textStyle: { fontSize: 10 } },
      backgroundColor: 'transparent',
      chartArea: {
        left: '10%',
        right: '5%',
        top: '5%',
        width: '100%',
        height: '90%'
      },
    };
  }

  function calculateTimelinePosition() {
    const viewDuration = viewEndDate.getTime() - viewStartDate.getTime();
    const nowTime = now.getTime();
    
    // Adjust current time to fit within the 6AM to 6AM timeframe
    let adjustedNow = new Date(nowTime);
    if (adjustedNow.getHours() < 6) {
      adjustedNow.setDate(adjustedNow.getDate() + 1);
    }
    adjustedNow.setHours(adjustedNow.getHours(), adjustedNow.getMinutes(), 0, 0);
    
    const elapsedDuration = adjustedNow.getTime() - viewStartDate.getTime();
    const position = (elapsedDuration / viewDuration) * 100;
    return Math.max(0, Math.min(100, position));
  }

  const timelinePosition = calculateTimelinePosition();

  return (
    <div className="w-full h-0 pb-[40%] relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <Chart
          chartType={view === 'week' ? 'Timeline' : 'Gantt'}
          width="100%"
          height="100%"
          data={data}
          options={options}
        />
        <div
          className="absolute top-0 bottom-0 w-px bg-red-500"
          style={{
            left: `${timelinePosition}%`,
            pointerEvents: 'none'
          }}
        />
      </div>
    </div>
  );
};

const ScheduleSection = ({ tasks }) => {
  const [view, setView] = useState('day');
  const [displayTasks, setDisplayTasks] = useState([]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (view === 'day') {
      const todayTasks = tasks.filter(task => {
        const taskDate = new Date(task.start);
        return taskDate && taskDate.toDateString() === today.toDateString();
      });
      setDisplayTasks(todayTasks);
    } else {
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const weekTasks = tasks.filter(task => {
        const taskDate = new Date(task.start);
        return taskDate && taskDate >= oneWeekAgo && taskDate <= today;
      });
      setDisplayTasks(weekTasks);
    }
  }, [view, tasks]);

  return (
    <section className="mb-8 bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-purple-800">时间安排</h3>
        <div className="relative inline-block text-left">
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="block appearance-none w-full bg-white border border-purple-300 hover:border-purple-500 px-3 py-1 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline text-sm"
          >
            <option value="day">今日计划</option>
            <option value="week">本周安排</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-purple-700">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {displayTasks.length > 0 ? (
            <GanttChart tasks={displayTasks} view={view} />
          ) : (
            <p className="text-center text-gray-500 py-4">
              {view === 'day' ? '今天没有公示的计划' : '本周没有公示的计划'}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

const MessageBox = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-purple-800">匿名留言箱</h3>
      <div className="mb-4 h-60 overflow-y-auto bg-gray-50 rounded-lg p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 rounded-lg ${msg.isUser ? 'bg-purple-100 ml-auto' : 'bg-white'} max-w-[80%] ${msg.isUser ? 'text-right' : 'text-left'}`}>
            <p className="text-sm text-gray-800">{msg.content}</p>
            <span className="text-xs text-gray-500">{msg.time}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border border-purple-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
          placeholder="输入你的想法..."
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition duration-300 flex items-center"
        >
          <Send size={18} className="mr-2" />
          发送
        </button>
      </div>
    </div>
  );
};

const IdeaPage = () => {
  const [ideas, setIdeas] = useState([
    { id: 1, date: '2025-03-15', title: '人工智能在教育中的应用', content: '探索如何将AI技术融入课堂，提高学习效率...', image: '/api/placeholder/600/300', likes: 45, comments: 12 },
    { id: 2, date: '2025-03-10', title: '可持续城市发展', content: '研究绿色科技在现代城市规划中的角色...', likes: 38, comments: 8 },
  ]);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date) => {
    return date.getFullYear() + '-' +
           String(date.getMonth() + 1).padStart(2, '0') + '-' +
           String(date.getDate()).padStart(2, '0');
  };

  const [tasks, setTasks] = useState([
    { id: 1, title: '早间冥想', start: `${formatDate(today)} 06:00:00`, end: `${formatDate(today)} 06:30:00`, percentComplete: 100, resource: '个人' },
    { id: 2, title: '项目会议', start: `${formatDate(today)} 09:00:00`, end: `${formatDate(today)} 10:30:00`, percentComplete: 0, resource: '工作' },
    { id: 3, title: '创意头脑风暴', start: `${formatDate(today)} 14:00:00`, end: `${formatDate(today)} 15:30:00`, percentComplete: 0, resource: '创意' },
    { id: 4, title: '健身时间', start: `${formatDate(today)} 18:00:00`, end: `${formatDate(today)} 19:00:00`, percentComplete: 0, resource: '个人' },
    { id: 5, title: '阅读时间', start: `${formatDate(today)} 21:00:00`, end: `${formatDate(today)} 22:00:00`, percentComplete: 0, resource: '个人' },
    { id: 7, title: '准备技术分享演讲', start: formatDate(tomorrow), end: formatDate(new Date(tomorrow.getTime() + 86400000)), percentComplete: 30, resource: '演讲' },
  ]);

  const [messages, setMessages] = useState([
    { content: "这个创意很有意思，你有考虑过在教育领域的应用吗？", time: "14:30", isUser: false },
    { content: "确实，我正在探索AI在个性化学习中的潜力。", time: "14:35", isUser: true },
    { content: "那太棒了！期待看到你的更多想法。", time: "14:40", isUser: false },
  ]);

  const [archivedIdeas, setArchivedIdeas] = useState([
    '量子计算在密码学中的应用',
    '太空旅行的未来展望',
    '生物科技与伦理问题探讨',
  ]);

  const [upcomingProjects, setUpcomingProjects] = useState([
    'ZIYUN2025',
    'XINZHI2026',
    'WEILAI2027',
  ]);

  const [openTopic, setOpenTopic] = useState('未来十年最具颠覆性的技术是什么？');

  const handleSendMessage = (newMessage) => {
    const now = new Date();
    const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                       now.getMinutes().toString().padStart(2, '0');
    setMessages([...messages, { content: newMessage, time: timeString, isUser: true }]);
  };

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <motion.h1 
          className="text-4xl font-bold mb-4 text-purple-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          创想空间
        </motion.h1>
        <div className="relative">
          <img src="/api/placeholder/1200/300" alt="Idea Cover" className="w-full h-64 object-cover rounded-xl shadow-lg" />
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-purple-800">探索、创新、分享</h2>
            <p className="text-purple-600">让每一个想法绽放光芒</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ScheduleSection tasks={tasks} />

          <section>
            <h3 className="text-2xl font-semibold mb-4 text-purple-800">创意时间线</h3>
            {ideas.map(idea => (
              <motion.div 
                key={idea.id}
                className="mb-8 bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-purple-600">{idea.date}</span>
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center text-gray-600"><ThumbsUp size={16} className="mr-1" />{idea.likes}</span>
                      <span className="flex items-center text-gray-600"><MessageSquare size={16} className="mr-1" />{idea.comments}</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-purple-800">{idea.title}</h4>
                  <p className="text-gray-700 mb-4">{idea.content}</p>
                  {idea.image && (
                    <img src={idea.image} alt={idea.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  )}
                  <button className="text-purple-600 hover:text-purple-800 transition duration-300 font-semibold">阅读更多</button>
                </div>
              </motion.div>
            ))}
          </section>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <MessageBox messages={messages} onSendMessage={handleSendMessage} />

          <section className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-800">归档想法</h3>
            <ul className="space-y-2">
              {archivedIdeas.map((idea, index) => (
                <li key={index} className="flex items-center text-gray-700 hover:text-purple-600 transition duration-300">
                  <ChevronRight size={16} className="mr-2 text-purple-500" />
                  {idea}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-800">即将开展的项目</h3>
            <ul className="space-y-2">
              {upcomingProjects.map((project, index) => (
                <li key={index} className="flex items-center text-gray-700 hover:text-purple-600 transition duration-300">
                  <ChevronRight size={16} className="mr-2 text-purple-500" />
                  {project}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-purple-800">开放话题</h3>
            <p className="text-gray-700 mb-4">{openTopic}</p>
            <button className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition duration-300 font-semibold">参与讨论</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default IdeaPage;
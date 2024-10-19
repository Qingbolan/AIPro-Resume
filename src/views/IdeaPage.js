import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, ChevronRight, Send, ChevronDown, Bookmark,Link, ChevronUp, Edit} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart } from "react-google-charts";
import { t } from 'i18next';

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
      
      // 检查任务是否在当前周视图范围内
      if (taskStart < viewEndDate && taskEnd > viewStartDate) {
        const dayIndex = (taskStart.getDay() + 6) % 7; // Adjust so Monday is 0
        
        rows[dayIndex].push(
          task.id.toString(),
          task.title,
          task.resource || "",
          taskStart,
          taskEnd,
          null,
          task.percentComplete || 0,
          null
        );
      }
    });

    data = [columns, ...rows];
    options = {
      height: '100%',
      width: '100%',
      timeline: {
        showRowLabels: true,
        groupByRowLabel: true
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

    const parseDateTime = (dateTimeString) => {
      const [datePart, timePart] = dateTimeString.split(' ');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hours, minutes, seconds] = timePart.split(':').map(Number);
      return new Date(year, month - 1, day, hours, minutes, seconds);
    };

    if (view === 'day') {
      const todayTasks = tasks.filter(task => {
        const taskDate = parseDateTime(task.start);
        return taskDate.toDateString() === today.toDateString();
      });
      setDisplayTasks(todayTasks);
    } else {
      // 获取本周一的日期
      const monday = new Date(today)-2;
      monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
      monday.setHours(0, 0, 0, 0);
      
      // 获取下周一的日期
      const nextMonday = new Date(monday);
      nextMonday.setDate(nextMonday.getDate() + 7);

      console.log('Week range:', monday, 'to', nextMonday);

      const weekTasks = tasks.filter(task => {
        const taskStart = parseDateTime(task.start);
        const taskEnd = parseDateTime(task.end);
        
        // 调试信息
        console.log('Task:', task.title, 'Start:', taskStart, 'End:', taskEnd);
        
        // 任务在本周内开始或结束，或者跨越整个周期
        const isInWeek = (taskStart >= monday && taskStart < nextMonday) ||
                         (taskEnd > monday && taskEnd <= nextMonday) ||
                         (taskStart <= monday && taskEnd >= nextMonday);
        
        console.log('Is in week:', isInWeek);
        
        return isInWeek;
      });

      console.log('Filtered week tasks:', weekTasks);
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

const Header = () => (
  <header className="mb-8">
    <motion.h1 
      className="text-4xl font-bold"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className={`inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-2 leading-tight`}>
      创想空间
      </span>
    </motion.h1>
    <div className="relative">
      <img src="/api/placeholder/1200/300" alt="Idea Cover" className="w-full h-64 object-cover rounded-xl shadow-lg" />
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-purple-800">探索、创新、分享</h2>
        <p className="text-purple-600">让每一个想法绽放光芒</p>
      </div>
    </div>
  </header>
);
const IdeaItem = ({ item, onLike, onAddComment}) => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const getTagColor = (tag) => {
    const colors = {
      achievement: 'bg-green-100 text-green-800',
      thought: 'bg-blue-100 text-blue-800',
      paper: 'bg-purple-100 text-purple-800',
      article: 'bg-yellow-100 text-yellow-800',
      link: 'bg-red-100 text-red-800',
    };
    return colors[tag] || 'bg-gray-100 text-gray-800';
  };

  const renderMediaContent = () => {
    if (item.video) {
      return (
        <div className="mb-4">
          <video src={item.video} controls className="w-full rounded-lg shadow-md" />
        </div>
      );
    } else if (item.image) {
      return (
        <div className="mb-4">
          <img src={item.image} alt={item.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
      );
    } else if (item.images && item.images.length > 0) {
      const displayImages = showAllImages ? item.images : item.images.slice(0, 9);
      const remainingImages = item.images.length - 9;

      return (
        <div className="mb-4">
          <div className={`grid gap-2 ${item.images.length === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}>
            {displayImages.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index + 1}`} className="w-full h-32 object-cover rounded-lg shadow-md" />
            ))}
          </div>
          {!showAllImages && remainingImages > 0 && (
            <button
              onClick={() => setShowAllImages(true)}
              className="mt-2 text-purple-600 hover:text-purple-800 font-semibold"
            >
              查看全部 {item.images.length} 张图片
            </button>
          )}
        </div>
      );
    }
    return null;
  };

  const renderContent = () => {
    if (item.type === 'achievement') {
      return (
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <h3 className="font-bold text-lg mb-2 text-green-800">{item.mainAchievement}</h3>
          <p className="text-gray-700 mb-2">{item.content || item.description}</p>
          {item.keyAchievements && (
            <div className="mb-2">
              <h4 className="font-semibold text-green-700 mb-1">主要成就：</h4>
              <ul className="list-disc list-inside text-gray-700">
                {item.keyAchievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}
          {item.reflection && (
            <div className="text-gray-700 italic mb-2">
              <h4 className="font-semibold text-green-700 mb-1">反思：</h4>
              "{item.reflection}"
            </div>
          )}
          {item.shoutout && (
            <div className="text-gray-700 mb-2">
              <h4 className="font-semibold text-green-700 mb-1">特别感谢：</h4>
              {item.shoutout}
            </div>
          )}
        </div>
      );
    } else if (item.type === 'article') {
      return (
        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
          <h3 className="font-bold text-lg mb-2 text-yellow-800">{item.title}</h3>
          <p className="text-gray-700">{item.summary}</p>
          <button className="mt-2 text-yellow-600 hover:text-yellow-800 font-semibold">阅读全文</button>
        </div>
      );
    } else if (item.type === 'link') {
      return (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="block bg-red-50 p-4 rounded-lg mb-4">
          <div className="flex items-center">
            <Link size={20} className="mr-2 text-red-600" />
            <span className="text-red-600 hover:underline">{item.title}</span>
          </div>
          <p className="text-gray-700 mt-2">{item.description}</p>
        </a>
      );
    } else if (item.type === 'paper') {
      return (
        <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <h3 className="font-bold text-lg mb-2 text-purple-800">{item.title}</h3>
          <p className="text-gray-700 italic mb-2">{item.authors.join(', ')}</p>
          <p className="text-gray-600 mb-2">{item.journal}, {item.year}</p>
          <p className="text-gray-700">{item.abstract}</p>
          <button className="mt-2 text-purple-600 hover:text-purple-800 font-semibold">阅读论文</button>
        </div>
      );
    } else {
      return <p className="text-gray-700 mb-4">{item.content}</p>;
    }
  };

  const renderInsights = () => {
    if (!item.insights || item.insights.length === 0) return null;
    return (
      // <div className="mt-4 bg-orange-50 p-4 rounded-lg">
      <div>
        {item.insights.map((insight, index) => (
          <div key={index} className="mb-2">
            <p className="text-gray-700">{insight.content}</p>
            <span className="text-sm text-gray-500">{insight.date}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div 
      className="mb-8 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl text-purple-800">{item.title}</h3>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTagColor(item.type)}`}>
              {item.type}
            </span>
            {item.isBookmarked && (
              <Bookmark size={20} className="text-yellow-500" />
            )}
          </div>
        </div>
        <span className="text-sm text-gray-500 mb-4 block">{item.date || item.timestamp}</span>
        {renderContent()}
        {renderMediaContent()}
        {renderInsights()}
        <div className="flex flex-wrap gap-2 mt-4">
          {item.tags && item.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center text-gray-600 mt-4">
          <button onClick={() => onLike(item.id)} className="flex items-center hover:text-purple-600 transition duration-300">
            <ThumbsUp size={16} className="mr-1" />
            <span>{item.likes}</span>
          </button>
          <button 
            onClick={() => setShowComments(!showComments)} 
            className="flex items-center hover:text-purple-600 transition duration-300"
          >
            <MessageSquare size={16} className="mr-1" />
            <span>{item.comments.length}</span>
            {showComments ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
          </button>
        </div>
        {showComments && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            {item.comments.map((comment, index) => (
              <div key={index} className="mb-2 text-sm">
                <span className="font-semibold text-purple-700">{comment.user}: </span>
                <span className="text-gray-700">{comment.content}</span>
              </div>
            ))}
            <input
              type="text"
              placeholder="添加评论..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 mt-2"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  onAddComment(item.id, e.target.value.trim());
                  e.target.value = '';
                }
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

const UpcomingGoals = ({ goals }) => (
  <section className="bg-white rounded-xl shadow-md p-6">
    <h3 className="text-xl font-semibold mb-4 text-blue-800">未来目标</h3>
    <ul className="space-y-2">
      {goals.map((goal, index) => (
        <li key={index} className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300">
          <ChevronRight size={16} className="mr-2 text-blue-500" />
          {goal}
        </li>
      ))}
    </ul>
  </section>
);

const IdeaClassify = ({ archivedIdeas: IdeasClass }) => (
  <section className="bg-white rounded-xl shadow-md p-6 mb-8">
    <h3 className="text-xl font-semibold mb-4 text-purple-800">想法归档</h3>
    <ul className="space-y-2">
      {IdeasClass.map((idea, index) => (
        <li key={index} className="flex items-center text-gray-700 hover:text-purple-600 transition duration-300">
          <Bookmark size={16} className="mr-2 text-purple-500" />
          <span>{idea.title}</span>
          <span className="ml-auto text-sm text-gray-500">{idea.date}</span>
        </li>
      ))}
    </ul>
    <button className="mt-4 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition duration-300 font-semibold">
      查看更多
    </button>
  </section>
);

const OpenTopic = ({ topic }) => (
  <section className="bg-white rounded-xl shadow-md p-6">
    <h3 className="text-xl font-semibold mb-4 text-blue-800">开放话题</h3>
    <p className="text-gray-700 mb-4">{topic}</p>
    <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition duration-300 font-semibold">参与讨论</button>
  </section>
);

const IdeaPage = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date) => {
    return date.getFullYear() + '-' +
           String(date.getMonth() + 1).padStart(2, '0') + '-' +
           String(date.getDate()).padStart(2, '0');
  };
  
  const getDateString = (daysFromToday) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);
    return formatDate(date);
  };

  const [tasks, setTasks] = useState([
    { id: 1, title: '早间冥想', start: `${formatDate(today)} 06:00:00`, end: `${formatDate(today)} 06:30:00`, percentComplete: 100, resource: '个人' },
    { id: 2, title: '项目会议', start: `${formatDate(today)} 09:00:00`, end: `${formatDate(today)} 10:30:00`, percentComplete: 0, resource: '工作' },
    { id: 3, title: '创意头脑风暴', start: `${formatDate(today)} 14:00:00`, end: `${formatDate(today)} 15:30:00`, percentComplete: 0, resource: '创意' },
    { id: 4, title: '健身时间', start: `${formatDate(today)} 18:00:00`, end: `${formatDate(today)} 19:00:00`, percentComplete: 0, resource: '个人' },
    { id: 5, title: '阅读时间', start: `${formatDate(today)} 21:00:00`, end: `${formatDate(today)} 22:00:00`, percentComplete: 0, resource: '个人' },
  // 周二任务
  { id: 6, title: 'CS5223课程', start: `${getDateString(1)} 09:00:00`, end: `${getDateString(1)} 11:00:00`, percentComplete: 0, resource: '学习' },
  { id: 7, title: '实验室会议', start: `${getDateString(1)} 14:00:00`, end: `${getDateString(1)} 15:30:00`, percentComplete: 0, resource: '研究' },
  
  // 周三任务
  { id: 8, title: 'AI研究项目讨论', start: `${getDateString(2)} 10:00:00`, end: `${getDateString(2)} 12:00:00`, percentComplete: 0, resource: '研究' },
  { id: 9, title: '论文写作', start: `${getDateString(2)} 14:00:00`, end: `${getDateString(2)} 17:00:00`, percentComplete: 0, resource: '学习' },
  
  // 周四任务
  { id: 10, title: '机器学习课程', start: `${getDateString(3)} 09:00:00`, end: `${getDateString(3)} 11:00:00`, percentComplete: 0, resource: '学习' },
  { id: 11, title: '导师会面', start: `${getDateString(3)} 15:00:00`, end: `${getDateString(3)} 16:00:00`, percentComplete: 0, resource: '学习' },
  
  // 周五任务
  { id: 12, title: '项目进展汇报', start: `${getDateString(4)} 10:00:00`, end: `${getDateString(4)} 11:30:00`, percentComplete: 0, resource: '工作' },
  { id: 13, title: '论文阅读讨论会', start: `${getDateString(4)} 14:00:00`, end: `${getDateString(4)} 16:00:00`, percentComplete: 0, resource: '学习' },
  
  // 周末任务
  { id: 14, title: '开源项目贡献', start: `${getDateString(5)} 10:00:00`, end: `${getDateString(5)} 12:00:00`, percentComplete: 0, resource: '编程' },
  { id: 15, title: '下周计划制定', start: `${getDateString(6)} 15:00:00`, end: `${getDateString(6)} 16:30:00`, percentComplete: 0, resource: '个人' },
]);

  const [messages, setMessages] = useState([
    { content: "这个创意很有意思，你有考虑过在教育领域的应用吗？", time: "14:30", isUser: false },
    { content: "确实，我正在探索AI在个性化学习中的潜力。", time: "14:35", isUser: true },
    { content: "那太棒了！期待看到你的更多想法。", time: "14:40", isUser: false },
  ]);

  const [archivedIdeas, setArchivedIdeas] = useState([
    {title: 'LLM+Dymatic Graph', date: '2024-9-27'},
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
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ScheduleSection tasks={tasks} />
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
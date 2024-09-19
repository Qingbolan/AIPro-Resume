// src/api/getRecentMessages.js
// import axios from 'axios';

export const getRecentMessagesAPI = () => {
    // 注释掉实际的API请求，返回模拟的消息列表
    // return axios.get('/api/recent-messages');
  
    // 模拟API调用，返回示例数据
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { type: 'general', text: 'Great work on your latest project!', author: 'John Doe', role: 'UX Designer' },
          { type: 'job', company: 'TechCorp', position: 'Senior AI Developer', text: 'We have an exciting opportunity for an AI expert.', author: 'Jane Smith', role: 'HR Manager' },
          { type: 'general', text: 'Would love to collaborate on a research paper.', author: 'Dr. Emily Brown', role: 'Research Scientist' },
          { type: 'job', company: 'InnovateLab', position: 'ML Engineer', text: 'Join our cutting-edge machine learning team!', author: 'Mike Johnson', role: 'Tech Lead' },
        ]);
      }, 1000);
    });
  };
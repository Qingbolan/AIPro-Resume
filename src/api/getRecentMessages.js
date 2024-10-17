import axios from 'axios';

const API_BASE_URL = 'https://silan.tech/api';

export const getRecentMessagesAPI = async (language = 'en') => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getRecentMessages`, {
      params: { language }
    });

    console.log('API Response:', response.data.messages); // 用于调试的日志

    // 假设后端返回的数据结构与前端期望的结构相匹配
    return response.data.messages;
  } catch (error) {
    console.error('Error fetching recent messages:', error);
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('No response received:', error.request);
    } else {
      // 在设置请求时触发了错误
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};
// // src/api/getRecentMessages.js

// export const getRecentMessagesAPI = (language = 'en') => {
//   // 根据语言返回不同的消息列表
//   const messages = {
//     en: [
//       { type: 'general', text: 'Great work on your latest project!', author: 'John Doe', role: 'UX Designer' },
//       { type: 'job', company: 'TechCorp', position: 'Senior AI Developer', text: 'We have an exciting opportunity for an AI expert.', author: 'Jane Smith', role: 'HR Manager' },
//       { type: 'general', text: 'Would love to collaborate on a research paper.', author: 'Dr. Emily Brown', role: 'Research Scientist' },
//       { type: 'job', company: 'InnovateLab', position: 'ML Engineer', text: 'Join our cutting-edge machine learning team!', author: 'Mike Johnson', role: 'Tech Lead' },
//     ],
//     zh: [
//       { type: 'general', text: '在您最新的项目上做得很好！', author: 'John Doe', role: 'UX设计师' },
//       { type: 'job', company: 'TechCorp', position: '高级AI开发人员', text: '我们有一个令人兴奋的AI专家机会。', author: 'Jane Smith', role: '人力资源经理' },
//       { type: 'general', text: '很想在研究论文上合作。', author: 'Dr. Emily Brown', role: '研究科学家' },
//       { type: 'job', company: 'InnovateLab', position: '机器学习工程师', text: '加入我们前沿的机器学习团队！', author: 'Mike Johnson', role: '技术主管' },
//     ]
//   };

//   // 模拟API调用，返回示例数据
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(messages[language]);
//     }, 1000);
//   });
// };
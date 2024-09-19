// src/api/getAIResponse.js
// import axios from 'axios';

export const getAIResponse = async (message) => {
    // 注释掉实际的API请求，返回模拟的AI响应
    // return axios.post('/api/get-ai-response', { message });
  
    // 模拟AI响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`谢谢您的消息：“${message}”。我还能为您做些什么？`);
      }, 1000);
    });
  };
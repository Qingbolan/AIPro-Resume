// src/api/getAIResponse.js
// import axios from 'axios';
// import i18n from '../i18n';

export const getAIResponse = async (message, language = 'en') => {
  // 根据语言返回不同的AI响应
  const responses = {
    en: `Thank you for your message: "${message}". How else can I assist you?`,
    zh: `谢谢您的消息：“${message}”。我还能为您做些什么？`
  };

  // 模拟AI响应
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(responses[language]);
    }, 1000);
  });
};
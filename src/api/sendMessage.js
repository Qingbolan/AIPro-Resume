// src/api/sendMessage.js
// import axios from 'axios';
import i18n from '../i18n';

export const sendMessageAPI = (formData, formType, sendResume, language = 'en') => {
  // 根据语言返回不同的消息
  const successMessage = language === 'zh' ? '消息发送成功！' : 'Message sent successfully!';

  // 模拟API调用，返回示例响应
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: successMessage });
    }, 1000);
  });
};

export const verifyEmailAPI = async (email, language = 'en') => {
  // 根据语言返回不同的消息
  const successMessage = language === 'zh' ? '邮箱验证成功！' : 'Email verified successfully!';

  // 模拟API调用，返回示例响应
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: successMessage });
    }, 1000);
  });
};
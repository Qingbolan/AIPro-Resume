// src/api/sendMessage.js
// import axios from 'axios';

export const sendMessageAPI = (formData, formType, sendResume) => {
    // 这里注释掉实际的API请求，返回模拟的成功响应
    // return axios.post('/api/send-message', {
    //   formData,
    //   formType,
    //   sendResume,
    // });
  
    // 模拟API调用，返回示例响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Message sent successfully!' });
      }, 1000);
    });
  };
  
  export const verifyEmailAPI = async (email) => {
    // 这里注释掉实际的API请求，返回模拟的成功响应
    // return axios.post('/api/verify-email', { email });
  
    // 模拟API调用，返回示例响应
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };
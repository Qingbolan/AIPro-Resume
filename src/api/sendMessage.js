import axios from 'axios';

const API_BASE_URL = 'https://silan.tech/api';

// 辅助函数用于处理错误
const handleApiError = (error, functionName) => {
  console.error(`Error in ${functionName}:`, error);
  if (error.response) {
    console.error('Error response data:', error.response.data);
    console.error('Error response status:', error.response.status);
    console.error('Error response headers:', error.response.headers);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Error setting up request:', error.message);
  }
  throw error;
};

export const sendMessageAPI = async (formData, formType, sendResume, language = 'en') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sendMessage`, {
      formData,
      formType,
      sendResume,
      language
    });

    return {
      success: response.data.Success,
      message: response.data.Message
    };
  } catch (error) {
    handleApiError(error, 'sendMessageAPI');
  }
};

export const verifyEmailAPI = async (email, language = 'en') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verifyEmail`, {
      email,
      language
    });

    return {
      success: response.data.Success,
      message: response.data.Message
    };
  } catch (error) {
    handleApiError(error, 'verifyEmailAPI');
  }
};
// // src/api/sendMessage.js
// // import axios from 'axios';
// export const sendMessageAPI = (formData, formType, sendResume, language = 'en') => {
//   // 根据语言返回不同的消息
//   const successMessage = language === 'zh' ? '消息发送成功！' : 'Message sent successfully!';

//   // 模拟API调用，返回示例响应
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ success: true, message: successMessage });
//     }, 1000);
//   });
// };

// export const verifyEmailAPI = async (email, language = 'en') => {
//   // 根据语言返回不同的消息
//   const successMessage = language === 'zh' ? '邮箱验证成功！' : 'Email verified successfully!';

//   // 模拟API调用，返回示例响应
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ success: true, message: successMessage });
//     }, 1000);
//   });
// };
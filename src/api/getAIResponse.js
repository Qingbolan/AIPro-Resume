import axios from 'axios';

const API_BASE_URL = 'https://silan.tech/api';
export const getAIResponse = async (message, language = 'en') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/getAIResponse`, {
      message,
      language,
    });
    console.log('response:', response);
    return response.data.response;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    throw error;
  }
};

// export const getAIResponse = async (message, language = 'en') => {
//   // 根据语言返回不同的AI响应
//   const responses = {
//     en: `Thank you for your message: "${message}". How else can I assist you?`,
//     zh: `谢谢您的消息：“${message}”。我还能为您做些什么？`
//   };

//   // 模拟AI响应
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(responses[language]);
//     }, 1000);
//   });
// };
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
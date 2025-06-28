import axios from 'axios';
import type { Language } from '../types/api';

const API_BASE_URL = 'https://silan.tech/api';

export const getAIResponse = async (message: string, language: Language = 'en'): Promise<string> => {
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
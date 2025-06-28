import axios from 'axios';
import type { 
  FormData, 
  SendMessageResponse, 
  VerifyEmailResponse, 
  Language 
} from '../types/api';

const API_BASE_URL = 'https://silan.tech/api';

// Helper function for handling errors
const handleApiError = (error: any, functionName: string): never => {
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

export const sendMessageAPI = async (
  formData: FormData, 
  formType: string, 
  sendResume: boolean, 
  language: Language = 'en'
): Promise<SendMessageResponse> => {
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
    return handleApiError(error, 'sendMessageAPI');
  }
};

export const verifyEmailAPI = async (
  email: string, 
  language: Language = 'en'
): Promise<VerifyEmailResponse> => {
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
    return handleApiError(error, 'verifyEmailAPI');
  }
}; 
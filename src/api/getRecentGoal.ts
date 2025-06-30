import axios from 'axios';
import type { RecentGoalData, Language } from '../types/api';

const API_BASE_URL = 'https://silan.tech/api';

export const getRecentGoalAPI = async (language: Language = 'en'): Promise<RecentGoalData> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getRecentGoal`, {
      params: { language }
    });

    console.log(response.data);

    const { recentThoughts, expectedOpportunities, availabilityTimes } = response.data;

    return {
      recentThoughts,
      expectedOpportunities,
      availabilityTimes: {
        daily: availabilityTimes.daily,
        fullTime: availabilityTimes.fullTime
      }
    };
  } catch (error) {
    console.error('Error fetching recent goal data:', error);
    throw error;
  }
}; 
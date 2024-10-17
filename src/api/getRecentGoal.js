import axios from 'axios';

const API_BASE_URL = 'https://silan.tech/api';
export const getRecentGoalAPI = async (language = 'en') => {
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
// // 支持中英文的API函数

// export const getRecentThoughts = (language = 'en') => {
//     const thoughts = {
//       en: [
//         "Exploring the intersection of AI and human creativity",
//         "Investigating the ethical implications of large language models",
//         "Developing more efficient neural network architectures",
//       ],
//       zh: [
//         "探索人工智能与人类创造力的交叉点",
//         "研究大型语言模型的伦理影响",
//         "开发更高效的神经网络架构",
//       ]
//     };
  
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(thoughts[language]);
//       }, 500);
//     });
//   };
  
//   export const getExpectedOpportunities = (language = 'en') => {
//     const opportunities = {
//       en: [
//         "AI Research Scientist position in a leading tech company",
//         "Collaborative projects on natural language processing",
//         "Opportunities to contribute to open-source AI projects",
//         "Roles involving the development of ethical AI systems",
//       ],
//       zh: [
//         "领先科技公司的人工智能研究科学家职位",
//         "自然语言处理领域的协作项目",
//         "为开源人工智能项目做贡献的机会",
//         "涉及开发伦理人工智能系统的角色",
//       ]
//     };
  
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(opportunities[language]);
//       }, 500);
//     });
//   };
  
//   export const getAvailabilityTimes = (language = 'en') => {
//     const availability = {
//       en: {
//         daily: "4-6 hours",
//         fullTime: "Available from September 1st, 2024"
//       },
//       zh: {
//         daily: "4-6小时",
//         fullTime: "从2024年9月1日起全职可用"
//       }
//     };
  
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(availability[language]);
//       }, 500);
//     });
//   };
  
// export const getRecentGoalAPI = (language = 'en') => {

// // 模拟API调用，返回所有数据
// return Promise.all([
//     getRecentThoughts(language),
//     getExpectedOpportunities(language),
//     getAvailabilityTimes(language)
// ]).then(([recentThoughts, expectedOpportunities, availabilityTimes]) => {
//     return {
//     recentThoughts,
//     expectedOpportunities,
//     availabilityTimes,
// };
// });
// };
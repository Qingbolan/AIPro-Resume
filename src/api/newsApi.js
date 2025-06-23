// import axios from 'axios';

// const API_BASE_URL = 'https://silan.tech/api';

// // 获取最新动态的API函数
// export const fetchNews = async (language = 'en') => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/fetchNews`, {
//       params: { language }
//     });

//     console.log('API Response:', response.data); // 用于调试的日志

//     // 假设后端返回的数据结构与前端期望的结构相匹配
//     return response.data.Latested;
//   } catch (error) {
//     console.error('Error fetching news:', error);
//     if (error.response) {
//       // 请求已发出，但服务器响应的状态码不在 2xx 范围内
//       console.error('Error response data:', error.response.data);
//       console.error('Error response status:', error.response.status);
//       console.error('Error response headers:', error.response.headers);
//     } else if (error.request) {
//       // 请求已发出，但没有收到响应
//       console.error('No response received:', error.request);
//     } else {
//       // 在设置请求时触发了错误
//       console.error('Error setting up request:', error.message);
//     }
//     throw error;
//   }
// };
// // src/api/newsApi.js
// 模拟API延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// 模拟新闻数据
const newsData = {
en: [
    {
        category: 'researchProgress',
        date: '2024-03-20',
        title: 'Exploring benchmarks for complex reasoning in AI models',
        content: 'Currently investigating benchmarks suitable for evaluating complex reasoning capabilities in advanced AI models like OpenAI\'s ChatGPT-4.'
    },
    {
        category: 'projectProgress',
        date: '2024-03-15',
        title: 'AI personal website project underway',
        content: 'Developing a modern, personalized AI website that aligns with my vision and expectations.'
    },
    {
        category: 'academicAchievement',
        date: '2024-03-10',
        title: 'Perfect score in CS5223 Distributed Systems project',
        content: 'Successfully completed the CS5223 course project using Kitex and Fyne (Go), achieving full marks.'
    },
    {
        category: 'personalDevelopment',
        date: '2024-03-05',
        title: 'Contemplating future PhD possibilities',
        content: 'Reflecting on potential paths for doctoral studies and research opportunities in AI and complex systems.'
    },
    {
        category: 'projectProgress',
        date: '2024-03-01',
        title: 'CS5228 Kaggle competition update',
        content: 'Currently ranked 8th out of 36 in the Singapore used car price prediction competition with an RMSE of 20000.'
    },
    {
        category: 'researchIdeas',
        date: '2024-02-25',
        title: 'Exploring dynamic knowledge graphs for LLM enhancement',
        content: 'Investigating methods to improve LLM growth and personalization using dynamic knowledge graph structures.'
    },
    {
        category: 'personalDevelopment',
        date: '2024-02-20',
        title: 'Designing comprehensive personal knowledge and life management system',
        content: 'Conceptualizing an integrated approach to manage personal knowledge and daily life efficiently.'
    }
],
zh: [
{
category: 'researchProgress',
date: '2024-03-20',
title: '探索AI模型复杂推理能力的基准',
content: '正在研究适合评估OpenAI ChatGPT-4等先进AI模型复杂推理能力的基准。'
},
{
category: 'projectProgress',
date: '2024-03-15',
title: 'AI个人网站项目进行中',
content: '正在开发一个现代化、符合个人期望的AI网站。'
},
{
category: 'academicAchievement',
date: '2024-03-10',
title: 'CS5223分布式系统项目获得满分',
content: '使用Kitex和Fyne(Go)成功完成CS5223课程项目，取得满分成绩。'
},
{
category: 'personalDevelopment',
date: '2024-03-05',
title: '思考未来读博可能性',
content: '正在反思AI和复杂系统领域的潜在博士研究方向和机会。'
},
{
category: 'projectProgress',
date: '2024-03-01',
title: 'CS5228 Kaggle比赛更新',
content: '在新加坡二手车价格预测比赛中，目前RMSE为20000，排名36人中第8。'
},
{
category: 'researchIdeas',
date: '2024-02-25',
title: '探索动态知识图增强LLM',
content: '研究使用动态知识图结构来提高LLM的成长性和个性化的方法。'
},
{
category: 'personalDevelopment',
date: '2024-02-20',
title: '设计全面的个人知识和生活管理系统',
content: '构思一套完整的方案，以高效管理个人知识和日常生活。'
}
]
};
// 获取最新动态的API函数
export const fetchNews = async (language = 'en') => {
try {
// 模拟网络延迟
await delay(500);
return newsData[language];
} catch (error) {
console.error('Error fetching news:', error);
throw error;
}
};
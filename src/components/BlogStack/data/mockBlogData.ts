import { BlogData } from '../types/blog';

export const mockBlogData: Record<string, BlogData> = {
  '1': {
    id: '1',
    title: 'Leveraging Large Language Models for Code Refactoring: A Deep Dive',
    titleZh: '利用大型语言模型进行代码重构：深度探讨',
    author: 'Dr. Sarah Chen',
    publishDate: '2024-01-25',
    readTime: '15 min read',
    category: 'Research',
    tags: ['LLM', 'Code Refactoring', 'AI', 'Software Engineering'],
    summary: 'Exploring the revolutionary potential of large language models in automated code refactoring, this article delves into our latest research findings and practical implementations.',
    summaryZh: '探索大型语言模型在自动化代码重构中的革命性潜力，本文深入研究我们的最新研究发现和实际实现。',
    likes: 234,
    views: 1547,
    content: [
      {
        type: 'text',
        content: 'Large Language Models (LLMs) have revolutionized many aspects of software development, but their application in code refactoring represents a particularly exciting frontier. Our recent research has uncovered several breakthrough approaches that could fundamentally change how developers approach code quality improvement.',
        id: 'content-1'
      },
      {
        type: 'quote',
        content: 'The future of code refactoring lies not in replacing human intuition, but in augmenting it with AI-powered insights that can see patterns across millions of codebases.',
        id: 'content-2'
      },
      {
        type: 'image',
        content: '/api/placeholder/800/400',
        caption: 'Figure 1: LLM-based refactoring pipeline architecture',
        id: 'content-3'
      },
      {
        type: 'text',
        content: 'Traditional refactoring tools rely heavily on syntactic analysis and predefined patterns. While effective for simple transformations, they often miss semantic improvements that require deeper understanding of code intent and context.',
        annotation: 'This limitation has been a major pain point for developers working with legacy codebases.',
        id: 'content-4'
      },
      {
        type: 'code',
        content: `// Before: Traditional approach
function processUserData(users) {
  let result = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].isActive && users[i].age > 18) {
      result.push({
        name: users[i].name,
        email: users[i].email
      });
    }
  }
  return result;
}

// After: LLM-suggested refactoring
const processUserData = (users) => 
  users
    .filter(user => user.isActive && user.age > 18)
    .map(({ name, email }) => ({ name, email }));`,
        language: 'javascript',
        caption: 'Example of LLM-suggested functional refactoring',
        id: 'content-5'
      },
      {
        type: 'text',
        content: 'Our experiments show that LLM-based refactoring tools can identify and suggest improvements that go beyond surface-level changes. They understand semantic patterns, suggest performance optimizations, and can even propose architectural improvements.',
        id: 'content-6'
      },
      {
        type: 'video',
        content: '/api/placeholder/video/demo.mp4',
        caption: 'Live demonstration of our LLM refactoring tool',
        id: 'content-7'
      }
    ]
  }
}; 
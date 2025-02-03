// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 引入语言资源
const resources = {
  en: {
    translation: {
      // 通用翻译键值对
      "message_sent_success": "Message sent successfully!",
      "verify_email_success": "Email verified successfully!",
      "update_section_success": "{{section}} section updated successfully",
      "section_not_found": "Section {{section}} not found",
      "switch_to_chinese": "Switch to Chinese",
      "switch_to_english": "Switch to English",
      // 项目画廊相关翻译
      "my_project_gallery": "My Project Gallery",
      "exploring_the_potential": "Apply my knowledge into the real world senerio. make AI for ALL",
      "show_knowledge_graph": "Show Knowledge Graph",
      "hide_knowledge_graph": "Hide Knowledge Graph",
      "show_plans": "Show Plans",
      "hide_plans": "Hide Plans",
      "search_placeholder": "Search projects by name, tech stack, or year",
      "failed_to_fetch_data": "Failed to fetch data. Please try again.",
      "switch_to_light_mode": "Switch to light mode",
      "switch_to_dark_mode": "Switch to dark mode",
      "explore_my_journey": "Explore my journey through innovative projects",
      "personal_ecosystem": "Personal Ecosystem",
      "idea_cloud": "Idea Cloud",
      "thought_pool": "Thought Pool",
      "knowledge_base": "Knowledge Base",
      "fast_tools": "Fast Tools",
      "all_rights_reserved": "All rights reserved.",
      "contact_me": "Contact Me",
      "Silan_Hu_Zi_Yun": "Silan Hu(ZIYUN·2025)",
      "personal_title": "AI Researcher & Full Stack Developer",
      "AI_Assistant": "AI Assistant",
      "switch_to_formate": "Switch to Form",
      "switch_to_AI_assistant": "Switch to AI Assistant",
      "General_message": "General Message",
      "Research_job_opportunity": "Research/Job Opportunity",
      "Recent Thoughts": "Recent Thoughts",
      "Expected Opportunities": "Expected Opportunities",
      "Contact Form": "Contact Form",
      "Recent Messages": "Recent Messages",
      "Send my resume to this email": "Send my resume to this email",
      "Your Name": "Your Name",
      "Your Email": "Your Email",
      "Company Email": "Company Email",
      "Your Message": "Your Message",
      "Position for Me": "Position for Me",
      "Send Message": "Send Message",
      "Verify Email": "Verify Email",
      "Verified": "Verified",
      "Your Company Email": "Your Company Email",
      "Your Company": "Your Company",
      "Available Time": "Available Time",
      "Daily": "Daily",
      "Full Time": "Full Time",
      //IdeaPage
      "Input your thoughts": "Input your thoughts...",
      "Anonymous message box": "Anonymous message box",
      "My Creative Space": "My Creative Space",
      "ZIYUN 2025": "ZIYUN 2025",
      "AI for Life && AI for ALL": "AI for Life && AI for ALL",

      //BlogStack
      "My BlogStack": "My Blog Stack",


      "calendar": {
        "monday": "Mon",
        "tuesday": "Tue",
        "wednesday": "Wed",
        "thursday": "Thu",
        "friday": "Fri",
        "saturday": "Sat",
        "sunday": "Sun",
        "previousMonth": "Prev Month",
        "nextMonth": "Next Month",
        "dateWithEvents": "{{date}} {{events}}",
        "noEvents": "No Events"
      },
      "events": {
        "ddl": "DeadLine: {{title}}",
        "article": "Article: {{title}}",
        "idea": "Thought: {{title}}",
        "schedule": "Schedule: {{title}}"
      },
      "loading": {
        "wait": "Please wait...",
        "connecting": "Connecting to silan.tech backend server...",
        "retry": {
          "first": "Making a new attempt (1/3)...",
          "second": "Making a new attempt (2/3)...",
          "third": "Making a new attempt (3/3)..."
        },
        "thanks": "Silan thanks you for your visit...",
        "report": "Reporting this situation to silan.hu@u.nus.edu..."
      }
    }
  },
  zh: {
    translation: {
      // 通用翻译键值对
      "message_sent_success": "消息发送成功！",
      "verify_email_success": "邮箱验证成功！",
      "update_section_success": "{{section}} 部分更新成功",
      "section_not_found": "未找到 {{section}} 部分",
      "switch_to_chinese": "切换到中文",
      "switch_to_english": "切换到英文",
      // 项目画廊相关翻译
      "my_project_gallery": "我的项目画廊",
      "exploring_the_potential": "将我的知识应用于现实世界的场景。让AI服务于所有人",
      "show_knowledge_graph": "显示知识图谱",
      "hide_knowledge_graph": "隐藏知识图谱",
      "show_plans": "显示计划",
      "hide_plans": "隐藏计划",
      "search_placeholder": "按名称、技术栈或年份搜索项目",
      "failed_to_fetch_data": "获取数据失败。请重试。",
      "switch_to_light_mode": "切换到亮色模式",
      "switch_to_dark_mode": "切换到暗色模式",
      "explore_my_journey": "探索我的创新项目之旅",
      "personal_ecosystem": "个人生态系统",
      "idea_cloud": "创意云",
      "thought_pool": "思想池",
      "knowledge_base": "知识库",
      "fast_tools": "快速工具",
      "all_rights_reserved": "版权所有。",
      "contact_me": "联系我",
      "Silan_Hu_Zi_Yun": "胡思蓝(紫韵·2025)",
      "personal_title": "AI研究员 & 全栈开发者",
      "AI_Assistant": "AI助手",
      "switch_to_formate": "切换到表单",
      "switch_to_AI_assistant": "切换到AI助手",
      "General_message": "一般留言",
      "Research_job_opportunity": "研究/工作机会",
      "Recent Thoughts": "最近的想法",
      "Expected Opportunities": "期待的机会",
      "Contact Form": "联系表单",
      "Recent Messages": "最近的留言",
      "Send my resume to this email": "将我的简历发送到此邮箱",
      "Your Name": "您的姓名",
      "Your Email": "您的电子邮件",
      "Company Email": "您的公司电子邮件",
      "Your Message": "您的留言",
      "Position for Me": "适合我的职位",
      "Send Message": "发送消息",
      "Verify Email": "验证电子邮件",
      "Verified": "已验证",
      "Your Company Email": "您的公司电子邮件",
      "Your Company": "您的公司",
      "Available Time": "可支配时间",
      "Daily": "每日",
      "Full Time": "全职",
      "Input your thoughts": "输入您的想法...",
      "Anonymous message box": "匿名留言箱",
      "My Creative Space": "创想空间",
      "ZIYUN 2025": "紫韵 2025",
      "AI for Life && AI for ALL": "让AI为每一个人生活服务",
      //BlogStack
      "My BlogStack": "我的博客堆栈",

      "calendar": {
        "monday": "一",
        "tuesday": "二",
        "wednesday": "三",
        "thursday": "四",
        "friday": "五",
        "saturday": "六",
        "sunday": "日",
        "previousMonth": "上个月",
        "nextMonth": "下个月",
        "dateWithEvents": "{{date}} {{events}}",
        "noEvents": "没有事件"
      },
      "events": {
        "ddl": "截止日期: {{title}}",
        "article": "文章: {{title}}",
        "idea": "想法: {{title}}",
        "schedule": "日程: {{title}}"
      },
      "loading": {
        "wait": "请稍等...",
        "connecting": "正在连接silan.tech的后端服务器...",
        "retry": {
          "first": "正在做新的尝试(1/3)...",
          "second": "正在做新的尝试(2/3)...",
          "third": "正在做新的尝试(3/3)..."
        },
        "thanks": "silan感谢你的访问...",
        "report": "正在把这个情况报告给silan.hu@u.nus.edu..."
      }
    }
  }
};

i18n
  .use(initReactI18next) // 初始化 react-i18next
  .init({
    resources,
    lng: navigator.language.startsWith('zh') ? 'zh' : 'en', // 根据用户操作系统语言设置默认语言
    fallbackLng: 'en', // 默认回退语言
    interpolation: {
      escapeValue: false, // React已默认防止XSS攻击
    }
  });

export default i18n;
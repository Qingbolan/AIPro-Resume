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
      // 添加更多翻译键值对...
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
      "switch_to_english": "Switch to English",
      // 添加更多翻译键值对...
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
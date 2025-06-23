import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe, MessageSquare, AlertCircle } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';
import { useLanguage } from '../components/LanguageContext';
import { ContactFormData } from '../types';

const InteractiveContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { colors } = useTheme();
  const { language } = useLanguage();

  // Set CSS variables based on current theme
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [colors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    } catch (err) {
      setError(language === 'en' ? 'Failed to send message' : '发送消息失败');
      setIsSubmitting(false);
    }
  }, [language]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  const contactMethods = useMemo(() => [
    {
      icon: <Mail size={24} />,
      title: language === 'en' ? 'Email' : '邮箱',
      value: 'silan.hu@u.nus.edu',
      href: 'mailto:silan.hu@u.nus.edu',
      label: 'Send an email'
    },
    {
      icon: <Phone size={24} />,
      title: language === 'en' ? 'Phone' : '电话',
      value: '+65 8698 6181',
      href: 'tel:+6586986181',
      label: 'Make a phone call'
    },
    {
      icon: <MapPin size={24} />,
      title: language === 'en' ? 'Location' : '位置',
      value: 'Singapore',
      href: 'https://maps.google.com/?q=Singapore',
      label: 'View location on map'
    }
  ], [language]);

  const socialLinks = useMemo(() => [
    {
      icon: <Github size={20} />,
      label: 'GitHub',
      href: 'https://github.com/Qingbolan',
      hoverColor: 'hover:bg-gray-800'
    },
    {
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/Qingbolan',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      icon: <Globe size={20} />,
      label: 'Website',
      href: 'https://silan.tech',
      hoverColor: 'hover:bg-theme-primary'
    }
  ], []);

  const handleSocialClick = useCallback((href: string, label: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  }, []);

  const handleContactClick = useCallback((href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = href;
    }
  }, []);

  const isFormValid = useMemo(() => {
    return formData.name && formData.email && formData.subject && formData.message;
  }, [formData]);

  return (
    <motion.div
      className="min-h-screen py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-theme-primary">
            {language === 'en' ? 'Get In Touch' : '联系我'}
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-theme-secondary">
            {language === 'en' 
              ? "Have a project in mind? Let's discuss how we can work together to bring your ideas to life."
              : "有项目想法吗？让我们讨论如何合作将您的想法变为现实。"
            }
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.section
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-labelledby="contact-form-heading"
          >
            <div className="p-8 rounded-2xl card-interactive">
              <h2 
                id="contact-form-heading"
                className="text-2xl font-bold mb-6 flex items-center space-x-3 text-theme-primary"
              >
                <MessageSquare size={24} />
                <span>{language === 'en' ? 'Send Message' : '发送消息'}</span>
              </h2>

              {error && (
                <motion.div
                  className="mb-6 p-4 rounded-lg flex items-center space-x-3 form-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                >
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </motion.div>
              )}

              {submitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-theme-success">
                    <Send size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-theme-primary">
                    {language === 'en' ? 'Message Sent!' : '消息已发送！'}
                  </h3>
                  <p className="text-theme-secondary">
                    {language === 'en' ? 'Thank you for reaching out. I\'ll get back to you soon!' : '感谢您的联系，我会尽快回复您！'}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        htmlFor="name"
                        className="block text-sm font-medium mb-2 text-theme-primary"
                      >
                        {language === 'en' ? 'Name' : '姓名'} *
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={language === 'en' ? 'Your Name' : '您的姓名'}
                        required
                        className="w-full px-4 py-3 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 input-theme ring-theme-primary ring-offset-theme-background"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="email"
                        className="block text-sm font-medium mb-2 text-theme-primary"
                      >
                        {language === 'en' ? 'Email' : '邮箱'} *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={language === 'en' ? 'Your Email' : '您的邮箱'}
                        required
                        className="w-full px-4 py-3 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 input-theme ring-theme-primary ring-offset-theme-background"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2 text-theme-primary"
                    >
                      {language === 'en' ? 'Subject' : '主题'} *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'Subject' : '主题'}
                      required
                      className="w-full px-4 py-3 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 input-theme ring-theme-primary ring-offset-theme-background"
                      aria-required="true"
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="message"
                      className="block text-sm font-medium mb-2 text-theme-primary"
                    >
                      {language === 'en' ? 'Message' : '消息'} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'Your Message' : '您的消息'}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-vertical input-theme ring-theme-primary ring-offset-theme-background"
                      aria-required="true"
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className="w-full py-4 px-6 rounded-xl font-semibold text-white flex items-center justify-center space-x-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed btn-primary ring-theme-primary ring-offset-theme-background"
                    whileHover={!isSubmitting && isFormValid ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting && isFormValid ? { scale: 0.98 } : {}}
                    aria-describedby={!isFormValid ? "form-validation-message" : undefined}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{language === 'en' ? 'Sending...' : '发送中...'}</span>
                      </div>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>{language === 'en' ? 'Send Message' : '发送消息'}</span>
                      </>
                    )}
                  </motion.button>
                  
                  {!isFormValid && (
                    <p 
                      id="form-validation-message"
                      className="text-sm text-center text-theme-tertiary"
                    >
                      {language === 'en' ? 'Please fill in all required fields' : '请填写所有必填字段'}
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.section>

          {/* Contact Info */}
          <motion.aside
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            aria-labelledby="contact-info-heading"
          >
            <h2 
              id="contact-info-heading"
              className="sr-only"
            >
              {language === 'en' ? 'Contact Information' : '联系信息'}
            </h2>
            
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleContactClick(method.href)}
                  className="block w-full p-6 rounded-xl transition-all duration-300 group text-left focus:outline-none focus:ring-2 focus:ring-offset-2 ring-theme-primary ring-offset-theme-background contact-card"
                  whileHover={{ y: -5 }}
                  aria-label={`${method.title}: ${method.value}. ${method.label}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-theme-surface-elevated">
                      <div className="text-theme-accent">
                        {method.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-theme-primary">
                        {method.title}
                      </h3>
                      <p className="text-theme-secondary">
                        {method.value}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Social Links */}
            <div className="p-6 rounded-xl card-interactive">
              <h3 className="font-semibold mb-4 text-theme-primary">
                {language === 'en' ? 'Follow Me' : '关注我'}
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSocialClick(social.href, social.label)}
                    className={`p-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-theme-primary ring-offset-theme-background social-icon ${social.hoverColor}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Visit my ${social.label} profile`}
                  >
                    {social.icon}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveContactPage; 
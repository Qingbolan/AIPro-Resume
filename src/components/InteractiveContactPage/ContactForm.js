// src/components/ContactForm.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { verifyEmailAPI, sendMessageAPI } from '../../api/sendMessage';
import Loader from './Loader';

const formVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const ContactForm = ({
  formType,
  setFormType,
  setIsEmailVerified,
  isEmailVerified,
  sendResume,
  setSendResume,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
    companyEmail: '',
    position: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (formType === 'general' && !formData.email) newErrors.email = 'Email is required';
    if (formType === 'job' && !formData.companyEmail) newErrors.companyEmail = 'Company email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    if (formType === 'job' && !isEmailVerified) newErrors.companyEmail = 'Please verify your email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    // 调用发送消息的API
    try {
      await sendMessageAPI(formData, formType, sendResume);
      // 清空表单
      setFormData({
        name: '',
        email: '',
        message: '',
        company: '',
        companyEmail: '',
        position: '',
      });
      setIsEmailVerified(false);
      setSendResume(false);
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyEmail = async () => {
    // 调用验证电子邮件的API
    try {
      const result = await verifyEmailAPI(formData.companyEmail);
      if (result.success) {
        setIsEmailVerified(true);
        alert('Email verified successfully!');
      } else {
        alert('Email verification failed.');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      alert('Failed to verify email.');
    }
  };

  return (
    <motion.div
      key="form"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center mb-8">
        <button
          className={`px-4 py-2 rounded-l-full ${formType === 'general' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setFormType('general')}
        >
          General Message
        </button>
        <button
          className={`px-4 py-2 rounded-r-full ${formType === 'job' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setFormType('job')}
        >
          Job Opportunity
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        {formType === 'job' && (
          <>
            <div>
              <input
                type="text"
                name="company"
                placeholder="Your Company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
            </div>
            <div>
              <div className="flex space-x-2">
                <input
                  type="email"
                  name="companyEmail"
                  placeholder="Your Company Email"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
                <button
                  type="button"
                  onClick={verifyEmail}
                  className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                  disabled={isEmailVerified}
                >
                  {isEmailVerified ? 'Verified' : 'Verify Email'}
                </button>
              </div>
              {errors.companyEmail && <p className="text-red-500 text-sm mt-1">{errors.companyEmail}</p>}
            </div>
            {isEmailVerified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center text-green-500"
              >
                <Check className="mr-2" />
                Email verified successfully!
              </motion.div>
            )}
            <div>
              <input
                type="text"
                name="position"
                placeholder="Position for Me"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="sendResume"
                checked={formData.sendResume}
                onChange={handleInputChange}
                disabled={!isEmailVerified}
              />
              <span>Send my resume to this email</span>
            </label>
          </>
        )}
        {formType === 'general' && (
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        )}
        <div>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        <motion.button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting || (formType === 'job' && !isEmailVerified)}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              Sending...
              <Loader />
            </div>
          ) : 'Send Message'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
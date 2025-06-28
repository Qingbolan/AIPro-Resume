import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Linkedin, Mail, MapPin, Phone, Globe, AlertCircle,
  Calendar, Clock, Filter, Eye, ChevronRight, Star, Zap, BookOpen, 
  Briefcase, GraduationCap, FileText, Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { LoadingSpinner } from '../components/ui';
import { fetchResumeData } from '../api/resumeApi';

interface RecentItem {
  id: string;
  type: 'work' | 'education' | 'research' | 'publication' | 'project';
  title: string;
  description: string;
  date: string;
  tags: string[];
  status: 'active' | 'ongoing' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

interface ResumeData {
  name: string;
  title: string;
  current: string;
  contacts: Array<{
    type: string;
    value: string;
  }>;
  socialLinks: Array<{
    type: string;
    url: string;
  }>;
  sections: {
    education: {
      title: string;
      content: Array<{
        school: string;
        degree: string;
        date: string;
        details: string[];
      }>;
    };
    experience: {
      title: string;
      content: Array<{
        company: string;
        role: string;
        date: string;
        details: string[];
      }>;
    };
    research: {
      title: string;
      content: Array<{
  title: string;
  location: string;
        date: string;
        details: string[];
      }>;
    };
    publications: {
      title: string;
      content: string[];
    };
    awards: {
      title: string;
      content: string[];
    };
    skills: {
      title: string;
      content: string[];
    };
    recent: {
      title: string;
      content: RecentItem[];
    };
  };
}

interface ProjectSectionProps {
  data: ResumeData;
  onDownloadResume?: () => void;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ data }) => {

  const socialLinks = useMemo(() => {
    return data.socialLinks.map(link => ({
      icon: link.type === 'github' ? <Github size={20} /> : 
            link.type === 'linkedin' ? <Linkedin size={20} /> : 
            <Globe size={20} />,
      url: link.url,
      label: link.type.charAt(0).toUpperCase() + link.type.slice(1)
    }));
  }, [data.socialLinks]);

  const contactInfo = useMemo(() => {
    return data.contacts.map(contact => ({
      icon: contact.type === 'email' ? <Mail size={16} /> :
            contact.type === 'phone' ? <Phone size={16} /> :
            <MapPin size={16} />,
      value: contact.value,
      type: contact.type
    }));
  }, [data.contacts]);

  const handleSocialClick = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, url: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSocialClick(url);
    }
  }, [handleSocialClick]);
  
  return (
    <motion.section
      className="relative py-20 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Image Placeholder */}
        {/* <motion.div
          className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden focus:outline-none focus:ring-4 ring-theme-primary profile-image"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          tabIndex={0}
          role="img"
          aria-label={`Profile photo of ${data.name}`}
        >
          <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
            {data.name.charAt(0)}
          </div>
        </motion.div> */}

        {/* Name and Title */}
        <motion.h1
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-3 xs:mb-4 text-theme-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {data.name}
        </motion.h1>

        <motion.h2
          className="text-base xs:text-lg sm:text-xl md:text-2xl mb-4 xs:mb-6 text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {data.title}
        </motion.h2>

        {/* Current Status */}
        <motion.p
          className="text-sm xs:text-base sm:text-lg mb-4 xs:mb-6 text-theme-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {data.current}
        </motion.p>

        {/* Contact Info */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 xs:gap-4 sm:gap-6 mb-6 xs:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {contactInfo.map((contact, index) => (
            <div key={index} className="flex items-center space-x-1.5 xs:space-x-2 text-theme-secondary text-sm xs:text-base">
              <span className="w-3.5 h-3.5 xs:w-4 xs:h-4">{contact.icon}</span>
              {contact.type === 'email' ? (
            <a 
                  href={`mailto:${contact.value}`}
              className="hover:underline focus:underline focus:outline-none text-theme-secondary btn-touch"
            >
                  {contact.value}
            </a>
              ) : contact.type === 'phone' ? (
            <a 
                  href={`tel:${contact.value}`}
              className="hover:underline focus:underline focus:outline-none text-theme-secondary btn-touch"
            >
                  {contact.value}
            </a>
              ) : (
                <span>{contact.value}</span>
              )}
          </div>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-2 xs:space-x-3 sm:space-x-4 mb-6 xs:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {socialLinks.map((social, index) => (
            <motion.button
              key={index}
              onClick={() => handleSocialClick(social.url)}
              onKeyDown={(e) => handleKeyDown(e, social.url)}
              className="p-2.5 xs:p-3 rounded-lg xs:rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-theme-primary ring-offset-theme-background social-icon btn-touch"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Visit ${social.label}`}
            >
              <span className="w-4 h-4 xs:w-5 xs:h-5">{social.icon}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Download Resume Button */}
        {/* {onDownloadResume && (
          <motion.button
            onClick={onDownloadResume}
            className="mb-6 xs:mb-8 px-4 xs:px-6 py-2.5 xs:py-3 rounded-lg xs:rounded-xl font-semibold text-white flex items-center space-x-2 mx-auto transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-theme-primary ring-offset-theme-background btn-primary btn-touch-large text-sm xs:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Download size={18} className="w-4 h-4 xs:w-5 xs:h-5" />
            <span>{t('resume.download_resume')}</span>
          </motion.button>
        )} */}
      </div>
    </motion.section>
  );
};

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, children, delay = 0 }) => {
  return (
    <motion.section
      className="p-4 xs:p-6 sm:p-8 rounded-xl xs:rounded-2xl bg-theme-surface border border-theme-border card-mobile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <h3 
        id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-lg xs:text-xl sm:text-2xl font-bold mb-4 xs:mb-6 text-theme-primary"
      >
        {title}
      </h3>
      {children}
    </motion.section>
  );
};

// Recent Section Component with simplified design
interface RecentSectionProps {
  data: RecentItem[];
  title: string;
  delay?: number;
}

const RecentSection: React.FC<RecentSectionProps> = ({ data, title, delay = 0 }) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>('all');
  const navigate = useNavigate();

  // Helper function to get relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
      return t('resume.years_ago', { years: diffYears });
    } else if (diffMonths > 0) {
      return t('resume.months_ago', { months: diffMonths });
    } else {
      return t('resume.days_ago', { days: diffDays });
    }
  };

  // Type icon mapping
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'work': return <Briefcase size={16} />;
      case 'education': return <GraduationCap size={16} />;
      case 'research': return <BookOpen size={16} />;
      case 'publication': return <FileText size={16} />;
      case 'project': return <Target size={16} />;
      default: return <Star size={16} />;
    }
  };

  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'ongoing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Priority indicator  
  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case 'high': return <Zap size={12} className="text-red-500" />;
      case 'medium': return <Clock size={12} className="text-yellow-500" />;
      case 'low': return <Eye size={12} className="text-gray-400" />;
      default: return null;
    }
  };

  // Filter data - always show only the first item
  const filteredData = useMemo(() => {
    const filtered = filter === 'all' ? data : data.filter(item => item.type === filter);
    return filtered.slice(0, 1);
  }, [data, filter]);

  const filterTypes = ['all', 'work', 'education', 'research', 'publication', 'project'];

  const handleViewMore = () => {
    // Navigate to recent updates page using React Router
    navigate('/recent-updates');
  };

  return (
    <motion.section
      className="p-4 xs:p-6 sm:p-8 rounded-xl xs:rounded-2xl bg-theme-surface border border-theme-border card-mobile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Header with Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 xs:mb-6 gap-3 xs:gap-4">
        <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-theme-primary flex items-center gap-2">
          <Calendar size={20} className="w-5 h-5 xs:w-6 xs:h-6" />
          {title}
        </h3>
        
        {/* Filter Controls */}
        <div className="flex items-center gap-1.5 xs:gap-2 flex-wrap">
          <span className="text-xs xs:text-sm text-theme-secondary flex items-center gap-1">
            <Filter size={12} className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
            {t('resume.filter_by_type')}:
          </span>
          {filterTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-2 xs:px-3 py-1 xs:py-1.5 text-xs xs:text-sm rounded-full transition-colors duration-200 btn-touch ${
                filter === type
                  ? 'bg-theme-primary text-white'
                  : 'bg-theme-surface-elevated text-theme-secondary hover:bg-theme-surface-tertiary'
              }`}
            >
              {type === 'all' ? t('resume.all_types') : t(`resume.${type}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Items */}
      <div className="space-y-2 xs:space-y-3">
        {filteredData.map((item, index) => (
          <motion.div
            key={item.id}
            className="p-3 xs:p-4 rounded-lg border border-theme-surface-tertiary bg-theme-surface-elevated hover:bg-theme-card transition-colors duration-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="flex items-start gap-2 xs:gap-3">
              {/* Type Icon */}
              <div className="flex-shrink-0 p-1.5 xs:p-2 rounded-lg bg-theme-primary/10 text-theme-primary">
                <span className="w-3.5 h-3.5 xs:w-4 xs:h-4">{getTypeIcon(item.type)}</span>
              </div>

              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 xs:gap-4 mb-1.5 xs:mb-2">
                  <h4 className="font-semibold text-theme-primary text-sm xs:text-base">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1 xs:gap-2">
                    <span className="w-3 h-3 xs:w-3.5 xs:h-3.5">{getPriorityIndicator(item.priority)}</span>
                    <span className="text-xs xs:text-sm text-theme-secondary whitespace-nowrap">
                      {getRelativeTime(item.date)}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs xs:text-sm text-theme-secondary mb-1.5 xs:mb-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 xs:gap-2">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-1.5 xs:px-2 py-0.5 xs:py-1 text-xs rounded-md bg-theme-surface-tertiary text-theme-tertiary"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="text-xs text-theme-secondary">
                        +{item.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Status Badge */}
                  <span className={`px-1.5 xs:px-2 py-0.5 xs:py-1 text-xs rounded-full border ${getStatusColor(item.status)}`}>
                    {t(`resume.status.${item.status}`)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View More Button - Always show if there's more than 1 item */}
      {data.length > 1 && (
        <div className="mt-3 xs:mt-4 text-center">
          <button
            onClick={handleViewMore}
            className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm font-medium text-theme-primary hover:text-theme-accent transition-colors hover:bg-theme-surface-elevated rounded-lg btn-touch"
          >
            {t('resume.view_all')} ({data.length - 1} more)
            <ChevronRight size={14} className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
          </button>
        </div>
      )}
    </motion.section>
  );
};

const ResumeWebsite: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { colors } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();

  // Set CSS variables based on current theme
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [colors]);

  // Load resume data
  useEffect(() => {
    let isMounted = true;
    
    const loadResumeData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = await fetchResumeData(language);
        
        if (isMounted) {
          setResumeData(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(t('resume.failed_to_load'));
          setLoading(false);
        }
      }
    };

    loadResumeData();

    return () => {
      isMounted = false;
    };
  }, [language, t]);

  const handleDownloadResume = useCallback(() => {
    // Handle resume download
    console.log('Download resume');
    // You would implement actual download logic here
  }, []);

  if (loading || !resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <LoadingSpinner 
          size="xl" 
          text={t('resume.loading_profile')} 
          variant="ring"
          color="primary"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="alert"
        >
          <AlertCircle size={48} className="mx-auto mb-4 text-theme-error" />
          <h2 className="text-xl font-semibold mb-2 text-theme-primary">
            {t('resume.error_loading')}
          </h2>
          <p className="text-theme-secondary">{error}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Project Section */}
      <ProjectSection data={resumeData} onDownloadResume={handleDownloadResume} />

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-3 xs:px-4 pb-12 xs:pb-16 sm:pb-20 space-y-6 xs:space-y-8 sm:space-y-12">
        {/* Recent Section - At the top for prominence */}
        {resumeData.sections.recent && (
          <RecentSection 
            data={resumeData.sections.recent.content} 
            title={resumeData.sections.recent.title} 
            delay={0.1} 
          />
        )}

        {/* Experience Section */}
        <SectionCard title={resumeData.sections.experience.title} delay={0.2}>
          <div className="space-y-4 xs:space-y-6">
            {resumeData.sections.experience.content.map((exp, index) => (
              <motion.div
                key={index}
                className="relative pl-6 xs:pl-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div 
                  className="absolute left-0 top-2 w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full timeline-dot-primary"
                  aria-hidden="true"
                />
                
                <div className="space-y-1.5 xs:space-y-2">
                  <h4 className="text-base xs:text-lg sm:text-xl font-semibold text-theme-primary">
                    {exp.role}
                  </h4>
                  <p className="font-medium text-theme-accent text-sm xs:text-base">
                    {exp.company} • {exp.date}
                  </p>
                  <ul className="space-y-0.5 xs:space-y-1 text-theme-secondary text-sm xs:text-base">
                    {exp.details.map((desc, i) => (
                      <li key={i} className="flex items-start space-x-1.5 xs:space-x-2">
                        <span className="w-1 h-1 rounded-full mt-1.5 xs:mt-2 flex-shrink-0 timeline-dot-accent" 
                              aria-hidden="true" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionCard>

        {/* Education Section */}
        <SectionCard title={resumeData.sections.education.title} delay={0.3}>
          <div className="space-y-4 xs:space-y-6">
            {resumeData.sections.education.content.map((edu, index) => (
              <motion.div
                key={index}
                className="relative pl-6 xs:pl-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className="absolute left-0 top-2 w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full timeline-dot-secondary"
                  aria-hidden="true"
                />
                
                <div className="space-y-1.5 xs:space-y-2">
                  <h4 className="text-base xs:text-lg sm:text-xl font-semibold text-theme-primary">
                    {edu.degree}
                  </h4>
                  <p className="font-medium text-theme-secondary text-sm xs:text-base">
                    {edu.school} • {edu.date}
                  </p>
                  {edu.details.length > 0 && (
                    <ul className="space-y-0.5 xs:space-y-1 text-theme-secondary text-sm xs:text-base">
                      {edu.details.map((detail, i) => (
                        <li key={i} className="flex items-start space-x-1.5 xs:space-x-2">
                          <span className="w-1 h-1 rounded-full mt-1.5 xs:mt-2 flex-shrink-0 timeline-dot-accent" 
                                aria-hidden="true" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </SectionCard>

        {/* Research Section */}
        {resumeData.sections.research && (
          <SectionCard title={resumeData.sections.research.title} delay={0.4}>
            <div className="space-y-4 xs:space-y-6">
              {resumeData.sections.research.content.map((research, index) => (
                <div
                  key={index}
                  className="relative pl-6 xs:pl-8"
                >
                  <div 
                    className="absolute left-0 top-2 w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full timeline-dot-primary"
                    aria-hidden="true"
                  />
                  
                  <div className="space-y-1.5 xs:space-y-2">
                    <h4 className="text-base xs:text-lg sm:text-xl font-semibold text-theme-primary">
                      {research.title}
                    </h4>
                    <p className="font-medium text-theme-accent text-sm xs:text-base">
                      {research.location} • {research.date}
                    </p>
                    <ul className="space-y-0.5 xs:space-y-1 text-theme-secondary text-sm xs:text-base">
                      {research.details.map((desc, i) => (
                        <li key={i} className="flex items-start space-x-1.5 xs:space-x-2">
                          <span className="w-1 h-1 rounded-full mt-1.5 xs:mt-2 flex-shrink-0 timeline-dot-accent" 
                                aria-hidden="true" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Publications Section */}
        {resumeData.sections.publications && (
          <SectionCard title={resumeData.sections.publications.title} delay={0.5}>
            <div className="space-y-3 xs:space-y-4">
              {resumeData.sections.publications.content.map((publication, index) => (
                <motion.div
                  key={index}
                  className="p-3 xs:p-4 rounded-lg bg-theme-surface-elevated"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <p className="text-theme-secondary text-xs xs:text-sm leading-relaxed">
                    {publication}
                  </p>
                </motion.div>
                    ))}
                  </div>
          </SectionCard>
        )}

        {/* Awards Section */}
        {resumeData.sections.awards && (
          <SectionCard title={resumeData.sections.awards.title} delay={0.6}>
            <div className="space-y-2 xs:space-y-3">
              {resumeData.sections.awards.content.map((award, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-2 xs:space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-theme-accent mt-1.5 xs:mt-2 flex-shrink-0" />
                  <p className="text-theme-secondary text-sm xs:text-base">{award}</p>
                </motion.div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Skills Section */}
        {resumeData.sections.skills && (
          <SectionCard title={resumeData.sections.skills.title} delay={0.7}>
            <div className="flex flex-wrap gap-2 xs:gap-3">
              {resumeData.sections.skills.content.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-full bg-theme-surface-elevated text-theme-secondary border border-theme-border hover:bg-theme-surface-tertiary transition-colors text-xs xs:text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </SectionCard>
        )}
      </div>
    </motion.div>
  );
};

export default ResumeWebsite; 
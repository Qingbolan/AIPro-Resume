import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Linkedin, Github, Moon, Sun } from 'lucide-react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

const ResumeWebsite = () => {
  const [activeSection, setActiveSection] = useState('education');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  useEffect(() => {
    setIsDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  const sections = {
    education: {
      title: 'Education',
      content: [
        {
          "school": "National University of Singapore (NUS)",
          "degree": "Master of Computing (ARTIFICIAL INTELLIGENCE specialisation)",
          "date": "Aug 2024 – Future(Dec 2025)",
        },
        {
          "school": "Macau University of Science and Technology (MUST)",
          "degree": "Bachelor of Science in Computer Science (Minor in Artificial Intelligence)",
          "date": "Sep 2020 – Jun 2024",
          "details": [
            "GPA: 3.76/4 (Ranked in top 5%, 4/160+)",
            "Received full scholarship of 250,000 CNY for Master's program",
            "Dean's List Student",
            "Vice President of Computer Science and Engineering Student Association",
            "Core Courses: Graduation Project (A+), Machine Learning (A+), Computer Programming (A+), Data Structures (A), Digital Logic (A+), Database Systems (A+), etc."
          ]
        }
      ]
    },
    publications: {
      title: 'Publications',
      content: [
        'Hu, S., & Wang, X. (2024). FOKE: A Personalized and Explainable Education Framework Integrating Foundation Models, Knowledge Graphs, and Prompt Engineering. Communications in Computer and Information Science, vol 2161. Springer.',
        'Qiu, Y., Liu, H., Lin, Y., Hu, S., Wei, W., & Wang, X. (2023, December). Knowledge-graph relation extraction for Chinese business datasets. In AHPCAI 2023 (Vol. 12941, pp. 678-687). SPIE.',
        'Shen, M., Chen, D., Hu, S., & Xu, G. (2023). Class incremental learning of remote sensing images based on class similarity distillation. PeerJ Computer Science, 9, e1583.'
      ]
    },
    research: {
      title: 'Research',
      content: [
        {
          title: 'FOKE: A Personalized and Explainable Education Framework',
          location: 'Beijing, China',
          date: 'Jan 2024 – Mar 2024',
          details: ['Proposed a new framework applying LLMs to personalized education and developed practical application products.']
        },
        {
          title: 'Knowledge-Graph Relation Extraction for Chinese Business Datasets',
          location: 'Online',
          date: 'Jun 2023 – Aug 2023',
          details: ['Filtered and optimized high-quality data and trained existing relation extraction algorithms on the constructed KG.']
        },
        {
          title: 'Point Cloud Recognition by 3D Lidar in a Hybrid Approach of ATSS and Big kernel',
          location: 'Macau, China',
          date: 'Feb 2023 – Jun 2023',
          details: ['Validated on GAC Research Institute\'s cloud computing platform, our method excelled in real traffic scenarios such as high-speed driving and low-speed parking.']
        }
      ]
    },
    experience: {
      title: 'Experience',
      content: [
        {
          "company": "Beijing Stats City Data Technology Co., Ltd.",
          "role": "Full Stack Engineer",
          "date": "Jan 2024 – Now",
          "details": [
            "Scholar Hero: Led a student startup team to develop an AI-powered educational application. Currently, it has 300 users, received recognition and funding support from the Communication University of China, and attracted attention from top Chinese universities. Published a paper as the first author, with patents and software copyrights pending."
          ]
        },
        {
          "company": "Lenovo (Beijing) Co. Ltd",
          "role": "Research Intern",
          "date": "Jun 2023 – Sep 2023",
          "details": [
            "Knowledge and Training System: Led a team of 3 interns to fine-tune large language models and develop Lenovo's internal AI training system (intelligent recommendation and virtual teaching) using Flask and Vue3. Established the internal network for project deployment, configuring network equipment including NAS and computational resources.",
            "Stable Diffusion Launcher: This is the precursor to the AI image generation software pre-installed on Lenovo AI PCs."
          ]
        },
        {
          "company": "Ipsos China",
          "role": "Market Research Analysis Intern",
          "date": "Jul 2022 – Aug 2022",
          "details": [
            "Used Octopus crawler tool to collect product data for AIoT smart in-vehicle devices, extracted and analyzed questionnaire data using SPSS, and conducted industry surveys on current AIoT smart in-vehicle devices using Microsoft Excel.",
            "Gained familiarity with market research processes, improved data collection, organization, and analysis skills, and received the Outstanding Project Award for the market research internship project."
          ]
        },
        {
          "company": "Chaoyang District 'Youth Elite' Internship Program",
          "role": "Summer Intern",
          "date": "Jul 2021 – Aug 2021",
          "details": [
            "Participated in immersive learning experiences at HSBC Bank, Deloitte China, Siemens (China) Co., Ltd., and Beijing Greenenvision Technology Co., Ltd., gaining in-depth understanding of banking, risk and financial consulting, auditing, management consulting, corporate structure, and AI technologies.",
            "Gained comprehensive understanding of operations and culture in renowned companies, expanded skills in finance, management, auditing, and artificial intelligence, and improved practical abilities in case analysis and business plan development."
          ]
        }
      ]
    },
    awards: {
      title: 'Awards',
      content: [
        'Oct 2023 Verified Certificate - LLM102x: Large Language Models (Awarded by Databricks & edX)',
        'Dec 2022 Dean\'s Merit in Macau University of Science and Technology (TOP 5%)',
        'Sep 2022 2022 Macau Cybersecurity Technology Competition – University Division Distinction Award',
        'May 2022 2022 Greater Bay Area IT Application System Development Competition - Finalist Award (TOP 6 Teams)',
        'Oct 2021 First Prize of the Macao University of Science and Technology\'s Cultural and Academic Excellence Award',
        'Apr 2021 Global Entrepreneurship Exchange - Spring 2021，Third place team (Top 5%/20 Countries, 81 Teams)'
      ]
    },
    skills: {
      title: 'Skills',
      content: ['Python', 'C/C++', 'Go','PHP', 'Machine Learning', 'MySQL', 'VUE3', 'Android App Development', 'Desktop Software Development', 'Innovation']
    }
  };

  const bgGradient = isDarkMode
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'
    : 'bg-gradient-to-br from-white via-purple-50 to-indigo-100';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const highlightColor = isDarkMode ? 'text-purple-300' : 'text-purple-600';

  return (
    <div className={`min-h-screen ${bgGradient} ${textColor} transition-all duration-500`}>
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <motion.h1 
            className={`text-6xl font-bold mb-2 ${highlightColor}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Silan Hu
          </motion.h1>
          <motion.p 
            className="text-2xl mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            AI Researcher & Full Stack Developer
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-4 flex-wrap"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a href="mailto:Silan.Hu@u.nus.edu" className={`flex items-center hover:${highlightColor} transition-colors`}>
              <Mail className="mr-2" /> Email
            </a>
            <a href="tel:+6586986181" className={`flex items-center hover:${highlightColor} transition-colors`}>
              <Phone className="mr-2" /> +65 86986181
            </a>
            <span className="flex items-center">
              <MapPin className="mr-2" /> Singapore🇸🇬 / Beijing, China🇨🇳
            </span>
          </motion.div>
          <motion.div 
            className="mt-4 flex justify-center space-x-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a href="https://linkedin.com/in/qingbolan" className={`${textColor} hover:${highlightColor} transition-colors`}>
              <Linkedin size={24} />
            </a>
            <a href="https://github.com/Qingbolan" className={`${textColor} hover:${highlightColor} transition-colors`}>
              <Github size={24} />
            </a>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`${textColor} hover:${highlightColor} transition-colors`}
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </motion.div>
        </header>

        <nav className="mb-12">
          <ul className="flex justify-center space-x-4 flex-wrap">
            {Object.keys(sections).map((key) => (
              <motion.li 
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeSection === key
                      ? `${isDarkMode ? 'bg-purple-600' : 'bg-purple-500'} text-white`
                      : `${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${textColor}`
                  }`}
                  onClick={() => setActiveSection(key)}
                >
                  {sections[key].title}
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>

        <main className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.section 
              key={activeSection}
              className={`${cardBgColor} rounded-lg p-6 shadow-xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className={`text-2xl font-bold mb-4 ${highlightColor}`}>{sections[activeSection].title}</h2>
              {activeSection === 'education' && (
                <ul className="space-y-4">
                  {sections.education.content.map((edu, index) => (
                    <motion.li 
                      key={index} 
                      className={`border-l-4 ${isDarkMode ? 'border-purple-500' : 'border-purple-400'} pl-4`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <h3 className="font-semibold text-lg">{edu.school}</h3>
                      <p>{edu.degree}</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{edu.date}</p>
                      {edu.details && (
                        <ul className="list-disc list-inside mt-2 text-sm">
                          {edu.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </motion.li>
                  ))}
                </ul>
              )}
              {activeSection === 'publications' && (
                <ul className="space-y-2">
                  {sections.publications.content.map((pub, index) => (
                    <motion.li 
                      key={index} 
                      className={`border-l-4 ${isDarkMode ? 'border-purple-500' : 'border-purple-400'} pl-4 py-2`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {pub}
                    </motion.li>
                  ))}
                </ul>
              )}
              {activeSection === 'research' && (
                <ul className="space-y-6">
                  {sections.research.content.map((research, index) => (
                    <motion.li 
                      key={index} 
                      className={`border-l-4 ${isDarkMode ? 'border-purple-500' : 'border-purple-400'} pl-4`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <h3 className="font-semibold text-lg">{research.title}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{research.location} | {research.date}</p>
                      <ul className="list-disc list-inside mt-2 text-sm">
                        {research.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    </motion.li>
                  ))}
                </ul>
              )}
              {activeSection === 'experience' && (
                <ul className="space-y-6">
                  {sections.experience.content.map((exp, index) => (
                    <motion.li 
                      key={index} 
                      className={`border-l-4 ${isDarkMode ? 'border-purple-500' : 'border-purple-400'} pl-4`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <h3 className="font-semibold text-lg">{exp.company}</h3>
                      <p>{exp.role}</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exp.date}</p>
                      <ul className="list-disc list-inside mt-2 text-sm">
                        {exp.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    </motion.li>
                  ))}
                </ul>
              )}
              {activeSection === 'awards' && (
                <ul className="space-y-2">
                  {sections.awards.content.map((award, index) => (
                    <motion.li 
                      key={index} 
                      className={`border-l-4 ${isDarkMode ? 'border-purple-500' : 'border-purple-400'} pl-4 py-2`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {award}
                    </motion.li>
                  ))}
                </ul>
              )}
              {activeSection === 'skills' && (
                <motion.ul 
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {sections.skills.content.map((skill, index) => (
                    <motion.li 
                      key={index} 
                      className={`${isDarkMode ? 'bg-purple-700' : 'bg-purple-200'} px-3 py-1 rounded-full text-sm`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </motion.section>
          </AnimatePresence>
        </main>

        <footer className={`text-center mt-12 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>&copy; 2024 Silan Hu. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default ResumeWebsite;
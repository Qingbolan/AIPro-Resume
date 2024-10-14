import { motion} from 'framer-motion';
import { useTheme } from '../ThemeContent';
import ProjectCard from './ProjectCard';

const TimelineView = ({ projects, onProjectClick }) => {
    const { isDarkMode } = useTheme();
  
    return (
      <div className="relative">
        <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${isDarkMode ? 'bg-purple-700' : 'bg-purple-300'}`}></div>
        {projects.map((project, index) => (
          <motion.div 
            key={project.id} 
            className={`mb-8 flex justify-${index % 2 === 0 ? 'end' : 'start'} items-center w-full`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
              <ProjectCard project={project} isTimelineView={true} onProjectClick={onProjectClick} />
            </div>
            <motion.div 
              className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full ${isDarkMode ? 'bg-purple-600' : 'bg-purple-500'} text-white flex items-center justify-center`}
              whileHover={{ scale: 1.2 }}
            >
              {project.year}
            </motion.div>
          </motion.div>
        ))}
      </div>
    );
  };

export default TimelineView;
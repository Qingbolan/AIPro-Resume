import { motion} from 'framer-motion';
import { useTheme } from '../ThemeContent';

const ProjectCard = ({ project, isTimelineView, onProjectClick }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div 
      className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer ${isTimelineView ? 'flex' : ''}`}
      whileHover={{ y: -5, boxShadow: isDarkMode ? "0 10px 20px rgba(255,255,255,0.1)" : "0 10px 20px rgba(0,0,0,0.1)" }}
      onClick={() => onProjectClick(project)}
    >
      <div className={`relative ${isTimelineView ? 'w-1/3' : 'w-full h-48'}`}>
        <img src={`/api/placeholder/${isTimelineView ? 150 : 300}/${isTimelineView ? 100 : 180}`} alt={project.name} className="object-cover w-full h-full" />
        <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-2 py-1 text-sm rounded-bl">
          {project.annualPlan}
        </div>
      </div>
      <div className={`p-4 ${isTimelineView ? 'w-2/3' : ''}`}>
        <h3 className="text-xl font-bold mb-2">{project.name}</h3>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2 ${isTimelineView ? 'line-clamp-2' : 'line-clamp-3'}`}>{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.tags.map(tag => (
            <span key={tag} className={`px-2 py-1 rounded-full text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>{tag}</span>
          ))}
        </div>
        <span className="text-sm text-gray-500">{project.year}</span>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
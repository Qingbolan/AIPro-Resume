import { motion } from 'framer-motion';
import { Calendar, Code, FileText, BarChart2, Settings } from 'lucide-react';

const QuickToolsBar = () => {
    const tools = [
      { icon: Code, name: "Code Editor" },
      { icon: FileText, name: "Note Taking" },
      { icon: Calendar, name: "Schedule" },
      { icon: BarChart2, name: "Analytics" },
      { icon: Settings, name: "Settings" }
    ];
  
    return (
      <motion.div 
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-lg p-2 flex space-x-2"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {tools.map((tool, index) => (
          <motion.button
            key={tool.name}
            className="p-2 rounded-full bg-white text-purple-600 hover:bg-purple-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => console.log(`Opening ${tool.name}`)}
          >
            <tool.icon size={24} />
          </motion.button>
        ))}
      </motion.div>
    );
  };

export default QuickToolsBar;
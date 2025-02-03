import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../ThemeContent';

const Carousel = ({ items }) => {
    const { isDarkMode } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [items.length]);

    return (
        <div className="relative w-full h-96 overflow-hidden rounded-xl mb-8 shadow-lg">
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-0 w-full h-full"
                >
                    {items[currentIndex]?.image && (
                        <img
                            src={items[currentIndex].image}
                            alt={items[currentIndex].title}
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div
                        className={`absolute bottom-0 left-0 right-0 p-6 text-white ${isDarkMode
                                ? 'bg-gradient-to-t from-gray-900 to-transparent'
                                : 'bg-gradient-to-t from-purple-900 to-transparent'
                            }`}
                    >
                        <motion.h2
                            key={`carousel-title-${isDarkMode}-${currentIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-bold mb-2"
                        >
                            {items[currentIndex]?.title}
                        </motion.h2>
                        <motion.p
                            key={`carousel-description-${isDarkMode}-${currentIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg"
                        >
                            {items[currentIndex]?.description}
                        </motion.p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Carousel;

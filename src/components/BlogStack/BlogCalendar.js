import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../ThemeContent';


const BlogCalendar = ({ events }) => {
    const { isDarkMode } = useTheme();
    const { t, i18n } = useTranslation();
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    let firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const getEventsForDay = (day) => {
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return (
                eventDate.getDate() === day &&
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear()
            );
        });
    };

    const isToday = (day) => {
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
    };

    // 根据 isDarkMode 设置事件类型对应的颜色
    const eventTypeColors = isDarkMode
        ? {
            ddl: 'bg-red-400',
            article: 'bg-blue-400',
            idea: 'bg-green-400',
            schedule: 'bg-yellow-400',
            default: 'bg-purple-400'
        }
        : {
            ddl: 'bg-red-500',
            article: 'bg-blue-500',
            idea: 'bg-green-500',
            schedule: 'bg-yellow-500',
            default: 'bg-purple-500'
        };

    // 本地化星期几名称
    const weekDays = [
        t('calendar.monday'),
        t('calendar.tuesday'),
        t('calendar.wednesday'),
        t('calendar.thursday'),
        t('calendar.friday'),
        t('calendar.saturday'),
        t('calendar.sunday')
    ];

    return (
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                    className={`${isDarkMode ? 'text-purple-300 hover:text-purple-500' : 'text-purple-600 hover:text-purple-800'}`}
                    aria-label={t('calendar.previousMonth')}
                >
                    <ChevronLeft />
                </button>

                {/* 使用 Framer Motion 为标题添加淡入动画（模拟闪烁效果） */}
                <motion.h3
                    key={`calendar-header-${isDarkMode}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`font-bold text-lg ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}
                >
                    {currentDate.toLocaleString(i18n.language, { month: 'long', year: 'numeric' })}
                </motion.h3>

                <button
                    onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                    className={`${isDarkMode ? 'text-purple-300 hover:text-purple-500' : 'text-purple-600 hover:text-purple-800'}`}
                    aria-label={t('calendar.nextMonth')}
                >
                    <ChevronRight />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {weekDays.map(day => (
                    <div key={day} className={`text-center text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {day}
                    </div>
                ))}
                {Array(firstDayOfMonth).fill(null).map((_, index) => (
                    <div key={`empty-${index}`} className="text-center py-2"></div>
                ))}
                {days.map(day => {
                    const dayEvents = getEventsForDay(day);
                    const eventTitles = dayEvents.map(e => t(`events.${e.type}`, { title: e.title })).join(', ');

                    // 根据日期是否为“今天”以及是否有事件设置不同的样式
                    const baseClasses = "text-center py-2 text-md cursor-pointer rounded relative";
                    const todayClasses = isToday(day)
                        ? (isDarkMode
                            ? "border-2 border-purple-300 text-purple-200"
                            : "border-2 border-purple-500 text-purple-800")
                        : "";
                    const eventClasses = dayEvents.length > 0
                        ? (isDarkMode
                            ? "bg-purple-900 text-purple-300 font-semibold hover:bg-purple-700"
                            : "bg-purple-100 text-purple-800 font-semibold hover:bg-purple-200")
                        : (isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100");

                    return (
                        <motion.div
                            key={day}
                            className={`${baseClasses} ${todayClasses} ${eventClasses}`}
                            whileHover={{ scale: 1.05 }}
                            title={eventTitles}
                            aria-label={t('calendar.dateWithEvents', {
                                date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toLocaleDateString(i18n.language),
                                events: eventTitles || t('calendar.noEvents')
                            })}
                        >
                            {day}
                            <div className="flex justify-center mt-1 space-x-1">
                                {dayEvents.map((event, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full ${eventTypeColors[event.type] || eventTypeColors.default}`}
                                        title={t(`events.${event.type}`, { title: event.title })}
                                    ></div>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};


export default BlogCalendar;
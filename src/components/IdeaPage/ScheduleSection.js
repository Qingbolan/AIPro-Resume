import React, { useState, useEffect } from 'react';
import { ChevronDown} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart } from "react-google-charts";

const GanttChart = ({ tasks, view }) => {
    const columns = [
        { type: "string", label: "Task ID" },
        { type: "string", label: "Task Name" },
        { type: "string", label: "Resource" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" },
    ];

    const now = new Date();

    const getViewDates = (tasks, view) => {
        let startDate, endDate;

        // Helper function to set time to 6:00 AM
        const setTo6AM = (date) => {
            date.setHours(6, 0, 0, 0);
            return date;
        };

        if (tasks.length > 0) {
            startDate = new Date(Math.min(...tasks.map(task => new Date(task.start))));
            endDate = new Date(Math.max(...tasks.map(task => new Date(task.end))));

            if (view === 'day') {
                startDate = setTo6AM(new Date(startDate));
                endDate = setTo6AM(new Date(endDate));
                if (startDate.getTime() === endDate.getTime()) {
                    endDate.setDate(endDate.getDate() + 1);
                }
            } else if (view === 'week') {
                startDate = setTo6AM(new Date(startDate));
                startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7)); // Adjust to previous Monday
                endDate = setTo6AM(new Date(endDate));
                endDate.setDate(endDate.getDate() + (7 - endDate.getDay()) % 7 + 1); // Adjust to next Monday
            }
        } else {
            // If no tasks, default to current day or week
            startDate = setTo6AM(new Date(now));
            if (view === 'week') {
                startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7)); // Adjust to Monday
            }
            endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + (view === 'week' ? 7 : 1));
        }

        return { startDate, endDate };
    };

    const { startDate: viewStartDate, endDate: viewEndDate } = getViewDates(tasks, view);

    let data, options;

    if (view === 'week') {
        const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const rows = weekDays.map((day, index) => {
            const dayStart = new Date(viewStartDate);
            dayStart.setDate(dayStart.getDate() + index);
            const dayEnd = new Date(dayStart);
            dayEnd.setDate(dayEnd.getDate() + 1);

            return [
                day,
                day,
                null,
                dayStart,
                dayEnd,
                null,
                0,
                null
            ];
        });

        tasks.forEach(task => {
            const taskStart = new Date(task.start);
            const taskEnd = new Date(task.end);

            // 检查任务是否在当前周视图范围内
            if (taskStart < viewEndDate && taskEnd > viewStartDate) {
                const dayIndex = (taskStart.getDay() + 6) % 7; // Adjust so Monday is 0

                rows[dayIndex].push(
                    task.id.toString(),
                    task.title,
                    task.resource || "",
                    taskStart,
                    taskEnd,
                    null,
                    task.percentComplete || 0,
                    null
                );
            }
        });

        data = [columns, ...rows];
        options = {
            height: '100%',
            width: '100%',
            timeline: {
                showRowLabels: true,
                groupByRowLabel: true
            },
            hAxis: {
                format: 'HH:mm',
                minValue: viewStartDate,
                maxValue: viewEndDate
            }
        };
    } else {
        // Day view
        const rows = tasks
            .filter(task => {
                const taskStart = new Date(task.start);
                const taskEnd = new Date(task.end);
                return taskStart < viewEndDate && taskEnd > viewStartDate;
            })
            .map((task) => {
                const startDate = new Date(task.start);
                const endDate = new Date(task.end);
                if (isNaN(startDate.valueOf()) || isNaN(endDate.valueOf())) {
                    console.error(`Invalid date for task: ${task.title}`);
                    return null;
                }
                return [
                    task.id.toString(),
                    task.title,
                    task.resource || "",
                    startDate,
                    endDate,
                    null,
                    task.percentComplete || 0,
                    null,
                ];
            })
            .filter(row => row !== null);

        // Add dummy tasks to ensure full 24-hour view
        rows.push([
            "start_dummy",
            "",
            null,
            viewStartDate,
            new Date(viewStartDate.getTime() + 1000), // 1 second after start
            null,
            100,
            null
        ]);
        rows.push([
            "end_dummy",
            "",
            null,
            new Date(viewEndDate.getTime() - 1000), // 1 second before end
            viewEndDate,
            null,
            100,
            null
        ]);

        data = [columns, ...rows];
        options = {
            height: '100%',
            width: '100%',
            gantt: {
                trackHeight: 30,
                barHeight: 20,
                criticalPathEnabled: false,
                innerGridHorizLine: { stroke: '#e0e0e0', strokeWidth: 1 },
                innerGridTrack: { fill: '#f5f5f5' },
                innerGridDarkTrack: { fill: '#e9e9e9' }
            },
            hAxis: {
                format: 'HH:mm',
                gridlines: { count: 24, units: { hours: { format: ['HH:mm'] } } },
                textStyle: { fontSize: 10 },
                minValue: viewStartDate,
                maxValue: viewEndDate
            },
            vAxis: { textStyle: { fontSize: 10 } },
            backgroundColor: 'transparent',
            chartArea: {
                left: '10%',
                right: '5%',
                top: '5%',
                width: '100%',
                height: '90%'
            },
        };
    }

    function calculateTimelinePosition() {
        const viewDuration = viewEndDate.getTime() - viewStartDate.getTime();
        const nowTime = now.getTime();

        // Adjust current time to fit within the 6AM to 6AM timeframe
        let adjustedNow = new Date(nowTime);
        if (adjustedNow.getHours() < 6) {
            adjustedNow.setDate(adjustedNow.getDate() + 1);
        }
        adjustedNow.setHours(adjustedNow.getHours(), adjustedNow.getMinutes(), 0, 0);

        const elapsedDuration = adjustedNow.getTime() - viewStartDate.getTime();
        const position = (elapsedDuration / viewDuration) * 100;
        return Math.max(0, Math.min(100, position));
    }

    const timelinePosition = calculateTimelinePosition();

    return (
        <div className="w-full h-0 pb-[40%] relative">
            <div className="absolute top-0 left-0 w-full h-full">
                <Chart
                    chartType={view === 'week' ? 'Timeline' : 'Gantt'}
                    width="100%"
                    height="100%"
                    data={data}
                    options={options}
                />
                <div
                    className="absolute top-0 bottom-0 w-px bg-red-500"
                    style={{
                        left: `${timelinePosition}%`,
                        pointerEvents: 'none'
                    }}
                />
            </div>
        </div>
    );
};

const ScheduleSection = ({ tasks }) => {
    const [view, setView] = useState('day');
    const [displayTasks, setDisplayTasks] = useState([]);

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const parseDateTime = (dateTimeString) => {
            const [datePart, timePart] = dateTimeString.split(' ');
            const [year, month, day] = datePart.split('-').map(Number);
            const [hours, minutes, seconds] = timePart.split(':').map(Number);
            return new Date(year, month - 1, day, hours, minutes, seconds);
        };

        if (view === 'day') {
            const todayTasks = tasks.filter(task => {
                const taskDate = parseDateTime(task.start);
                return taskDate.toDateString() === today.toDateString();
            });
            setDisplayTasks(todayTasks);
        } else {
            // 获取本周一的日期
            const monday = new Date(today) - 2;
            monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
            monday.setHours(0, 0, 0, 0);

            // 获取下周一的日期
            const nextMonday = new Date(monday);
            nextMonday.setDate(nextMonday.getDate() + 7);

            console.log('Week range:', monday, 'to', nextMonday);

            const weekTasks = tasks.filter(task => {
                const taskStart = parseDateTime(task.start);
                const taskEnd = parseDateTime(task.end);

                // 调试信息
                console.log('Task:', task.title, 'Start:', taskStart, 'End:', taskEnd);

                // 任务在本周内开始或结束，或者跨越整个周期
                const isInWeek = (taskStart >= monday && taskStart < nextMonday) ||
                    (taskEnd > monday && taskEnd <= nextMonday) ||
                    (taskStart <= monday && taskEnd >= nextMonday);

                console.log('Is in week:', isInWeek);

                return isInWeek;
            });

            console.log('Filtered week tasks:', weekTasks);
            setDisplayTasks(weekTasks);
        }
    }, [view, tasks]);

    return (
        <section className="mb-8 bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-purple-800">时间安排</h3>
                <div className="relative inline-block text-left">
                    <select
                        value={view}
                        onChange={(e) => setView(e.target.value)}
                        className="block appearance-none w-full bg-white border border-purple-300 hover:border-purple-500 px-3 py-1 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline text-sm"
                    >
                        <option value="day">今日计划</option>
                        <option value="week">本周安排</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-purple-700">
                        <ChevronDown size={16} />
                    </div>
                </div>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    {displayTasks.length > 0 ? (
                        <GanttChart tasks={displayTasks} view={view} />
                    ) : (
                        <p className="text-center text-gray-500 py-4">
                            {view === 'day' ? '今天没有公示的计划' : '本周没有公示的计划'}
                        </p>
                    )}
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

export default ScheduleSection;
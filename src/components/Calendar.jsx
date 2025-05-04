import CalendarDate from './CalendarDate';
import React, { useState, useEffect } from 'react';
import { ReactComponent as ArrowRightIcon } from '../styles/svg/arrow-right.svg';
import { ReactComponent as ArrowLeftIcon } from '../styles/svg/arrow-left.svg';
import { getDateInfo, getMonthName, splitDaysIntoWeeks } from '../utils/calendar';

function Calendar({show}) {
    const events = [
        {
            type: 'Лекция',
            groupNumber: '17B',
            theme: '3',
            date: '31.03.2025',
            time: '18:00'
        },
        {
            type: 'Лекция',
            groupNumber: '18A',
            theme: '2',
            date: '04.04.2025',
            time: '18:00'
        },
        {
            type: 'Зачёт',
            groupNumber: '17B',
            theme: 3,
            date: '08.04.2025',
            time: '18:00'
        },
        {
            type: 'Вождение',
            student: 'Рычкова П. А.',
            instructor: 'Сидоров А. Г.',
            date: '16.04.2025',
            time: '13:00'
        },
        {
            type: 'Вождение',
            student: 'Рычкова П. А.',
            instructor: 'Сидоров А. Г.',
            date: '17.04.2025',
            time: '13:00'
        },
        {
            type: 'Вождение',
            student: 'Мелихов Д. О.',
            instructor: 'Сидоров А. Г.',
            date: '22.04.2025',
            time: '15:00'
        }
    ];

    const currentDate = new Date();
    const currentDateInfo = getDateInfo(currentDate);
    const selectedMonthList = [];
    const selectedMonthDates = [];

    const [selectedMonth, setSelectedMonth] = useState({ id: currentDate.getMonth(), name: currentDateInfo.monthLong });
    const [calendarWeeks, setWeeks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(currentDateInfo.fullDate); // Track selected date

    const updateCalendar = (month, year) => {
        const firstDayCurrentMonth = new Date(year, month, 1);
        const firstDayNextMonth = new Date(year, month + 1, 1);
        const lastDayCurrentMonth = new Date(firstDayNextMonth - 1);
        const firstDayCurrentMonthInfo = getDateInfo(firstDayCurrentMonth);
        const lastDayPrevMonth = new Date(firstDayCurrentMonth - 1);
        const lastDayCurrentMonthInfo = getDateInfo(lastDayCurrentMonth);
        const daysInCurrentMonth = lastDayCurrentMonth.getDate();

        // Add days from the previous month
        for (let i = 0; i < firstDayCurrentMonthInfo.dayIndex; i++) {
            let day = getDateInfo(new Date(year, month - 1, lastDayPrevMonth.getDate() - i));
            selectedMonthDates.unshift({ date: day.fullDate, isCurrentMonth: false });
        }

        // Add days from the current month
        for (let i = 1; i <= daysInCurrentMonth; i++) {
            const day = getDateInfo(new Date(year, month, i));
            selectedMonthDates.push({ date: day.fullDate, isCurrentMonth: true });
        }

        // Add days from the next month
        for (let i = 1; i <= 6 - lastDayCurrentMonthInfo.dayIndex; i++) {
            const day = getDateInfo(new Date(year, month + 1, i));
            selectedMonthDates.push({ date: day.fullDate, isCurrentMonth: false });
        }

        selectedMonthDates.forEach(element => {
            let eventList = events.filter(obj => obj.date === element.date);
            selectedMonthList.push(eventList.length > 0 ? {
                date: element.date,
                isCurrentMonth: element.isCurrentMonth,
                events: eventList
            } : {
                date: element.date,
                isCurrentMonth: element.isCurrentMonth,
                events: []
            });
        });

        setWeeks(splitDaysIntoWeeks(selectedMonthList));
    };

    const prevMonth = () => {
        setSelectedMonth(prev => {
            const newId = prev.id === 0 ? 11 : prev.id - 1;
            const newName = getMonthName(newId);
            return { id: newId, name: newName };
        });
    };

    const nextMonth = () => {
        setSelectedMonth(prev => {
            const newId = prev.id === 11 ? 0 : prev.id + 1;
            const newName = getMonthName(newId);
            return { id: newId, name: newName };
        });
    };

    useEffect(() => {
        updateCalendar(selectedMonth.id, currentDateInfo.year);
    }, [selectedMonth]);

    const handleDateClick = (date) => {
        setSelectedDate(date); // Set the selected date
        show(date)
        console.log(`type of date: ${typeof(date)}`)
    };

    return (
        <table className="calendar-table">
            <thead>
                <tr>
                    <td colSpan="7">
                        <div>
                            <ArrowLeftIcon onClick={prevMonth} className="nav-button" />
                            <p>{selectedMonth.name}</p>
                            <ArrowRightIcon onClick={nextMonth} className="nav-button" />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><p>ПН</p></td>
                    <td><p>ВТ</p></td>
                    <td><p>СР</p></td>
                    <td><p>ЧТ</p></td>
                    <td><p>ПТ</p></td>
                    <td><p className="red-text">СБ</p></td>
                    <td><p className="red-text">ВС</p></td>
                </tr>
            </thead>
            <tbody>
                {calendarWeeks.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                        {week.map((day, dayIndex) => (
                            <td key={dayIndex}>
                                <CalendarDate
                                    props={{
                                        fullDate: day.date,
                                        date: day.date.slice(0, 2),
                                        isCurrentMonth: day.isCurrentMonth,
                                        eventsCount: day.events.length,
                                        selected: day.date === selectedDate, // Check if this day is selected
                                        onClick: () => handleDateClick(day.date) // Set click handler
                                    }}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Calendar;
import CalendarDate from './CalendarDate';
import React, { useState, useEffect, useContext } from 'react';
import { ReactComponent as ArrowRightIcon } from '../styles/svg/arrow-right.svg';
import { ReactComponent as ArrowLeftIcon } from '../styles/svg/arrow-left.svg';
import { getDateInfo, getMonthName, splitDaysIntoWeeks } from '../utils/calendar';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const Calendar = observer(({events}) => {

  const {eventStore} = useContext(Context);

  const currentDate = new Date();
  const currentDateInfo = getDateInfo(currentDate);

  const selectedMonthList = [];
  const selectedMonthDates = [];

  const [selectedMonth, setSelectedMonth] = useState({ id: currentDate.getMonth(), name: currentDateInfo.monthLong });
  const [calendarWeeks, setWeeks] = useState([]);

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

  useEffect(() => {
    eventStore.setSelectedDate(currentDateInfo.fullDate)
  }, [])
  

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
    eventStore.setSelectedDate(date)
  };

  return (
    <table className="normal-text calendar-table">
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
                  fullDate={day.date}
                  date={day.date.slice(day.date.length - 2)}
                  isCurrentMonth={day.isCurrentMonth}
                  eventsCount={day.events.length}
                  selected={day.date == eventStore.selectedDate}
                  onClick={() => handleDateClick(day.date) }
                  isPast={day.events.every(item => item.status === 'Проведено')}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
})

export default Calendar;
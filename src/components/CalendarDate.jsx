import { observer } from "mobx-react-lite";

const CalendarDate = ({fullDate, date, isCurrentMonth, eventsCount, selected, onClick, isPast}) => {
    const dateClass = 'calendar-table-date' + (isCurrentMonth ? ' current-month' : '');
    const frameClass = 'selected-frame' + (eventsCount > 0 ? ' busy' : '') + (selected === true ? ' selected' : '') + (isPast && eventsCount !== 0 ? ' calendar-past-event' : '');

    return (
        <div className={frameClass} onClick={onClick}>
            <div className="calendar-table-item">
                <p className={dateClass}>{date}</p>
                <div className="calendar-table-count-container">
                    <p>{eventsCount}</p>
                </div>
            </div>
        </div>
    );
  }
  
  export default CalendarDate;
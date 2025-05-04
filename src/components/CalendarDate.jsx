const CalendarDate = ({props}) => {
    const dateClass = 'calendar-table-date' + (props.isCurrentMonth ? ' current-month' : '');
    const frameClass = 'selected-frame' + (props.eventsCount > 0 ? ' busy' : '') + (props.selected === true ? ' selected' : '');
    return (
        <div className={frameClass} onClick={props.onClick}>
            <div className="calendar-table-item">
                <p className={dateClass}>{props.date}</p>
                <div className="calendar-table-count-container">
                    <p>{props.eventsCount}</p>
                </div>
            </div>
        </div>
    );
  }
  
  export default CalendarDate;
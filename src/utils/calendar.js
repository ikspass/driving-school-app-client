export const getMonthName = month => {
    const monthesNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    return monthesNames[month];
}
export const getDateInfo = date => {
    const monthesIndex = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const weekDays = {0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5}
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    return {
        day: day,
        monthShort: monthesIndex[date.getMonth()],
        monthLong: getMonthName(date.getMonth()),
        monthIndex: date.getMonth(),
        year: date.getFullYear(),
        fullDate: `${date.getFullYear()}-${monthesIndex[date.getMonth()]}-${day}`,
        dayIndex: weekDays[date.getDay()]
    }
} 

export const splitDaysIntoWeeks = month => {
    const weeks = [];
    
    for (let i = 0; i < month.length; i += 7) {
      const week = month.slice(i, i + 7);
      weeks.push(week);
    }
    
    return weeks;
}
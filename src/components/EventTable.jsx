import EditButton from "./UI/FunctionButton/EditButton";
import DeleteButton from "./UI/FunctionButton/DeleteButton";

const EventTable = ({ event }) => {
  const lectureColumns = [
    { key: 'type', label: 'Событие', isLink: false },
    { key: 'date', label: 'Дата', isLink: false },
    { key: 'time', label: 'Время', isLink: false },
    { key: 'group.name', label: 'Группа', isLink: true },
    { key: 'teacher.user.fullName', label: 'Преподаватель', isLink: true },
    { key: 'chapters', label: 'Материалы', isLink: true },
  ];

  const testColumns = [
    { key: 'type', label: 'Событие', isLink: false },
    { key: 'date', label: 'Дата', isLink: false },
    { key: 'time', label: 'Время', isLink: false },
    { key: 'group.name', label: 'Группа', isLink: false },
    { key: 'test', label: 'Зачёт/экзамен', isLink: true },
  ];

  const drivingColumns = [
    { key: 'type', label: 'Событие', isLink: false },
    { key: 'date', label: 'Дата', isLink: false },
    { key: 'time', label: 'Время', isLink: false },
    { key: 'student.user.fullName', label: 'Студент', isLink: true },
    { key: 'instructor.user.fullName', label: 'Преподаватель', isLink: true },
  ];

  const renderTableRows = (columns) => {
    return columns.map((item, itemIndex) => {
      const value = item.key.split('.').reduce((o, key) => (o ? o[key] : undefined), event);

      return (
        <tr key={itemIndex}>
          <td>{item.label}</td>
          <td>{value !== undefined ? value : '—'}</td>
        </tr>
      );
    });
  };

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'row', gap: '10px', height: 'min-content' }}>
      <table className="event-table normal-text">
        <tbody>
          {event.type === 'Лекция' && renderTableRows(lectureColumns)}
          {event.type === 'Зачёт' && renderTableRows(testColumns)}
          {event.type === 'Вождение' && renderTableRows(drivingColumns)}
        </tbody>
      </table>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <EditButton />
        <DeleteButton />
      </div>
    </div>
  );
};

export default EventTable;
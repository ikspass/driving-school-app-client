import EditButton from "./UI/FunctionButton/EditButton";
import DeleteButton from "./UI/FunctionButton/DeleteButton";
import { GROUP_ROUTE, TEACHER_ROUTE } from "../utils/consts";
import { useNavigate } from 'react-router-dom';

const EventTable = ({ event }) => {
  const navigate = useNavigate();

  const lectureColumns = [
    { key: 'type', label: 'Событие', isLink: false },
    { key: 'date', label: 'Дата', isLink: false },
    { key: 'time', label: 'Время', isLink: false },
    { key: 'group.name', label: 'Группа', isLink: true, navigateTo: (row) => `${GROUP_ROUTE}/${row.group.id}` },
    { key: 'teacher.user.fullName', label: 'Преподаватель', isLink: true, navigateTo: (row) => `${TEACHER_ROUTE}/${row.teacher.id}` },
    { key: 'topic.name', label: 'Материалы', isLink: true },
  ];

  const testColumns = [
    { key: 'type', label: 'Событие', isLink: true },
    { key: 'date', label: 'Дата', isLink: false },
    { key: 'time', label: 'Время', isLink: false },
    { key: 'group.name', label: 'Группа', isLink: false },
    { key: 'test', label: 'Зачёт/экзамен', isLink: true },
  ];

  const drivingColumns = [
    { key: 'type', label: 'Событие', isLink: true },
    { key: 'date', label: 'Дата', isLink: false },
    { key: 'time', label: 'Время', isLink: false },
    { key: 'student.user.fullName', label: 'Студент', isLink: true },
    { key: 'instructor.user.fullName', label: 'Преподаватель', isLink: true },
  ];

  const getValue = (row, key) => {
    return key.split('.').reduce((acc, part) => acc && acc[part], row);
  };

  const renderTableRows = (columns) => {
    return columns.map((item, itemIndex) => {
      const value = getValue(event, item.key);
      return (
        <tr key={itemIndex}>
          <td>{item.label}</td>
          <td>
            {Array.isArray(value) ? (
              value.length > 0 ? (
                value.map((v, index) => (
                  <div key={index}>
                    {item.isLink ? (
                      <p className='link-text' onClick={() => navigate(item.navigateTo ? item.navigateTo(event) : '#')}>
                        {v}
                      </p>
                    ) : (
                      <p className="normal-text">{v}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="normal-text">-</p>
              )
            ) : (
              value !== undefined ? (
                item.isLink ? (
                  <p className='link-text' onClick={() => navigate(item.navigateTo ? item.navigateTo(event) : '#')}>
                    {value}
                  </p>
                ) : (
                  <p className="normal-text">{value}</p>
                )
              ) : (
                <p className="normal-text">—</p>
              )
            )}
          </td>
        </tr>
      );
    });
  };

  return (
    event ? 
    <div style={{ display: 'flex', width: '100%', flexDirection: 'row', gap: '10px', height: 'min-content' }}>
      <table className={event.status === 'Идёт' ? 'event-table current-event normal-text' : 'event-table normal-text'}>
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
    :
    <table className="event-table normal-text">
      <tbody>
        <tr>
          <td>
            <p className="normal-text">Данные отсутствуют</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EventTable;
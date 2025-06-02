import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDrivingEventById } from '../http/eventAPI';
import DescriptionTable from '../components/DescriptionTable';
import { ERROR_PAGE, INSTRUCTOR_ROUTE, STUDENT_ROUTE } from '../utils/consts';
import Button from '../components/UI/Button/Button';
import { Context } from '..';
import { fetchUserById } from '../http/adminAPI';

const DrivingPage = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [user, setUser] = useState({})

  const navigate = useNavigate();

  const { userStore } = useContext(Context)
  const role = userStore.user.role;
  
  const [transportTable, setTransportTable] = useState([]);
  const [eventTable, setEventTable] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserById(userStore.user.id);
        setUser(userData);

        const eventData = await fetchDrivingEventById(id);
        setEvent(eventData);

        const studentDrivings = eventData.student.drivings;
        const driving = studentDrivings.find(driving => driving.id === eventData.id);
    
        setEventTable([
          { key: 'Курсант', value: eventData.student.user.fullName, link: `${STUDENT_ROUTE}/${eventData.studentId}` },
          { key: 'Инструктор', value: eventData.instructor.user.fullName, link: `${INSTRUCTOR_ROUTE}/${eventData.instructorId}` },
          { key: 'Локация', value: eventData.place.value },
          { key: 'Номер занятия', value: driving.id + 1 },
        ]);

        const transport = eventData.transport;
    
        setTransportTable([
          { key: 'Название', value: transport.name },
          { key: 'Регистрационный номер', value: transport.sign },
          { key: 'Цвет', value: transport.color },
        ]);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        if (role === 'student') {
          const drivings = user.student?.drivings;
        
          if (!drivings.some(driving => driving.id == id)) {
            navigate(ERROR_PAGE);
          }
        }
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-container">
      <div className="heading-text-2 frame" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Вождение</p>
        <p>{event.time}</p>
        <p>{event.date}</p>
      </div>
      <div className="filter-container">
        <p className="heading-text-2">Информация</p>
        <DescriptionTable value={eventTable} />
      </div>
      <div className="filter-container">
        <p className="heading-text-2">Транспорт</p>
        <DescriptionTable value={transportTable} />
      </div>
      {event.instructorId === user.instructor?.id && event.status === 'В будущем' &&
        <Button>Начать занятие</Button>
      }
      {event.instructorId === user.instructor?.id && event.status === 'Идёт' &&
        <Button>Завершить занятие</Button>
      }
    </div>
  );
};

export default DrivingPage;
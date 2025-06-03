import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteDrivingEvent, fetchDrivingEventById, updateDrivingEventStatus } from '../http/eventAPI';
import DescriptionTable from '../components/DescriptionTable';
import { ERROR_PAGE, INSTRUCTOR_ROUTE, SCHEDULE_ROUTE, STUDENT_ROUTE } from '../utils/consts';
import Button from '../components/UI/Button/Button';
import { Context } from '..';
import { fetchUserById } from '../http/adminAPI';
import { getDateInfo } from '../utils/calendar';
import WarningModal from '../components/WarningModal';

const DrivingPage = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [user, setUser] = useState({})
  const [isToday, setIsToday] = useState(false)

  const navigate = useNavigate();

  const { userStore } = useContext(Context)
  const role = userStore.user.role;
  
  const [transportTable, setTransportTable] = useState([]);
  const [eventTable, setEventTable] = useState([]);
  const [warningModal, setWarningModal] = useState(false)

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

      const currentDate = new Date();
      const currentDateInfo = getDateInfo(currentDate);

      setIsToday(currentDateInfo.fullDate === eventData.date)

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

  useEffect(() => {
    fetchData();
  }, []);

  const startEvent = async () => {
    await updateDrivingEventStatus(id, 'Идёт');
    fetchData()
  }

  const finishEvent = async () => {
    await updateDrivingEventStatus(id, 'Проведено');
    fetchData();
  }

  const deleteEvent = async () => {
    await deleteDrivingEvent(id);
    navigate(SCHEDULE_ROUTE);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-container">
      <div className="heading-text-2 frame" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Вождение</p>
        <p>{event.status}</p>
        <p>{event.time}</p>
        <p>{event.date}</p>
      </div>
      {event.instructorId === user.instructor?.id && event.status === 'В будущем' &&
      <div className="button-container" style={{alignSelf: 'end'}}>
        <Button disabled={!isToday} onClick={startEvent} style={{width: '100%'}}>Начать занятие</Button>
        <Button className="danger" onClick={() => setWarningModal(true)} style={{width: '100%'}}>Отменить занятие</Button>
        <WarningModal 
          text='Вы уверены что хотите отменить занятие?'
          isOpen={warningModal}
          onConfirm={() => {
            setWarningModal(false)
            deleteEvent()
          }}
          onCancel={() => setWarningModal(false)}
        />
      </div>
      }
      {event.instructorId === user.instructor?.id && event.status === 'Идёт' &&
        <Button onClick={finishEvent}>Завершить занятие</Button>
      }
      <div className="filter-container">
        <p className="heading-text-2">Информация</p>
        <DescriptionTable value={eventTable} />
      </div>
      <div className="filter-container">
        <p className="heading-text-2">Транспорт</p>
        <DescriptionTable value={transportTable} />
      </div>
    </div>
  );
};

export default DrivingPage;
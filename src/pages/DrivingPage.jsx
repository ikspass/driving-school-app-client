import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { deleteDrivingEvent, fetchDrivingEventById, updateDrivingEventStatus } from '../http/eventAPI';
import DescriptionTable from '../components/DescriptionTable';
import { ADMIN_ROUTE, INSTRUCTOR_ROUTE, SCHEDULE_ROUTE, STUDENT_ROUTE } from '../utils/consts';
import Button from '../components/UI/Button/Button';
import { Context } from '..';
import { fetchUserById } from '../http/adminAPI';
import { getDateInfo } from '../utils/calendar';
import WarningModal from '../components/WarningModal';
import ButtonBack from '../components/UI/ButtonBack/ButtonBack';
import Modal from '../components/Modal';
import AdminChangeStatus from '../components/admin/AdminChangeStatus';

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
  const [updateStatusModal, setUpdateStatusModal] = useState(false)

  const fetchData = async () => {
    try {
      const userData = await fetchUserById(userStore.user.id);
      setUser(userData);

      const eventData = await fetchDrivingEventById(id);
      setEvent(eventData);

      const studentDrivings = eventData.student.drivings;
  
      setEventTable([
        { key: 'Курсант', value: eventData.student.user.fullName, link: `${STUDENT_ROUTE}/${eventData.studentId}` },
        { key: 'Инструктор', value: eventData.instructor.user.fullName, link: `${INSTRUCTOR_ROUTE}/${eventData.instructorId}` },
        { key: 'Локация', value: eventData.place.value },
        { key: 'Номер занятия', value: studentDrivings.length },
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
    return <div className="small-text">Загрузка...</div>;
  }

  return (
    <div className="content-container">
      {userStore.user.role === 'admin' && 
      <NavLink to={ADMIN_ROUTE}>
        <ButtonBack />
      </NavLink>
      }
      <Modal
        children={<AdminChangeStatus eventType='driving' eventId={id} onClose={() => {
          setUpdateStatusModal(false)
          fetchData()
        }}/>}
        isOpen={updateStatusModal}
        onClose={() => setUpdateStatusModal(false)}
      />
      <div className="heading-text-2 frame" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Вождение</p>
        <p>{event.status}</p>
        <p>{event.time}</p>
        <p>{event.date}</p>
      </div>
      {userStore.user.role === 'admin' &&
        <div className="button-container" style={{alignSelf: 'end'}}>
          <Button className="outline" onClick={() => setUpdateStatusModal(true)} style={{width: '100%'}}>Изменить статус</Button>
          <Button className="danger" onClick={() => setWarningModal(true)} style={{width: '100%'}}>Отменить занятие</Button>
        </div>  
      }
      <div className="horizontal-container">
        <div className="content-container">
          <div className="filter-container">
            <p className="heading-text-2">Информация</p>
            <DescriptionTable value={eventTable} />
          </div>
          <div className="filter-container">
            <p className="heading-text-2">Транспорт</p>
            <DescriptionTable value={transportTable} />
        </div>
        </div>
        {event.instructorId === user.instructor?.id && event.status === 'В будущем' &&
        <div className="button-container">
          <Button disabled={!isToday} onClick={startEvent} style={{width: '100%'}}>Начать занятие</Button>
          <Button className="danger" onClick={() => setWarningModal(true)} style={{width: '100%'}}>Отменить занятие</Button>
          <WarningModal 
            style={{top: '-46px'}}
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
        
      </div>
      {event.instructorId === user.instructor?.id && event.status === 'Идёт' &&
        <Button onClick={finishEvent}>Завершить занятие</Button>
      }
      
    </div>
  );
};

export default DrivingPage;
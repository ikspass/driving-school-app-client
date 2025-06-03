import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import { deleteLectureEvent, fetchLectureEventById, fetchStudentLectureByLectureId, updateLectureEventStatus } from '../http/eventAPI';
import Button from '../components/UI/Button/Button';
import InformationTable from '../components/InformationTable';
import { SCHEDULE_ROUTE, STUDENT_ROUTE } from '../utils/consts';
import WarningModal from '../components/WarningModal';
import { fetchUserById } from '../http/adminAPI';
import { getDateInfo } from '../utils/calendar';

const LecturePage = () => {

  const {id} = useParams();
  const [loading, setLoading] = useState(true);

  const [event, setEvent] = useState({})
  const [user, setUser] = useState({})
  const [studentLectures, setStudentLectures] = useState([])
  const [warningModal, setWarningModal] = useState(false)

  const { userStore } = useContext(Context)

  const [isToday, setIsToday] = useState(false)

  const navigate = useNavigate();
  
  const attendanceColumns = [
    { key: "student.user.fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "attended", label: "Присутствие", isLink: false },
  ]

  const studentsColumns = [
    { key: "fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "phoneNumber", label: "Номер телефона", isLink: false },
  ]
  
  const fetchData = async () => {
    try {
      const userData = await fetchUserById(userStore.user.id);
      setUser(userData);

      const eventData = await fetchLectureEventById(id)
      setEvent(eventData)

      const studentLecturesData = await fetchStudentLectureByLectureId(id)
      setStudentLectures(studentLecturesData)

      const currentDate = new Date();
      const currentDateInfo = getDateInfo(currentDate);

      setIsToday(currentDateInfo.fullDate === eventData.date)
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();      
  }, []);

  const startEvent = async () => {
    await updateLectureEventStatus(id, 'Идёт');
    fetchData()
  }

  const finishEvent = async () => {
    await updateLectureEventStatus(id, 'Проведено');
    fetchData();
  }

  const deleteEvent = async () => {
    await deleteLectureEvent(id);
    navigate(SCHEDULE_ROUTE);
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-container">
      <div className="heading-text-2 frame" style={{display: 'flex', justifyContent: 'space-between'}}>
        <p>Лекция</p>
        <p>{event.status}</p>
        <p>{event.group.name}</p>
        <p>{event.time}</p>
        <p>{event.date}</p>
      </div>
      {event.teacherId === user.teacher?.id && event.status === 'В будущем' &&
        <div className="button-container" style={{alignSelf: 'end'}}>
          <Button disabled={!isToday} onClick={startEvent} style={{width: '100%'}}>Начать занятие</Button>
          <Button className="danger" onClick={() => setWarningModal(true)} style={{width: '100%'}}>Отменить занятие</Button>
          <WarningModal
            style={{top: '-51px'}}
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
      {event.teacherId === user.teacher?.id && event.status === 'Идёт' &&
        <Button onClick={finishEvent}>Завершить занятие</Button>
      } 
      {event.status === 'Идёт' &&
        <InformationTable
          columns={studentsColumns}
          numbered={true}
          data={event.students}
        />
      }
      
      {event.status === 'Проведено' &&
        <div className="content-container">
          <p className="heading-text-2">Курсанты</p>
          <InformationTable
            columns={attendanceColumns}
            numbered={true}
            data={studentLectures}
          />
        </div>
      }
    </div>
  )
}

export default LecturePage;
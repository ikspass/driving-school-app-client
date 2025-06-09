import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import { createStudentLecture, deleteLectureEvent, fetchLectureEventById, fetchStudentLectureByLectureId, updateLectureEventStatus, updateStudentLectureAbsent } from '../http/eventAPI';
import Button from '../components/UI/Button/Button';
import InformationTable from '../components/InformationTable';
import { ADMIN_ROUTE, SCHEDULE_ROUTE, STUDENT_ROUTE } from '../utils/consts';
import WarningModal from '../components/WarningModal';
import { fetchUserById } from '../http/adminAPI';
import { getDateInfo } from '../utils/calendar';
import AdminChangeStatus from '../components/admin/AdminChangeStatus';
import Modal from '../components/Modal';
import ButtonBack from '../components/UI/ButtonBack/ButtonBack';
import TestMarkAbsentStudents from '../components/TestMarkAbsentStudents';
import LectureMarkAbsentStudents from '../components/LectureMarkAbsentStudents';
import SelectableInformationTable from '../components/SelectableInformationTable';

const LecturePage = () => {

  const {id} = useParams();
  const [loading, setLoading] = useState(true);

  const [event, setEvent] = useState({})
  const [user, setUser] = useState({})
  const [studentLectures, setStudentLectures] = useState([])
  const [warningModal, setWarningModal] = useState(false)
  const [updateStatusModal, setUpdateStatusModal] = useState(false)
  const [markAbsentModal, setMarkAbsentModal] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState([])

  const { userStore } = useContext(Context)

  const [isToday, setIsToday] = useState(false)

  const navigate = useNavigate();
  
  const attendanceColumns = [
    { key: "fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "attended", label: "Присутствие", isLink: false },
  ]
  const studentsColumns = userStore.user.role === 'student' ?
  [
    { key: "user.fullName", label: "ФИО", isLink: false},
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
  ]
  :
  [
    { key: "user.fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
  ]
  const updateEvent = async() => {
    const eventData = await fetchLectureEventById(id)
      setEvent(eventData)

      const currentDate = new Date();
      const currentDateInfo = getDateInfo(currentDate);
      setIsToday(currentDateInfo.fullDate === eventData.date)
  }
  
  const fetchData = async () => {
    try {
      const userData = await fetchUserById(userStore.user.id);
      setUser(userData);

      await updateEvent();

      const studentLecturesData = await fetchStudentLectureByLectureId(id)
      setStudentLectures(studentLecturesData.map(studentLecture => ({id: studentLecture.studentId, fullName: studentLecture.student.user.fullName, attended: studentLecture.attended})))
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

    const updatedStudents = event.group.students.map(student => ({
      studentId: student.id,
      lectureId: id,
      attended: true,
    }));

    await Promise.all(updatedStudents.map(async (student) => {
      await createStudentLecture(student);
    }));
    fetchData()
  }

  const markAbsent = async () => {
    await Promise.all(selectedStudents.map(async (studentId) => {
      await updateStudentLectureAbsent(+studentId, +id);
    }));
    fetchData()
    setSelectedStudents([])

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
        children={<AdminChangeStatus eventType='lecture' eventId={id} onClose={() => {
          setUpdateStatusModal(false)
          updateEvent()
        }}/>}
        isOpen={updateStatusModal}
        onClose={() => setUpdateStatusModal(false)}
      />
      <div className="heading-text-2 frame" style={{display: 'flex', justifyContent: 'space-between'}}>
        <p>Лекция</p>
        <p>{event.status}</p>
        <p>{event.group.name}</p>
        <p>{event.time}</p>
        <p>{event.date}</p>
      </div>
      {userStore.user.role === 'admin' &&
        <div className="button-container" style={{alignSelf: 'end'}}>
          <Button className="outline" onClick={() => setUpdateStatusModal(true)} style={{width: '100%'}}>Изменить статус</Button>
          <Button className="danger" onClick={() => setWarningModal(true)} style={{width: '100%'}}>Отменить занятие</Button>
        </div>  
      }
      {event.status === 'Идёт' && event.group.teacherId === user.teacher?.id &&
        <div className='button-container' style={{alignSelf: 'end'}}>
          <Button disabled={selectedStudents.length < 1} style={{width: '100%'}} className='outline' onClick={markAbsent}>Отметить отсутствующих</Button>
          <Button style={{width: '100%'}} onClick={finishEvent}>Завершить занятие</Button>
        </div>
      }
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
      {event.status === 'В будущем'  &&
        <div className="content-container">
          <p className="heading-text-2">Курсанты</p>
          <InformationTable
            columns={studentsColumns}
            numbered={true}
            data={event.group.students}
          />
        </div>
      }
      {event.status === 'Идёт' &&
        <div className="content-container">
          <p className="heading-text-2">Курсанты</p>
          <SelectableInformationTable
            columns={attendanceColumns}
            numbered={true}
            data={studentLectures}
            setSelectedRow={setSelectedStudents}
          />
        </div>
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
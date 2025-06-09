import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import { createStudentTest, deleteLectureEvent, fetchLectureEventById, fetchStudentLectureByLectureId, fetchStudentTestsByTestEventId, fetchTestEventById, updateLectureEventStatus, updateStudentTestAbsent, updateStudentTestPassed, updateTestEventStatus } from '../http/eventAPI';
import Button from '../components/UI/Button/Button';
import InformationTable from '../components/InformationTable';
import { ADMIN_ROUTE, SCHEDULE_ROUTE, STUDENT_ROUTE } from '../utils/consts';
import WarningModal from '../components/WarningModal';
import { fetchUserById } from '../http/adminAPI';
import { getDateInfo } from '../utils/calendar';
import LectureMarkAbsentStudents from '../components/LectureMarkAbsentStudents';
import Modal from '../components/Modal';
import TestMarkAbsentStudents from '../components/TestMarkAbsentStudents';
import TestMarkPassedStudents from '../components/TestMarkPassedStudents';
import ButtonBack from '../components/UI/ButtonBack/ButtonBack';
import AdminChangeStatus from '../components/admin/AdminChangeStatus';
import SelectableInformationTable from '../components/SelectableInformationTable';

const TestPage = () => {

  const {id} = useParams();
  const [loading, setLoading] = useState(true);

  const [event, setEvent] = useState({})
  const [user, setUser] = useState({})
  const [studentTests, setStudentTests] = useState([])
  const [warningModal, setWarningModal] = useState(false)
  const [updateStatusModal, setUpdateStatusModal] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState([])


  const { userStore } = useContext(Context)

  const [isToday, setIsToday] = useState(false)
  const [markAbsentModal, setMarkAbsentModal] = useState(false)
  const [markPassedModal, setMarkPassedModal] = useState(false)

  const navigate = useNavigate();
  
  const attendanceColumns = [
    { key: "fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "attended", label: "Присутствие", isLink: false },
    { key: "passed", label: "Сдано/ Не сдано", isLink: false },
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
  
  const fetchData = async () => {
    try {
      const userData = await fetchUserById(userStore.user.id);
      setUser(userData);

      const eventData = await fetchTestEventById(id)
      setEvent(eventData)

      const studentTestsData = await fetchStudentTestsByTestEventId(id);
      setStudentTests(studentTestsData.map(studentTest => ({id: studentTest.studentId, fullName: studentTest.student.user.fullName, attended: studentTest.attended, passed: studentTest.passed})));

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
    await updateTestEventStatus(id, 'Идёт');

    const updatedStudents = event.group.students.map(student => ({
      studentId: student.id,
      testEventId: id,
      attended: true,
      passed: false,
    }));

    await Promise.all(updatedStudents.map(async (student) => {
      await createStudentTest(student);
    }));

    fetchData()
  }

  const markAbsent = async () => {
    await Promise.all(selectedStudents.map(async (studentId) => {
      await updateStudentTestAbsent(+studentId, +id);
    }));
    
    fetchData()
    setSelectedStudents([])
  }

  const markPassed = async () => {
    await Promise.all(selectedStudents.map(async (studentId) => {
      await updateStudentTestPassed(+studentId, +id);
    }));
    fetchData()
    setSelectedStudents([])
  }

  const finishEvent = async () => {
    
    await updateTestEventStatus(id, 'Проведено');
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
        children={<AdminChangeStatus eventType='test' eventId={id} onClose={() => {
          setUpdateStatusModal(false)
          fetchData()
        }}/>}
        isOpen={updateStatusModal}
        onClose={() => setUpdateStatusModal(false)}
      />
      <div className="heading-text-2 frame" style={{display: 'flex', justifyContent: 'space-between'}}>
        <p>Зачёт</p>
        <p>{event.status}</p>
        <p>{event.group.name}</p>
        <p>{event.time}</p>
        <p>{event.date}</p>
      </div>
      
      <p className="normal-text">Тема: {event.test.description}</p>
      
        
      <div className="horizontal-container">

        
        
        {event.status === 'В будущем' &&
          <div className='filter-container'>
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
              data={studentTests}
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
              data={studentTests}
            />
          </div>
        }
        {event.status === 'В будущем' && event.group.teacherId === user.teacher?.id &&
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
        {userStore.user.role === 'admin' &&
        <div className="button-container" style={{alignSelf: 'end'}}>
          <Button className="outline" onClick={() => setUpdateStatusModal(true)} style={{width: '100%'}}>Изменить статус</Button>
          <Button className="danger" onClick={() => setWarningModal(true)} style={{width: '100%'}}>Отменить занятие</Button>
        </div>  
      }
        {event.status === 'Идёт' && event.group.teacherId === user.teacher?.id &&
          <div className='button-container' style={{alignSelf: 'end'}}>
            <Button style={{width: '100%'}} className='outline' onClick={markAbsent}>Отметить отсутствующих</Button>
            <Button style={{width: '100%'}} className='outline' onClick={markPassed}>Отметить сдавших</Button>
            <Button style={{width: '100%'}} onClick={finishEvent}>Завершить занятие</Button>
          </div>
        } 
      </div>
    </div>
  )
}

export default TestPage;
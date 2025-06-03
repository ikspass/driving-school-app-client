import React, { useState, useContext, useEffect } from 'react'
import DescriptionTable from '../components/DescriptionTable';
import InformationTable from '../components/InformationTable';
import Button from '../components/UI/Button/Button';
import Separator from '../components/UI/Separator/Separator';
import PinList from '../components/UI/PinList/PinList';
import Calendar from '../components/Calendar';
import {useNavigate, useParams} from 'react-router-dom'
import { fetchGroupById, fetchUserById } from '../http/adminAPI';
import { Context } from '..';
import { ERROR_PAGE, GROUP_ROUTE, INSTRUCTOR_ROUTE, STUDENT_ROUTE, TEACHER_ROUTE } from '../utils/consts';
import { getDateInfo } from '../utils/calendar';
import Modal from '../components/Modal';
import GroupAssignStudents from '../components/admin/GroupAssignStudents';
import SendMessage from '../components/admin/SendMessage';
import GroupChangeTeacher from '../components/admin/GroupChangeTeacher';

function GroupPage() {

  const currentDate = new Date();
  const currentDateInfo = getDateInfo(currentDate);

  const navigate = useNavigate();

  const [assignStudentsModal, setAssignStudentsModal] = useState(false)
  const [changeTeacherModal, setChangeTeacherModal] = useState(false)
  const [sendMessageModal, setSendMessageModal] = useState(false)

  const { eventStore, userStore } = useContext(Context)
  const role = userStore.user.role;

  const [user, setUser] = useState({})

  const [group, setGroup] = useState({})
  const [groupData, setGroupData] = useState([])

  const {id} = useParams();

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserById(userStore.user.id);
        setUser(userData);

        const group = await fetchGroupById(id);
        setGroup(group);

        setGroupData(
          [
            {key:'Категория', value: group.category.value},
            {key:'Преподаватель', value: group.teacher.user.fullName, link: `${TEACHER_ROUTE}/${group.teacherId}`},
            {key:'Количество студентов', value: group.students.length},
            {key:'Дата начала обучения', value: group.dateOfStart},
            {key:'Расписание группы', value: group.scheduleGroup.name},
          ]
        )
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        if(role === 'student'){
          if(id != user.student.groupId){
            navigate(ERROR_PAGE)
          }
        }
      }
    };
    fetchData();
  }, []);

  const updateData = async() => {
    const group = await fetchGroupById(id);
    setGroup(group);
  }
  
  const studentsColumns = role === 'student' ?
  [
    { key: "user.fullName", label: "ФИО"},
    // { key: "user.dateOfBirth", label: "Дата рождения", isLink: false },
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
    // { key: "instructor.user.fullName", label: "Инструктор", isLink: true, navigateTo: (row) => `${INSTRUCTOR_ROUTE}/${row.instructor.id}`},
    // { key: "status", label: "Статус", isLink: false },
  ]
  :
  [
    { key: "user.fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "user.dateOfBirth", label: "Дата рождения", isLink: false },
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
    { key: "instructor.user.fullName", label: "Инструктор", isLink: true, navigateTo: (row) => `${INSTRUCTOR_ROUTE}/${row.instructor.id}`},
    { key: "status", label: "Статус", isLink: false },
  ]
  
  const studentsInfo = group.students ? group.students.map((student) => student) : [];

  // if(userStore.user.role.value !== 'student'){
  //   setEvents(eventStore.events);
  // }
  // else{
  //   eventStore.setStudentId(userStore.user.userId)
  //   setEvents(eventStore.studentEvents);
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal 
        children={
          <GroupAssignStudents 
            group={group} 
            onClose={() => {
              setAssignStudentsModal(false);
              updateData()
            }}
          />
        }
        isOpen={assignStudentsModal}
        onClose={() => {
          setAssignStudentsModal(false)
        
        }}
      />
      <Modal 
        children={
          <SendMessage 
            group={group}
            onClose={() => {
              setSendMessageModal(false);
            }}
          />
        }
        isOpen={sendMessageModal}
        onClose={() => setSendMessageModal(false)}
      />
      <Modal 
        children={
          <GroupChangeTeacher 
            group={group}
            onClose={() => {
              setChangeTeacherModal(false);
            }}
          />
        }
        isOpen={changeTeacherModal}
        onClose={() => setChangeTeacherModal(false)}
      />
      <div className="main-container">
        <div className="content-container">
          <p className="heading-text-2">Группа {group.name}</p>
          <div className="horizontal-container">
            <DescriptionTable
              value = {groupData}
            />
            <div className="filter-container">
              <PinList
                value={[group.status]}
              />
            </div>
            {role === 'admin' &&
              <div style={{display: 'flex', flex: 1, justifyContent: 'end'}}>
                <div className='button-container'>
                  <Button className='outline' style={{width: '100%'}} onClick={() => setChangeTeacherModal(true)}>Изменить преподавателя</Button>
                  <Button className='outline' style={{width: '100%'}} onClick={() => setAssignStudentsModal(true)}>Добавить курсантов</Button>
                  <Button className='outline' style={{width: '100%'}} onClick={() => setSendMessageModal(true)}>Оставить сообщение</Button>
                </div>
              </div>
            }
          </div>
          <p className="heading-text-2">Список курсантов</p>
          <InformationTable 
            columns={studentsColumns} 
            data={studentsInfo}
            numbered={true}
          />
          <Separator />
          <p className="heading-text-2">Статистика</p>
          <InformationTable 
            columns={studentsColumns} 
            data={studentsInfo}
            numbered={true}
          />
          <Separator />
          <p className="heading-text-2">Расписание группы</p>
          <Calendar
            events={eventStore.events}
          />
        </div>
      </div>
    </>
  )
}

export default GroupPage;
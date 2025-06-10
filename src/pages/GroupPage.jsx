import React, { useState, useContext, useEffect } from 'react'
import DescriptionTable from '../components/DescriptionTable';
import InformationTable from '../components/InformationTable';
import Button from '../components/UI/Button/Button';
import {NavLink, useNavigate, useParams} from 'react-router-dom'
import { deleteGroup, fetchGroupById, fetchMessagesByGroup, fetchUserById } from '../http/adminAPI';
import { Context } from '..';
import { ADMIN_ROUTE, ERROR_PAGE, INSTRUCTOR_ROUTE, STUDENT_ROUTE, TEACHER_ROUTE } from '../utils/consts';
import Modal from '../components/Modal';
import GroupAssignStudents from '../components/admin/GroupAssignStudents';
import SendMessage from '../components/admin/SendMessage';
import GroupChangeTeacher from '../components/admin/GroupChangeTeacher';
import ButtonBack from '../components/UI/ButtonBack/ButtonBack';
import WarningModal from '../components/WarningModal';

function GroupPage() {

  const navigate = useNavigate();

  const [assignStudentsModal, setAssignStudentsModal] = useState(false)
  const [changeTeacherModal, setChangeTeacherModal] = useState(false)
  const [sendMessageModal, setSendMessageModal] = useState(false)

  const { userStore } = useContext(Context)
  const role = userStore.user.role;

  const [group, setGroup] = useState({})
  const [groupData, setGroupData] = useState([])
  const [messages, setMessages] = useState([])
  const [warningModal, setWarningModal] = useState(false)

  const {id} = useParams();

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const userData = await fetchUserById(userStore.user.id);

      const messagesData = await fetchMessagesByGroup(id);
      setMessages(messagesData);

      const groupData = await fetchGroupById(id);
      setGroup(groupData);

      if(role === 'student'){
        if(id != userData.student.groupId){
          navigate(ERROR_PAGE)
        }
      }

      setGroupData(
        [
          {key:'Категория', value: groupData.category.value},
          {key:'Преподаватель', value: groupData.teacher.user.fullName, link: `${TEACHER_ROUTE}/${groupData.teacherId}`},
          {key:'Количество студентов', value: groupData.students.length},
          {key:'Дата начала обучения', value: groupData.dateOfStart},
          {key:'Расписание группы', value: groupData.scheduleGroup.name},
        ]
      )
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      
    }
  };

  const handleDeleteGroup = async () => {
    await deleteGroup(id);
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  const studentsColumns = role === 'student' ?
  [
    { key: "user.fullName", label: "ФИО"},
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
  ]
  :
  [
    { key: "user.fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "user.dateOfBirth", label: "Дата рождения", isLink: false },
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
    { key: "instructor.user.fullName", label: "Инструктор", isLink: true, navigateTo: (row) => `${INSTRUCTOR_ROUTE}/${row.instructor.id}`},
  ]
  
  const studentsInfo = group.students ? group.students.map((student) => student) : [];

  if (loading) {
    return <div className='small-text'>Загрузка...</div>;
  }

  return (
    <>
      {role === 'admin' && 
      <NavLink to={ADMIN_ROUTE}>
        <ButtonBack />
      </NavLink>
      }
      <Modal 
        children={
          <GroupAssignStudents 
            group={group} 
            onClose={() => {
              setAssignStudentsModal(false);
              fetchData()
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
              fetchData();
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
            {role === 'admin' &&
              <div style={{display: 'flex', flex: 1, justifyContent: 'end'}}>
                <div className='button-container'>
                  <Button className='outline' style={{width: '100%'}} onClick={() => setChangeTeacherModal(true)}>Изменить преподавателя</Button>
                  <Button className='outline' style={{width: '100%'}} onClick={() => setAssignStudentsModal(true)}>Добавить курсантов</Button>
                  <Button className='outline' style={{width: '100%'}} onClick={() => setSendMessageModal(true)}>Оставить сообщение</Button>
                  <Button className='danger' style={{width: '100%'}} onClick={() => setWarningModal(true)}>Удалить</Button>
                  <WarningModal
                    style={{top: '-46px'}}
                    text='Вы уверены что хотите удалить группу?'
                    isOpen={warningModal}
                    onConfirm={() => {
                      setWarningModal(false)
                      handleDeleteGroup()
                      navigate(ADMIN_ROUTE)
                    }}
                    onCancel={() => setWarningModal(false)}
                  />
                </div>
              </div>
            }
            {role === 'teacher' &&
            <div style={{display: 'flex', flex: 1, justifyContent: 'end'}}>
              <div className='button-container'>
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
          <p className="heading-text-2">Сообщения</p>
          <div className="filter-container">
            {messages.length > 0 ?
              messages.map((message, index) => 
                <div key={index} className="message-frame filter-container" style={{width: '30vw'}}>
                  <p className="normal-text">{message.text}</p>
                  <p className="small-text" style={{alignSelf: 'end'}}>{message.date}   {message.time}</p>
                </div>
              )
              :
              <p className="normal-text">Сообщений нет</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default GroupPage;
import React, {useContext, useState, useEffect} from 'react'
import DescriptionTable from "../components/DescriptionTable"
import InformationTable from '../components/InformationTable'
import Button from '../components/UI/Button/Button'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { useParams } from 'react-router-dom'
import { GROUP_ROUTE, INSTRUCTOR_ROUTE } from '../utils/consts'
import { fetchStudentById, fetchUserById, fetchUsers } from '../http/adminAPI'
import Modal from '../components/Modal'
import AssignInstructor from '../components/admin/AssignInstructor'

const StudentPage = observer(({}) => {

  const [student, setStudent] = useState({})

  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  
  const [assignInstructorModal, setAssignInstructorModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const student = await fetchStudentById(id);
        setStudent(student);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  const updateData = async () => {
    const data = await fetchStudentById(id);
    setStudent(data);
  }

  console.log(student)

  return (
    <>
      <Modal 
        children={<AssignInstructor onClose={() => {
          setAssignInstructorModal(false);
          updateData()
        }}/>}
        isOpen={assignInstructorModal}
        onClose={() => setAssignInstructorModal(false)}
      />
      <div className="content-container">
        <p className="heading-text-2">Персональные данные курсанта</p>
        <div className="content-container">
          <div className="horizontal-container">
            <div className="image-container">
              <img src={`${process.env.REACT_APP_API_URL}/${student.user.img}`} alt={student.user.fullName} />
            </div>
            <DescriptionTable
              value = {[
                {key:'ФИО', value: student.user.fullName},
                {key:'Номер телефона', value: student.user.phoneNumber},
                {key:'Дата рождения', value: student.user.dateOfBirth},
                {key:'Адрес', value: student.user.adress},
                {key:'Идентификационный номер', value: student.user.idNumber},
                {key:'Номер паспорта', value: student.user.passportNumber},
              ]}
            />
            <div style={{display: 'flex', flex: 1, justifyContent: 'end'}}>
              <div className="button-container">
                <Button className='outline' style={{width: '100%'}} onClick={() => setAssignInstructorModal(true)}>Назначить инструктора</Button>
                <Button className='outline' style={{width: '100%'}}>Перевести в другую группу</Button>
                <Button className='outline' style={{width: '100%'}}>Редактировать данные</Button>
                <Button className='outline' style={{width: '100%'}}>Отчислить курсанта</Button>
              </div>
            </div>
          </div>
          <p className="heading-text-2">Информация</p>
          <div style={{width: '50vw'}}>
            <DescriptionTable 
              value = {[
                {
                  key:'Инструктор',
                  value: student.instructor ? student.instructor.user.fullName : null,
                  link: student.instructor ? `${INSTRUCTOR_ROUTE}/${student.instructor.id}` : null
                },
                {
                  key:'Группа',
                  value: student.group ? student.group.name : null,
                  link: student.group ? `${GROUP_ROUTE}/${student.group.id}` : null
                },
              ]}
            />
          </div>
        </div>
        <p className="heading-text-2">Зачёты</p>
        <InformationTable 
          columns={[
            {label: 'Зачёт', key: 'name'},
            {label: 'Тема', key: 'theme', isLink: true},
            {label: 'Статус', key: 'status'},
          ]}
          data={[
            {name: 'Зачёт 1', theme: ['Глава 1', 'Глава 2', 'Глава 3', 'Глава 4'], status: 'Сдано'}
          ]}
        />
        <p className="heading-text-2">Посещаемость</p>
        <InformationTable 
          columns={[
            {label: 'Дата', key: 'date'},
            {label: 'Время', key: 'time'},
            {label: 'Материалы', key: 'materials', isLink: true},
            {label: 'Посещаемость', key: 'attendance'},
          ]}
          data={[
            {date: '2025-05-06', time: '16:00', materials: ['Глава 1', 'Глава 2', 'Глава 3',], attendance: 'Присутствовал'}
          ]}
        />
        
      </div>
    </>
  )
})

export default StudentPage;
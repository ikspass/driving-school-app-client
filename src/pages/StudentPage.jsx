import React, {useContext, useState, useEffect} from 'react'
import DescriptionTable from "../components/DescriptionTable"
import InformationTable from '../components/InformationTable'
import Button from '../components/UI/Button/Button'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { useParams } from 'react-router-dom'
import { GROUP_ROUTE, INSTRUCTOR_ROUTE } from '../utils/consts'
import { fetchOneUser } from '../http/adminAPI'

const StudentPage = observer(({}) => {

  const {userStore} = useContext(Context)

  const {id} = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOneUser(id)
      .then(data => {
        userStore.setStudent(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [id, userStore]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  const user = userStore.student || {};

  return (
    <div className="content-container">
      <p className="heading-text-2">Персональные данные курсанта</p>
      <div className="content-container">
        <div className="horizontal-container">
          <div className="image-container">
            <img src={`${process.env.REACT_APP_API_URL}/${user.img}`} alt={user.fullName} />
          </div>
          <DescriptionTable
            value = {[
              {key:'ФИО', value: user.fullName},
              {key:'Номер телефона', value: user.phoneNumber},
              {key:'Дата рождения', value: user.dateOfBirth},
              {key:'Адрес', value: user.adress},
              {key:'Идентификационный номер', value: user.idNumber},
              {key:'Номер паспорта', value: user.passportNumber},
            ]}
          />
          <div style={{display: 'flex', flex: 1, justifyContent: 'end'}}>
            <div className="button-container">
              <Button className='outline' style={{width: '100%'}}>Назначить инструктора</Button>
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
                value: user.instructor ? user.instructor.fullName : null,
                link: user.instructor ? `${INSTRUCTOR_ROUTE}/${user.instructor.id}` : null
              },
              {
                key:'Группа',
                value: user.group ? user.group.name : null,
                link: user.group ? `${GROUP_ROUTE}/${user.group.id}` : null
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
  )
})

export default StudentPage;
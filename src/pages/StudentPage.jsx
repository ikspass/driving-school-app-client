import React from 'react'
import DescriptionTable from "../components/DescriptionTable"
import InformationTable from '../components/InformationTable'
import Button from '../components/UI/Button/Button'
import { GROUP_ROUTE, INSTRUCTOR_ROUTE } from '../utils/consts'

export default function StudentPage() {

  const student = {id: 0, userId: 0, fullName: 'Рычкова Полина Андреевна', dateOfBirth: '2005-09-18', phoneNumber: '+375256085506', status: 'Активен', instructor: {id: 0, fullName: 'Иванов Иван Иванович'}, group: {id: 0, name: '16B'}}

  return (
    <div className="content-container">
      <p className="heading-text-2">Персональные данные курсанта</p>
      <div className="content-container">
        <div className="horizontal-container">
          <div className="image-container">
            <img src="" alt="" />
          </div>
          <DescriptionTable
            value = {[
              {key:'ФИО', value: student.fullName},
              {key:'Дата рождения', value: student.dateOfBirth},
              {key:'Номер телефона', value: student.phoneNumber},
              {key:'Адрес', value: ''},
              {key:'Идентификационный номер', value: ''},
              {key:'Номер паспорта', value: ''},
            ]}
          />
          <div style={{display: 'flex', flex: 1, justifyContent: 'end'}}>
            <div className="button-container">
              <Button style={{width: '100%'}}>Назначить инструктора</Button>
              <Button style={{width: '100%'}}>Перевести в другую группу</Button>
              <Button style={{width: '100%'}}>Редактировать данные</Button>
              <Button style={{width: '100%'}}>Отчислить курсанта</Button>
            </div>
          </div>
        </div>
        <p className="heading-text-2">Информация</p>
        <div style={{width: '50vw'}}>
          <DescriptionTable 
            value = {[
              {key:'Инструктор', value: student.instructor.fullName, link: `${INSTRUCTOR_ROUTE}/${student.instructor.id}` },
              {key:'Группа', value: student.group.name, link: `${GROUP_ROUTE}/${student.group.id}`},
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
}

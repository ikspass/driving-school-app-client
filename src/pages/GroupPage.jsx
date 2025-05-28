import React, { useState, useContext, useEffect } from 'react'
import Header from '../components/Header';
import ButtonBack from '../components/UI/ButtonBack/ButtonBack';
import DescriptionTable from '../components/DescriptionTable';
import InformationTable from '../components/InformationTable';
import Button from '../components/UI/Button/Button';
import Separator from '../components/UI/Separator/Separator';
import PinList from '../components/UI/PinList/PinList';
import Calendar from '../components/Calendar';

import {useParams} from 'react-router-dom'
import { fetchOneGroup } from '../http/adminAPI';
import { Context } from '..';
import { GROUP_ROUTE, INSTRUCTOR_ROUTE, STUDENT_ROUTE } from '../utils/consts';
import { getDateInfo } from '../utils/calendar';

function GroupPage() {

  const currentDate = new Date();
  const currentDateInfo = getDateInfo(currentDate);

  const { groupStore, eventStore, userStore } = useContext(Context)

  const {id} = useParams();

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([])

  useEffect(() => {
    eventStore.setSelectedDate(currentDateInfo.fullDate)

    fetchOneGroup(id)
      .then(data => {
        groupStore.setGroup(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [id, groupStore]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  const group = groupStore.group || {};

  const studentsColumns = [
    { key: "fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "dateOfBirth", label: "Дата рождения", isLink: false },
    { key: "phoneNumber", label: "Номер телефона", isLink: false },
    { key: "student.instructor.fullName", label: "Инструктор", isLink: true, navigateTo: (row) => `${INSTRUCTOR_ROUTE}/${row.instructor.id}`},
    { key: "group.name", label: "Группа", isLink: true, navigateTo: (row) => `${GROUP_ROUTE}/${row.id}`},
    { key: "status", label: "Статус", isLink: false },
  ];

  console.log(group)
  const studentsInfo = group.students.map((student) => student)


  if(userStore.user.role.value !== 'student'){
    setEvents(eventStore.events);
  }
  else{
    eventStore.setStudentId(userStore.user.userId)
    setEvents(eventStore.studentEvents);
  }

  return (
    <>
      <div className="main-container">
        <div className="content-container">
          <p className="heading-text-2">Группа {group.name}</p>
          <div className="horizontal-container">
            <DescriptionTable
              value = {[
                {key:'Категория', value: group.category.value},
                {key:'Преподаватель', value: group.teacher},
                {key:'Количество студентов', value: group.studentsCount},
                {key:'Дата начала обучения', value: group.dateOfStart},
                {key:'Расписание группы', value: group.scheduleGroup.name},
              ]}
            />
            <div className="filter-container">
              <PinList
                value={[group.status]}
              />
            </div>
            <div className='button-container'>
              <Button className='outline'>Назначить преподавателя</Button>
              <Button className='outline'>Оставить сообщение</Button>
              <Button className='outline'>Оставить сообщение</Button>
            </div>
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
            events={events}
          />
        </div>
      </div>
    </>
  )
}

export default GroupPage;
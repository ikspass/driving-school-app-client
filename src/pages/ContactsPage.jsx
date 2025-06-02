import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import DescriptionTable from '../components/DescriptionTable';
import InformationTable from '../components/InformationTable';
import { INSTRUCTOR_ROUTE, TEACHER_ROUTE } from '../utils/consts';

const ContactsPage = observer(() => {

  const {userStore} = useContext(Context)

  const user = userStore.user
  console.log(user)
  const role = user.role.value
  
  const instructor = user.student.instructor;
  const teacher = user.student.group.teacher;

  const data = user.student //instructorID и groupID != null добавить 
  ? 
  [
    {id: instructor.id, role: 'Инструктор', fullName: instructor.user.fullName, phoneNumber: instructor.user.phoneNumber, status: instructor.status },
    {id: teacher.id, role: 'Преподаватель', fullName: teacher.user.fullName, phoneNumber: teacher.user.phoneNumber, status: teacher.status},
  ]
  : 
  [
    { role: 'Преподаватель' },
    { role: 'Инструктор' },
  ];

  console.log('data: ', data)

  return (
    <div className='filter-container'>
      <p className="heading-text-2">Контакты</p>
      <InformationTable 
        columns={[
          { key: "role", label: "Должность", isLink: false },
          { key: "fullName", label: "ФИО", isLink: true, navigateTo: (row) => row.role == 'Преподаватель' ? `${TEACHER_ROUTE}/${row.id}` : `${INSTRUCTOR_ROUTE}/${row.id}`},
          { key: "phoneNumber", label: "Номер телефона", isLink: false },
          { key: "status", label: "Статус", isLink: false },
        ]}
        data ={data}
      />
    </div>
  )
})

export default ContactsPage;

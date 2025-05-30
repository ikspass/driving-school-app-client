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

  const data = user.student 
  ? 
  [user.student.instructor, user.student.group.teacher] 
  : 
  [
    { role: { description: 'Инструктор' } },
    { role: { description: 'Преподаватель' } }
  ];

  console.log('data: ', data)

  return (
    <div>
      <InformationTable 
        columns={[
          { key: "role.description", label: "Должность", isLink: false },
          { key: "fullName", label: "ФИО", isLink: true, navigateTo: (row) => row.role.value == 'teacher' ? `${TEACHER_ROUTE}/${row.teacher.id}` : `${INSTRUCTOR_ROUTE}/${row.instructor.id}`},
          { key: "phoneNumber", label: "Номер телефона", isLink: false },
          { key: "status", label: "Статус", isLink: false },
        ]}
        data ={data}
      />
    </div>
  )
})

export default ContactsPage;

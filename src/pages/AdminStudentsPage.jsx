import React, { useContext, useState } from 'react'
import InformationTable from '../components/InformationTable';
import userService from '../API/UserService,js';
import { Context } from '..';
import { observer } from 'mobx-react-lite'
import FilterButtons from '../components/UI/FilterButtons/FilterButtons';
import { useNavigate } from 'react-router-dom'
import { GROUP_ROUTE, STUDENT_ROUTE, INSTRUCTOR_ROUTE } from '../utils/consts';

const AdminStudentsPage = observer(() => {

  const {student} = useContext(Context);

  const navigate = useNavigate()

  const columns = [
    { key: "fullName", label: "ФИО", isLink: true , url: STUDENT_ROUTE},
    { key: "dateOfBirth", label: "Дата рождения", isLink: false },
    { key: "phoneNumber", label: "Номер телефона", isLink: false },
    { key: "instructor", label: "Инструктор", isLink: true, url: INSTRUCTOR_ROUTE},
    { key: "group", label: "Группа", isLink: true, url: GROUP_ROUTE},
    { key: "status", label: "Статус", isLink: false },
  ];

  async function fetchUsers() {
    const users = await userService.getAll;
    console.log(users)
  }

  const data = [
    { 
      fio: "Кузьмина Полина Андреевна", 
      fioUrl: "", 
      group: "17A", 
      groupUrl: "A", 
      category: "A", 
      instructor: "Иванов И. И.", 
      instructorUrl: ""
    },
    { 
      fio: "Яковлев Константин Игоревич", 
      fioUrl: "", 
      group: "18B", 
      groupUrl: "A", 
      category: "B", 
      instructor: "Иванов И. И.", 
      instructorUrl: ""
    },
    { 
      fio: "Мельникова Татьяна Васильевна", 
      fioUrl: "", 
      group: "17A", 
      groupUrl: "A", 
      category: "A", 
      instructor: "Самойлов И. И.", 
      instructorUrl: ""
    },
    { 
      fio: "Белов Денис Викторович", 
      fioUrl: "", 
      group: "18B", 
      groupUrl: "A", 
      category: "B", 
      instructor: "Смирнов И. И.", 
      instructorUrl: ""
    },
    { 
      fio: "Петров Андрей Андреевич", 
      fioUrl: "", 
      group: "-", 
      groupUrl: "A", 
      category: "B", 
      instructor: "-", 
      instructorUrl: ""
    },
    
  ];

  return (
    <div className='horizontal-container'>
      <InformationTable 
        columns={columns}
        data={student.students}
        numbered = {true}
      />
      {/* <button onClick={fetchUsers}>получить юзеров</button> */}
      <div className="filter-container">
        <FilterButtons 
          title='Группа'
          filters={student.groups.map(elem => elem.name)}
          selected={student.selectedGroup}
          setSelected={student.setSelectedGroup.bind(student)}
        />
        <FilterButtons 
          title='Инструктор'
          filters={student.instructors.map(elem => elem.name)}
          selected={student.selectedInstructor}
          setSelected={student.setSelectedInstructor.bind(student)}
        />
      </div>
    </div>
  )
})

export default AdminStudentsPage;
import React, { useContext, useEffect, useState } from 'react'
import InformationTable from '../components/InformationTable';
import { Context } from '..';
import { observer } from 'mobx-react-lite'
import MultipleFilterButtons from '../components/UI/MultipleFilterButtons/MultipleFilterButtons';
import SingleFilterButtons from '../components/UI/SingleFilterButtons/SingleFilterButtons';
import { GROUP_ROUTE, STUDENT_ROUTE, INSTRUCTOR_ROUTE } from '../utils/consts';
import { fetchCategories, fetchGroups, fetchInstructors, fetchQuals, fetchStudents, fetchUsers } from '../http/adminAPI';

const StaffPage = observer(() => {

  const {userStore} = useContext(Context);
  const {schoolStore} = useContext(Context)

  useEffect(() => {
    fetchUsers().then(data => userStore.setUsers(data))
    fetchCategories().then(data => schoolStore.setCategories(data))
    fetchQuals().then(data => schoolStore.setQuals(data))
  }, [])

  const statuses = [
    { id: 1, value: 'Активен'},
    { id: 2, value: 'Не активен'},
    { id: 3, value: 'Более не работает'},
  ]

  const [selectedTeacherStatus, setSelectedTeacherStatus] = useState(statuses[0])
  const [selectedInstructorStatus, setSelectedInstructorStatus] = useState(statuses[0])
  const [selectedQual, setSelectedQual] = useState([])
  const [selectedCategory, setSelectedCategory] = useState([])

  const filteredTeachers = userStore.teachers.filter(user => {
    const matchesStatus = selectedTeacherStatus ? user.status === selectedTeacherStatus : true;
    // const matchesQual = selecteQuals ? user.teacher.quals === selectedQual.id : true;
    return matchesStatus;
  });

  const columns = [
    { key: "fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "dateOfBirth", label: "Дата рождения", isLink: false },
    { key: "phoneNumber", label: "Номер телефона", isLink: false },
    { key: "quals", label: "Квалификация", isLink: false},
    { key: "status", label: "Статус", isLink: false },
  ];

  return (
    <div className="content-container">
      <div className="filter-container">
        <p className="heading-text-2">Преподаватели</p>
        <div className='horizontal-container'>
          <div className="filter-container">
            <SingleFilterButtons 
               filters={statuses.map(elem => ({id: elem.id, value: elem.value}))}
               selected={selectedTeacherStatus}
               setSelected={setSelectedTeacherStatus}
            />
            <InformationTable 
              columns={columns}
              data={filteredTeachers}
              numbered = {true}
            />
          </div>
          <div className="filter-container">
            {/* <MultipleFilterButtons 
              title='Квалификация'
              filters={schoolStore.quals.map(elem => ({id: elem.id, value: elem.description}))}
              selected={selectedQual}
              setSelected={setSelectedQual}
            /> */}
          </div>
        </div>
      </div>
      <div className="filter-container">
        <p className="heading-text-2">Инстркуторы</p>
        <div className='horizontal-container'>
          <div className="filter-container">
            <SingleFilterButtons 
               filters={statuses.map(elem => ({id: elem.id, value: elem.value}))}
               selected={selectedTeacherStatus}
               setSelected={setSelectedTeacherStatus}
            />
            <InformationTable 
              columns={columns}
              data={filteredTeachers}
              numbered = {true}
            />
          </div>
          <div className="filter-container">
            {/* <MultipleFilterButtons 
              title='Категория'
              filters={schoolStore.categories.map(elem => ({id: elem.id, value: elem.value}))}
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
})

export default StaffPage;
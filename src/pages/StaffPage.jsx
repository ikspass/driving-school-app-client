import React, { useContext, useEffect, useState } from 'react'
import InformationTable from '../components/InformationTable';
import { Context } from '..';
import { observer } from 'mobx-react-lite'
import MultipleFilterButtons from '../components/UI/MultipleFilterButtons/MultipleFilterButtons';
import SingleFilterButtons from '../components/UI/SingleFilterButtons/SingleFilterButtons';
import { GROUP_ROUTE, STUDENT_ROUTE, INSTRUCTOR_ROUTE, TEACHER_ROUTE } from '../utils/consts';
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

  const [selectedQual, setSelectedQual] = useState(null)
  const [selectedTeacherStatus, setSelectedTeacherStatus] = useState(statuses[0])

  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedInstructorStatus, setSelectedInstructorStatus] = useState(statuses[0])
  
  const filteredTeachers = userStore.teachers.filter(user => {
    const matchesStatus = selectedTeacherStatus ? user.teacher.status === selectedTeacherStatus.value : true;
    const matchesQual = selectedQual ? user.teacher.quals.some(qual => qual.description === selectedQual.value) : true;    
    return matchesStatus && matchesQual;
  });
  
  const filteredInstructors = userStore.instructors.filter(user => {
    const matchesStatus = selectedInstructorStatus ? user.instructor.status === selectedInstructorStatus.value : true;
    const matchesCategory = selectedCategory ? user.instructor.categories.some(category => category.value === selectedCategory.value) : true;    
    return matchesStatus && matchesCategory;
  });

  const transformedTeachers = filteredTeachers.map(teacher => ({
    ...teacher,
    // Преобразуем массив квалификаций в строку с описаниями
    teacher: {
      ...teacher.teacher,
      quals: teacher.teacher.quals.map(qual => qual.description) // Объединяем описания в строку
    },
  }));

  const transformedInstructors = filteredInstructors.map(instructor => ({
    ...instructor,
    // Преобразуем массив квалификаций в строку с описаниями
    instructor: {
      ...instructor.instructor,
      categories: instructor.instructor.categories.map(category => category.value) // Объединяем описания в строку
    },
  }));



  const columns = [
    { key: "fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${TEACHER_ROUTE}/${row.id}`},
    { key: "phoneNumber", label: "Номер телефона", isLink: false },
    { key: "teacher.quals", label: "Квалификация", isLink: false},
    { key: "teacher.dateOfEmployment", label: "Дата приёма на работу", isLink: false},
    { key: "teacher.status", label: "Статус", isLink: false },
  ];

  const [selectedRow, setSelectedRow] = useState(null);


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
              data={transformedTeachers}
              numbered = {true}
            />
          </div>
          <div className="filter-container">
            <SingleFilterButtons 
              title='Квалификация'
              filters={schoolStore.quals.map(elem => ({id: elem.id, value: elem.description}))}
              selected={selectedQual}
              setSelected={setSelectedQual}
            />
          </div>
        </div>
      </div>
      <div className="filter-container">
        <p className="heading-text-2">Инстркуторы</p>
        <div className='horizontal-container'>
          <div className="filter-container">
            <SingleFilterButtons 
               filters={statuses.map(elem => ({id: elem.id, value: elem.value}))}
               selected={selectedInstructorStatus}
               setSelected={setSelectedInstructorStatus}
            />
            <InformationTable 
              columns={columns}
              data={transformedInstructors}
              numbered = {true}
            />
          </div>
          <div className="filter-container">
            <MultipleFilterButtons 
              title='Категория'
              filters={schoolStore.categories.map(elem => ({id: elem.id, value: elem.value}))}
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export default StaffPage;
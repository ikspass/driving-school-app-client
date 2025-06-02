import React, { useContext, useEffect, useState } from 'react'
import InformationTable from '../components/InformationTable';
import { Context } from '..';
import { observer } from 'mobx-react-lite'
import MultipleFilterButtons from '../components/UI/MultipleFilterButtons/MultipleFilterButtons';
import SingleFilterButtons from '../components/UI/SingleFilterButtons/SingleFilterButtons';
import { GROUP_ROUTE, STUDENT_ROUTE, INSTRUCTOR_ROUTE, TEACHER_ROUTE } from '../utils/consts';
import { fetchCategories, fetchGroups, fetchInstructors, fetchQuals, fetchStudents, fetchTeachers, fetchUsers } from '../http/adminAPI';

const StaffPage = observer(() => {

  const {userStore} = useContext(Context);
  const {schoolStore} = useContext(Context)

  const [loading, setLoading] = useState(true);
  
  const [instructors, setInstructors] = useState([])
  const [teachers, setTeachers] = useState([])
  const [categories, setCategories] = useState([])
  const [quals, setQuals] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructorsData = await fetchInstructors();
        setInstructors(instructorsData);

        const teachersData = await fetchTeachers();
        setTeachers(teachersData);

        const categories = await fetchCategories();
        setCategories(categories);

        const quals = await fetchQuals();
        setQuals(quals);

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    } 
    fetchData();
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
  
  const filteredTeachers = teachers.filter(teacher => {
    const matchesStatus = selectedTeacherStatus ? teacher.status === selectedTeacherStatus.value : true;
    const matchesQual = selectedQual ? teacher.quals.some(qual => qual.description === selectedQual.value) : true;    
    return matchesStatus && matchesQual;
  });
  
  const filteredInstructors = instructors.filter(instructor => {
    const matchesStatus = selectedInstructorStatus ? instructor.status === selectedInstructorStatus.value : true;
    const matchesCategory = selectedCategory.length > 0 
    ? selectedCategory.some(selected => 
        instructor.categories.some(category => category.value === selected.value)
      ) 
    : true;
    return matchesStatus && matchesCategory;
  });

  const transformedTeachers = filteredTeachers.map(teacher => ({
    ...teacher,
    quals: teacher.quals.map(qual => qual.description)
  }));

  const transformedInstructors = filteredInstructors.map(instructor => ({
    ...instructor,
    categories: instructor.categories.map(category => category.value)
  }));

  const teacherColumns = [
    { key: "user.fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${TEACHER_ROUTE}/${row.id}`},
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
    { key: "quals", label: "Квалификация", isLink: false},
    { key: "dateOfEmployment", label: "Дата приёма на работу", isLink: false},
    { key: "status", label: "Статус", isLink: false },
  ];

  const instructorColumns = [
    { key: "user.fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${INSTRUCTOR_ROUTE}/${row.id}`},
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
    { key: "categories", label: "Категория", isLink: false},
    { key: "dateOfEmployment", label: "Дата приёма на работу", isLink: false},
    { key: "status", label: "Статус", isLink: false },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

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
              columns={teacherColumns}
              data={transformedTeachers}
              numbered = {true}
            />
          </div>
          <div className="filter-container">
            <SingleFilterButtons 
              title='Квалификация'
              filters={quals.map(elem => ({id: elem.id, value: elem.description}))}
              selected={selectedQual}
              setSelected={setSelectedQual}
            />
          </div>
        </div>
      </div>
      <div className="filter-container">
        <p className="heading-text-2">Инструкторы</p>
        <div className='horizontal-container'>
          <div className="filter-container">
            <SingleFilterButtons 
               filters={statuses.map(elem => ({id: elem.id, value: elem.value}))}
               selected={selectedInstructorStatus}
               setSelected={setSelectedInstructorStatus}
            />
            <InformationTable 
              columns={instructorColumns}
              data={transformedInstructors}
              numbered = {true}
            />
          </div>
          <div className="filter-container">
            <MultipleFilterButtons 
              title='Категория'
              filters={categories.map(elem => ({id: elem.id, value: elem.value}))}
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
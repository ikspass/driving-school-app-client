import React, { useContext, useEffect, useState } from 'react'
import InformationTable from '../components/InformationTable'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import MultipleFilterButtons from '../components/UI/MultipleFilterButtons/MultipleFilterButtons'
import { fetchCategories, fetchGroups, fetchTeachers } from '../http/adminAPI'
import { GROUP_ROUTE, GROUPS_ROUTE, TEACHER_ROUTE } from '../utils/consts'

const GroupsPage = observer(() => {

  const {groupStore} = useContext(Context);
  const {schoolStore} = useContext(Context);
  const {userStore} = useContext(Context);

  useEffect(() => {
    fetchCategories().then(data => schoolStore.setCategories(data))
    fetchTeachers().then(data => userStore.setTeachers(data))
    fetchGroups().then(data => groupStore.setGroups(data))
  }, [])

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState([]);

  let filteredGroups;

  if(groupStore.groups){
    filteredGroups = groupStore.groups.filter(group => {
      const matchesCategory = selectedCategory.length === 0 || selectedCategory.some(cat => cat.value === group.category.value);
      const matchesTeacher = selectedTeacher.length === 0 || selectedTeacher.some(teacher => teacher.value === group.teacher.user.fullName);
      return matchesCategory && matchesTeacher;
    });
  }



  const columns = [
    { key: "name", label: "Группа", isLink: true, navigateTo: (row) => `${GROUP_ROUTE}/${row.id}`},
    { key: "category.value", label: "Категория", isLink: false },
    { key: "teacher.user.fullName", label: "Преподаватель", isLink: true, navigateTo: (row) => `${TEACHER_ROUTE}/${row.teacher.id}`},
    { key: "studentsCount", label: "Количество студентов", isLink: false },
    { key: "dateOfStart", label: "Дата начала обучения", isLink: false },
    { key: "status", label: "Статус", isLink: false }
  ];

  return (
    <>
        <div className="horizontal-container">
            <InformationTable 
              columns={columns} 
              data={groupStore.groups? filteredGroups : []}
              numbered={true}
            />
            <div className="filter-container">
              <MultipleFilterButtons 
                title='Категория'
                filters={schoolStore.categories.map(elem => ({id: elem.id, value: elem.value}))}
                selected={selectedCategory}
                setSelected={setSelectedCategory}
              />
              <MultipleFilterButtons 
                title='Преподаватель'
                filters={userStore.teachers.map(elem => ({id: elem.id, value: elem.user.fullName}))}
                selected={selectedTeacher}
                setSelected={setSelectedTeacher}
              />
            </div>
        </div>
    </>
  )
})

export default GroupsPage;

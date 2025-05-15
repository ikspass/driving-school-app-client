import React, { useContext, useEffect, useState } from 'react'
import InformationTable from '../components/InformationTable'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import MultipleFilterButtons from '../components/UI/MultipleFilterButtons/MultipleFilterButtons'
import { fetchCategories, fetchGroups, fetchTeachers, fetchUsers } from '../http/adminAPI'
import { GROUP_ROUTE, GROUPS_ROUTE, INSTRUCTOR_ROUTE, STUDENT_ROUTE, TEACHER_ROUTE } from '../utils/consts'
import Button from '../components/UI/Button/Button'
import CreateGroup from '../components/admin/CreateGroup'
import SingleFilterButtons from '../components/UI/SingleFilterButtons/SingleFilterButtons'
import Modal from '../components/Modal'

const GroupsPage = observer(() => {

  const {userStore} = useContext(Context);
  const {groupStore} = useContext(Context)
  const {schoolStore} = useContext(Context)

  const [createGroupModal, setCreateGroupModal] = useState(false)

  useEffect(() => {
    fetchUsers().then(data => userStore.setUsers(data))
    fetchGroups().then(data => groupStore.setGroups(data))
    fetchCategories().then(data => schoolStore.setCategories(data))
  }, [])

  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState([])

  const filteredGroups = groupStore.groups.filter(group => {
    const matchesCategory = selectedCategory ? group.categoryId === selectedCategory.id : true;
    const matchesTeacher = selectedTeacher ? group.teacherId === selectedTeacher.id : true;
    return matchesCategory && matchesTeacher;
  });

  const columns = [
    { key: "name", label: "Номер", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "category.value", label: "Категория", isLink: false },
    { key: "teacher.user.fullName", label: "Преподаватель", isLink: true, navigateTo: (row) => `${GROUP_ROUTE}/${row.id}`},
    { key: "dateOfStart", label: "Дата начала обучения", isLink: true, navigateTo: (row) => `${INSTRUCTOR_ROUTE}/${row.instructor.id}`},
    { key: "status", label: "Статус", isLink: false },
  ];

  return (
    <div className="filter-container">
      <div className='horizontal-container' style={{ width: '100%', justifyContent: 'space-between'}}>
        <div className="horizontal-container">
          <InformationTable 
            columns={columns}
            data={filteredGroups}
            numbered = {true}
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
              filters={userStore.teachers.map(elem => ({id: elem.id, value: elem.fullName}))}
              selected={selectedTeacher}
              setSelected={setSelectedTeacher}
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export default GroupsPage;

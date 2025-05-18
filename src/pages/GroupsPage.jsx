import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react'
import { Context } from '..';
import { fetchUsers, fetchCategories, fetchGroups } from '../http/adminAPI';
import Button from '../components/UI/Button/Button';
import { GROUP_ROUTE, TEACHER_ROUTE } from '../utils/consts';
import Modal from '../components/Modal';
import CreateGroup from '../components/admin/CreateGroup';
import InformationTable from '../components/InformationTable';
import MultipleFilterButtons from '../components/UI/MultipleFilterButtons/MultipleFilterButtons';
import SingleFilterButtons from '../components/UI/SingleFilterButtons/SingleFilterButtons';

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

  const statuses = [
    {id: 1, value: 'Активна'},
    {id: 2, value: 'Обучение окончено'},
  ]

  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState([])
  const [selectedStatus, setSelectedStatus] = useState(statuses[0])

  const filteredGroups = groupStore.groups.filter(group => {
    const matchesStatus = selectedStatus ? group.status == selectedStatus.value : true;
    const matchesCategory = selectedCategory.length > 0 ? selectedCategory.some(cat => cat.id === group.categoryId) : true;
    const matchesTeacher = selectedTeacher.length > 0 ? selectedTeacher.some(teacher => teacher.id === group.teacherId) : true;
    return matchesStatus && matchesCategory && matchesTeacher;
  });

  const columns = [
    { key: "name", label: "Номер", isLink: true , navigateTo: (row) => `${GROUP_ROUTE}/${row.id}`},
    { key: "category.value", label: "Категория", isLink: false },
    { key: "scheduleGroup.name", label: "Время", isLink: false },
    { key: "teacher.user.fullName", label: "Преподаватель", isLink: true, navigateTo: (row) => `${TEACHER_ROUTE}/${row.teacher.userId}`},
    { key: "dateOfStart", label: "Дата начала обучения", isLink: false},
    { key: "status", label: "Статус", isLink: false },
  ];

  const [selectedRow, setSelectedRow] = useState(null);


  return (
    <div className="filter-container">
      <Modal
        children={<CreateGroup onClose={() => setCreateGroupModal(false)}/>}
        isOpen={createGroupModal}
        onClose={() => setCreateGroupModal(false)}
      />
      <SingleFilterButtons 
        filters={statuses}
        selected={selectedStatus}
        setSelected={setSelectedStatus}
      />
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
              filters={userStore.teachers.map(elem => ({id: elem.teacher.id, value: elem.fullName}))}
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

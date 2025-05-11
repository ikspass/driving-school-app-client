import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react'
import { GROUP_ROUTE, INSTRUCTOR_ROUTE, STUDENT_ROUTE } from '../../utils/consts';
import { Context } from '../..';
import { fetchStudents, fetchGroups, fetchInstructors, fetchCategories, fetchUsers } from '../../http/adminAPI';
import InformationTable from '../../components/InformationTable';
import MultipleFilterButtons from '../../components/UI/MultipleFilterButtons/MultipleFilterButtons';
import SingleFilterButtons from '../../components/UI/SingleFilterButtons/SingleFilterButtons';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/Modal';
import CreateGroup from '../../components/admin/CreateGroup';

const AdminGroupsPage = observer(() => {
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
    const matchesStatus = selectedStatus ? group.status === selectedStatus.value : true;
    const matchesCategory = selectedCategory ? group.categoryId === selectedCategory.id : true;
    const matchesTeacher = selectedTeacher ? group.teacherId === selectedTeacher.id : true;
    return matchesCategory && matchesTeacher && matchesStatus;
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
              filters={userStore.teachers.map(elem => ({id: elem.id, value: elem.user.fullName}))}
              selected={selectedTeacher}
              setSelected={setSelectedTeacher}
            />
          </div>
        </div>
        <div className="button-container">
          <Button className='outline' onClick={() => setCreateGroupModal(true)}>Добавить группу</Button>
          <Button className='outline'>Редактировать данные</Button>
        </div>
      </div>
    </div>
  )
})

export default AdminGroupsPage;

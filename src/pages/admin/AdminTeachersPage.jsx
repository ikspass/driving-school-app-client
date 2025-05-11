import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react'
import { GROUP_ROUTE, INSTRUCTOR_ROUTE, STUDENT_ROUTE } from '../../utils/consts';
import { Context } from '../..';
import { fetchStudents, fetchGroups, fetchInstructors, fetchUsers } from '../../http/adminAPI';
import InformationTable from '../../components/InformationTable';
import MultipleFilterButtons from '../../components/UI/MultipleFilterButtons/MultipleFilterButtons';
import SingleFilterButtons from '../../components/UI/SingleFilterButtons/SingleFilterButtons';
import Button from '../../components/UI/Button/Button';
import CreateTeacher from '../../components/admin/CreateTeacher';
import Modal from '../../components/Modal';

const AdminTeachersPage = observer(() => {
  const {userStore} = useContext(Context);
  const {groupStore} = useContext(Context)

  const [createTeacherModal, setCreateTeacherModal] = useState(false)

  useEffect(() => {
    fetchUsers().then(data => userStore.setUsers(data))
    fetchGroups().then(data => groupStore.setGroups(data))
  }, [])

  const statuses = [
    {id: 1, value: 'Активен'},
    {id: 2, value: 'Не активен'},
    {id: 3, value: 'В отпуске'},
    {id: 4, value: 'Более не работает'},
  ]

  const [selectedGroup, setSelectedGroup] = useState([])
  const [selectedInstructor, setSelectedInstructor] = useState([])
  const [selectedStatus, setSelectedStatus] = useState(statuses[0])

  const filteredTeachers = userStore.students.filter(teacher => {
    const matchesStatus = selectedStatus ? teacher.status === selectedStatus.value : true;
    // const matchesGroup = selectedGroup ? teacher.group.value === selectedGroup.value : true;
    // const matchesInstructor = selectedInstructor ? teacher.instructor.user.fullName === selectedInstructor.value : true;
    return matchesStatus;
  });

  const columns = [
    { key: "fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "phoneNumber", label: "Номер телефона", isLink: false },
    { key: "group.name", label: "Квалификация", isLink: true, navigateTo: (row) => `${GROUP_ROUTE}/${row.id}`},
    { key: "teacher.dateOfEmployment", label: "Дата приёма на работу", isLink: true, navigateTo: (row) => `${INSTRUCTOR_ROUTE}/${row.instructor.id}`},
    { key: "teacher.status", label: "Статус", isLink: false },
  ];

  return (
    <div className="filter-container">
      <Modal
        children={<CreateTeacher/>}
        isOpen={createTeacherModal}
        onClose={() => setCreateTeacherModal(false)}
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
            data={filteredTeachers}
            numbered = {true}
          />
          {/* <div className="filter-container">
            <MultipleFilterButtons 
              title='Группа'
              filters={groupStore.groups.map(elem => ({id: elem.id, value: elem.name}))}
              selected={selectedGroup}
              setSelected={setSelectedGroup}
            />
            <MultipleFilterButtons 
              title='Инструктор'
              filters={userStore.instructors.map(elem => ({id: elem.id, value: elem.user.fullName}))}
              selected={selectedInstructor}
              setSelected={setSelectedInstructor}
            />
          </div> */}
        </div>
        <div className="button-container">
          <Button className='outline' onClick={() => setCreateTeacherModal(true)}>Добавить преподавателя</Button>
          <Button className='outline'>Редактировать данные</Button>
        </div>
      </div>
    </div>
  )
})

export default AdminTeachersPage;

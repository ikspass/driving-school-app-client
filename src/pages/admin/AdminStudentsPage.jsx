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
import CreateStudent from '../../components/admin/CreateStudent';

const AdminStudentsPage = observer(() => {
  const {userStore} = useContext(Context);
  const {groupStore} = useContext(Context)
  const {schoolStore} = useContext(Context)

  const [createStudentModal, setCreateStudentModal] = useState(false)

  useEffect(() => {
    fetchUsers().then(data => userStore.setUsers(data))
    fetchGroups().then(data => groupStore.setGroups(data))
    fetchCategories().then(data => schoolStore.setCategories(data))
  }, [])

  const statuses = [
    {id: 1, value: 'Активен'},
    {id: 2, value: 'Не активен'},
    {id: 3, value: 'Отчислен'},
    {id: 4, value: 'Окончил обучение'},
  ]


  const [selectedGroup, setSelectedGroup] = useState([])
  const [selectedInstructor, setSelectedInstructor] = useState([])
  const [selectedStatus, setSelectedStatus] = useState(statuses[0])

  const filteredStudents = userStore.students.filter(user => {
    const matchesStatus = selectedStatus ? user.student.status === selectedStatus.value : true;
    const matchesGroup = selectedGroup ? user.groupId === selectedGroup.id : true;
    const matchesInstructor = selectedInstructor ? user.instructorId === selectedInstructor.id : true;
    return matchesGroup && matchesInstructor && matchesStatus;
  });


  const columns = [
    { key: "fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "phoneNumber", label: "Номер телефона", isLink: false },
    { key: "group.name", label: "Группа", isLink: true, navigateTo: (row) => `${GROUP_ROUTE}/${row.id}`},
    { key: "instructor.fullName", label: "Инструктор", isLink: true, navigateTo: (row) => `${INSTRUCTOR_ROUTE}/${row.instructor.id}`},
    { key: "student.status", label: "Статус", isLink: false },
  ];

  const updateStudents = async () => {
    const data = await fetchUsers();
    userStore.setUsers(data);
  };

  return (
    <div className="filter-container">
      <Modal
        children={<CreateStudent onClose={() => {
          setCreateStudentModal(false);
          updateStudents()
        }}/>}
        isOpen={createStudentModal}
        onClose={() => setCreateStudentModal(false)}
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
            data={filteredStudents}
            numbered = {true}
          />
          <div className="filter-container">
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
          </div>
        </div>
        <div className="button-container">
          <Button className='outline' onClick={() => setCreateStudentModal(true)}>Добавить курсанта</Button>
          <Button className='outline'>Редактировать данные</Button>
        </div>
      </div>
    </div>
  )
})

export default AdminStudentsPage;

import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react'
import { GROUP_ROUTE, INSTRUCTOR_ROUTE, STUDENT_ROUTE, TEACHER_ROUTE } from '../../utils/consts';
import { Context } from '../..';
import { fetchStudents, fetchGroups, fetchInstructors, fetchUsers, fetchQuals } from '../../http/adminAPI';
import InformationTable from '../../components/InformationTable';
import SingleFilterButtons from '../../components/UI/SingleFilterButtons/SingleFilterButtons';
import Button from '../../components/UI/Button/Button';
import CreateTeacher from '../../components/admin/CreateTeacher';
import Modal from '../../components/Modal';

const AdminTeachersPage = observer(() => {
  const {userStore} = useContext(Context);
  const {groupStore} = useContext(Context)
  const {schoolStore} = useContext(Context)

  const [createTeacherModal, setCreateTeacherModal] = useState(false)

  useEffect(() => {
    fetchUsers().then(data => userStore.setUsers(data))
    fetchQuals().then(data => schoolStore.setQuals(data))
  }, [])

  const statuses = [
    {id: 1, value: 'Активен'},
    {id: 2, value: 'Не активен'},
    {id: 3, value: 'В отпуске'},
    {id: 4, value: 'Более не работает'},
  ]

  const [selectedQual, setSelectedQual] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(statuses[0])
  const filteredTeachers = userStore.teachers.filter(user => {
    const matchesStatus = selectedStatus ? user.teacher.status === selectedStatus.value : true;
    const matchesQual = selectedQual ? user.teacher.quals.some(qual => qual.description === selectedQual.value) : true;    
    return matchesStatus && matchesQual;
  });
  
  const transformedTeachers = filteredTeachers.map(teacher => ({
    ...teacher,
    // Преобразуем массив квалификаций в строку с описаниями
    teacher: {
      ...teacher.teacher,
      quals: teacher.teacher.quals.map(qual => qual.description) // Объединяем описания в строку
    },
  }));
  
  const columns = [
    { key: "fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${TEACHER_ROUTE}/${row.id}`},
    { key: "phoneNumber", label: "Номер телефона", isLink: false },
    { key: "teacher.quals", label: "Квалификация", isLink: false},
    { key: "teacher.dateOfEmployment", label: "Дата приёма на работу", isLink: false},
    { key: "teacher.status", label: "Статус", isLink: false },
  ];

  const updateTeachers = async () => {
    const data = await fetchUsers();
    userStore.setUsers(data);
  };

  return (
    <div className="filter-container">
      <Modal
        children={<CreateTeacher onClose={() => {
          setCreateTeacherModal(false)
          updateTeachers()
        }}/>}
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
            data={transformedTeachers}
            numbered = {true}
          />
          <div className="filter-container">
            <SingleFilterButtons 
              title='Квалификация'
              filters={schoolStore.quals.map(elem => ({id: elem.id, value: elem.description}))}
              selected={selectedQual}
              setSelected={setSelectedQual}
            />
          </div>
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

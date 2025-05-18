import React, { useContext, useEffect, useState } from 'react'
import InformationTable from '../components/InformationTable';
import { Context } from '..';
import { observer } from 'mobx-react-lite'
import MultipleFilterButtons from '../components/UI/MultipleFilterButtons/MultipleFilterButtons';
import { GROUP_ROUTE, STUDENT_ROUTE, INSTRUCTOR_ROUTE } from '../utils/consts';
import { fetchGroups, fetchInstructors, fetchStudents, fetchUsers } from '../http/adminAPI';

const StudentsPage = observer(() => {

  const {userStore} = useContext(Context);
  const {groupStore} = useContext(Context)

  useEffect(() => {
    fetchUsers().then(data => userStore.setUsers(data))
    fetchGroups().then(data => groupStore.setGroups(data))
  }, [])

  const [selectedGroup, setSelectedGroup] = useState([])
  const [selectedInstructor, setSelectedInstructor] = useState([])

  const filteredStudents = userStore.students.filter(user => {
    let matchesGroup = true;
    let matchesInstructor = true;
    if(user.student.groupId){
      matchesGroup = selectedGroup ? user.student.groupId === selectedGroup.id : true;
    }
    if(user.student.instructorId){
      matchesInstructor = selectedInstructor ? user.student.instructorId === selectedInstructor.id : true;
    }
    return matchesGroup && matchesInstructor;
  });

  console.log(filteredStudents)
  console.log(userStore.students)

  const columns = [
    { key: "fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "dateOfBirth", label: "Дата рождения", isLink: false },
    { key: "phoneNumber", label: "Номер телефона", isLink: false },
    { key: "student.instructor.fullName", label: "Инструктор", isLink: true, navigateTo: (row) => `${INSTRUCTOR_ROUTE}/${row.instructor.userId}`},
    { key: "group.name", label: "Группа", isLink: true, navigateTo: (row) => `${GROUP_ROUTE}/${row.group.id}`},
    { key: "status", label: "Статус", isLink: false },
  ];

  return (
    <div className='horizontal-container'>
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
  )
})

export default StudentsPage;
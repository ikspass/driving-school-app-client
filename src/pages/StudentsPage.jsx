import React, { useContext, useEffect, useState } from 'react'
import InformationTable from '../components/InformationTable';
import { Context } from '..';
import { observer } from 'mobx-react-lite'
import MultipleFilterButtons from '../components/UI/MultipleFilterButtons/MultipleFilterButtons';
import { GROUP_ROUTE, STUDENT_ROUTE, INSTRUCTOR_ROUTE } from '../utils/consts';
import { fetchGroups, fetchInstructors, fetchStudents } from '../http/adminAPI';

const StudentsPage = observer(() => {

  const {student} = useContext(Context);
  const {group} = useContext(Context)

  useEffect(() => {
    fetchStudents().then(data => student.setStudents(data))
    fetchGroups().then(data => student.setGroups(data))
    fetchInstructors().then(data => student.setInstructors(data))
  }, [])

  const [selectedGroup, setSelectedGroup] = useState([])
  const [selectedInstructor, setSelectedInstructor] = useState([])

  const filteredStudents = student.students.filter(student => {
    const matchesGroup = selectedGroup ? student.group.value === selectedGroup.value : true;
    const matchesInstructor = selectedInstructor ? student.instructor.user.fullName === selectedInstructor.value : true;
    return matchesGroup && matchesInstructor;
  });

  const columns = [
    { key: "user.fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "user.dateOfBirth", label: "Дата рождения", isLink: false },
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
    { key: "user.instructor.fullName", label: "Инструктор", isLink: true, navigateTo: (row) => `${INSTRUCTOR_ROUTE}/${row.instructor.id}`},
    { key: "group.name", label: "Группа", isLink: true, navigateTo: (row) => `${GROUP_ROUTE}/${row.id}`},
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
          filters={group.groups.map(elem => ({id: elem.id, value: elem.name}))}
          selected={selectedGroup}
          setSelected={setSelectedGroup}
        />
        <MultipleFilterButtons 
          title='Инструктор'
          filters={student.instructors.map(elem => ({id: elem.id, value: elem.user.fullName}))}
          selected={selectedInstructor}
          setSelected={setSelectedInstructor}
        />
      </div>
    </div>
  )
})

export default StudentsPage;
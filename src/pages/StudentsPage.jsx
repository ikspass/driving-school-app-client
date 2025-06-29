import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useContext } from 'react'
import { GROUP_ROUTE, INSTRUCTOR_ROUTE, STUDENT_ROUTE } from '../utils/consts';
import { fetchGroups, fetchInstructors, fetchUserById } from '../http/adminAPI';
import InformationTable from '../components/InformationTable';
import MultipleFilterButtons from '../components/UI/MultipleFilterButtons/MultipleFilterButtons';
import SingleFilterButtons from '../components/UI/SingleFilterButtons/SingleFilterButtons';
import Modal from '../components/Modal';
import CreateStudent from '../components/admin/CreateStudent';
import { Context } from '..';

const StudentsPage = observer(() => {

  const { userStore } = useContext(Context);
  const role = userStore.user.role;

  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);

  const [createStudentModal, setCreateStudentModal] = useState(false)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserById(userStore.user.id);
        if(role === 'teacher'){
          const teacher = userData.teacher;

          const instructorsData = await fetchInstructors();
          setInstructors(instructorsData);    

          setGroups(teacher.groups)

          const students = teacher.groups.flatMap(group => group.students);
          setStudents(students)
        }
        if(role === 'instructor'){
          const instructor = userData.instructor;

          const groupsData = await fetchGroups();
          setGroups(groupsData);

          setStudents(instructor.students)

        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statuses = [
    {id: 1, value: 'Активен'},
    {id: 2, value: 'Не активен'},
  ]

  const [selectedGroup, setSelectedGroup] = useState([])
  const [selectedInstructor, setSelectedInstructor] = useState([])
  const [selectedStatus, setSelectedStatus] = useState(statuses[0])

  const filteredStudents = students.filter(student => {
    const matchesStatus = selectedStatus ? student.status === selectedStatus.value : true;
    const matchesGroup = selectedGroup.length > 0 ? selectedGroup.some(group => group.id === student.groupId) : true;
    const matchesInstructor = selectedInstructor.length > 0 ? selectedInstructor.some(instructor => instructor.id === student.instructorId) : true;
    return matchesGroup && matchesInstructor && matchesStatus;
  });



  const columns = role === 'instructor' ?
  [
    { key: "user.fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
    { key: "group.name", label: "Группа", isLink: true, navigateTo: (row) => `${GROUP_ROUTE}/${row.groupId}`},
    { key: "status", label: "Статус", isLink: false },
  ]
  :
  [
    { key: "user.fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
    { key: "group.name", label: "Группа", isLink: true, navigateTo: (row) => `${GROUP_ROUTE}/${row.groupId}`},
    { key: "instructor.user.fullName", label: "Инструктор", isLink: true, navigateTo: (row) => `${INSTRUCTOR_ROUTE}/${row.instructor.id}`},
    { key: "status", label: "Статус", isLink: false },
  ]

  const updateStudents = async () => {
    const userData = await fetchUserById(userStore.user.id);
    const teacher = userData.teacher;
    const students = teacher.groups.flatMap(group => group.students);
    setStudents(students)
  };

  const groupFilters = groups.map(elem => ({id: elem.id, value: elem.name}));

  const instructorFilters =[
    {id: null, value: 'Без инструктора'},
    ...instructors.map(elem => ({id: elem.id, value: elem.user.fullName}))
  ]

  if (loading) {
    return <div className="small-text">Загрузка...</div>;
  }

  return (
    <div className="filter-container">
      <p className="heading-text-2">Курсанты</p>
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
              filters={groupFilters}
              selected={selectedGroup}
              setSelected={setSelectedGroup}
            />
            {role !== 'instructor' &&
              <MultipleFilterButtons 
                title='Инструктор'
                filters={instructorFilters}
                selected={selectedInstructor}
                setSelected={setSelectedInstructor}
              />
            }
          </div>
        </div>
      </div>
    </div>
  )
})

export default StudentsPage;

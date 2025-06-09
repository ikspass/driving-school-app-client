import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useContext } from 'react'
import { GROUP_ROUTE, INSTRUCTOR_ROUTE, STUDENT_ROUTE } from '../../utils/consts';
import { fetchStudents, fetchGroups, fetchInstructors } from '../../http/adminAPI';
import InformationTable from '../../components/InformationTable';
import MultipleFilterButtons from '../../components/UI/MultipleFilterButtons/MultipleFilterButtons';
import SingleFilterButtons from '../../components/UI/SingleFilterButtons/SingleFilterButtons';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/Modal';
import CreateStudent from '../../components/admin/CreateStudent';
import { Context } from '../..';

const AdminStudentsPage = observer(() => {

  const {modalStore} = useContext(Context)

  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);

  const [createStudentModal, setCreateStudentModal] = useState(false)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await fetchStudents();
        setStudents(students);
        const instructors = await fetchInstructors();
        setInstructors(instructors);
        const groups = await fetchGroups();
        setGroups(groups);

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

  const columns = [
    { key: "user.fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "group.name", label: "Группа", isLink: true, navigateTo: (row) => `${GROUP_ROUTE}/${row.groupId}`},
    { key: "instructor.user.fullName", label: "Инструктор", isLink: true, navigateTo: (row) => `${INSTRUCTOR_ROUTE}/${row.instructor.id}`},
  ];

  const updateStudents = async () => {
    const data = await fetchStudents();
    setStudents(data);
  };

  const groupFilters = [
    {id: null, value: 'Без группы'},
    ...groups.map(elem => ({id: elem.id, value: elem.name}))
  ];

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
      <div className='horizontal-container'>
          <InformationTable 
            style={{width: '100%'}}
            columns={columns}
            data={filteredStudents}
            numbered = {true}
          />
          <div className="content-container" style={{width: '200px'}}>
            <MultipleFilterButtons 
              title='Группа'
              filters={groupFilters}
              selected={selectedGroup}
              setSelected={setSelectedGroup}
            />
            <MultipleFilterButtons 
              title='Инструктор'
              filters={instructorFilters}
              selected={selectedInstructor}
              setSelected={setSelectedInstructor}
            />
        </div>
        <div className="button-container">
          <Button className='outline' onClick={() => setCreateStudentModal(true)} style={{width: '100%'}}>Добавить курсанта</Button>
        </div>
      </div>
    </div>
  )
})

export default AdminStudentsPage;

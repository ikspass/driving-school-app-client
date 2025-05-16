import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react'
import { GROUP_ROUTE, INSTRUCTOR_ROUTE, STUDENT_ROUTE } from '../../utils/consts';
import { Context } from '../..';
import { fetchCategories, fetchGroups, fetchUsers } from '../../http/adminAPI';
import InformationTable from '../../components/InformationTable';
import MultipleFilterButtons from '../../components/UI/MultipleFilterButtons/MultipleFilterButtons';
import SingleFilterButtons from '../../components/UI/SingleFilterButtons/SingleFilterButtons';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/Modal';
import CreateInstructor from '../../components/admin/CreateInstructor';

const AdminInstructorsPage = observer(() => {
  const {userStore} = useContext(Context);
  const {groupStore} = useContext(Context)
  const {schoolStore} = useContext(Context)

  const [createInstructorModal, setCreateInstructorModal] = useState(false)

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
  const [selectedRow, setSelectedRow] = useState(null);


  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedInstructor, setSelectedInstructor] = useState([])
  const [selectedStatus, setSelectedStatus] = useState(statuses[0])

  const filteredInstructors = userStore.instructors.filter(user => {
    const matchesStatus = selectedStatus ? user.instructor.status === selectedStatus.value : true;
    return matchesStatus;
  });
  
  console.log(filteredInstructors)

  const columns = [
    { key: "fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "phoneNumber", label: "Номер телефона", isLink: false },
    { key: "instructor.dateOfEmployment", label: "Инструктор", isLink: true, navigateTo: (row) => `${INSTRUCTOR_ROUTE}/${row.instructor.id}`},
    { key: "instructor.categories", label: "Категории", isLink: false },
    { key: "instructor.dateOfEmployment", label: "Дата приёма на работу", isLink: false },
    { key: "status", label: "Статус", isLink: false },
  ];

  return (
    <div className="filter-container">
      <Modal
        children={<CreateInstructor onClose={() => setCreateInstructorModal(false)}/>}
        isOpen={createInstructorModal}
        onClose={() => setCreateInstructorModal(false)}
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
            data={filteredInstructors}
            numbered = {true}
            selectable = {true}
            setSelectedRow={setSelectedRow}
          />
          <div className="filter-container">
            <MultipleFilterButtons 
              title='Категория'
              filters={schoolStore.categories.map(elem => ({id: elem.id, value: elem.value}))}
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
          </div>
        </div>
        <div className="button-container">
          <Button className='outline' onClick={() => setCreateInstructorModal(true)}>Добавить инструктора</Button>
          <Button className='outline'>Редактировать данные</Button>
        </div>
      </div>
    </div>
  )
})

export default AdminInstructorsPage;

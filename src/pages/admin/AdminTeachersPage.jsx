import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react'
import { TEACHER_ROUTE } from '../../utils/consts';
import { fetchTeachers } from '../../http/adminAPI';
import SingleFilterButtons from '../../components/UI/SingleFilterButtons/SingleFilterButtons';
import Button from '../../components/UI/Button/Button';
import CreateTeacher from '../../components/admin/CreateTeacher';
import Modal from '../../components/Modal';
import InformationTable from '../../components/InformationTable';

const AdminTeachersPage = observer(() => {

  const [teachers, setTeachers] = useState([])

  const [createTeacherModal, setCreateTeacherModal] = useState(false)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachers = await fetchTeachers();
        setTeachers(teachers);
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

  const [selectedStatus, setSelectedStatus] = useState(statuses[0])

  const filteredTeachers = teachers.filter(teacher => {
    const matchesStatus = selectedStatus ? teacher.status === selectedStatus.value : true;
    return matchesStatus;
  });

  const columns = [
    { key: "user.fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${TEACHER_ROUTE}/${row.id}`},
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
    { key: "dateOfEmployment", label: "Дата приёма на работу", isLink: false},
    { key: "status", label: "Статус", isLink: false },
  ];

  const updateTeachers = async () => {
    const data = await fetchTeachers();
    setTeachers(data);
  };


  if (loading) {
    return <div className="small-text">Загрузка...</div>;
  }

  return (
    <div className="filter-container">
      <p className="heading-text-2">Преподаватели</p>
      <Modal
        children={<CreateTeacher onClose={() => {
          setCreateTeacherModal(false)
          updateTeachers()
        }}/>}
        isOpen={createTeacherModal}
        onClose={() => setCreateTeacherModal(false)}
        />
      <SingleFilterButtons filters={statuses} selected={selectedStatus} setSelected={setSelectedStatus} />
      <div className='horizontal-container' style={{ width: '100%', justifyContent: 'space-between'}}>
          <InformationTable
            style={{width: '100%'}}
            columns={columns}
            data={filteredTeachers}
            numbered={true}
          />
        <div className="button-container">
          <Button className='outline' onClick={() => setCreateTeacherModal(true)}>Добавить преподавателя</Button>
        </div>
      </div>
    </div>
  )
})

export default AdminTeachersPage;
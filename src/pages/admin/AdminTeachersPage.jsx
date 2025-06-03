import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react'
import { TEACHER_ROUTE } from '../../utils/consts';
import { Context } from '../..';
import { fetchUsers, fetchQuals, deleteTeacher, deleteUser, fetchTeacherQuals, fetchTeachers } from '../../http/adminAPI';
import SelectableInformationTable from '../../components/SelectableInformationTable'
import SingleFilterButtons from '../../components/UI/SingleFilterButtons/SingleFilterButtons';
import Button from '../../components/UI/Button/Button';
import CreateTeacher from '../../components/admin/CreateTeacher';
import Modal from '../../components/Modal';
import InformationTable from '../../components/InformationTable';

const AdminTeachersPage = observer(() => {

  const [teachers, setTeachers] = useState([])
  const [quals, setQuals] = useState([])

  const [createTeacherModal, setCreateTeacherModal] = useState(false)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachers = await fetchTeachers();
        setTeachers(teachers);
        const quals = await fetchQuals();
        setQuals(quals);
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
    {id: 3, value: 'В отпуске'},
    {id: 4, value: 'Более не работает'},
  ]

  const [selectedQual, setSelectedQual] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(statuses[0])

  const filteredTeachers = teachers.filter(teacher => {
    const matchesStatus = selectedStatus ? teacher.status === selectedStatus.value : true;
    const matchesQual = selectedQual ? teacher.quals.some(qual => qual.description === selectedQual.value) : true;
    return matchesStatus && matchesQual;
  });

  const transformedTeachers = filteredTeachers.map(teacher => ({
    ...teacher,
    quals: teacher.quals.map(qual => qual.description) // Объединяем описания в строку
  }));

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
    return <div>Loading...</div>;
  }

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
      <SingleFilterButtons filters={statuses} selected={selectedStatus} setSelected={setSelectedStatus} />
      <div className='horizontal-container' style={{ width: '100%', justifyContent: 'space-between'}}>
        <div className="horizontal-container">
          <InformationTable
            columns={columns}
            data={transformedTeachers}
            numbered={true}
          />
        </div>
        <div className="button-container">
          <Button className='outline' onClick={() => setCreateTeacherModal(true)}>Добавить преподавателя</Button>
        </div>
      </div>
    </div>
  )
})

export default AdminTeachersPage;
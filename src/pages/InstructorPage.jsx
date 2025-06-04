import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import { deleteInstructor, fetchInstructorById, fetchStudents, fetchStudentsByInstructor, fetchUserById } from '../http/adminAPI';
import Button from '../components/UI/Button/Button';
import InformationTable from '../components/InformationTable';
import DescriptionTable from '../components/DescriptionTable';
import PinList from '../components/UI/PinList/PinList';
import AssignTransport from '../components/admin/AssignTransport';
import Modal from '../components/Modal';
import { ADMIN_ROUTE, ERROR_PAGE, GROUP_ROUTE, STUDENT_ROUTE } from '../utils/consts';
import AssignStudent from '../components/admin/AssignStudent';
import WarningModal from '../components/WarningModal';
import ButtonBack from '../components/UI/ButtonBack/ButtonBack';

const InstructorPage = observer(() => {

  const [instructor, setInstructor] = useState({})
  const [students, setStudents] = useState([])
  const [data, setData] = useState([])
  const navigate = useNavigate()

  const {userStore} = useContext(Context)
  const role = userStore.user.role;

  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [assignTransportModal, setAssignTransportModal] = useState(false)
  const [assignStudentModal, setAssignStudentModal ] = useState(false)
  const [warningModal, setWarningModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructor = await fetchInstructorById(id);
        setInstructor(instructor);
        const students = await fetchStudentsByInstructor(instructor.id);
        setStudents(students);

        const dataForAdmin = [
          { key: 'ФИО', value: instructor.user.fullName },
          { key: 'Номер телефона', value: instructor.user.phoneNumber },
          { key: 'Дата рождения', value: instructor.user.dateOfBirth },
          { key: 'Идентификационный номер', value: instructor.user.idNumber },
          { key: 'Номер паспорта', value: instructor.user.passportNumber },
        ]

        const dataForStudent = [
          { key: 'ФИО', value: instructor.user.fullName },
          { key: 'Номер телефона', value: instructor.user.phoneNumber },
          { key: 'Дата рождения', value: instructor.user.dateOfBirth },
        ]

        if(role === 'admin') setData(dataForAdmin);
        if(role === 'instructor' || role === 'teacher' || role === 'student') setData(dataForStudent);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        if(role === 'student'){
          if(id != userStore.user.student.instructorId){
            navigate(ERROR_PAGE)
          }
        }
      }
    };
    fetchData();
  }, []);

  const transportColumns = [
    { key: "name", label: "Название", isLink: false},
    { key: "sign", label: "Номерной знак", isLink: false},
    { key: "color", label: "Цвет", isLink: false},
    { key: "category.value", label: "Категория", isLink: false},
  ]

  const studentColumns = [
    { key: "user.fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "user.dateOfBirth", label: "Дата рождения", isLink: false },
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
    { key: "group.name", label: "Группа", isLink: true, navigateTo: (row) => `${GROUP_ROUTE}/${row.group.id}`},
    { key: "status", label: "Статус", isLink: false }
  ]

  const updateStudents = async () => {
    const students = await fetchStudentsByInstructor(instructor.id);
    setStudents(students);
  }
  const updateInstructor = async () => {
    const instructor = await fetchInstructorById(id);
    setInstructor(instructor);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDeleteInstructor = async () => {
    await deleteInstructor(id)
  }

  return (
    <>
    {role === 'admin' && 
      <NavLink to={ADMIN_ROUTE}>
        <ButtonBack />
      </NavLink>
      }
    <Modal 
      children={<AssignTransport instructor={instructor} onClose={() => {
        setAssignTransportModal(false);
        updateInstructor();
      }}/>}
      isOpen={assignTransportModal}
      onClose={() => setAssignTransportModal(false)}
    />
    <Modal 
      children={<AssignStudent instructor={instructor} onClose={() => {
        setAssignStudentModal(false);
        updateStudents();
      }}/>}
      isOpen={assignStudentModal}
      onClose={() => setAssignStudentModal(false)}
    />
      <div className="content-container">
        <p className="heading-text-2">Персональные данные инструктора</p>
        <div className="content-container">
          <div className="horizontal-container">
            <div className="image-container">
              <img src={`${process.env.REACT_APP_API_URL}/${instructor.user.img}`} alt={instructor.user.fullName} />
            </div>
            <DescriptionTable
              value={data}
            />
            <div className="filter-container">
              <PinList
                value={[instructor.status, instructor.categories.map(category => category.value), ]}
              />
            </div>
            { role === 'admin' &&
              <div style={{ display: 'flex', flex: 1, justifyContent: 'end' }}>
                <div className="button-container">
                  <Button className='outline' style={{ width: '100%' }}>Редактировать данные ()</Button>
                  <Button className='outline' style={{ width: '100%' }} onClick={() => setAssignTransportModal(true)}>Назначить транспорт</Button>
                  <Button className='outline' style={{ width: '100%' }} onClick={() => setAssignStudentModal(true)}>Добавить курсантов</Button>
                  <Button className='danger' style={{ width: '100%' }} onClick={() => setWarningModal(true)}>Удалить</Button>
                  <WarningModal
                    style={{top: '-46px'}}
                    text='Вы уверены что хотите удалить инструктора?'
                    isOpen={warningModal}
                    onConfirm={() => {
                      setWarningModal(false)
                      handleDeleteInstructor()
                      navigate(ADMIN_ROUTE)
                    }}
                    onCancel={() => setWarningModal(false)}
                  />
                </div>
              </div>
            }
          </div>
        </div>
        <p className="heading-text-2">Транспорт</p>
        <InformationTable
          columns={transportColumns}
          data={instructor.transports ? instructor.transports : []}
        />
        {role !== 'student' &&
          <>
            <p className="heading-text-2">Курсанты</p>
            <InformationTable
              columns={studentColumns}
              data={students}
            />
          </>
        }
      </div>
    </>
  );
});

export default InstructorPage;
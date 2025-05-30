import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import { fetchInstructorById, fetchStudents, fetchStudentsByInstructor, fetchUserById } from '../http/adminAPI';
import Button from '../components/UI/Button/Button';
import InformationTable from '../components/InformationTable';
import DescriptionTable from '../components/DescriptionTable';
import PinList from '../components/UI/PinList/PinList';
import AssignTransport from '../components/admin/AssignTransport';
import Modal from '../components/Modal';
import { ERROR_PAGE, GROUP_ROUTE, STUDENT_ROUTE } from '../utils/consts';
import AssignStudent from '../components/admin/AssignStudent';

const InstructorPage = observer(() => {

  const [instructor, setInstructor] = useState({})
  const [students, setStudents] = useState([])
  const [data, setData] = useState([])
  const navigate = useNavigate()

  const {userStore} = useContext(Context)
  const role = userStore.user.role.value;

  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [assignTransportModal, setAssignTransportModal] = useState(false)
  const [assignStudentModal, setAssignStudentModal ] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructor = await fetchInstructorById(id);
        setInstructor(instructor);
        const students = await fetchStudentsByInstructor(instructor.id);
        setStudents(students);
        const instructorData = role === 'admin' ? 
        [
          { key: 'ФИО', value: instructor.user.fullName },
          { key: 'Адрес', value: instructor.user.adress },
          { key: 'Номер телефона', value: instructor.user.phoneNumber },
          { key: 'Дата рождения', value: instructor.user.dateOfBirth },
          { key: 'Идентификационный номер', value: instructor.user.idNumber },
          { key: 'Номер паспорта', value: instructor.user.passportNumber },
        ] :
        [
          { key: 'ФИО', value: instructor.user.fullName },
          { key: 'Номер телефона', value: instructor.user.phoneNumber },
          { key: 'Дата рождения', value: instructor.user.dateOfBirth },
        ];
        setData(instructorData);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Modal 
      children={<AssignTransport onClose={() => {
        setAssignTransportModal(false);
      }}/>}
      isOpen={assignTransportModal}
      onClose={() => setAssignTransportModal(false)}
    />
    <Modal 
      children={<AssignStudent onClose={() => {
        setAssignStudentModal(false);
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
                  <Button className='outline' style={{ width: '100%' }} onClick={() => setAssignTransportModal(true)}>Назначить автомобиль</Button>
                  <Button className='outline' style={{ width: '100%' }} onClick={() => setAssignStudentModal(true)}>Назначить курсанта ()</Button>
                  <Button className='outline' style={{ width: '100%' }}>Отправить в отпуск ()</Button>
                  <Button className='danger' style={{ width: '100%' }}>Уволить ()</Button>
                </div>
              </div>
            }
          </div>
          <p className="heading-text-2">Информация</p>
          <div style={{ width: '50vw' }}>
            <DescriptionTable
              value={[
                {
                  key: 'Статус',
                  // value: user.teacher ? user.teacher.quals.map(qual => qual.description) : [],
                  value: instructor.status,
                },
                {
                  key: 'Категории',
                  // value: user.teacher ? user.teacher.quals.map(qual => qual.description) : [],
                  value: instructor.categories.map(category => category.value),
                },
              ]}
            />
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
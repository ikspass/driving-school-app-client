import React, {useContext, useState, useEffect} from 'react'
import DescriptionTable from "../components/DescriptionTable"
import InformationTable from '../components/InformationTable'
import Button from '../components/UI/Button/Button'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { ADMIN_ROUTE, ERROR_PAGE, GROUP_ROUTE, INSTRUCTOR_ROUTE } from '../utils/consts'
import { deleteStudent, fetchStudentById, fetchUserById, fetchUsers, updateStudentStatus } from '../http/adminAPI'
import Modal from '../components/Modal'
import AssignInstructor from '../components/admin/AssignInstructor'
import StudentChangeGroup from '../components/admin/StudentChangeGroup'
import WarningModal from '../components/WarningModal'
import SuccessModal from '../components/SuccessModal'
import PinList from '../components/UI/PinList/PinList'
import ButtonBack from '../components/UI/ButtonBack/ButtonBack'
import { fetchStudentLectureByStudentId } from '../http/eventAPI'
import Calendar from '../components/Calendar'
import UpdateUser from '../components/admin/UpdateUser'

const StudentPage = observer(({}) => {

  const {userStore} = useContext(Context)

  const navigate = useNavigate()
  const [student, setStudent] = useState({})
  const [studentLectures, setStudentLectures] = useState({})
  const [studentTests, setStudentTests] = useState({})
  const [studentTestsStat, setStudentTestsStat] = useState({})

  const role = userStore.user.role;

  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  
  const [assignInstructorModal, setAssignInstructorModal] = useState(false)
  const [changeGroupModal, setChangeGroupModal] = useState(false)

  const [changeDataModal, setChangeDataModal] = useState(false)
  const [warningModal, setWarningModal] = useState(false)
  const [updateUserModal, setUpdateUserModal ] = useState(false)

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const userData = await fetchUserById(userStore.user.id);

        await updateData();

        if(role === 'student'){
          if(id != userData.student?.id){
            navigate(ERROR_PAGE)
          }
        }
        
      } catch (error) {
        console.error(error);
        navigate(ERROR_PAGE)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateData = async () => {
    const studentData = await fetchStudentById(id);
    setStudent(studentData);

    await setStudentLectures(studentData.studentLectures.filter(lecture => lecture.attended === false))
    await setStudentTests(studentData.studentTests.filter(test => test.attended === false))
    await setStudentTestsStat(studentData.studentTests)

    const dataForTable = role === 'admin' ?
    [
      {key:'ФИО', value: studentData.user.fullName},
      {key:'Номер телефона', value: studentData.user.phoneNumber},
      {key:'Дата рождения', value: studentData.user.dateOfBirth},
      {key:'Идентификационный номер', value: studentData.user.idNumber},
      {key:'Номер паспорта', value: studentData.user.passportNumber},
    ]
    :
    [
      {key:'ФИО', value: studentData.user.fullName},
      {key:'Номер телефона', value: studentData.user.phoneNumber},
      {key:'Дата рождения', value: studentData.user.dateOfBirth},
    ]
    setTableData(dataForTable);
  }

  const handleDeleteStudent = async () => {
    await deleteStudent(id)
  }

  if (loading) {
    return <div className="small-text">Загрузка...</div>;
  }

  return (
    <>
      {role === 'admin' && 
      <NavLink to={ADMIN_ROUTE}>
        <ButtonBack />
      </NavLink>
      }
      <Modal 
        children={
          <AssignInstructor
            student={student}
            onClose={() => {
              setAssignInstructorModal(false);
              updateData()
            }}
          />
        }
        isOpen={assignInstructorModal}
        onClose={() => setAssignInstructorModal(false)}
      />
      <Modal 
        children={
          <StudentChangeGroup
            student={student}
            onClose={() => {
              setChangeGroupModal(false);
              updateData()
            }}
          />
        }
        isOpen={changeGroupModal}
        onClose={() => setChangeGroupModal(false)}
      />
      <Modal 
        children={<UpdateUser user={student.user} onClose={() => {
          setUpdateUserModal(false);
          updateData();
        }}/>}
        isOpen={updateUserModal}
        onClose={() => setUpdateUserModal(false)}
      />

      <div className="content-container">
        <p className="heading-text-2">Персональные данные курсанта</p>
        <div className="content-container">
          <div className="horizontal-container">
            <div className="image-container">
              <img src={`${process.env.REACT_APP_API_URL}/${student.user.img}`} alt={student.user.fullName} />
            </div>
            <DescriptionTable
              value = {tableData}
            />
            <div className="filter-container">
              <PinList
                value={[student.status]}
              />
            </div>
            {role === 'admin' &&
            <div style={{display: 'flex', flex: 1, justifyContent: 'end'}}>
              <div className="button-container">
                <Button className='outline' style={{width: '100%'}} onClick={() => setUpdateUserModal(true)}>Редактировать данные</Button>
                <Button className='outline' style={{width: '100%'}} onClick={() => setAssignInstructorModal(true)}>Изменить инструктора</Button>
                <Button className='outline' style={{width: '100%'}} onClick={() => setChangeGroupModal(true)}>Изменить группу</Button>
                <Button className='danger' style={{width: '100%'}} onClick={() => setWarningModal(true)}>Удалить</Button>
                <WarningModal 
                  style={{top: '-46px'}}
                  text='Вы уверены что хотите удалить курсанта?'
                  isOpen={warningModal}
                  onConfirm={() => {
                    setWarningModal(false)
                    handleDeleteStudent()
                    navigate(ADMIN_ROUTE)
                  }}
                  onCancel={() => setWarningModal(false)}
                />
              </div>
            </div>
            }
          </div>
          <p className="heading-text-2">Информация</p>
          <div style={{width: '50vw'}}>
            <DescriptionTable 
              value = {[
                {
                  key:'Инструктор',
                  value: student.instructor ? student.instructor.user.fullName : null,
                  link: student.instructor ? `${INSTRUCTOR_ROUTE}/${student.instructor.id}` : null
                },
                {
                  key:'Группа',
                  value: student.group ? student.group.name : null,
                  link: student.group ? `${GROUP_ROUTE}/${student.group.id}` : null
                },
              ]}
            />
          </div>
        </div>
        {role !== 'student' &&
        <>
            <div className="filter-container">
              <p className="heading-text-2">Зачёты</p>
              <InformationTable 
                columns={[
                  {label: 'Зачёт', key: 'testEvent.test.name'},
                  {label: 'Описание', key: 'testEvent.test.description'},
                  {label: 'Дата', key: 'testEvent.date'},
                  {label: 'Сдано/ Не сдано', key: 'passed'},
                ]}
                data={studentTestsStat}
              />
            </div>
            <div className="horizontal-container">
            <div className="filter-container">
              <p className="heading-text-2">Пропущенные лекции</p>
              {studentLectures.length > 0 ?
                <InformationTable 
                  columns={[
                    {label: 'Дата', key: 'lecture.date'},
                    {label: 'Время', key: 'lecture.time'},
                    {label: 'Время', key: 'lecture.time'},
                  ]}
                  data={studentLectures}
                />
                :
                <p className="normal-text">{role === 'student' ? 'Вы не пропускали лекции' : 'Курсант не пропускал лекции'}</p>
              }
            </div>
            <div className="filter-container">
              <p className="heading-text-2">Пропущенные зачёты</p>
              {studentTests.length > 0 ?
                <InformationTable 
                  columns={[
                    {label: 'Дата', key: 'test.date'},
                    {label: 'Время', key: 'test.time'},
                  ]}
                  data={studentTests}
                />
                :
                <p className="normal-text">{role === 'student' ? 'Вы не пропускали зачёты' : 'Курсант не пропускал зачёты'}</p>
              }
            </div>
          </div>
        </>
        }
      </div>
    </>
  )
})

export default StudentPage;
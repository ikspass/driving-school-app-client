import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Context } from '..';
import Button from '../components/UI/Button/Button';
import InformationTable from '../components/InformationTable';
import DescriptionTable from '../components/DescriptionTable';
import PinList from '../components/UI/PinList/PinList';
import { deleteTeacher, deleteUser, fetchTeacherById, fetchUserById } from '../http/adminAPI';
import { ADMIN_ROUTE, ERROR_PAGE, GROUP_ROUTE } from '../utils/consts';
import WarningModal from '../components/WarningModal';
import ButtonBack from '../components/UI/ButtonBack/ButtonBack';
import UpdateUser from '../components/admin/UpdateUser';
import Modal from '../components/Modal';

const TeacherPage = observer(() => {

  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({})
  const [teacherData, setTeacherData] = useState([])
  const [groups, setGroups] = useState([])

  const {userStore} = useContext(Context)
  const role = userStore.user.role;

  const {id} = useParams();
  const [loading, setLoading] = useState(true);

  const [warningModal, setWarningModal] = useState(false)
  const [updateUserModal, setUpdateUserModal ] = useState(false)

  const updateTeacher = async () => {
    const teacher = await fetchTeacherById(id);
    setTeacher(teacher);
    setGroups(teacher.groups)
    const dataForAdmin = [
      { key: 'ФИО', value: teacher.user.fullName },
      { key: 'Номер телефона', value: teacher.user.phoneNumber },
      { key: 'Дата рождения', value: teacher.user.dateOfBirth },
      { key: 'Идентификационный номер', value: teacher.user.idNumber },
      { key: 'Номер паспорта', value: teacher.user.passportNumber },
    ]
  
    const dataForStudent = [
      { key: 'ФИО', value: teacher.user.fullName },
      { key: 'Номер телефона', value: teacher.user.phoneNumber },
      { key: 'Дата рождения', value: teacher.user.dateOfBirth },
    ]
    if(role === 'admin') setTeacherData(dataForAdmin);
    if(role === 'instructor' || role === 'teacher' || role === 'student') setTeacherData(dataForStudent);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserById(userStore.user.id);
        await updateTeacher();
        
      } catch (error) {
        console.error(error);
        navigate(ERROR_PAGE)
      } finally {
        setLoading(false);
        
      }
    };
    fetchData();
  }, []);

  const handleDeleteTeacher = async () => {
    await deleteTeacher(id);
    await deleteUser(teacher.userId)
  }
  
  if (loading) {
    return <div className="small-text">Загрузка...</div>;
  }
    
  return (
    <>
    <Modal 
      children={<UpdateUser user={teacher.user} onClose={() => {
        setUpdateUserModal(false);
        updateTeacher();
      }}/>}
      isOpen={updateUserModal}
      onClose={() => setUpdateUserModal(false)}
    />
      <div className="content-container">
        {role === 'admin' && 
        <NavLink to={ADMIN_ROUTE}>
          <ButtonBack />
        </NavLink>
        }
        <p className="heading-text-2">Персональные данные преподавателя</p>
        <div className="content-container">
          <div className="horizontal-container">
            <div className="image-container">
              <img src={`${process.env.REACT_APP_API_URL}/${teacher.user.img}`} alt={teacher.user.fullName} />
            </div>
            <DescriptionTable
              value={teacherData}
            />
            <div className="filter-container">
              <PinList
                value={[teacher.status]}
              />
            </div>
            {role === 'admin' &&
              <div style={{ display: 'flex', flex: 1, justifyContent: 'end' }}>
                <div className="button-container">
                  <Button className='outline' style={{ width: '100%' }} onClick={() => setUpdateUserModal(true)}>Редактировать данные</Button>
                  <Button className='danger' style={{ width: '100%' }} onClick={() => setWarningModal(true)}>Удалить</Button>
                  <WarningModal 
                    style={{top: '-46px'}}
                    text='Вы уверены что хотите удалить преподавателя?'
                    isOpen={warningModal}
                    onConfirm={() => {
                      setWarningModal(false)
                      handleDeleteTeacher()
                      navigate(ADMIN_ROUTE)
                    }}
                    onCancel={() => setWarningModal(false)}
                  />
                </div>
              </div>
            }
          </div>       
        </div>
        {role != 'student' &&
          <>
            <p className="heading-text-2">Группы</p>
            <InformationTable
              columns={[
                { key: "name", label: "Номер", isLink: true , navigateTo: (row) => `${GROUP_ROUTE}/${row.id}`},
                { key: "category.value", label: "Категория", isLink: false },
                { key: "scheduleGroup.name", label: "Hасписание", isLink: false },
                { key: "dateOfStart", label: "Дата начала обучения", isLink: false},
                { key: "status", label: "Статус", isLink: false },
              ]}
              data={groups}
            />
          </>
        }
      </div>
    </>
  );
});

export default TeacherPage;
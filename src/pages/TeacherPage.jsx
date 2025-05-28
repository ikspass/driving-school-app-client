import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '..';
import Button from '../components/UI/Button/Button';
import InformationTable from '../components/InformationTable';
import DescriptionTable from '../components/DescriptionTable';
import PinList from '../components/UI/PinList/PinList';
import { fetchTeacherById, fetchUserById } from '../http/adminAPI';
import { GROUP_ROUTE } from '../utils/consts';

const TeacherPage = observer(() => {
  const [teacher, setTeacher] = useState({})
  const [groups, setGroups] = useState([])

  const {id} = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacher = await fetchTeacherById(id);
        setTeacher(teacher);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
    
  return (
    <div className="content-container">
      <p className="heading-text-2">Персональные данные преподавателя</p>
      <div className="content-container">
        <div className="horizontal-container">
          <div className="image-container">
            <img src={`${process.env.REACT_APP_API_URL}/${teacher.user.img}`} alt={teacher.user.fullName} />
          </div>
          <DescriptionTable
            value={[
              { key: 'Идентификационный номер', value: teacher.user.idNumber },
              { key: 'Номер паспорта', value: teacher.user.passportNumber },
              { key: 'ФИО', value: teacher.user.fullName },
              { key: 'Адрес', value: teacher.user.adress },
              { key: 'Дата рождения', value: teacher.user.dateOfBirth },
              { key: 'Номер телефона', value: teacher.user.phoneNumber },
            ]}
          />
          <div className="filter-container">
            <PinList
              value={[teacher.status, teacher.quals.map(qual => qual.description), ]}
            />
          </div>
          <div style={{ display: 'flex', flex: 1, justifyContent: 'end' }}>
            <div className="button-container">
              <Button className='outline' style={{ width: '100%' }}>Редактировать данные</Button>
              <Button className='outline' style={{ width: '100%' }}>Добавить группу</Button>
              <Button className='outline' style={{ width: '100%' }}>Отправить в отпуск</Button>
              <Button className='outline' style={{ width: '100%' }}>Уволить</Button>
            </div>
          </div>
        </div>
        <p className="heading-text-2">Информация</p>
        <div style={{ width: '50vw' }}>
          <DescriptionTable
            value={[
              {
                key: 'Статус',
                // value: user.teacher ? user.teacher.quals.map(qual => qual.description) : [],
                value: teacher.status,
              },
              {
                key: 'Квалификация',
                // value: user.teacher ? user.teacher.quals.map(qual => qual.description) : [],
                value: teacher.quals.map(qual => qual.description),
              },
            ]}
          />
        </div>
      </div>
      <p className="heading-text-2">Группы</p>
      <InformationTable
        columns={[
          { key: "name", label: "Номер", isLink: true , navigateTo: (row) => `${GROUP_ROUTE}/${row.id}`},
          { key: "category.value", label: "Категория", isLink: false },
          { key: "scheduleGroup.name", label: "Время", isLink: false },
          { key: "dateOfStart", label: "Дата начала обучения", isLink: false},
          { key: "status", label: "Статус", isLink: false },
        ]}
        data={groups}
      />
    </div>
  );
});

export default TeacherPage;
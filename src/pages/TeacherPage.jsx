import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '..';
import Button from '../components/UI/Button/Button';
import InformationTable from '../components/InformationTable';
import DescriptionTable from '../components/DescriptionTable';
import PinList from '../components/UI/PinList/PinList';
import { fetchOneUser } from '../http/adminAPI';

const TeacherPage = observer(() => {
  const { userStore } = useContext(Context);

  const {id} = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOneUser(id)
      .then(data => {
        userStore.setTeacher(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [id, userStore]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  const user = userStore.teacher || {};

  // if (!user || Object.keys(user).length === 0) {
  //   return (
  //     <div className="content-container">
  //       <p className="heading-text-2">Пользователь не найден</p>
  //     </div>
  //   );
  // }

  return (
    <div className="content-container">
      <p className="heading-text-2">Персональные данные преподавателя</p>
      <div className="content-container">
        <div className="horizontal-container">
          <div className="image-container">
            <img src={`${process.env.REACT_APP_API_URL}/${user.img}`} alt={user.fullName} />
          </div>
          <DescriptionTable
            value={[
              { key: 'Идентификационный номер', value: user.idNumber },
              { key: 'Номер паспорта', value: user.passportNumber },
              { key: 'ФИО', value: user.fullName },
              { key: 'Адрес', value: user.adress },
              { key: 'Дата рождения', value: user.dateOfBirth },
              { key: 'Номер телефона', value: user.phoneNumber },
            ]}
          />
          <div className="filter-container">
            <PinList
              value={[user.teacher.status, user.teacher.quals.map(qual => qual.description), ]}
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
                value: user.teacher.status,
              },
              {
                key: 'Квалификация',
                // value: user.teacher ? user.teacher.quals.map(qual => qual.description) : [],
                value: user.teacher.quals.map(qual => qual.description),
              },
            ]}
          />
        </div>
      </div>
      <p className="heading-text-2">Группы</p>
      <InformationTable
        columns={[
          { label: 'Номер', key: 'name' },
          { label: 'Тема', key: 'theme', isLink: true },
          { label: 'Статус', key: 'status' },
        ]}
        data={user.teacher ? user.teacher.groups : []}
      />
      <p className="heading-text-2">Посещаемость</p>
      <InformationTable
        columns={[
          { label: 'Дата', key: 'date' },
          { label: 'Время', key: 'time' },
          { label: 'Материалы', key: 'materials', isLink: true },
          { label: 'Посещаемость', key: 'attendance' },
        ]}
        data={[
          { date: '2025-05-06', time: '16:00', materials: ['Глава 1', 'Глава 2', 'Глава 3'], attendance: 'Присутствовал' }
        ]}
      />
    </div>
  );
});

export default TeacherPage;
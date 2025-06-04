import React, {useContext, useState, useEffect} from 'react'
import { ReactComponent as MainIcon } from '../styles/svg/main.svg';
import { ReactComponent as StatisticsIcon } from '../styles/svg/statistics.svg';
import { ReactComponent as ScheduleIcon } from '../styles/svg/schedule.svg';
import { ReactComponent as MaterialsIcon } from '../styles/svg/materials.svg';
import { ReactComponent as DataIcon } from '../styles/svg/data.svg';
import { Link } from 'react-router-dom';
import { CONTACTS_ROUTE, MATERIALS_ROUTE, SCHEDULE_ROUTE, STATISTIC_ROUTE, STUDENT_ROUTE } from '../utils/consts';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { fetchUserById } from '../http/adminAPI';

const StudentNavigation = observer(() => {
  const { userStore } = useContext(Context);
  const [user, setUser] = useState({})
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserById(userStore.user.id);
        setUser(userData);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [])

  return (
    <>
      <Link to={SCHEDULE_ROUTE} className="navigation-item">
        <ScheduleIcon/>
        <p className="normal-text">Расписание</p>
      </Link>
      <Link to={STATISTIC_ROUTE} className="navigation-item">
        <StatisticsIcon/>
        <p className="normal-text">Статистика</p>
      </Link>
      <Link to={MATERIALS_ROUTE} className="navigation-item">
        <MaterialsIcon/>
        <p className="normal-text">Материалы</p>
      </Link>  
      <Link to={`${STUDENT_ROUTE}/${user.student?.id}`} className="navigation-item">
        <DataIcon/>
        <p className="normal-text">Мои данные</p>
      </Link>  
    </>
  )
})

export default StudentNavigation;
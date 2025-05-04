import React from 'react'
import { ReactComponent as MainIcon } from '../styles/svg/main.svg';
import { ReactComponent as StatisticsIcon } from '../styles/svg/statistics.svg';
import { ReactComponent as ScheduleIcon } from '../styles/svg/schedule.svg';
import { ReactComponent as MaterialsIcon } from '../styles/svg/materials.svg';
import { Link } from 'react-router-dom';

export default function UserNavigation() {
  return (
    <>
      <Link to='/' className="navigation-item">
        <MainIcon/>
        <p className="normal-text">Главная</p>
      </Link>
      <Link to='/statistic' className="navigation-item">
        <StatisticsIcon/>
        <p className="normal-text">Статистика</p>
      </Link>
      <Link to='/schedule' className="navigation-item">
        <ScheduleIcon/>
        <p className="normal-text">Расписание</p>
      </Link>
      <Link to='/material' className="navigation-item">
        <MaterialsIcon/>
        <p className="normal-text">Материалы</p>
      </Link>  
    </>
  )
}

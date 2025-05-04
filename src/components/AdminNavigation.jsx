import React from 'react'
import { ReactComponent as MainIcon } from '../styles/svg/main.svg';
import { ReactComponent as GroupsIcon } from '../styles/svg/groups.svg';
import { ReactComponent as ScheduleIcon } from '../styles/svg/schedule.svg';
import { ReactComponent as StudentsIcon } from '../styles/svg/students.svg';
import { ReactComponent as StaffIcon } from '../styles/svg/staff.svg';
import { Link } from 'react-router-dom';

export default function AdminNavigation() {
  return (
    <>
      <Link to='/' className="navigation-item">
        <MainIcon/>
        <p className="normal-text">Главная</p>
      </Link>
      <Link to='/schedule' className="navigation-item">
        <ScheduleIcon/>
        <p className="normal-text">Расписание</p>
      </Link>
      <Link to='/groups' className="navigation-item">
        <GroupsIcon/>
        <p className="normal-text">Группы</p>
      </Link>
      <Link to='/students' className="navigation-item">
        <StudentsIcon/>
        <p className="normal-text">Курсанты</p>
      </Link>  
      <Link to='/staff' className="navigation-item">
        <StaffIcon/>
        <p className="normal-text">Преподаватели</p>
      </Link>  
    </>
  )
}

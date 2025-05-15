import React from 'react'
import { ReactComponent as MainIcon } from '../styles/svg/main.svg';
import { ReactComponent as GroupsIcon } from '../styles/svg/groups.svg';
import { ReactComponent as ScheduleIcon } from '../styles/svg/schedule.svg';
import { ReactComponent as StudentsIcon } from '../styles/svg/students.svg';
import { ReactComponent as StaffIcon } from '../styles/svg/staff.svg';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTE, CONTACTS_ROUTE, GROUPS_ROUTE, LOGIN_ROUTE, SCHEDULE_ROUTE, STAFF_ROUTE, STUDENTS_ROUTE } from '../utils/consts';

export default function AdminNavigation() {
  return (
    <>
      <Link to={CONTACTS_ROUTE} className="navigation-item">
        <MainIcon/>
        <p className="normal-text">Контакты</p>
      </Link>
      <Link to={SCHEDULE_ROUTE} className="navigation-item">
        <ScheduleIcon/>
        <p className="normal-text">Расписание</p>
      </Link>
      <Link to={GROUPS_ROUTE} className="navigation-item">
        <GroupsIcon/>
        <p className="normal-text">Группы</p>
      </Link>
      <Link to={STUDENTS_ROUTE} className="navigation-item">
        <StudentsIcon/>
        <p className="normal-text">Курсанты</p>
      </Link>  
      <Link to={STAFF_ROUTE} className="navigation-item">
        <StaffIcon/>
        <p className="normal-text">Преподаватели</p>
      </Link>  
      <Link to={LOGIN_ROUTE} className="navigation-item">
        <StaffIcon/>
        <p className="normal-text">Авторизация</p>
      </Link>  
      <Link to={ADMIN_ROUTE} className="navigation-item">
        <StaffIcon/>
        <p className="normal-text">Админ</p>
      </Link>  
    </>
  )
}

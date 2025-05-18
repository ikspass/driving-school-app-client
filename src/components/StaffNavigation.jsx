import React from 'react'
import { ReactComponent as MainIcon } from '../styles/svg/main.svg';
import { ReactComponent as StaffIcon } from '../styles/svg/staff.svg';
import { ReactComponent as StudentIcon } from '../styles/svg/students.svg';
import { ReactComponent as GroupIcon } from '../styles/svg/groups.svg';
import { ReactComponent as ScheduleIcon } from '../styles/svg/schedule.svg';
import { ReactComponent as MaterialsIcon } from '../styles/svg/materials.svg';
import { Link } from 'react-router-dom';
import { CONTACTS_ROUTE, GROUP_ROUTE, GROUPS_ROUTE, MATERIALS_ROUTE, SCHEDULE_ROUTE, STAFF_ROUTE, STUDENTS_ROUTE } from '../utils/consts';

export default function StaffNavigation() {
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
        <GroupIcon/>
        <p className="normal-text">Группы</p>
      </Link>
      <Link to={STUDENTS_ROUTE} className="navigation-item">
        <StudentIcon/>
        <p className="normal-text">Курсанты</p>
      </Link>
      <Link to={STAFF_ROUTE} className="navigation-item">
        <StaffIcon/>
        <p className="normal-text">Персонал</p>
      </Link>
      <Link to={MATERIALS_ROUTE} className="navigation-item">
        <MaterialsIcon/>
        <p className="normal-text">Материалы</p>
      </Link>  
    </>
  )
}

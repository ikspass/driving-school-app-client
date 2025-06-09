import React, { useState, useContext } from 'react'
import ListGroup from '../components/UI/ListGroup/ListGroup'
import Dashboard from '../components/Dashboard'
import AdminStudentsPage from './admin/AdminStudentsPage'
import AdminTeachersPage from './admin/AdminTeachersPage'
import AdminInstructorsPage from './admin/AdminInstructorsPage'
import AdminSchoolDataPage from './admin/AdminSchoolDataPage'
import AdminGroupsPage from './admin/AdminGroupsPage'
import Button from '../components/UI/Button/Button'
import { Context } from '..'
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from '../utils/consts'
import AdminSchedulePage from './admin/AdminSchedulePage'

export default function AdminPage() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const items=[
    {value: 'Курсанты', component: AdminStudentsPage},
    {value: 'Группы', component: AdminGroupsPage},
    {value: 'Преподаватели', component: AdminTeachersPage},
    {value: 'Инструкторы', component: AdminInstructorsPage},
    {value: 'Данные', component: AdminSchoolDataPage},
    {value: 'Расписание', component: AdminSchedulePage}
  ]

  const {userStore} = useContext(Context)
  const navigate = useNavigate()
  
  const logOut = async () => {
    userStore.setUser({});
    userStore.setIsAuth(false);
    localStorage.clear('token');
    await navigate(LOGIN_ROUTE);
  }

  return (
    <div className='horizontal-container' style={{marginTop: '20px'}}>
      <div className='admin-nav'>
        <ListGroup 
          title='Навигация'
          items={items}
          onSelect={(component) => setSelectedComponent(component)}
        />
        <Button className="outline" style={{marginTop: '20px',width: '150px'}} onClick={logOut}>Выйти</Button>
      </div>
      <Dashboard ChildComponent={selectedComponent}/>
    </div>
  )
}

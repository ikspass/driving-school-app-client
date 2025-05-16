import React, { useState } from 'react'
import ListGroup from '../components/UI/ListGroup/ListGroup'
import Dashboard from '../components/Dashboard'
import AdminStudentsPage from './admin/AdminStudentsPage'
import AdminTeachersPage from './admin/AdminTeachersPage'
import AdminInstructorsPage from './admin/AdminInstructorsPage'
import AdminSchoolDataPage from './admin/AdminSchoolDataPage'
import AdminGroupsPage from './admin/AdminGroupsPage'
import Button from '../components/UI/Button/Button'

export default function AdminPage() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const items=[
    {value: 'Курсанты', component: AdminStudentsPage},
    {value: 'Группы', component: AdminGroupsPage},
    {value: 'Преподаватели', component: AdminTeachersPage},
    {value: 'Инструкторы', component: AdminInstructorsPage},
    {value: 'Данные', component: AdminSchoolDataPage},
  ]
  return (
    <div className='horizontal-container'>
      <ListGroup 
        className='admin-nav'
        title='Навигация'
        items={items}
        onSelect={(component) => setSelectedComponent(component)}
      />
      <Dashboard ChildComponent={selectedComponent}/>
    </div>
  )
}

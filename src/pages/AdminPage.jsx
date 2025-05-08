import React, { useState } from 'react'
import ListGroup from '../components/UI/ListGroup/ListGroup'
import CreateStudent from '../components/admin/CreateStudent'
import CreateGroup from '../components/admin/CreateGroup'
import CreateTeacher from '../components/admin/CreateTeacher'
import CreateInstructor from '../components/admin/CreateInstructor'
import CreateTest from '../components/admin/CreateTest'
import Dashboard from '../components/Dashboard'
import { GROUPS_ROUTE, INSTRUCTORS_ROUTE, SCHEDULE_ROUTE, STUDENTS_ROUTE, TEACHERS_ROUTE } from '../utils/consts'
import CreateCar from '../components/admin/CreateCar'

export default function AdminPage() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const items=[
    {value: 'Расписание', component: CreateTest},
    {value: 'Курсанты', component: CreateStudent},
    {value: 'Группы', component: CreateGroup},
    {value: 'Преподаватели', component: CreateTeacher},
    {value: 'Инструкторы', component: CreateInstructor},
  ]
  return (
    <div className='horizontal-container'>
      <ListGroup 
        title='Навигация'
        items={items}
        onSelect={(component) => setSelectedComponent(component)} // Передаем функцию
      />
      <Dashboard ChildComponent={selectedComponent}/>
      {/* <div className="content-container">
        <div className="horizontal-container">
          <CreateStudent />
          <CreateGroup />
        </div>
        <div className="horizontal-container">
          <CreateTeacher />
          <CreateInstructor />
        </div>
        <div className="horizontal-container">
          <CreateCar />
          <CreateCategory />
        </div>
        <div className="horizontal-container">
          <CreateDrivingPlace />
          <CreateTest />
        </div>
      </div> */}
    </div>
  )
}

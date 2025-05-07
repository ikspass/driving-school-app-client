import React, { useState } from 'react'
import ListGroup from '../components/UI/ListGroup/ListGroup'
import CreateStudent from '../components/CreateStudent'
import CreateGroup from '../components/CreateGroup'
import { INSTRUCTORS_ROUTE, SCHEDULE_ROUTE, STUDENTS_ROUTE, TEACHERS_ROUTE } from '../utils/consts'

export default function AdminPage() {

  const [createStudentVisible, setCreateStudentVisible] = useState(false)
  const [createGroupVisible, setCreateGroupVisible] = useState(false)
  const [createTeacherVisible, setCreateTeacherVisible] = useState(false)
  const [createInstructorVisible, setCreateInstructorVisible] = useState(false)

  return (
    <div className='horizontal-container'>
      <ListGroup 
        title='Навигация'
        items={[
          {value: 'Расписание', url: SCHEDULE_ROUTE},
          {value: 'Курсанты', url: STUDENTS_ROUTE},
          {value: 'Преподаватели', url: TEACHERS_ROUTE},
          {value: 'Инструкторы', url: INSTRUCTORS_ROUTE},
        ]}
      />
      <CreateStudent show={createStudentVisible} onHide={() => setCreateStudentVisible(false)}/>
      <CreateGroup show={createGroupVisible} onHide={() => setCreateGroupVisible(false)}/>
    </div>
  )
}

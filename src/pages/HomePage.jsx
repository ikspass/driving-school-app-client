import React from 'react'
import Button from '../components/UI/Button/Button'
import { Link } from 'react-router-dom'
import EventItem from '../components/EventItem'

export default function HomePage() {
  return (
    <div>
      <div className="button-container">
        <Link style={{color: 'white'}} to='/createStudent'><Button>Создать учётную запись</Button></Link>
        <Link style={{color: 'white'}} to='/createGroup'><Button>Создать учебную группу</Button></Link>
        <Link style={{color: 'white'}} to=''><Button>Оставить сообщение</Button></Link>
      </div>
      {/* <p className="heading-text-2">События на сегодня</p>
      <div className="horizontal-container">
        <EventItem event={['Лекция', '17B', '18:00', '23.04.2025']}/>
        <EventItem event={['Лекция', '17B', '18:00', '23.04.2025']}/>
        <EventItem event={['Лекция', '17B', '18:00', '23.04.2025']}/>
        <EventItem event={['Лекция', '17B', '18:00', '23.04.2025']}/>
      </div> */}
    </div>
  )
}
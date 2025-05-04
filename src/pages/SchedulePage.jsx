import React, {useState} from 'react'
import Calendar from '../components/Calendar'
import Header from '../components/Header'
import EventsList from '../components/EventsList'
import Button from '../components/UI/Button/Button'
import FilterButtons from '../components/UI/FilterButtons/FilterButtons'
import Input from '../components/UI/Input/Input'


export default function SchedulePage() {
    
  const arr = [
    {   
      date: '17.04.2025',
      events: [
        [
          {
            key: 'Событие',
            value: 'Лекция'
          },
          {
            key: 'Дата',
            value: '17.04.2025'
          },
          {
            key: 'Время',
            value: '18:30'
          },
          {
            key: 'Группа',
            value: '17B',
            link: ''
          },
          {
            key: 'Преподаватель',
            value: 'Иванов И. И.',
            link: ''
          },
          {
            key: 'Тема',
            value: 'Тема 1',
            link: ''
          },
          {
            key: 'Материалы',
            value: 'material1',
            link: ''
          },
        ]
      ]
    }
  ];

  const findEvents = (date) => {
      const result = arr.find(event => event.date === date);
      return result ? result.events : [];
  }
  const [events, setEvents] = useState(findEvents('22.04.2025'));
  const showEvents = (date) => {
      setEvents(findEvents(date));
  }
  
  return (
    <>
      <div className="horizontal-container">
        <Calendar show={showEvents} />
        <div className="content-container">
          {
            events.length !== 0 
            ?
            <EventsList value={events}/>
            :
            <p style={{textAlign: 'center'}}>В этот день не запланированы события</p>
          }
          <Button>Добавить событие</Button>
          {/* <FilterButtons filters={['Лекция', 'Зачёт', 'Экзамен']} selected={0}/>
          <Input
            value={'18:30'}
            title={"Время"} 
          />
          <Input
            value={'Иванов Иван Иванович'}
            title={"Преподаватель"} 
          />
          <Input
            value={'17B'}
            title={"Группа"} 
          />
          <Input
            value={'Тема 1'}
            title={"Тема"} 
          />
          <Button>Сохранить</Button> */}
        </div>
      </div>
    </>
  )
}

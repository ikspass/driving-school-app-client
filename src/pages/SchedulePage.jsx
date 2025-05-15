import React, {useState, useContext} from 'react'
import Calendar from '../components/Calendar'
import Button from '../components/UI/Button/Button'
import EventTable from '../components/EventTable'
import { Context } from '..'
import { observer } from 'mobx-react-lite'


const SchedulePage = observer(() => {

  const {eventStore} = useContext(Context)

  console.log(eventStore.eventsByDate)

  eventStore.eventsByDate.map(event =>{
    console.log(event)
  })

  return (
    <>
      <div className="horizontal-container">
        <Calendar />
        <div className="content-container">
          {
            eventStore.eventsByDate.length !== 0 
            ?
            (
            eventStore.eventsByDate.map( event => (
              <EventTable event={event}/>
            ))
          ):(
            <p style={{textAlign: 'center'}}>В этот день не запланированы события</p>
          )
          }
          <Button>Добавить событие</Button>
        </div>
      </div>
    </>
  )
})

export default SchedulePage;

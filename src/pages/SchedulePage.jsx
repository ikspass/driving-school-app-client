import React, {useState, useContext} from 'react'
import Calendar from '../components/Calendar'
import Button from '../components/UI/Button/Button'
import EventTable from '../components/EventTable'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import SingleFilterButtons from '../components/UI/SingleFilterButtons/SingleFilterButtons'


const SchedulePage = observer(() => {

  const {eventStore, userStore} = useContext(Context)
  const user = userStore.user;
  const typeFilters = [
    {id: 1, value: 'Мои'},
    {id: 2, value: 'Все'},
  ]
  const eventFilters = [
    {id: 1, value: 'Все'},
    {id: 2, value: 'Лекция'},
    {id: 3, value: 'Вождение'},
    {id: 4, value: 'Зачёты'},
  ]

  const [selectedType, setSelectedType] = useState(typeFilters[0])
  const [selectedEvent, setSelectedEvent] = useState(eventFilters[0])

  const filteredEvents = eventStore.eventsByDate.filter(event => {
    if(selectedEvent.value === 'Все') return eventStore.eventsByDate;
    else{
      const matchesEvent = selectedEvent ? event.type === selectedEvent.value : true;
      return matchesEvent;
    }
  })

  return (
    <>
      <div className="horizontal-container">
        <div className="filter-container">
          {user.role.value != 'student' && 
            <SingleFilterButtons
              filters={typeFilters}
              selected={selectedType}
              setSelected={setSelectedType}
            />
          }
          <Calendar 
            events={eventStore.events}
          />
        </div>
        <div className="filter-container">
          <SingleFilterButtons
            filters={eventFilters}
            selected={selectedEvent}
            setSelected={setSelectedEvent}
          />
          <div className="content-container">
            {
              filteredEvents.length !== 0 
              ?
              (
              filteredEvents.map( event => (
                <EventTable event={event}/>
              ))
            ):(
              <p style={{textAlign: 'center'}}>В этот день не запланированы события</p>
            )
            }
            <Button>Добавить событие</Button>
          </div>
        </div>
      </div>
    </>
  )
})

export default SchedulePage;

import React, {useState, useContext, useEffect} from 'react'
import Calendar from '../components/Calendar'
import Button from '../components/UI/Button/Button'
import EventTable from '../components/EventTable'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import SingleFilterButtons from '../components/UI/SingleFilterButtons/SingleFilterButtons'
import { fetchDrivingEventsByStudent, fetchLectureEventsByGroup } from '../http/adminAPI'
import MultipleFilterButtons from '../components/UI/MultipleFilterButtons/MultipleFilterButtons'


const SchedulePage = observer(() => {

  const {eventStore, userStore} = useContext(Context)
  const user = userStore.user;
  const role = userStore.user.role.value;

  console.log(user)

  const [loading, setLoading] = useState(true);
  
  if(role === 'student'){
    const student = user.student;

    useEffect(() => {
      const fetchData = async () => {
        try {
          const lectureEvents = await fetchLectureEventsByGroup(student.groupId);
          console.log(lectureEvents)
          eventStore.setLectureEvents(lectureEvents);
  
          const drivingEvents = await fetchDrivingEventsByStudent(student.id);
          eventStore.setDrivingEvents(drivingEvents);
          console.log(drivingEvents)

          
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  }


  const typeFilters = [
    {id: 1, value: 'Мои'},
    {id: 2, value: 'Все'},
  ]
  const eventFilters = [
    {id: 1, value: 'Лекция'},
    {id: 2, value: 'Вождение'},
    {id: 3, value: 'Зачёты'},
  ]

  const [selectedType, setSelectedType] = useState(typeFilters[0])
  const [selectedEvent, setSelectedEvent] = useState([])

  const filteredEvents = eventStore.eventsByDate.filter(event => {
    const matchesEvent = selectedEvent.length > 0 ? selectedEvent.some(selectedEvent => selectedEvent.value === event.type) : true;
    return matchesEvent;
  })

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="horizontal-container">
        <div className="filter-container">
          {role != 'student' && 
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
          <MultipleFilterButtons
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

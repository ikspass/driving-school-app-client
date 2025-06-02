import React, {useState, useContext, useEffect} from 'react'
import Calendar from '../components/Calendar'
import Button from '../components/UI/Button/Button'
import EventTable from '../components/EventTable'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import SingleFilterButtons from '../components/UI/SingleFilterButtons/SingleFilterButtons'
import MultipleFilterButtons from '../components/UI/MultipleFilterButtons/MultipleFilterButtons'
import { fetchDrivingEventsByInstructor, fetchDrivingEventsByStudent, fetchLectureEventsByGroup, fetchLectureEventsByTeacher, fetchTestEventsByStudent, fetchTestEventsByTeacher } from '../http/eventAPI'
import { fetchUserById } from '../http/adminAPI'


const SchedulePage = observer(() => {

  const {eventStore, userStore} = useContext(Context)

  const role = userStore.user.role;

  const [loading, setLoading] = useState(true);
  
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const user = await fetchUserById(userStore.user.id);

          if(role === 'student'){
            const student = user.student;

            const lectureEvents = await fetchLectureEventsByGroup(student.groupId);
            eventStore.setLectureEvents(lectureEvents);
    
            const drivingEvents = await fetchDrivingEventsByStudent(student.id);
            eventStore.setDrivingEvents(drivingEvents);
    
            const testEvents = await fetchTestEventsByStudent(student.id);
            eventStore.setTestEvents(testEvents);
          }

          if(role === 'teacher'){
            const teacher = user.teacher;

            const lectureEvents = await fetchLectureEventsByTeacher(teacher.id);
            eventStore.setLectureEvents(lectureEvents);
    
            const testEvents = await fetchTestEventsByTeacher(teacher.id);
            eventStore.setTestEvents(testEvents);
          }

          if(role === 'instructor'){
            const instructor = user.instructor;

            const drivingEvents = await fetchDrivingEventsByInstructor(instructor.id);
            eventStore.setDrivingEvents(drivingEvents);
          }

        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);

  const eventFilters = [
    {id: 1, value: 'Лекция'},
    {id: 2, value: 'Вождение'},
    {id: 3, value: 'Зачёты'},
  ]

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

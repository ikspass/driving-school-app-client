import React, {useState, useContext, useEffect} from 'react'
import Calendar from '../components/Calendar'
import Button from '../components/UI/Button/Button'
import EventTable from '../components/EventTable'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import MultipleFilterButtons from '../components/UI/MultipleFilterButtons/MultipleFilterButtons'
import { fetchDrivingEventsByInstructor, fetchDrivingEventsByStudent, fetchLectureEventsByGroup, fetchLectureEventsByTeacher, fetchTestEventsByStudent, fetchTestEventsByTeacher } from '../http/eventAPI'
import { fetchUserById } from '../http/adminAPI'
import Modal from '../components/Modal'
import CreateLectureEvent from '../components/CreateLectureEvent'
import CreateTestEvent from '../components/CreateTestEvent'
import CreateDrivingEvent from '../components/CreateDrivingEvent'


const SchedulePage = observer(() => {

  const {eventStore, userStore} = useContext(Context)

  const role = userStore.user.role;

  const [loading, setLoading] = useState(true);

  const [isLater, setIsLater] = useState(false);

  const [user, setUser] = useState(null)

  const [createLectureModal, setCreateLectureModal] = useState(false)
  const [createTestModal, setCreateTestModal] = useState(false)
  const [createDrivingModal, setCreateDrivingModal] = useState(false)
    
    useEffect(() => {
      const fetchData = async () => {
        try {

          eventStore.setLectureEvents([]);
          eventStore.setTestEvents([]);
          eventStore.setDrivingEvents([]);

          const userData = await fetchUserById(userStore.user.id);
          setUser(userData);

          if(role === 'student'){
            const student = userData.student;

            const lectureEvents = await fetchLectureEventsByGroup(student.groupId);
            eventStore.setLectureEvents(lectureEvents);
    
            const drivingEvents = await fetchDrivingEventsByStudent(student.id);
            eventStore.setDrivingEvents(drivingEvents);
    
            const testEvents = await fetchTestEventsByStudent(student.id);
            eventStore.setTestEvents(testEvents);
          }

          if(role === 'teacher'){
            const teacher = userData.teacher;

            const lectureEvents = await fetchLectureEventsByTeacher(teacher.id);
            eventStore.setLectureEvents(lectureEvents);
            
            const testEvents = await fetchTestEventsByTeacher(teacher.id);
            eventStore.setTestEvents(testEvents);
          }

          if(role === 'instructor'){
            const instructor = userData.instructor;

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
    }, [userStore.id]);

  useEffect(() => {
    const currentDate = new Date();
    const selectedDate = new Date(eventStore.selectedDate);
    if(selectedDate > currentDate) setIsLater(true)
    else setIsLater(false)
  }, [eventStore.selectedDate])

  const updateLectures = async () => {
    const lectureEvents = await fetchLectureEventsByTeacher(user.teacher.id);
    eventStore.setLectureEvents(lectureEvents);
  }
  
  const updateTests = async () => {
    const testEvents = await fetchTestEventsByTeacher(user.teacher.id);
    eventStore.setTestEvents(testEvents);
  }
  
  const updateDrivings = async () => {
    const drivingEvents = await fetchDrivingEventsByInstructor(user.instructor.id);
    eventStore.setDrivingEvents(drivingEvents);
  }

  let eventFilters;

  if(role === 'teacher'){
    eventFilters = [
      {id: 1, value: 'Лекция'},
      {id: 2, value: 'Зачёт'},
    ]
  }
  if(role === 'instructor'){
    eventFilters = [
    ]
  }
  if(role === 'student'){
    eventFilters = [
      {id: 1, value: 'Лекция'},
      {id: 2, value: 'Вождение'},
      {id: 3, value: 'Зачёт'},
    ]
  }
 
  const [selectedEvent, setSelectedEvent] = useState(eventFilters.map(filter => filter))

  const filteredEvents = eventStore.events.filter(event => {
    const matchesEvent = selectedEvent.length > 0 ? selectedEvent.some(selectedEvent => selectedEvent.value === event.type) : false;
    return matchesEvent;
  })

  if (loading) {
    return <div className="small-text">Загрузка...</div>;
  }

  return (
    <>
      <Modal
        children={<CreateLectureEvent onClose={() => {
          setCreateLectureModal(false);
          updateLectures()
        }}/>}
        isOpen={createLectureModal}
        onClose={() => setCreateLectureModal(false)}
      />
      <Modal
        children={<CreateTestEvent onClose={() => {
          setCreateTestModal(false);
          updateTests()
        }}/>}
        isOpen={createTestModal}
        onClose={() => setCreateTestModal(false)}
      />
      <Modal
        children={<CreateDrivingEvent onClose={() => {
          setCreateDrivingModal(false);
          updateDrivings()
        }}/>}
        isOpen={createDrivingModal}
        onClose={() => setCreateDrivingModal(false)}
      />
      <div className="filter-container">
        {role !== 'instructor' && 
          <MultipleFilterButtons
            filters={eventFilters}
            selected={selectedEvent}
            setSelected={setSelectedEvent}
          />
        }
        <div className="horizontal-container">
          <Calendar events={role !== 'instructor' ? filteredEvents : eventStore.events} />
          <div className="content-container">
            {eventStore.eventsByDate.length !== 0 ? (
              eventStore.eventsByDate.map((event) => (
                <EventTable event={event} />
              ))
            ) : (
              <p className='normal-text' style={{ textAlign: "center" }}>
                В этот день не запланированы события
              </p>
            )}
          </div>
          {role === 'teacher' &&
            <div className="button-container" style={{minWidth: '180px'}}>
              <Button disabled={!isLater} className="outline" style={{width: "100%"}} onClick={() => {setCreateLectureModal(true)}}>Добавить лекцию</Button>
              <Button disabled={!isLater} className="outline" style={{width: "100%"}} onClick={() => {setCreateTestModal(true)}}>Добавить зачёт</Button>
            </div>
          }
          {role === 'instructor' &&
            <div className="button-container" style={{minWidth: '180px'}}>
              <Button disabled={!isLater} className="outline" style={{width: "100%"}} onClick={() => {setCreateDrivingModal(true)}}>Добавить занятие</Button>
            </div>
          }
        </div>
      </div>
    </>
  );
})

export default SchedulePage;

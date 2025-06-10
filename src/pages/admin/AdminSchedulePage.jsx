import React, {useState, useContext, useEffect} from 'react'
import Calendar from '../../components/Calendar'
import EventTable from '../../components/EventTable'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import MultipleFilterButtons from '../../components/UI/MultipleFilterButtons/MultipleFilterButtons'
import Modal from '../../components/Modal'
import CreateLectureEvent from '../../components/CreateLectureEvent'
import CreateTestEvent from '../../components/CreateTestEvent'
import CreateDrivingEvent from '../../components/CreateDrivingEvent';
import { fetchDrivingEvents, fetchLectureEvents, fetchTestEvents } from '../../http/eventAPI'


const AdminSchedulePage = observer(() => {

  
  const {eventStore, userStore} = useContext(Context)

  const role = userStore.user.role;

  const [loading, setLoading] = useState(true);

  const [createLectureModal, setCreateLectureModal] = useState(false)
  const [createTestModal, setCreateTestModal] = useState(false)
  const [createDrivingModal, setCreateDrivingModal] = useState(false)
    
  const updateLectures = async () => {
    const lectureEvents = await fetchLectureEvents();
    eventStore.setLectureEvents(lectureEvents);
  }
  
  const updateTests = async () => {
    const testEvents = await fetchTestEvents();
    eventStore.setTestEvents(testEvents);
  }
  
  const updateDrivings = async () => {
    const drivingEvents = await fetchDrivingEvents();
    eventStore.setDrivingEvents(drivingEvents);
  }

    useEffect(() => {
      const fetchData = async () => {
        try {
          updateLectures();
          updateDrivings();
          updateTests()
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [userStore.id]);

  const eventFilters = [
      {id: 1, value: 'Лекция'},
      {id: 2, value: 'Вождение'},
      {id: 3, value: 'Зачёт'},
    ]
 
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
        <div className="horizontal-container" >
          <Calendar events={filteredEvents} />
          <div className="content-container" style={{width: '350px'}}>
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
        </div>
      </div>
    </>
  )
})

export default AdminSchedulePage
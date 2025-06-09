import { observer } from 'mobx-react-lite';
import React, {useState, useEffect, useContext} from 'react'
import { fetchDrivingPlaces, fetchUserById } from '../http/adminAPI';
import { createDrivingEvent, createLectureEvent } from '../http/eventAPI';
import { Context } from '..';
import SingleFilterButtons from './UI/SingleFilterButtons/SingleFilterButtons';
import Separator from './UI/Separator/Separator';
import Button from './UI/Button/Button';
import Input from './UI/Input/Input';
import InformationTable from './InformationTable';
import ExceptionModal from './ExceptionModal';

const CreateDrivingEvent = observer(({onClose}) => {
  const {userStore, eventStore} = useContext(Context)

  const [time, setTime] = useState('');
  const [student, setStudent] = useState(null);
  const [transport, setTransport] = useState(null);
  const [drivingPlace, setDrivingPlace] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [instructorTransports, setInstructorTransports] = useState([])

  const [loading, setLoading] = useState(true)

  const [exceptionModal, setExceptionModal] = useState(false)

  const [studentFilters, setStudentFilters] = useState([])
  const [placeFilters, setPlaceFilters] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserById(userStore.user.id);
        console.log(userData)
        setInstructor(userData.instructor)

        setInstructorTransports(userData.instructor.transports.map(transport => ({id: transport.id, value: `${transport.name} (${transport.category.value})`})))
        
        const drivingPlacesData = await fetchDrivingPlaces();
        setPlaceFilters(drivingPlacesData.map(place => ({id: place.id, value: place.value})))
                
        const studentsData = userData.instructor.students.map(student => ({id: student.id, value: student.user.fullName, category: student.category.value}));
        setStudentFilters(studentsData) 
               
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const confirm = async (e) => {
    e.preventDefault();
    if (!time || !student || !transport || !drivingPlace) {
      setExceptionModal(true)
      return;
    }
    try {
      const data = await createDrivingEvent({date: eventStore.selectedDate, time: time, instructorId: instructor.id, studentId: student.id, transportId: transport.id, placeId: drivingPlace.id});
      console.log(data);
      onClose();
    } catch (error) {
      console.error("Ошибка при создании события:", error);
    }
  }

  if (loading) {
    return <div className="small-text">Загрузка...</div>;
  }

  return (
    <div className="content-container">
      <p className="heading-text-2">Добавить занятие</p>
      <div className="horizontal-container" style={{gap: '80px'}}>
        <div className="content-container" style={{width: '400px', flexShrink: 0}}>
          <p className="normal-text">Дата: {eventStore.selectedDate}</p>
          <Separator />
          <div className="filter-container">
            <p className="normal-text">{student ? `Категория выбранного курсанта: ${student.category}` : 'Выберите курсанта'}</p>
            <SingleFilterButtons 
              title='Курсанты'
              filters={studentFilters}
              selected={student}
              setSelected={setStudent}
            />
            <SingleFilterButtons 
              title='Транспорт'
              filters={instructorTransports}
              selected={transport}
              setSelected={setTransport}
            />
            <SingleFilterButtons 
              title='Локация'
              filters={placeFilters}
              selected={drivingPlace}
              setSelected={setDrivingPlace}
            />
          </div>
          <Input 
            title='Время'
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </div>
        <div className="content-container" style={{width: '200px', flexShrink: 0}}>
          <p className="normal-text">Ваши занятия в этот день:</p>
          <div className="filter-container">
            {eventStore.eventsByDate.length > 0 ? 
              <InformationTable
                columns={[
                  { key: "group.name", label: "Группа", isLink: false },
                  { key: "time", label: "Время", isLink: false },
                ]}
                data={eventStore.eventsByDate}
                numbered={true}
              />
              :
              <p className="normal-text" style={{color: 'var(--dark-gray)'}}>У вас нет событий в этот день</p>
            }
          </div>
        </div>
      </div>
      <Button onClick={confirm}>Сохранить</Button>
      <ExceptionModal
        style={{top: '-60px'}}
        text='Не все поля заполнены'
        isOpen={exceptionModal}
        onConfirm={() => setExceptionModal(false)}
      />
    </div>
  )
})

export default CreateDrivingEvent;
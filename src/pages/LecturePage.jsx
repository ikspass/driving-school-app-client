import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Context } from '..';
import { fetchLectureEventById } from '../http/eventAPI';
import Button from '../components/UI/Button/Button';
import InformationTable from '../components/InformationTable';
import { STUDENT_ROUTE } from '../utils/consts';

const LecturePage = () => {

  const {id} = useParams();
  const [loading, setLoading] = useState(true);

  const [event, setEvent] = useState({})

  const attendanceColumns = [
    { key: "fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "phoneNumber", label: "Номер телефона", isLink: false },
    { key: "phoneNumber", label: "Присутствие", isLink: false },
  ]

  const studentsColumns = [
    { key: "fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "phoneNumber", label: "Номер телефона", isLink: false },
  ]

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const eventData = await fetchLectureEventById(id)
        setEvent(eventData)
        console.log(eventData)
        console.log(event)
        if(eventData.status === 'В будущем'){

        }

      } catch(e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();      
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-container">
      <div className="heading-text-2 frame" style={{display: 'flex', justifyContent: 'space-between'}}>
        <p>Лекция</p>
        <p>{event.group.name}</p>
        <p>{event.time}</p>
        <p>{event.date}</p>
      </div>
      {event.status === 'В будущем' &&
        <Button>Начать событие</Button>
      }

      {event.status === 'Идёт' &&
        <>
          <InformationTable
            columns={studentsColumns}
            numbered={true}
            data={[]}
          />
          <Button>Завершить занятие</Button>
        </>
      }
      
      {event.status === 'Проведено' &&
        <div className="content-container">
          <p className="heading-text-2">Курсанты</p>
          <InformationTable
            columns={attendanceColumns}
            numbered={true}
            data={[]}
          />
        </div>
      }
    </div>
  )
}

export default LecturePage;
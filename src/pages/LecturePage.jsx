import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Context } from '..';
import { fetchLectureEventById } from '../http/eventAPI';
import EventTable from '../components/EventTable';
import Button from '../components/UI/Button/Button';
import InformationTable from '../components/InformationTable';
import { STUDENT_ROUTE } from '../utils/consts';
import SelectableInformationTable from '../components/SelectableInformationTable';

const LecturePage = () => {

  const {eventStore} = useContext(Context)

  const {id} = useParams();
  const [loading, setLoading] = useState(true);

  const [event, setEvent] = useState({})
  event.type = 'Лекция';

  const attendanceColumns = [
    { key: "fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "phoneNumber", label: "Номер телефона", isLink: false },
    { key: "phoneNumber", label: "Присутствие", isLink: false },
  ]

  const chaptersColumns = [
    { key: "topic", label: "Тема", isLink: false },
    { key: "chapter", label: "Глава", isLink: false },
  ]

  const [absentStudents, setAbsentStudents] = useState(localStorage.getItem('absentStudents' || []));

  useEffect(() => {
    fetchLectureEventById(id)
      .then(data => {
        setEvent(data)
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  const saveAbsentStudents = () => {
    localStorage.setItem('absentStudents', absentStudents);
  }
  console.log(event)

  return (
    <div className="content-container">
      <div className="heading-text-2 frame" style={{display: 'flex', justifyContent: 'space-between'}}>
        <p>Лекция</p>
        <p>2A</p>
        <p>{event.time}</p>
        <p>{event.date}</p>
      </div>
      {/* <div style={{display: 'flex', justifyContent: 'end'}}>
        <Button>Начать событие</Button>
      </div> */}
      {/* <EventTable 
        event={event}
      /> */}

        <div className="horizontal-container">
          <SelectableInformationTable
            columns={attendanceColumns}
            setSelectedRow={setAbsentStudents}
            data={[]}
          />
          <duv className="button-container">
            <Button className="outline" onClick={saveAbsentStudents}>Сохранить</Button>
          </duv>
        </div>
        <InformationTable 
          columns={chaptersColumns}
        />
        <Button>Завершить занятие</Button>
    </div>
  )
}

export default LecturePage;
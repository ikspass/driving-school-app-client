import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react'
import { fetchStudentsWithoutGroup, fetchTeachers, setStudentGroup, updateGroupTeacher } from '../../http/adminAPI';
import InformationTable from '../InformationTable';
import { GROUP_ROUTE, INSTRUCTOR_ROUTE, STUDENT_ROUTE } from '../../utils/consts';
import SelectableInformationTable from '../SelectableInformationTable';
import Button from '../UI/Button/Button';
import SingleFilterButtons from '../UI/SingleFilterButtons/SingleFilterButtons';
import Separator from '../UI/Separator/Separator';
import WarningModal from '../WarningModal';
import ExceptionModal from '../ExceptionModal';

const GroupChangeTeacher = observer(({onClose, group}) => {

  const [teachers, setTeachers] = useState([])

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const [loading, setLoading] = useState(true);

  const [warningModal, setWarningModal] = useState(false)
  const [exceptionModal, setExceptionModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachers = await fetchTeachers();
        setTeachers(teachers);
      } catch (e) {
        console.error(e);
      } finally{
        setLoading(false)
      }
    }
    fetchData();
  }, [])

  const confirm = () => {
    try {
      updateGroupTeacher(group.id, selectedTeacher.id);
    } catch (error) {
      console.error(error)
    }
    onClose();
  }

  const filteredTeachers = teachers.filter(teacher => (
    teacher.id !== group.teacherId
  ))

  const handleConfirmClick = async () => {
    if(selectedTeacher !== null){
      setWarningModal(true);
    }
    else{
      setExceptionModal(true)
    }
  }

  if (loading) {
    return <div className="small-text">Загрузка...</div>;
  }

  return (
    <>
      <div className='content-container'>
        <p className="heading-text-2">Изменить преподавателя группы {group.name}</p>
        <p className="normal-text">Текущий преподаватель: {group.teacher.user.fullName}</p>  
        <Separator />    
        <div className="filter-container">
          <p className="normal-text">Выберите нового преподавателя</p>      
          <SingleFilterButtons
            filters={filteredTeachers.map(elem => ({id: elem.id, value: elem.user.fullName}))}
            selected={selectedTeacher}
            setSelected={setSelectedTeacher}
          />
        </div>
        <Button onClick={() => handleConfirmClick()}>Сохранить</Button>
      </div>
      <WarningModal 
        text='Вы уверены что хотите изменить преподавателя группы?'
        isOpen={warningModal}
        onConfirm={() => {
          confirm()
          setWarningModal(false)
        }}
        onCancel={() => setWarningModal(false)}
      />
      <ExceptionModal
        text='Новый преподаватель не выбран'
        isOpen={exceptionModal}
        onConfirm={() => setExceptionModal(false)}
      />
    </>
  )
})

export default GroupChangeTeacher;
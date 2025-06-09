import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, useContext } from 'react'
import InformationTable from '../InformationTable';
import { fetchInstructors, updateStudentInstructor } from '../../http/adminAPI';
import SelectableInformationTable from '../SelectableInformationTable';
import SingleFilterButtons from '../UI/SingleFilterButtons/SingleFilterButtons';
import Button from '../UI/Button/Button';
import { Context } from '../..';
import ExceptionModal from '../ExceptionModal';
import Separator from '../UI/Separator/Separator';

const AssignInstructor = observer(({onClose, setSuccessModal, successText, student}) => {

  const [instructors, setInstructors] = useState([])

  const [loading, setLoading] = useState(true);

  const [exceptionModal, setExceptionModal] = useState(false)

  const [selectedInstructor, setSelectedInstructor] = useState(null)

  const studentInstructor = student.instructorId !== null ? true : false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructors = await fetchInstructors();
        setInstructors(instructors);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const confirm = async () => {
    try {
      await updateStudentInstructor(student.id, selectedInstructor.id);
      onClose();
    } catch (error) {
      console.error(error);
      setExceptionModal(true);
    }
  };

  const handleConfirmClick = async () => {
    if(selectedInstructor !== null){
      confirm();
    }
    else{
      setExceptionModal(true)
    }
  }

  if (loading) {
    return <div className="small-text">Загрузка...</div>;
  }

  console.log(student)
  const filteredInstructors = studentInstructor ? instructors.filter(instructor => (instructor.id !== student.instructorId)) : instructors

  return (
    <>
      <div className="content-container">
        <p className="heading-text-2">{studentInstructor ? 'Изменить' : 'Назначить'} инструктора</p>
        {studentInstructor && (
            <div className="content-container">
              <p className="normal-text">Текущий инструктор: {student.instructor.user.fullName}</p>
              <Separator />
            </div>
          )
        }
        {selectedInstructor ?
        <p className="normal-text">Количество курсантов у выбранного инструктора: {selectedInstructor.studentsCount}</p>
        :
        <p className="normal-text">Выберите {studentInstructor && 'нового'} инструктора</p>
        }
        <SingleFilterButtons 
          filters={filteredInstructors.map(instructor => ({id: instructor.id, value: instructor.user.fullName, studentsCount: instructor.students.length}))}
          selected={selectedInstructor}
          setSelected={setSelectedInstructor}
        />
        <Button onClick={() => handleConfirmClick()}>Сохранить</Button>
      </div>
      <ExceptionModal 
        text='Инструктор не выбран'
        isOpen={exceptionModal}
        onConfirm={() => setExceptionModal(false)}
      />
    </>
  )
})

export default AssignInstructor;

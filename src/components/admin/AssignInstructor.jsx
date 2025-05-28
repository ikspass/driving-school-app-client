import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, useContext } from 'react'
import InformationTable from '../InformationTable';
import { fetchInstructors, updateStudentInstructor } from '../../http/adminAPI';
import SelectableInformationTable from '../SelectableInformationTable';
import SingleFilterButtons from '../UI/SingleFilterButtons/SingleFilterButtons';
import Button from '../UI/Button/Button';
import { Context } from '../..';

const AssignInstructor = observer(({onClose}) => {

  const [instructors, setInstructors] = useState([])

  const {userStore} = useContext(Context)

  useEffect(() => {
    fetchInstructors().then(data => setInstructors(data));
  }, [])
  
  const columns = [
    { key: 'user.fullName', label: 'Инструктор' },
    { key: 'students.length', label: 'Кол-во курсантов'}
  ]

  const [selectedInstructor, setSelectedInstructor] = useState(null)

  console.log(selectedInstructor)

  console.log(instructors)

  const confirm = () => {
    if(selectedInstructor !== null){
      const student = updateStudentInstructor(userStore.student.id, selectedInstructor.id)
      onClose();
    }
    else {
      alert('Инструктор не выбран')
    }
  }

  return (
    <div className="content-container">
      <p className="heading-text-2">Назначить инструктора</p>
      {selectedInstructor ?
      <p className="normal-text">Количество курсантов у выбранного инструктора: {selectedInstructor.studentsCount}</p>
      :
      <p className="normal-text">Выберите инструктора</p>
      }
      <SingleFilterButtons 
        filters={instructors.map(instructor => ({id: instructor.id, value: instructor.user.fullName, studentsCount: instructor.students.length}))}
        selected={selectedInstructor}
        setSelected={setSelectedInstructor}
      />
      <Button onClick={confirm}>Сохранить</Button>
    </div>
  )
})

export default AssignInstructor;

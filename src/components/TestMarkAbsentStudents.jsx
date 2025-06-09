import React, { useState } from 'react'
import { observer } from 'mobx-react-lite';
import Button from '../components/UI/Button/Button';
import SelectableInformationTable from './SelectableInformationTable';
import { createStudentTest } from '../http/eventAPI';

const TestMarkAbsentStudents = observer(({onClose,  testEvent, students}) => {

  const [selectedStudents, setSelectedStudents] = useState([]);

  const confirm = async (e) => {
    e.preventDefault();

    const updatedStudents = students.map(student => ({
      studentId: student.id,
      testId: testEvent.id,
      attended: selectedStudents.includes(student.id) ? false : true,
    }));

    try {
      await Promise.all(updatedStudents.map(async (student) => {
        await createStudentTest(student);
      }));
      onClose();
    } catch (e) {
      console.error(e);
    }
  }

  const columns = [
    { key: "user.fullName", label: "ФИО", isLink: false },
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
  ]

  return (
    <>
      <div className='content-container'>
        <p className="heading-text-2">Отметить отсутствующих</p>
        <SelectableInformationTable
          columns={columns}
          data={students}
          setSelectedRow={setSelectedStudents}
        />
        <Button onClick={confirm}>Сохранить</Button>
      </div>
    </>
  )
})

export default TestMarkAbsentStudents;
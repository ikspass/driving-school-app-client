import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react'
import { fetchStudentsWithoutGroup, setStudentGroup } from '../../http/adminAPI';
import InformationTable from '../InformationTable';
import { GROUP_ROUTE, INSTRUCTOR_ROUTE, STUDENT_ROUTE } from '../../utils/consts';
import SelectableInformationTable from '../SelectableInformationTable';
import Button from '../UI/Button/Button';

const GroupAssignStudents = observer(({onClose, group}) => {

  const [students, setStudents] = useState([])

  const [loading, setLoading] = useState(true);

  const [selectedStudents, setSelectedStudents] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await fetchStudentsWithoutGroup();
        setStudents(students);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const confirm = async () => {
    try{
      await Promise.all(selectedStudents.map(async (id) => {
        await setStudentGroup(id, group.id)
      }))
      onClose();
    }
    catch(e){
      console.error(e)
    }
  }

  const columns = [
    { key: "user.fullName", label: "ФИО", isLink: true , navigateTo: (row) => `${STUDENT_ROUTE}/${row.id}`},
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
  ]

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='content-container'>
      <p className="heading-text-2">Добавить курсантов</p>
      <p className="normal-text"></p>
      <SelectableInformationTable
        columns={columns}
        data={students}
        setSelectedRow={setSelectedStudents}
      />
      <div className="filter-container">
        <p className="heading-text-2">Количество выбранных курсантов: {selectedStudents.length}</p>
        <p className="heading-text-2">Количество курсантов в группе: {group.students.length}</p>
      </div>
      <Button onClick={confirm}>Сохранить</Button>
    </div>
  )
})

export default GroupAssignStudents;
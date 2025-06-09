import { observer } from 'mobx-react-lite';
import React, {useState, useEffect} from 'react'
import Button from '../UI/Button/Button';
import { fetchStudents, updateStudentInstructor } from '../../http/adminAPI';
import SelectableInformationTable from '../SelectableInformationTable';


const AssignStudent = observer(({onClose, instructor}) => {
  const [students, setStudents] = useState([])

  const [loading, setLoading] = useState(true);

  const [selectedStudents, setSelectedStudents] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await fetchStudents();
        const categories = instructor.categories.map(category => category.value);
        console.log(instructor)
        setStudents(students.filter(student => student.instructorId === null && categories.some(category => category === student.category.value)));
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
        await updateStudentInstructor(id, instructor.id)
      }))
      onClose();
    }
    catch(e){
      console.error(e)
    }
  }

  const columns = [
    { key: "user.fullName", label: "ФИО", isLink: false },
    { key: "user.phoneNumber", label: "Номер телефона", isLink: false },
    { key: "category.value", label: "Категория", isLink: false },
  ]

  if (loading) {
    return <div className="small-text">Загрузка...</div>;
  }
  return (
    <div className='content-container'>
      <p className="heading-text-2">Добавить курсантов</p>
      <p className="normal-text">Выберите курсантов из списка</p>
      <SelectableInformationTable
        columns={columns}
        data={students}
        setSelectedRow={setSelectedStudents}
      />
      <div className="filter-container">
        <p className="normal-text">Количество выбранных курсантов: {selectedStudents.length}</p>
      </div>
      <Button onClick={confirm}>Сохранить</Button>
    </div>
  )
})

export default AssignStudent;
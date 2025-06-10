import React, {useState, useEffect, useContext} from 'react'
import InformationTable from '../components/InformationTable';
import { fetchStudentById, fetchUserById } from '../http/adminAPI';
import { Context } from '..';
import { ERROR_PAGE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';

export default function StatisticPage() {

  const [loading, setLoading] = useState(true);
  const {userStore} = useContext(Context);
  const [studentLectures, setStudentLectures] = useState({})
  const [studentTests, setStudentTests] = useState({})
  const [studentTestsStat, setStudentTestsStat] = useState({})
  const [student, setStudent] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserById(userStore.user.id);


        const studentData = await fetchStudentById(userData.student.id);
        setStudent(studentData);

        await setStudentLectures(studentData.studentLectures.filter(lecture => lecture.attended === false))
        await setStudentTests(studentData.studentTests.filter(test => test.attended === false))
        await setStudentTestsStat(studentData.studentTests)
        
      } catch (error) {
        console.error(error);
        navigate(ERROR_PAGE)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="small-text">Загрузка...</div>;
  }
  
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
      <div className="filter-container">
              <p className="heading-text-2">Зачёты</p>
              <InformationTable 
                columns={[
                  {label: 'Зачёт', key: 'testEvent.test.name'},
                  {label: 'Описание', key: 'testEvent.test.description'},
                  {label: 'Дата', key: 'testEvent.date'},
                  {label: 'Сдано/ Не сдано', key: 'passed'},
                ]}
                data={studentTestsStat}
              />
            </div>
            <div className="horizontal-container">
            <div className="filter-container">
              <p className="heading-text-2">Пропущенные лекции</p>
              {studentLectures.length > 0 ?
                <InformationTable 
                  columns={[
                    {label: 'Дата', key: 'lecture.date'},
                    {label: 'Время', key: 'lecture.time'},
                    {label: 'Время', key: 'lecture.time'},
                  ]}
                  data={studentLectures}
                />
                :
                <p className="normal-text">Вы не пропускали лекции</p>
              }
            </div>
            <div className="filter-container">
              <p className="heading-text-2">Пропущенные зачёты</p>
              {studentTests.length > 0 ?
                <InformationTable 
                  columns={[
                    {label: 'Дата', key: 'test.date'},
                    {label: 'Время', key: 'test.time'},
                  ]}
                  data={studentTests}
                />
                :
                <p className="normal-text">Вы не пропускали зачёты</p>
              }
            </div>
          </div>
    </div>
  )
}

import { observer } from 'mobx-react-lite';
import React, {useState, useEffect, useContext} from 'react'
import { fetchUserById } from '../http/adminAPI';
import { createLectureEvent, createTestEvent } from '../http/eventAPI';
import { Context } from '..';
import SingleFilterButtons from './UI/SingleFilterButtons/SingleFilterButtons';
import Separator from './UI/Separator/Separator';
import Button from './UI/Button/Button';
import Input from './UI/Input/Input';
import InformationTable from './InformationTable';
import ExceptionModal from './ExceptionModal';

const CreateTestEvent = observer(({onClose}) => {
  const {userStore, eventStore} = useContext(Context)

  const [time, setTime] = useState('');
  const [group, setGroup] = useState(null);
  const [teacher, setTeacher] = useState(null);

  const [loading, setLoading] = useState(true)

  const [exceptionModal, setExceptionModal] = useState(false)

  const [groupFilters, setGroupFilters] = useState([])
  const [groupEvents, setGroupEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserById(userStore.user.id);

        setTeacher(userData.teacher)
              
        const groupsData = userData.teacher.groups.map(group => ({id: group.id, value: group.name, schedule: group.scheduleGroup.name}));
        setGroupFilters(groupsData)                
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if(group){
      const selectedGroup = teacher.groups.find(teacherGroup => teacherGroup.id === group.id);
      const groupLectures = selectedGroup.lectureEvents.filter(event => event.date === eventStore.selectedDate)
      const groupTests = selectedGroup.testEvents.filter(event => event.date === eventStore.selectedDate)

      const events = [
        ...groupLectures.map(lecture => ({ type: 'Лекция', groupName: selectedGroup.name, ...lecture })),
        ...groupTests.map(test => ({ type: 'Зачёт/экзамен', groupName: selectedGroup.name, ...test }))
      ];

      setGroupEvents(events)

      console.log(groupEvents)
    }
  }, [group]);

  

  const confirm = async (e) => {
    e.preventDefault();
    if (!time || !group) {
      setExceptionModal(true)
      return;
    }
    try {
      const data = await createTestEvent({date: eventStore.selectedDate, time: time, groupId: group.id});
      console.log(data);
      onClose();
    } catch (error) {
      console.error("Ошибка при создании события:", error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-container">
      <p className="heading-text-2">Добавить зачёт</p>
      <div className="horizontal-container" style={{gap: '80px'}}>
        <div className="content-container" style={{width: '400px', flexShrink: 0}}>
          <p className="normal-text">Дата: {eventStore.selectedDate}</p>
          <Separator />
          <div className="filter-container">
            <p className="normal-text">{group ? `Расписание выбранной группы: ${group.schedule}` : 'Выберите группу'}</p>
            <SingleFilterButtons 
              title='Группа'
              filters={groupFilters}
              selected={group}
              setSelected={setGroup}
            />
          </div>
          <Input 
            title='Время'
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </div>
        <div className="content-container" style={{width: '200px', flexShrink: 0}}>
          <p className="normal-text">События группы в этот день:</p>
          <div className="filter-container">
            {groupEvents.length > 0 ? 
              <InformationTable
                columns={[
                  { key: "type", label: "Событие", isLink: false },
                  { key: "groupName", label: "Группа", isLink: false },
                  { key: "time", label: "Время", isLink: false },
                ]}
                data={groupEvents}
                numbered={true}
              />
              :
              <p className="normal-text" style={{color: 'var(--dark-gray)'}}>У выбранной группы нет событий в этот день</p>
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

export default CreateTestEvent;
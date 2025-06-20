import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react'
import { fetchGroups, setStudentGroup } from '../../http/adminAPI';
import Button from '../UI/Button/Button';
import Separator from '../UI/Separator/Separator';
import SingleFilterButtons from '../UI/SingleFilterButtons/SingleFilterButtons';
import WarningModal from '../WarningModal';
import ExceptionModal from '../ExceptionModal';

const StudentChangeGroup = observer(({onClose, student}) => {

  const [groups, setGroups] = useState([])

  const [selectedGroup, setSelectedGroup] = useState(null)

  const [loading, setLoading] = useState(true);

  const [warningModal, setWarningModal] = useState(false)
  const [exceptionModal, setExceptionModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groups = await fetchGroups();
        setGroups(groups);
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
      setStudentGroup(student.id, selectedGroup.id)
      onClose()
    }
    catch(e){
      console.error(e)
    }
  }

  const handleConfirmClick = async () => {
    if(selectedGroup !== null){
      setWarningModal(true);
    }
    else{
      setExceptionModal(true)
    }
  }

  const filteredGroups = groups.filter(group => (
    group.id !== student.groupId
  ))

  if (loading) {
    return <div className="small-text">Загрузка...</div>;
  }

  return (
    <>
      <div className='content-container'>
        <p className="heading-text-2">Изменить группу курсанта</p>
        <p className="normal-text">Текущая группа: {student.group? student.group.name : '-'}</p>
        <Separator />
        <div className="filter-container">
          <p className="normal-text">Выберите новую группу</p> 
          {groups.length > 1 ?
            <SingleFilterButtons
              filters={filteredGroups.map(elem => ({id: elem.id, value: elem.name}))}
              selected={selectedGroup}
              setSelected={setSelectedGroup}
            />
            :
            <p className='normal-text'>Нет других групп</p>
          }     
        </div>
        <Button onClick={() => handleConfirmClick()}>Сохранить</Button>
      </div>
      <WarningModal 
        text='Вы уверены что хотите изменить группу курсанта?'
        isOpen={warningModal}
        onConfirm={() => {
          setWarningModal(false)
          confirm()
        }}
        onCancel={() => setWarningModal(false)}
      />
      <ExceptionModal
        text='Новая группа не выбрана'
        isOpen={exceptionModal}
        onConfirm={() => setExceptionModal(false)}
      />
    </>
  )
})

export default StudentChangeGroup;
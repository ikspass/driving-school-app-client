import React, {useState} from 'react'
import Button from '../UI/Button/Button'
import { updateDrivingEventStatus, updateLectureEventStatus, updateTestEventStatus } from '../../http/eventAPI'
import SingleFilterButtons from '../UI/SingleFilterButtons/SingleFilterButtons'

const AdminChangeStatus = ({eventId, eventType, onClose}) => {
  const [selectedStatus, setSelectedStatus] = useState(null)

  const confirm = async() => {
    if(eventType === 'lecture'){
      await updateLectureEventStatus(eventId, selectedStatus.value)
    }
    if(eventType === 'driving'){
      await updateDrivingEventStatus(eventId, selectedStatus.value)
    }
    if(eventType === 'test'){
      await updateTestEventStatus(eventId, selectedStatus.value)
    }
    onClose();
  }

  return (
    <div className='content-container'>
      <p className="heading-text-2">Изменить статус события</p>
      <SingleFilterButtons 
        title='Статус'
        filters={[
          {id: 1, value: 'В будущем'},
          {id: 2, value: 'Идёт'},
          {id: 3, value: 'Проведено'}
        ]}
        selected={selectedStatus}
        setSelected={setSelectedStatus}
      />
      <Button onClick={confirm}>Сохранить</Button>
    </div>
  )
}

export default AdminChangeStatus
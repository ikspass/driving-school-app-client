import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { createMessage } from '../../http/adminAPI';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { getDateInfo } from '../../utils/calendar';

const SendMessage = observer(({onClose, group}) => {

  const [text, setText] = useState('')

  const confirm = async () => {
    try{
      const date = new Date;
      const dateInfo = getDateInfo(date);

      createMessage({date: dateInfo.fullDate, time: dateInfo.time, text: text, groupId: group.id})

      onClose();
    }
    catch(e){
      console.error(e)
    }
  }

  return (
    <div className='content-container'>
      <p className="heading-text-2">Оставить сообщение для группы {group.name}</p>
      <p className="normal-text"></p>
      <Input
        title='Текст сообщения'
        value={text}
        onChange={e => setText(e.target.value)}
      />
      
      <Button onClick={confirm}>Отправить</Button>
    </div>
  )
})

export default SendMessage;
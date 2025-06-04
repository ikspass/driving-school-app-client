import React, { useState } from 'react'
import { createTest } from '../../http/adminAPI';
import { observer } from 'mobx-react-lite';
import SingleFilterButtons from '../UI/SingleFilterButtons/SingleFilterButtons'
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import ExceptionModal from '../ExceptionModal';

const CreateTest = observer(({onClose}) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [exceptionModal, setExceptionModal] = useState(false)

  const confirm = async (e) => {
    e.preventDefault();

    if (!name || !desc) {
      setExceptionModal(true)

    }
    else{
      try {
        const data = await createTest({name: name, description: desc});
        console.log(data);
        onClose();
      } catch (error) {
        console.error("Ошибка при создании зачёта/экзамена:", error);
      }

    }
  }

  return (
    <>
      <div className='content-container'>
        <p className="heading-text-2">Добавить зачёт/экзамен</p>
        <form>
          <div className="input-container">
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              title={"Название"}  
            /> 
            <Input
              value={desc}
              onChange={e => setDesc(e.target.value)}
              title={"Описание"}  
            />
          </div>
          <Button onClick={confirm}>Сохранить</Button>
          <ExceptionModal
            style={{top: '-60px'}}
            text='Заполните все поля'
            isOpen={exceptionModal}
            onConfirm={() => setExceptionModal(false)}
          />
        </form>
      </div>
    </>
  )
})

export default CreateTest;
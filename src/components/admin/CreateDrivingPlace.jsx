import React, { useState } from 'react'
import { createCar, createCategory, createDrivingPlace } from '../../http/adminAPI';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import ExceptionModal from '../ExceptionModal';

const CreateCategory = observer(({onClose}) => {
  const [value, setValue] = useState('');
  const [desc, setDesc] = useState('');
  const [exceptionModal, setExceptionModal] = useState(false)

  const confirm = async (e) => {
    e.preventDefault();

    if (!value || !desc) {
      setExceptionModal(true)
    }
    else{
      try {
        const data = await createDrivingPlace({value: value, description: desc});
        console.log(data);
        onClose();
      } catch (error) {
          console.error("Ошибка при создании категории:", error);
      }
    }

}

  return (
    <>
      <div className='content-container'>
            <p className="heading-text-2">Добавить автомобиль</p>
            <form>
                 <div className="input-container">
                    <Input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        title={"Название"}  
                        isValid={true}
                    /> 
                    <Input
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        title={"Описание"} 
                        isValid={true} 
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

export default CreateCategory;
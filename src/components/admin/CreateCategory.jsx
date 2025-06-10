import React, { useState, useContext } from 'react'
import { createCategory } from '../../http/adminAPI';
import Input from '../UI/Input/Input';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import { Context } from '../..';
import ExceptionModal from '../ExceptionModal';

const CreateCategory = observer(({onClose}) => {
  const [value, setValue] = useState('');
  const [desc, setDesc] = useState('');
  const [exceptionModal, setExceptionModal] = useState(false)


  const {modalStore} = useContext(Context)

  const confirm = async (e) => {
    e.preventDefault();

    if (!value || !desc) {
      setExceptionModal(true)

    }
    else{
      try {
        const data = await createCategory({value: value, description: desc});
        onClose();
        modalStore.setIsOpen(true)
      } catch (error) {
        console.error("Ошибка при создании категории:", error);
      }
    }

}

  return (
    <>
      <div className='content-container'>
            <p className="heading-text-2">Добавить категорию</p>
            <form>
                 <div className="input-container">
                    <Input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        title={"Название категории"}  
                    /> 
                    <Input
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        title={"Описание категории"}  
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
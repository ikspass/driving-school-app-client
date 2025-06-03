import React, { useState, useContext } from 'react'
import { createCategory } from '../../http/adminAPI';
import Input from '../UI/Input/Input';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import { Context } from '../..';

const CreateCategory = observer(({onClose}) => {
  const [value, setValue] = useState('');
  const [desc, setDesc] = useState('');

  const {modalStore} = useContext(Context)

  const confirm = async (e) => {
    e.preventDefault();

    if (!value || !desc) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    try {
      const data = await createCategory({value: value, description: desc});
      console.log(data);
      onClose();
      modalStore.setIsOpen(true)
    } catch (error) {
      console.error("Ошибка при создании категории:", error);
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
            </form>
        </div>
    </>
  )
})

export default CreateCategory;
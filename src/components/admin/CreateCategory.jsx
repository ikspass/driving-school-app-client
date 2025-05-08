import React, { useState } from 'react'
import { createCategory } from '../../http/adminAPI';
import Input from '../UI/Input/Input';

const CreateCategory = observer(() => {
  const [value, setValue] = useState('');
  const [desc, setDesc] = useState('');

  const confirm = async (e) => {
    e.preventDefault();

    if (!value || !desc) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    try {
      const data = await createCategory({value: value, description: desc});
      console.log(data);
    } catch (error) {
        console.error("Ошибка при создании категории:", error);
    }
}

  return (
    <>
      <div className='content-container'>
            <p className="heading-text-2">Создать автомобиль</p>
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
import React, { useState, useContext, useEffect } from 'react'
import { createTest, fetchCategories } from '../../http/adminAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import SingleFilterButtons from '../UI/SingleFilterButtons/SingleFilterButtons'
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const CreateTest = observer(() => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');

  const {schoolStore} = useContext(Context);

  useEffect(() => {
    fetchCategories().then(data => schoolStore.setCategories(data))
  }, [])

  const confirm = async (e) => {
    e.preventDefault();

    if (!name || !desc || !category) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    try {
      const data = await createTest({name: name, description: desc, categoryValue: category});
      console.log(data);
    } catch (error) {
        console.error("Ошибка при создании категории:", error);
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
            <SingleFilterButtons 
              title='Категория'
              filters={schoolStore.categories.map(elem => ({id: elem.id, value: elem.value}))}
              selected={category}
              setSelected={setCategory}
            />
          </div>
          <Button onClick={confirm}>Сохранить</Button>
        </form>
      </div>
    </>
  )
})

export default CreateTest;
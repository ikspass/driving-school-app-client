import React, { useState, useContext, useEffect } from 'react'
import { createTransport, fetchCategories } from '../../http/adminAPI';
import { observer } from 'mobx-react-lite';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import SingleFilterButtons from '../UI/SingleFilterButtons/SingleFilterButtons';
import { Context } from '../..';

const CreateTransport = observer(() => {
  const [name, setName] = useState('');
  const [sign, setSign] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState('');

  const {schoolStore} = useContext(Context)

  useEffect(() => {
    fetchCategories().then(data => schoolStore.setCategories(data))
  }, [])

  const confirm = async (e) => {
    // e.preventDefault();

    if (!name || !sign || !color) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    try {
      const data = await createTransport({name: name, sign: sign, color: color, categoryValue: category.value});
      console.log(data);
    } catch (error) {
        console.error("Ошибка при создании автомобиля:", error);
    }
}

  return (
    <>
      <div className='content-container'>
            <p className="heading-text-2">Добавить автомобиль</p>
            <form>
                 <div className="input-container">
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        title={"Название автомобиля"}  
                    /> 
                    <Input
                        value={sign}
                        onChange={e => setSign(e.target.value)}
                        title={"Номерной знак"}  
                    /> 
                    <Input
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        title={"Цвет"}  
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

export default CreateTransport;
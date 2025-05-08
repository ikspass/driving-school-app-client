import React, { useState } from 'react'
import { createCar } from '../../http/adminAPI';
import { observer } from 'mobx-react-lite';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

const CreateCar = observer(() => {
  const [name, setName] = useState('');
  const [sign, setSign] = useState('');
  const [color, setColor] = useState('');

  const confirm = async (e) => {
    e.preventDefault();

    if (!name || !sign || !color) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    try {
      const data = await createCar({name: name, sign: sign, color: color});
      console.log(data);
    } catch (error) {
        console.error("Ошибка при создании автомобиля:", error);
    }
}

  return (
    <>
      <div className='content-container'>
            <p className="heading-text-2">Создать автомобиль</p>
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
                </div>
                <Button onClick={confirm}>Сохранить</Button>
            </form>
        </div>
    </>
  )
})

export default CreateCar;
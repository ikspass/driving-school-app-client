import React, { useState, useContext, useEffect } from 'react'
import { createTransport, fetchCategories } from '../../http/adminAPI';
import { observer } from 'mobx-react-lite';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import SingleFilterButtons from '../UI/SingleFilterButtons/SingleFilterButtons';
import { Context } from '../..';
import ExceptionModal from '../ExceptionModal';

const CreateTransport = observer(({onClose}) => {
  const [name, setName] = useState('');
  const [sign, setSign] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState(null);
  const [exceptionModal, setExceptionModal] = useState(false)


  const {schoolStore} = useContext(Context)

  useEffect(() => {
    fetchCategories().then(data => schoolStore.setCategories(data))
  }, [])

  const confirm = async (e) => {
    e.preventDefault();

    if (!name || !sign || !color || !category) {
      setExceptionModal(true)

    }
    else{
      try {
        const data = await createTransport({name: name, sign: sign, color: color, categoryValue: category.value});
        onClose();
      } catch (error) {
          console.error("Ошибка при создании транспорта:", error);
      }

    }

}

  return (
    <>
      <div className='content-container'>
            <p className="heading-text-2">Добавить транспорт</p>
            <form>
                 <div className="input-container">
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        title={"Название"}  
                    /> 
                    <Input
                        value={sign}
                        onChange={e => setSign(e.target.value)}
                        title={"Регистрационный номер"}  
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

export default CreateTransport;
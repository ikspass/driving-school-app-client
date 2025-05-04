import React from 'react'
import ButtonBack from './UI/ButtonBack/ButtonBack'
import Input from './UI/Input/Input';
import Button from './UI/Button/Button';
import Header from './Header';

function AdminCreateGroup() {
  return (
    <>
        <Header />
        <div className="main-container">
            <ButtonBack/>
            <div style={{width: '600px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
                <p className="heading-text-2">Создать учебную группу</p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <Input title="Номер группы"/>
                    <Input title="Категория"/>
                    <Input title="Дата начала обучения"/>
                </div>
                <Button>Сохранить</Button>
            </div>
        </div>
    </>
  )
}

export default AdminCreateGroup;
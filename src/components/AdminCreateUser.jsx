import React from 'react'
import Button from './UI/Button/Button';
import Input from './UI/Input/Input';
import Header from './Header';
import ButtonBack from './UI/ButtonBack/ButtonBack';

function AdminCreateUser() {
  return (
    <>
        <Header />
        <div className="main-container">
            <ButtonBack/>
            <div style={{width: '600px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
                <p className="heading-text-2">Создать учётную запись</p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <Input title="Роль"/>
                    <Input title="Фамилия"/>
                    <Input title="Имя"/>
                    <Input title="Отчество"/>
                    <Input title="Дата рождения"/>
                    <Input title="Номер телефона"/>
                </div>
                <Button>Сохранить</Button>
            </div>
        </div>
    </>
  )
}

export default AdminCreateUser;
import Input from "./UI/Input/Input";
import Button from "./UI/Button/Button";
import { React, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { REGISTRATION_ROUTE } from "../utils/consts";

const LoginForm = () => {
    const [idNumber, setIdNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const confirm = async (event) => {
      event.preventDefault(); // Предотвращаем перезагрузку страницы
      
      // try {
      //     let data = await login(phone, password);
      //     if (data) {
      //         alert('Пользователь успешно авторизован');
      //         // user.setUser(user);
      //         // user.setIsAuth(true);
      //         // navigate(CREATESTUDENT_ROUTE);
      //     }
      // } catch (error) {
      //     alert(error);
      // }
    }

    return (
      <>
        <form onSubmit={confirm}>
          <p style={{ width: '100%', textAlign: 'center' }} className="heading-text-2">Авторизация</p>
          <Input title='Идентификационный номер' value={idNumber} onChange={e => setIdNumber(e.target.value)} />
          <Input title='Пароль' value={password} onChange={e => setPassword(e.target.value)} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <NavLink to={REGISTRATION_ROUTE} style={{ textDecoration: 'underLine', color: 'var(--black)' }} href="#">Ещё нет аккаунта?</NavLink>
            <Button type="submit">Войти</Button>
          </div>
        </form>
      </>
    );
}

export default LoginForm;
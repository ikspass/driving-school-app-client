import Input from "./UI/Input/Input";
import Button from "./UI/Button/Button";
import { React, useState } from 'react';
import { login } from "../http/userAPI";
import { CREATESTUDENT_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const confirm = async (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        
        try {
            let data = await login(phone, password);
            if (data) {
                alert('Пользователь успешно авторизован');
                // user.setUser(user);
                // user.setIsAuth(true);
                navigate(CREATESTUDENT_ROUTE);
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            <form onSubmit={confirm}>
                <p style={{ width: '100%', textAlign: 'center' }} className="heading-text-2">Авторизация</p>
                <Input title='Номер телефона' value={phone} onChange={e => setPhone(e.target.value)} />
                <Input title='Пароль' value={password} onChange={e => setPassword(e.target.value)} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a style={{ textDecoration: 'underLine', color: 'var(--black)' }} href="#">У вас нет пароля?</a>
                    <Button type="submit">Войти</Button>
                </div>
            </form>
            <p style={{marginTop: '50px'}} className='small-text'>Авторизация доступна только для учащихся и персонала автошколы</p>
        </>
    );
}

export default LoginForm;
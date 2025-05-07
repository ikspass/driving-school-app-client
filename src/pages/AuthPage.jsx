import React, { useState, useContext } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from '../utils/consts';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import { login, registration } from '../http/userAPI';
import { Context } from '..'

export default function AuthPage() {

  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');

  const {user} = useContext(Context)
  const navigate = useNavigate();

  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE

  const confirm = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isLogin) {
        data = await login(idNumber, password);
      }
      else {
        data = await registration(idNumber, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(HOME_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
    
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px'}}>
      <form >
          <p style={{ width: '100%', textAlign: 'center' }} className="heading-text-2">{isLogin ? 'Авторизация' : 'Регистрация'}</p>
          <Input 
            title='Идентификационный номер' 
            value={idNumber}
            onChange={e => setIdNumber(e.target.value)} 
          />
          <Input 
            title='Пароль' 
            type='password'
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {isLogin ?
              <NavLink className='link-text' to={REGISTRATION_ROUTE}>Ещё нет аккаунта?</NavLink>
              :
              <NavLink className='link-text' to={LOGIN_ROUTE}>Уже есть аккаунт?</NavLink>
            }
            <Button onClick={confirm} type="submit">Подтвердить</Button>
          </div>
        </form>
    </div>
  )
}

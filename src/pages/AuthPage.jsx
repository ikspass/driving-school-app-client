import React, { useState, useContext } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, ADMINAUTH_ROUTE, SCHEDULE_ROUTE, LANDING_ROUTE } from '../utils/consts';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import { login, registration } from '../http/userAPI';
import { Context } from '..'
import { fetchUserById } from '../http/adminAPI';
import { observer } from 'mobx-react-lite';
import ButtonBack from '../components/UI/ButtonBack/ButtonBack';

const AuthPage = observer(() => {

  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const {userStore} = useContext(Context)
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE

  const confirm = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (isLogin) {
        data = await login(idNumber, password);
      } else {
        data = await registration(idNumber, password);
      }
      const user = await fetchUserById(data.id);
      localStorage.setItem('user', JSON.stringify({id: user.id, role: user.role.value}));
      await userStore.setUser({id: user.id, role: user.role.value});
      await userStore.setIsAuth(true);
      await navigate(SCHEDULE_ROUTE);
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <div style={{display: 'flex', width: '400px',  flexDirection: 'column', marginTop: '100px', marginLeft: 'auto', marginRight: 'auto'}}>
      
        <NavLink to={LANDING_ROUTE} style={{width: 'fit-content'}}>
          <ButtonBack />
        </NavLink>
      <form style={{width: '400px'}}>
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
        <NavLink to={ADMINAUTH_ROUTE}>
          <Button style={{position: 'absolute', top: '20px', right: '20px'}} className='outline'>Войти от имени администратора</Button>
        </NavLink>
    </div>
  )
})

export default AuthPage;
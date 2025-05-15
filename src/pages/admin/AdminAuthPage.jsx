import React, { useState, useContext } from 'react'
import { Context } from '../..';
import Button from '../../components/UI/Button/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import Input from '../../components/UI/Input/Input';
import ButtonBack from '../../components/UI/ButtonBack/ButtonBack';
import { adminLogin } from '../../http/adminAPI';

const AdminAuthPage = () => {

  const [password, setPassword] = useState('');

  const {userStore} = useContext(Context)
  const navigate = useNavigate();

  console.log(process.env)

  const confirm = async (e) => {
    e.preventDefault();
    
    adminLogin(password)
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user));
    })
    .catch(err => console.error('Ошибка ', err));
    userStore.setIsAuth(true)
    navigate(ADMIN_ROUTE)
  }
  
  return (
    <div style={{display: 'flex', width: '400px', gap: '20px', flexDirection: 'column', marginTop: '200px', marginLeft: 'auto', marginRight: 'auto'}}>
      <NavLink to={LOGIN_ROUTE}>
        <ButtonBack />
      </NavLink>
      <form>
          <p style={{ width: '100%', textAlign: 'center' }} className="heading-text-2">Вход от имени администратора</p>
          <Input 
            title='Пароль' 
            type='password'
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            <Button onClick={confirm} type="submit">Подтвердить</Button>
          </div>
        </form>
    </div>
  )
}

export default AdminAuthPage;
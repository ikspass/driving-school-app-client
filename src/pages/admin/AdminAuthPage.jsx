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
      localStorage.setItem('user', JSON.stringify({id: 0, role: 'admin'}));
      userStore.setIsAuth(true)
      userStore.setUser({id: 0, role: 'admin'})
      navigate(ADMIN_ROUTE)
    })
    .catch(err => alert(err));
  }
  
  return (
    <div style={{display: 'flex', width: '400px', gap: '20px', flexDirection: 'column', marginTop: '100px', marginLeft: 'auto', marginRight: 'auto'}}>
      <NavLink to={LOGIN_ROUTE} style={{width: 'fit-content'}}>
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
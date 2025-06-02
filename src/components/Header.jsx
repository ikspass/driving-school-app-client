import { Context } from "..";
import { useState, useEffect,useContext } from 'react'
import StudentNavigation from "./StudentNavigation";
import Button from "./UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { LOGIN_ROUTE } from "../utils/consts";
import StaffNavigation from "./StaffNavigation";
import { fetchUserById } from "../http/adminAPI";

const Header = observer(() => {

  const {userStore} = useContext(Context);
  const navigate = useNavigate()

  const [user, setUser] = useState({})
  
  const logOut = async () => {
    userStore.setUser({});
    userStore.setIsAuth(false);
    localStorage.clear('token');
    await navigate(LOGIN_ROUTE);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserById(userStore.user.id);
        await setUser(userData)
      } catch(e) {
        console.error(e)
      }
    }
    fetchData();
  }, [])  
  
  return (
    <div className="header">
      <div className="main-container">
        <div className="header-title">
          <p className="heading-text-2">Driving School App</p>
          <div style={{display: 'flex', gap: '30px', alignItems: 'center'}}>
            <Button onClick={() => logOut()}>Выйти</Button>
            <div className="user-photo">
              <img src={`${process.env.REACT_APP_API_URL}/${user.img}`} alt={user.fullName}  />
            </div>
          </div>
        </div>
        <div className="header-navigation">
          {user.role === 'student' ?
            <StudentNavigation />        
          :
           <StaffNavigation /> 
          }
        </div>
      </div>
    </div>
  );
})
  
export default Header;
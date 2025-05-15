import { Context } from "..";
import { useContext } from 'react'
import AdminNavigation from "./AdminNavigation";
import UserNavigation from "./UserNavigation";
import Button from "./UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { LOGIN_ROUTE } from "../utils/consts";

const Header = observer(() => {

  const {userStore} = useContext(Context);
  const navigate = useNavigate()

  const logOut = () => {
    userStore.setUser({});
    userStore.setIsAuth(false);
    localStorage.clear('token');
    navigate(LOGIN_ROUTE);
  }

  return (
    <div className="header">
      <div className="main-container">
        <div className="header-title">
          <p className="heading-text-2">Driving School App</p>
          <div style={{display: 'flex', gap: '30px', alignItems: 'center'}}>
            <Button onClick={() => logOut()}>Выйти</Button>
            <div className="user-photo"></div>
          </div>
        </div>
        <div className="header-navigation">
          <AdminNavigation />        
        </div>
      </div>
    </div>
  );
})
  
export default Header;
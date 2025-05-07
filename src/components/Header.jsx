import { Context } from "..";
import { useContext } from 'react'
import AdminNavigation from "./AdminNavigation";
import Button from "./UI/Button/Button";
import UserNavigation from "./UserNavigation";

function Header() {

  const {user} = useContext(Context);


  return (
    <div className="header">
      <div className="header-title">
        <p className="heading-text-2">Driving School App</p>
        <div style={{display: 'flex', gap: '30px', alignItems: 'center'}}>
          <Button>Выйти</Button>
          <div className="user-photo"></div>
        </div>
      </div>
      <div className="header-navigation">
        <AdminNavigation />        
      </div>
    </div>
  );
}
  
  export default Header;
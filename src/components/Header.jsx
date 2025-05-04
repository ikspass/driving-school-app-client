import AdminNavigation from "./AdminNavigation";
import UserNavigation from "./UserNavigation";

function Header() {
    return (
      <div className="header">
        <div className="header-title">
          <p className="heading-text-2">Driving School App</p>
          <div className="user-photo"></div>
        </div>
        <div className="header-navigation">
          <AdminNavigation />        
        </div>
      </div>
    );
  }
  
  export default Header;
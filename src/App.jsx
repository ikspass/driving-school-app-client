import React, { useState, useContext } from "react";
import './styles/App.css'
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import { ADMIN_ROUTE, ADMINAUTH_ROUTE, LANDING_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";
import { observer } from 'mobx-react-lite';
import { Context } from ".";

const App = () => {
  const {userStore, modalStore} = useContext(Context)
  console.log(userStore.user)
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

const Main = observer(() => {
  const { userStore } = useContext(Context);
  const location = useLocation()

  return (
    <>
      {userStore.isAuth && userStore.user?.role !== 'admin' && <Header />}
      {location.pathname === LANDING_ROUTE && <Header />}
      <div className="main-container">
        <AppRouter />
      </div>
    </>
  );
});

export default App;
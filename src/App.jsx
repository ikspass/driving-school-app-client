import React, { useState } from "react";
import './styles/App.css'
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";
import { observer } from 'mobx-react-lite';

const App = () => {
  
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const location = useLocation();
  const noHeaderRoutes = [LOGIN_ROUTE, REGISTRATION_ROUTE, ADMIN_ROUTE];

  const shouldHideHeader = noHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <div className="main-container">
        <AppRouter />
      </div>
    </>
  );
}

export default App;
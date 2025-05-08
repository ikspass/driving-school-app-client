import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { Context } from '..';

function AppRouter() {

  const {userStore} = useContext(Context)
  
  return (
    <Routes>
      {userStore.isAuth && authRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component />}/>
      )}
      {publicRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component />}/>
      )}
    </Routes> 
  );
}

export default AppRouter;
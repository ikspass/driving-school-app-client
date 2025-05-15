import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getRoutesByRole, initialRoutes, publicRoutes } from '../routes';
import { Context } from '..';

function AppRouter() {

  const {userStore} = useContext(Context)
  const routes = getRoutesByRole(userStore.user.role.value);
  
  // Определяем начальную страницу в зависимости от роли
  const initialRoute = userStore.isAuth 
    ? initialRoutes[userStore.user.role] 
    : initialRoutes.public;

  return (
    <Routes>
      <Route path="*" element={<Navigate to={initialRoute} />} />
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes> 
  );
}

export default AppRouter;
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getRoutesByRole, initialRoutes, publicRoutes } from '../routes';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {

  const {userStore, routeStore} = useContext(Context)
  const routes = userStore.user.role ? getRoutesByRole(userStore.user.role) : getRoutesByRole('default');
  
  const initialRoute = userStore.isAuth 
    ? initialRoutes[userStore.user.role] 
    : initialRoutes.public;

  routeStore.setInitialRoute(initialRoute);
  
  return (
    <Routes>
      <Route path="*" element={<Navigate to={routeStore.initialRoute} replace/>} />
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes> 
  );
})

export default AppRouter;
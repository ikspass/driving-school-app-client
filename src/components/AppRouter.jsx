import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SchedulePage from '../pages/SchedulePage';
import MaterialsPage from '../pages/MaterialsPage';
import HomePage from '../pages/HomePage';
import StatisticPage from '../pages/StatisticPage';
import AdminGroupsPage from '../pages/AdminGroupsPage';
import AdminStudentsPage from '../pages/AdminStudentsPage';
import AdminStaffPage from '../pages/AdminStaffPage';
import CreateStudent from './CreateStudent';
import CreateGroup from './CreateGroup'
import Error from './Error';

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/schedule' element={<SchedulePage />} />
      <Route path='/material' element={<MaterialsPage />} />
      <Route path='/statistic' element={<StatisticPage />} />
      <Route path='/groups' element={<AdminGroupsPage />} />
      <Route path='/students' element={<AdminStudentsPage />} />
      <Route path='/staff' element={<AdminStaffPage />} />
      <Route path='/createStudent' element={<CreateStudent />} />
      <Route path='/createGroup' element={<CreateGroup />} />
      <Route path='/error' element={<Error />} />
      <Route path='*' element={<Navigate to='/error' />} />
    </Routes> 
  );
}

export default AppRouter;
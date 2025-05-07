import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import StudentPage from './pages/StudentPage';
import StudentStore from './store/StudentStore';
import GroupStore from './store/GroupStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    student: new StudentStore(),
    group: new GroupStore()
  }}>
    <App/>
  </Context.Provider>
);
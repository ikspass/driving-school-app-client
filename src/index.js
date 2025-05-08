import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import StudentStore from './store/StudentStore';
import GroupStore from './store/GroupStore';
import SchoolStore from './store/SchoolStore';
import EventStore from './store/EventStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    userStore: new UserStore(),
    studentStore: new StudentStore(),
    groupStore: new GroupStore(),
    eventStore: new EventStore(),
    schoolStore: new SchoolStore()
  }}>
    <App/>
  </Context.Provider>
);
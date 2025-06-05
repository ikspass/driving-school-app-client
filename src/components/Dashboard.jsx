import React from 'react';

const Dashboard = ({ ChildComponent }) => {
  return (
    <div className="dashboard">
      {ChildComponent ? <ChildComponent /> : <p className="normal-text">Воспользуйтесь меню навигации</p>}    
    </div>
  );
};

export default Dashboard;
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import Button from '../components/UI/Button/Button';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { routeStore } = useContext(Context);

  return (
    <div className="content-container">
      <p className="heading-text-2">ERROR</p>
      <div></div>
      <Button onClick={() => {navigate(routeStore.initialRoute)}}>Вернуться в приложение</Button>
    </div>
  );
};

export default ErrorPage;
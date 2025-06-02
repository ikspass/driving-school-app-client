import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import Button from '../components/UI/Button/Button'; // Убедитесь, что импортирован ваш Button

const ErrorPage = () => {
  const navigate = useNavigate();
  const { routeStore } = useContext(Context);

  return (
    <div className="content-container">
      <p className="heading-text-2">ERROR</p>
      <Button onClick={() => {navigate(routeStore.initialRoute)}}>Вернуться в приложение</Button>
    </div>
  );
};

export default ErrorPage;
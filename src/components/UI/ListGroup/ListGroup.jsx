import React, { useState } from 'react';
import classes from './ListGroup.module.css';
import { useNavigate } from 'react-router-dom';

export default function ListGroup({ items, title }) {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleItemClick = (index, url) => {
    setSelectedIndex(index); // Устанавливаем индекс выбранного элемента
    // navigate(url); // Навигация
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <p style={{ marginBottom: '10px' }} className="heading-text-2">{title}</p>
      <div className={classes.container}>
        {items.map((item, index) => (
          <p
            key={index}
            onClick={() => handleItemClick(index, item.url)}
            className={`normal-text ${classes.item} ${selectedIndex === index ? classes.selected : ''}`}
          >
            {item.value}
          </p>
        ))}
      </div>
    </div>
  );
}
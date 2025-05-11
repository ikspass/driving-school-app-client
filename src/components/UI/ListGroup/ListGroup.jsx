import React, { useState } from 'react';
import classes from './ListGroup.module.css';

export default function ListGroup({ items, onSelect, className }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleItemClick = (index, component) => {
    setSelectedIndex(index); // Устанавливаем индекс выбранного элемента
    onSelect(component); // Передаем выбранный компонент родителю
  };

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={classes.container}>
        {items.map((item, index) => (
          <p
            key={index}
            onClick={() => handleItemClick(index, item.component)}
            className={`normal-text ${classes.item} ${selectedIndex === index ? classes.selected : ''}`}
          >
            {item.value}
          </p>
        ))}
      </div>
    </div>
  );
}
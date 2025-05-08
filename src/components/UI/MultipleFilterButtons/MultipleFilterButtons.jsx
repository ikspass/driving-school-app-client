import React from 'react';
import classes from './MultipleFilterButtons.module.css';

const MultipleFilterButtons = ({ title, filters, selected, setSelected }) => {
  return (
    <>
      <p className="small-text" style={{ paddingLeft: '10px' }}>{title}</p>
      {filters.length ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {filters.map((filter) => {
            const isSelected = selected.some(sel => sel.id === filter.id);

            return (
              <div
                key={filter.id}
                className={`normal-text ${classes.pin} ${isSelected ? classes.selected : ''}`}
                onClick={() => {
                  if (isSelected) {
                    setSelected(selected.filter(sel => sel.id !== filter.id)); // Убираем элемент
                  } else {
                    setSelected([...selected, filter]); // Добавляем элемент
                  }
                }}>
                {filter.value}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="normal-text">Данные отсутствуют</p>
      )}
    </>
  );
}

export default MultipleFilterButtons;
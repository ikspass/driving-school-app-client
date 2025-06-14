import React from 'react';
import classes from './MultipleFilterButtons.module.css';

const MultipleFilterButtons = ({ title, filters, selected, setSelected }) => {
  return (
    <div className='filter-container'>
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
                    setSelected(selected.filter(sel => sel.id !== filter.id));
                  } else {
                    setSelected([...selected, filter]);
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
    </div>
  );
}

export default MultipleFilterButtons;
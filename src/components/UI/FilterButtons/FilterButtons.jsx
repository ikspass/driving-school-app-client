import React from 'react';
import classes from './FilterButtons.module.css';

const FilterButtons = ({ title, filters, selected, setSelected }) => {
  return (
    <>
      <p className="small-text">{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {filters.map((filter, index) => (
          <div
            key={index} 
            className={`normal-text ${classes.pin} ${selected === filter ? classes.selected : ''}`}
            onClick={() => {
              setSelected(selected === filter ? null : filter);
            }}>
            {filter}
          </div>
        ))}
      </div>
    </>
  );
}

export default FilterButtons;
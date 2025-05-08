import React from 'react';
import classes from './SingleFilterButtons.module.css';

const FilterButtons = ({ title, filters, selected, setSelected }) => {
return (
  <>
    <p className="small-text" style={{paddingLeft: '10px'}}>{title}</p>
    {filters.length ?
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {filters.map((filter) => (
          <div
          key={filter.id}
          className={`normal-text ${classes.pin} ${selected?.id === filter.id ? classes.selected : ''}`}
          onClick={() => {
          setSelected(selected?.id === filter.id ? null : filter);
          }}>
          {filter.value}
          </div>
        ))}
      </div>
      :
      <p className="normal-text">Данные отсутствуют</p>
    }
  </>
)}

export default FilterButtons;
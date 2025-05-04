import React from 'react';
import classes from './Select.module.css'

export default function Select({ options, defaultValue, value, onChange, sortKey }) {

  return (
    <select
      value={value}
      className={classes.select +' normal-text'}
      onChange={event => {
        onChange(sortKey, event.target.value)
      }}
    >
      <option disabled value="">{defaultValue}</option>
      {options.map(option => 
        <option key={option} value={option}>{option}</option>
      )}
    </select>
  );
}
import React from 'react'
import classes from './FilterButtons.module.css'

 function FilterButtons({filters, selected}) {
  return (
    <div style={{display: 'flex', gap: '20px'}}>
      {filters.map((pin, pinIndex) => 
        selected == pinIndex ?
        <div key={pinIndex} className={`${classes.pin} ${classes.selected}`}>{pin}</div>
        :
        <div key={pinIndex} className={classes.pin}>{pin}</div>
      )}
    </div>
  )
}

export default FilterButtons;
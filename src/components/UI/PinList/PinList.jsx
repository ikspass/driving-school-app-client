import React from 'react'
import classes from './PinList.module.css';

const PinList = ({value}) => {
  return (
    value.map((item) => 
      Array.isArray(item) ? 
        item.map(elem => 
          <div className={`normal-text ${classes.pin}`}>
            {elem}
          </div>
        )
      :
      <div className={`normal-text ${classes.pin}`}>
        {item}
      </div>
    )
  )
}

export default PinList;

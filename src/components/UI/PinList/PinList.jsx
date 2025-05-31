import React from 'react'
import classes from './PinList.module.css';

const PinList = ({value}) => {
  return (
    value.map((item, index) => 
      Array.isArray(item) ? 
        item.map((elem, elemIndex) => 
          <div key={`${index}-${elemIndex}`} className={`normal-text ${classes.pin}`}>
            {elem}
          </div>
        )
      :
      <div key={index} className={`normal-text ${classes.pin}`}>
        {item}
      </div>
    )
  )
}

export default PinList;

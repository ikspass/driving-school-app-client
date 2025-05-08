import React from 'react'
import classes from './FileInput.model.css'

export default function FileInput({image, ...props}) {
  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
        <p style={{padding: '0 10px 5px 10px'}} className="small-text">Фото</p>
        <div className="image-container">
          {image}
        </div>
      </div>
      <label className="normal-text button">
        <input type="file" {...props}/>
        Выберите файл
      </label>
    </>
  )
}

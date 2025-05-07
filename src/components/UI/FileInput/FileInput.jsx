import React from 'react'
import classes from './FileInput.model.css'

export default function FileInput() {
  return (
    <>
      <p className="small-text">Фото</p>
      <label class="normal-text button">
        <input type="file" />
        Выберите файл
      </label>
    </>
  )
}

import React, { useEffect, useState } from 'react';

const Input = ({ title, isValid=true, ...props }) => {
  return (
    <div className="main-input">
      <p className="small-text">{title}</p>
      <input
        className={`normal-text ${isValid ? '' : 'error-input'} `}
        {...props}
      />
    </div>
  );
};

export default Input;
import React from 'react'

function Footer() {
  return (
    <div className="main-container footer">
      <div style={{display: 'flex', gap: '150px'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
          <p className="heading-text-2">Помощь</p>
          <p className="normal-text">ООО "АвтоводительПлюс"</p>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
          <p className="heading-text-2">Обратная связь</p>
          <a className="normal-text">Категория А</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;

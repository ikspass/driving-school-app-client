import React from 'react'

export default function RegistrationForm() {
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('')
  return (
    <>
      <form onSubmit={confirm}>
        <p style={{ width: '100%', textAlign: 'center' }} className="heading-text-2">Регистрация</p>
        <Input title='Идентификационный номер' value={idNumber} onChange={e => setIdNumber(e.target.value)} />
        <Input title='Пароль' value={password} onChange={e => setPassword(e.target.value)} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a style={{ textDecoration: 'underLine', color: 'var(--black)' }} href="#">Забыли пароль?</a>
          <a style={{ textDecoration: 'underLine', color: 'var(--black)' }} href="#">Уже есть аккаунт?</a>
          <Button type="submit">Войти</Button>
        </div>
      </form>
    </>
  )
}

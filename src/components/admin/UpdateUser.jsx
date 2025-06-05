import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { createUser, createTeacher, updateUser } from '../../http/adminAPI';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import FileInput from '../UI/FileInput/FileInput';

const UpdateUser = observer(({ onClose, user }) => {
  const [idNumber, setIdNumber] = useState(user.idNumber);
  const [passportNumber, setPassportNumber] = useState(user.passportNumber);
  const [fullName, setFullName] = useState(user.fullName);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [validations, setValidations] = useState({
    idNumber: true,
    passportNumber: true,
    fullName: true,
    dateOfBirth: true,
    phoneNumber: true,
  });


  const confirm = async (e) => {
    e.preventDefault();

    const newValidations = {
      idNumber: /^[A-Za-z0-9]{14}$/.test(idNumber),
      passportNumber: /^[A-Za-z0-9]{9}$/.test(passportNumber),
      fullName: /^[А-Яа-яЁёA-Za-z\s-]+$/.test(fullName),
      dateOfBirth: /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth),
      phoneNumber: /^\+\d{12}$/.test(phoneNumber),
    };

    setValidations(newValidations);

    const allValid = Object.values(newValidations).every(Boolean);
    if (allValid) {
   
      try {
        const userData = await updateUser(user.id, {idNumber: idNumber, passportNumber: passportNumber, fullName: fullName, dateOfBirth: dateOfBirth, phoneNumber: phoneNumber});
        onClose();
      } catch (err) {
        console.error('Ошибка при обновлении:', err);
      }
      console.log("Форма отправлена!");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value.startsWith('+') ? value : '+' + value.replace(/\+/g, ''));
  };

  return (
    <div className='content-container'>
      <p className="heading-text-2">Добавить учётную запись преподавателя</p>
      <form>
        <div className="form-container">
          <div className="input-container">
            <Input
              value={idNumber}
              onChange={e => setIdNumber(e.target.value)}
              title={"Идентификационный номер"}  
              isValid={validations.idNumber}
            /> 
            <Input
              value={passportNumber}
              onChange={e => setPassportNumber(e.target.value)}
              title={"Номер паспорта"}  
              isValid={validations.passportNumber}
            /> 
            <Input
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              title={"ФИО"} 
              isValid={validations.fullName}
            />
            <Input
              value={dateOfBirth}
              title={'Дата рождения'}
              placeholder='YYYY-MM-DD'
              onChange={e => setDateOfBirth(e.target.value)}
              isValid={validations.dateOfBirth}
            />
            <Input
              value={phoneNumber}
              onChange={handlePhoneChange}
              title={"Номер телефона"} 
              isValid={validations.phoneNumber}
            />
          </div>
          
        </div>
      </form>
      <Button onClick={confirm}>Сохранить</Button>
    </div>
  )
})

export default UpdateUser;
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { createUser, createTeacher } from '../../http/adminAPI';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import FileInput from '../UI/FileInput/FileInput';

const CreateTeacher = observer(({ onClose }) => {
  const [idNumber, setIdNumber] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+');
  const [dateOfEmployment, setDateOfEmployment] = useState('');
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [validations, setValidations] = useState({
    idNumber: true,
    passportNumber: true,
    fullName: true,
    dateOfBirth: true,
    phoneNumber: true,
    dateOfEmployment: true,
  });

  const selectFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const confirm = async (e) => {
    e.preventDefault();

    // Проверьте корректность ввода перед отправкой
    const newValidations = {
      idNumber: /^[A-Za-z0-9]{14}$/.test(idNumber),
      passportNumber: /^[A-Za-z0-9]{9}$/.test(passportNumber),
      fullName: /^[А-Яа-яЁёA-Za-z\s-]+$/.test(fullName),
      dateOfBirth: /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth),
      phoneNumber: /^\+\d{12}$/.test(phoneNumber),
      dateOfEmployment: /^\d{4}-\d{2}-\d{2}$/.test(dateOfEmployment),
    };

    setValidations(newValidations);

    const allValid = Object.values(newValidations).every(Boolean);
    if (allValid) {
      const formDataUser = new FormData();
      formDataUser.append('idNumber', idNumber);
      formDataUser.append('passportNumber', passportNumber);
      formDataUser.append('fullName', fullName);
      formDataUser.append('dateOfBirth', dateOfBirth);
      formDataUser.append('phoneNumber', phoneNumber);
      formDataUser.append('roleValue', 'teacher');
      formDataUser.append('img', file);

      try {
        const userData = await createUser(formDataUser);
        if (userData && userData.id) {
          const teacherData = await createTeacher({ userId: userData.id, dateOfEmployment });
          onClose();
        } else {
          console.error('Не удалось получить id пользователя');
        }
      } catch (err) {
        console.error('Ошибка при создании:', err);
      }
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
            <Input
              value={dateOfEmployment}
              title={'Дата приёма на работу'}
              placeholder='YYYY-MM-DD'
              onChange={e => setDateOfEmployment(e.target.value)}
              isValid={validations.dateOfEmployment}
            />
          </div>
          <div className="content-container-right">
            <FileInput 
              name='image'
              onChange={selectFile}
              required
              image={imagePreview && <img src={imagePreview} alt="Фото пользователя" />}
            />
          </div>
        </div>
      </form>
      <Button onClick={confirm}>Сохранить</Button>
    </div>
  )
})

export default CreateTeacher;
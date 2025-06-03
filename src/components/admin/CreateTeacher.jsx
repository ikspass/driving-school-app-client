import { observer } from 'mobx-react-lite';
import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../..';
import { createGroup, createTeacher, createTeacherQual, createUser, fetchCategories, fetchQuals, fetchTeachers } from '../../http/adminAPI';
import Input from '../UI/Input/Input';
import MultipleFilterButtons from '../UI/MultipleFilterButtons/MultipleFilterButtons';
import Button from '../UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import FileInput from '../UI/FileInput/FileInput';

const CreateTeacher = observer(({onClose}) => {
  const [idNumber, setIdNumber] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [adress, setAdress] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfEmployment, setDateOfEmployment] = useState('');
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {schoolStore} = useContext(Context)

  useEffect(() => {
    fetchQuals().then(data => schoolStore.setQuals(data))
  }, [])

  const selectFile = e => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile)
    setImagePreview(URL.createObjectURL(selectedFile));
  }

  const confirm = async (e) => {
    e.preventDefault();
  
    const formDataUser = new FormData();
    formDataUser.append('idNumber', idNumber);
    formDataUser.append('passportNumber', passportNumber);
    formDataUser.append('adress', adress);
    formDataUser.append('fullName', fullName);
    formDataUser.append('dateOfBirth', dateOfBirth);
    formDataUser.append('phoneNumber', phoneNumber);
    formDataUser.append('roleValue', 'teacher');
    formDataUser.append('img', file);
    
    try {
      const userData = await createUser(formDataUser);
      console.log('Пользователь создан', userData);
  
      if (userData && userData.id) {
        const teacherData = await createTeacher({ userId: userData.id, dateOfEmployment });
        console.log('Преподаватель создан', teacherData);
    
        onClose();
      } else {
        console.error('Не удалось получить id пользователя');
      }
    } catch (err) {
      console.error('Ошибка при создании:', err);
    }
  };

  const navigate = useNavigate();

  return(
    <div className='content-container'>
      <p className="heading-text-2">Добавить учётную запись преподавателя</p>
      <form>
        <div className="form-container">
          <div className="input-container">
            <Input
              value={idNumber}
              onChange={e => setIdNumber(e.target.value)}
              title={"Идентификационный номер"}  
            /> 
            <Input
              value={passportNumber}
              onChange={e => setPassportNumber(e.target.value)}
              title={"Номер паспорта"}  
            /> 
            <Input
              value={adress}
              onChange={e => setAdress(e.target.value)}
              title={"Место прописки"}  
            /> 
            <Input
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              title={"ФИО"} 
            />
            <Input
              value={dateOfBirth}
              onChange={e => setDateOfBirth(e.target.value)}
              title={"Дата рождения"} 
            />
            <Input
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              title={"Номер телефона"} 
            />
            <Input
              value={dateOfEmployment}
              onChange={e => setDateOfEmployment(e.target.value)}
              title={"Дата приёма на работу"} 
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
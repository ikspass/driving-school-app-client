import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react'
import { createInstructor, createInstructorCategories, createUser, fetchCategories } from '../../http/adminAPI';
import Input from '../UI/Input/Input';
import MultipleFilterButtons from '../UI/MultipleFilterButtons/MultipleFilterButtons';
import Button from '../UI/Button/Button';
import FileInput from '../UI/FileInput/FileInput';
import ExceptionModal from '../ExceptionModal';

const CreateInstructor = observer(({onClose}) => {
  const [idNumber, setIdNumber] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+');
  const [dateOfEmployment, setDateOfEmployment] = useState('');

  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [schoolCategories, setSchoolCategories] = useState([]);
  const [exceptionModal, setExceptionModal] = useState(false)
  const [validations, setValidations] = useState({
    idNumber: true,
    passportNumber: true,
    fullName: true,
    dateOfBirth: true,
    phoneNumber: true,
    dateOfEmployment: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories()
        setSchoolCategories(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const selectFile = e => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile)
    setImagePreview(URL.createObjectURL(selectedFile));
  }

  const confirm = async (e) => {
    e.preventDefault()

    const newValidations = {
      idNumber: /^[A-Za-z0-9]{14}$/.test(idNumber),
      passportNumber: /^[A-Za-z0-9]{9}$/.test(passportNumber),
      fullName: /^[А-Яа-яЁёA-Za-z\s-]+$/.test(fullName),
      dateOfBirth: /^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth),
      phoneNumber: /^\+\d{12}$/.test(phoneNumber),
      dateOfEmployment: /^\d{4}-\d{2}-\d{2}$/.test(dateOfEmployment),
    };
    
    setValidations(newValidations);
    if (categories.length == 0) {
      setExceptionModal(true)
      return;
    }
    const allValid = Object.values(newValidations).every(Boolean);
    if (allValid) {
      const formDataUser = new FormData()
      formDataUser.append('idNumber', idNumber)
      formDataUser.append('passportNumber', passportNumber)
      formDataUser.append('fullName', fullName)
      formDataUser.append('dateOfBirth', dateOfBirth)
      formDataUser.append('phoneNumber', phoneNumber)
      formDataUser.append('roleValue', 'instructor')
      formDataUser.append('img', file)

      if (categories.length == 0) {
        setExceptionModal(true)
        return;
      }
      else{
        createUser(formDataUser)
        .then(data => {
          if (data && data.id) {
            createInstructor({userId: data.id, dateOfEmployment: dateOfEmployment})
            .then(data => {
              
              Promise.all(categories.map(async (id) => {
                await createInstructorCategories({ instructorId: data.id, categoryId: id })
              }))
              
              onClose();
            })
            .catch(err => {
                console.error('Ошибка при создании инструктора:', err);
            });
  
          } else {
            console.error('Не удалось получить id пользователя');
          }
        })
        .catch(err => console.error('Ошибка при создании пользователя:', err));
      }
    }
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value.startsWith('+') ? value : '+' + value.replace(/\+/g, ''));
  };

  return(
    <div className='content-container'>
      <p className="heading-text-2">Добавить учётную запись инструктора</p>
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
              onChange={e => setDateOfBirth(e.target.value)}
              placeholder='YYYY-MM-DD'
              title={"Дата рождения"} 
              isValid={validations.dateOfBirth}
            />
            <Input
              value={phoneNumber}
              onChange={e => handlePhoneChange}
              title={"Номер телефона"} 
              isValid={validations.phoneNumber}
            />
            <MultipleFilterButtons 
              title='Категории'
              filters={schoolCategories.map(elem => ({id: elem.id, value: elem.value}))}
              selected={categories}
              setSelected={setCategories}
            />
            <Input
              value={dateOfEmployment}
              placeholder='YYYY-MM-DD'
              onChange={e => setDateOfEmployment(e.target.value)}
              title={"Дата приёма на работу"} 
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
      <ExceptionModal
        style={{top: '-60px'}}
        text='Категория не выбрана'
        isOpen={exceptionModal}
        onConfirm={() => setExceptionModal(false)}
      />
    </div>
  )
})

export default CreateInstructor;
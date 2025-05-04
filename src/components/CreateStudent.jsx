import Input from "./UI/Input/Input";
import ButtonBack from "./UI/ButtonBack/ButtonBack";
import Button from "./UI/Button/Button";
import React, {useState} from 'react';
import { Link, useNavigate} from "react-router-dom";
import FilterButtons from "./UI/FilterButtons/FilterButtons";

const CreateStudent = () => {
    const [idNumber, setIdNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [category, setCategory] = useState('');

    const confirm = async (e) => {
      e.preventDefault();
      console.log(idNumber)
      console.log(fullName)
      console.log(dateOfBirth)
      console.log(phoneNumber)
      console.log(category)
    //   try {
    //     // let data = await createStudent(idNumber, fullName, dateOfBirth, phoneNumber, category);
    //     if (data) {
    //       // user.setUser(user);
    //       // user.setIsAuth(true);
    //       // alert('Пользователь успешно создан');
    //       // navigate(USERLIST_ROUTE);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    }

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return(
        <div className='content-container'>
            <ButtonBack onClick={handleNavigate('/')}/>
            <p className="heading-text-2">Создать событие</p>
            <form>
                 <div className="input-container">
                    <Input
                        value={idNumber}
                        onChange={e => setIdNumber(e.target.value)}
                        title={"Идентификационный номер"}  
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
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        title={"Категория"} 
                    />
                </div>
                <Button onClick={confirm}>Сохранить</Button>
            </form>
           
        </div>
        
    )
}

export default CreateStudent;
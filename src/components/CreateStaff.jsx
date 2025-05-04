import Input from "./UI/Input/Input";
import ButtonBack from "./UI/ButtonBack/ButtonBack";
import Button from "./UI/Button/Button";
import React, {useState} from 'react';
import { Link, useNavigate} from "react-router-dom";

const CreateStaff = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const confirm = async (e) => {
        e.preventDefault();
        console.log(name)
        console.log(phone)
        console.log(dateOfBirth)
        try {
            // let data = await createStudent(name, dateOfBirth, phone);
            // if (data) {
            //     alert('Пользователь успешно создан');
            //     // user.setUser(user);
            //     // user.setIsAuth(true);
            //     // navigate(USERLIST_ROUTE);
            // }
        } catch (error) {
            alert(error);
        }
    }

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return(
        <div className='content-container'>
            <ButtonBack onClick={handleNavigate('/')}/>
            <p className="heading-text-2">Создать учетную запись курсанта</p>
            <form>
                 <div className="input-container">
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        title={"Идентификационный номер"}  
                    /> 
                    <Input
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        title={"Дата рождения"} 
                    />
                    <Input
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        title={"Номер телефона"} 
                    />
                </div>
                <Button onClick={confirm}>Сохранить</Button>
            </form>
           
        </div>
        
    )
}

export default CreateStaff;
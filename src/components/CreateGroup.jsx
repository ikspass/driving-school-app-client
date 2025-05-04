import Input from "./UI/Input/Input";
import ButtonBack from "./UI/ButtonBack/ButtonBack";
import Button from "./UI/Button/Button";
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";

const CreateGroup = ({create}) => {
    const [number, setNumber] = useState('');
    const [category, setCategory] = useState('');
    const [teacher, setTeacher] = useState('');
    const [success, setSuccess] = useState(false); // State to track success

    const confirm = async (e) => {
        e.preventDefault();
        console.log(number)
        console.log(category)
        console.log(teacher)
        try {
            alert('Группа успешно создана');

            // let data = await createGroup(number, category, teacher);
            // if (data) {
            //     alert('Группа успешно создана');
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
        console.log('aboba')
    };

    useEffect(() => {
      if (success) {
          // Navigate when the success state changes to true
          navigate('/createGroup');
      }
  }, [success, navigate]); // Dependency array includes success and navigate

    return(
        <div className='content-container'>
            <ButtonBack onClick={handleNavigate('/')}/>
            <p className="heading-text-2">Создать учебную группу</p>
            <form>
                 <div className="input-container">
                    <Input
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                        title={"Номер группы"}  
                    /> 
                    <Input
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        title={"Категория"} 
                    /> 
                    <Input
                        value={teacher}
                        onChange={e => setTeacher(e.target.value)}
                        title={"Преподаватель"} 
                    /> 
                </div>
                <Button onClick={confirm}>Сохранить</Button>
            </form>
           
        </div>
        
    )
}

export default CreateGroup;
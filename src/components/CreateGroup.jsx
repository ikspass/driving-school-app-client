import Input from "./UI/Input/Input";
import ButtonBack from "./UI/ButtonBack/ButtonBack";
import Button from "./UI/Button/Button";
import React, {useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Context } from "..";
import FilterButtons from "./UI/FilterButtons/FilterButtons";

const CreateGroup = ({create}) => {
    const [number, setNumber] = useState('');
    const [category, setCategory] = useState('');
    const [teacher, setTeacher] = useState('');
    const [success, setSuccess] = useState(false); // State to track success

    const {group} = useContext(Context);

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

    useEffect(() => {
      if (success) {
          // Navigate when the success state changes to true
          navigate('/createGroup');
      }
  }, [success, navigate]); // Dependency array includes success and navigate

    return(
        <div className='content-container'>
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
                    <FilterButtons 
                      title='Преподаватель'
                      filters={group.teachers.map(elem => elem.fullName)}
                      selected={teacher}
                      setSelected={setTeacher}
                    />
                </div>
                <Button onClick={confirm}>Сохранить</Button>
            </form>
           
        </div>
        
    )
}

export default CreateGroup;
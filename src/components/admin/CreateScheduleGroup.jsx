import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import React, {useState, useEffect, useContext} from 'react';
import { Context } from "../..";
import SingleFilterButtons from "../UI/SingleFilterButtons/SingleFilterButtons"
import { createGroup, createScheduleGroup, fetchCategories, fetchScheduleGroups, fetchUsers } from "../../http/adminAPI";
import { observer } from "mobx-react-lite";

const CreateScheduleGroup = observer(({onClose}) => {
    const [name, setName] = useState('');
    const [minTime, setMinTime] = useState('');
    const [maxTime, setMaxTime] = useState('');


    const confirm = async (e) => {
      e.preventDefault();
      if (!name || !minTime || !maxTime) {
        alert("Пожалуйста, заполните все поля!");
        return;
      }
      try {
        const data = await createScheduleGroup({name: name, minTime: minTime, maxTime: maxTime});
        console.log(data);
        onClose();
      } catch (error) {
        console.error("Ошибка при создании расписания:", error);
      }
    }
    return(
        <div className='content-container'>
            <p className="heading-text-2">Добавить тип расписания</p>
            <form>
                 <div className="input-container">
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        title={"Название"}  
                    /> 
                    <Input
                        value={minTime}
                        onChange={e => setMinTime(e.target.value)}
                        title={"Раннее время"} 
                    /> 
                    <Input
                        value={maxTime}
                        onChange={e => setMaxTime(e.target.value)}
                        title={"Позднее время"} 
                    /> 
                </div>
                <Button onClick={confirm}>Сохранить</Button>
            </form>
        </div>
    )
})

export default CreateScheduleGroup;
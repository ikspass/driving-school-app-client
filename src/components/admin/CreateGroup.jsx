import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import React, {useState, useEffect, useContext} from 'react';
import { Context } from "../..";
import SingleFilterButtons from "../UI/SingleFilterButtons/SingleFilterButtons"
import { createGroup, fetchCategories, fetchScheduleGroups, fetchUsers } from "../../http/adminAPI";
import { observer } from "mobx-react-lite";

const CreateGroup = observer(({onClose}) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [groupTeacher, setGroupTeacher] = useState('');
    const [dateOfStart, setDateOfStart] = useState('')
    const [scheduleGroup, setScheduleGroup] = useState('')

    const {schoolStore} = useContext(Context);
    const {userStore} = useContext(Context);

    useEffect(() => {
      fetchCategories().then(data => schoolStore.setCategories(data))
      fetchScheduleGroups().then(data => schoolStore.setScheduleGroups(data))
      fetchUsers().then(data => userStore.setUsers(data))
    }, [])

    const confirm = async (e) => {
      e.preventDefault();
      if (!name || !category || !groupTeacher || !dateOfStart || !scheduleGroup) {
        alert("Пожалуйста, заполните все поля!");
        return;
      }
      try {
        const data = await createGroup({name: name, categoryValue: category.value, teacherId: groupTeacher.id, dateOfStart: dateOfStart, scheduleGroupName: scheduleGroup.value});
        onClose();
      } catch (error) {
        console.error("Ошибка при создании группы:", error);
      }
    }
    return(
        <div className='content-container'>
            <p className="heading-text-2">Добавить учебную группу</p>
            <form>
                 <div className="input-container">
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        title={"Номер группы"}  
                    /> 
                    <SingleFilterButtons 
                      title='Категория'
                      filters={schoolStore.categories.map(elem => ({id: elem.id, value: elem.value}))}
                      selected={category}
                      setSelected={setCategory}
                    />
                    <Input
                        value={dateOfStart}
                        onChange={e => setDateOfStart(e.target.value)}
                        title={"Дата начала обучения"} 
                    /> 
                    <SingleFilterButtons 
                      title='Преподаватель'
                      filters={userStore.teachers.map(elem => ({id: elem.teacher.id, value: elem.fullName}))}
                      selected={groupTeacher}
                      setSelected={setGroupTeacher}
                    />
                    <SingleFilterButtons 
                      title='Время'
                      filters={schoolStore.scheduleGroups.map(elem => ({id: elem.id, value: elem.name}))}
                      selected={scheduleGroup}
                      setSelected={setScheduleGroup}
                    />
                </div>
                <Button onClick={confirm}>Сохранить</Button>
            </form>
        </div>
    )
})

export default CreateGroup;
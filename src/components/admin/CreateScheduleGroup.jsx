import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import React, {useState} from 'react';
import { createScheduleGroup } from "../../http/adminAPI";
import { observer } from "mobx-react-lite";
import ExceptionModal from "../ExceptionModal";

const CreateScheduleGroup = observer(({onClose}) => {
    const [name, setName] = useState('');
    const [exceptionModal, setExceptionModal] = useState(false)

    const confirm = async (e) => {
      e.preventDefault();
      if (!name) {
        setExceptionModal(true)
      }
      else {
        try {
          const data = await createScheduleGroup({name: name});
          onClose();
        } catch (error) {
          console.error("Ошибка при создании расписания:", error);
        }
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
                        isValid={true}
                    /> 
                </div>
                <Button onClick={confirm}>Сохранить</Button>
                <ExceptionModal
                  style={{top: '-60px'}}
                  text='Заполните все поля'
                  isOpen={exceptionModal}
                  onConfirm={() => setExceptionModal(false)}
                />
            </form>
        </div>
    )
})

export default CreateScheduleGroup;
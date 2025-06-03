import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, useContext } from 'react'
import InformationTable from '../InformationTable';
import { fetchInstructors, fetchTransports, updateStudentInstructor, updateTransportInstructor } from '../../http/adminAPI';
import SelectableInformationTable from '../SelectableInformationTable';
import SingleFilterButtons from '../UI/SingleFilterButtons/SingleFilterButtons';
import Button from '../UI/Button/Button';
import { Context } from '../..';
import { useParams } from 'react-router-dom';
import ExceptionModal from '../ExceptionModal';
import Separator from '../UI/Separator/Separator';

const AssignTransport = observer(({onClose, instructor}) => {

  const [transports, setTransports] = useState([])

  const [loading, setLoading] = useState(true);

  const [exceptionModal, setExceptionModal] = useState(false);
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transports = await fetchTransports();
        setTransports(transports.filter(transport => transport.instructor === null));

        console.log(instructor)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [selectedTransport, setSelectedTransport] = useState(null)

  const confirm = async () => {
    if(selectedTransport !== null){
      if(selectedTransport.instructor === null){
        const data = await updateTransportInstructor(selectedTransport.id, instructor.id)
      }
      else{
        setMessage('Транспорт занят другим инструктором')
        setExceptionModal(true);
      }
      onClose();
    }
    else {
      setMessage('Транспорт не выбран')
      setExceptionModal(true);
    }
  }

  console.log(transports)
    
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-container">
      <p className="heading-text-2">Назначить транспорт</p>
      <p className="normal-text">Текущий транспорт:</p>
      <InformationTable
        columns={[
          { key: "name", label: "Название", isLink: false},
          { key: "category.value", label: "Категория", isLink: false},
        ]}
        data={instructor.transports}
      />
      <Separator />
      <SingleFilterButtons 
        title='Свободный транспорт'
        filters={transports.map(transport => ({id: transport.id, value: `${transport.name} (${transport.category.value})`, instructor: transport.instructor ? transport.instructor.user.fullName : null}))}
        selected={selectedTransport}
        setSelected={setSelectedTransport}
      />
      <Button onClick={confirm}>Сохранить</Button>
      <ExceptionModal
        text={message}
        isOpen={exceptionModal}
        onConfirm={() => setExceptionModal(false)}
      />
    </div>
  )
})

export default AssignTransport;

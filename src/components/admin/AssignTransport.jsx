import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, useContext } from 'react'
import InformationTable from '../InformationTable';
import { fetchInstructors, fetchTransports, updateStudentInstructor, updateTransportInstructor } from '../../http/adminAPI';
import SelectableInformationTable from '../SelectableInformationTable';
import SingleFilterButtons from '../UI/SingleFilterButtons/SingleFilterButtons';
import Button from '../UI/Button/Button';
import { Context } from '../..';
import { useParams } from 'react-router-dom';

const AssignTransport = observer(({onClose}) => {

  const [transports, setTransports] = useState([])

  const {id} = useParams();

  const [loading, setLoading] = useState(true);

  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transports = await fetchTransports();
        setTransports(transports);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [selectedTransport, setSelectedTransport] = useState(null)

  const confirm = () => {
    if(selectedTransport !== null){
      if(selectedTransport.instructor === 'Не назначен'){
        const data = updateTransportInstructor(selectedTransport.id, id)
        
      }
      else{
        
      }
      onClose();
    }
    else {
      alert('Транспорт не выбран')
    }
  }

  console.log(transports)
    
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-container">
      <p className="heading-text-2">Назначить транспорт</p>
      {selectedTransport ?
      <p className="normal-text">Инструктор: {selectedTransport.instructor}</p>
      :
      <p className="normal-text">Выберите инструктора</p>
      }
      <SingleFilterButtons 
        filters={transports.map(transport => ({id: transport.id, value: transport.name, instructor: transport.instructor ? transport.instructor.user.fullName : 'Не назначен'}))}
        selected={selectedTransport}
        setSelected={setSelectedTransport}
      />
      <Button onClick={confirm}>Сохранить</Button>
    </div>
  )
})

export default AssignTransport;

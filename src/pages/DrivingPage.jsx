import React from 'react'
import InformationTable from '../components/InformationTable';
import Button from '../components/UI/Button/Button';
import SelectableInformationTable from '../components/SelectableInformationTable';

const DrivingPage = () => {
  return (
    <div className="content-container">
      <div className="heading-text-2 frame" style={{display: 'flex', justifyContent: 'space-between'}}>
        <p>Вождение</p>
        <p>2A</p>
      </div>
      {/* <div style={{display: 'flex', justifyContent: 'end'}}>
        <Button>Начать событие</Button>
      </div> */}
      {/* <EventTable 
        event={event}
      /> */}

        <div className="horizontal-container">
          <SelectableInformationTable
            
          />
          <duv className="button-container">
            <Button className="outline" >Сохранить</Button>
          </duv>
        </div>
        <InformationTable 
        />
        <Button>Завершить занятие</Button>
    </div>
  )
}

export default DrivingPage;
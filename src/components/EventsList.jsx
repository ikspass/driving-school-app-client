import EventTable from './EventTable'

const EventsList = ({value}) => {
    

    return(
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px', width: '100%'}}>
            {value.map((event, eventIndex) => 
                <EventTable key={eventIndex} event={event}/>
            )}
        </div>
    )
}

export default EventsList;
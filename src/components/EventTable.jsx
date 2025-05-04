import EditButton from "./UI/FunctionButton/EditButton";
import DeleteButton from "./UI/FunctionButton/DeleteButton";

const EventTable = ({event}) => {
    return (
        <div style={{display:'flex', width:'100%', flexDirection:'row', gap:'10px', height:'min-content'}}>
            <table className="event-table normal-text">
            <tbody>
            { event.map( (item, itemIndex) =>
                <tr key = {itemIndex}>
                    <td>{item.key}</td>
                    
                    {'link' in item ? 
                        Array.isArray(item.value) ?
                            <td>
                                {
                                    item.value.map((value, valueIndex) => (
                                        <div key={valueIndex}>
                                            <a>{value}</a>
                                        </div>
                                    ))
                                }
                            </td>
                        :

                        <td className="link-text"><a href="">{item.value}</a></td>
                        : 
                        <td>{item.value}</td>
                    }
                </tr>
            )}
        </tbody>
            </table>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <EditButton/>
                <DeleteButton/>
            </div>

        </div>
        
    );
  }
  
  export default EventTable;
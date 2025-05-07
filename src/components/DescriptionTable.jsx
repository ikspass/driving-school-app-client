import { useNavigate } from "react-router-dom";

function DescriptionTable({value}) {

  const navigate = useNavigate()

  return (
    <table className="description-table normal-text">
      <tbody>
        { value.map( (item, itemIndex) =>
          <tr key = {itemIndex}>
            <td>{item.key}</td>
            
            {'link' in item ? 
              Array.isArray(item.value) ?
                <td>
                  {
                    item.value.map((value, valueIndex) => (
                      <div key={valueIndex}>
                        <p className='link-text' onClick={() => navigate(item.link)}>{value} aboba</p>
                      </div>
                    ))
                  }
                </td>
              :
              <td className="link-text"><p onClick={() => navigate(item.link)}>{item.value}</p></td>
              : 
              <td>{item.value}</td>
            }
          </tr>
        )}
      </tbody>
    </table>
  );
}
  
 export default DescriptionTable;
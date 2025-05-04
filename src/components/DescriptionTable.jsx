function DescriptionTable({value}) {
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
    );
  }
  
  export default DescriptionTable;
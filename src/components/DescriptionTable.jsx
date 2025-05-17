import { useNavigate } from "react-router-dom";

const DescriptionTable = ({ value }) => {
  const navigate = useNavigate();
  return (
    <table className="description-table normal-text">
      <tbody>
        {value && value.length > 0 ? (
          value.map((item, itemIndex) => (
            <tr key={itemIndex}>
              <td>{item.key}</td>
              {'link' in item ? (
                Array.isArray(item.value) ? (
                  <td>
                    {item.value.length > 0 ? (
                      item.value.map((value, valueIndex) => (
                        <div key={valueIndex}>
                          <p className='link-text' onClick={() => navigate(item.link)}>{value} aboba</p>
                        </div>
                      ))
                    ) : (
                      '-'
                    )}
                  </td>
                ) : (
                  <td className="link-text">
                    {item.value !== undefined && item.value !== null ? (
                      <p onClick={() => navigate(item.link)}>{item.value}</p>
                    ) : (
                      '-'
                    )}
                  </td>
                )
              ) : (
                <td>{item.value !== undefined && item.value !== null ? item.value : '-'}</td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2">Нет данных</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default DescriptionTable;
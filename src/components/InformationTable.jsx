import React from 'react';
import { useNavigate } from 'react-router-dom';

function InformationTable({ columns, data, numbered, style }) {
  const navigate = useNavigate();

  const getValue = (row, key) => {
    return key.split('.').reduce((acc, part) => acc && acc[part], row);
  };

  return (
    columns || data ?
    <table className="information-table normal-text" style={style}>
      {columns ?
        <thead>
          <tr>
            {numbered && <th>№</th>}
            {columns.map((column, key) => (
              <th key={key}>
                <p>{column.label}</p>
              </th>
            ))}
          </tr>
        </thead>
        :
        <th>Данные шапки отсутствуют</th>
      }
      <tbody>
        {data && data.length > 0 ?
          data.map((row, infoIndex) => (
            <tr key={infoIndex}>
              {numbered && <td>{infoIndex + 1}</td>}
              {columns.map((column, keyIndex) => {
                const value = getValue(row, column.key);
                return (
                  <td key={keyIndex}>
                    {Array.isArray(value) ? (
                      value.length > 0 ? (
                        value.map((v, valueIndex) => (
                          <div key={valueIndex}>
                            {column.isLink ? (
                              <p className='link-text'>{v}</p>
                            ) : (
                              <p className="normal-text">{v}</p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="normal-text">-</p>
                      )
                    ) : (
                      value === true ? (
                        <p className='normal-text'>Да</p>
                      ) : value === false ? (
                        <p className='normal-text'>Нет</p>
                      ) : value != null ? (
                        column.isLink ? (
                          <p className='link-text' onClick={() => {
                            const navigateTo = column.navigateTo ? column.navigateTo(row) : column.url;
                            navigate(navigateTo);
                          }}>
                            {value}
                          </p>
                        ) : (
                          <p className='normal-text'>{value}</p>
                        )
                      ) : (
                        <p className='normal-text'>-</p>
                      )
                    )}
                  </td>
                );
              })}
            </tr>
          ))
          :
          <tr>
            <td colSpan={numbered ? columns.length + 1 : columns.length}>Данные отсутствуют</td>
          </tr>
        }
      </tbody>
    </table>
    :
    <table className="information-table">
        <tbody>
          <tr>
            <td>Данные отсутствуют</td>
          </tr>
        </tbody>
    </table>
  );
}
  
export default InformationTable;
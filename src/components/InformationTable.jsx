import React from 'react';
import { useNavigate } from 'react-router-dom';
import { STUDENT_ROUTE } from '../utils/consts';

function InformationTable({ columns, data, numbered }) { 
  const navigate = useNavigate();   

  return (
    <table className="information-table normal-text">
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
      <tbody>
        {data.map((row, infoIndex) => (
          <tr key={infoIndex}>
            {numbered && <td>{infoIndex + 1}</td>}
            {columns.map((column, keyIndex) => (
              <td key={keyIndex}>
                {Array.isArray(row[column.key]) ? (
                  row[column.key].map((value, valueIndex) => (
                    <div key={valueIndex}>
                      {column.isLink ?
                        <p className='link-text'>
                          {value}
                        </p>
                        :
                        <p className="normal-text">
                          {value}
                        </p>
                      }
                    </div>
                  ))
                ) : (
                  column.isLink ? (
                    <p className='link-text' onClick={() => navigate(column.url + '/' + infoIndex)}>
                      {row[column.key]}
                    </p>
                  ) : (
                    <p className='normal-text'>{row[column.key]}</p>
                  )
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
  
export default InformationTable;
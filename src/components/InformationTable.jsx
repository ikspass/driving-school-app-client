import React from 'react';
import { useNavigate } from 'react-router-dom';
import { STUDENT_ROUTE } from '../utils/consts';

function InformationTable({ columns, data, numbered }) { 
  const navigate = useNavigate();   

  const getValue = (row, key) => {
    return key.split('.').reduce((acc, part) => acc && acc[part], row);
  };

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
                {Array.isArray(getValue(row, column.key)) ? (
                  getValue(row, column.key).map((value, valueIndex) => (
                    <div key={valueIndex}>
                      {column.isLink ? (
                        <p className='link-text'>{value}</p>
                      ) : (
                        <p className="normal-text">{value}</p>
                      )}
                    </div>
                  ))
                ) : (
                  column.isLink ? (
                    <p className='link-text' onClick={() => {
                      const navigateTo = column.navigateTo ? column.navigateTo(row) : column.url;
                      navigate(navigateTo);
                    }}>
                      {getValue(row, column.key)}
                    </p>
                  ) : (
                    <p className='normal-text'>{getValue(row, column.key)}</p>
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
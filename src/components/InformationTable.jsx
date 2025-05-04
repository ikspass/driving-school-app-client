import React, {useState} from 'react';

function InformationTable({columns, data}) {    
    return (
      <table className="information-table normal-text">
      <thead>
        <tr>
          <th>№</th>
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
            <td>{infoIndex + 1}</td>
            {columns.map((column, keyIndex) => (
              <td key={keyIndex}>
                {column.isLink ? (
                  <a href={row[column.urlKey]} target="_blank" rel="noopener noreferrer">
                    {row[column.key]}
                  </a>
                ) : (
                  <p>{row[column.key]}</p>
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
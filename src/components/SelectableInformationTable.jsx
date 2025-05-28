import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SelectableInformationTable({ columns = [], data = [], numbered = false, setSelectedRow = () => {} }) { 
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState({});
  const [allSelected, setAllSelected] = useState(false);

  const getValue = (row, key) => {
    return key.split('.').reduce((acc, part) => acc && acc[part], row);
  };

  const handleRowClick = (rowId) => {
    setSelectedRows((prev) => {
      const newSelectedRows = {
        ...prev,
        [rowId]: !prev[rowId],
      };
      return newSelectedRows; // Return updated state without calling setSelectedRow here
    });
  };

  const handleSelectAll = () => {
    const newSelectedRows = {};
    data.forEach(row => {
      newSelectedRows[row.id] = !allSelected;
    });
    setSelectedRows(newSelectedRows);
    setAllSelected(!allSelected);
  };

  useEffect(() => {
    // Update the selected rows when selectedRows changes
    const selectedKeys = Object.keys(selectedRows).filter(key => selectedRows[key]);
    setSelectedRow(selectedKeys); // Now this update happens after render

    // Update the allSelected state based on selectedRows
    setAllSelected(Object.keys(selectedRows).length === data.length && Object.values(selectedRows).every(Boolean));
  }, [selectedRows, data.length, setSelectedRow]); // Add setSelectedRow to dependencies

  return (
    data || columns ?
    <table className="information-table normal-text">
      {columns ?
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox" 
                checked={allSelected} 
                onChange={handleSelectAll} 
              />
            </th>
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
            <tr key={infoIndex} onClick={() => handleRowClick(row.id)}>
              <td>
                <input 
                  type="checkbox" 
                  id={row.id} 
                  checked={!!selectedRows[row.id]} 
                  readOnly 
                />
              </td>
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
  
export default SelectableInformationTable;
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
      return newSelectedRows;
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
    const selectedKeys = Object.keys(selectedRows).filter(key => selectedRows[key]);
    setSelectedRow(selectedKeys);
    setAllSelected(Object.keys(selectedRows).length === data.length && Object.values(selectedRows).every(Boolean));
  }, [selectedRows, data.length, setSelectedRow]);

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
  
export default SelectableInformationTable;
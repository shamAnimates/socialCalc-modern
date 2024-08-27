import React, { useState } from 'react';
import './Spreadsheet.css';

function Spreadsheet({ onLogout }) {
  // default spreadsheet
  const [data, setData] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const handleCellChange = (rowIndex, cellIndex, value) => {
    const newData = [...data];
    newData[rowIndex][cellIndex] = value;
    setData(newData);
  };

  // add row
  const addRow = () => {
    const newRow = Array(data[0].length).fill('');
    setData([...data, newRow]);
  };

  // add column
  const addColumn = () => {
    const newData = data.map((row) => [...row, '']);
    setData(newData);
  };

  return (
    <div className="spreadsheet">
      
      <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) =>
                      handleCellChange(rowIndex, cellIndex, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Add Row</button>
      <button onClick={addColumn}>Add Column</button>
      <button onClick={onLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default Spreadsheet;

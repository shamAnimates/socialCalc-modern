import React, { useState } from 'react';
import './Spreadsheet.css';

function Spreadsheet({ onLogout, onBack }) {
  const [data, setData] = useState([
    ['Title 1', 'Title 2', 'Title 3'],
    ['', '', ''],
    ['', '', ''],
  ]);

  const [history, setHistory] = useState([data]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  const handleCellChange = (rowIndex, cellIndex, value) => {
    const newData = [...data];
    newData[rowIndex][cellIndex] = value;
    setData(newData);
    updateHistory(newData);
  };

  const updateHistory = (newData) => {
    const updatedHistory = history.slice(0, currentHistoryIndex + 1);
    setHistory([...updatedHistory, newData]);
    setCurrentHistoryIndex(updatedHistory.length);
  };

  const undo = () => {
    if (currentHistoryIndex > 0) {
      const prevData = history[currentHistoryIndex - 1];
      setData(prevData);
      setCurrentHistoryIndex(currentHistoryIndex - 1);
    }
  };

  const redo = () => {
    if (currentHistoryIndex < history.length - 1) {
      const nextData = history[currentHistoryIndex + 1];
      setData(nextData);
      setCurrentHistoryIndex(currentHistoryIndex + 1);
    }
  };

  const addRow = () => {
    const newRow = Array(data[0].length).fill('');
    const newData = [...data, newRow];
    setData(newData);
    updateHistory(newData);
  };

  const addColumn = () => {
    const newData = data.map((row) => [...row, '']);
    setData(newData);
    updateHistory(newData);
  };

  return (
    <div className="spreadsheet">
      <button onClick={onLogout} className="logout-button">Logout</button>
      <button onClick={onBack} className="back-button">Back to Dashboard</button>
      <div className="controls">
        <div className='bg1'>
          <button className='control-button' onClick={undo} disabled={currentHistoryIndex === 0}>Undo</button>
          <button className='control-button' onClick={redo} disabled={currentHistoryIndex === history.length - 1}>Redo</button>
        </div>
        <div className='bg2'>
          <button className='control-button' onClick={addRow}>Add Row</button>
          <button className='control-button' onClick={addColumn}>Add Column</button>
        </div>
      </div>
      <div className='table-name'> <input type='text' placeholder='Enter table name'></input></div>
      <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex === 0 ? 'header-row' : ''}>
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
    </div>
  );
}

export default Spreadsheet;

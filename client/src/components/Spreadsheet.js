import React, { useState } from 'react';
import './Spreadsheet.css';

function Spreadsheet({ onLogout }) {
  const [data, setData] = useState([
    ['', '', ''],
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
      <div className="controls">
        <button className='control-button' onClick={undo} disabled={currentHistoryIndex === 0}>Undo</button>
        <button className='control-button' onClick={redo} disabled={currentHistoryIndex === history.length - 1}>Redo</button>
        <button className='control-button' onClick={addRow}>Add Row</button>
        <button className='control-button' onClick={addColumn}>Add Column</button>
      </div>
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
    </div>
  );
}

export default Spreadsheet;
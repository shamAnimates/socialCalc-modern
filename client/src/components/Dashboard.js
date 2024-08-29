import React from 'react';
import './Dashboard.css';

function Dashboard({ spreadsheets, handleOpenSpreadsheet, handleAddSpreadsheet, onLogout }) {
  return (
    <div className='dashboard'>
      <h3>Select a Spreadsheet</h3>
      <ul>
        {spreadsheets.map((sheet) => (
          <li key={sheet.id}>
            <button onClick={() => handleOpenSpreadsheet(sheet.id)}>
              {sheet.name}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddSpreadsheet} className='add-button'>Add New Spreadsheet</button>
      <button onClick={onLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default Dashboard;

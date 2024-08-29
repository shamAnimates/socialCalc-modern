import React, { useState } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Spreadsheet from './components/Spreadsheet';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard'; // Import the new Dashboard component
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [spreadsheets, setSpreadsheets] = useState([]); 
  const [activeSpreadsheetId, setActiveSpreadsheetId] = useState(null);

  const handleLogin = (username, password) => {
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveSpreadsheetId(null);
  };

  const handleOpenSpreadsheet = (id) => {
    setActiveSpreadsheetId(id);
  };

  const handleAddSpreadsheet = () => {
    const newId = `sheet${spreadsheets.length + 1}`;
    const newSpreadsheet = { id: newId, name: `Spreadsheet ${spreadsheets.length + 1}` };
    setSpreadsheets([...spreadsheets, newSpreadsheet]);
  };

  return (
    <div className="App">
      <Header />
      {isLoggedIn ? (
        <>
          {activeSpreadsheetId ? (
            <Spreadsheet onLogout={handleLogout} onBack={() => setActiveSpreadsheetId(null)} />
          ) : (
            <Dashboard
              spreadsheets={spreadsheets}
              handleOpenSpreadsheet={handleOpenSpreadsheet}
              handleAddSpreadsheet={handleAddSpreadsheet}
              onLogout={handleLogout}
            />
          )}
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      <Footer />
    </div>
  );
}

export default App;

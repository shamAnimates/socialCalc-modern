import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Spreadsheet from './components/Spreadsheet';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [spreadsheets, setSpreadsheets] = useState([]); 
  const [activeSpreadsheetId, setActiveSpreadsheetId] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchSpreadsheets();
    }
  }, [isLoggedIn]);

  const fetchSpreadsheets = async () => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await fetch('/api/spreadsheets', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setSpreadsheets(data);
            if (data.length === 1) {
                setActiveSpreadsheetId(data[0]._id); // Automatically open the first spreadsheet if only one exists
            }
        } else {
            alert('Failed to load spreadsheets');
        }
    } catch (error) {
        console.error('Error fetching spreadsheets:', error);
    }
  };

  const handleLogin = (data) => {
    localStorage.setItem('authToken', data.token);
    setIsLoggedIn(true);
  };

  const handleRegister = (username, password) => {
    alert(`Registered`);
    setIsRegistering(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setActiveSpreadsheetId(null);
    setSpreadsheets([]);
  };

  const handleOpenSpreadsheet = (id) => {
    setActiveSpreadsheetId(id);
  };

  const handleAddSpreadsheet = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('/api/spreadsheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: `Spreadsheet ${spreadsheets.length + 1}` }),
      });

      if (response.ok) {
        const newSpreadsheet = await response.json();
        setSpreadsheets([...spreadsheets, newSpreadsheet]);
        if (spreadsheets.length === 0) {
          setActiveSpreadsheetId(newSpreadsheet._id);
        }
      } else {
        alert('Failed to create a new spreadsheet');
      }
    } catch (error) {
      console.error('Error adding spreadsheet:', error);
    }
  };

  return (
    <div className="App">
      <Header />
      {isLoggedIn ? (
        <>
          {activeSpreadsheetId ? (
            <Spreadsheet spreadsheetId={activeSpreadsheetId} onLogout={handleLogout} onBack={() => setActiveSpreadsheetId(null)} />
          ) : (
            <Dashboard
              spreadsheets={spreadsheets}
              handleOpenSpreadsheet={handleOpenSpreadsheet}
              handleAddSpreadsheet={handleAddSpreadsheet}
              onLogout={handleLogout}
            />
          )}
        </>
      ) : isRegistering ? (
        <Register onRegister={handleRegister} />
      ) : (
        <Login onLogin={handleLogin} onShowRegister={() => setIsRegistering(true)} />
      )}
      <Footer />
    </div>
  );
}

export default App;

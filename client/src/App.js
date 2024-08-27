import React, { useState } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Spreadsheet from './components/Spreadsheet';
import Footer from './components/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    //login creds
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // logout
  };

  return (
    <div className="App">
      <Header />
      {isLoggedIn ? (
        <Spreadsheet onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
      <Footer />
    </div>
  );
}

export default App;

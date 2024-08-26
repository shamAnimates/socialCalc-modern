import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Spreadsheet from './components/Spreadsheet';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Header />
      <Login />
      <Spreadsheet />
      <Footer />
    </div>
  );
}

export default App;

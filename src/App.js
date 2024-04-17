//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes,  Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Landmap from './components/Landmap';
import Welcome from './components/Welcome';
import Lands from './components/Lands';
import AddLand from './components/AddLand';
import Navbar from './components/Navbar';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      < Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route exact path='/' element={<Welcome />}/>
        <Route exact path="/map/:id" element={<Landmap />}/>
        <Route exact path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route exact path='/signup' element={<SignUp />}/>
        <Route exact path='/lands' element={<Lands />}/>
        <Route exact path='/addland' element={<AddLand />}/>
      </Routes>
    </Router>
  );
}

export default App;

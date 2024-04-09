//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes,  Route } from 'react-router-dom';
import './App.css';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Landmap from './components/Landmap';
import Welcome from './components/Welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' Component={Welcome}/>
        <Route exact path='/landmap' Component={Landmap}/>
        <Route exact path='/login' Component={Login}/>
        <Route exact path='/signup' Component={SignUp}/>
      </Routes>
    </Router>
  );
}

export default App;

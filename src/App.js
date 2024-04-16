//import logo from './logo.svg';
import React from 'react';
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
  return (
    <Router>
      < Navbar />
      <Routes>
        <Route exact path='/' Component={Welcome}/>
        <Route exact path='/map/:id' Component={Landmap}/>
        <Route exact path='/login' Component={Login}/>
        <Route exact path='/signup' Component={SignUp}/>
        <Route exact path='/lands' Component={Lands}/>
        <Route exact path='/addland' Component={AddLand}/>
      </Routes>
    </Router>
  );
}

export default App;

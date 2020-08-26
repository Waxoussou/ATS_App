import React, { useState, useEffect, useReducer, useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar'
import Jobs from "./components/Projects/Jobs"
import Candidates from "./components/Candidates/Candidates"
import Settings from "./components/Settings"
import HomePage from './components/Homepage/HomePage.jsx';
import Loader from "./components/Loader"


import AuthState from './context/auth/AuthState';

import './App.css';

function App() {

  return (
    <AuthState>
      <HomePage />
      <div className="App">
        <Router>
          <Navbar Link={Link}  ></Navbar>
          <main>
            <Route path="/jobs" component={Jobs} />
            <Route path="/candidates" component={Candidates} />
            <Route path="/settings" component={Settings} />
          </main>
        </Router>
      </div>
    </AuthState>
  );
}

export default App;

import React, { useState, useEffect, useReducer, useContext } from 'react';
import AppWrapper from './AppWrapper';
import AuthState from './context/auth/AuthState';
import './App.css';

function App() {
  return (
    <AuthState>
      <AppWrapper />
    </AuthState>
  );
}

export default App;

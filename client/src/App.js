import React, { useState, useEffect, useReducer, useContext } from 'react';
import AppWrapper from './AppWrapper';
import AuthState from './context/auth/AuthState';
import ProjectState from './context/project/ProjectState';
import './App.css';

function App() {
  return (
    <AuthState>
      <ProjectState>
        <AppWrapper />
      </ProjectState>
    </AuthState>
  );
}

export default App;

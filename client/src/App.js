import React from 'react';
import AppWrapper from './AppWrapper';
import AuthState from './context/auth/AuthState';
import ProjectState from './context/project/ProjectState';
import CandidateState from "./context/candidate/candidateState";

import './App.css';

function App() {
  return (
    <AuthState>
      <ProjectState>
        <CandidateState>
          <AppWrapper />
        </CandidateState>
      </ProjectState>
    </AuthState>
  );
}

export default App;

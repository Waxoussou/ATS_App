import React from 'react';

import AuthState from './context/auth/AuthState';
import ProjectState from './context/project/ProjectState';
import CandidateState from "./context/candidate/candidateState";

import WrapperContainer from './components/layout/WrapperContainer';
import './App.css';

function App() {
  return (
    <AuthState>
      <ProjectState>
        <CandidateState>
          <WrapperContainer />
        </CandidateState>
      </ProjectState>
    </AuthState>
  )
}

export default App;

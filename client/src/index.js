import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import AuthState from './context/auth/AuthState';
import ProjectState from './context/project/ProjectState';
import CandidateState from "./context/candidate/candidateState";

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <ProjectState>
        <CandidateState>
          <App />
        </CandidateState>
      </ProjectState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route,     Switch, Redirect } from 'react-router-dom';

import HomePage from './components/Homepage/HomePage';
import Navbar from './components/Navbar';
import Jobs from "./components/Projects/Jobs";
import Candidates from "./components/Candidates/Candidates";
import AddCandidate from './components/Candidates/AddCandidate';
import Settings from "./components/Settings";
import AddProject from './components/Projects/AddProject';
import Dashboard from './components/Dashboard/Dashboard';
import AuthContext from './context/auth/authContext';
import JobPage from './components/Projects/JobPage';
import CandidateProfile from './components/Candidates/CandidateProfile';

import './App.css';

function WrapperContainer() {
    const authState = useContext(AuthContext);
    const { isLoggedIn, loadUser, token } = authState;

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (!isLoggedIn || !token ? <HomePage />
        :
        <div className='App'>
            <Router>
                <Navbar ></Navbar>
                <main>
                    <Switch>
                        <Route path="/jobs" component={Jobs} />
                        <Route path="/candidate/:id" component={CandidateProfile} />
                        <Route path="/candidates" component={Candidates} />
                        <Route path="/settings" component={Settings} />
                        <Route path="/addProject" component={AddProject} />
                        <Route path="/project/:id" component={JobPage} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/addCandidate" component={AddCandidate} />
                        <Redirect path='/' to='/dashboard' />
                    </Switch>
                </main>
            </Router>
        </div>
    )
}

export default WrapperContainer;

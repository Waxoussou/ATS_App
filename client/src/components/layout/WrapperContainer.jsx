import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import HomePage from '../Homepage/HomePage';
import Navbar from './Navbar';
import Jobs from "../Projects/Jobs";
import Candidates from "../Candidates/Candidates";
import AddCandidate from '../Candidates/AddCandidate';
import Settings from "../Settings";
import AddProject from '../Projects/AddProject';
import Dashboard from '../Dashboard/Dashboard';
import AuthContext from '../../context/auth/authContext';
import JobPage from '../Projects/JobPage';
import CandidateProfile from '../Candidates/CandidateProfile';

function WrapperContainer() {
    const authState = useContext(AuthContext);
    const { isLoggedIn, loadUser, token } = authState;

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (!isLoggedIn || !token ?
        <HomePage /> :
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

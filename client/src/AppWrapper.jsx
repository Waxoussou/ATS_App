import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

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


const AppWrapper = () => {
    const authState = useContext(AuthContext);
    const { isLoggedIn, loadUser, token } = authState;

    useEffect(() => {
        loadUser()
    }, [])

    return (!isLoggedIn || !token ? <HomePage />
        :
        <div className='App'>
            <Router>
                <Navbar Link={Link} ></Navbar>
                <main>
                    <Switch>
                        <Route path="/jobs" render={() => <Jobs Link={Link} />} />
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
export default AppWrapper;



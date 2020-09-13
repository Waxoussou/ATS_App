import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import HomePage from './components/Homepage/HomePage';
import Navbar from './components/Navbar';
import Jobs from "./components/Projects/Jobs";
import Candidates from "./components/Candidates/Candidates";
import Settings from "./components/Settings";
import AddProject from './components/Projects/AddProject';

import AuthContext from './context/auth/authContext';

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
                    <Route path="/jobs" render={() => <Jobs Link={Link} />} />
                    <Route path="/candidates" component={Candidates} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/addProject" component={AddProject} />
                </main>
            </Router>
        </div>
    )
}
export default AppWrapper;



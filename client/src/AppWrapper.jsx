import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import HomePage from './components/Homepage/HomePage';
import Navbar from './components/Navbar';
import Jobs from "./components/Projects/Jobs";
import Candidates from "./components/Candidates/Candidates";
import Settings from "./components/Settings";

import AuthContext from './context/auth/authContext';

const AppWrapper = () => {
    const authState = useContext(AuthContext);
    const { isLoggedIn, loadUser } = authState;

    useEffect(() => {
        loadUser()
    }, [])

    return (!isLoggedIn ? <HomePage />
        :
        <div className='App'>
            <Router>
                <Navbar Link={Link} ></Navbar>
                <main>
                    <Route path="/jobs" component={Jobs} />
                    <Route path="/candidates" component={Candidates} />
                    <Route path="/settings" component={Settings} />
                </main>
            </Router>
        </div>
    )
}
export default AppWrapper;



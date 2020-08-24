import React, { useState, useReducer } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Navbar from './components/Navbar'
import Jobs from "./components/Projects/Jobs"
import Candidates from "./components/Candidates/Candidates"
import Settings from "./components/Settings"
import HomePage from './components/Homepage/HomePage.jsx';
import Loader from "./components/Loader"
import { useEffect } from 'react';

import authReducer from './reducer/authReducer';
import AUTH_ACTIONS from './actions/authAction';


function App() {
  const [isFetching, setIsFetching] = useState(false)
  const [state, dispatch] = useReducer(authReducer, {});

  useEffect(() => {
    setIsFetching(true);
    const ls = localStorage.getItem('authorization Bearer');
    if (ls) {
      dispatch({ type: AUTH_ACTIONS.LOGIN, payload: { token: ls } })
    }
    setTimeout(() => {
      setIsFetching(false)
    }, 1000);
  }, [])


  const login = ({ username, _id }, token) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN, payload: { username, token } })
  }

  const logout = async () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT })
  }

  return (
    <>
      {isFetching ? <Loader /> :
        <>{!state.isLoggedIn ? <HomePage login={login} />
          : <>{
            state.isLoggedIn && state.token &&
            <div className="App">
              <Router>
                <Navbar Link={Link} logout={logout} ></Navbar>
                <main>
                  <Route path="/jobs" component={() => <Jobs token={state.token} />} />
                  <Route path="/candidates" component={Candidates} />
                  <Route path="/settings" component={Settings} />
                </main>
              </Router>
            </div>}
          </>
        }</>
      }
    </>
  );
}

export default App;

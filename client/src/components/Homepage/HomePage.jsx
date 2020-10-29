import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import Loader from '../layout/Loader';
import "./homepage.css";
import Login from '../Auth/Login';
import Register from '../Auth/Register';

const Notification = ({ msg }) => {
    const style = { borderRadius: 4, minWidth: 200, color: 'white', textAlign: 'center' }
    return <div style={style}> <p>{msg}</p> </div>
}

const HomePage = () => {

    const authContext = useContext(AuthContext);
    const { isFetching } = authContext;

    return (isFetching ?
        <Loader /> :
        < div className="home-page" >
            <Login />
            <Register />
        </div >)
}

export default HomePage;
import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import Loader from '../layout/Loader';

import "./homepage.css";

const Notification = ({ msg }) => {
    const style = { borderRadius: 4, minWidth: 200, color: 'white', textAlign: 'center' }
    return <div style={style}> <p>{msg}</p> </div>
}

const HomePage = () => {

    const authContext = useContext(AuthContext);

    const { isFetching, login, register, error } = authContext;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
        login(username, password)
    }

    const [registerFormState, setRegisterFormState] = useState({
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    })
    const handleRegisterFormState = async (e) => {
        setRegisterFormState({ ...registerFormState, [e.target.name]: e.target.value });
    }
    const handleRegistration = async (e) => {
        e.preventDefault()
        register(registerFormState);
    }

    return (isFetching ? <Loader /> : < div className="home-page" >
        <div className="login-container">
            <form onSubmit={handleLogin} method="post">
                {error.message && error.type === 'LOGIN' && <Notification msg={error.message} />}
                <input onChange={e => setUsername(e.target.value)} placeholder="username" type="text" name="username" id="username" />
                <input onChange={e => setPassword(e.target.value)} placeholder="password" type="password" name="password" id="password" />
                <input type="submit" value="Login" />
            </form>
        </div>
        <div className="register-container">
            <form onSubmit={handleRegistration}>
                <h3>DONT HAVE AN ACCOUNT YET ?</h3>
                {error.message && error.type === 'REGISTER' && <Notification msg={error.message} />}
                <input onChange={handleRegisterFormState} type="text" placeholder='name' name='name' id='name' />
                <input onChange={handleRegisterFormState} type="text" placeholder='lastname' name='lastname' id='lastname' />
                <input onChange={handleRegisterFormState} type="text" placeholder='username' name='username' id='username' />
                <input onChange={handleRegisterFormState} type="text" placeholder='email' name='email' id='email' />
                <input onChange={handleRegisterFormState} type="password" placeholder='password' name='password' id='password' />
                <input onChange={handleRegisterFormState} type="submit" value='REGISTER' />
            </form>
        </div>
    </div >)
}

export default HomePage;
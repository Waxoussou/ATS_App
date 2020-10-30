import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const Login = () => {
    const { login, error } = useContext(AuthContext);

    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const handleChange = ({ target: { value, name: key } }) => {
        setState({ ...state, [key]: value })
    }
    const handleSubmit = e => {
        e.preventDefault();
        const { username, password } = state;
        login(username, password)
    }

    return <div className='login-container'>
        <form onSubmit={handleSubmit} aria-label='form'>
            {error && <p>{error.message}</p>}
            <label htmlFor="username">Username
                <input onChange={handleChange} type="text" name="username" id="username"
                    placeholder='username' value={state.username} />
            </label>
            <label htmlFor="password">Password
                <input onChange={handleChange} type="password" name="password" id="password"
                    placeholder='password' value={state.password} />
            </label>
            <input type="submit" value="sign in" />
        </form>
    </div>
}

export default Login;
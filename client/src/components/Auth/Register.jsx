import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';


function Register() {
    const authContext = useContext(AuthContext);
    const { register, error } = authContext;

    const [registerFormState, setRegisterFormState] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    })
    const handleChange = async (e) => {
        setRegisterFormState({ ...registerFormState, [e.target.name]: e.target.value });
    }
    const handleRegistration = async (e) => {
        e.preventDefault()
        register(registerFormState);
    }

    return <div className="register-container">
        <form onSubmit={handleRegistration} aria-label='form'>
            <h3>DONT HAVE AN ACCOUNT YET ?</h3>
            {error.message && error.type === 'REGISTER' && <Notification msg={error.message} />}
            <input onChange={handleChange} type="text" placeholder='firstname' name='firstname' id='firstname' />
            <input onChange={handleChange} type="text" placeholder='lastname' name='lastname' id='lastname' />
            <input onChange={handleChange} type="text" placeholder='username' name='username' id='username' />
            <input onChange={handleChange} type="text" placeholder='email' name='email' id='email' />
            <input onChange={handleChange} type="password" aria-label='password' placeholder='password' name='password' id='password' />
            <input onChange={handleChange} type="submit" value='REGISTER' />
        </form>
    </div>
}

export default Register;
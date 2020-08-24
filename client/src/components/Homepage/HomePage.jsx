import React from 'react';
import "./homepage.css";
import { useState } from 'react';


const Notification = ({ msg }) => {
    const style = { borderRadius: 4, minWidth: 200, color: 'white', textAlign: 'center' }
    return <div style={style}> <p>{msg}</p> </div>
}

const HomePage = ({ login }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('')

    const showNotification = (msg) => {
        setErrorMsg(msg)
        setTimeout(() => {
            setErrorMsg("")
        }, 2300);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) { showNotification("username or password missing") }
        else {
            const body = { username, password };
            try {
                const res = await fetch('api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                }).catch(err => console.log('fetch err: ', err));

                const json = await res.json();
                if (json.status === 'failed' || !json.data) {
                    showNotification(json.msg);
                    throw new Error('no user found');
                };
                login(json.data, json.token)
            }
            catch (error) {
                console.warn(error);
            }
        }
    }

    return <div className="home-page">
        <div className="login-container">
            <form onSubmit={handleFormSubmit} method="post">
                {errorMsg && <Notification msg={errorMsg} />}
                <input onChange={e => setUsername(e.target.value)} placeholder="username" type="text" name="username" id="username" />
                <input onChange={e => setPassword(e.target.value)} placeholder="password" type="password" name="password" id="password" />
                <input type="submit" value="Login" />
            </form>
        </div>
        <div className="register-container">
            <form action="">
                <h3>DONT HAVE AN ACCOUNT YET ?</h3>
                <input type="text" disabled />
                <input type="text" disabled />
                <input type="text" disabled />
                <input type="text" disabled />
                <input type="submit" value="Register" disabled />
            </form>
        </div>
    </div>
}

export default HomePage;
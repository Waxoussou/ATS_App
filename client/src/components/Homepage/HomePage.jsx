import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import "./homepage.css";


const Notification = ({ msg }) => {
    const style = { borderRadius: 4, minWidth: 200, color: 'white', textAlign: 'center' }
    return <div style={style}> <p>{msg}</p> </div>
}

const HomePage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('')

    const authContext = useContext(AuthContext)

    const { isLoggedIn, login } = authContext;


    const showNotification = (msg) => {
        setErrorMsg(msg)
        setTimeout(() => {
            setErrorMsg("")
        }, 2300);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        (!username || !password) ?
            showNotification("username or password missing") :
            login(username, password)
    }


    return (!isLoggedIn ? < div className="home-page" >
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
    </div > : '')
}

export default HomePage;
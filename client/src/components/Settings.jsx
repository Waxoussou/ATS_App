import React from 'react';
import { useState, useContext } from 'react';
import AuthContext from '../context/auth/authContext';

const Settings = () => {
    const authContext = useContext(AuthContext);
    const { deleteProfile, error } = authContext;

    const [passwordInput, setPwdInput] = useState('')
    const [passwordConfirm, setPwdConfirm] = useState(false)
    const remove_btn_style = {
        width: 100,
        height: 40,
        background: 'crimson'
    }
    const deleteUser = async (e) => {
        e.preventDefault();
        deleteProfile(passwordInput);
    }

    return <div>
        <h1>Settings</h1>
        <ul>
            <li>manage your informations</li>
            <li> change password</li>
        </ul>
        <button style={remove_btn_style} type="submit" onClick={setPwdConfirm}>DELETE MY PROFILE</button>
        {passwordConfirm && <>
            <form onSubmit={deleteUser} method="post">
                <input type="text" name="password" id="password" placeholder='confirm password' onChange={e => setPwdInput(e.target.value)} />
                <input type="submit" value="Confirm Password to delete profile" />
            </form>
        </>}
        {error.message && <p>{error.message}</p>}
    </div>
}

export default Settings 
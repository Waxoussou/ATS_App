import React, { createContext, useReducer } from 'react';
import AuthReducer from './authReducer';
import AUTH_ACTIONS from '../actions/authAction';

const initialState = {
    isFetching: false,
    isLoggedIn: false,
    username: '',
    token: ''
}

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Actions
    async function login(username, password) {
        const body = { username, password };
        try {
            const res = await fetch('api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).catch(err => console.log('fetch err: ', err));

            const json = await res.json();
            if (json.status === 'failed' || !json.data) {
                // showNotification(json.msg);
                throw new Error('no user found');
            };
            dispatch({
                type: 'LOGIN',
                payload: { username: json.data.username, token: json.token }
            });
        }
        catch (error) {
            console.warn(error);
        }
    }

    async function register() {
        dispatch({ type: AUTH_ACTIONS.REGISTER })
    }

    async function logout() {
        dispatch({ type: AUTH_ACTIONS.LOGOUT })
    }

    return (<UserContext.Provider value={{
        user: state,
        register,
        login,
        logout
    }}>
        {children}
    </UserContext.Provider>);
}






import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import AUTH_ACTIONS from '../../actions/authAction';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('authorization Bearer'),
        isLoggedIn: false,
        isFetching: true,
        username: null,
        error: { message: null, type: null }
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        const { token } = state;
        if (token) {
            try {
                const res = await fetch('api/auth/', { headers: { Authorization: token } });
                const json = await res.json()
                if (json.success === 'failed') throw new Error(json.msg)
                dispatch({ type: AUTH_ACTIONS.LOAD_USER, payload: { username: json.username, token: token } })
            } catch (error) {
                console.log(error)
                dispatch({ type: AUTH_ACTIONS.ERROR, payload: { error: null } })
            }
        } else {
            dispatch({ type: AUTH_ACTIONS.ERROR, payload: { error: null } })
        }
    }

    const login = async (username, password) => {
        const type = AUTH_ACTIONS.LOGIN
        if (!username || !password) {
            const error_message = 'username and password are required'
            dispatch({ type: AUTH_ACTIONS.ERROR, payload: { error: { message: error_message, type } } });
            clearError()
        } else {
            const body = { username, password };
            const options = {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }
            try {
                const res = await fetch('api/auth/login', options)
                    .catch(err => console.log('fetch err: ', err));
                const json = await res.json();
                console.log(json)
                if (json.status === 'failed' || !json.data) throw new Error(json.msg);
                dispatch({ type: AUTH_ACTIONS.LOGIN, payload: { username: json.data.username, token: json.token } });
            }
            catch (error) {
                console.warn(error.message);
                const error_payload = { error: { message: error.message, type } }
                dispatch({ type: AUTH_ACTIONS.ERROR, payload: error_payload })
                clearError()
            }
        }
    }

    const clearError = (timeout = 900) => {
        setTimeout(() => {
            dispatch({ type: AUTH_ACTIONS.ERROR, payload: { error: null } })
        }, timeout);
    };

    // Logout
    const logout = () => {
        dispatch({ type: AUTH_ACTIONS.LOGOUT })
    };

    // Register
    const register = async ({ username, name, lastname, email, password }) => {
        const body = { username, lastname, name, email, password };
        const type = AUTH_ACTIONS.REGISTER

        for (let input in body) {
            if (!body[input]) {
                dispatch({
                    type: AUTH_ACTIONS.ERROR,
                    payload: { error: { message: 'all fields are required', type } }
                });
                clearError()
                return;
            }
        }

        dispatch({ type: AUTH_ACTIONS.REGISTER });
        try {
            const res = await fetch('api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).catch(err => console.log('RegisterFetch Err: ', err))
            const json = await res.json();
            if (json.status === 'FAILED') throw new Error(json.msg)
            login(username, password);
        } catch (error) {
            const error_payload = { error: { message: error.message, type } }
            dispatch({ type: AUTH_ACTIONS.ERROR, payload: error_payload })
            clearError()
        }
    }

    // Delete User
    const deleteProfile = async (password) => {
        const type = 'DELETE';
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: state.token },
            body: JSON.stringify({ password })
        }
        try {
            const res = await fetch('api/auth/deleteProfile', options);
            const json = await res.json();
            if (json.status === 'FAILED') throw new Error(json.msg);
            if (json.ok) {
                dispatch({ type: AUTH_ACTIONS.LOGOUT });
                dispatch({
                    type: AUTH_ACTIONS.ERROR,
                    payload: { error: { message: 'your profile was deleted successfully', type: 'LOGIN' } }
                })
                clearError(4000)
            }
        } catch (error) {
            const error_payload = { message: error.message, type };
            dispatch({ type: AUTH_ACTIONS.ERROR, payload: { error: error_payload } })
            clearError()
        }
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isFetching: state.isFetching,
                isLoggedIn: state.isLoggedIn,
                username: state.username,
                error: state.error,
                loadUser,
                register,
                login,
                logout,
                deleteProfile
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
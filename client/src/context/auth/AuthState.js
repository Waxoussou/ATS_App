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
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        const { token } = state;
        console.log('token: ', token)
        if (token) {
            try {
                // let headers = { 'Content-Type': 'application/json' };
                // headers['authorization Bearer'] = token;
                const res = await fetch('api/auth/', { headers: { Authorization: token } });
                const json = await res.json()
                console.log('loadUser return :', json)
                dispatch({ type: AUTH_ACTIONS.LOAD_USER, payload: { username: json.username, token: token } })
            } catch (error) {
                console.log(error)
            }
        }
    }

    const login = async (username, password) => {
        const body = { username, password };
        try {
            const res = await fetch('api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
                .catch(err => console.log('fetch err: ', err));

            const json = await res.json();
            if (json.status === 'failed' || !json.data) {
                // showNotification(json.msg);
                throw new Error('no user found');
            };
            dispatch({
                type: AUTH_ACTIONS.LOGIN,
                payload: { username: json.data.username, token: json.token }
            });
        }
        catch (error) {
            console.warn(error);
        }
    }

    // Logout
    const logout = async () => {
        dispatch({ type: AUTH_ACTIONS.LOGOUT })
    };

    // Register
    const register = async () => {
        dispatch({ type: AUTH_ACTIONS.REGISTER })
    }
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isFetching: state.isFetching,
                isLoggedIn: state.isLoggedIn,
                username: state.username,
                loadUser,
                register,
                login,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
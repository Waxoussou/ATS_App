import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import AUTH_ACTIONS from '../../actions/authAction';


import * as API from '../../API/auth';

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
        const user = await API.fetchLoggedInUser(token);
        user.status === 'ERROR' ?
            dispatch({ type: AUTH_ACTIONS.ERROR, payload: { error: null } }) :
            dispatch({ type: AUTH_ACTIONS.LOAD_USER, payload: { username: user.username, token: token } })
    }

    const login = async (username, password) => {
        if (!username || !password) {
            const error_message = 'username and password are required'
            return setErrorMessage({ error: { message: error_message, type: 'FORM_FIELD' } });
        } else {
            const body = { username, password }
            const payload = await API.fetchLogin(body);
            payload.error ?
                setErrorMessage(payload) :
                dispatch({ type: AUTH_ACTIONS.LOGIN, payload: payload });
        }
    }

    // Logout
    const logout = () => {
        dispatch({ type: AUTH_ACTIONS.LOGOUT })
    };

    // Register
    const register = async (body) => {
        // const body = { username, lastname, firstname, email, password };
        for (let input in body) {
            if (!body[input]) {
                setErrorMessage({ error: { message: 'all fields are required', type: AUTH_ACTIONS.REGISTER } });
                return;
            }
        }
        dispatch({ type: AUTH_ACTIONS.REGISTER });

        const userSaved = await API.fetchRegister(body)
        userSaved.status === "SUCCESS" ?
            login(body.username, body.password) :
            setErrorMessage(userSaved)
    }

    // Delete User
    const deleteProfile = async (password) => {
        const deletedUser = await API.fetchDeleteUser(password, state.token);
        if (deletedUser.status === "FAILED") {
            setErrorMessage(deletedUser)
        } else {
            dispatch({ type: AUTH_ACTIONS.LOGOUT });
            setErrorMessage({ error: { message: 'your profile was deleted successfully', type: 'DELETE' } });
        }
    }

    const setErrorMessage = (error) => {
        dispatch({ type: AUTH_ACTIONS.ERROR, payload: error });
        clearError();
    }

    const clearError = (timeout = 1000) => {
        setTimeout(() => {
            dispatch({ type: AUTH_ACTIONS.ERROR, payload: { error: null } })
        }, timeout);
    };

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
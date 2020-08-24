import React from 'react';

function authReducer(state, action) {
    switch (action.type) {
        case 'REGISTER':
        // return { ...state, ...action.payload };
        case 'LOGIN':
            localStorage.setItem("authorization Bearer", action.payload.token)
            return {
                ...state,
                isLoggedIn: true,
                username: action.payload.username,
                token: action.payload.token
            };
        case 'LOGOUT':
            localStorage.removeItem("authorization Bearer")
            return {
                isLoggedIn: false,
                username: "",
                token: ''
            };
        default:
            return state;
    }
}

export default authReducer;
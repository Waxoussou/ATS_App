import { createContext, useReducer } from 'react';
import authReducer from './reducer/authReducer';

export const user = {
    isLoggedIn: false,
    username: '',
    token: ''
}

function userProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {});
    return <UserContext.Provider value={state}>
        <UserDispatch.Provider value={dispatch}>
            {children}
        </UserDispatch.Provider>
    </UserContext.Provider>
}

const UserContext = createContext(user)
const UserDispatch = createContext()
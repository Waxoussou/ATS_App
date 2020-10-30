import AUTH_ACTIONS from '../../actions/authAction';

export default (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.REGISTER:
            return { ...state, isFetching: true };

        case AUTH_ACTIONS.LOAD_USER:
            return {
                ...state,
                isLoggedIn: true,
                isFetching: false,
                username: action.payload.username,
                token: action.payload.token,
                // error: null
            };

        case AUTH_ACTIONS.LOGIN:
            localStorage.setItem("authorization Bearer", action.payload.token)
            return {
                ...state,
                isFetching: false,
                isLoggedIn: true,
                username: action.payload.username,
                token: action.payload.token
            };

        case AUTH_ACTIONS.LOGOUT:
            localStorage.removeItem("authorization Bearer")
            return {
                ...state,
                isLoggedIn: false,
                username: null,
                token: null
            };

        case AUTH_ACTIONS.ERROR:
            return {
                ...state,
                isFetching: false,
                error: { ...action.payload.error }
            }
        default:
            return state;
    }
}

import AUTH_ACTIONS from '../../actions/authAction';

export default (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.REGISTER:
            return { ...state, ...action.payload };
            break;
        case AUTH_ACTIONS.LOAD_USER:
            return {
                ...state, isLoggedIn: true, isFetching: false,
                username: action.payload.username,
                token: action.payload.token
            };
            break;
        case AUTH_ACTIONS.LOGIN:
            console.log('from AUTH ACTION LOGIN : :', action.payload)
            localStorage.setItem("authorization Bearer", action.payload.token)
            return {
                ...state,
                isFetching: false,
                isLoggedIn: true,
                username: action.payload.username,
                token: action.payload.token
            };
            break;
        case AUTH_ACTIONS.LOGOUT:
            localStorage.removeItem("authorization Bearer")
            return {
                ...state,
                isLoggedIn: false,
                username: null,
                token: null
            };
            break;
        default:
            return state;
    }
}

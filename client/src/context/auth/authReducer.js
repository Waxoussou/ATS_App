
export default (state, action) => {
    switch (action.type) {
        case 'REGISTER':
            return { ...state, ...action.payload };
            break;
        case 'LOGIN':
            localStorage.setItem("authorization Bearer", action.payload.token)
            return {
                ...state,
                isFetching: false,
                isLoggedIn: true,
                username: action.payload.username,
                token: action.payload.token
            };
            break;
        case 'LOGOUT':
            localStorage.removeItem("authorization Bearer")
            return {
                ...state,
                isLoggedIn: false,
                username: "",
                token: ''
            };
            break;
        default:
            return state;
    }
}

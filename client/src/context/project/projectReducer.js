import PROJECT_ACTIONS from "../../actions/projectAction";

export default (state, action) => {
    switch (action.type) {
        case PROJECT_ACTIONS.ADD_PROJECT:
            return {
                ...state,
                isLoading: true
            }
        case PROJECT_ACTIONS.LOAD_PROJECTS:
            return {
                ...state,
                projects: action.payload.projects,
                isLoading: false,
            }
        default:
            return state
    }
}
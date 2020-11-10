import PROJECT_ACTIONS from "../../actions/projectAction";

export default (state, action) => {
    switch (action.type) {
        case PROJECT_ACTIONS.ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                isLoading: true
            }
        case PROJECT_ACTIONS.LOAD_PROJECTS:
            return {
                ...state,
                projects: action.payload.projects,
                isLoading: false,
            }
        case PROJECT_ACTIONS.DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id === action.payload.id),
                isLoading: false,
            }
        default:
            return state
    }
}
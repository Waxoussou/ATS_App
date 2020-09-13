import PROJECT_ACTIONS from "../../actions/projectAction";

export default (state, action) => {
    switch (action.type) {
        case PROJECT_ACTIONS.ADD_PROJECT:
            return {
                ...state,
                title: action.payload.title,
                company: action.payload.company,
                localisation: action.payload.localisation,
                isLoading: true
            }
            break;
        case PROJECT_ACTIONS.LOAD_PROJECTS:
            return {
                ...state,
                projects: action.payload.projects,
                isLoading: false,
            }
        default:
            return state
            break;
    }
}
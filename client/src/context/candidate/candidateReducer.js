import CANDIDATE_ACTIONS from "../../actions/candidateAction";

export default (state, action) => {
    switch (action.type) {
        case CANDIDATE_ACTIONS.CREATE_CANDIDATE:
            return {
                ...state,
            }
        default:
            return state
    }
}
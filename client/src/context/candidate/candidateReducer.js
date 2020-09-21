import CANDIDATE_ACTIONS from "../../actions/candidateAction";

export default (state, action) => {
    switch (action.type) {
        case CANDIDATE_ACTIONS.CREATE_CANDIDATE:
            return {
                ...state,
            }
        case CANDIDATE_ACTIONS.LOAD_CANDIDATES:
            return {
                ...state,
                candidates: action.payload.candidates
            }
        // case CANDIDATE_ACTIONS.DELETE_CANDIDATE:
        //     const newList = state.candidates.filter(candidate => candidate._id !== action.payload.id)
        //     console.log(newList)
        //     return {
        //         ...state,
        //         candidates: newList
        //     }
        default:
            return state
    }
}
import React, { useReducer, useContext } from 'react';
import CandidateContext from './candidateContext';
import candidateReducer from './candidateReducer';
import CANDIDATE_ACTIONS from '../../actions/candidateAction';

import AuthContext from '../auth/authContext';

import controller from '../../API/candidate';

const CandidateState = props => {
    const initialState = {
        current: {
            name: '',
            lastname: '',
            email: '',
            phone: '',
            position: '',
            job_title: '',
            expected_position: '',
        },
        candidates: []
    }

    const [state, dispatch] = useReducer(candidateReducer, initialState);

    const authContext = useContext(AuthContext);
    const { token } = authContext;

    const loadCandidates = async _ => {
        const payload = await controller.loadCandidates(token);
        dispatch({ type: CANDIDATE_ACTIONS.LOAD_CANDIDATES, payload })
    }

    const createCandidate = async (candidate) => {
        // const { name, lastname, job_title, current_position, expected_position, current_company } = candidate;
        console.log('BEFORE CREATING CANDIDATE FROMS STATE REDUCER', candidate)
        const new_user = await controller.createCandidate(candidate, token);
        new_user.status === "SUCCESS" &&
            dispatch({ type: CANDIDATE_ACTIONS.CREATE_CANDIDATE })
    }

    const deleteCandidate = async (id) => {
        const del_user = await controller.deleteCandidate(id, token)
        del_user.status === "SUCCESS" && loadCandidates();
    }

    return (
        <CandidateContext.Provider value={{
            candidates: state.candidates,
            createCandidate,
            loadCandidates,
            deleteCandidate
        }}>
            {props.children}
        </CandidateContext.Provider >
    );
}

export default CandidateState;
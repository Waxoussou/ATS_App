import React, { useReducer, useContext } from 'react';
import CandidateContext from './candidateContext';
import candidateReducer from './candidateReducer';
import CANDIDATE_ACTIONS from '../../actions/candidateAction';

import AuthContext from '../auth/authContext';

const CandidateState = props => {
    const initialState = {
        name: '',
        lastname: '',
        email: '',
        phone: '',
        position: '',
        job_title: '',
        expected_position: '',
    }

    const [state, dispatch] = useReducer(candidateReducer, initialState);

    const authContext = useContext(AuthContext);
    const { token } = authContext;

    const createCandidate = async (candidate) => {
        const { name, lastname, job_title, position, expected_position } = candidate;
        try {
            const body = { name, lastname, job_title, position, expected_position };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                    body: JSON.stringify(body)
                }
            }
            const res = await fetch('/api/candidates', options)
            const json = await res.json();
            console.log('new candidate : ', json);
            dispatch({ type: CANDIDATE_ACTIONS.CREATE_CANDIDATE })
        } catch (error) { console.log(error) }
    }

    return (
        <CandidateContext.Provider value={{
            candidate: state.candidate,
            createCandidate
        }}>
            {props.children}
        </CandidateContext.Provider >
    );
}

export default CandidateState;
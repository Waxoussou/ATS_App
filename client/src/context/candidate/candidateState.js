import React, { useReducer, useContext } from 'react';
import CandidateContext from './candidateContext';
import candidateReducer from './candidateReducer';
import CANDIDATE_ACTIONS from '../../actions/candidateAction';

import AuthContext from '../auth/authContext';

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
        try {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                }
            }
            const res = await fetch('/api/candidates', options);
            const json = await res.json();
            console.log('CANDIDATES : ', json)
            dispatch({ type: CANDIDATE_ACTIONS.LOAD_CANDIDATES, payload: { candidates: json } })
        } catch (error) {
            console.log(error);
        }
    }

    const createCandidate = async (candidate) => {
        const { name, lastname, job_title, current_position, expected_position, current_company } = candidate;
        console.log('BEFORE CREATING CANDIDATE FROMS STATE REDUCER', candidate)
        try {
            const body = { name, lastname, job_title, current_position, expected_position, current_company };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(body)
            }
            const res = await fetch('/api/candidates', options)
            const json = await res.json();
            console.log('new candidate : ', json);
            dispatch({ type: CANDIDATE_ACTIONS.CREATE_CANDIDATE })
        } catch (error) { console.log(error) }
    }
    
    const deleteCandidate = async (id) => {
        console.log(id)
        const options = { method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: token } }
        try {
            const res = await fetch(`/api/candidates/${id}`, options)
            const json = await res.json()
            loadCandidates();
        } catch (e) {
            console.log(e)
        }
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
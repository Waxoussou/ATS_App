import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CandidateContext from '../../context/candidate/candidateContext';

const AddCandidate = () => {

    const candidateContext = useContext(CandidateContext);
    const { createCandidate } = candidateContext;
    const [state, setState] = useState({
        name: '', lastname: '', job_title: '', current_position: '',
        expected_position: '', current_company: ''
    })

    const history = useHistory();

    const handleChange = e => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        createCandidate(state);
        history.goBack();
    }

    return <div>
        <form onSubmit={handleSubmit} className='candidate__addForm'>
        <h3>CREATE A NEW CANDIDATE</h3>
            <label htmlFor="name">name<input onChange={handleChange} type="text" name="name" id="name" /></label>
            <label htmlFor="lastname">lastname<input onChange={handleChange} type="text" name="lastname" id="lastname" /></label>
            <label htmlFor="job-title">job title<input onChange={handleChange} type="text" name="job_title" id="job-title" /></label>
            <label htmlFor="current_position">current position<input onChange={handleChange} type="text" name="current_position" id="current_position" /></label>
            <label htmlFor="expected_position">desired position<input onChange={handleChange} type="text" name="expected_position" id="expected_position" /></label>
            <label htmlFor="current_company">current company<input onChange={handleChange} type="text" name="current_company" id="current_company" /></label>
            <input type="submit" value="Create" disabled={!state.name || !state.lastname && true} />
        </form>
    </div >
}

export default AddCandidate;
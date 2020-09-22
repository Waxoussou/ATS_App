import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Filters from '../Filters'
import Usercard from './Usercard';
import Jobseeker from './Jobseeker';

import CandidateContext from '../../context/candidate/candidateContext';

import './candidates.css';

const Candidates = () => {
    const candidateContext = useContext(CandidateContext);
    const { loadCandidates, candidates, deleteCandidate } = candidateContext;

    useEffect(() => {
        loadCandidates();
    }, [])

    // const [users, setUsers] = useState([]);
    const [selectedCandidate, setSelection] = useState({ uid: '' });
    // const [filter, setFilter] = useState('')
    const selectUser = (id) => {
        const current_candidate = candidates.filter(candi => candi._id === id);
        setSelection({ ...current_candidate[0] })
    }
    const unselectCandidate = () => {
        setSelection({})
    }
    // const changeFilters = (filtre) => setFilter(filtre)
    return <div>
        <div className='candidates__filters'>
            {/* <Filters changeFilters={changeFilters}></Filters> */}
        </div>
        {selectedCandidate._id ? <Jobseeker unselectCandidate={unselectCandidate} current={selectedCandidate} /> :
            <div>
                
                <Link to='addCandidate' ><button>ADD NEW CANDIDATE</button></Link>
                <h1 className="section-title">CANDIDATS</h1>
                {
                    candidates.length > 0 ?
                        candidates.map((candidate, i) => <Usercard key={candidate._id + i}
                            candidate={candidate}
                            deleteCandidate={deleteCandidate} selectUser={selectUser} />) :
                        null
                }</div>
        }
    </div >
}

export default Candidates;

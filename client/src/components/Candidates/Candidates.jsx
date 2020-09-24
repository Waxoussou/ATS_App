import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Filters from '../Filters';
import SearchBar from '../layout/SearchBar';
import Usercard from './Usercard';
import Jobseeker from './Jobseeker';

import CandidateContext from '../../context/candidate/candidateContext';

import './candidates.css';

const Candidates = () => {
    const candidateContext = useContext(CandidateContext);
    const { loadCandidates, candidates, deleteCandidate } = candidateContext;
    const [filter, setFilter] = useState('')

    useEffect(() => {
        loadCandidates();
    }, [])

    useEffect(() => {
        console.log(filter);
        const filter_candidates = candidates.filter(({ name, lastname }) => name.toLowerCase().startsWith(filter.toLowerCase()));
        console.log(filter_candidates);
    }, [filter])

    // const [users, setUsers] = useState([]);
    const [selectedCandidate, setSelection] = useState({ uid: '' });

    const selectUser = (id) => {
        const current_candidate = candidates.filter(candi => candi._id === id);
        setSelection({ ...current_candidate[0] })
    }

    const unselectCandidate = () => {
        setSelection({})
    }

    const handleSearch = ({ target: { value: filtre } }) => setFilter(filtre)

    return <div>
        {selectedCandidate._id ? <Jobseeker unselectCandidate={unselectCandidate} current={selectedCandidate} /> :
            <div>
                <div className='candidates__filters'>
                    <SearchBar handleSearch={handleSearch} />
                    {/* <Filters changeFilters={changeFilters}></Filters> */}
                    <Link to='addCandidate' ><button>ADD NEW CANDIDATE</button></Link>
                </div>
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

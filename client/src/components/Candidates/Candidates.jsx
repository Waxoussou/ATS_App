import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../layout/SearchBar';
import Usercard from './Usercard';
import Jobseeker from './Jobseeker';

import CandidateContext from '../../context/candidate/candidateContext';

import './candidates.css';
import ProjectPicker from '../layout/ProjectPicker';

const Candidates = () => {
    const candidateContext = useContext(CandidateContext);
    const { loadCandidates, candidates, deleteCandidate } = candidateContext;
    const [filter, setFilter] = useState('');
    const [filter_list, setFilter_list] = useState([]);

    const [stateModal, setStateModal] = useState({
        isOpen: false,
        candidate_id: ''
    })
    const [selectedCandidate, setSelection] = useState({});

    useEffect(() => {
        loadCandidates()
    }, [loadCandidates]);

    useEffect(() => {
        const filter_candidates = candidates.filter(({ firstname, lastname }) => firstname.toLowerCase().startsWith(filter.toLowerCase()) || lastname.toLowerCase().startsWith(filter.toLowerCase()));
        setFilter_list(filter_candidates);
    }, [filter, setFilter_list, candidates])

    const handleSearch = ({ target: { value: filtre } }) => setFilter(filtre);
    const handleModal = (id) => setStateModal({ isOpen: !stateModal.isOpen, candidate_id: id });
    const selectUser = (id) => {
        const current_candidate = candidates.filter(candi => candi._id === id);
        setSelection({ ...current_candidate[0] })
    }
    const unselectCandidate = () => setSelection({})

    const target_list = filter && filter_list ? filter_list : candidates

    return <div>
        {selectedCandidate._id ?
            <Jobseeker unselectCandidate={unselectCandidate} current={selectedCandidate} /> :
            <div className='candidate__section'>
                <div className='candidates__filters'>
                    <SearchBar handleSearch={handleSearch} />
                    <Link to='addCandidate' ><button>ADD NEW CANDIDATE</button></Link>
                </div>
                <h1 className="section-title">CANDIDATS</h1>
                {target_list?.length > 0 ?
                    target_list.map((candidate, i) => <Usercard key={candidate._id + i}
                        candidate={candidate}
                        deleteCandidate={deleteCandidate}
                        selectUser={selectUser}
                        handleModal={handleModal} />) :
                    <p>no candidate matching your criteria</p>
                }
                {stateModal.isOpen && <ProjectPicker handleModal={handleModal}
                    candidate_id={stateModal.candidate_id} />}
            </div>
        }
    </div >
}

export default Candidates;

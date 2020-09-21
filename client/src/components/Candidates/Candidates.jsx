import React, { useEffect, useContext } from 'react';
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
    // const [selectedCandidate, setSelection] = useState({ uid: '' });
    // const [filter, setFilter] = useState('')
    // const selectUser = () => {
    //     setSelection({ uid: 1 })
    // }
    // const unselectCandidate = () => {
    //     setSelection({ uid: null })
    // }
    // const changeFilters = (filtre) => setFilter(filtre)
    return <div>
        <div className='candidates__filters'>
            {/* <Filters changeFilters={changeFilters}></Filters> */}
            <Link to='addCandidate' ><button>ADD NEW CANDIDATE</button></Link>
        </div>
        <h1 className="section-title">CANDIDATS</h1>
        {/* {selectedCandidate.uid ? <Jobseeker unselectCandidate={unselectCandidate} /> : */}
        <div>
            {
                candidates.length > 0 ?
                    candidates.map((candidate, i) => <Usercard key={candidate._id + i}
                        candidate={candidate}
                        deleteCandidate={deleteCandidate} />) :
                    null
                // selectUser={selectUser}
            }</div>
        {/* } */}
    </div >
}

export default Candidates;

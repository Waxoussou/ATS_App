import React, { useState } from "react";
import Jobseeker from './Jobseeker';

const Usercard = ({ user, selectUser }) => {
    const [candidates, setCandidates] = useState([]);
    const handleAddCandidate = (e) => {
        console.log(candidates)
        setCandidates([...candidates, 'new'])
    }
    return <div className="user-card">
        < h3 className="name">  {user.name}</h3>
        <p className="phone">phone : {user.phone}</p>
        <p className="email">email : {user.email}</p>
        <p className="company-item" >
            <span className="company-position">{user.company.bs} </span>
            @<span className="company-name">{user.company.name}</span>
        </p>
        <div className='buttons'>
            <button onClick={handleAddCandidate} value={user.id}>add + </button>
            <button onClick={selectUser} >details </button>

        </div>
    </div>
}

export default Usercard;
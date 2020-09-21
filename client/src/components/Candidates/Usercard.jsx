import React, { useState } from "react";

const ActionsModal = ({ id, deleteCandidate }) => {

    const handleClick = () => deleteCandidate(id)

    return <div className='actions-modal'>
        <ul>
            <li ><button>Add to project</button></li>
            <li ><button onClick={handleClick}>Delete</button></li>
        </ul>
    </div>
}

const Usercard = ({ candidate, selectUser, deleteCandidate }) => {

    const [isOpen, setOpen] = useState(false)
    const showActions = _ => setOpen(!isOpen)

    return <div className={`user-card  ${isOpen ? ' slide-on' : ''}`}>
        <div className='informations-section'>
            < h3 className="name">  {candidate.name} <span>{candidate.lastname}</span></h3>
            <p className="company-item" >
                <span>{candidate.job_title}</span>
                <span className="company-position">{candidate.current_position} </span>
            @<span className="company-name">{candidate.current_company}</span>
            </p>
            <div className='buttons'>
                <button onClick={showActions}>actions </button>
                <button onClick={selectUser} >details </button>

            </div>
        </div>
        <div className='options-section'>
            <ActionsModal id={candidate._id} deleteCandidate={deleteCandidate} />
        </div>
    </div>
}

export default Usercard;


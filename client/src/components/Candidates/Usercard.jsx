import React, { useState } from "react";

const ActionsSection = ({ id, deleteCandidate, selectUser, handleModal }) => {

    return <div className='actions-modal'>
        <ul className='actions-list'>
            <li data-action='link' onClick={() => handleModal(id)} ><i className="fas fa-folder-plus"></i></li>
            <li data-action='edit' onClick={() => selectUser(id)}><i className="fas fa-info-circle"></i></li>
            <li data-action='delete' onClick={() => deleteCandidate(id)}><i className="fas fa-trash-alt"></i></li>
        </ul>
    </div>
}

const Usercard = ({ candidate, selectUser, deleteCandidate, handleModal }) => {

    const [isOpen, setOpen] = useState(false)
    const showActions = _ => setOpen(!isOpen)

    return <div className={`user-card  ${isOpen ? ' slide-on' : ''}`}>
        <div className='informations-section'>
            < h3 className="name">  {candidate.name} <span>{candidate.lastname}</span></h3>
            <p className="company-item" >
                <span>{candidate.job_title}</span>
                <span className="company-position"> {candidate.current_position} </span>
            @<span className="company-name">{candidate.current_company}</span>
            </p>
            <div className='options__button'>
                <i onClick={showActions} className={isOpen ? "fas fa-window-close" : "fas fa-angle-left"}></i>

            </div>
        </div>
        <div className='options-section'>
            <ActionsSection id={candidate._id} deleteCandidate={deleteCandidate}
                selectUser={selectUser} handleModal={handleModal} />
        </div>
    </div>
}

export default Usercard;


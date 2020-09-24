import React, { useState } from "react";

const ActionsSection = ({ id, deleteCandidate, selectUser }) => {

    const handleClick = (e) => {
        const { action } = e.target.parentElement.dataset;
        switch (action) {
            case 'delete':
                deleteCandidate(id)
                break;
            case 'edit':
                selectUser(id)
            case 'link':
                console.log(action)
                handleLink(id)
            default:
                break;
        }
    }

    const handleLink = async (id) => {
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1heG91IiwiX2lkIjoiNWY0MDNlZjJjZmZlZmExNDc3NGRhMTlkIiwiaWF0IjoxNjAwNzk1MzI2LCJleHAiOjE2MDA3OTg5MjZ9.Jj9F8InvRwpX9W0Fiy5uxglvr30JFK3fCsQME46o9Fw";

        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: token },
            }
            const res = await fetch('/api/projects/' + id + '/addApplication/1242432', options)
            const json = await res.json();
            console.log(json)
        } catch (e) { console.log(e) }
        // fetch('/api/projects/addApplication/1234232'), {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: token
        //     },
        //     body: JSON.stringify(id)
        // }
        //     .then(res => console.log(res.json()))
    }

    return <div className='actions-modal'>
        <ul>
            <li data-action='link' onClick={handleClick} ><i className="fas fa-folder-plus"></i></li>
            <li data-action='edit' onClick={handleClick}><i className="fas fa-info-circle"></i></li>
            <li data-action='delete' onClick={handleClick}><i className="fas fa-trash-alt"></i></li>
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
                <span className="company-position"> {candidate.current_position} </span>
            @<span className="company-name">{candidate.current_company}</span>
            </p>
            <div className='options__button'>
                <i onClick={showActions} className={isOpen ? "fas fa-window-close" : "fas fa-angle-left"}></i>

            </div>
        </div>
        <div className='options-section'>
            <ActionsSection id={candidate._id} deleteCandidate={deleteCandidate} selectUser={selectUser} />
        </div>
    </div>
}

export default Usercard;


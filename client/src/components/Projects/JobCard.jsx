import React from 'react';

const JobCard = ({ job }) => {
    return <div className={'jobcard'}>
        <div className="jobcard-header">

            <div className="job-title">TITRE DU POSTE</div>
            <div className="job-status">In progress</div>
        </div>
        <div className="job-informations">

        </div>
    </div>
}

export default JobCard;
import React from 'react';

const CandidateProfile = ({ candidate }) => {
    return <div className='candidate-profile-container'>
        <h2 className='candidate-name'>{candidate?.name || 'Regis'} <span>{candidate?.lastname || 'No Name'}</span>
        </h2>
        <h3 className='job-title'>{candidate?.job_title}</h3>
    </div>
}

export default CandidateProfile;

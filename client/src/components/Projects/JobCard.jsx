import React from 'react';
import Jobs from './Jobs';
import './job.css'
const JobCard = ({ job }) => {
    return <div className={'jobcard'}>
        <div className="jobcard-header">
            <div className="job-title">{job.title}</div>
            <div className="job-status">status: <span>{job.status}</span></div>
        </div>
        <div className="job-informations">
            <p>{job.applications.length > 0 ?
                `${job.applications.length} candidates` :
                'no candidates attached to this project yet, start looking for skills to hire'}
            </p>


        </div>
    </div>
}

export default JobCard;
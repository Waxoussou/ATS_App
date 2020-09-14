import React from 'react';
import { Link } from 'react-router-dom';
import Jobs from './Jobs';
import './job.css'
const JobCard = ({ job }) => {

    return <div className={'jobcard'}>
        <div className="jobcard-header">
            <div className="job-title">{job.title}</div>
            <div className="job-location">{job.location}</div>
            <div className="job-status">status: <span>{job.status}</span></div>
        </div>
        <div className="job-informations">
            <p>{job.applications.length > 0 ?
                `${job.applications.length} candidates` :
                'no candidates attached to this project yet, start looking for skills to hire'}
            </p>
        </div>
        <div className="link">
            <Link to={`/project/${job._id}`}>
                <p>more informations :</p>
            </Link>
        </div>
    </div>
}

export default JobCard;
import React from 'react';
import JobCard from './JobCard';

const JobList = ({ jobs }) => {
    return <div className='job-container'>
        {jobs.map(job => <JobCard job={job} />)}
        {jobs.map(job => <JobCard job={job} />)}
        {jobs.map(job => <JobCard job={job} />)}
        {jobs.map(job => <JobCard job={job} />)}
    </div>
}

export default JobList;
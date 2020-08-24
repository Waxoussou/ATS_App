import React from "./node_modules/react";
import JobList from "./JobList";
import AddBtn from '../AddBtn';

const Jobs = ({ token }) => {
    return <div>
        <div className="job-section-header">
            <h3>JOBS - Dashboard</h3>
            <AddBtn token={token} />
        </div>
        <JobList jobs={[{ name: 'job1', position: "dev" },
        { name: 'job2', position: "Sys" },
        { name: 'job3', position: "Devops" }]} />

    </div>
}

export default Jobs;
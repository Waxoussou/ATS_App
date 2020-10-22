import React from "react";
import JobList from "./JobList";
import { Link } from 'react-router-dom';

const Jobs = () => {

    return <div>
        <div className="job-section-header">
            <h3>JOBS - Dashboard</h3>
            <div>
                <Link to='/addProject'>
                    <button >Add a new project</button>
                </Link>
            </div>
            {/* <AddBtn /> */}
        </div>
        <JobList />


    </div>
}

export default Jobs;
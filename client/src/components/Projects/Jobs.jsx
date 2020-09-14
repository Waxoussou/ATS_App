import React from "react";
import JobList from "./JobList";
import AddBtn from '../AddBtn';
import JobPage from './JobPage';
import { Link } from 'react-router-dom';

const Jobs = () => {

    return <div>
        <div className="job-section-header">
            <h3>JOBS - Dashboard</h3>
            <div>
                <button >Add a new project
                <Link to='/addProject'></Link>
                </button>
            </div>
            {/* <AddBtn /> */}
        </div>
        <JobList />


    </div>
}

export default Jobs;
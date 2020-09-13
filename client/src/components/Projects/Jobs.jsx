import React from "react";
import JobList from "./JobList";
import AddBtn from '../AddBtn';
import JobPage from './JobPage';
import { BrowserRouter, Route, Link, Switch, useHistory } from 'react-router-dom';
import ProjectState from '../../context/project/ProjectState';

const Jobs = () => {
    const history = useHistory();
 
    return <div>
        <ProjectState>
            <div className="job-section-header">
                <h3>JOBS - Dashboard</h3>
                <div>
                    <Link to='/addProject'>
                        <button >Link</button>
                    </Link>
                </div>
                <AddBtn />
            </div>
            <JobList />

        </ProjectState>

    </div>
}

export default Jobs;
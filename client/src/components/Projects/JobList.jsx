import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import ProjectContext from '../../context/project/projectContext';
import JobCard from './JobCard';

const JobList = ({ match }) => {
    const authContext = useContext(AuthContext);
    const projectContext = useContext(ProjectContext);
    const { _id, token } = authContext;
    const { loadProject, projects, isLoading } = projectContext;

    useEffect(() => {
        loadProject()
    }, [])

    return <div className='job-container'>
        {projects.length > 0 ? projects.map((job, index) => <JobCard key={index} job={job} />) :
            <>
                <h3>NO PROJECTS STARTED YET</h3>
                <Link to='/addProject'>
                    <button>create your first project</button>
                </Link>
            </>}
    </div>
}

export default JobList;
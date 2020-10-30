import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import ProjectContext from '../../context/project/projectContext';
import JobCard from './JobCard';

const JobList = () => {
    const projectContext = useContext(ProjectContext);
    const { loadProject, projects } = projectContext;

    useEffect(() => {
        loadProject()
        // eslint-disable-next-line
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
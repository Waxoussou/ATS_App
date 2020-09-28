import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import ProjectContext from '../../context/project/projectContext';

const ProjectPicker = ({ handleModal, candidate_id }) => {
    const { token } = useContext(AuthContext);
    const { loadProject, projects } = useContext(ProjectContext);

    useEffect(() => { loadProject() }, [])

    const handleClick = async (e) => {
        const { p_id: project_id } = e.target.dataset
        // console.log({ project_id, candidate_id })
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: token },
            }
            const res = await fetch('/api/projects/' + project_id + '/addApplication/' + candidate_id, options)
            const json = await res.json();
            if (json) handleModal();
        } catch (e) { console.log(e) }
    }

    return <div className='project-picker'>
        <div className="project-picker__header">
            <p>Choose a project to link to</p>
            <button onClick={handleModal}>x</button>
        </div>
        <ul className='project-picker__body'>
            {projects.map(({ _id: project_id, title }) => {
                return <li onClick={handleClick} key={project_id}
                    className='project-picker__item'
                    data-p_id={project_id}>{title}</li>
            })}
        </ul>
    </div>

}

export default ProjectPicker;

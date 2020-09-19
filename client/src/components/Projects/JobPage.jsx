import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ProjectContext from '../../context/project/projectContext';

const JobPage = () => {
    const projectContext = useContext(ProjectContext);
    const { projects, deleteProject } = projectContext;
    const { id } = useParams();
    const history = useHistory();

    const current = projects.filter(project => project._id === id)[0];
    const stack = current.required_skills.tech;

    const handleDelete = _ => {
        deleteProject(current._id);
        history.goBack()
    }

    return <div>
        <h3>JOB PAGE ACCUEIL</h3>
        <div className='project-informations'>
            <p>{current.title}</p>
            <p>{current.localisation.city}</p>
            <div className="salary-information">
                <p>{current.salary.from} <span> - </span>{current.salary.to} <span>{current.salary.currency} </span> per {current.salary.per}</p>
            </div>
        </div>
        <div className="skills-list">
            <h4>Skills</h4>
            {current.required_skills.tech.map(stack => <p key={stack._id}>{stack.name}</p>)}
        </div>

        <button onClick={handleDelete}>delete</button>
    </div>
}

export default JobPage;
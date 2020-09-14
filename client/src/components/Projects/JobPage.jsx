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
        <p>{current.title}</p>
        <p>{current.location}</p>
        {current.required_skills.tech.map(stack => <p key={stack.id}>{stack.name}</p>)}

        <button onClick={handleDelete}>delete</button>
    </div>
}

export default JobPage;
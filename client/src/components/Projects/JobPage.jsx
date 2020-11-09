import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ProjectContext from '../../context/project/projectContext';

const JobPage = () => {
    const projectContext = useContext(ProjectContext);
    const { projects, deleteProject, loadProject } = projectContext;
    const { id } = useParams();
    const history = useHistory();

    // if page is reloaded, projects are not loaded from that component, so current proj can't be found
    // so we need to load them again in order to get current project data 
    useEffect(() => {
        if (!projects.length) loadProject()
    }, [])

    const current = projects.filter(project => project._id === id)[0];

    const handleDelete = _ => {
        deleteProject(current._id);
        history.goBack()
    }

    return <div>
        <h3>JOB PAGE ACCUEIL</h3>
        <div className='project-informations'>
            <p className='project-job-title'> {current?.title}</p>
            <p className='project-localisation'>{current?.localisation?.city}</p>
            <div className="salary-information">
                <p>{current?.salary?.from} <span> - </span>{current?.salary?.to} <span>{current?.salary?.currency} </span> per {current?.salary?.per}</p>
            </div>
        </div>
        <div className="skills-list">
            <h4 className="skills-list-header">Skills</h4>
            <div className="skills-list-items">
                {current?.required_skills?.tech.map(stack => <div key={stack?._id}>
                    <p className='skill-item' >{stack?.name}
                        <li className={`fab fa-${stack?.name}`}></li>
                    </p>
                </div>)}
            </div>
        </div>
        <div className="project-dashboard-section">
            <div className='project-dashboard-section-header'>
                <h3>votre tableau de bord</h3>
            </div>
            <div className="project-dashboard-item applications-number">
                <h4>{current?.applications?.length}</h4>
                <p>candidatures dans le projet</p>
            </div>
            <div className="project-dashboard-item interviews-number">
                <h4>{current?.applications?.length}</h4>
                <p>interviews réalisées</p>
            </div>
            <div className="project-dashboard-item meeting-number">
                <h4>{current?.applications?.length}</h4>
                <p>process recrutement terminés </p>
            </div>
        </div>
        <div className="applications">
            {/* TEMPORARY */}
            {current?.applications?.map(appli => <div key={appli?._id}>{appli?.candidate_id?.firstname} {appli?.candidate_id?.lastname}</div>)}
        </div>
        <button onClick={handleDelete}>delete</button>
    </div>
}

export default JobPage;
import React, { useState, useContext, Fragment } from 'react';
import FetchInput from './FetchInput.jsx'
import AuthContext from '../context/auth/authContext';
// to find name of cities in France 
// https://geo.api.gouv.fr/communes?nom=<nom ville>
import ProjectContext from '../context/project/projectContext';

const Modal = ({ handleClick }) => {

    const [projectState, setProjectState] = useState({})
    const projectContext = useContext(ProjectContext);
    const { addProject } = projectContext;

    const handleProjectSubmit = (e) => {
        e.preventDefault();
        const { title, company, localisation } = projectState
        addProject(title, company, localisation);
        handleClick()
    }

    const handleLocalisation = (localisation) => {
        const [city, cp] = localisation.split('-');
        setProjectState({ ...projectState, localisation: { city, cp } });
    }

    const handleProjectStateInput = e => setProjectState({ ...projectState, [e.target.name]: e.target.value });

    return <div className='add-project-modal'>
        <div className='project-modal-header'>
            <h1>Project Creation</h1>
            <button onClick={handleClick}>fermer</button>
        </div>
        <div className="project-modal-body">
            <ProjectForm
                handleProjectStateInput={handleProjectStateInput}
                handleLocalisation={handleLocalisation}
                handleProjectSubmit={handleProjectSubmit}
                handleClick={handleClick}
            />
        </div>

    </div>


}

const ProjectForm = ({ handleProjectStateInput, handleLocalisation, handleProjectSubmit, handleClick }) => {

    const [projectFormState, setProjectFormState] = useState({
        step: 1,
        title: null,
        localisation: {
            city: null,
            cp: null,
            country: null
        },
        company: null,
        salary: {
            from: null,
            to: null,
            per: 'year',
            currency: 'euro',
        },
        required_skills: {
            tech: [],
            tools: []
        }
    })

    const handleNext = e => {
        e.preventDefault();
        console.log(projectFormState)
        setProjectFormState({ ...projectFormState, step: projectFormState.step++ })
        console.log(projectFormState)
    }

    return <div>
        <form onSubmit={handleProjectSubmit} method="post">
            {projectFormState.step === 1 && <><div className='project-input'>
                <label htmlFor='company'>Entreprise</label>
                <input onChange={handleProjectStateInput} name="company" id="company" type="text" />
            </div>
                <div className='project-input'>
                    <label htmlFor="title">Titre de l'offre</label>
                    <input onChange={handleProjectStateInput} name="title" id="title" type="text" />
                </div>
                <div className='project-input'>
                    <label htmlFor="localisation">Localisation</label>
                    {/* <input onChange={handleProjectStateInput} name="" id="" type="text" /> */}
                    <FetchInput handleLocalisation={handleLocalisation}></FetchInput>
                </div>
                <button onClick={handleNext} >next</button>
            </>}
            {projectFormState.step === 2 && <Fragment>
                <div className='project-input'>
                    <label htmlFor="title">Skills</label>
                    <input onChange={handleProjectStateInput} name="title" id="title" type="text" />
                </div>
                <div className='project-input'>
                    <label htmlFor="title">Salary</label>
                    <input onChange={handleProjectStateInput} name="title" id="title" type="text" />
                </div>
                <button>back</button>
                <input type="submit" value="submit" />
            </Fragment>
            }
        </form>
    </div>
}

const AddBtn = ({ }) => {
    const [isOpen, setIsOpen] = useState(false);
    const authContext = useContext(AuthContext);
    const { token } = authContext;

    const handleClick = _ => {
        setIsOpen(!isOpen)
    };

    const addNewProject = async (title, company, localisation) => {
        const body = { title, company, localisation };
        const options = {
            method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: token },
            body: JSON.stringify(body)
        }
        try {
            const res = await fetch('/api/projects/new', options)
            const json = await res.json()
            console.log(json);
            setIsOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    return <div>
        <button onClick={handleClick} type="submit">
            Ajouter une mission
        </button>
        {isOpen && <Modal handleClick={handleClick} addNewProject={addNewProject} />}
    </div>
}
export default AddBtn;
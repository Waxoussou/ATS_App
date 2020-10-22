import React, { Fragment, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import ProjectContext from '../../context/project/projectContext';
import './projectForm.css';

const AddProject = () => {

    const projectContext = useContext(ProjectContext);
    const { addProject } = projectContext

    const history = useHistory();
    const [formState, setFormState] = useState({
        step: 1,
        title: '',
        company: '',
        localisation: '',
        salary: { from: null, to: null, per: 'year', currency: 'euro' },
        skills: []
    })
    const isDisabled = _ => {
        const step1 = formState.title && formState.company && formState.localisation ? true : false;
        const step2 = formState.salary.from && formState.salary.to && formState.skills ? true : false;

        if ((formState.step === 1 && step1) || (formState.step === 2 && step2)) {
            return false
        }
        return true
    }

    const handleBack = () => {
        formState.step === 1 ?
            history.goBack() :
            setFormState({ ...formState, step: formState.step - 1 })
    }

    const handleNext = (e) => {
        e.preventDefault();
        setFormState({ ...formState, step: formState.step + 1 })
        console.log('after setFormState:: ', formState)
        formState.step >= 3 && history.goBack();
    }

    const handleState = e => {
        const { name, value } = e.target
        setFormState({ ...formState, [name]: value })
    }

    const handleSalary = e => {
        const { name, value } = e.target
        setFormState({ ...formState, salary: { ...formState.salary, [name]: value } })
    }

    const handleSkills = skills => setFormState({ ...formState, skills });

    const handleSubmit = e => {
        e.preventDefault();
        const { title, company, localisation, salary, skills } = formState;
        addProject(title, company, localisation, salary, skills);
        history.goBack();
    }

    return <div>
        <div className="information-step">
            <p className='step current'>1</p>
            <div className={`step-link  ${formState.step >= 2 && 'enlighted'}`}><span></span></div>
            <p className={`step ${formState.step >= 2 && 'current'}`}>2</p>
            <div className={`step-link  ${formState.step >= 3 && 'enlighted'}`}><span></span></div>
            <p className={`step ${formState.step >= 3 && 'current'}`}>Review</p>
        </div>

        <form className='add-project-form' method="post">
            {formState.step === 1 && <ProjectDetails handleState={handleState}
                title={formState.title}
                company={formState.company}
                localisation={formState.localisation} />}
            {formState.step === 2 && <SkillsAndSalary handleSalary={handleSalary}
                handleSkills={handleSkills}
                skills={formState.skills} />}
            {formState.step === 3 && <CheckFormBeforePost state={formState} />}
        </form>
        <div className='form-controls'>
            <button onClick={handleBack}>Back</button>
            {formState.step < 3 ?
                <button onClick={handleNext} disabled={isDisabled()} >next</button> : <button onClick={handleSubmit} type='submit'>Create Project</button>}
        </div>
    </div>

}

const ProjectDetails = ({ handleState, title, company, localisation }) => {

    return <Fragment>
        <fieldset >
            <legend> Standard informations</legend>
            <label htmlFor="title">Titre du Poste</label>
            <input onChange={handleState} type="text" name="title" id="title" value={title} />
            <label htmlFor="company">Entreprise</label>
            <input onChange={handleState} type="text" name="company" id="company" value={company} />
            <label htmlFor="localisation">Localisation du Poste</label>
            <input onChange={handleState} type="text" name="localisation" id="localisation" value={localisation} />
        </fieldset>
    </Fragment>
}

const SkillsAndSalary = ({ handleSalary, handleSkills, skills }) => {
    const [name, setName] = useState('');
    const [xp, setXp] = useState('');
    const [error, setError] = useState('')
    const handleName = e => { setName(e.target.value) }
    const handleXp = e => { setXp(e.target.value) }

    const clearInputs = () => {
        setName('')
        setXp('')
    }

    const addSkill = e => {
        e.preventDefault();
        if (!name || !xp) {
            setError('name and xp are required')
            setTimeout(() => setError(''), 1000);
            return;
        }
        const newSkill = { name, xp };
        handleSkills([...skills, newSkill]);
        clearInputs();
    }

    const deleteSkill = (e) => {
        const skillName = e.target.parentElement.dataset.index
        const skillsMinusOne = skills.filter(skill => skill.name !== skillName);
        handleSkills(skillsMinusOne)
    }

    return <Fragment>
        <fieldset className='salary-input'>
            <legend>Salary</legend>
            <label htmlFor="from">min
            <input onChange={handleSalary}
                    type="number"
                    name="from"
                    id="from"
                />
            </label>
            <label htmlFor="to">max
            <input onChange={handleSalary} type="number" name="to" id="to" />
            </label>
        </fieldset>
        <fieldset>
            <legend>Skills</legend>
            <div className="skills-input">
                <label htmlFor="skill-name">skill
                <input type="text" placeholder='name' name="name" id="skill-name" value={name} onChange={handleName} />
                </label>
                <label htmlFor="skill-xp">xp
                <input type="number" placeholder='xp' name="xp" id="skill-xp" value={xp} onChange={handleXp} />
                </label>
                <button onClick={addSkill}>add</button>
            </div>
            {error ? <p>{error}</p> : null}
            <div className="skills-preview">
                {skills.map((skill, ind) => <div key={ind} className='selected-skill' data-index={skill.name}>
                    <p >{skill.name} - <span>{skill.xp}</span> years of xp</p>
                    <div className={'delete-skill'} onClick={deleteSkill}>x</div>
                </div >)}
            </div>
        </fieldset>

    </Fragment>
}

const CheckFormBeforePost = ({ state }) => {
    const { title, company, localisation, salary, skills } = state;
    return <Fragment>
        <p>CHECK YOUR RESULT BEFORE SENDING </p>
        <div>
            <p>TITLE : {title}</p>
            <p>company : {company}</p>
            <p>Where : {localisation}</p>
            <p>salary : {salary.from} - {salary.to}</p>
            <p>skills : {skills.map(skill => {
                return <div key={skill._id}>
                    <span>{skill.name} </span> - <span> {skill.xp} </span> years of xp
                </div>
            })}</p>
        </div>
    </Fragment>
}

export default AddProject;
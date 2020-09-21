import React, { useReducer, useContext } from 'react';
import ProjectContext from './projectContext';
import projectReducer from './projectReducer';
import PROJECT_ACTIONS from '../../actions/projectAction';
import AuthContext from '../auth/authContext';


const ProjectState = props => {
    const initialState = {
        projects: [],
        isLoading: true,
        error: { message: null, type: null }
    };

    const [state, dispatch] = useReducer(projectReducer, initialState)

    const authContext = useContext(AuthContext);
    const { token } = authContext;

    const loadProject = async () => {
        try {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
            const res = await fetch('/api/projects/', options);
            const user_projects = await res.json();
            dispatch({ type: PROJECT_ACTIONS.LOAD_PROJECTS, payload: { projects: user_projects } })
        } catch (error) {
            console.log('fetch data FN error : ', error)
        }
    }

    const addProject = async (title, company, localisation, salary, skills) => {

        const body = { title, company, localisation, salary, required_tech: skills };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: token },
            body: JSON.stringify(body)
        }

        try {
            const res = await fetch('/api/projects/new', options)
            const json = await res.json()
            dispatch({ type: PROJECT_ACTIONS.ADD_PROJECT })
            loadProject()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProject = async _id => {
        try {
            const options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', Authorization: token },
            }
            const res = await fetch('/api/projects/delete' + _id, options)
            const json = await res.json();
            loadProject();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ProjectContext.Provider
            value={{
                projects: state.projects,
                addProject,
                loadProject,
                deleteProject
            }}>
            {props.children}
        </ProjectContext.Provider>
    );
}

export default ProjectState;
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
        console.log('LOADING PROJECTS ...');
        try {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
            const res = await fetch('/api/projects/', options);
            const user_projects = await res.json();
            console.log(user_projects);
            dispatch({ type: PROJECT_ACTIONS.LOAD_PROJECTS, payload: { projects: user_projects, isLoading: false } })
        } catch (error) {
            console.log('fetch data FN error : ', error)
        }
    }

    const addProject = async (title, company, localisation) => {

        const body = { title, company, localisation };
        const options = {
            method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: token },
            body: JSON.stringify(body)
        }

        try {
            const res = await fetch('/api/projects/new', options)
            const json = await res.json()
            dispatch({ type: PROJECT_ACTIONS.ADD_PROJECT, payload: { title, company, localisation } })
            console.log('now load projects')
            loadProject()
            // console.log(json);
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <ProjectContext.Provider
            value={{
                projects: state.projects,
                addProject,
                loadProject
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    );
}

export default ProjectState;
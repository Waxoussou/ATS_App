import React, { useReducer, useContext } from 'react';
import ProjectContext from './projectContext';
import projectReducer from './projectReducer';
import PROJECT_ACTIONS from '../../actions/projectAction';
import AuthContext from '../auth/authContext';

import controllerFactory from '../../API/projects';

const ProjectState = props => {
    const initialState = {
        projects: [],
        isLoading: true,
        error: { message: null, type: null }
    };

    const [state, dispatch] = useReducer(projectReducer, initialState)

    const { token } = useContext(AuthContext);
    const controller = controllerFactory(token);

    const loadProject = async () => {
        const payload = await controller.loadAllProjects();
        dispatch({ type: PROJECT_ACTIONS.LOAD_PROJECTS, payload })
    }

    const addProject = async (title, company, localisation, salary, skills) => {
        const body = { title, company, localisation, salary, required_tech: skills };
        const payload = await controller.createNewProject(body);
        if (payload.status === "SUCCESS") dispatch({ type: PROJECT_ACTIONS.ADD_PROJECT, payload: payload.new_project })
        // loadProject();
    }

    const deleteProject = async _id => {
        const del_project = await controller.deleteProjectFromId(_id);
        del_project.status === "SUCCESS" && dispatch({ type: PROJECT_ACTIONS.DELETE_PROJECT, payload: { id: del_project.removed_project._id } })
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
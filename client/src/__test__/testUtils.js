import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import AuthContext from '../context/auth/authContext';
import CandidateContext from "../context/candidate/candidateContext";

export const renderWithContext = (ui, propsContext) => {
    const defaultPropsContext = {
        token: '',
        isFetching: false,
        isLoggedIn: false,
        username: {},
        error: { message: '', type: '' },
    }
    return render(
        <AuthContext.Provider
            value={{ ...defaultPropsContext, ...propsContext }}>
            <Router>
                {ui}
            </Router>
        </AuthContext.Provider >)
}


export const renderWithCandidateContext = (ui, options) => {
    const defaultPropsContext = {
        candidates: []
    }
    return render(
        <CandidateContext.Provider value={{
            ...defaultPropsContext, ...options
        }}>
            {ui}
        </CandidateContext.Provider >

    )
}
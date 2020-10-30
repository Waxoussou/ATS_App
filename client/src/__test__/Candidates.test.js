import React from 'react';
import { render, cleanup, screen, getByRole } from '@testing-library/react';

import { renderWithCandidateContext } from './testUtils';
import CandidateProfile from '../components/Candidates/CandidateProfile';

afterEach(cleanup);

describe('CANDIDATES', () => {
    const setup = (options) => {
        const utils = renderWithCandidateContext(<CandidateProfile candidate={options?.candidate} />, options?.propsContext);
        // const form = utils.getByRole('form');
        // const btn = utils.getByRole('button');
        // const inputsText = utils.getAllByRole('textbox');
        // const inputPassword = utils.getByLabelText('password');
        return {
            ...utils
        }
    }

    it('should render', () => {
        const { container } = setup();
        expect(container).toBeVisible()
    })

    describe("User Name ", () => {
        it('should have a title with user name', () => {
            const candidate = { name: 'test', lastname: 'lastName' }
            const { container } = setup({ candidate });
            expect(container.firstChild).toHaveClass('candidate-profile-container');
            const title = screen.queryByRole('heading', { level: 2 });
            expect(title).not.toBeNull()
            expect(title).toHaveClass('candidate-name');
            expect(title.textContent).not.toEqual('')
            expect(title.textContent).toMatch(/test/)
            expect(title.textContent).toBe(candidate.name + ' ' + candidate.lastname)
        })
    })

    describe("Job Title", () => {
        it('should have a h3 element with job title', () => {
            const candidate = { job_title: 'myJob' };
            const h3 = setup({ candidate }).getByRole('heading', { level: 3 });
            expect(h3.textContent).toBeTruthy();
            expect(h3).toHaveClass('job-title');
            expect(h3.textContent).toBe(candidate.job_title);
        })
    })


    describe("add to project btn", () => {
        
    })
})


const candidatesMock = [{
    name: 'name1',
    lastname: 'lastname1',
    email: 'email1@mail.com',
    phone: '0101010101',
    position: 'position1',
    job_title: 'jobTitle1',
    expected_position: 'expect1',
}, {
    name: 'name2',
    lastname: 'lastname2',
    email: 'email2@mail.com',
    phone: '0202020202',
    position: 'position2',
    job_title: 'jobTitle2',
    expected_position: 'expect2',
}]

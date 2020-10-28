import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';

import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import NavBar from '../components/Navbar';

afterEach(cleanup)

describe('REGISTER COMPONENT', () => {

    const setup = () => {
        const utils = renderWithContext(<Register />);
        const form = utils.getByRole('form');
        const btn = utils.getByRole('button');
        const inputsText = utils.getAllByRole('textbox');
        const inputPassword = utils.getByLabelText('password');

        return {
            btn,
            form,
            inputsText,
            inputPassword,
            ...utils
        }
    }

    it('should have a form container', () => {
        const { form } = setup();
        expect(form).not.toBe(null);
        expect(form).toBeVisible();
        expect(screen.getByRole('heading', { level: 3 }).textContent).toBe("DONT HAVE AN ACCOUNT YET ?")
    })

    describe('inputs fields', () => {
        it('should have an input for password', () => {
            const { inputPassword } = setup();
            expect(inputPassword).toBeVisible();
            expect(inputPassword.placeholder).toBe('password');
            expect(inputPassword.type).toBe('password')
            fireEvent.change(inputPassword, { target: { value: "34" } });
            expect(inputPassword.value).toBe("34");
        })
        it('should have inputs text for firstname, lastname, username, email', () => {
            const { inputsText } = setup();
            inputsText.forEach(input => {
                fireEvent.change(input, { target: { value: `${input.name}` } })
                expect(input.value).toBe(`${input.name}`)
            })
        })
    })


    it('should have a button to submit form ', () => {
        const { btn } = setup();
        expect(btn).not.toBe(null);
        expect(btn).toBeVisible();
        expect(btn.value).toBe('REGISTER');
    })
    it('should submit form when clicked', async () => {
    })
})

describe('NAVBAR Component', () => {
    it('should not render component if not logged in', () => {
        renderWithContext(<NavBar />);
        const lazyElement = screen.queryAllByRole('link');
        expect(lazyElement).toHaveLength(0)
    })
    it('should render when logged in', () => {
        renderWithContext(<NavBar />, { isLoggedIn: true })
        const links_text_content = screen.getAllByRole('link').map(link => link.textContent)
        expect(links_text_content).toEqual(['MyTeam', 'Jobs', 'Candidates', 'Settings', 'Logout'])
        expect(links_text_content).toHaveLength(5);
    })
})



const renderWithContext = (ui, propsContext) => {
    const defaultPropsContext = {
        token: '',
        isFetching: false,
        isLoggedIn: false,
        username: {},
        error: { message: '', type: '' },
        logout: () => 'logout',
        register: (props) => props
    }

    return render(
        <AuthContext.Provider
            value={{ ...defaultPropsContext, ...propsContext }}>
            <Router>
                {ui}
            </Router>
        </AuthContext.Provider >)
}
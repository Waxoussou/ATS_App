import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';

import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import NavBar from '../components/Navbar';

afterEach(cleanup)

describe('REGISTER COMPONENT', () => {
    const setup = (options) => {
        const utils = renderWithContext(<Register />, options);
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
    describe('FORM', () => {

        it('should have a form container', () => {
            const { form } = setup();
            expect(form).not.toBe(null);
            expect(form).toBeVisible();
            expect(screen.getByRole('heading', { level: 3 }).textContent).toBe("DONT HAVE AN ACCOUNT YET ?")
        })

        it('should have a div container with class :: `register-container` ', () => {
            const { container } = setup();
            expect(container.firstChild).toHaveClass('register-container')
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

        describe('Form Submit', () => {
            it('should have a button to submit form ', () => {
                const register = jest.fn()
                const { btn } = setup({ register });
                expect(btn).not.toBe(null);
                expect(btn).toBeVisible();
                expect(btn.value).toBe('REGISTER');
                fireEvent.click(btn);
                expect(register).toHaveBeenCalled()
            })

            it('should call register fn when submited', async () => {
                const register = jest.fn(() => 'register was called');
                const { form } = setup({ register });
                fireEvent.submit(form);
                expect(register).toHaveBeenCalled();
            })
        })
    })
})

describe('LOGIN Component', () => {
    const setup = (options) => {
        const utils = renderWithContext(<Login />, options);
        const form = utils.getByRole('form');
        const btn = utils.getByRole('button');
        return {
            btn,
            form,
            ...utils
        }
    }

    describe('FORM', () => {
        it('should have a form container', () => {
            const { form } = setup();
            expect(form).not.toBe(null);
            expect(form).toBeVisible();
        })

        it('should be wrapped in a div with class ::`login container` ', () => {
            const { container } = setup();
            expect(container.firstChild).toHaveClass('login-container');
        })

        describe('inputs fields', () => {
            describe('username input', () => {
                it('should render input for username', () => {
                    const { getByRole } = setup();
                    const username = getByRole('textbox', { name: /username/i });
                    expect(username).toBeVisible();

                })
                it('should handleChange', () => {
                    const handleChange = jest.fn(() => { return { target: { value: 'myName' } } });
                    const { getByRole } = setup();
                    const input = getByRole('textbox', { name: /username/i });
                    expect(input.value).toBe('');
                    fireEvent.change(input, handleChange())
                    expect(input.value).toBe('myName');
                    expect(handleChange).toHaveBeenCalled();
                })
                describe('password input', () => {
                    it('should have an input for password', () => {
                        const handleChange = jest.fn(_ => ({ target: { value: 'test' } }));
                        const { getByLabelText } = setup();
                        const input = getByLabelText(/password/i)
                        expect(input).toBeVisible();
                        expect(input.value).toBe('');
                        expect(input.placeholder).toBe('password');
                        expect(input.type).toBe('password')
                        fireEvent.change(input, handleChange());
                        expect(handleChange).toHaveBeenCalled();
                        expect(input.value).toBe('test');
                    })
                })
            })
        })

        describe('Form Submit', () => {
            it('should have a button to submit form ', () => {
                const { btn, queryByText } = setup();
                expect(queryByText(/sign in/i)).toBeTruthy();
                expect(btn.value).toBe("sign in");
                expect(btn).toBeVisible();
            })

            it('should call login fn when click', () => {
                const login = jest.fn(() => 'login was called');
                const { btn } = setup({ login });
                fireEvent.click(btn);
                expect(login).toHaveBeenCalledTimes(1);
            })
        })
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
        expect(links_text_content).toHaveLength(5);
        expect(links_text_content).toEqual(['MyTeam', 'Jobs', 'Candidates', 'Settings', 'Logout'])
    })
})


const renderWithContext = (ui, propsContext) => {
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
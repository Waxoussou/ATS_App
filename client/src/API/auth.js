export const fetchLogin = async (body) => {
    const options = {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    try {
        const res = await fetch('/api/auth/login', options)
            .catch(err => console.log('fetch err: ', err));
        const json = await res.json();
        if (json.status === 'failed' || !json.data) throw new Error(json.msg);
        return { username: json.data.username, token: json.token }
    }
    catch (error) {
        return { error: { message: error.message, type: 'LOGIN' } }
    }
}

export const fetchLoggedInUser = async (token) => {
    try {
        const res = await fetch('/api/auth', { headers: { Authorization: token } })
        const json = await res.json();
        if (json.status === 'ERROR') { throw new Error(json.message) };
        return { username: json.username }
    } catch (error) {
        return { status: 'FAILED', error: { message: error.message } }
    }
}

export const fetchRegister = async (body) => {
    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        const json = await res.json();
        if (json.status === 'FAILED') throw new Error(json.msg)
        return json;
    } catch (error) {
        return { status: 'FAILED', error: { message: error.message, type: 'REGISTER' } }
    }
}

export const fetchDeleteUser = async (password, token) => {
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ password })
    }
    try {
        const res = await fetch('/api/auth/deleteProfile', options);
        const json = await res.json();
        if (json.status === 'FAILED') throw new Error(json.msg);
        return { status: 'SUCCESS', payload: { message: 'your profile was deleted successfully', type: 'LOGIN' } }
    } catch (error) {
        const error_payload = { message: error.message, type: 'LOGOUT' };
        return { status: 'FAILED', error: error_payload }
    }
}

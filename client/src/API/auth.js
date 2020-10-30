export const fetchLogin = async (body) => {
    const options = {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    try {
        const res = await fetch('api/auth/login', options)
            .catch(err => console.log('fetch err: ', err));
        const json = await res.json();
        if (json.status === 'failed' || !json.data) throw new Error(json.msg);
        return { username: json.data.username, token: json.token }
    }
    catch (error) {
        console.warn(error.message);
        return { error: { message: error.message, type: 'LOGIN' } }
    }
}

export const fetchLoggedInUser = async () => {

}
export default {
    login: async (body) => {
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
    },

    loadUser: async (token) => {
        try {
            const res = await fetch('api/auth/', { headers: { Authorization: token } });
            const json = await res.json()
            if (json.success === 'failed') throw new Error(json.msg)
            return { username: json.username, token: token }
        } catch (error) {
            return { error: { message: error.message, type: "LOGGED_USER" } }
        }
    },

    registration: async () => {

    }
} 

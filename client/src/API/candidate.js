export default {
    loadCandidates: async (token) => {
        try {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                }
            }
            const res = await fetch('/api/candidates', options);
            const json = await res.json();
            return { status: 'SUCCESS', candidates: json }
        } catch (error) {
            console.log(error);
            return { status: 'FAILED', error: { message: error.message, type: "USER" } }
        }
    },

    createCandidate: async (body, token) => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(body)
            }
            const res = await fetch('/api/candidates', options)
            const json = await res.json();
            return { status: 'SUCCESS', user: json };
        } catch (error) {
            return {
                error: {
                    message: error.message,
                    type: "CREATE CANDIDATE"
                }
            }
        }
    },

    deleteCandidate: async (id, token) => {
        const options = { method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: token } }
        try {
            const res = await fetch(`/api/candidates/${id}`, options)
            const json = await res.json()
            console.log(json)
            return { status: "SUCCESS", delete_user: json };
        } catch (e) {
            return {
                error: {
                    message: e.message,
                    type: "DELETE CANDIDATE"
                }
            }
        }

    }

}
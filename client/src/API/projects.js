export default (token) => ({
    token,
    loadAllProjects: async () => {
        try {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }
            const res = await fetch('/api/projects/', options);
            const user_projects = await res.json();
            return { status: "SUCCESS", projects: user_projects }
        } catch (error) {
            console.log('fetch data FN error : ', error)
            return { status: "FAILED", error: { message: error.message, type: "API_FETCH" } }
        }
    },

    createNewProject: async (body) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: token },
            body: JSON.stringify(body)
        }
        try {
            const res = await fetch('/api/projects/new', options)
            const json = await res.json()
            return { status: "SUCCESS", new_project: json }
        } catch (error) {
            return { status: "FAILED", error: { message: error.message, type: "API_FETCH" } }
        }
    },

    deleteProjectFromId: async (id) => {
        try {
            const options = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', Authorization: token },
            }
            const res = await fetch('/api/projects/delete' + id, options)
            const json = await res.json();
            return { status: "SUCCESS", removed_project: json };
        } catch (error) {
            return { status: "FAILED", error: { message: error.message, type: "API_FETCH" } }
        }
    }
})
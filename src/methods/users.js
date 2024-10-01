function isLoggedIn() {
    // always true for local
    if (import.meta.env.VITE_LOCAL_ONLY === "true") return true

    // try to get user otherwise
    const id = getCurrentUser(true);
    return typeof id !== 'undefined' && id !== false && id.length > 0
}

function getCurrentUser(idOnly = false) {
    // start by getting user json if available
    const userJson = localStorage.getItem('em-user');
    if (userJson === null || userJson.length == 0) return false;

    // try to parse it
    try {
        const user = JSON.parse(userJson);
        return idOnly ? user['_id'] : user
    } catch {
        return false
    }
}

async function loginUser(email, password) {
    // return if no email or pw
    if (!email || !password) return false;

    // make request
    const url = import.meta.env.VITE_API_URL + '/users/login';
    const body = { email, password };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        const user = data["data"]["user"];
        delete user["password"];
        localStorage.setItem('em-user', JSON.stringify(user));
        return true;
    } catch (error) {
        console.error('Error logging in:', error);
        return false;
    }
}

function logoutUser() {
    localStorage.removeItem('em-user');
    return window.location = '/login'
}

async function signUpUser(username, email, password) {
    // return if no name, email, or pw
    if (!username || !email || !password) return false;

    // make request
    const url = import.meta.env.VITE_API_URL + '/users/signup';
    const body = { username, email, password };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        const user = data["data"]["user"];
        localStorage.setItem('em-user', JSON.stringify(user));
        return true;
    } catch (error) {
        console.error('Error signing up:', error);
        return false;
    }
}

export { isLoggedIn, getCurrentUser, loginUser, logoutUser, signUpUser }

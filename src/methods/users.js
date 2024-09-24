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

        const user = await response.json();
        localStorage.setItem('em-user', JSON.stringify(user));
        return true;
    } catch (error) {
        console.error('Error logging in:', error);
        return false;
    }
}

export { getCurrentUser, loginUser }

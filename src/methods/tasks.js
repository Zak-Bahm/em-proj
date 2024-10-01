import { getCurrentUser, isLoggedIn } from "./users";

async function getRemoteTasks(category = '') {
    // ensure we are logged in
    if (!isLoggedIn()) return []

    // get id and assemble url
    const userId = getCurrentUser(true)
    const url = import.meta.env.VITE_API_URL + '/users/' + userId + '/tasks/' + category;

    // fetch tasks
    try {
        const response = await fetch(url);

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        const tasks = data["data"]["tasks"].map(t => {
            t.id = t['_id'];
            t.dueDate = extractDatePart(t.dueDate || '');
            return t;
        });
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
}

async function saveRemoteTask(task) {
    // ensure we are logged in
    if (!isLoggedIn()) return false

    // get user id
    task.userId = getCurrentUser(true);

    // assemble url and update id if updating task
    let url = import.meta.env.VITE_API_URL + '/tasks'
    const isNew = typeof task.id == 'undefined';
    if (!isNew) {
        task['_id'] = task.id
        url += '/' + task.id
    }

    // assemble url and update
    try {
        const response = await fetch(url, {
            method: isNew ? 'POST': 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        return true;
    } catch (error) {
        console.error('Error updating task:', error);
        return false;
    }
}

async function deleteRemoteTask(task) {
    // ensure we are logged in
    if (!isLoggedIn()) return false

    // ensure we have an id
    if (typeof task.id == 'undefined') return false

    // assemble url delete task
    const url = import.meta.env.VITE_API_URL + '/tasks/' + task.id;
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            console.error('Error deleting task:', response.error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error deleting task:', error);
        return false;
    }
}

function getLocalTasks(category = '') {
    const tasks = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('task-')) {
            const taskJSON = localStorage.getItem(key);
            try {
                const task = JSON.parse(taskJSON);
                if (category === '') {
                    tasks.push(task);
                } else if (category === 'None' && !task.category) {
                    tasks.push(task);
                } else if (task.category === category) {
                    tasks.push(task);
                }
            } catch (e) {
                console.error(`Error parsing task with key ${key}:`, e);
            }
        }
    }

    // Sort tasks by updatedAt property
    tasks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return tasks;
}
function saveLocalTask(task) {
    if (task) {
        if (typeof task.id == 'undefined') task.id = task.createAt;
        const taskJSON = JSON.stringify(task);
        localStorage.setItem(`task-${task.id}`, taskJSON);
        return true;
    } else {
        console.error("Task object is invalid.");
        return false;
    }
}
function deleteLocalTask(task) {
    if (task && task.id) {
        localStorage.removeItem(`task-${task.id}`);
        return true;
    } else {
        console.error("Task object is invalid or missing an id.");
        return false;
    }
}

function extractDatePart(dateString) {
    const regex = /^([^T]+)T/;
    const match = dateString.match(regex);
    return match ? match[1] : '';
}

export { getRemoteTasks, saveRemoteTask, deleteRemoteTask, getLocalTasks, saveLocalTask, deleteLocalTask, extractDatePart }

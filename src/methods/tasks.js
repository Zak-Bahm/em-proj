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
                } else if (category === 'none' && !task.category) {
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
    if (task && task.id) {
        const taskJSON = JSON.stringify(task);
        localStorage.setItem(`task-${task.id}`, taskJSON);
    } else {
        console.error("Task object is invalid or missing an id.");
    }
}

export { getLocalTasks, saveLocalTask }

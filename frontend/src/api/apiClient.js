const API_BASE_URL = "/api";

// Get all tasks for the tarefas page
export async function getTasks() {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
        throw new Error("Failed to load tasks");
    }
    return await response.json();
}

// Create a new task
export async function createTask(task) {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error("Failed to create task");
    }

    return await response.json();
}

//Delete a task by ID
export async function deleteTask(taskId) {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }

    return true;
}

export async function getTaskById(id) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    if (!response.ok) {
        throw new Error("Failed to load task");
    }
    return await response.json();
}


// Get all contacts for the admin contactos page
export async function getContacts() {
    const response = await fetch(`${API_BASE_URL}/contacts`);
    if (!response.ok) {
        throw new Error("Failed to load contacts");
    }
    return await response.json();
}

// Create a new contact for the contact form
export async function createContact(contact) {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
    });

    if (!response.ok) {
        throw new Error("Failed to create contact");
    }

    return await response.json();
}

export async function deleteContact(contactId) {
    const response = await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete contact");
    }
    return true;
}

// Update/Edit a task by ID
export async function updateTask(id, task) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error("Failed to update task");
    }

    return await response.json();
}

export async function login(username, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`,  {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error("Login inválido");
    }

    return true;
}



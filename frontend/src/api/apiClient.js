// src/api/apiClient.js

const API_BASE_URL = "/api";

function getAuthHeaders(token) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
}

async function handleJson(res, errorMessage) {
    if (!res.ok) {
        let extra = "";
        try {
            const txt = await res.text();
            if (txt) extra = ` | ${txt}`;
        } catch (_) {}
        throw new Error(`${errorMessage} (HTTP ${res.status})${extra}`);
    }

    if (res.status === 204) return null;

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) return res.json();
    return res.text();
}

/*
*Adaptar mais tarde para supabase auth.
*Por agora, o backend é responsável por criar um JWT e devolvê-lo ao frontend, que o guarda no localStorage e o
*inclui no header Authorization das requests seguintes.
 */
export async function login(payload) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return handleJson(res, "Failed to login");
}

// ------------------- TASKS -------------------

export async function getTasks(token) {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
        method: "GET",
        headers: getAuthHeaders(token),
    });
    return handleJson(res, "Failed to load tasks");
}

export async function getTaskById(id, token) {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "GET",
        headers: getAuthHeaders(token),
    });
    return handleJson(res, "Failed to load task");
}

export async function createTask(payload, token) {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: getAuthHeaders(token),
        body: JSON.stringify(payload),
    });
    return handleJson(res, "Failed to create task");
}

export async function updateTask(id, payload, token) {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(token),
        body: JSON.stringify(payload),
    });
    return handleJson(res, "Failed to update task");
}

export async function deleteTask(id, token) {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(token),
    });
    await handleJson(res, "Failed to delete task");
    return true;
}

// ------------------- CONTACTS -------------------

// GET /api/contacts
export async function getContacts(token) {
    const res = await fetch(`${API_BASE_URL}/contacts`, {
        method: "GET",
        headers: getAuthHeaders(token),
    });
    return handleJson(res, "Failed to load contacts");
}

// POST /api/contacts
export async function createContact(payload, token) {
    const res = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: getAuthHeaders(token),
        body: JSON.stringify(payload),
    });
    return handleJson(res, "Failed to create contact");
}


export async function deleteContact(id, token) {
    const res = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(token),
    });
    await handleJson(res, "Failed to delete contact");
    return true;
}

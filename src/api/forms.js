const API_URL = "http://localhost:5000";

export async function listForms() {
  return fetch(`${API_URL}/forms`).then(res => res.json());
}

export async function createForm(name) {
  return fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  }).then(res => res.json());
}

export async function getForm(name) {
  return fetch(`${API_URL}/forms/${name}`).then(res => res.json());
}

export async function updateForm(name, data) {
  return fetch(`${API_URL}/forms/${name}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

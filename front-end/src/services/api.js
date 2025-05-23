const API_URL = 'http://localhost:3000';

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json(); // espera { token: '...' }
}

export async function fetchPlaylists(token) {
  const response = await fetch(`${API_URL}/playlists`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch playlists');
  }
  return response.json();
}

// ✅ Novo: cadastro de usuário
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Falha no cadastro');
  }

  return response.json(); // espera { name, token, ... }
}

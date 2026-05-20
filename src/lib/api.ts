const API_BASE = "/api";

interface FetchOptions extends RequestInit {
  noAuth?: boolean;
}

export async function adminFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const token = localStorage.getItem("toknow_token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token && !options.noAuth) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("toknow_token");
      window.location.href = "/login";
    }
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }
  return response.text() as unknown as T;
}

export async function loginAdmin(username: string, password: string) {
  const data = await adminFetch<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    noAuth: true,
  });
  localStorage.setItem("toknow_token", data.token);
  return data;
}

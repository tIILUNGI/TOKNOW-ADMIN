const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL as string | undefined;
  const hostname = window.location.hostname;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";

  if (envUrl?.trim()) {
    const normalizedEnvUrl = envUrl.trim().replace(/\/$/, "");
    const isRelativeUrl = normalizedEnvUrl.startsWith("/");
    const isLocalApiUrl = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(normalizedEnvUrl);

    if (!isRelativeUrl && (isLocalHost || !isLocalApiUrl)) {
      return normalizedEnvUrl;
    }
  }

  if (isLocalHost) {
    return "/api";
  }

  return "https://api.toknow.ilungi.digital/api";
};

const buildUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) return path;
  const baseUrl = getApiBaseUrl();
  return path.startsWith("/") ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
};

const clearAdminSession = () => {
  localStorage.removeItem("toknow_token");
  localStorage.removeItem("toknow_auth");
};

interface FetchOptions extends RequestInit {
  noAuth?: boolean;
}

export async function adminFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const token = localStorage.getItem("toknow_token");
  const url = buildUrl(path);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token && !options.noAuth) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const text = await response.text();

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      clearAdminSession();
      window.location.href = "/";
    }
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text) as T;
    } catch {
      throw new Error(`Resposta inválida da API em ${url}. O backend devolveu conteúdo que não é JSON.`);
    }
  }

  if (text.trimStart().startsWith("<!DOCTYPE") || text.trimStart().startsWith("<html")) {
    throw new Error(`A chamada ${url} devolveu HTML em vez de dados. Verifique se o painel admin foi recompilado com a URL correta da API.`);
  }

  return text as unknown as T;
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

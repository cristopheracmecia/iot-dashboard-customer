var at = "";

export function saveAccessToken(token: string) {
    at = token;
}

export function getAccessToken() {
    return at && at.length > 1 ? `Bearer ${at}` : undefined;
}

export function saveRefreshToken(token: string) {
    sessionStorage.setItem("REMEMBERME", token);
}

export function getRefreshToken() {
    return sessionStorage.getItem("REMEMBERME");
}

export function clearTokens() {
    at = ""
    sessionStorage.removeItem("REMEMBERME");
}
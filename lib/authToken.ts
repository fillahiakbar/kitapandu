export function getAccessToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(^| )access_token=([^;]+)/);
  return match ? match[2] : null;
}

export function setAccessToken(token: string) {
  document.cookie = `access_token=${token}; path=/; SameSite=Lax;`;
}

export function clearAccessToken() {
  document.cookie =
    "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

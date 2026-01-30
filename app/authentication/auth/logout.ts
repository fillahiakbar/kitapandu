"use client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function logout() {
  const token =
    typeof document !== "undefined"
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("access_token="))
          ?.split("=")[1]
      : null;

  try {
    // ✅ tetap revoke ke backend
    if (token) {
      await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch (err) {
    // ❗ SENGAJA DIABAIKAN
    // token sudah revoked / expired itu normal
    console.warn("Logout API failed, forcing client logout");
  } finally {
    // ✅ PASTI bersihkan token di client
    document.cookie =
      "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // hard redirect biar middleware kepanggil ulang
    window.location.replace("/authentication/login");
  }
}

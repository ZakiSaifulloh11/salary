"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      // ambil text dulu supaya aman
      const text = await res.text();

      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server error: " + text);
      }

      if (!res.ok) {
        throw new Error(data.message || "Register gagal");
      }

      // simpan data kalau ada
      if (data.token) {
        localStorage.setItem("access_token", data.token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-md rounded-2xl bg-white p-8 shadow dark:bg-zinc-900">
        <h1 className="mb-6 text-center text-2xl font-semibold">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            required
          />

          <input
            type="email"
            placeholder="email@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            required
          />

          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black py-2 text-white disabled:opacity-50"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Sudah punya akun?{" "}
          <button
            type="button"
            className="text-blue-500"
            onClick={() => router.push("/sign-in")}
          >
            Login
          </button>
        </p>
      </main>
    </div>
  );
}
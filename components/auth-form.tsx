"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "A apărut o problemă.");
      setLoading(false);
      return;
    }

    router.push(data.redirectTo ?? "/account");
    router.refresh();
  }

  const isLogin = mode === "login";
  const inputClass =
    "rounded-2xl border border-[#dfd0bc] bg-white px-4 py-3 outline-none transition focus:border-[#b78b47]";

  return (
    <div className="mx-auto max-w-md">
      <div className="glass-panel rounded-[2rem] p-8">
        <p className="section-kicker">{isLogin ? "Login" : "Register"}</p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-[-0.04em] text-ink">
          {isLogin ? "Welcome back" : "Create account"}
        </h1>
        <p className="mt-3 text-sm leading-7 text-ink/60">
          {isLogin
            ? "Intră în cont pentru bilete, evenimente și dashboard personal."
            : "Contul este obligatoriu pentru cumpărarea biletelor și urmărirea accesului la evenimente."}
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4">
          {!isLogin && (
            <label className="grid gap-2 text-sm text-ink/72">
              Nume complet
              <input name="fullName" required className={inputClass} />
            </label>
          )}
          <label className="grid gap-2 text-sm text-ink/72">
            Email
            <input type="email" name="email" required className={inputClass} />
          </label>
          <label className="grid gap-2 text-sm text-ink/72">
            Parolă
            <input type="password" name="password" required minLength={5} className={inputClass} />
          </label>

          {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          <button type="submit" disabled={loading} className="cta-primary mt-2 disabled:opacity-60">
            {loading ? "Se procesează..." : isLogin ? "Login" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-ink/55">
          {isLogin ? "Nu ai cont?" : "Ai deja cont?"}{" "}
          <Link href={isLogin ? "/register" : "/login"} className="font-medium text-amber">
            {isLogin ? "Înregistrează-te" : "Intră în cont"}
          </Link>
        </p>
      </div>
    </div>
  );
}

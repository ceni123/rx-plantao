"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [invalidInvite, setInvalidInvite] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInvalidInvite(
      new URLSearchParams(window.location.search).get("error") ===
        "convite-invalido",
    );
  }, []);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError("E-mail ou senha inválidos.");
      setLoading(false);
      return;
    }

    router.replace("/protocolos");
    router.refresh();
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand"><b>Rx</b><strong>Rx <span>Plantão</span></strong></div>
        <p className="auth-eyebrow">ACESSO RESTRITO</p>
        <h1>Entre para continuar.</h1>
        <p className="auth-copy">Use a conta individual fornecida pelo administrador.</p>
        {invalidInvite && (
          <p className="auth-error" role="alert">
            Este convite é inválido ou expirou. Solicite um novo convite ao administrador.
          </p>
        )}
        <form className="auth-form" onSubmit={signIn}>
          <label>
            E-mail
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
        <p className="auth-help">Não possui acesso? Solicite uma conta ao administrador.</p>
      </section>
    </main>
  );
}

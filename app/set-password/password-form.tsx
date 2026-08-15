"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

export function PasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function validateRecoveryLink() {
      const url = new URL(window.location.href);
      const hash = new URLSearchParams(url.hash.slice(1));
      const linkError = hash.get("error_description");

      if (linkError) {
        if (active) setError("Este link é inválido ou expirou. Solicite uma nova recuperação de senha.");
        return;
      }

      let { data } = await supabase.auth.getSession();
      let session = data.session;

      if (!session) {
        const code = url.searchParams.get("code");
        const accessToken = hash.get("access_token");
        const refreshToken = hash.get("refresh_token");

        if (code) {
          const result = await supabase.auth.exchangeCodeForSession(code);
          session = result.data.session;
        } else if (accessToken && refreshToken) {
          const result = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          session = result.data.session;
        }
      }

      if (!active) return;

      if (session) {
        setSessionReady(true);
        window.history.replaceState({}, "", "/set-password");
      } else {
        setError("Não foi possível validar este link. Solicite uma nova recuperação de senha.");
      }
    }

    void validateRecoveryLink();
    return () => {
      active = false;
    };
  }, []);

  async function savePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmation) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError("Não foi possível criar a senha. Solicite um novo convite.");
      setLoading(false);
      return;
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <form className="auth-form" onSubmit={savePassword}>
      <label>
        Nova senha
        <input
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <label>
        Confirmar senha
        <input
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
        />
      </label>
      {error && <p className="auth-error" role="alert">{error}</p>}
      {!sessionReady && !error && (
        <p className="auth-copy" role="status">Validando convite…</p>
      )}
      <button type="submit" disabled={loading || !sessionReady}>
        {loading ? "Criando senha…" : "Criar senha e acessar"}
      </button>
    </form>
  );
}

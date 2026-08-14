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
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionReady(Boolean(session));
    });

    void supabase.auth.getSession().then(({ data }) => {
      setSessionReady(Boolean(data.session));
    });

    return () => subscription.unsubscribe();
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
      {!sessionReady && (
        <p className="auth-copy" role="status">Validando convite…</p>
      )}
      <button type="submit" disabled={loading || !sessionReady}>
        {loading ? "Criando senha…" : "Criar senha e acessar"}
      </button>
    </form>
  );
}

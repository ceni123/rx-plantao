import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";
import { PasswordForm } from "./password-form";

export default async function SetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?error=convite-invalido");
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-brand"><b>Rx</b><strong>Rx <span>Plantão</span></strong></div>
        <p className="auth-eyebrow">PRIMEIRO ACESSO</p>
        <h1>Crie sua senha.</h1>
        <p className="auth-copy">
          Defina uma senha individual para acessar o Rx Plantão nos próximos plantões.
        </p>
        <PasswordForm />
        <p className="auth-help">Conta: {user.email}</p>
      </section>
    </main>
  );
}

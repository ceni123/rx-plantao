import { PasswordForm } from "./password-form";

export default function SetPasswordPage() {
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
        <p className="auth-help">O convite é individual e expira por segurança.</p>
      </section>
    </main>
  );
}

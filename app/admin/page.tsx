import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";

type AdminUser = {
  id: string;
  email: string | null;
  created_at: string;
  email_confirmed_at: string | null;
  last_sign_in_at: string | null;
};

const formatDate = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "America/Sao_Paulo",
      }).format(new Date(value))
    : "—";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  if (user.app_metadata?.role !== "owner") redirect("/");

  const { data, error } = await supabase.rpc("admin_list_users");
  const users = (data ?? []) as AdminUser[];

  async function sendReset(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "");
    const actionClient = await createClient();
    const { data: { user: actionUser } } = await actionClient.auth.getUser();
    if (!actionUser || actionUser.app_metadata?.role !== "owner") redirect("/");
    await actionClient.auth.resetPasswordForEmail(email, {
      redirectTo: "https://rx-plantao.vercel.app/set-password",
    });
    redirect("/admin?reset=sent");
  }

  return (
    <main className="min-h-screen bg-[#f5f5ef]">
      <header className="static">
        <a className="brand" href="/"><b>Rx</b><strong>Rx <span>Plantão</span></strong></a>
        <a className="font-mono text-[9px] font-bold uppercase tracking-wide text-[#1f5845] no-underline" href="/">Voltar aos protocolos</a>
      </header>

      <section className="mx-auto max-w-[1160px] px-4 py-12 md:px-6 md:py-14">
        <div className="mb-5 flex items-end justify-between border-b border-[#dce1da] pb-7">
          <div>
            <p className="mb-2.5 font-mono text-[9px] font-bold tracking-[.15em] text-[#a2523d]">ACESSO DO PROPRIETÁRIO</p>
            <h1 className="m-0 font-serif text-3xl font-normal text-[#142620] md:text-[42px]">Painel administrativo</h1>
            <span className="mt-2.5 block text-xs text-[#6c7773]">Gerencie as contas cadastradas sem visualizar ou armazenar senhas.</span>
          </div>
          <b className="flex flex-col items-end font-serif text-3xl font-normal text-[#1f5845] md:text-[42px]">{users.length}<small className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#6c7773]">usuário{users.length === 1 ? "" : "s"}</small></b>
        </div>

        {error ? (
          <div className="border border-[#efd1c7] bg-[#faece7] p-4 text-xs text-[#8a3f32]">Não foi possível carregar os usuários. Atualize a página ou entre novamente.</div>
        ) : (
          <div className="overflow-auto border border-[#dce1da] bg-white">
            <table className="w-full min-w-[850px] border-collapse text-left text-[11px] text-[#53605c]">
              <thead className="bg-[#f9f9f5] font-mono text-[9px] uppercase tracking-wider text-[#7c8682]"><tr><th className="p-4">Conta</th><th className="p-4">Situação</th><th className="p-4">Cadastro</th><th className="p-4">Último acesso</th><th className="p-4">Ação segura</th></tr></thead>
              <tbody>
                {users.map((item) => (
                  <tr className="border-t border-[#edf0eb]" key={item.id}>
                    <td className="p-4"><strong className="block text-xs text-[#142620]">{item.email ?? "Sem e-mail"}</strong><small className="mt-1 block font-mono text-[8px] text-[#9aa29f]">{item.id}</small></td>
                    <td className="p-4"><span className={`inline-block rounded px-2 py-1.5 font-mono text-[9px] font-bold uppercase ${item.email_confirmed_at ? "bg-[#e1efe7] text-[#276247]" : "bg-[#f7ead7] text-[#8b5d1f]"}`}>{item.email_confirmed_at ? "Confirmada" : "Pendente"}</span></td>
                    <td className="p-4">{formatDate(item.created_at)}</td>
                    <td className="p-4">{formatDate(item.last_sign_in_at)}</td>
                    <td className="p-4">{item.email ? <form action={sendReset}><input type="hidden" name="email" value={item.email}/><button className="cursor-pointer rounded border border-[#bfcac3] bg-white px-2.5 py-2 font-mono text-[9px] font-bold uppercase text-[#1f5845]">Redefinir senha</button></form> : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 grid gap-2 border-l-[3px] border-[#547466] bg-[#edf1eb] p-4 md:grid-cols-[90px_1fr] md:gap-4"><b className="font-mono text-[9px] uppercase text-[#35594c]">Segurança</b><p className="m-0 text-[10px] leading-relaxed text-[#65716c]">Senhas não aparecem porque o Supabase armazena apenas o hash criptográfico. A redefinição é feita por um link individual enviado ao e-mail do usuário.</p></div>
      </section>
    </main>
  );
}

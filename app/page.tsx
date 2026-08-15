import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="landing">
      <header className="landing-nav">
        <a className="brand" href="#inicio"><b>Rx</b><strong>Rx <span>Plantão</span></strong></a>
        <nav aria-label="Navegação principal">
          <a href="#como-funciona">Como funciona</a>
          <a href="#recursos">Recursos</a>
          <Link className="landing-login" href="/login">Entrar</Link>
        </nav>
      </header>

      <section className="landing-hero" id="inicio">
        <div className="landing-hero-copy">
          <p className="landing-kicker"><span/> FEITO PARA QUEM ESTÁ NO PLANTÃO</p>
          <h1>Menos procura.<br/><em>Mais decisão.</em></h1>
          <p className="landing-lead">Protocolos objetivos, doses e calculadoras em uma interface pensada para o momento em que cada segundo importa.</p>
          <div className="landing-actions">
            <Link className="landing-primary" href="/login">Acessar o Rx Plantão <span>→</span></Link>
            <a className="landing-secondary" href="#como-funciona">Conhecer a plataforma</a>
          </div>
          <div className="landing-proof"><b>Adulto</b><b>Pediatria</b><b>Emergências</b><b>Infusões</b></div>
        </div>
        <aside className="landing-panel" aria-label="Exemplo da experiência Rx Plantão">
          <div className="landing-panel-top"><span>PLANTÃO ATIVO</span><i/></div>
          <p>O que você precisa agora?</p>
          <div className="landing-search">⌕ <span>Buscar condição ou medicamento…</span></div>
          <div className="landing-mini-grid">
            <article><small>EMERGÊNCIA</small><b>Anafilaxia</b><span>Dose por peso →</span></article>
            <article><small>CALCULADORA</small><b>Vasoativas</b><span>mL/h imediato →</span></article>
            <article><small>PEDIATRIA</small><b>Convulsão</b><span>Conduta rápida →</span></article>
          </div>
        </aside>
      </section>

      <section className="landing-flow" id="como-funciona">
        <div><small>NO RITMO DO PRONTO-SOCORRO</small><h2>Da dúvida à conduta<br/>em poucos toques.</h2></div>
        <ol>
          <li><span>01</span><div><b>Busque</b><p>Encontre a condição, o medicamento ou a calculadora sem percorrer menus longos.</p></div></li>
          <li><span>02</span><div><b>Informe</b><p>Digite peso, dose ou concentração quando o cálculo precisar desses dados.</p></div></li>
          <li><span>03</span><div><b>Decida</b><p>Receba o resultado organizado para leitura rápida, com alertas realmente relevantes.</p></div></li>
        </ol>
      </section>

      <section className="landing-features" id="recursos">
        <div className="landing-feature-intro"><small>UMA FERRAMENTA, UM OBJETIVO</small><h2>Reduzir atrito quando a cabeça já está cheia.</h2></div>
        <div className="landing-feature-grid">
          <article><span>⌕</span><h3>Busca direta</h3><p>Condição, fármaco ou protocolo encontrados pelo termo que vem à sua cabeça.</p></article>
          <article><span>↗</span><h3>Cálculo à vista</h3><p>Resultado centralizado, unidade clara e passos curtos para conferência.</p></article>
          <article><span>⚡</span><h3>Modo rápido</h3><p>Conteúdo enxuto, hierarquia visual forte e navegação confortável no celular.</p></article>
        </div>
      </section>

      <section className="landing-cta">
        <div><small>SEU PRÓXIMO PLANTÃO COMEÇA AQUI</small><h2>Tenha o essencial à mão.</h2></div>
        <Link className="landing-primary light" href="/login">Entrar na plataforma <span>→</span></Link>
      </section>

      <footer className="landing-footer"><a className="brand" href="#inicio"><b>Rx</b><strong>Rx <span>Plantão</span></strong></a><p>Protocolos rápidos e calculadoras para pronto-socorro.</p><span>© 2026 Rx Plantão</span></footer>
    </main>
  );
}

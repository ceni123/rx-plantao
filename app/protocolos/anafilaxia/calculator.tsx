"use client";

import {useMemo, useState} from "react";

const fmt=(value:number)=>value.toLocaleString("pt-BR",{maximumFractionDigits:2});

export default function AnaphylaxisCalculator(){
  const[patient,setPatient]=useState<"adult"|"child">("adult");
  const[weight,setWeight]=useState("20");
  const[copied,setCopied]=useState(false);
  const kg=Number(weight.replace(",","."));
  const valid=Number.isFinite(kg)&&kg>0;
  const dose=patient==="adult"?.5:valid?Math.min(kg*.01,.3):0;
  const prescription=useMemo(()=>patient==="adult"?"Adrenalina 1 mg/mL: administrar 0,5 mg (0,5 mL) IM no vasto lateral da coxa. Reavaliar e repetir a cada 5–15 minutos se necessário.":valid?`Adrenalina 1 mg/mL: administrar ${fmt(dose)} mg (${fmt(dose)} mL) IM no vasto lateral da coxa. Reavaliar e repetir a cada 5–15 minutos se necessário.`:"",[patient,valid,dose]);
  async function copy(){if(!prescription)return;await navigator.clipboard.writeText(prescription);setCopied(true);window.setTimeout(()=>setCopied(false),1800)}
  return <div className="condition-shell"><section className="condition-calc"><div className="condition-controls"><small>1 · DEFINA O PACIENTE</small><div className="patient-toggle"><button className={patient==="adult"?"on":""} onClick={()=>setPatient("adult")}>Adulto</button><button className={patient==="child"?"on":""} onClick={()=>setPatient("child")}>Pediatria</button></div>{patient==="child"&&<label>Peso atual<div><input inputMode="decimal" value={weight} onChange={e=>setWeight(e.target.value.replace(/[^0-9,.]/g,""))}/><b>kg</b></div></label>}</div><div className="condition-dose"><small>ADRENALINA IM · 1 mg/mL</small><strong>{patient==="child"&&!valid?"Informe o peso":`${fmt(dose)} mg`}</strong><b>{patient==="child"&&!valid?"—":`${fmt(dose)} mL IM`}</b><p>{patient==="adult"?"Dose fixa no adulto":"0,01 mg/kg · máximo 0,3 mg"}</p></div></section>
  <section className="prescription-box"><div><small>2 · PRESCRIÇÃO PRONTA</small><p>{prescription||"Informe um peso válido para gerar a prescrição."}</p></div><button disabled={!prescription} onClick={copy}>{copied?"Copiado ✓":"Copiar prescrição"}</button></section>
  <section className="condition-grid"><article><small>3 · EXECUTE AGORA</small><ol><li><b>Adrenalina IM</b><p>Aplicar no vasto lateral da coxa sem atrasar para obter acesso venoso.</p></li><li><b>Posição e monitorização</b><p>Decúbito com membros inferiores elevados, salvo desconforto respiratório importante; monitor cardíaco, pressão, SpO₂ e acesso IV/IO.</p></li><li><b>Oxigênio e volume</b><p>Oxigênio se hipoxemia ou desconforto. Cristaloide em alíquotas se hipotensão ou má perfusão, com reavaliação.</p></li><li><b>Repetir e escalar</b><p>Repetir adrenalina IM em 5–15 minutos se persistirem sinais; preparar suporte avançado de via aérea e choque refratário.</p></li></ol></article><article className="treatment-options"><small>4 · MEDICAÇÕES ASSOCIADAS</small><div><b>Primeira escolha</b><p>Adrenalina IM. Nenhuma das opções abaixo substitui ou deve atrasar essa dose.</p></div><div><b>Broncoespasmo persistente</b><p>Salbutamol inalatório após adrenalina, conforme resposta clínica.</p></div><div><b>Urticária/prurido persistente</b><p>Anti-histamínico H1 pode aliviar sintomas cutâneos, mas não trata choque nem obstrução de via aérea.</p></div><div><b>Corticoide</b><p>Não atua na fase imediata e não é rotina para impedir reação bifásica; considerar apenas por indicação associada.</p></div></article></section>
  <section className="critical-strip"><b>Não fazer</b><p>Não administrar adrenalina subcutânea. Adrenalina IV em bolus não pertence ao manejo inicial e tem risco de arritmia e erro de dose.</p></section></div>
}

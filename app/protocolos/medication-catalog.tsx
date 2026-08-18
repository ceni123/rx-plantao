"use client";

import {useMemo, useState} from "react";

type Presentation={label:string;concentration:number;unit:"mL"|"gota"|"comprimido";note:string};
type Regimen={label:string;age:"Adulto"|"Pediatria";doseMin:number;doseMax:number;interval:string;maxDose?:number;maxDay?:string;presentations:Presentation[];note?:string};
type Medication={id:string;name:string;aliases:string[];use:string;tone:string;regimens:Regimen[];alerts:string[];sources:string[];referenceUrl:string};

const medications:Medication[]=[
  {id:"dipirona",name:"Dipirona",aliases:["metamizol","novalgina","analgésico","antitérmico"],use:"Dor e febre",tone:"coral",regimens:[
    {label:"VO — adulto",age:"Adulto",doseMin:500,doseMax:1000,interval:"a cada 4–6 h, se necessário",maxDay:"4 g/dia",presentations:[{label:"Solução 50 mg/mL",concentration:50,unit:"mL",note:"volume por dose"},{label:"Comprimido 500 mg",concentration:500,unit:"comprimido",note:"comprimidos por dose"}]},
    {label:"VO — pediatria",age:"Pediatria",doseMin:15,doseMax:25,interval:"a cada 6 h",maxDose:1000,maxDay:"respeitar máximo por peso/idade",presentations:[{label:"Gotas 500 mg/mL",concentration:25,unit:"gota",note:"25 mg por gota"},{label:"Solução 50 mg/mL",concentration:50,unit:"mL",note:"volume por dose"}]},
    {label:"EV — pediatria",age:"Pediatria",doseMin:15,doseMax:25,interval:"a cada 6 h",maxDose:1000,presentations:[{label:"Ampola 500 mg/mL",concentration:500,unit:"mL",note:"diluir em 10 mL de AD; administrar lentamente"}]},
  ],alerts:["Não usar AINEs, incluindo ibuprofeno, quando houver suspeita de dengue; dipirona e paracetamol são as opções do protocolo do MS.","Confirmar alergia prévia e apresentação antes de converter mg em mL ou gotas."],sources:["Guia Hospital Infantil Albert Sabin, fev/2024, p. 20","Guia rápido de prescrições para o plantão, p. 22","Ministério da Saúde — Dengue: diagnóstico e manejo clínico, 2024"],referenceUrl:"https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/dengue/dengue-diagnostico-e-manejo-clinico-adulto-e-crianca/view"},
  {id:"paracetamol",name:"Paracetamol",aliases:["acetaminofeno","tylenol","analgésico","antitérmico"],use:"Dor e febre",tone:"amber",regimens:[
    {label:"VO — adulto",age:"Adulto",doseMin:500,doseMax:1000,interval:"a cada 4–6 h, se necessário",maxDay:"4 g/dia",presentations:[{label:"Comprimido 500 mg",concentration:500,unit:"comprimido",note:"comprimidos por dose"},{label:"Solução 100 mg/mL",concentration:100,unit:"mL",note:"volume por dose"}]},
    {label:"VO — pediatria",age:"Pediatria",doseMin:10,doseMax:15,interval:"a cada 4–6 h",maxDay:"máximo 5 doses/24 h",presentations:[{label:"Gotas 200 mg/mL",concentration:10,unit:"gota",note:"10 mg por gota"},{label:"Solução 160 mg/5 mL",concentration:32,unit:"mL",note:"32 mg/mL"},{label:"Solução 100 mg/mL",concentration:100,unit:"mL",note:"volume por dose"}]},
  ],alerts:["Somar o paracetamol presente em associações para não ultrapassar o limite diário.","Reduzir o teto diário em hepatopatia, baixo peso, desnutrição ou uso crônico de álcool."],sources:["Guia Hospital Infantil Albert Sabin, fev/2024, pp. 20–21","Guia rápido de prescrições para o plantão, p. 22","Ministério da Saúde — Dengue: diagnóstico e manejo clínico, 2024"],referenceUrl:"https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/dengue/dengue-diagnostico-e-manejo-clinico-adulto-e-crianca/view"},
  {id:"ibuprofeno",name:"Ibuprofeno",aliases:["alivium","anti-inflamatório","aine"],use:"Dor, febre e inflamação",tone:"blue",regimens:[
    {label:"VO — pediatria",age:"Pediatria",doseMin:4,doseMax:10,interval:"a cada 6–8 h",maxDose:400,maxDay:"40 mg/kg/dia",presentations:[{label:"Gotas 50 mg/mL",concentration:5,unit:"gota",note:"5 mg por gota"},{label:"Gotas 100 mg/mL",concentration:10,unit:"gota",note:"10 mg por gota"},{label:"Gotas 200 mg/mL",concentration:20,unit:"gota",note:"20 mg por gota"}]},
  ],alerts:["Não usar na suspeita de dengue.","Evitar em desidratação, lesão renal, sangramento digestivo ou hipersensibilidade a AINE."],sources:["Guia Hospital Infantil Albert Sabin, fev/2024, p. 20","Guia rápido de prescrições para o plantão, p. 22"],referenceUrl:"https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/dengue/dengue-diagnostico-e-manejo-clinico-adulto-e-crianca/view"},
  {id:"ondansetrona",name:"Ondansetrona",aliases:["vonau","zofran","antiemético","náusea","vômito"],use:"Náuseas e vômitos",tone:"violet",regimens:[
    {label:"EV — pediatria",age:"Pediatria",doseMin:.15,doseMax:.15,interval:"por dose",maxDose:8,presentations:[{label:"Ampola 2 mg/mL",concentration:2,unit:"mL",note:"volume antes da rediluição"}],note:"A indicação muda o esquema. Para gastroenterite com vômitos persistentes, o MS usa dose única por faixa de peso."},
    {label:"VO — gastroenterite",age:"Pediatria",doseMin:0,doseMax:0,interval:"dose única",presentations:[],note:"6 meses–2 anos: 2 mg · >2–10 anos e até 30 kg: 4 mg · >10 anos ou >30 kg: 8 mg."},
  ],alerts:["Avaliar QT longo, distúrbios eletrolíticos e associação com outros fármacos que prolongam QT.","Não confundir a dose EV por peso com a dose única por faixa usada na reidratação oral."],sources:["Guia Hospital Infantil Albert Sabin, fev/2024, p. 23","Ministério da Saúde — Manejo do paciente com diarreia"],referenceUrl:"https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/doencas-diarreicas-agudas/manejo-do-paciente-com-diarreia-avaliacao-do-estado-do-paciente"},
];

const fmt=(n:number,digits=2)=>n.toLocaleString("pt-BR",{maximumFractionDigits:digits});

function Calculator({med}:{med:Medication}){
  const[regimenIndex,setRegimenIndex]=useState(0);const[weight,setWeight]=useState("20");const[presentationIndex,setPresentationIndex]=useState(0);
  const regimen=med.regimens[regimenIndex];const presentation=regimen.presentations[presentationIndex];const kg=Number(weight.replace(",","."));
  const calculated=regimen.age==="Pediatria"&&regimen.doseMax>0&&Number.isFinite(kg)&&kg>0;
  let min=calculated?regimen.doseMin*kg:regimen.doseMin,max=calculated?regimen.doseMax*kg:regimen.doseMax;
  if(regimen.maxDose){min=Math.min(min,regimen.maxDose);max=Math.min(max,regimen.maxDose)}
  const values=presentation?{min:min/presentation.concentration,max:max/presentation.concentration}:null;
  const setRegimen=(index:number)=>{setRegimenIndex(index);setPresentationIndex(0)};
  return <div className="medcalc">
    <div className="medcalc-controls"><label>Esquema<select value={regimenIndex} onChange={e=>setRegimen(Number(e.target.value))}>{med.regimens.map((r,i)=><option key={r.label} value={i}>{r.label}</option>)}</select></label>{regimen.age==="Pediatria"&&regimen.doseMax>0&&<label>Peso (kg)<input inputMode="decimal" value={weight} onChange={e=>setWeight(e.target.value.replace(/[^0-9,.]/g,""))}/></label>}{regimen.presentations.length>0&&<label>Apresentação<select value={presentationIndex} onChange={e=>setPresentationIndex(Number(e.target.value))}>{regimen.presentations.map((p,i)=><option value={i} key={p.label}>{p.label}</option>)}</select></label>}</div>
    {regimen.doseMax>0?<div className="medresult"><small>DOSE CALCULADA</small><strong>{fmt(min)}{max!==min?`–${fmt(max)}`:""} <span>mg/dose</span></strong>{values&&<b>{fmt(values.min)}{values.max!==values.min?`–${fmt(values.max)}`:""} {presentation.unit}{(presentation.unit==="gota"||presentation.unit==="comprimido")&&values.max!==1?"s":""}</b>}<p>{regimen.interval}{regimen.maxDay?` · máximo ${regimen.maxDay}`:""}</p>{presentation&&<em>{presentation.note}</em>}</div>:<div className="medresult text"><small>ESQUEMA POR FAIXA</small><strong>2 / 4 / 8 mg</strong><p>{regimen.note}</p></div>}
    {regimen.note&&regimen.doseMax>0&&<p className="mednote">{regimen.note}</p>}
  </div>
}

export default function MedicationCatalog({initialQuery}:{initialQuery:string}){
  const[open,setOpen]=useState<string>("dipirona");const list=useMemo(()=>medications.filter(m=>!initialQuery||`${m.name} ${m.aliases.join(" ")} ${m.use}`.toLowerCase().includes(initialQuery.toLowerCase())),[initialQuery]);
  return <section className="medications" id="medicamentos"><div className="medications-head"><div><small>MEDICAMENTOS</small><h2>Calcule e converta sem sair da tela.</h2><p>Dose em mg e conversão automática para a apresentação selecionada.</p></div><b>{list.length} fichas revisadas</b></div>{list.length?<div className="medication-list">{list.map(m=><article className={`medication ${m.tone} ${open===m.id?"expanded":""}`} key={m.id}><button className="medication-summary" onClick={()=>setOpen(open===m.id?"":m.id)} aria-expanded={open===m.id}><div><small>{m.use}</small><h3>{m.name}</h3><p>{m.aliases.slice(0,3).join(" · ")}</p></div><span>{open===m.id?"−":"+"}</span></button>{open===m.id&&<div className="medication-body"><Calculator med={m}/><div className="meddetails"><div><small>ALERTAS QUE MUDAM A PRESCRIÇÃO</small>{m.alerts.map(a=><p key={a}>⚠ {a}</p>)}</div><div><small>RASTREABILIDADE</small>{m.sources.map(s=><p key={s}>{s}</p>)}<a href={m.referenceUrl} target="_blank" rel="noreferrer">Abrir referência oficial ↗</a></div></div></div>}</article>)}</div>:<div className="empty"><b>Nenhum medicamento encontrado.</b><span>O termo pode aparecer em um protocolo ainda não convertido para ficha.</span></div>}<footer className="medication-status"><span>Primeiro lote</span><p>4 medicamentos estruturados. Os próximos entram após conferência de dose, apresentação e página de origem.</p></footer></section>
}

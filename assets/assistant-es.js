/* Sol — персональный ИИ-ассистент «Испании по-русски».
   Answer sources, in order:
   1) window.ER_CONFIG.endpoint — your own backend (see ai-backend/), streams plain text;
   2) Claude via the artifact "sample" capability (when the page is opened on claude.ai);
   3) offline demo answers from ER_KB. */
(function(){
const CFG = Object.assign({ endpoint:null, whatsapp:"34690246487", phone:"+34 93 272 64 90" }, window.ER_CONFIG||{});
const KB = window.ER_KB||[], SVC = window.ER_SERVICES||[];
const I = {
 send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
 expand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>',
 close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 person:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
 book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5A2.5 2.5 0 0 0 4 21.5"/><path d="M20 17v4H6.5"/></svg>',
 bag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l1 14H5L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>',
 copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>'
};
const CHIPS = ["¿Cómo obtener el NIE?","Visado de nómada digital","Hipoteca para no residentes","Colegio para mi hijo en Barcelona","¿Cómo darme de alta como autónomo?","¿Qué hacer el fin de semana?"];
const KEY="er-sol-chat-es-v1";
let state = load();
let busy=false, mode="demo", sample=null, ctrl=null;
const consoles=[];

function load(){ try{ return JSON.parse(sessionStorage.getItem(KEY))||{msgs:[]} }catch(e){ return {msgs:[]} } }
function save(){ try{ sessionStorage.setItem(KEY,JSON.stringify(state)) }catch(e){} }
function esc(s){ return s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])) }
function md(src){
  const lines=esc(src||"").split(/\n/); let out="",list=null;
  const inline=t=>t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/`([^`]+)`/g,"<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(m,a,h)=>`<a href="${h}"${/^https?:/.test(h)?' target="_blank" rel="noopener"':''}>${a}</a>`);
  const close=()=>{ if(list){ out+=`</${list}>`; list=null } };
  for(const raw of lines){
    const l=raw.trim();
    if(!l){ close(); continue }
    let m;
    if(m=l.match(/^#{1,4}\s+(.*)/)){ close(); out+=`<h4>${inline(m[1])}</h4>`; continue }
    if(m=l.match(/^[-•*]\s+(.*)/)){ if(list!=="ul"){ close(); out+="<ul>"; list="ul" } out+=`<li>${inline(m[1])}</li>`; continue }
    if(m=l.match(/^\d+[.)]\s+(.*)/)){ if(list!=="ol"){ close(); out+="<ol>"; list="ol" } out+=`<li>${inline(m[1])}</li>`; continue }
    close(); out+=`<p>${inline(l)}</p>`;
  }
  close(); return out;
}

/* ---------- knowledge helpers ---------- */
function norm(s){ return (s||"").toLowerCase().replace(/ё/g,"е") }
// a key matches only at the start of a word ("дет" → «дети», not «будет»)
function hasKey(t,key){ const k=norm(key).trim(); if(!k) return false; const re=new RegExp("(^|[^a-zа-яáéíóúñü0-9])"+k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")); return re.test(t) }
function searchKB(q,n=2){
  const t=" "+norm(q)+" ";
  return KB.map(k=>({k,s:k.keys.reduce((a,key)=>a+(hasKey(t,key)?key.length+3:0),0)+(hasKey(t,k.title)?5:0)}))
    .filter(x=>x.s>0).sort((a,b)=>b.s-a.s).slice(0,n).map(x=>x.k);
}
function findServices(q){
  const t=norm(q), hits=searchKB(q,2).flatMap(k=>k.svc||[]);
  const direct=SVC.filter(s=>t.split(/\s+/).some(w=>w.length>3&&norm(s.title+" "+s.d+" "+s.cat).includes(w.slice(0,5))));
  const ids=[...new Set([...hits,...direct.map(s=>s.id)])].slice(0,3);
  return ids.map(id=>SVC.find(s=>s.id===id)).filter(Boolean);
}

/* ---------- system prompt ---------- */
function system(){
  const today=new Date().toLocaleDateString("es-ES",{day:"numeric",month:"long",year:"numeric"});
  return `Ты — Sol, персональный ИИ-ассистент портала «Испания по-русски» (espanarusa.ai): первое русскоязычное СМИ об Испании (с 2007 года, ISSN 2462-4241) и сервисный центр (250 видов услуг, 150 компаний-партнёров, русскоязычные менеджеры).
Твоя задача — помогать русскоязычным людям со всеми вопросами жизни, переезда, документов, недвижимости, налогов, бизнеса, учёбы, медицины и досуга в Испании.
Правила:
- Отвечай на языке пользователя (на этой странице по умолчанию — испанский; если пишут по-русски — отвечай по-русски). Тон тёплый, уверенный, по делу.
- Структура: 1 короткая фраза-ответ, затем 3–6 пунктов или шагов с конкретикой; испанские термины давай в скобках или жирным. Используй markdown (**жирный**, списки, заголовки ####). Обычно не длиннее 170 слов.
- Сначала вызывай search_knowledge, чтобы опереться на проверенные материалы портала. Если не уверен в цифрах или закон мог измениться — скажи об этом и предложи проверку у специалиста. Не выдумывай законы, цены услуг, телефоны и адреса.
- Если вопросу нужна практическая помощь (документы, ВНЖ, юрист, недвижимость, ипотека, школа, врач) — вызови find_services и одной фразой предложи услугу. Если пользователь хочет живого человека, звонок или «заказать» — вызови offer_manager.
- Можно ссылаться на разделы сайта: [Noticias](news.html), [Hispanopedia](pedia.html), [Agenda](afisha.html), [Inmobiliaria](realestate.html), [Tienda de servicios](services.html), [Anuncios](ads.html).
- Не давай персональных инвестиционных рекомендаций и медицинских диагнозов.
Сегодня ${today}.`;
}

/* ---------- providers ---------- */
async function detectLive(){
  if(CFG.endpoint){ mode="live"; renderAll(); return }
  try{
    if(window.claude && typeof window.claude.use==="function"){
      sample = await Promise.race([window.claude.use("sample"), new Promise(r=>setTimeout(()=>r(null),10500))]);
      if(sample){ mode="live"; renderAll(); }
    }
  }catch(e){ sample=null }
}

async function answer(onText, extras){
  const history=state.msgs.filter(m=>(m.role==="user"||m.role==="assistant")&&m.content).slice(-12).map(m=>({role:m.role,content:m.content}));
  const lastQ=history[history.length-1].content;
  if(CFG.endpoint){
    const r=await fetch(CFG.endpoint,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({messages:history})});
    if(!r.ok||!r.body) throw new Error("endpoint");
    const rd=r.body.getReader(), dec=new TextDecoder(); let text="";
    for(;;){ const {done,value}=await rd.read(); if(done)break; text+=dec.decode(value,{stream:true}); onText(text) }
    extras.services=findServices(lastQ); return text;
  }
  if(sample){
    const input=history.map((m,i)=>i===0?{role:"user",content:system()+"\n\n---\nВопрос пользователя:\n"+m.content}:m);
    ctrl=new AbortController();
    const tools=[
      {name:"search_knowledge",description:"Поиск по проверенным материалам Испанопедии портала. Верни 1–2 статьи по теме.",inputSchema:{type:"object",properties:{query:{type:"string"}},required:["query"]},
       execute:({query})=>{ const r=searchKB(query,2); if(r[0]&&!extras.link) extras.link=r[0].link; return r.length?r.map(k=>({title:k.title,text:k.a})):{note:"В базе ничего не найдено, отвечай из общих знаний осторожно."} }},
      {name:"find_services",description:"Найти услуги в Магазине услуг портала по теме вопроса.",inputSchema:{type:"object",properties:{query:{type:"string"}},required:["query"]},
       execute:({query})=>{ const r=findServices(query); extras.services=r; return r.map(s=>({title:s.title,category:s.cat,about:s.d})) }},
      {name:"offer_manager",description:"Показать пользователю форму связи с живым менеджером (WhatsApp/звонок).",inputSchema:{type:"object",properties:{topic:{type:"string"}}},
       execute:({topic})=>{ extras.handoff=topic||lastQ; return {shown:true} }}
    ];
    const res=await sample(input,{onText:({text})=>onText(text),tools,modelTier:"default",cache:false,signal:ctrl.signal});
    return res.text;
  }
  // offline demo
  const hits=searchKB(lastQ,1);
  let text;
  if(/gestor|persona|humano|llam|contact|менеджер|человек|позвон|связат|заказ/i.test(lastQ)){
    text="¡Claro! Déjanos tu nombre y un contacto: un **gestor** de «España en ruso» te escribirá en horario laboral (lun–vie, 9:00–19:00 hora de España).";
    extras.handoff=lastQ;
  } else if(hits[0]){
    text=hits[0].a; extras.link=hits[0].link; extras.services=(hits[0].svc||[]).map(id=>SVC.find(s=>s.id===id)).filter(Boolean);
  } else {
    text=`Buena pregunta. En modo demo respondo a los temas más frecuentes: **NIE, residencia, hipoteca, alquiler, impuestos, autónomo, colegios, sanidad, carné de conducir, bancos, nacionalidad y ocio**.

Cuando me conecten a la base completa (70 000 artículos del portal), también podré responder a esto. Mientras tanto, puedo **pasar tu pregunta a un gestor**, que te contestará en español o en ruso.`;
    extras.handoff=lastQ;
  }
  const words=text.split(/(\s+)/); let acc="";
  await new Promise(r=>setTimeout(r,550));
  for(let i=0;i<words.length;i++){ acc+=words[i]; if(i%5===0){ onText(acc); await new Promise(r=>setTimeout(r,14)) } }
  onText(text); return text;
}

/* ---------- actions ---------- */
async function send(text){
  text=(text||"").trim(); if(!text||busy) return;
  state.msgs.push({role:"user",content:text});
  const a={role:"assistant",content:"",pending:true}; state.msgs.push(a);
  busy=true; renderAll();
  const extras={};
  try{
    const final=await answer(t=>{ a.content=t; a.pending=false; renderLast() }, extras);
    a.content=final||a.content;
  }catch(e){
    if(e&&e.code==="not_granted"){ sample=null; mode="demo"; state.msgs.pop(); state.msgs.pop(); busy=false; renderAll(); return send(text) }
    a.content=a.content||"Parece que se ha cortado la conexión. Inténtalo de nuevo o **escribe a un gestor**.";
    extras.handoff=extras.handoff||text;
  }
  a.pending=false; a.services=extras.services||[]; a.link=extras.link||null; a.handoff=extras.handoff?{topic:extras.handoff}:null;
  busy=false; save(); renderAll();
}
function reset(){ if(ctrl) try{ctrl.abort()}catch(e){}; state={msgs:[]}; busy=false; save(); renderAll() }

/* ---------- rendering ---------- */
function msgHTML(m,idx){
  if(m.role==="user") return `<div class="m u">${esc(m.content)}</div>`;
  let body = m.pending&&!m.content ? `<span class="typing"><i></i><i></i><i></i></span>` : md(m.content);
  let meta="";
  if(!m.pending && !busy || idx!==state.msgs.length-1){
    const svc=(m.services||[]).map(s=>`<div class="svc-card"><div class="ic">${I.bag}</div><div><b>${esc(s.title)}</b><span>${esc(s.cat)} · ${esc(s.d)}</span></div></div>`).join("");
    const chips=[];
    if(m.link) chips.push(`<a class="chip" href="${m.link[1]}">${I.book}${esc(m.link[0])}</a>`);
    if(m.content && !m.handoff) chips.push(`<button data-act="handoff" data-i="${idx}">${I.person}Hablar con un gestor</button>`);
    if(m.content) chips.push(`<button data-act="copy" data-i="${idx}">${I.copy}Copiar</button>`);
    meta = (svc?`<div style="margin-top:8px">${svc}</div>`:"") + (chips.length?`<div class="meta">${chips.join("")}</div>`:"") + (m.handoff?handoffHTML(m,idx):"");
  }
  return `<div class="m a"><div class="sol sm${m.pending?" thinking":""}"></div><div style="min-width:0;flex:1"><div class="bub">${body}</div>${meta}</div></div>`;
}
function handoffHTML(m,idx){
  if(m.handoff.sent){
    return `<div class="handoff"><div class="ok">¡Listo, ${esc(m.handoff.name)}! Abre <a href="${m.handoff.url}" target="_blank" rel="noopener">WhatsApp</a> y pulsa «Enviar»: un gestor verá tu pregunta. O llámanos: <b>${CFG.phone}</b>.</div></div>`;
  }
  return `<form class="handoff" data-hand="${idx}"><b>Pasar la pregunta a un gestor</b><div class="row"><input name="n" placeholder="Tu nombre" required><input name="c" placeholder="Teléfono o Telegram" required><button class="btn btn-saff btn-sm" type="submit">Enviar</button></div></form>`;
}
function consoleHTML(o){
  return `<div class="console">
  <div class="console-h"><div class="sol"></div><div class="t"><b>Sol · asistente de IA</b><span class="${mode==="live"?"":"demo"}" data-mode>${mode==="live"?"En línea · responde al momento":"Modo demo · preguntas frecuentes"}</span></div>
   <div class="act"><button data-act="new" title="Nueva conversación" aria-label="Nueva conversación">${I.plus}</button>${o.expand?`<a href="assistant.html" title="Abrir a pantalla completa" aria-label="Pantalla completa"><button tabindex="-1">${I.expand}</button></a>`:""}${o.close?`<button data-act="close" aria-label="Cerrar">${I.close}</button>`:""}</div></div>
  <div class="msgs" aria-live="polite"></div>
  <div class="chips"></div>
  <div class="composer"><form><textarea rows="1" placeholder="Pregunta sobre España…" aria-label="Tu pregunta"></textarea><button class="send" type="submit" aria-label="Enviar">${I.send}</button></form>
  <div class="fine"><button type="button" data-act="handoff-new">Hablar con un gestor</button></div></div>
 </div>`;
}
function render(c){
  const msgs=c.el.querySelector(".msgs"), chips=c.el.querySelector(".chips");
  const modeEl=c.el.querySelector("[data-mode]");
  modeEl.textContent= mode==="live"?"En línea · responde al momento":"Modo demo · preguntas frecuentes"; modeEl.className= mode==="live"?"":"demo";
  if(!state.msgs.length){
    msgs.innerHTML=`<div class="welcome"><h3>¡Hola! Soy Sol.</h3><p>Tu asistente personal para la vida en España: documentos, residencia, vivienda, impuestos, colegios, médicos y ocio. Pregunta con tus palabras, en español o en ruso.</p></div>`;
    c.seen=0; chips.innerHTML=CHIPS.map(t=>`<button type="button">${t}</button>`).join(""); chips.style.display="";
  } else {
    const seen=+(c.seen||0); msgs.innerHTML=state.msgs.map(msgHTML).join(""); [...msgs.children].forEach((el,i)=>{ if(i<seen) el.style.animation="none" }); c.seen=state.msgs.length; chips.style.display="none";
  }
  c.el.querySelector(".send").disabled=busy;
  msgs.scrollTop=msgs.scrollHeight;
}
function renderAll(){ consoles.forEach(render) }
function renderLast(){
  consoles.forEach(c=>{ const msgs=c.el.querySelector(".msgs"); const last=msgs.lastElementChild; const i=state.msgs.length-1;
    if(!last){ render(c); return }
    const m=state.msgs[i], bub=last.querySelector(".bub");
    if(bub && m.content){ bub.innerHTML=md(m.content); const s=last.querySelector(".sol"); if(s) s.classList.remove("thinking") }
    else { const tmp=document.createElement("div"); tmp.innerHTML=msgHTML(m,i); last.replaceWith(tmp.firstElementChild) }
    msgs.scrollTop=msgs.scrollHeight; });
}

function mount(el,o={}){
  el.innerHTML=consoleHTML(o);
  const c={el,o}; consoles.push(c);
  const ta=el.querySelector("textarea"), form=el.querySelector(".composer form");
  ta.addEventListener("input",()=>{ ta.style.height="auto"; ta.style.height=Math.min(ta.scrollHeight,130)+"px" });
  ta.addEventListener("keydown",e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); form.requestSubmit() } });
  form.addEventListener("submit",e=>{ e.preventDefault(); const v=ta.value; ta.value=""; ta.style.height="auto"; send(v) });
  el.addEventListener("click",e=>{
    const chip=e.target.closest(".chips button"); if(chip){ send(chip.textContent); return }
    const b=e.target.closest("[data-act]"); if(!b) return;
    const act=b.dataset.act;
    if(act==="new") reset();
    if(act==="close") ER.closeDrawer();
    if(act==="copy"){ const m=state.msgs[+b.dataset.i]; try{ navigator.clipboard.writeText(m.content).then(()=>{ b.lastChild.textContent="Copiado" }).catch(()=>{}) }catch(err){} }
    if(act==="handoff"){ const m=state.msgs[+b.dataset.i]; m.handoff={topic:state.msgs[+b.dataset.i-1]?.content||""}; save(); renderAll() }
    if(act==="handoff-new"){ state.msgs.push({role:"assistant",content:"Con gusto te pongo en contacto con un **gestor**. Déjanos tu nombre y un contacto:",handoff:{topic:"Consulta general"}}); save(); renderAll() }
  });
  el.addEventListener("submit",e=>{
    const f=e.target.closest("form[data-hand]"); if(!f) return; e.preventDefault();
    const m=state.msgs[+f.dataset.hand], n=f.n.value.trim(), ct=f.c.value.trim();
    const txt=`¡Hola! Me llamo ${n}. Consulta desde espanarusa.ai: ${m.handoff.topic}. Mi contacto: ${ct}`;
    m.handoff=Object.assign(m.handoff,{sent:true,name:n,url:`https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(txt)}`});
    save(); renderAll();
  });
  render(c);
  if(o.autofocus && !location.hash) setTimeout(()=>ta.focus({preventScroll:true}),300);
  return c;
}

/* drawer + FAB */
function setupDrawer(){
  if(document.body.dataset.nodrawer!==undefined) return;
  const fab=document.createElement("button"); fab.className="fab"; fab.innerHTML=`<div class="sol"></div><div style="text-align:left"><b>Preguntar a Sol</b><span>Asistente de IA · 24/7</span></div>`;
  const d=document.createElement("div"); d.className="drawer"; d.innerHTML=`<div class="scrim"></div><div class="panel"></div>`;
  document.body.append(fab,d);
  let mounted=false;
  ER.openDrawer=(q)=>{ if(!mounted){ mount(d.querySelector(".panel"),{close:true,expand:true}); mounted=true } d.classList.add("open"); fab.classList.add("hide"); document.body.style.overflow="hidden"; if(q) send(q); setTimeout(()=>d.querySelector("textarea").focus(),350) };
  ER.closeDrawer=()=>{ d.classList.remove("open"); fab.classList.remove("hide"); document.body.style.overflow="" };
  fab.onclick=()=>ER.openDrawer();
  d.querySelector(".scrim").onclick=ER.closeDrawer;
  addEventListener("keydown",e=>{ if(e.key==="Escape") ER.closeDrawer() });
  const hero=document.querySelector("[data-console-hero]");
  if(hero && "IntersectionObserver" in window){ new IntersectionObserver(([en])=>fab.classList.toggle("hide",en.isIntersecting&&!d.classList.contains("open")),{threshold:.2}).observe(hero) }
}

window.ER=window.ER||{};
ER.mount=mount; ER.ask=(q)=>{ const hero=document.querySelector("[data-console-hero]");
  if(hero && hero.getBoundingClientRect().top>-200 && hero.getBoundingClientRect().bottom<innerHeight+300 && consoles.find(c=>c.el===hero)){ hero.scrollIntoView({behavior:"smooth",block:"center"}); send(q) }
  else if(ER.openDrawer) ER.openDrawer(q); else send(q) };
ER.send=send;

document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll("[data-console]").forEach(el=>mount(el,{expand:el.dataset.console!=="full",autofocus:el.dataset.console==="full"}));
  setupDrawer();
  document.addEventListener("click",e=>{ const a=e.target.closest("[data-ask]"); if(a){ e.preventDefault(); ER.ask(a.dataset.ask) } });
  const q=new URLSearchParams(location.search).get("q"); if(q && document.querySelector("[data-console]")) send(q);
  detectLive();
});
})();

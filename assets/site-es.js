(function(){
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
document.addEventListener("DOMContentLoaded",()=>{
  const hdr=$(".hdr"); const onS=()=>{ if(!hdr) return; const y=scrollY; if(y>140) hdr.classList.add("scrolled"); else if(y<24) hdr.classList.remove("scrolled") }; onS(); addEventListener("scroll",onS,{passive:true});
  const td=$("[data-today]"); if(td){ try{ const t=new Date().toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long",year:"numeric"}); td.textContent=t.charAt(0).toUpperCase()+t.slice(1) }catch(e){} }
  const bg=$(".burger"); if(bg) bg.onclick=()=>hdr.classList.toggle("menu-open");
  // reveal
  if("IntersectionObserver" in window){ const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target) } }),{rootMargin:"0px 0px -8% 0px"}); $$(".rv").forEach(el=>io.observe(el)) } else $$(".rv").forEach(el=>el.classList.add("in"));
  // filter pills
  $$("[data-filter]").forEach(group=>{
    group.addEventListener("click",e=>{ const p=e.target.closest(".pill"); if(!p) return;
      $$(".pill",group).forEach(x=>x.classList.toggle("on",x===p));
      const v=p.dataset.v, target=$(group.dataset.filter);
      $$("[data-cat]",target).forEach(it=>it.style.display=(v==="all"||it.dataset.cat.split(" ").includes(v))?"":"none");
    });
  });
  // ask lines (inner pages)
  $$("form.askline").forEach(f=>f.addEventListener("submit",e=>{ e.preventDefault(); const v=f.q.value.trim(); if(!v) return; f.q.value=""; window.ER&&ER.ask(v) }));
  // newsletter
  $$("form[data-subscribe]").forEach(f=>f.addEventListener("submit",e=>{ e.preventDefault(); f.innerHTML='<p style="font-weight:600">¡Gracias! Recibirás la confirmación por e-mail en cuanto la suscripción esté activa.</p>' }));
  // modal (callback / order)
  const modal=$("#modal");
  $$("[data-order]").forEach(b=>b.addEventListener("click",()=>{ if(!modal) return; $("#modal-title").textContent=b.dataset.order||"Pedir una llamada"; $("#modal-form").style.display=""; $("#modal-done").style.display="none"; modal.classList.add("open") }));
  if(modal){
    modal.addEventListener("click",e=>{ if(e.target===modal||e.target.closest(".x")) modal.classList.remove("open") });
    $("#modal-form").addEventListener("submit",e=>{ e.preventDefault(); const f=e.target;
      const t=`¡Hola! ${f.n.value}. Asunto: ${$("#modal-title").textContent}. Contacto: ${f.c.value}. ${f.m.value||""}`.trim();
      const url=`https://wa.me/34690246487?text=${encodeURIComponent(t)}`;
      f.style.display="none"; const d=$("#modal-done"); d.style.display=""; d.innerHTML=`¡Casi listo! Abre <a href="${url}" target="_blank" rel="noopener">WhatsApp</a> y pulsa «Enviar»: un gestor te responderá en horario laboral. O llámanos: <b>+34 93 272 64 90</b>.`;
    });
  }
  // mortgage calculator
  const calc=$("#calc");
  if(calc){
    const f=v=>new Intl.NumberFormat("es-ES",{maximumFractionDigits:0}).format(v)+" €";
    const upd=()=>{ const p=+calc.price.value, dp=+calc.down.value, r=+calc.rate.value/100/12, n=+calc.years.value*12, tax=+calc.tax.value/100;
      const loan=p*(1-dp/100), pay=r?loan*r/(1-Math.pow(1+r,-n)):loan/n;
      $("#v-price").textContent=f(p); $("#v-down").textContent=dp+"%"; $("#v-rate").textContent=(+calc.rate.value).toFixed(2)+"%"; $("#v-years").textContent=calc.years.value+" años"; $("#v-tax").textContent=calc.tax.value+"%";
      $("#o-pay").textContent=f(pay); $("#o-loan").textContent=f(loan); $("#o-down").textContent=f(p*dp/100); $("#o-tax").textContent=f(p*tax+p*0.015); $("#o-cash").textContent=f(p*dp/100+p*tax+p*0.015); $("#o-total").textContent=f(pay*n);
    };
    calc.addEventListener("input",upd); upd();
  }
  // Sol plans: billing toggle + start free
  const bill=$(".bill"); if(bill) bill.addEventListener("click",e=>{ const b=e.target.closest("button"); if(!b) return; const y=b.dataset.bill==="y";
    $$("button",bill).forEach(x=>x.classList.toggle("on",x===b));
    $$(".price[data-m]").forEach(p=>{ $("b",p).textContent=y?p.dataset.y:p.dataset.m; const sp=$("span",p); sp.textContent=y?sp.dataset.y:sp.dataset.m }) });
  $$("[data-top]").forEach(a=>a.addEventListener("click",e=>{ e.preventDefault(); scrollTo({top:0,behavior:"smooth"}); const t=$(".ap textarea, [data-console-hero] textarea"); if(t) setTimeout(()=>t.focus({preventScroll:true}),500) }));
  // A–Z pedia
  const az=$(".az"); if(az) az.addEventListener("click",e=>{ const b=e.target.closest("button"); if(!b) return; $$("button",az).forEach(x=>x.classList.toggle("on",x===b)); const h=$("#L-"+b.textContent); if(h) h.scrollIntoView({behavior:"smooth",block:"start"}) });
  // pedia search
  const ps=$("#pedia-search"); if(ps) ps.addEventListener("input",()=>{ const q=ps.value.toLowerCase(); $$(".pedia-list a").forEach(a=>a.style.display=a.textContent.toLowerCase().includes(q)?"":"none") });
});
})();

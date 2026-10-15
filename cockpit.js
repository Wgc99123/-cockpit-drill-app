(()=>{
  const COCKPITS={
    vp:{
      name:'Viper 600',chip:'vp',img:'assets/viper-cockpit.jpg',
      spots:[
        {id:'ias',label:'Fahrtmesser',x:18.2,y:20.2,w:11.0,h:15.5,info:'Großes Rundinstrument links oben mit Fahrt-Skala.'},
        {id:'alt',label:'Höhenmesser',x:38.2,y:20.7,w:10.0,h:14.8,info:'Rundes ALT-Instrument im oberen Mittelteil.'},
        {id:'rpm',label:'Drehzahlmesser',x:19.8,y:34.7,w:11.2,h:13.5,info:'RPM-Instrument links unter dem Fahrtmesser.'},
        {id:'ign',label:'Magnet-/Zündschalter',x:3.5,y:42.2,w:7.0,h:9.0,info:'Links unten: OFF / R / L / BOTH / START.'},
        {id:'start',label:'Startknopf',x:4.8,y:37.3,w:5.3,h:6.0,info:'Silberner Taster mit Beschriftung START.'},
        {id:'master',label:'MASTER / INSTR / GENR',x:10.4,y:40.0,w:10.7,h:10.0,info:'Rotes Dreifach-Schalterfeld links unten.'},
        {id:'com',label:'COM-Funkgerät',x:47.5,y:12.7,w:7.0,h:9.2,info:'Kleines Funkgerät oben mittig-rechts mit COM-Beschriftung.'},
        {id:'flaps',label:'FLAPS-Anzeige',x:40.8,y:33.0,w:4.6,h:13.2,info:'Vertikale FLAPS-Anzeige mit den Klappenstellungen.'},
        {id:'choke',label:'CHOKE',x:48.0,y:41.0,w:5.6,h:5.2,info:'Runder Zugknopf mit CHOKE-Beschriftung.'},
        {id:'fuelpump',label:'FUEL PUMP',x:27.7,y:43.0,w:5.9,h:4.7,info:'Schalter in der unteren Schalterreihe mit FUEL-PUMP-Beschriftung.'}
      ]
    },
    dr:{
      name:'Robin DR400',chip:'dr',img:'assets/dr400-cockpit.jpg',
      spots:[
        {id:'ias',label:'Fahrtmesser',x:12.0,y:27.5,w:10.2,h:14.0,info:'Großes Rundinstrument links oben mit Fahrt-Skala.'},
        {id:'alt',label:'Höhenmesser',x:31.5,y:28.7,w:9.1,h:12.8,info:'Rundes ALT-Instrument oben mittig-links.'},
        {id:'rpm',label:'Drehzahlmesser',x:43.2,y:29.0,w:9.1,h:12.6,info:'Rundes RPM-Instrument mit grünem Betriebsbereich.'},
        {id:'mp',label:'Manifold Pressure',x:52.2,y:29.3,w:8.1,h:11.7,info:'Kleineres Instrument rechts neben dem Drehzahlmesser, beschriftet MANIFOLD PRESS.'},
        {id:'compass',label:'Magnetkompass',x:50.5,y:1.2,w:8.5,h:10.5,info:'Kompass oben auf dem Blendschutz.'},
        {id:'vsi',label:'Variometer',x:23.1,y:54.7,w:10.4,h:12.5,info:'Rundes Instrument unten links-mittig, beschriftet VERTICAL SPEED.'},
        {id:'mainfuel',label:'Haupttank-Anzeige · 115 LITER',x:42.6,y:57.1,w:8.4,h:10.6,info:'Runde Tankanzeige mit der Aufschrift 115 LITER.'},
        {id:'auxfuel',label:'ZUSATZTANK-Anzeige',x:51.4,y:57.3,w:9.4,h:10.4,info:'Runde Anzeige mit der Beschriftung ZUSATZTANK.'},
        {id:'battmag',label:'Batterie / Magnet / Start',x:9.0,y:69.2,w:15.2,h:9.2,info:'Links unten: Batterie-Schalter und Magnet-/Startschloss.'},
        {id:'fuelpump',label:'BENZINPUMPE',x:44.4,y:50.0,w:7.1,h:5.2,info:'Schalterbereich unter der Motorinstrumentenzeile mit BENZINPUMPE-Beschriftung.'},
        {id:'prop',label:'Propellerverstellung · blau',x:50.0,y:65.1,w:7.0,h:10.0,info:'Blauer Bedienknopf der Propellerverstellung.'},
        {id:'mixture',label:'Gemisch · rot',x:58.5,y:66.5,w:7.0,h:10.0,info:'Roter Gemisch-Bedienknopf.'}
      ]
    }
  };

  let C={ac:null,mode:null,order:[],i:0,score:0,answered:false,selected:null,showAll:false};
  const css=document.createElement('style');
  css.textContent=`
    .cp-grid{display:grid;gap:14px}.cp-card,.cp-panel{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:12px}
    .cp-card img,.cp-stage img{width:100%;height:auto;display:block;border-radius:12px;border:1px solid var(--line)}
    .cp-card h3,.cp-panel h3{margin:4px 0 0;font-size:22px;line-height:1.1}.cp-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .cp-stage{position:relative;margin-top:10px}.cp-target{position:absolute;border:2px solid transparent;border-radius:9px;background:transparent;padding:0;cursor:pointer}
    .cp-target.learn{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 22%,transparent)}
    .cp-target.showall{border-color:rgba(255,255,255,.48);background:rgba(255,255,255,.08)}
    .cp-target.ok,.cp-target.reveal{border-color:#27d17c;background:rgba(39,209,124,.22)}.cp-target.bad{border-color:#ff6b6b;background:rgba(255,107,107,.20)}
    .cp-list{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.cp-status{display:flex;justify-content:space-between;align-items:center;gap:10px;margin:6px 0 0}
    .cp-q{font-size:19px;font-weight:700;margin:6px 0 4px}.cp-help{color:var(--muted)}.cp-info{margin-top:10px}
    @media (min-width:900px){.cp-grid{grid-template-columns:1fr 1fr}}
  `;
  document.head.appendChild(css);

  const tag=ac=>ac==='vp'?'<span class="chip vp">Viper</span>':'<span class="chip dr">DR400</span>';
  const hotspot=(s,cl='')=>`<button class="cp-target ${cl}" data-cpid="${s.id}" style="left:${s.x}%;top:${s.y}%;width:${s.w}%;height:${s.h}%" aria-label="${s.label}"></button>`;

  function card(ac){const c=COCKPITS[ac];return `<section class="cp-card">${tag(ac)}<h3>${c.name}</h3><img src="${c.img}" alt="${c.name} Cockpit"><p class="note">${c.spots.length} eindeutig erkennbare Instrumente und Bedienelemente.</p><div class="cp-actions"><button class="btn" data-act="cockpit-learn" data-cp="${ac}">Lernmodus</button><button class="btn primary" data-act="cockpit-quiz" data-cp="${ac}">Quizmodus</button></div></section>`}
  function hub(){main.innerHTML=`<h2>Cockpit-Drill</h2><p class="note">Es sind bewusst nur Elemente markiert, die auf den Fotos eindeutig erkennbar sind. Im Quiz tippst du direkt auf das gesuchte Instrument oder Bedienelement.</p><div class="cp-grid">${card('vp')}${card('dr')}</div><div class="grid2" style="margin-top:12px"><button class="btn primary" data-act="cockpit-mixed">Gemischtes Quiz</button><button class="btn" data-act="home">Startseite</button></div>`}
  function learn(ac){const c=COCKPITS[ac],sel=c.spots.find(s=>s.id===C.selected);let o=C.showAll?c.spots.map(s=>hotspot(s,'showall')).join(''):'';if(sel)o+=hotspot(sel,'learn');main.innerHTML=`<div class="cp-panel">${tag(ac)}<h3>${c.name} · Lernmodus</h3><p class="cp-help">Wähle unten einen Begriff. Die Position wird im Cockpit markiert.</p><div class="cp-stage"><img src="${c.img}" alt="${c.name} Cockpit">${o}</div><div class="grid2" style="margin-top:10px"><button class="btn" data-act="cockpit-toggle-all">${C.showAll?'Marker ausblenden':'Alle Marker zeigen'}</button><button class="btn" data-act="cockpit-back">Übersicht</button></div><div class="cp-list">${c.spots.map(s=>`<button class="btn ${sel&&sel.id===s.id?'primary':''}" data-act="cockpit-picklearn" data-cp="${ac}" data-cpid="${s.id}">${s.label}</button>`).join('')}</div>${sel?`<div class="fb ok cp-info"><b>${sel.label}</b><br>${sel.info}</div>`:''}</div>`}
  function start(mode,ac){C={ac:ac||null,mode,order:[],i:0,score:0,answered:false,selected:null,showAll:false};const add=k=>COCKPITS[k].spots.map(s=>({ac:k,spot:s}));C.order=shuffle(ac?add(ac):add('vp').concat(add('dr')));tab='cockpit-quiz';quiz();window.scrollTo(0,0)}
  function quiz(){const it=C.order[C.i];if(!it)return end();const c=COCKPITS[it.ac];let o='';for(const s of c.spots){let cl='';if(C.answered){if(C.selected===s.id&&s.id===it.spot.id)cl='ok';else if(C.selected===s.id)cl='bad';else if(s.id===it.spot.id)cl='reveal'}o+=`<button class="cp-target ${cl}" data-act="cockpit-answer" data-cpid="${s.id}" style="left:${s.x}%;top:${s.y}%;width:${s.w}%;height:${s.h}%" aria-label="${s.label}" ${C.answered?'disabled':''}></button>`}main.innerHTML=`<div class="cp-panel">${tag(it.ac)}<div class="cp-status"><div><span class="lbl">Cockpit-Quiz</span><div class="cp-q">Tippe: ${it.spot.label}</div></div><span class="chip">${C.i+1} / ${C.order.length}</span></div><p class="cp-help">${C.mode==='mixed'?'Viper und DR400 gemischt.':'Nur '+c.name+'.'} Stand: <b>${C.score}</b> richtig.</p><div class="cp-stage"><img src="${c.img}" alt="${c.name} Cockpit">${o}</div>${C.answered?`<div class="fb ${C.selected===it.spot.id?'ok':'bad'} cp-info"><b>${it.spot.label}</b><br>${it.spot.info}</div><div class="grid2" style="margin-top:10px"><button class="btn primary" data-act="cockpit-next">Nächste Frage</button><button class="btn" data-act="cockpit-back">Beenden</button></div>`:'<div class="grid2" style="margin-top:10px"><button class="btn" data-act="cockpit-back">Übersicht</button><button class="btn" data-act="cockpit-skip">Überspringen</button></div>'}</div>`}
  function end(){main.innerHTML=`<div class="cp-panel"><span class="lbl">Cockpit-Quiz beendet</span><h3>${C.score} / ${C.order.length} richtig</h3><p class="note">Direkt wiederholen oder zurück zur Übersicht.</p><div class="grid2"><button class="btn primary" data-act="cockpit-restart">Nochmal</button><button class="btn" data-act="cockpit-back">Übersicht</button></div></div>`}
  function answer(id){if(C.answered)return;const it=C.order[C.i];C.selected=id;C.answered=true;if(id===it.spot.id)C.score++;quiz()}

  const home0=renderHome;renderHome=function(){home0();if(document.querySelector('#b-cockpit-drill'))return;const b=document.createElement('button');b.className='btn block';b.id='b-cockpit-drill';b.dataset.act='cockpit';b.textContent='Cockpit-Drill · Viper & DR400';const r=document.querySelector('#b-millionaire')||document.querySelector('#b-session');if(r)r.insertAdjacentElement('afterend',b)};
  const render0=render;render=function(){if(tab==='cockpit')hub();else if(tab==='cockpit-learn'&&C.ac)learn(C.ac);else if(tab==='cockpit-quiz')quiz();else render0()};
  document.addEventListener('click',e=>{const el=e.target.closest('[data-act]');if(!el)return;const a=el.dataset.act;if(a==='cockpit'){tab='cockpit';render();window.scrollTo(0,0)}else if(a==='cockpit-back'){tab='cockpit';render();window.scrollTo(0,0)}else if(a==='cockpit-learn'){C.ac=el.dataset.cp;C.selected=null;C.showAll=false;tab='cockpit-learn';render();window.scrollTo(0,0)}else if(a==='cockpit-picklearn'){C.ac=el.dataset.cp;C.selected=el.dataset.cpid;render()}else if(a==='cockpit-toggle-all'){C.showAll=!C.showAll;render()}else if(a==='cockpit-quiz')start('single',el.dataset.cp);else if(a==='cockpit-mixed')start('mixed',null);else if(a==='cockpit-answer')answer(el.dataset.cpid);else if(a==='cockpit-next'){C.i++;C.answered=false;C.selected=null;quiz();window.scrollTo(0,0)}else if(a==='cockpit-skip'){C.i++;C.answered=false;C.selected=null;quiz()}else if(a==='cockpit-restart')start(C.mode||'mixed',C.mode==='single'?C.ac:null)});
  if(tab==='home')render();
})();
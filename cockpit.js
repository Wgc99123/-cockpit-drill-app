(()=>{
  const COCKPITS={
    vp:{name:'Viper 600',chip:'vp',img:'assets/viper-cockpit-hq.jpg',spots:[
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
    ]},
    dr:{name:'Robin DR400',chip:'dr',img:'assets/dr400-cockpit-hq.jpg',spots:[
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
    ]}
  };

  let C={ac:null,mode:null,order:[],i:0,score:0,answered:false,selected:null,showAll:false,zoom:1};
  let viewer=null,viewerScale=1,viewerAc=null,pinchStart=null,pinchScale=1;
  const css=document.createElement('style');
  css.textContent=`
    .cp-grid{display:grid;gap:14px}.cp-card,.cp-panel{background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:12px}
    .cp-card img{width:100%;height:auto;display:block;border-radius:12px;border:1px solid var(--line)}
    .cp-card h3,.cp-panel h3{margin:4px 0 0;font-size:22px;line-height:1.1}.cp-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .cp-toolbar{display:grid;grid-template-columns:auto auto auto 1fr;gap:8px;align-items:center;margin-top:10px}.cp-toolbar .btn{min-height:38px;padding:7px 10px}
    .cp-zoom-shell{overflow:auto;max-height:72vh;border-radius:12px;border:1px solid var(--line);background:#06090c;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;touch-action:pan-x pan-y}
    .cp-zoom-content{position:relative;width:100%;min-width:100%;transform-origin:top left}.cp-zoom-content img{width:100%;height:auto;display:block;user-select:none;-webkit-user-drag:none}
    .cp-target{position:absolute;border:2px solid transparent;border-radius:9px;background:transparent;padding:0;cursor:pointer}
    .cp-target.learn{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 22%,transparent)}.cp-target.showall{border-color:rgba(255,255,255,.48);background:rgba(255,255,255,.08)}
    .cp-target.ok,.cp-target.reveal{border-color:#27d17c;background:rgba(39,209,124,.22)}.cp-target.bad{border-color:#ff6b6b;background:rgba(255,107,107,.20)}
    .cp-list{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.cp-status{display:flex;justify-content:space-between;align-items:center;gap:10px;margin:6px 0 0}
    .cp-q{font-size:19px;font-weight:700;margin:6px 0 4px}.cp-help{color:var(--muted)}.cp-info{margin-top:10px}.cp-zoom-label{font:700 12px var(--f-mono);text-align:center;color:var(--muted)}
    .cp-viewer{position:fixed;inset:0;z-index:10000;background:#000;display:flex;flex-direction:column;padding:env(safe-area-inset-top) 0 env(safe-area-inset-bottom)}
    .cp-viewer[hidden]{display:none!important}.cp-viewer-bar{display:flex;gap:8px;align-items:center;padding:10px 12px;background:#0c1117;border-bottom:1px solid #26323c;flex-wrap:wrap}
    .cp-viewer-title{font-weight:700;flex:1;min-width:140px}.cp-viewer .btn{min-height:38px;padding:7px 10px}
    .cp-viewer-shell{flex:1;overflow:auto;background:#000;touch-action:pan-x pan-y;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}
    .cp-viewer-content{position:relative;width:100%;min-width:100%}.cp-viewer-content img{width:100%;height:auto;display:block;user-select:none;-webkit-user-drag:none}
    .cp-viewer-note{font-size:12px;color:#aeb7c0;padding:7px 12px;background:#0c1117}
    @media (orientation:landscape){.cp-zoom-shell{max-height:78vh}.cp-viewer-content{width:100%}}
    @media (min-width:900px){.cp-grid{grid-template-columns:1fr 1fr}}
  `;
  document.head.appendChild(css);

  const tag=ac=>ac==='vp'?'<span class="chip vp">Viper</span>':'<span class="chip dr">DR400</span>';
  const hotspot=(s,cl='',disabled=false)=>`<button class="cp-target ${cl}" data-cpid="${s.id}" style="left:${s.x}%;top:${s.y}%;width:${s.w}%;height:${s.h}%" aria-label="${s.label}" ${disabled?'disabled':''}></button>`;
  function stage(c,overlay=''){return `<div class="cp-toolbar"><button class="btn" data-act="cp-zoom-out">−</button><button class="btn" data-act="cp-zoom-reset">100%</button><button class="btn" data-act="cp-zoom-in">+</button><button class="btn" data-act="cockpit-view" data-cp="${C.ac||''}">Bild groß ansehen</button></div><div class="cp-zoom-label">Zoom: <span id="cp-zoom-pct">${Math.round(C.zoom*100)}%</span> · mit zwei Fingern zoomen oder +/− nutzen</div><div class="cp-zoom-shell" id="cp-zoom-shell"><div class="cp-zoom-content" id="cp-zoom-content" style="width:${C.zoom*100}%"><img src="${c.img}" alt="${c.name} Cockpit">${overlay}</div></div>`}

  function card(ac){const c=COCKPITS[ac];return `<section class="cp-card">${tag(ac)}<h3>${c.name}</h3><img src="${c.img}" alt="${c.name} Cockpit"><p class="note">${c.spots.length} eindeutig erkennbare Instrumente und Bedienelemente. Das Foto kann separat in Vollansicht geöffnet und gezoomt werden.</p><div class="cp-actions"><button class="btn" data-act="cockpit-view" data-cp="${ac}">Nur Bild ansehen</button><button class="btn" data-act="cockpit-learn" data-cp="${ac}">Lernmodus</button></div><button class="btn primary block" data-act="cockpit-quiz" data-cp="${ac}" style="margin-top:8px">Quizmodus</button></section>`}
  function hub(){main.innerHTML=`<h2>Cockpit-Drill</h2><p class="note">Die Fotos sind jetzt in hoher Auflösung direkt in der App hinterlegt. Für Details: „Nur Bild ansehen“ öffnen, dann zoomen oder das iPhone ins Querformat drehen.</p><div class="cp-grid">${card('vp')}${card('dr')}</div><div class="grid2" style="margin-top:12px"><button class="btn primary" data-act="cockpit-mixed">Gemischtes Quiz</button><button class="btn" data-act="home">Startseite</button></div>`}
  function learn(ac){const c=COCKPITS[ac],sel=c.spots.find(s=>s.id===C.selected);let o=C.showAll?c.spots.map(s=>hotspot(s,'showall')).join(''):'';if(sel)o+=hotspot(sel,'learn');C.ac=ac;main.innerHTML=`<div class="cp-panel">${tag(ac)}<h3>${c.name} · Lernmodus</h3><p class="cp-help">Wähle unten einen Begriff. Die Position wird im Cockpit markiert. Du kannst das Bild vergrößern und innerhalb des Bildes scrollen.</p>${stage(c,o)}<div class="grid2" style="margin-top:10px"><button class="btn" data-act="cockpit-toggle-all">${C.showAll?'Marker ausblenden':'Alle Marker zeigen'}</button><button class="btn" data-act="cockpit-back">Übersicht</button></div><div class="cp-list">${c.spots.map(s=>`<button class="btn ${sel&&sel.id===s.id?'primary':''}" data-act="cockpit-picklearn" data-cp="${ac}" data-cpid="${s.id}">${s.label}</button>`).join('')}</div>${sel?`<div class="fb ok cp-info"><b>${sel.label}</b><br>${sel.info}</div>`:''}</div>`;bindPinch()}
  function start(mode,ac){C={ac:ac||null,mode,order:[],i:0,score:0,answered:false,selected:null,showAll:false,zoom:1};const add=k=>COCKPITS[k].spots.map(s=>({ac:k,spot:s}));C.order=shuffle(ac?add(ac):add('vp').concat(add('dr')));tab='cockpit-quiz';quiz();window.scrollTo(0,0)}
  function quiz(){const it=C.order[C.i];if(!it)return end();const c=COCKPITS[it.ac];C.ac=it.ac;let o='';for(const s of c.spots){let cl='';if(C.answered){if(C.selected===s.id&&s.id===it.spot.id)cl='ok';else if(C.selected===s.id)cl='bad';else if(s.id===it.spot.id)cl='reveal'}o+=`<button class="cp-target ${cl}" data-act="cockpit-answer" data-cpid="${s.id}" style="left:${s.x}%;top:${s.y}%;width:${s.w}%;height:${s.h}%" aria-label="${s.label}" ${C.answered?'disabled':''}></button>`}main.innerHTML=`<div class="cp-panel">${tag(it.ac)}<div class="cp-status"><div><span class="lbl">Cockpit-Quiz</span><div class="cp-q">Tippe: ${it.spot.label}</div></div><span class="chip">${C.i+1} / ${C.order.length}</span></div><p class="cp-help">${C.mode==='mixed'?'Viper und DR400 gemischt.':'Nur '+c.name+'.'} Stand: <b>${C.score}</b> richtig. Bei Bedarf vor dem Tippen zoomen.</p>${stage(c,o)}${C.answered?`<div class="fb ${C.selected===it.spot.id?'ok':'bad'} cp-info"><b>${it.spot.label}</b><br>${it.spot.info}</div><div class="grid2" style="margin-top:10px"><button class="btn primary" data-act="cockpit-next">Nächste Frage</button><button class="btn" data-act="cockpit-back">Beenden</button></div>`:'<div class="grid2" style="margin-top:10px"><button class="btn" data-act="cockpit-back">Übersicht</button><button class="btn" data-act="cockpit-skip">Überspringen</button></div>'}</div>`;bindPinch()}
  function end(){main.innerHTML=`<div class="cp-panel"><span class="lbl">Cockpit-Quiz beendet</span><h3>${C.score} / ${C.order.length} richtig</h3><p class="note">Direkt wiederholen oder zurück zur Übersicht.</p><div class="grid2"><button class="btn primary" data-act="cockpit-restart">Nochmal</button><button class="btn" data-act="cockpit-back">Übersicht</button></div></div>`}
  function answer(id){if(C.answered)return;const it=C.order[C.i];C.selected=id;C.answered=true;if(id===it.spot.id)C.score++;quiz()}

  function setStageZoom(z){C.zoom=Math.max(1,Math.min(3.5,z));const el=document.getElementById('cp-zoom-content');if(el)el.style.width=(C.zoom*100)+'%';const p=document.getElementById('cp-zoom-pct');if(p)p.textContent=Math.round(C.zoom*100)+'%'}
  function bindPinch(){const shell=document.getElementById('cp-zoom-shell');if(!shell)return;let startD=0,startZ=C.zoom;shell.addEventListener('touchstart',e=>{if(e.touches.length===2){const a=e.touches[0],b=e.touches[1];startD=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);startZ=C.zoom}},{passive:true});shell.addEventListener('touchmove',e=>{if(e.touches.length===2&&startD){e.preventDefault();const a=e.touches[0],b=e.touches[1],d=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);setStageZoom(startZ*d/startD)}},{passive:false});shell.addEventListener('touchend',e=>{if(e.touches.length<2)startD=0},{passive:true})}

  function ensureViewer(){if(viewer)return;viewer=document.createElement('div');viewer.className='cp-viewer';viewer.hidden=true;viewer.innerHTML=`<div class="cp-viewer-bar"><div class="cp-viewer-title" id="cp-viewer-title">Cockpit</div><button class="btn" data-act="viewer-out">−</button><button class="btn" data-act="viewer-reset">100%</button><button class="btn" data-act="viewer-in">+</button><button class="btn" data-act="viewer-landscape">Querformat</button><button class="btn" data-act="viewer-close">Schließen</button></div><div class="cp-viewer-note">Mit zwei Fingern zoomen oder +/− nutzen. Auf dem iPhone ist Querformat meist am angenehmsten.</div><div class="cp-viewer-shell" id="cp-viewer-shell"><div class="cp-viewer-content" id="cp-viewer-content"><img id="cp-viewer-img" alt="Cockpit"></div></div>`;document.body.appendChild(viewer);bindViewerPinch()}
  function setViewerZoom(z){viewerScale=Math.max(1,Math.min(5,z));const el=document.getElementById('cp-viewer-content');if(el)el.style.width=(viewerScale*100)+'%'}
  function openViewer(ac){ensureViewer();viewerAc=ac;const c=COCKPITS[ac];document.getElementById('cp-viewer-title').textContent=c.name+' · Bildansicht';document.getElementById('cp-viewer-img').src=c.img;viewer.hidden=false;viewerScale=1;setViewerZoom(1);document.body.style.overflow='hidden';try{if(screen.orientation&&screen.orientation.lock)screen.orientation.lock('landscape').catch(()=>{})}catch(_e){}}
  function closeViewer(){if(!viewer)return;viewer.hidden=true;document.body.style.overflow='';try{if(screen.orientation&&screen.orientation.unlock)screen.orientation.unlock()}catch(_e){}}
  function bindViewerPinch(){const shell=document.getElementById('cp-viewer-shell');if(!shell)return;let startD=0,startZ=1;shell.addEventListener('touchstart',e=>{if(e.touches.length===2){const a=e.touches[0],b=e.touches[1];startD=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);startZ=viewerScale}},{passive:true});shell.addEventListener('touchmove',e=>{if(e.touches.length===2&&startD){e.preventDefault();const a=e.touches[0],b=e.touches[1],d=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);setViewerZoom(startZ*d/startD)}},{passive:false});shell.addEventListener('touchend',e=>{if(e.touches.length<2)startD=0},{passive:true})}

  const home0=renderHome;renderHome=function(){home0();if(document.querySelector('#b-cockpit-drill'))return;const b=document.createElement('button');b.className='btn block';b.id='b-cockpit-drill';b.dataset.act='cockpit';b.textContent='Cockpit-Drill · Viper & DR400';const r=document.querySelector('#b-millionaire')||document.querySelector('#b-session');if(r)r.insertAdjacentElement('afterend',b)};
  const render0=render;render=function(){if(tab==='cockpit')hub();else if(tab==='cockpit-learn'&&C.ac)learn(C.ac);else if(tab==='cockpit-quiz')quiz();else render0()};
  document.addEventListener('click',e=>{const el=e.target.closest('[data-act]');if(!el)return;const a=el.dataset.act;
    if(a==='cockpit'){tab='cockpit';render();window.scrollTo(0,0)}
    else if(a==='cockpit-back'){tab='cockpit';C.zoom=1;render();window.scrollTo(0,0)}
    else if(a==='cockpit-learn'){C.ac=el.dataset.cp;C.selected=null;C.showAll=false;C.zoom=1;tab='cockpit-learn';render();window.scrollTo(0,0)}
    else if(a==='cockpit-picklearn'){C.ac=el.dataset.cp;C.selected=el.dataset.cpid;render()}
    else if(a==='cockpit-toggle-all'){C.showAll=!C.showAll;render()}
    else if(a==='cockpit-quiz')start('single',el.dataset.cp)
    else if(a==='cockpit-mixed')start('mixed',null)
    else if(a==='cockpit-answer')answer(el.dataset.cpid)
    else if(a==='cockpit-next'){C.i++;C.answered=false;C.selected=null;C.zoom=1;quiz();window.scrollTo(0,0)}
    else if(a==='cockpit-skip'){C.i++;C.answered=false;C.selected=null;C.zoom=1;quiz()}
    else if(a==='cockpit-restart')start(C.mode||'mixed',C.mode==='single'?C.ac:null)
    else if(a==='cp-zoom-in')setStageZoom(C.zoom+.35)
    else if(a==='cp-zoom-out')setStageZoom(C.zoom-.35)
    else if(a==='cp-zoom-reset')setStageZoom(1)
    else if(a==='cockpit-view')openViewer(el.dataset.cp||C.ac)
    else if(a==='viewer-in')setViewerZoom(viewerScale+.5)
    else if(a==='viewer-out')setViewerZoom(viewerScale-.5)
    else if(a==='viewer-reset')setViewerZoom(1)
    else if(a==='viewer-close')closeViewer()
    else if(a==='viewer-landscape'){try{if(screen.orientation&&screen.orientation.lock)screen.orientation.lock('landscape').catch(()=>{})}catch(_e){}}
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&viewer&&!viewer.hidden)closeViewer()});
  if(tab==='home')render();
})();

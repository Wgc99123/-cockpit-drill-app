(function(){
  const HARD_A={
    v70:[
      "Fahrt dicht über dem Boden abbauen, weich abfangen, Hauptfahrwerk zuerst, Knüppel halten, dann Bugrad weich absetzen",
      "Fahrt bis zum Aufsetzen weitgehend halten, zuerst Bugrad aufsetzen, danach das Hauptfahrwerk entlasten",
      "Nach dem Abfangen Haupt- und Bugfahrwerk möglichst gleichzeitig aufsetzen und den Knüppel neutral halten",
      "Fahrt über der Schwelle stark abbauen, mit leicht gedrücktem Knüppel auf dem Hauptfahrwerk aufsetzen"
    ],
    d110:[
      "Zurück auf BOTH, Leistung oder Gemisch variieren, sonst auf den guten Magneten und Platz mit Werft anfliegen",
      "Auf Magnet R bleiben, Leistung reduzieren und bei stabiler Drehzahl den Flug bis zum Ziel fortsetzen",
      "Auf Magnet L schalten, Gemisch voll reich stellen und erst bei weiterem Drehzahlabfall einen Ausweichplatz wählen",
      "Zündung kurz auf OFF und wieder BOTH schalten, danach Leistung erhöhen und die Magnetprüfung wiederholen"
    ],
    d103:[
      "Leerlauf, Seitenruder voll gegen die Drehung bis sie aufhört, Höhen- und Querruder neutral, Klappen ein, weich abfangen",
      "Leerlauf, Querruder voll gegen die Drehung, Seitenruder neutral, Höhenruder leicht ziehen und Klappen einfahren",
      "Vollgas, Seitenruder gegen die Drehung, Querruder neutral und nach Ende der Drehung zügig abfangen",
      "Leerlauf, Seitenruder in Drehrichtung, Höhenruder nachdrücken, Querruder gegen die Drehung und Klappen einfahren"
    ],
    v71:[
      "Leerlauf, Klappen ein, Pumpe aus, Avionik aus, Zündung aus, Hauptschalter und ACL aus, Brandhahn zu, Rettungsgerät sichern",
      "Leerlauf, Avionik aus, Hauptschalter aus, Zündung aus, Pumpe aus, Brandhahn zu, Klappen ein und Rettungsgerät sichern",
      "Leerlauf, Pumpe aus, Zündung aus, Avionik aus, Klappen ein, Hauptschalter anlassen, Brandhahn zu, Rettungsgerät sichern",
      "Leerlauf, Brandhahn zu, Motor leer laufen lassen, Zündung aus, Avionik aus, Hauptschalter aus und Klappen ein"
    ],
    c6:[
      "Viper erlaubt Höhenruder Mitte oder leicht drücken, DR400 Höhenruder neutral; beide: Leerlauf und Seitenruder voll gegen",
      "DR400 erlaubt leichtes Drücken, Viper fordert Höhenruder neutral; beide: Leerlauf und Seitenruder voll gegen",
      "Beide fordern Höhenruder leicht gezogen; Unterschied besteht nur in der Stellung der Querruder",
      "Beide Verfahren sind identisch; Leerlauf, Höhenruder neutral und Querruder voll gegen die Drehrichtung"
    ],
    d106:[
      "Mit Höhentrimmung und Leistung, 130 bis 140 km/h, etwa 500 ft/min; Leistung bis zum Aufsetzen stehen lassen",
      "Mit Höhentrimmung und Klappen 2, 110 bis 120 km/h, etwa 700 ft/min; kurz vor dem Aufsetzen Leerlauf",
      "Mit Seitenruder und Leistung, 145 bis 155 km/h, Klappen 1; Leistung in etwa 50 ft vollständig herausnehmen",
      "Mit Querrudertrimmung und Leistung, 120 bis 130 km/h, Klappen 0; Sinkrate unter 300 ft/min halten"
    ],
    v81:[
      "Gas Leerlauf, Querruder Mitte, Höhenruder Mitte oder leicht drücken, Seitenruder voll gegen die Drehung",
      "Gas Leerlauf, Querruder voll gegen die Drehung, Höhenruder neutral, Seitenruder in Drehrichtung",
      "Gas Voll, Querruder Mitte, Höhenruder leicht ziehen, Seitenruder voll gegen die Drehung",
      "Gas Leerlauf, Klappen 3, Höhenruder leicht drücken, Seitenruder neutral bis die Drehung aufhört"
    ],
    d88:[
      "145 km/h, hängende Fläche plus Vorhaltewinkel, kurz vor dem Aufsetzen ausrichten, nach dem Aufsetzen Klappen ein",
      "135 km/h, nur Vorhaltewinkel bis zum Aufsetzen halten, Querruder neutral, Klappen nach dem Ausrollen ein",
      "145 km/h, Flügel waagerecht halten, im letzten Moment nur mit Seitenruder ausrichten, Klappen 2 belassen",
      "155 km/h, luvseitige Fläche anheben, mit leichtem Vorhaltewinkel aufsetzen und Klappen sofort auf Stufe 1"
    ],
    d70:[
      "Sonst erreicht man nicht den vollen Seitenruderausschlag und die Bremswirkung zur getrimmten Seite leidet",
      "Sonst wird das Bugrad bereits beim Rollen dauerhaft ausgelenkt und die Lenkung zur Gegenseite begrenzt",
      "Sonst verändert sich die Pedalneutralstellung so stark, dass beide Radbremsen gleichzeitig ansprechen können",
      "Sonst kann die Seitenrudertrimmung beim Start durch den Fahrtwind selbsttätig weiter in die getrimmte Richtung laufen"
    ],
    v88:[
      "Fahrt über Trimmung einstellen, Höhe über Motorleistung, Richtung mit Quer- und Seitenruder",
      "Fahrt über Motorleistung einstellen, Höhe über Klappenstellung, Richtung hauptsächlich mit Seitenruder",
      "Fahrt über Querrudertrimmung einstellen, Höhe über Seitenruder, Richtung mit wechselnder Motorleistung",
      "Fahrt konstant halten und ausschließlich mit Motorleistung sinken; Quer- und Seitenruder möglichst neutral"
    ],
    c8:[
      "DR400 zentraler Rumpftank plus optionaler Zusatztank, Viper zwei Flügeltanks mit Wahlschalter",
      "DR400 zwei Flügeltanks mit Wahlschalter, Viper zentraler Rumpftank plus optionaler Zusatztank",
      "Beide haben zwei Flügeltanks; bei der DR400 werden sie automatisch, bei der Viper manuell umgeschaltet",
      "Beide haben einen zentralen Rumpftank; nur die Viper besitzt zusätzlich einen kleinen Reservetank im Flügel"
    ],
    d85:[
      "Fahrt reduzieren, Prop volle kleine Steigung, Gemisch voll reich, unter 170 Klappen 1, Vorwärmung EIN, 145 trimmen",
      "Fahrt reduzieren, Prop große Steigung, Gemisch voll reich, unter 170 Klappen 1, Vorwärmung AUS, 145 trimmen",
      "Prop kleine Steigung, Gemisch leicht mager, unter 190 Klappen 1, Vorwärmung EIN, anschließend 135 trimmen",
      "Fahrt auf 145 reduzieren, Klappen 2 setzen, Prop kleine Steigung, Gemisch voll reich und Vorwärmung erst im Endanflug"
    ],
    d101:[
      "Pumpe AUS, Hauptschalter AUS, Heizung/Lüftung AUS, Brandhahn AUS, Mixer ziehen, Zündung AUS, 145, Notlandung",
      "Pumpe EIN, Hauptschalter AUS, Heizung/Lüftung AUS, Brandhahn AUS, Mixer reich, Zündung BOTH, 145, Notlandung",
      "Pumpe AUS, Hauptschalter EIN, Heizung/Lüftung AUS, Brandhahn EIN, Mixer ziehen, Zündung AUS, 135, Notlandung",
      "Pumpe AUS, Hauptschalter AUS, Heizung/Lüftung EIN, Brandhahn AUS, Mixer ziehen, Zündung BOTH, 145, Notlandung"
    ],
    v53:[
      "Aus der Halterung ziehen, dann noch 6 bis 15 cm weiter bis zur Auslösung, bis 12 kg Kraft, notfalls beidhändig",
      "Aus der Halterung ziehen und nach etwa 2 bis 4 cm Auszug halten, bis das System selbsttätig auslöst",
      "Griff zuerst um 90° drehen und anschließend etwa 10 cm ziehen, dabei maximal 5 kg Kraft aufbringen",
      "Griff vollständig aus der Halterung nehmen, nach unten drücken und erst dann mit beiden Händen weiterziehen"
    ],
    d50:[
      "AVGAS 100LL oder Super Plus bleifrei ROZ 98 mit max. 1 % Alkohol, auch als Mischung",
      "AVGAS 100LL oder Super Plus bleifrei ROZ 95 mit max. 5 % Alkohol, auch als Mischung",
      "AVGAS 100LL oder Super E10 ROZ 98 mit max. 10 % Alkohol, jedoch nicht als Mischung",
      "AVGAS 100LL oder Jet A-1, sofern der Anteil von Jet A-1 unter 20 % bleibt"
    ],
    d97:[
      "145 km/h trimmen, Klappen ein, Tank prüfen, Gas ca. 4 cm raus, Zündung BOTH, Pumpe EIN, voll reich",
      "135 km/h trimmen, Klappen 1, Tank prüfen, Gas Vollgas, Zündung BOTH, Pumpe AUS, Gemisch voll reich",
      "145 km/h trimmen, Klappen ein, Tank schließen, Gas Leerlauf, Zündung L, Pumpe EIN, Gemisch mager",
      "155 km/h trimmen, Klappen ein, Tank prüfen, Gas ca. 4 cm raus, Zündung OFF/BOTH, Pumpe AUS, voll reich"
    ],
    d61:[
      "Haupttank am tiefsten Punkt der Rumpfmitte, Strainer per Bowdenzug am Öleinfüllstutzen, Zusatztank separat",
      "Haupttank an beiden Flügelwurzeln, Strainer direkt unter dem Motor, Zusatztank über denselben Ablass",
      "Haupttank am tiefsten Punkt der Rumpfmitte, Strainer am Brandspant von außen, kein separater Ablauf am Zusatztank",
      "Haupttank unter dem linken Flügel, Strainer per Bowdenzug im Cockpit, Zusatztank am rechten Flügel"
    ],
    v48:[
      "Ein Handhebel auf der Mittelkonsole, beide Haupträder gleichzeitig, Parkbremse über Stift",
      "Zwei Fußspitzenbremsen an den Pedalen, Haupträder getrennt, Parkbremse über Handhebel",
      "Bremswirkung am Ende des Pedalwegs, Haupträder getrennt, Parkbremse über Rastung am Pedal",
      "Ein Handhebel links am Sitz, nur das kurveninnere Hauptrad, Parkbremse über Drehknopf"
    ],
    d38:[
      "Tipp-Schalter: E-Pumpe läuft und Magnetventil spritzt Kraftstoff in die Zylinder, maximal 3 s",
      "Tipp-Schalter: mechanische Pumpe fördert Kraftstoff zum Vergaser, bis der Fuel Flow stabil ist",
      "Primerknopf: drei Hübe fördern Kraftstoff in den Ansaugtrakt, danach E-Pumpe für maximal 10 s",
      "Gashebel: zwei bis drei Pumpbewegungen betätigen die Beschleunigerpumpe, E-Pumpe bleibt dabei aus"
    ],
    v19:[
      "Schräglagen über 60°, Kunstflug, Sackflug, Trudeln, Vereisung, IMC und Nachtflug",
      "Schräglagen über 45°, Kunstflug, Trudeln, Vereisung und Nachtflug; IMC ist mit entsprechender Ausrüstung zulässig",
      "Schräglagen über 60°, Kunstflug und Trudeln; Sackflug, Nachtflug und leichte Vereisung sind zulässig",
      "Nur Kunstflug und absichtliches Trudeln; Schräglagen bis 90°, IMC und Nachtflug sind zulässig"
    ],
    d75:[
      "Mittelgriff nach links auf AUF, beide Hebel an den Seitenholmen hochziehen, Haube abheben",
      "Mittelgriff nach rechts auf ZU, beide Hebel an den Seitenholmen nach unten drücken, Haube nach hinten schieben",
      "Mittelgriff in Mittelstellung lassen, roten Griff am Dach ziehen und die Haube nach vorn aus den Schienen drücken",
      "Mittelgriff auf AUF, nur den linken Seitenhebel hochziehen und die Haube gegen den Fahrtwind nach hinten schieben"
    ],
    v74:[
      "Möglich, auch mit Klappen in Landestellung, um im Anflug Höhe zu verlieren",
      "Nur mit eingefahrenen Klappen zulässig, weil ausgefahrene Klappen im Slip asymmetrisch belastet werden",
      "Nur mit Klappenstellung 1 zulässig und ausschließlich unterhalb von 100 km/h",
      "Mit jeder Klappenstellung verboten; Höhe darf nur über Leistung und normale Sinkrate abgebaut werden"
    ],
    d72:[
      "Am Ende des Pedalwegs bremst das jeweilige Rad, zusätzlich wirkt die Handbremse auf beide Räder",
      "Die Pedale steuern nur das Seitenruder; beide Haupträder werden ausschließlich mit dem Handhebel gebremst",
      "Fußspitzenbremsen wirken getrennt auf die Haupträder, der Handhebel dient ausschließlich als Parkbremse",
      "Am Ende beider Pedalwege werden beide Räder gemeinsam gebremst; eine getrennte Bremswirkung ist nicht möglich"
    ],
    c2:[
      "DR400 je Seite über Pedalweg plus Handbremse, Viper ein Hebel für beide Räder",
      "DR400 ein Hebel für beide Räder, Viper je Seite über Pedalweg plus Handbremse",
      "Beide Muster haben getrennte Fußspitzenbremsen und zusätzlich eine gemeinsame Parkbremse",
      "Beide Muster bremsen über einen zentralen Handhebel; nur die DR400 kann zusätzlich einzeln bremsen"
    ],
    d105:[
      "Standardkurve als 2-min-Kurve, nach 60 s ausleiten und Kurs mit Kompass prüfen",
      "Standardkurve als 1-min-Kurve, nach 30 s ausleiten und Kurs mit Kompass prüfen",
      "Kurve mit 30° Schräglage, nach 90 s ausleiten und Kurs ausschließlich am Kurskreisel prüfen",
      "Kurve mit 15° Schräglage, nach 120 s ausleiten und erst nach Stabilisierung den Kompass prüfen"
    ],
    v80:[
      "Nachdrücken, Fahrt aufholen, geradeaus oder leicht links/rechts landen",
      "Höhe halten, Klappen voll setzen und anschließend eine verkürzte Umkehrkurve zur Piste fliegen",
      "Nachdrücken, Fahrt aufholen und ab ausreichender Höhe grundsätzlich eine 180°-Kurve zur Piste beginnen",
      "Fahrt halten, Rettungssystem auslösen und bis zur Entfaltung des Schirms die Nase deutlich anheben"
    ],
    d67:[
      "Nur kurz zur Prüfung einschalten, weil am Boden die Kühlung durch Fahrtwind fehlt",
      "Während des gesamten Rollens eingeschaltet lassen, damit sich kein Kondenswasser im Pitotrohr bildet",
      "Erst unmittelbar vor dem Start für mindestens zwei Minuten einschalten, damit das Rohr vollständig durchgewärmt ist",
      "Am Boden grundsätzlich ausgeschaltet lassen; eine Funktionsprüfung ist nur im Flug zulässig"
    ],
    d68:[
      "Hauptschalter kurz ein, Fühler am rechten Flügel anheben und Warnton abwarten",
      "Hauptschalter kurz ein, Fühler am linken Flügel absenken und Kontrolllampe am Panel abwarten",
      "Avionikschalter ein, in das Pitotrohr am rechten Flügel blasen und Warnton abwarten",
      "Hauptschalter aus, Fühler am rechten Flügel anheben und auf mechanisches Klicken achten"
    ]
  };

  Object.keys(HARD_A).forEach(id=>{const q=Q.find(x=>x.id===id);if(q)q.a=HARD_A[id]});
  if(!S.milli)S.milli={best:0,wins:0,played:0};

  const style=document.createElement("style");
  style.textContent=`
    .milli-head{background:var(--instr);color:var(--instr-ink);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px}
    .milli-row{display:flex;align-items:center;justify-content:space-between;gap:10px}
    .milli-money{font:700 30px/1 var(--f-mono);color:#f0b52c}
    .milli-level{font:600 13px var(--f-mono);color:#9fb1bd}
    .milli-ladder{display:grid;grid-template-columns:repeat(5,1fr);gap:4px}
    .milli-ladder span{font:600 10px var(--f-mono);text-align:center;padding:4px 2px;border-radius:5px;background:#24333f;color:#9fb1bd}
    .milli-ladder span.on{background:var(--accent);color:var(--accent-ink)}
    .milli-ladder span.safe{outline:1px solid #f0b52c;color:#f0b52c}
    .jokers{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .jokers .btn{min-height:40px;padding:8px 10px;font-size:13px}`;
  document.head.appendChild(style);

  const MONEY=[50,100,200,300,500,1000,2000,4000,8000,16000,32000,64000,125000,500000,1000000];
  const MILLI_HARD=Object.keys(HARD_A);

  function safePrize(i){return i>=10?16000:i>=5?500:0}
  function millionaireHeader(){
    const ladder=MONEY.map((m,i)=>`<span class="${i===run.i?"on":""} ${i===4||i===9?"safe":""}">${i+1}</span>`).join("");
    return `<div class="milli-head"><div class="milli-row"><div><div class="milli-level">FRAGE ${run.i+1} VON 15</div><div class="milli-money">${MONEY[run.i].toLocaleString("de-DE")} €</div></div><span class="chip">Millionär</span></div><div class="milli-ladder">${ladder}</div><div class="jokers"><button class="btn" data-act="fifty" ${run.fifty?"":"disabled"}>50:50 Joker</button><button class="btn" data-act="swapq" ${run.swap?"":"disabled"}>Frage tauschen</button></div></div>`;
  }

  function startMillionaire(){
    const p=pool().filter(q=>q.type!=="num");
    if(p.length<15)return;
    const hard=shuffle(p.filter(q=>MILLI_HARD.includes(q.id)));
    const easy=shuffle(p.filter(q=>!MILLI_HARD.includes(q.id)));
    const ids=[];
    while(ids.length<5&&easy.length)ids.push(easy.shift().id);
    while(ids.length<10&&(easy.length||hard.length)){
      const q=(easy.length&&Math.random()<.55)?easy.shift():hard.shift();
      if(q&&!ids.includes(q.id))ids.push(q.id);
    }
    while(ids.length<15&&hard.length){const q=hard.shift();if(!ids.includes(q.id))ids.push(q.id)}
    while(ids.length<15&&easy.length){const q=easy.shift();if(!ids.includes(q.id))ids.push(q.id)}
    run={ids,i:0,mode:"millionaire",label:"Millionär",res:[],start:Date.now(),answered:false,opts:null,fifty:true,swap:true};
    S.milli.played++;save();tab="quiz";renderQuiz();window.scrollTo(0,0);
  }

  function endMillionaire(won,wrongQ){
    const prize=won?1000000:safePrize(run.i);
    S.milli.best=Math.max(S.milli.best||0,prize);if(won)S.milli.wins=(S.milli.wins||0)+1;save();
    const ans=wrongQ?wrongQ.a[0]:"";
    main.innerHTML=`<div class="milli-head"><span class="lbl">${won?"MILLIONÄR":"RUNDE BEENDET"}</span><div class="milli-money">${prize.toLocaleString("de-DE")} €</div><p>${won?"15 von 15 richtig.":"Du fällst auf die letzte Sicherheitsstufe zurück."}</p></div>${wrongQ?`<div class="fb bad"><b>Richtig wäre:</b> ${esc(ans)}<br>${esc(wrongQ.x)}<div class="src">Quelle: ${esc(wrongQ.s)}</div></div>`:""}<div class="grid2"><button class="btn primary" data-act="millionaire">Nochmal</button><button class="btn" data-act="home">Startseite</button></div>`;
  }

  const oldHome=renderHome;
  renderHome=function(){
    oldHome();
    const session=document.querySelector("#b-session");
    if(!session||document.querySelector("#b-millionaire"))return;
    const b=document.createElement("button");b.className="btn block";b.id="b-millionaire";b.dataset.act="millionaire";
    b.textContent="Millionär-Modus · 15 Fragen";
    session.insertAdjacentElement("afterend",b);
    if(S.milli.best){const n=document.createElement("p");n.className="note";n.textContent=`Millionär-Bestwert: ${S.milli.best.toLocaleString("de-DE")} €`;b.insertAdjacentElement("afterend",n)}
  };

  const oldRenderQuiz=renderQuiz;
  renderQuiz=function(){
    oldRenderQuiz();
    if(!run||run.mode!=="millionaire"||run.i>=run.ids.length)return;
    const h=document.createElement("div");h.innerHTML=millionaireHeader();
    main.insertBefore(h.firstElementChild,main.firstChild);
    if(run.opts)run.opts.forEach((o,i)=>{if(o.hidden){const b=document.querySelector("#opt-"+i);if(b){b.style.display="none";b.disabled=true}}});
  };

  const oldFeedback=feedback;
  feedback=function(q,ok,extra){
    if(!run||run.mode!=="millionaire")return oldFeedback(q,ok,extra);
    if(!ok){endMillionaire(false,q);return}
    const fb=document.querySelector("#fb");
    fb.innerHTML=`<div class="fb ok"><b>Richtig.</b> ${esc(q.x)}<div class="src">Quelle: ${esc(q.s)}</div></div><button class="btn primary block" data-act="mnext" id="b-mnext" style="margin-top:10px">${run.i===14?"1.000.000 € sichern":"Nächste Frage"}</button>`;
    document.querySelector("#b-mnext").focus();
  };

  const oldPick=pick;
  pick=function(i){
    if(!run||run.mode!=="millionaire")return oldPick(i);
    if(run.answered)return;
    const q=Q.find(x=>x.id===run.ids[run.i]);const o=run.opts&&run.opts[i];
    if(!o||o.hidden)return;
    run.answered=true;const ok=o.ok;run.res.push({id:q.id,ok,given:o.t});grade(q.id,ok,ok);
    document.querySelectorAll(".opt").forEach((b,j)=>{b.disabled=true;if(run.opts[j].ok)b.classList.add("ok");else if(j===i)b.classList.add("bad");else b.classList.add("dim")});
    feedback(q,ok);
  };

  const oldRunEnd=renderRunEnd;
  renderRunEnd=function(){if(run&&run.mode==="millionaire")return endMillionaire(true);return oldRunEnd()};

  function useFifty(){
    if(!run||run.mode!=="millionaire"||!run.fifty||run.answered||!run.opts)return;
    const wrong=shuffle(run.opts.map((o,i)=>({o,i})).filter(x=>!x.o.ok&&!x.o.hidden)).slice(0,2);
    wrong.forEach(x=>{run.opts[x.i].hidden=true;const b=document.querySelector("#opt-"+x.i);if(b){b.style.display="none";b.disabled=true}});
    run.fifty=false;document.querySelectorAll('[data-act="fifty"]').forEach(b=>b.disabled=true);
  }

  function swapQuestion(){
    if(!run||run.mode!=="millionaire"||!run.swap||run.answered)return;
    const used=new Set(run.ids);const cand=shuffle(pool().filter(q=>q.type!=="num"&&!used.has(q.id)));
    if(!cand.length)return;
    run.ids[run.i]=cand[0].id;run.swap=false;run.opts=null;run.answered=false;renderQuiz();window.scrollTo(0,0);
  }

  document.addEventListener("click",e=>{
    const el=e.target.closest("[data-act]");if(!el)return;
    const a=el.dataset.act;
    if(a==="millionaire"){e.preventDefault();startMillionaire()}
    else if(a==="fifty"){e.preventDefault();useFifty()}
    else if(a==="swapq"){e.preventDefault();swapQuestion()}
    else if(a==="mnext"&&run&&run.mode==="millionaire"){
      e.preventDefault();run.i++;run.answered=false;run.opts=null;if(run.i>=run.ids.length)endMillionaire(true);else{renderQuiz();window.scrollTo(0,0)}
    }
  });

  render();
})();
const items=[
 {t:"Gol en el minuto 90",d:"El delantero define a placer y el estadio estalla.",c:"partidos",e:"⚽",a:"#1f6b3a",b:"#3fa062"},
 {t:"Remontada histórica",d:"De 0-2 a 3-2 en veinte minutos inolvidables.",c:"partidos",e:"🔥",a:"#a3341f",b:"#e0623f"},
 {t:"Penalti decisivo",d:"El portero adivina el lado y salva el partido.",c:"partidos",e:"🧤",a:"#10223a",b:"#2f5a8c"},
 {t:"Derbi de la ciudad",d:"Noventa minutos de máxima rivalidad.",c:"partidos",e:"🏟️",a:"#5a2a7a",b:"#9a5cc4"},
 {t:"Grada de animación",d:"Bufandas arriba y cánticos desde el calentamiento.",c:"aficion",e:"📣",a:"#b8860b",b:"#f2c230"},
 {t:"Peñas del barrio",d:"Familias enteras que no se pierden una jornada.",c:"aficion",e:"👨‍👩‍👧",a:"#1c6f7a",b:"#46b5c2"},
 {t:"Bufandas al viento",d:"El himno suena y todo el campo se tiñe de verde.",c:"aficion",e:"🧣",a:"#14472a",b:"#2f8a52"},
 {t:"Niños en la grada",d:"La próxima generación aprende a cantar los goles.",c:"aficion",e:"🧒",a:"#c2571a",b:"#f28f4b"},
 {t:"Entrenamiento matinal",d:"Rondos, pressing y trabajo táctico en la ciudad deportiva.",c:"club",e:"👟",a:"#2d4a22",b:"#6fa14f"},
 {t:"La copa del centenario",d:"El trofeo que conmemora cien años de historia.",c:"club",e:"🏆",a:"#8a6a00",b:"#e8c24a"},
 {t:"Cantera 2026",d:"Los jóvenes talentos que ya llaman a la puerta.",c:"club",e:"🌱",a:"#1f6b3a",b:"#7bcf8f"},
 {t:"Vestuario",d:"Camisetas colgadas y últimas instrucciones del míster.",c:"club",e:"👕",a:"#10223a",b:"#4b6a94"}
];
const g=document.getElementById("gallery"),lb=document.getElementById("lb");
items.forEach((it,i)=>{
  const b=document.createElement("button");
  b.className="item";b.dataset.c=it.c;b.style.setProperty("--c1",it.a);b.style.setProperty("--c2",it.b);
  b.setAttribute("aria-label","Ampliar: "+it.t);
  b.innerHTML='<span class="art">'+it.e+'</span><span class="cap">'+it.t+'<small>'+it.c.charAt(0).toUpperCase()+it.c.slice(1)+'</small></span>';
  b.addEventListener("click",()=>{
    const art=document.getElementById("lbArt");
    lb.style.setProperty("--c1",it.a);lb.style.setProperty("--c2",it.b);
    art.textContent=it.e;
    document.getElementById("lbT").textContent=it.t;
    document.getElementById("lbD").textContent=it.d;
    lb.showModal();
  });
  g.appendChild(b);
});
document.getElementById("lbX").onclick=()=>lb.close();
lb.addEventListener("click",e=>{if(e.target===lb)lb.close()});

document.querySelectorAll(".filters button").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".filters button").forEach(x=>x.setAttribute("aria-pressed",x===btn));
  const f=btn.dataset.f;
  g.querySelectorAll(".item").forEach(i=>i.hidden=!(f==="todo"||i.dataset.c===f));
}));

const burger=document.querySelector(".burger"),menu=document.getElementById("menu");
burger.addEventListener("click",()=>{const o=menu.classList.toggle("open");burger.setAttribute("aria-expanded",o)});
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  menu.classList.remove("open");burger.setAttribute("aria-expanded","false");
  menu.querySelectorAll("a").forEach(x=>x.classList.toggle("on",x===a));
}));

// Cuenta atrás hasta el próximo domingo a las 18:30
function nextSunday(){const d=new Date();d.setHours(18,30,0,0);d.setDate(d.getDate()+((7-d.getDay())%7));if(d<new Date())d.setDate(d.getDate()+7);return d}
const target=nextSunday();
function tick(){
  let s=Math.max(0,Math.floor((target-new Date())/1000));
  const v={d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),s:s%60};
  for(const k in v)document.querySelector('[data-u="'+k+'"]').textContent=String(v[k]).padStart(2,"0");
}
tick();setInterval(tick,1000);

// Desplegable de "Hazte socio"
const socioBtn=document.getElementById("socioBtn"),socioPanel=document.getElementById("socioPanel"),
  socioForm=document.getElementById("socioForm"),socioOk=document.getElementById("socioOk");
function setSocio(open){
  socioBtn.setAttribute("aria-expanded",open);
  socioPanel.classList.toggle("open",open);
  socioPanel.inert=!open;
  if(open){
    socioOk.hidden=true;socioForm.hidden=false;
    setTimeout(()=>socioForm.elements.nombre.focus({preventScroll:true}),350);
  }
}
socioBtn.addEventListener("click",()=>setSocio(socioBtn.getAttribute("aria-expanded")!=="true"));
document.getElementById("socioCancel").addEventListener("click",()=>{setSocio(false);socioBtn.focus()});
document.getElementById("socioClose").addEventListener("click",()=>{setSocio(false);socioBtn.focus()});
socioForm.addEventListener("submit",e=>{
  e.preventDefault();
  document.getElementById("socioName").textContent=socioForm.elements.nombre.value.trim();
  socioForm.reset();
  socioForm.hidden=true;socioOk.hidden=false;
});

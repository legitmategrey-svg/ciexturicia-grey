"use strict";
const $=id=>document.getElementById(id),API="https://grey-ai-backend.legitmategrey.workers.dev/",EMAIL="legitmategrey@gmail.com";
/* BOOT + BACKGROUND */
(()=>{const L=["> booting GREY CORE v2.0...","> loading modules [ui, audio, ai, terminal]","> connecting GREY AI...","> SYSTEM ONLINE ✓"],t=$("bootText");let i=0;
const n=()=>{if(i<L.length){t.textContent+=L[i++]+"\n";setTimeout(n,380)}else setTimeout(()=>$("boot").classList.add("off"),400)};n();
const c=$("bg"),x=c.getContext("2d");let w,h,d;const r=()=>{w=c.width=innerWidth;h=c.height=innerHeight;d=Array.from({length:Math.ceil(w/22)},()=>Math.random()*h)};r();addEventListener("resize",r);
if(!matchMedia("(prefers-reduced-motion:reduce)").matches)setInterval(()=>{x.fillStyle="rgba(5,8,22,.12)";x.fillRect(0,0,w,h);x.fillStyle="#00eaff";x.font="14px monospace";d.forEach((y,k)=>{x.fillText(Math.random()<.5?"0":"1",k*22,y);d[k]=y>h&&Math.random()>.97?0:y+22})},90);
/* typing */const R=["Web Developer","Programmer","ICT Student","Future Software Engineer"];let a=0,b=0,del=0;const e=$("typed");
(function ty(){const s=R[a];b+=del?-1:1;e.textContent=s.slice(0,b)+" //";if(!del&&b==s.length){del=1;return setTimeout(ty,1400)}if(del&&!b){del=0;a=(a+1)%R.length}setTimeout(ty,del?40:90)})();
/* reveal */const o=new IntersectionObserver(q=>q.forEach(v=>v.isIntersecting&&v.target.classList.add("in")),{threshold:.1});document.querySelectorAll(".reveal").forEach(v=>o.observe(v));
/* menu */const m=$("menuBtn"),nv=$("nav");m.onclick=()=>{nv.classList.toggle("open");m.textContent=nv.classList.contains("open")?"✕":"☰"};nv.querySelectorAll("a").forEach(a=>a.onclick=()=>{nv.classList.remove("open");m.textContent="☰"});
})();
/* CLOCK */
setInterval(clock,1e3);clock();function clock(){const n=new Date,o={timeZone:"Africa/Kampala"};$("digitalClock").textContent=n.toLocaleTimeString("en-GB",{...o,hour12:false});$("digitalDate").textContent=n.toLocaleDateString("en-GB",{...o,weekday:"long",day:"numeric",month:"long",year:"numeric"})}
/* MUSIC (file names must match your mp3 files exactly) */
const A=$("musicAudio"),PL=[["Helplessly","Helplessly-Tatiana Manaois.mp3"],["Some Days","Some Days-Tatiana Manaois.mp3"],["Never been the same","Never been the same-Tatiana Manaois.mp3"]];let cur=0;
const ft=s=>isFinite(s)?Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0"):"0:00",st=t=>$("musicStatus").textContent=t;
function load(i){cur=(i+PL.length)%PL.length;A.src=encodeURI(PL[cur][1]);$("songSelect").value=cur;$("songTitle").textContent=PL[cur][0];$("artistName").textContent="Tatiana Manaois";$("progress").value=0;st("TRACK LOADED")}
function play(){A.play().catch(e=>{console.error(e);st("⚠ CAN'T PLAY — CHECK FILE NAME: "+PL[cur][1])})}
$("playBtn").onclick=()=>A.paused?play():A.pause();$("nextBtn").onclick=()=>{load(cur+1);play()};$("prevBtn").onclick=()=>{load(cur-1);play()};
$("songSelect").onchange=e=>{load(+e.target.value);play()};$("volume").oninput=e=>A.volume=+e.target.value;A.volume=.7;
A.onplay=()=>{$("playBtn").textContent="❚❚";document.querySelector(".player").classList.add("playing");st("NOW PLAYING")};
A.onpause=()=>{$("playBtn").textContent="▶";document.querySelector(".player").classList.remove("playing");st("PAUSED")};
A.onerror=()=>st("⚠ FILE NOT FOUND: "+PL[cur][1]);A.onended=()=>{load(cur+1);play()};
A.onloadedmetadata=()=>$("duration").textContent=ft(A.duration);
A.ontimeupdate=()=>{if(A.duration){$("progress").value=A.currentTime/A.duration*100;$("currentTime").textContent=ft(A.currentTime)}};
$("progress").oninput=e=>{if(A.duration)A.currentTime=e.target.value/100*A.duration};load(0);
/* BIRTHDAY (7 July) */
function bday(){const n=new Date,y=n.getFullYear(),box=$("bday");if(n.getMonth()==6&&n.getDate()==7){["days","hours","minutes","seconds"].forEach((k,i)=>$("bday-"+k).textContent=["🎉","🎂","🥳","✨"][i]);$("birthday-message").textContent="HAPPY BIRTHDAY, GREY! 🎉";return}
let t=new Date(y,6,7);if(n>t)t=new Date(y+1,6,7);const r=t-n,v=[Math.floor(r/864e5),Math.floor(r/36e5)%24,Math.floor(r/6e4)%60,Math.floor(r/1e3)%60];
["days","hours","minutes","seconds"].forEach((k,i)=>$("bday-"+k).textContent=String(v[i]).padStart(i?2:3,"0"));$("birthday-message").textContent="Counting down to 7 July. Stay legendary, Grey."}
bday();setInterval(bday,1e3);
/* PROJECTS */
const P=[
{i:"🎓",c:"#00eaff,#0a3b5c",t:"Grey-schooldesk",s:"School management system",d:"A digital system for primary and secondary schools that handles fees, receipts, report cards and parent messaging.",f:["Fee tracking and printable receipts with school logo and motto","Report cards with editable colours, learner photos and signatures","WhatsApp/email notices to all parents or private messages","Secure Bursar and Head Master login (Supabase)"],k:["HTML","CSS","JavaScript","Supabase"]},
{i:"🛒",c:"#9b5cff,#2a0f5c",t:"Grey-books",s:"Business management / POS",d:"A general business app for sales, stock, expenses, debts, suppliers and reports, planned as a mobile app.",f:["Sales and stock tracking","Expenses, debts and suppliers","Business reports","Supabase accounts"],k:["JavaScript","Supabase","Mobile"]},
{i:"✏️",c:"#ffb84d,#5c3a0a",t:"Sempala Stationery",s:"Business website",d:"A website for Sempala Stationery Shop in Kijabijjo, Gayaza, built around the shop's brochure with services and UGX prices.",f:["Brochure-based design","Services and UGX price lists","SEO for local search"],k:["HTML","CSS","SEO"]},
{i:"💠",c:"#00ffc8,#053a33",t:"Ciexturicia Grey Platform",s:"ICT study platform",d:"A learning platform for ICT students.",f:["Cyan futuristic interface","Hosted on ASP.NET hosting"],k:["Web","ICT"],l:"https://ciexturiciagrey.runasp.net"},
{i:"⚙️",c:"#4d9cff,#0a2a5c",t:"Legitmate-greytech",s:"Developer brand & hub",d:"The GREYTECH home on Cloudflare Workers, which also powers GREY AI and the visitor counter.",f:["Cloudflare Workers hosting","Backend for GREY AI and analytics"],k:["Cloudflare","Workers"],l:"https://legitmate-greytech.legitmategrey.workers.dev/"},
{i:"🧬",c:"#ff71d4,#4a0f3a",t:"This Portfolio",s:"You're looking at it",d:"My personal portfolio with GREY AI, voice input, audio player, terminal and command center.",f:["GREY AI with voice","Terminal and audio system","Live clock, birthday and visitor counter"],k:["HTML","CSS","JavaScript"]}];
$("projectGrid").innerHTML=P.map((p,n)=>`<button class="card proj" data-n="${n}"><div class="art" style="background:linear-gradient(135deg,${p.c})">${p.i}</div><div class="in"><h3>${p.t}</h3><p class="muted">${p.s}</p><span class="go">OPEN ↗</span></div></button>`).join("");
$("projectGrid").onclick=e=>{const b=e.target.closest(".proj");if(!b)return;const p=P[b.dataset.n];$("modalBox").innerHTML=`<div class="art" style="background:linear-gradient(135deg,${p.c});border-radius:12px;margin-bottom:14px">${p.i}</div><h2>${p.t}</h2><p class="muted">${p.s}</p><p>${p.d}</p><ul>${p.f.map(f=>"<li>"+f+"</li>").join("")}</ul>${p.k.map(k=>`<span class="tag">${k}</span>`).join("")}<p style="margin-top:16px">${p.l?`<a class="btn" target="_blank" rel="noopener" href="${p.l}">Visit live site ↗</a>`:""}<button class="btn ghost" id="mc">Close</button></p>`;$("modal").hidden=0;$("mc").onclick=()=>$("modal").hidden=1};
$("modal").onclick=e=>{if(e.target.id=="modal")$("modal").hidden=1};
/* PEOPLE */
$("peopleGrid").innerHTML=[["Namubiru Fatumah","fatumah"],["Mirembe Shatrah","shatrah"],["Nanyombi Michello","michello"],["Ssebidde Jordan","jordan"]].map((p,i)=>`<div class="card person"><img src="${p[1]}.jpg" alt="${p[0]}" onerror="this.outerHTML='<i>${p[0][0]}</i>'"><div><small>CONNECTION 0${i+1}</small><h3>${p[0]}</h3></div></div>`).join("");
/* GREY AI */
const K=[[/^(hi|hello|hey|yo|sup)\b/,"Hey! 👋 I'm GREY AI. Ask about Grey's skills, projects, goals or technology."],[/who are you|your name/,"I'm GREY AI 🤖, the portfolio assistant for Ciexturicia Grey."],
[/who is (grey|ciexturicia|darglous)|about grey|tell me about/,"Ciexturicia Grey (also Legitmate Grey) is a Web Developer and Programmer in Training building skills in ICT, programming and web design."],
[/real name|nickname/,"He goes by Ciexturicia Grey and Legitmate Grey."],[/dream|goal|career|future|ambition/,"His dream is to become a software engineer, with a goal of full-stack development. 🚀"],
[/educat|certificate|studying|qualif/,"Grey is working towards a National Certificate in ICT."],[/skill|good at|what can/,"HTML, CSS, JavaScript, Web Design and ICT."],
[/hobb|interest|for fun/,"Programming, web design, gaming, music, movies, travel, plus AI, computers and robotics."],[/music|artist|singer/,"His favourite artist is Tatiana Manaois. 🎵"],[/gam(e|ing)/,"GTA, Blur, Call of Duty, Need for Speed and DLS. 🎮"],
[/project|built|work/,"Grey-schooldesk, Grey-books, Sempala Stationery, the Ciexturicia Grey platform, Legitmate-greytech and this portfolio. Tap Explore My Work! 🚀"],
[/birthday|born/,"Grey's birthday is on 7 July. 🎂"],[/school|merryhill/,"Grey attended Merryhill Christian High School in Gayaza."],[/contact|email|reach|get in touch|hire|talk to|message him|call him|social/,"You can reach Grey at "+EMAIL+", through the Contact page, or on Instagram, TikTok and Facebook as @legitmategrey. 📩"],
[/^help$|what can i ask/,"Ask about Grey's skills, projects, education, goals, hobbies, music or gaming."],[/^(thanks|thank you)/,"You're welcome! 😎"],[/^(bye|goodbye)/,"See you later! 👋"]];
const local=q=>{q=q.toLowerCase().replace(/[^a-z0-9\s'-]/g," ").trim();const h=K.find(k=>k[0].test(q));return h?h[1]:null},hist=[];
function say(t,c){const e=document.createElement("div");e.className="msg "+c;e.textContent=t;$("ai-chat").append(e);$("ai-chat").scrollTop=1e9;return e}
async function sendGreyMessage(){const i=$("ai-input"),m=i.value.trim();if(!m)return;i.value="";say(m,"user");hist.push({role:"user",content:m});
const l=local(m);if(l){hist.push({role:"assistant",content:l});setTimeout(()=>{say(l,"bot");speakGrey(l)},300);return}
const w=say("GREY AI is thinking...","bot");let a;
try{const r=await fetch(API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:m,history:hist.slice(-10)})}),d=await r.json();if(!r.ok||d.error||d.success===false)throw Error(d.error||"backend");a=d.answer||d.reply}
catch(e){console.error("GREY AI:",e);a="I couldn't reach my brain just now 🤖. Try asking about Grey's skills, projects or goals."}
w.textContent=a;hist.push({role:"assistant",content:a});speakGrey(a)}
window.sendGreyMessage=sendGreyMessage;window.askGrey=q=>{$("ai-input").value=q;sendGreyMessage()};window.toggleGreyAI=()=>$("grey-ai").classList.toggle("active");
$("ai-input").onkeydown=e=>{if(e.key=="Enter"){e.preventDefault();sendGreyMessage()}};
async function status(){const e=$("greyAiStatusText");try{const r=await fetch(API,{cache:"no-store"}),d=await r.json();e.textContent=d.status=="online"?"ONLINE":"OFFLINE"}catch{e.textContent="OFFLINE"}}status();setInterval(status,3e4);
/* VOICE */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition,vb=$("voiceBtn"),vs=$("voiceStatus");let rec,on=0;
const ER={"not-allowed":"🎤 Allow microphone access in your browser settings.","service-not-allowed":"🎤 Speech service blocked. Open in Chrome.","audio-capture":"🎤 No microphone found.","no-speech":"🎤 Didn't hear anything. Try again.",network:"🌐 Network error. Check your connection."};
if(!SR||!window.isSecureContext){vb.disabled=1;vb.style.opacity=.4;vs.textContent=SR?"Voice needs HTTPS":"Voice unsupported here — open in Chrome"}
else{rec=new SR;rec.lang="en-US";rec.interimResults=true;
rec.onstart=()=>{on=1;vb.classList.add("listening");vs.textContent="Listening..."};
rec.onresult=e=>{let t="";for(const r of e.results)t+=r[0].transcript;$("ai-input").value=t;if(e.results[e.results.length-1].isFinal){vs.textContent="Sending...";sendGreyMessage()}};
rec.onerror=e=>{console.error("voice",e.error);vs.textContent=ER[e.error]||"🎤 Voice error: "+e.error};
rec.onend=()=>{on=0;vb.classList.remove("listening");if(vs.textContent=="Listening...")vs.textContent="Tap 🎤 to speak"};
vb.onclick=async()=>{if(on)return rec.stop();speechSynthesis.cancel();
try{const s=await navigator.mediaDevices.getUserMedia({audio:true});s.getTracks().forEach(t=>t.stop())}catch{vs.textContent=ER["not-allowed"];return}
try{rec.start()}catch(e){console.error(e)}}}
function speakGrey(t){if(!t||!("speechSynthesis" in window)||!$("voiceOutput").checked||on)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang="en-US";u.rate=.95;u.onstart=()=>vs.textContent="GREY AI is speaking...";u.onend=()=>vs.textContent="Tap 🎤 to speak";speechSynthesis.speak(u)}
/* ACTIVITY LOG */
const M=["GREY AI neural system initialized","Portfolio interface synchronized","Command Center monitoring active","JavaScript engine operational","Cloud AI connection monitored"];let mi=0;
function act(){const l=$("grey-activity-log"),d=document.createElement("div"),t=new Date().toLocaleTimeString("en-GB",{timeZone:"Africa/Kampala"});
d.textContent=t+" — "+(!A.paused?"GREY AUDIO playing "+PL[cur][0]:on?"GREY AI microphone listening":M[mi++%M.length]);d.append(Object.assign(document.createElement("i"),{className:"lb"}));l.prepend(d);while(l.children.length>4)l.lastChild.remove()}act();setInterval(act,8e3);
/* TERMINAL */
(()=>{const f=$("grey-terminal-form"),i=$("grey-terminal-input"),o=$("grey-terminal-output");
const C={help:["help, about, skills, projects, contact, clear"],about:["Ciexturicia Grey (Legitmate Grey) — ICT practitioner and developer in training.","Dream: software engineer. Goal: full-stack developer."],
skills:["HTML, CSS, JavaScript, Web Design, ICT, GitHub, Supabase"],projects:["Grey-schooldesk, Grey-books, Sempala Stationery, Ciexturicia Grey Platform, Legitmate-greytech, this portfolio","Scroll to Explore My Work to open each one."],
contact:["Email: "+EMAIL,"Instagram / TikTok / Facebook: @legitmategrey"]};
f.onsubmit=e=>{e.preventDefault();const r=i.value,c=r.trim().toLowerCase();i.value="";if(!c)return;if(c=="clear"){o.textContent="";return}
o.append("\nvisitor@grey:~$ "+r+"\n"+(C[c]?C[c].join("\n"):'Command not found: '+c+'. Type "help".')+"\n");o.scrollTop=1e9}})();
/* VISITORS */
fetch("https://grey-visitor-counter.legitmategrey.workers.dev/").then(r=>r.json()).then(d=>{if(d.success)$("totalVisits").textContent=Number(d.totalVisits).toLocaleString()}).catch(()=>$("totalVisits").textContent="—");

$("vchart").innerHTML="<span></span>".repeat(14);

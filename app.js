
const PATH=location.pathname.split('/').pop()||'index.html';
async function loadJSON(path){const r=await fetch(path);if(!r.ok)throw new Error(path);return r.json()}
async function initSite(){
 try{const site=await loadJSON('site-data.json');renderGlobal(site)}catch(e){console.error(e)}
 setActiveNav();setupMenu();setupLanguage();startClock();setupSlides();routePage();
}
function renderGlobal(site){
 const s=site.school,p=site.principal,c=site.chairperson;
 document.querySelectorAll('[data-school-name]').forEach(e=>e.textContent=s.name);
 document.querySelectorAll('[data-school-address]').forEach(e=>e.textContent=s.address);
 document.querySelectorAll('[data-established]').forEach(e=>e.textContent=s.established);
 document.querySelectorAll('[data-principal-name]').forEach(e=>e.textContent=p.name);
 document.querySelectorAll('[data-chairperson-name]').forEach(e=>e.textContent=c.name);
 document.querySelectorAll('[data-principal-phone]').forEach(e=>{e.textContent=p.phone;e.href='tel:'+p.phone.replace(/[^\d+]/g,'')});
 document.querySelectorAll('[data-chairperson-phone]').forEach(e=>{e.textContent=c.phone;e.href='tel:'+c.phone.replace(/[^\d+]/g,'')});
 document.querySelectorAll('[data-principal-message]').forEach(e=>e.textContent=p.message);
 document.querySelectorAll('[data-chairperson-message]').forEach(e=>e.textContent=c.message);
 const map=document.querySelector('[data-map]');if(map)map.src='https://www.google.com/maps?q='+encodeURIComponent(s.mapQuery)+'&output=embed';
}
function setupMenu(){const b=document.querySelector('.menu-btn'),n=document.querySelector('.nav');if(b&&n)b.onclick=()=>n.classList.toggle('open')}
function setActiveNav(){document.querySelectorAll('.nav a').forEach(a=>{if(a.getAttribute('href')===PATH)a.classList.add('active')})}
function setupLanguage(){
 const b=document.querySelector('.lang-btn');if(!b)return;
 const set=()=>{const ne=localStorage.getItem('lotusLang')==='ne';document.documentElement.lang=ne?'ne':'en';b.textContent=ne?'English':'नेपाली';document.querySelectorAll('[data-en][data-ne]').forEach(e=>e.textContent=ne?e.dataset.ne:e.dataset.en)};
 set();b.onclick=()=>{localStorage.setItem('lotusLang',localStorage.getItem('lotusLang')==='ne'?'en':'ne');set()}
}
function startClock(){
 const el=document.querySelector('[data-clock]');if(!el)return;
 const months=[['2026-04-14',1],['2026-05-15',2],['2026-06-15',3],['2026-07-17',4],['2026-08-17',5],['2026-09-17',6],['2026-10-18',7],['2026-11-17',8],['2026-12-16',9],['2027-01-15',10],['2027-02-13',11],['2027-03-15',12]];
 const names=['Baisakh','Jestha','Ashadh','Shrawan','Bhadra','Ashwin','Kartik','Mangsir','Poush','Magh','Falgun','Chaitra'];
 function bs(d){
  const x=new Date(d.getFullYear(),d.getMonth(),d.getDate()),start=new Date(2026,3,14),end=new Date(2027,3,13);
  if(x<start||x>end)return '2083 calendar range only';
  let i=0;for(let j=0;j<months.length;j++){const p=months[j][0].split('-').map(Number),m=new Date(p[0],p[1]-1,p[2]);if(x>=m)i=j;else break}
  const p=months[i][0].split('-').map(Number),m=new Date(p[0],p[1]-1,p[2]),day=Math.floor((x-m)/86400000)+1;
  return `2083/${String(months[i][1]).padStart(2,'0')}/${String(day).padStart(2,'0')} (${names[i]})`;
 }
 function tick(){const d=new Date(),ad=d.toLocaleDateString('en-GB',{weekday:'short',day:'2-digit',month:'short',year:'numeric'}),tm=d.toLocaleTimeString('en-NP',{hour:'2-digit',minute:'2-digit',second:'2-digit'});el.innerHTML=`<strong>${ad} | ${tm}</strong><span>BS: ${bs(d)}</span>`}
 tick();setInterval(tick,1000)
}
function setupSlides(){
 const s=[...document.querySelectorAll('.slide')],d=[...document.querySelectorAll('.dot')];if(!s.length)return;let n=0;
 const show=i=>{n=(i+s.length)%s.length;s.forEach((x,j)=>x.classList.toggle('active',j===n));d.forEach((x,j)=>x.classList.toggle('active',j===n))};
 d.forEach((x,i)=>x.onclick=()=>show(i));show(0);setInterval(()=>show(n+1),5000)
}
async function routePage(){
 const key=document.body.dataset.page,paths={notices:'notices/notices.json',events:'events/events.json',academics:'academics/academics.json',calendar:'calendar/calendar.json',admission:'admission/admission.json',routine:'routine/routine.json',parents:'parents/comments.json',achievements:'achievements/achievements.json',links:'links/links.json',exam:'exam/exam.json',students:'students/students.json'};
 if(!key||!paths[key])return;const root=document.querySelector('[data-content]');try{const data=await loadJSON(paths[key]);
  if(key==='notices')root.innerHTML=data.map(x=>`<article class="notice"><div class="notice-date">${x.date}</div><div><h3>${x.title}</h3><p>${x.body}</p></div></article>`).join('');
  if(key==='events')root.innerHTML=`<div class="grid grid-3">${data.map(x=>`<article class="card"><span class="badge">${x.date}</span><h3>${x.title}</h3><p>${x.description}</p></article>`).join('')}</div>`;
  if(key==='academics')root.innerHTML=`<div class="grid grid-3">${data.map(x=>`<article class="card"><span class="badge">${x.classes}</span><h3>${x.title}</h3><p>${x.description}</p></article>`).join('')}</div>`;
  if(key==='calendar')root.innerHTML=`<div class="table-wrap"><table><thead><tr><th>Date</th><th>Event</th><th>Note</th></tr></thead><tbody>${data.map(x=>`<tr><td>${x.date}</td><td>${x.event}</td><td>${x.note}</td></tr>`).join('')}</tbody></table></div>`;
  if(key==='admission')root.innerHTML=`<div class="grid grid-2"><article class="card"><h3>Admission Process</h3><ol>${data.steps.map(x=>`<li>${x}</li>`).join('')}</ol></article><article class="card"><h3>Documents</h3><ul>${data.documents.map(x=>`<li>${x}</li>`).join('')}</ul><div class="alert">${data.note}</div></article></div>`;
  if(key==='routine')root.innerHTML=`<div class="table-wrap"><table><thead><tr><th>Day</th><th>Periods / Activities</th></tr></thead><tbody>${data.map(x=>`<tr><td><strong>${x.day}</strong></td><td>${x.periods.map(p=>`<span class="badge">${p}</span> `).join('')}</td></tr>`).join('')}</tbody></table></div>`;
  if(key==='parents')root.innerHTML=`<div class="grid grid-2">${data.map(x=>`<article class="card"><span class="badge">${x.class}</span><h3>${x.name}</h3><p>“${x.comment}”</p></article>`).join('')}</div>`;
  if(key==='achievements')root.innerHTML=`<div class="grid grid-3">${data.map(x=>`<article class="card"><div class="facility-icon">🏆</div><h3>${x.title}</h3><p>${x.description}</p></article>`).join('')}</div>`;
  if(key==='links')root.innerHTML=`<div class="grid grid-2">${data.map(x=>`<article class="card"><h3>${x.title}</h3><p>${x.description}</p><br><a class="btn" href="${x.url}" target="_blank" rel="noopener">Open Link</a></article>`).join('')}</div>`;
  if(key==='exam')renderExam(root,data);
  if(key==='students')renderStudents(root,data);
 }catch(e){root.innerHTML='<div class="alert">Content could not be loaded. Use GitHub Pages or a local web server.</div>'}
}
function renderExam(root,data){
 root.innerHTML=`<article class="card"><h2>${data.title}</h2><p>${data.instructions.join(' ')}</p><form id="examForm">${data.questions.map((x,i)=>`<div class="exam-question"><h3>${i+1}. ${x.q}</h3>${x.options.map((o,j)=>`<label class="option"><input type="radio" name="q${i}" value="${j}" required><span>${o}</span></label>`).join('')}</div>`).join('')}<button class="btn btn-accent" type="submit">Submit Exam</button></form><div id="examResult" class="result"></div></article>`;
 document.querySelector('#examForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);let score=0;data.questions.forEach((q,i)=>{if(Number(f.get('q'+i))===q.answer)score++});const pct=Math.round(score/data.questions.length*100),r=document.querySelector('#examResult');r.style.display='block';r.innerHTML=`<strong>Result: ${score}/${data.questions.length} (${pct}%)</strong><br>This is a client-side practice result.`}
}
function renderStudents(root,data){
 root.innerHTML=`<div class="grid grid-2"><article class="card"><h3>Check Student Status</h3><p class="small">Enter all three details. Use only authorised records.</p><form id="studentForm" class="form"><div><label>Symbol No.</label><input id="symbol" required></div><div><label>Date of Birth</label><input id="dob" type="date" required></div><div><label>Student Name</label><input id="sname" required></div><button class="btn" type="submit">Check Status</button></form><div id="studentResult" class="result"></div></article><article class="card"><h3>Student Portal</h3><p>Students can use this area to check authorised status information after the school adds records to <code>students/students.json</code>.</p><div class="alert">The included records are demo placeholders only.</div></article></div>`;
 document.querySelector('#studentForm').onsubmit=e=>{e.preventDefault();const sym=document.querySelector('#symbol').value.trim().toLowerCase(),dob=document.querySelector('#dob').value,name=document.querySelector('#sname').value.trim().toLowerCase(),found=data.find(x=>x.symbol.toLowerCase()===sym&&x.dob===dob&&x.name.toLowerCase()===name),r=document.querySelector('#studentResult');r.style.display='block';r.innerHTML=found?`<strong>Status: ${found.status}</strong><br>Class: ${found.class}<br>${found.remark}`:'No matching authorised record was found.'}
}
document.addEventListener('DOMContentLoaded',initSite);

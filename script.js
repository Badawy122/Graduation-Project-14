const CH=['فيسبوك','إنستجرام','جوجل','تيك توك','البريد الإلكتروني'];
let D=[
{id:1,n:'إطلاق التشكيلة الشتوية',c:'فيسبوك',b:50000,s:42000,i:900000,k:27000,v:820,r:164000,st:'نشطة'},
{id:2,n:'عروض الجمعة البيضاء',c:'إنستجرام',b:60000,s:57500,i:1200000,k:40000,v:1350,r:270000,st:'نشطة'},
{id:3,n:'إعلانات البحث – الكلمات الأساسية',c:'جوجل',b:40000,s:31000,i:300000,k:21000,v:900,r:180000,st:'نشطة'},
{id:4,n:'تحدي الفيديو القصير',c:'تيك توك',b:35000,s:34000,i:2500000,k:30000,v:410,r:61000,st:'منتهية'},
{id:5,n:'نشرة العملاء الأسبوعية',c:'البريد الإلكتروني',b:8000,s:6200,i:80000,k:9000,v:520,r:104000,st:'نشطة'},
{id:6,n:'إعادة الاستهداف',c:'فيسبوك',b:25000,s:12000,i:400000,k:14000,v:610,r:122000,st:'متوقفة'},
{id:7,n:'مؤثرين رمضان',c:'إنستجرام',b:45000,s:44000,i:1500000,k:22000,v:380,r:70000,st:'منتهية'},
{id:8,n:'إعلانات التسوق',c:'جوجل',b:30000,s:18000,i:260000,k:12000,v:700,r:154000,st:'نشطة'}];
let sel=[2,3,5],sortK='id',sortD=1,nid=9;
const $=s=>document.querySelector(s),n0=x=>Math.round(x).toLocaleString('en-US'),n1=x=>x.toFixed(1);
const M=d=>({ctr:d.k/d.i*100,cpc:d.s/d.k,cpa:d.s/d.v,roas:d.r/d.s,roi:(d.r-d.s)/d.s*100,burn:d.s/d.b*100});
const sum=a=>a.reduce((p,x)=>({b:p.b+x.b,s:p.s+x.s,r:p.r+x.r,v:p.v+x.v,k:p.k+x.k,i:p.i+x.i}),{b:0,s:0,r:0,v:0,k:0,i:0});
function bar(l,p,v,cls=''){return `<div class="bar"><span class="l">${l}</span><div class="t"><i class="${cls}" style="width:${Math.min(100,Math.max(2,p))}%"></i></div><span class="v">${v}</span></div>`}
function byCh(){return CH.map(c=>{const a=D.filter(d=>d.c===c);const t=sum(a);return{c,n:a.length,...t,roas:t.s?t.r/t.s:0,cpa:t.v?t.s/t.v:0}}).filter(x=>x.n)}

function dash(){
const t=sum(D);
$('#kpis').innerHTML=[['إجمالي الميزانية',n0(t.b)+' ج'],['المصروف',n0(t.s)+' ج'],['الإيراد',n0(t.r)+' ج'],['ROAS',n1(t.r/t.s)+'×'],['التحويلات',n0(t.v)],['CTR',n1(t.k/t.i*100)+'%']].map(([a,b])=>`<div class="card kpi"><small>${a}</small><b>${b}</b></div>`).join('');
const ch=byCh().sort((a,b)=>b.roas-a.roas),best=ch[0],worst=ch[ch.length-1];
const hot=D.filter(d=>d.st==='نشطة'&&d.s/d.b>.9);
let ins=`<div class="ins">🏆 أفضل قناة عائدًا: <b>${best.c}</b> بـ ROAS ${n1(best.roas)}×</div>`;
if(worst!==best)ins+=`<div class="ins">⚠️ أضعف قناة: <b>${worst.c}</b> بـ ROAS ${n1(worst.roas)}× — راجع الميزانية المخصصة لها.</div>`;
if(hot.length)ins+=`<div class="ins">🔔 حملات استهلكت أكثر من 90% من ميزانيتها: ${hot.map(h=>h.n).join('، ')}</div>`;
$('#ins').innerHTML=ins;
const mx=Math.max(...ch.map(x=>Math.max(x.s,x.r)));
$('#chRev').innerHTML=ch.map(x=>bar(x.c,x.s/mx*100,n0(x.s/1000)+'ك','sp')+bar('',x.r/mx*100,n0(x.r/1000)+'ك','rev')).join('')+'<p style="font-size:12px;color:var(--mut)">الأزرق الفاتح = إنفاق، الكحلي = إيراد (بالألف جنيه)</p>';
$('#burn').innerHTML=D.map(d=>{const p=d.s/d.b*100;return bar(d.n,p,n0(p)+'%',p>90?'bad':p>70?'warn':'')}).join('');
}

function camps(){
const th=[['n','الحملة'],['c','القناة'],['st','الحالة'],['b','الميزانية'],['s','المصروف'],['ctr','CTR'],['cpa','CPA'],['roas','ROAS']];
$('#th').innerHTML='<th></th>'+th.map(([k,l])=>`<th data-k="${k}">${l}${sortK===k?(sortD>0?' ▲':' ▼'):''}</th>`).join('');
const q=$('#q').value.trim(),fc=$('#fc').value,fs=$('#fs').value;
let a=D.filter(d=>(!q||d.n.includes(q))&&(!fc||d.c===fc)&&(!fs||d.st===fs));
const val=d=>({...d,...M(d)})[sortK];
a.sort((x,y)=>{const p=val(x),r=val(y);return (p>r?1:p<r?-1:0)*sortD});
$('#tb').innerHTML=a.map(d=>{const m=M(d);return `<tr><td><input type="checkbox" data-id="${d.id}" ${sel.includes(d.id)?'checked':''}></td><td><a href="#" class="lk" data-a="${d.id}">${d.n}</a></td><td><span class="tag">${d.c}</span></td><td class="s-${d.st}">● ${d.st}</td><td>${n0(d.b)}</td><td>${n0(d.s)}</td><td>${n1(m.ctr)}%</td><td>${n0(m.cpa)}</td><td>${n1(m.roas)}×</td></tr>`}).join('')||'<tr><td colspan="9">لا توجد حملات مطابقة.</td></tr>';
}

function cmp(){
$('#chips').innerHTML=D.map(d=>`<button class="chip ${sel.includes(d.id)?'on':''}" data-id="${d.id}">${d.n}</button>`).join('');
const a=sel.map(i=>D.find(d=>d.id===i)).filter(Boolean);
if(a.length<2){$('#cmpT').innerHTML='<p>اختر حملتين على الأقل.</p>';$('#cmpB').innerHTML='';return}
const rows=[['القناة',d=>d.c],['الميزانية',d=>n0(d.b)],['المصروف',d=>n0(d.s)],['الإيراد',d=>n0(d.r)],['التحويلات',d=>n0(d.v),'v',1],['CTR %',d=>n1(M(d).ctr),'ctr',1],['CPC',d=>n1(M(d).cpc),'cpc',-1],['CPA',d=>n0(M(d).cpa),'cpa',-1],['ROAS ×',d=>n1(M(d).roas),'roas',1],['ROI %',d=>n0(M(d).roi),'roi',1]];
const get=(d,k)=>k==='v'?d.v:M(d)[k];
$('#cmpT').innerHTML='<table><thead><tr><th>المؤشر</th>'+a.map(d=>`<th>${d.n}</th>`).join('')+'</tr></thead><tbody>'+rows.map(([l,f,k,dir])=>{
let b=null;if(k){b=a.reduce((p,d)=>(get(d,k)*dir>get(p,k)*dir?d:p),a[0])}
return `<tr><td>${l}</td>`+a.map(d=>`<td class="${b===d?'best':''}">${f(d)}${b===d?' ★':''}</td>`).join('')+'</tr>'}).join('')+'</tbody></table>';
const mx=Math.max(...a.map(d=>M(d).roas));
$('#cmpB').innerHTML=a.map(d=>bar(d.n,M(d).roas/mx*100,n1(M(d).roas)+'×','rev')).join('');
}

function chan(){
const c=byCh(),ts=sum(D).s;
$('#share').innerHTML=c.map(x=>bar(x.c,x.s/ts*100,n0(x.s/ts*100)+'%')).join('');
const r=[...c].sort((a,b)=>b.roas-a.roas),mx=r[0].roas;
$('#rank').innerHTML=r.map(x=>bar(x.c,x.roas/mx*100,n1(x.roas)+'×','rev')).join('');
$('#ct').innerHTML=c.map(x=>`<tr><td>${x.c}</td><td>${x.n}</td><td>${n0(x.b)}</td><td>${n0(x.s)}</td><td>${n0(x.r)}</td><td>${n0(x.cpa)}</td><td>${n1(x.roas)}×</td></tr>`).join('');
}

function kpi(){$('#kt').innerHTML=D.map(d=>{const m=M(d),g=m.roas>=4?['ممتاز','good']:m.roas>=2?['جيد','mid']:['ضعيف','low'];return `<tr><td>${d.n}</td><td><span class="tag">${d.c}</span></td><td>${n1(m.ctr)}</td><td>${n1(m.cpc)}</td><td>${n0(m.cpa)}</td><td>${n1(m.roas)}×</td><td>${n0(m.roi)}</td><td class="${g[1]}">● ${g[0]}</td></tr>`}).join('')}
let cur=1;
function daily(d,n=10){const w=ph=>{const a=[...Array(n)].map((_,i)=>1+.45*Math.sin(d.id*1.7+i*.8+ph)+.2*Math.cos(i*1.3+d.id));const t=a.reduce((p,x)=>p+x,0);return a.map(x=>x/t)};return{s:w(0).map(x=>x*d.s),r:w(1.1).map(x=>x*d.r)}}
function lineChart(a,b){const W=520,H=220,pl=44,pr=10,pt=12,pb=26,n=a.length,mx=Math.max(...a,...b)*1.1;
const x=i=>pl+i*(W-pl-pr)/(n-1),y=v=>pt+(H-pt-pb)*(1-v/mx),pts=s=>s.map((v,i)=>x(i)+','+y(v)).join(' ');
let g='';for(let k=0;k<=4;k++){const v=mx*k/4;g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v)}" y2="${y(v)}" stroke="var(--bd)"/><text x="${pl-6}" y="${y(v)+4}" text-anchor="end" font-size="11" fill="var(--mut)">${n0(v/1000)}ك</text>`}
a.forEach((_,i)=>{g+=`<text x="${x(i)}" y="${H-8}" text-anchor="middle" font-size="11" fill="var(--mut)">${i+1}</text>`});
const dots=(s,c)=>s.map((v,i)=>`<circle cx="${x(i)}" cy="${y(v)}" r="3" fill="${c}"/>`).join('');
return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;direction:ltr">${g}<polyline points="${pts(a)}" fill="none" stroke="var(--sky)" stroke-width="2.5"/><polyline points="${pts(b)}" fill="none" stroke="var(--navy)" stroke-width="2.5"/>${dots(a,'var(--sky)')}${dots(b,'var(--navy)')}</svg><div class="lg"><span><i style="background:var(--sky)"></i>الإنفاق</span><span><i style="background:var(--navy)"></i>الإيراد</span><span>المحور السفلي: رقم اليوم</span></div>`}
function ana(){
$('#as').innerHTML=D.map(d=>`<option value="${d.id}" ${d.id===cur?'selected':''}>${d.n}</option>`).join('');
const d=D.find(x=>x.id===cur)||D[0],m=M(d),g=m.roas>=4?['ممتاز','good']:m.roas>=2?['جيد','mid']:['ضعيف','low'];
$('#ast').innerHTML=`<span class="tag">${d.c}</span> <span class="s-${d.st}">● ${d.st}</span> <span class="${g[1]}">● تقييم: ${g[0]}</span>`;
$('#ak').innerHTML=[['الإيراد',n0(d.r)+' ج'],['المصروف',n0(d.s)+' ج'],['ROAS',n1(m.roas)+'×'],['ROI',n0(m.roi)+'%'],['CPA',n0(m.cpa)+' ج'],['التحويلات',n0(d.v)]].map(([a,b])=>`<div class="card kpi"><small>${a}</small><b>${b}</b></div>`).join('');
$('#fun').innerHTML=`<div class="fn" style="width:100%;background:var(--navy)">ظهور: ${n0(d.i)}</div><div class="fr">▼ معدل النقر CTR ${n1(m.ctr)}%</div><div class="fn" style="width:68%;background:var(--pri)">نقرات: ${n0(d.k)}</div><div class="fr">▼ معدل التحويل ${n1(d.v/d.k*100)}%</div><div class="fn" style="width:38%;background:var(--sky);color:var(--navy)">تحويلات: ${n0(d.v)}</div>`;
const p=Math.min(100,m.burn),R=52,C=2*Math.PI*R,col=p>90?'var(--bad)':p>70?'var(--warn)':'var(--pri)';
$('#don').innerHTML=`<div class="dn"><svg viewBox="0 0 140 140" width="150" height="150"><circle cx="70" cy="70" r="${R}" fill="none" stroke="var(--pri2)" stroke-width="16"/><circle cx="70" cy="70" r="${R}" fill="none" stroke="${col}" stroke-width="16" stroke-linecap="round" stroke-dasharray="${C*p/100} ${C}" transform="rotate(-90 70 70)"/><text x="70" y="76" text-anchor="middle" font-size="22" font-weight="700" fill="var(--tx)">${n0(m.burn)}%</text></svg><ul><li>الميزانية: <b>${n0(d.b)}</b> ج</li><li>المصروف: <b>${n0(d.s)}</b> ج</li><li>المتبقي: <b>${n0(Math.max(0,d.b-d.s))}</b> ج</li></ul></div>`;
const z=daily(d);$('#trd').innerHTML=lineChart(z.s,z.r);
const t=sum(D),av={ctr:t.k/t.i*100,cpc:t.s/t.k,cpa:t.s/t.v,roas:t.r/t.s};
$('#vs').innerHTML=[['CTR %','ctr',1,n1],['ROAS ×','roas',1,n1],['CPC','cpc',-1,n1],['CPA','cpa',-1,n0]].map(([l,k,dir,f])=>{const v=m[k],a=av[k],mx=Math.max(v,a);return bar(l,v/mx*100,f(v)+(v*dir>a*dir?' ✓':''),'rev')+bar('المتوسط',a/mx*100,f(a),'sp')}).join('')+'<p style="font-size:12px;color:var(--mut)">✓ = أفضل من المتوسط (الأقل أفضل في CPC وCPA)</p>';
}
const views=['dash','camps','cmp','chan','kpi','ana'],fn={dash,camps,cmp,chan,kpi,ana};
function show(v){views.forEach(x=>{$('#'+x).classList.toggle('hide',x!==v)});document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));fn[v]();scrollTo(0,0)}
$('#nav').onclick=e=>{const v=e.target.dataset.v;if(v)show(v)};
$('#fc').innerHTML='<option value="">كل القنوات</option>'+CH.map(c=>`<option>${c}</option>`).join('');
$('#fcSel').innerHTML=CH.map(c=>`<option>${c}</option>`).join('');
['#q','#fc','#fs'].forEach(s=>$(s).oninput=camps);
$('#th').onclick=e=>{const k=e.target.dataset.k;if(!k)return;sortD=sortK===k?-sortD:1;sortK=k;camps()};
$('#tb').onchange=e=>{const id=+e.target.dataset.id;if(e.target.checked){if(sel.length>=3){e.target.checked=false;return}sel.push(id)}else sel=sel.filter(i=>i!==id)};
$('#chips').onclick=e=>{const id=+e.target.dataset.id;if(!id)return;if(sel.includes(id))sel=sel.filter(i=>i!==id);else if(sel.length<3)sel.push(id);cmp()};
$('#as').onchange=e=>{cur=+e.target.value;ana()};
$('#tb').onclick=e=>{const a=e.target.closest('[data-a]');if(a){e.preventDefault();cur=+a.dataset.a;show('ana')}};
$('#add').onclick=()=>$('#dlg').showModal();
$('#fm').onsubmit=e=>{if(e.submitter.value!=='ok')return;const f=new FormData($('#fm'));const o={id:nid++,st:f.get('st'),c:f.get('c'),n:f.get('n')};['b','s','i','k','v','r'].forEach(k=>o[k]=+f.get(k));D.push(o);$('#fm').reset();camps();dash()};
show('dash');

const secs=['top','problem','scope','features','pricing','faq','contact'];
function setActive(k){document.querySelectorAll('#site button').forEach(b=>b.classList.toggle('on',k==='app'?b.dataset.p==='app':b.dataset.p==='home'&&b.dataset.s===k))}
function spy(){if($('#home').classList.contains('hide'))return;let c='top';secs.forEach(id=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=140)c=id});if(innerHeight+scrollY>=document.body.scrollHeight-4)c='contact';setActive(c)}
addEventListener('scroll',spy,{passive:true});
function go(p,s,v){
$('#home').classList.toggle('hide',p!=='home');$('#app').classList.toggle('hide',p!=='app');
if(p==='app'){show(v||'dash');setActive('app')}
else{setActive(s||'top');if(s&&s!=='top'){const el=document.getElementById(s);el&&el.scrollIntoView({behavior:'smooth'})}else scrollTo(0,0)}
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(b)go(b.dataset.p,b.dataset.s,b.dataset.v)});
$('#cf').onsubmit=e=>{e.preventDefault();$('#cm').textContent='شكرًا '+e.target.n.value+'، وصلت رسالتك وهنرد عليك قريبًا.';e.target.reset()};
go('home');

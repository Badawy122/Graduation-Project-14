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
$('#tb').innerHTML=a.map(d=>{const m=M(d);return `<tr><td><input type="checkbox" data-id="${d.id}" ${sel.includes(d.id)?'checked':''}></td><td>${d.n}</td><td><span class="tag">${d.c}</span></td><td class="s-${d.st}">● ${d.st}</td><td>${n0(d.b)}</td><td>${n0(d.s)}</td><td>${n1(m.ctr)}%</td><td>${n0(m.cpa)}</td><td>${n1(m.roas)}×</td></tr>`}).join('')||'<tr><td colspan="9">لا توجد حملات مطابقة.</td></tr>';
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
const views=['dash','camps','cmp','chan','kpi'],fn={dash,camps,cmp,chan,kpi};
function show(v){views.forEach(x=>{$('#'+x).classList.toggle('hide',x!==v)});document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));fn[v]();scrollTo(0,0)}
$('#nav').onclick=e=>{const v=e.target.dataset.v;if(v)show(v)};
$('#fc').innerHTML='<option value="">كل القنوات</option>'+CH.map(c=>`<option>${c}</option>`).join('');
$('#fcSel').innerHTML=CH.map(c=>`<option>${c}</option>`).join('');
['#q','#fc','#fs'].forEach(s=>$(s).oninput=camps);
$('#th').onclick=e=>{const k=e.target.dataset.k;if(!k)return;sortD=sortK===k?-sortD:1;sortK=k;camps()};
$('#tb').onchange=e=>{const id=+e.target.dataset.id;if(e.target.checked){if(sel.length>=3){e.target.checked=false;return}sel.push(id)}else sel=sel.filter(i=>i!==id)};
$('#chips').onclick=e=>{const id=+e.target.dataset.id;if(!id)return;if(sel.includes(id))sel=sel.filter(i=>i!==id);else if(sel.length<3)sel.push(id);cmp()};
$('#add').onclick=()=>$('#dlg').showModal();
$('#fm').onsubmit=e=>{if(e.submitter.value!=='ok')return;const f=new FormData($('#fm'));const o={id:nid++,st:f.get('st'),c:f.get('c'),n:f.get('n')};['b','s','i','k','v','r'].forEach(k=>o[k]=+f.get(k));D.push(o);$('#fm').reset();camps();dash()};
show('dash');

function go(p,s,v){
$('#home').classList.toggle('hide',p!=='home');$('#app').classList.toggle('hide',p!=='app');
if(p==='app')show(v||'dash');
else if(s&&s!=='top'){const el=document.getElementById(s);el&&el.scrollIntoView({behavior:'smooth'})}else scrollTo(0,0);
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(b)go(b.dataset.p,b.dataset.s,b.dataset.v)});
$('#cf').onsubmit=e=>{e.preventDefault();$('#cm').textContent='شكرًا '+e.target.n.value+'، وصلت رسالتك وهنرد عليك قريبًا.';e.target.reset()};
go('home');

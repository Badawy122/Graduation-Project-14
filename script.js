/* ========== أدوات ========== */
const $=s=>document.querySelector(s),n0=x=>Math.round(x||0).toLocaleString('en-US'),n1=x=>(+x||0).toFixed(1),dv=(a,b)=>b?a/b:0;
const store={get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}},del(k){try{localStorage.removeItem(k)}catch{}}};
const CH=['فيسبوك','إنستجرام','جوجل','تيك توك','البريد الإلكتروني'],OBJ=['زيادة الوعي','جذب زيارات','تحقيق مبيعات','جمع بيانات عملاء'],SEG=['عملاء جدد','عملاء حاليون','باحثون عن العروض','شباب 18-24','أصحاب أعمال'];

/* ========== البيانات ========== */
const raw=[
['إطلاق التشكيلة الشتوية','ملابس شتوية','تحقيق مبيعات','عملاء جدد','فيسبوك',50000,42000,900000,27000,820,164000,'نشطة','2026-10-01','2026-12-15'],
['عروض الجمعة البيضاء','متجر إلكتروني','تحقيق مبيعات','باحثون عن العروض','إنستجرام',60000,57500,1200000,40000,1350,270000,'نشطة','2026-10-20','2026-11-30'],
['إعلانات البحث – الكلمات الأساسية','خدمات','جذب زيارات','عملاء جدد','جوجل',40000,31000,300000,21000,900,180000,'نشطة','2026-09-01','2026-12-31'],
['تحدي الفيديو القصير','علامة تجارية','زيادة الوعي','شباب 18-24','تيك توك',35000,34000,2500000,30000,410,61000,'منتهية','2026-08-01','2026-09-30'],
['نشرة العملاء الأسبوعية','اشتراكات','تحقيق مبيعات','عملاء حاليون','البريد الإلكتروني',8000,6200,80000,9000,520,104000,'نشطة','2026-07-01','2026-12-31'],
['إعادة الاستهداف','متجر إلكتروني','تحقيق مبيعات','عملاء حاليون','فيسبوك',25000,12000,400000,14000,610,122000,'متوقفة','2026-09-15','2026-11-15'],
['مؤثرين رمضان','علامة تجارية','زيادة الوعي','شباب 18-24','إنستجرام',45000,44000,1500000,22000,380,70000,'منتهية','2026-02-10','2026-03-20'],
['إعلانات التسوق','متجر إلكتروني','تحقيق مبيعات','عملاء جدد','جوجل',30000,18000,260000,12000,700,154000,'نشطة','2026-10-10','2026-12-20']];
const sample=()=>raw.map((r,i)=>({id:i+1,n:r[0],pr:r[1],ob:r[2],au:r[3],c:r[4],b:r[5],s:r[6],i:r[7],k:r[8],v:r[9],r:r[10],st:r[11],sd:r[12],ed:r[13],ds:'حملة «'+r[2]+'» لمنتج: '+r[1]+'.'}));
let D=[],nid=1;
const M=d=>({ctr:dv(d.k,d.i)*100,cpc:dv(d.s,d.k),cpm:dv(d.s,d.i)*1000,cpa:dv(d.s,d.v),cvr:dv(d.v,d.k)*100,roas:dv(d.r,d.s),roi:dv(d.r-d.s,d.s)*100,burn:dv(d.s,d.b)*100});
const T=a=>{const t=a.reduce((p,x)=>({b:p.b+x.b,s:p.s+x.s,r:p.r+x.r,v:p.v+x.v,k:p.k+x.k,i:p.i+x.i}),{b:0,s:0,r:0,v:0,k:0,i:0});return{...t,...M(t)}};
const G=d=>{const x=M(d).roas;return d.s?(x>=4?['ممتاز','good']:x>=2?['جيد','mid']:['ضعيف','low']):['—','mut']};
const plats=(a=D)=>CH.map(c=>{const x=a.filter(d=>d.c===c);return{c,n:x.length,...T(x)}}).filter(p=>p.n);
const AUD=[['18–24',24],['25–34',38],['35–44',22],['45–54',11],['55+',5]],LOC=[['القاهرة',34],['الإسكندرية',18],['الجيزة',16],['المنصورة',9],['أسيوط',7]],INT=[['الموضة',31],['التقنية',24],['الرياضة',19],['السفر',14],['الطعام',12]];
const ROLES=['مدير','محرر','مشاهد'],PERMS=['إنشاء الحملات','تعديل الميزانيات','عرض التقارير','إدارة المستخدمين','إدارة التكاملات'];

/* ========== الحالة ========== */
const S={page:'dashboard',arg:null,q:'',fs:'',fp:'',cmp:[2,3,5],tab:'prof',dd:'',gq:'',user:null,rt:'perf',rf:'2026-01-01',rto:'2026-12-31',
chat:[{r:'a',t:'أهلًا! أنا مساعد sawa2tlek. اسألني عن أداء حملاتك أو ميزانيتك، أو اختر اقتراح من تحت.'}],
int:{'Google Analytics':false,'Facebook Ads':true,'Google Ads':true,'TikTok Ads':false,'Instagram':true,'Mailchimp':false},
users:[['أحمد سمير','ahmed@sawa2tlek.com','مدير'],['منى علي','mona@sawa2tlek.com','محرر'],['كريم حسن','karim@sawa2tlek.com','مشاهد']],
pm:{'مدير':[1,1,1,1,1],'محرر':[1,1,1,0,0],'مشاهد':[0,0,1,0,0]},tfa:false};

/* ========== مكوّنات واجهة ========== */
const tag=s=>`<span class="s-${s}">● ${s}</span>`,lk=d=>`<a href="#" class="lk" data-go="detail" data-id="${d.id}">${d.n}</a>`;
const ph=(t,en,a='')=>`<div class="ph"><h1>${t} <i>${en}</i></h1><div class="acts">${a}</div></div>`;
const kpi=(l,en,v,s='')=>`<div class="card kpi"><small>${l} <i>${en}</i></small><b>${v}</b>${s?`<em>${s}</em>`:''}</div>`;
const card=(t,h)=>`<div class="card"><h2>${t}</h2>${h}</div>`;
const tbl=(h,r)=>`<div class="scroll"><table><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${r.map(x=>`<tr>${x.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')||`<tr><td colspan="${h.length}">لا توجد بيانات</td></tr>`}</tbody></table></div>`;
const bar=(l,p,v,c='')=>`<div class="bar"><span class="l" title="${l}">${l}</span><div class="t"><i class="${c}" style="width:${Math.min(100,Math.max(2,p||0))}%"></i></div><span class="v">${v}</span></div>`;
const sel=(id,opts,v,all)=>`<select id="${id}">${all?`<option value="">${all}</option>`:''}${opts.map(o=>`<option ${o===v?'selected':''}>${o}</option>`).join('')}</select>`;

/* ========== رسوم بيانية ========== */
function daily(d,n=10){const w=ph=>{const a=[...Array(n)].map((_,i)=>1+.45*Math.sin(d.id*1.7+i*.8+ph)+.2*Math.cos(i*1.3+d.id)),t=a.reduce((p,x)=>p+x,0);return a.map(x=>x/t)};return{s:w(0).map(x=>x*d.s),r:w(1.1).map(x=>x*d.r)}}
const agg=()=>{const z=D.map(d=>daily(d));return{s:z[0].s.map((_,i)=>z.reduce((p,x)=>p+x.s[i],0)),r:z[0].r.map((_,i)=>z.reduce((p,x)=>p+x.r[i],0))}};
function lineChart(a,b,la='الإنفاق',lb='الإيراد'){const W=520,H=220,pl=44,pr=10,pt=12,pb=26,n=a.length,mx=Math.max(...a,...b,1)*1.1,x=i=>pl+i*(W-pl-pr)/(n-1),y=v=>pt+(H-pt-pb)*(1-v/mx),pts=s=>s.map((v,i)=>x(i)+','+y(v)).join(' ');
let g='';for(let k=0;k<=4;k++){const v=mx*k/4;g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v)}" y2="${y(v)}" stroke="var(--bd)"/><text x="${pl-6}" y="${y(v)+4}" text-anchor="end" font-size="11" fill="var(--mut)">${n0(v/1000)}k</text>`}
a.forEach((_,i)=>g+=`<text x="${x(i)}" y="${H-8}" text-anchor="middle" font-size="11" fill="var(--mut)">${i+1}</text>`);
return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;direction:ltr">${g}<polyline points="${pts(a)}" fill="none" stroke="var(--sky)" stroke-width="2.5"/><polyline points="${pts(b)}" fill="none" stroke="var(--ink)" stroke-width="2.5"/></svg><div class="lg"><span><i style="background:var(--sky)"></i>${la}</span><span><i style="background:var(--ink)"></i>${lb}</span><span>المحور السفلي: اليوم (توزيع تقديري)</span></div>`}
const funnel=d=>{const m=M(d);return `<div class="fn" style="width:100%;background:var(--ink);color:var(--card)">ظهور: ${n0(d.i)}</div><div class="fr">▼ CTR ${n1(m.ctr)}%</div><div class="fn" style="width:68%;background:var(--pri)">نقرات: ${n0(d.k)}</div><div class="fr">▼ معدل التحويل ${n1(m.cvr)}%</div><div class="fn" style="width:38%;background:var(--sky);color:#142B4A">تحويلات: ${n0(d.v)}</div>`};
function donut(d){const m=M(d),p=Math.min(100,m.burn),R=52,C=2*Math.PI*R,col=p>90?'var(--bad)':p>70?'var(--warn)':'var(--bar)';return `<div class="dn"><svg viewBox="0 0 140 140" width="150" height="150"><circle cx="70" cy="70" r="${R}" fill="none" stroke="var(--pri2)" stroke-width="16"/><circle cx="70" cy="70" r="${R}" fill="none" stroke="${col}" stroke-width="16" stroke-linecap="round" stroke-dasharray="${C*p/100} ${C}" transform="rotate(-90 70 70)"/><text x="70" y="76" text-anchor="middle" font-size="22" font-weight="700" fill="var(--tx)">${n0(m.burn)}%</text></svg><ul><li>الميزانية: <b>${n0(d.b)}</b> ج</li><li>المصروف: <b>${n0(d.s)}</b> ج</li><li>المتبقي: <b>${n0(Math.max(0,d.b-d.s))}</b> ج</li></ul></div>`}
function vsAvg(d){const m=M(d),t=T(D);return [['CTR %','ctr',1,n1],['ROAS ×','roas',1,n1],['CPC','cpc',-1,n1],['CPA','cpa',-1,n0]].map(([l,k,dir,f])=>{const v=m[k],a=t[k],mx=Math.max(v,a,.0001);return bar(l,v/mx*100,f(v)+(v*dir>a*dir?' ✓':''),'rev')+bar('المتوسط',a/mx*100,f(a),'sp')}).join('')+'<p class="mut sm">✓ = أفضل من المتوسط (الأقل أفضل في CPC وCPA)</p>'}

/* ========== تنبيهات وتوصيات ========== */
const alerts=()=>D.filter(d=>d.st==='نشطة'&&d.b).map(d=>({d,p:dv(d.s,d.b)*100})).filter(x=>x.p>=80).map(x=>({lvl:x.p>=95?'bad':'warn',id:x.d.id,t:`«${x.d.n}» استهلكت ${n0(x.p)}% من ميزانيتها${x.p>100?' (تجاوزت الميزانية)':''}`}));
const ranked=()=>D.filter(d=>d.s>0).sort((a,b)=>M(b).roas-M(a).roas);
function recs(){if(!ranked().length)return['ضيف حملات ونتائجها وهتظهر لك التوصيات هنا.'];const r=ranked(),b=r[0],w=r[r.length-1],p=plats().sort((x,y)=>y.roas-x.roas),o=[];
o.push(`زوّد ميزانية «${b.n}»: هي الأعلى عائدًا (ROAS ${n1(M(b).roas)}×).`);
if(w!==b)o.push(`راجع «${w.n}» أو قلّل صرفها: ROAS ${n1(M(w).roas)}× وCPA ${n0(M(w).cpa)} ج.`);
o.push(`أفضل منصة عائدًا: ${p[0].c} (${n1(p[0].roas)}×)، وأضعفها ${p[p.length-1].c} (${n1(p[p.length-1].roas)}×).`);
const a=alerts()[0];if(a)o.push('تنبيه ميزانية: '+a.t+'.');return o}

/* ========== المساعد الذكي (ردود محسوبة من بيانات النظام) ========== */
function ai(q){q=q.toLowerCase();if(!ranked().length)return 'لسه مفيش بيانات أداء. ضيف حملة أو حمّل بيانات تجريبية الأول.';const r=ranked(),b=r[0],w=r[r.length-1],t=T(D),p=plats();
if(/best|أفضل|اعلى|أعلى/.test(q))return `أفضل حملة أداءً: «${b.n}» (${b.c}) بـ ROAS ${n1(M(b).roas)}× وROI ${n0(M(b).roi)}% وCPA ${n0(M(b).cpa)} ج.`;
if(/cpc|تكلفة النقر|التكلفة للنقر/.test(q)){const h=[...r].sort((x,y)=>M(y).cpc-M(x).cpc)[0],ph=[...p].sort((x,y)=>y.cpc-x.cpc)[0];return `متوسط CPC حاليًا ${n1(t.cpc)} ج. الأعلى في «${h.n}» (${n1(M(h).cpc)} ج) وعلى منصة ${ph.c} (${n1(ph.cpc)} ج).\nأسباب شائعة: منافسة على نفس الكلمات أو الجمهور، أو إعلان بنقرات قليلة. جرّب تحسين نص الإعلان واستهداف أضيق.`}
if(/optimi|optimize|حسّن|تحسين|أحسن/.test(q))return `أولى حملة بالتحسين: «${w.n}» (${w.c}): ROAS ${n1(M(w).roas)}× وCPA ${n0(M(w).cpa)} ج. جرّب تغيير الإعلان أو الجمهور، وانقل جزء من ميزانيتها لـ «${b.n}».`;
if(/reduce|cost|تقليل|تكلف|خفض/.test(q)){const h=[...r].sort((x,y)=>M(y).cpa-M(x).cpa)[0];return `أعلى تكلفة لكل تحويل: «${h.n}» (CPA ${n0(M(h).cpa)} ج مقابل متوسط ${n0(t.cpa)} ج).\nلتقليل التكلفة: أوقف الإعلانات الضعيفة، وركّز على ${[...p].sort((x,y)=>y.roas-x.roas)[0].c}، وضيّق الجمهور.`}
if(/budget|ميزاني/.test(q)){const a=alerts();return `المصروف ${n0(t.s)} ج من ${n0(t.b)} ج (${n0(dv(t.s,t.b)*100)}%).\n`+(a.length?a.map(x=>'• '+x.t).join('\n'):'مفيش حملة قربت تتجاوز ميزانيتها.')+`\nتوصية: ${recs()[0]}`}
if(/compare|قارن|مقارنة/.test(q))return `«${b.n}» ROAS ${n1(M(b).roas)}× مقابل «${w.n}» ROAS ${n1(M(w).roas)}×.\nCTR: ${n1(M(b).ctr)}% مقابل ${n1(M(w).ctr)}%، وCPA: ${n0(M(b).cpa)} ج مقابل ${n0(M(w).cpa)} ج.`;
if(/report|تقرير/.test(q))return `ملخص تقرير:\n• ${D.length} حملات، ${D.filter(d=>d.st==='نشطة').length} نشطة\n• إنفاق ${n0(t.s)} ج، إيراد ${n0(t.r)} ج، ROAS ${n1(t.roas)}×\n• الأفضل: ${b.n} — الأضعف: ${w.n}\nتقدر تصدّر تقرير كامل من صفحة التقارير.`;
if(/insight|تحليل|أداء|analysis/.test(q))return `CTR ${n1(t.ctr)}% • CPC ${n1(t.cpc)} ج • CPM ${n0(t.cpm)} ج • CPA ${n0(t.cpa)} ج • معدل التحويل ${n1(t.cvr)}% • ROAS ${n1(t.roas)}×.\n`+recs().slice(0,2).join('\n');
return 'جرّب تسألني: أفضل حملة؟ ليه CPC بيزيد؟ أي حملة أحسّنها؟ إزاي أقلل التكلفة؟ أو اطلب تحليل الميزانية والمقارنة والتقارير.'}

/* ========== التقارير ========== */
function rep(){const a=D.filter(d=>d.sd<=S.rto&&d.ed>=S.rf),t=S.rt;
if(t==='perf')return{t:'تقرير أداء الحملات',h:['الحملة','المنصة','الظهور','النقرات','التحويلات','CTR %','CPA','ROAS'],r:a.map(d=>{const m=M(d);return[d.n,d.c,n0(d.i),n0(d.k),n0(d.v),n1(m.ctr),n0(m.cpa),n1(m.roas)+'×']})};
if(t==='budget')return{t:'تقرير الميزانية',h:['الحملة','الميزانية','المصروف','المتبقي','نسبة الاستهلاك'],r:a.map(d=>[d.n,n0(d.b),n0(d.s),n0(Math.max(0,d.b-d.s)),n0(M(d).burn)+'%'])};
if(t==='platform')return{t:'تقرير مقارنة المنصات',h:['المنصة','الحملات','المصروف','الإيراد','CPA','ROAS'],r:plats(a).map(p=>[p.c,p.n,n0(p.s),n0(p.r),n0(p.cpa),n1(p.roas)+'×'])};
const m={};a.forEach(d=>{const k=d.sd.slice(0,7);(m[k]=m[k]||[]).push(d)});
return{t:'التقرير الشهري',h:['الشهر','الحملات','الميزانية','المصروف','الإيراد','ROAS'],r:Object.keys(m).sort().map(k=>{const x=T(m[k]);return[k,m[k].length,n0(x.b),n0(x.s),n0(x.r),n1(x.roas)+'×']})}}
const repHTML=()=>{const x=rep();return `<h2>${x.t} <span class="mut sm">(${S.rf} → ${S.rto})</span></h2>`+tbl(x.h,x.r)};

/* ========== الصفحات ========== */
const campTable=()=>{const q=S.q.toLowerCase(),a=D.filter(d=>(!q||(d.n+d.pr+d.c).toLowerCase().includes(q))&&(!S.fs||d.st===S.fs)&&(!S.fp||d.c===S.fp));
return tbl(['الحملة','الحالة','البداية','النهاية','الميزانية','المنصة','الأداء (ROAS)'],a.map(d=>[lk(d),tag(d.st),d.sd,d.ed,n0(d.b)+' ج',`<span class="tag">${d.c}</span>`,d.s?`${n1(M(d).roas)}× <span class="mini"><i style="width:${Math.min(100,M(d).roas/6*100)}%"></i></span>`:'—']))};
const cmpTable=()=>{const a=S.cmp.map(i=>D.find(d=>d.id===i)).filter(Boolean);if(a.length<2)return '<p class="mut">اختر حملتين على الأقل.</p>';
const rows=[['CTR %','ctr',1,n1],['CPC','cpc',-1,n1],['CPM','cpm',-1,n0],['CPA','cpa',-1,n0],['معدل التحويل %','cvr',1,n1],['ROAS ×','roas',1,n1],['ROI %','roi',1,n0]];
return tbl(['المؤشر',...a.map(d=>d.n)],rows.map(([l,k,dir,f])=>{const best=a.reduce((p,d)=>M(d)[k]*dir>M(p)[k]*dir?d:p,a[0]);return[l,...a.map(d=>`<span class="${d===best?'good':''}">${f(M(d)[k])}${d===best?' ★':''}</span>`)]}))};

const emptyPage=(t,en)=>ph(t,en)+card('ابدأ أول حملة',`<p class="mut">حسابك لسه فاضي. ضيف حملتك الأولى، أو حمّل بيانات تجريبية تجرّب بيها النظام.</p><div class="acts" style="margin-top:10px"><button class="btn" data-go="new">+ إضافة حملة</button><button class="btn g" data-a="sample">تحميل بيانات تجريبية</button></div>`);
const P={
dashboard(){if(!D.length)return emptyPage('لوحة التحكم','Dashboard');const t=T(D),z=agg(),r=ranked();
return ph('لوحة التحكم','Dashboard')+`<div class="grid kpis">${[['إجمالي الحملات','Total Campaigns',D.length],['الحملات النشطة','Active Campaigns',D.filter(d=>d.st==='نشطة').length],['إجمالي الميزانيات','Total Budget',n0(t.b)+' ج'],['إجمالي الإنفاق','Total Spent',n0(t.s)+' ج'],['إجمالي الإيرادات','Total Revenue',n0(t.r)+' ج'],['متوسط العائد على الاستثمار','Average ROI',n0(t.roi)+'%']].map(k=>kpi(...k)).join('')}</div>
<div class="grid two">${card('نظرة عامة على الأداء <i>Performance Overview</i>',lineChart(z.s,z.r))}${card('إنفاق الميزانية <i>Budget Spending</i>',D.map(d=>bar(d.n,M(d).burn,n0(M(d).burn)+'%',M(d).burn>90?'bad':M(d).burn>70?'warn':'')).join(''))}</div>
<div class="grid two">${card('أحدث الحملات <i>Recent Campaigns</i>',[...D].sort((x,y)=>y.sd.localeCompare(x.sd)).slice(0,5).map(d=>`<div class="li">${lk(d)}${tag(d.st)}</div>`).join(''))}${card('أفضل الحملات أداءً <i>Top Performing</i>',r.slice(0,4).map(d=>bar(d.n,M(d).roas/M(r[0]).roas*100,n1(M(d).roas)+'×','rev')).join(''))}</div>
${card('توصيات الذكاء الاصطناعي <i>AI Recommendations</i>',recs().map(x=>`<div class="ins">💡 ${x}</div>`).join('')+'<button class="btn g" data-go="ai">اسأل المساعد</button>')}`},

campaigns(){return ph('إدارة الحملات','Campaign Management',`<button class="btn" data-go="new">+ حملة جديدة</button>`)+`<div class="tools"><input id="cq" placeholder="بحث بالاسم أو المنتج أو المنصة" value="${S.q}">${sel('fs',['نشطة','متوقفة','منتهية'],S.fs,'كل الحالات')}${sel('fp',CH,S.fp,'كل المنصات')}</div><div class="card" id="ctb">${campTable()}</div>`},

new(){return ph('حملة جديدة','Create New Campaign',`<button class="btn g" data-go="campaigns">← رجوع</button>`)+`<form class="card f" id="nf">
<label>اسم الحملة<input name="n" required></label><label>المنتج / العلامة التجارية<input name="pr" required></label>
<label>هدف الحملة<select name="ob">${OBJ.map(o=>`<option>${o}</option>`).join('')}</select></label><label>الجمهور المستهدف<select name="au">${SEG.map(o=>`<option>${o}</option>`).join('')}</select></label>
<label>قناة التسويق<select name="c">${CH.map(o=>`<option>${o}</option>`).join('')}</select></label><label>ميزانية الحملة (ج)<input name="b" type="number" min="1" required></label>
<label>تاريخ البداية<input name="sd" type="date" required></label><label>تاريخ النهاية<input name="ed" type="date" required></label>
<label class="full">وصف الحملة<textarea name="ds" rows="3"></textarea></label><div class="full"><button class="btn">حفظ الحملة</button> <span id="nm" class="mut"></span></div></form>`},

detail(){const d=D.find(x=>x.id===S.arg)||D[0],m=M(d),g=G(d);
return ph(d.n,'Campaign Details',`<button class="btn g" data-go="campaigns">← الحملات</button>`)+`<div class="chips">${tag(d.st)} <span class="tag">${d.c}</span> <span class="${g[1]}">● تقييم: ${g[0]}</span></div>`+
card('بيانات الحملة',`<div class="info">${[['المنتج / العلامة',d.pr],['الهدف',d.ob],['الجمهور',d.au],['البداية',d.sd],['النهاية',d.ed],['الميزانية',n0(d.b)+' ج']].map(([a,b])=>`<div><small>${a}</small><b>${b}</b></div>`).join('')}</div><p class="mut">${d.ds}</p>`)+
(d.i?`<div class="grid kpis">${[['الإيراد','Revenue',n0(d.r)+' ج'],['المصروف','Spent',n0(d.s)+' ج'],['ROAS','',n1(m.roas)+'×'],['ROI','',n0(m.roi)+'%'],['CTR','',n1(m.ctr)+'%'],['CPC','',n1(m.cpc)+' ج'],['CPA','',n0(m.cpa)+' ج'],['التحويلات','Conversions',n0(d.v)]].map(k=>kpi(...k)).join('')}</div>
<div class="grid two">${card('قمع التحويل',funnel(d))}${card('استهلاك الميزانية',donut(d))}</div>
<div class="grid two">${card('الأداء عبر الوقت (تقديري)',lineChart(daily(d).s,daily(d).r))}${card('الحملة مقابل المتوسط',vsAvg(d))}</div>`:card('النتائج','<p class="mut">الحملة جديدة ولسه مفيش نتائج مسجّلة.</p>'))},

budget(){if(!D.length)return emptyPage('إدارة الميزانية','Budget Management');const t=T(D),al=alerts();
return ph('إدارة الميزانية','Budget Management')+`<div class="grid kpis">${kpi('إجمالي الميزانية','Total Budget',n0(t.b)+' ج')}${kpi('الميزانية المستهلكة','Spent',n0(t.s)+' ج',n0(dv(t.s,t.b)*100)+'%')}${kpi('الميزانية المتبقية','Remaining',n0(t.b-t.s)+' ج')}</div>`+
card('تنبيهات الميزانية',al.length?al.map(a=>`<div class="ins ${a.lvl}">${a.lvl==='bad'?'🚨':'⚠️'} ${a.t}</div>`).join(''):'<p class="mut">مفيش حملات قريبة من تجاوز ميزانيتها.</p>')+
`<div class="grid two">${card('الميزانية مقابل الإنفاق الفعلي',D.map(d=>bar(d.n,100,n0(d.b),'sp')+bar('الفعلي',dv(d.s,d.b)*100,n0(d.s),'rev')).join('')+'<div class="lg"><span><i style="background:var(--sky)"></i>الميزانية</span><span><i style="background:var(--ink)"></i>المصروف</span></div>')}${card('الإنفاق لكل حملة',tbl(['الحملة','المصروف','المتبقي','الاستهلاك'],D.map(d=>[lk(d),n0(d.s),n0(Math.max(0,d.b-d.s)),`<span class="${M(d).burn>=95?'low':M(d).burn>=80?'mid':''}">${n0(M(d).burn)}%</span>`])))}</div>`},

analytics(){if(!D.length)return emptyPage('التحليلات والأداء','Analytics & Performance');const t=T(D),z=agg(),r=ranked();
return ph('التحليلات والأداء','Analytics & Performance')+`<div class="grid kpis">${[['CTR','معدل النقر',n1(t.ctr)+'%'],['CPC','تكلفة النقرة',n1(t.cpc)+' ج'],['CPM','تكلفة ألف ظهور',n0(t.cpm)+' ج'],['CPA','تكلفة الإجراء',n0(t.cpa)+' ج'],['Conversion Rate','معدل التحويل',n1(t.cvr)+'%'],['ROAS','العائد على الإنفاق',n1(t.roas)+'×'],['ROI','العائد على الاستثمار',n0(t.roi)+'%']].map(([a,b,c])=>kpi(b,a,c)).join('')}</div>`+
card('مقارنة الحملات',`<div class="chips" id="cc">${D.map(d=>`<button class="chip ${S.cmp.includes(d.id)?'on':''}" data-a="cmp" data-id="${d.id}">${d.n}</button>`).join('')}</div><div id="ct">${cmpTable()}</div>`)+
`<div class="grid two">${card('مقارنة المنصات',tbl(['المنصة','الحملات','المصروف','CPA','ROAS'],plats().map(p=>[p.c,p.n,n0(p.s),n0(p.cpa),n1(p.roas)+'×']))+plats().map(p=>bar(p.c,p.roas/6*100,n1(p.roas)+'×','rev')).join(''))}${card('الأداء عبر الوقت',lineChart(z.s,z.r))}</div>
<div class="grid two">${card('🏆 أفضل الحملات أداءً',r.slice(0,3).map(d=>bar(d.n,M(d).roas/M(r[0]).roas*100,n1(M(d).roas)+'×','rev')).join(''))}${card('📉 أسوأ الحملات أداءً',[...r].reverse().slice(0,3).map(d=>bar(d.n,M(d).roas/M(r[0]).roas*100,n1(M(d).roas)+'×','bad')).join(''))}</div>`},

reports(){return ph('التقارير','Reports',`<button class="btn" data-a="pdf">Export PDF</button><button class="btn g" data-a="csv">Export Excel</button>`)+`<div class="tools"><select id="rt">${[['perf','Campaign Performance Report'],['budget','Budget Report'],['platform','Platform Comparison Report'],['monthly','Monthly Report']].map(([v,l])=>`<option value="${v}" ${S.rt===v?'selected':''}>${l}</option>`).join('')}</select><label>من<input type="date" id="rf" value="${S.rf}"></label><label>إلى<input type="date" id="rto" value="${S.rto}"></label></div><div class="card" id="rp">${repHTML()}</div><p class="mut sm no-print">Excel = ملف CSV بيتفتح في Excel. PDF من نافذة الطباعة (اختار Save as PDF).</p>`},

ai(){return ph('مساعد التسويق الذكي','AI Marketing Assistant')+`<div class="chips">${[['تحليل الحملات','Campaign Analysis'],['توصيات الميزانية','Budget Recommendations'],['رؤى الأداء','Performance Insights'],['مقارنة الحملات','Campaign Comparison'],['تقرير بالذكاء الاصطناعي','AI Generated Report']].map(([a,b],i)=>`<button class="chip" data-a="ask" data-q="${['analysis','budget','insight','compare','report'][i]}">${a}</button>`).join('')}</div>`+
card('المحادثة',`<div class="chat" id="chat">${chatHTML()}</div><div class="chips">${['What is my best performing campaign?','Why is my CPC increasing?','Which campaign should I optimize?','How can I reduce my marketing costs?'].map(q=>`<button class="chip" data-a="ask" data-q="${q}">${q}</button>`).join('')}</div><form class="cf" id="cf"><input id="ci" placeholder="اكتب سؤالك بالعربي أو English" autocomplete="off"><button class="btn">إرسال</button></form><p class="mut sm">الردود محسوبة من بيانات النظام الحالية (نسخة تجريبية بدون نموذج ذكاء اصطناعي حقيقي).</p>`)},

audience(){const by=SEG.map(g=>{const a=D.filter(d=>d.au===g);return{seg:g,n:a.length,...T(a)}});
return ph('إدارة الجمهور','Audience Management',`<button class="btn" data-go="new">+ حملة لجمهور جديد</button>`)+`<div class="grid kpis">${SEG.map(s=>kpi(s,'Segment',D.filter(d=>d.au===s).length+' حملات')).join('')}</div>
<div class="grid three">${[['الفئات العمرية','Age Groups',AUD],['المواقع','Locations',LOC],['الاهتمامات','Interests',INT]].map(([a,b,x])=>card(`${a} <i>${b}</i>`,x.map(([l,p])=>bar(l,p*2.2,p+'%')).join(''))).join('')}</div>`+
card('أداء شرائح العملاء <i>Audience Performance</i>',tbl(['الشريحة','الحملات','المصروف','التحويلات','CPA','الإيراد','ROAS'],by.map(x=>[x.seg,x.n,n0(x.s),n0(x.v),x.v?n0(x.cpa):'—',n0(x.r),x.s?n1(x.roas)+'×':'—'])))+'<p class="mut sm">الفئات العمرية والمواقع والاهتمامات أرقام تجريبية (نسبة من التحويلات).</p>'},

settings(){const tabs=[['prof','الملف الشخصي'],['sec','أمان الحساب'],['usr','المستخدمون'],['rol','الأدوار والصلاحيات'],['int','التكاملات']];
const body={
prof:()=>card('Profile Settings',`<form class="f" id="pf"><label>الاسم<input name="n" value="${S.user.name}"></label><label>Email<input name="e" type="email" value="${S.user.email}" readonly></label><label>الهاتف<input name="p" placeholder="01xxxxxxxxx"></label><label>الشركة<input name="c"></label><div class="full"><button class="btn">حفظ</button> <span id="pm" class="mut"></span></div></form>`),
sec:()=>card('Account Security',`<form class="f" id="sf"><label>كلمة المرور الحالية<input type="password" required></label><label>كلمة المرور الجديدة<input type="password" minlength="6" required></label><div class="full"><button class="btn">تغيير كلمة المرور</button> <span id="sm" class="mut"></span></div></form><div class="li"><span>التحقق بخطوتين (2FA)</span><button class="tg ${S.tfa?'on':''}" data-a="tfa" aria-label="2FA"></button></div>`),
usr:()=>card('User Management',tbl(['الاسم','Email','الدور'],S.users.map(u=>[u[0],u[1],u[2]]))+`<form class="tools" id="uf" style="margin-top:12px"><input name="n" placeholder="الاسم" required><input name="e" type="email" placeholder="Email" required><select name="r">${ROLES.map(r=>`<option>${r}</option>`).join('')}</select><button class="btn">+ دعوة مستخدم</button></form>`),
rol:()=>card('Roles & Permissions',tbl(['الصلاحية',...ROLES],PERMS.map((p,i)=>[p,...ROLES.map(r=>`<button class="tg ${S.pm[r][i]?'on':''}" data-a="perm" data-r="${r}" data-p="${i}" aria-label="${p}"></button>`)]))),
int:()=>card('Google Analytics & Marketing Platform Integrations',`<div class="grid three">${Object.keys(S.int).map(k=>`<div class="card kpi"><b style="font-size:16px">${k}</b><em>${S.int[k]?'<span class="good">● متصل</span>':'غير متصل'}</em><br><button class="btn ${S.int[k]?'g':''}" data-a="int" data-k="${k}">${S.int[k]?'فصل':'ربط'}</button></div>`).join('')}</div><p class="mut sm">واجهة تجريبية: الربط الفعلي (مثل Google Analytics) بيحتاج تسجيل دخول OAuth وخادم.</p>`)}[S.tab]();
return ph('الإعدادات والتكاملات','Settings & Integration')+`<div class="chips">${tabs.map(([k,l])=>`<button class="chip ${S.tab===k?'on':''}" data-a="tab" data-t="${k}">${l}</button>`).join('')}</div>`+body}
};
const chatHTML=()=>S.chat.map(m=>`<div class="msg ${m.r}">${m.t.replace(/</g,'&lt;')}</div>`).join('');

/* ========== الهيكل: Sidebar + Top Navigation + Main ========== */
const NAV=[['dashboard','لوحة التحكم','🏠'],['campaigns','الحملات','🗂️'],['analytics','التحليلات','📈'],['budget','الميزانية','💰'],['reports','التقارير','📄'],['ai','مساعد AI','🤖'],['audience','الجمهور','👥'],['settings','الإعدادات','⚙️']];
function sidebar(){const cur=['new','detail'].includes(S.page)?'campaigns':S.page;$('#sb').innerHTML=`<div class="logo">📊 sawa2tlek</div>`+NAV.map(([k,l,i])=>`<button class="${cur===k?'on':''}" data-go="${k}"><span>${i}</span>${l}</button>`).join('')}
function topbar(){const al=alerts(),res=S.gq?D.filter(d=>(d.n+d.pr+d.c).toLowerCase().includes(S.gq.toLowerCase())).slice(0,5):[];
$('#top').innerHTML=`<button class="ib mn" data-a="menu" aria-label="menu">☰</button><div class="sbx"><input id="gs" placeholder="🔍 ابحث عن حملة..." value="${S.gq}" autocomplete="off"><div class="dd ${S.gq?'':'hide'}" id="sr">${srHTML(res)}</div></div><span class="sp"></span><button class="ib" data-a="theme" title="Dark / Light">🌓</button>
<div class="rel"><button class="ib" data-a="bell" aria-label="notifications">🔔${al.length?`<span class="badge">${al.length}</span>`:''}</button><div class="dd ${S.dd==='n'?'':'hide'}"><h2>الإشعارات</h2>${al.map(a=>`<button class="li" data-go="detail" data-id="${a.id}">${a.lvl==='bad'?'🚨':'⚠️'} ${a.t}</button>`).join('')||'<p class="mut">لا توجد إشعارات.</p>'}</div></div>
<div class="rel"><button class="av" data-a="user" aria-label="profile">${(S.user.name||'?')[0].toUpperCase()}</button><div class="dd ${S.dd==='u'?'':'hide'}"><b>${S.user.name}</b><div class="mut sm">${S.user.email}</div><hr style="border:0;border-top:1px solid var(--bd)"><button class="li" data-go="settings">⚙️ الإعدادات</button><button class="li" data-a="logout">🚪 تسجيل الخروج</button></div></div>`}
const srHTML=r=>r.map(d=>`<button class="li" data-go="detail" data-id="${d.id}">${d.n}<span class="mut sm">${d.c}</span></button>`).join('')||'<p class="mut">لا نتائج</p>';
function render(){sidebar();topbar();$('#main').innerHTML=P[S.page]()}
function go(p,a){S.page=p;S.arg=a;S.dd='';S.gq='';$('#sb').classList.remove('open');$('#ov').classList.remove('on');render();scrollTo(0,0)}

/* ========== الثيم (فاتح / داكن) ========== */
const setTheme=t=>{document.documentElement.dataset.theme=t;store.set('s2t_theme',t)};
setTheme(store.get('s2t_theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'));

/* ========== الحسابات (محفوظة في المتصفح) + الصفحة الرئيسية ========== */
const UK='s2t_users',dk=e=>'s2t_d_'+e;
const users=()=>{try{return JSON.parse(store.get(UK)||'{}')}catch{return{}}},saveUsers=u=>store.set(UK,JSON.stringify(u));
async function hs(s){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch{let h=5381;for(const c of s)h=(h*33^c.charCodeAt(0))>>>0;return 'x'+h}}
const save=()=>S.user&&store.set(dk(S.user.email),JSON.stringify({D,nid}));
const load=e=>{try{const o=JSON.parse(store.get(dk(e))||'null');D=o?o.D:[];nid=o?o.nid:1}catch{D=[];nid=1}};
const allCount=()=>Object.keys(users()).reduce((n,e)=>{try{return n+JSON.parse(store.get(dk(e))||'{"D":[]}').D.length}catch{return n}},0);
function counters(){document.querySelectorAll('[data-count]').forEach(el=>{const to=el.dataset.count==='live'?allCount():+el.dataset.count;let t0;const f=ts=>{t0=t0||ts;const p=Math.min(1,(ts-t0)/1200);el.textContent=n0(to*p);if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f);setTimeout(()=>el.textContent=n0(to),1500)})}
const LS=['about','problem','scope','features','pricing','faq','contact'];
function spyL(){if($('#home').classList.contains('hide'))return;let c='about';LS.forEach(k=>{const el=$('#l-'+k);if(el&&el.getBoundingClientRect().top<=140)c=k});if(innerHeight+scrollY>=document.body.scrollHeight-4)c='contact';document.querySelectorAll('#ln button').forEach(b=>b.classList.toggle('on',b.dataset.sc===c))}
addEventListener('scroll',spyL,{passive:true});
function showView(v){['home','auth','app'].forEach(x=>$('#'+x).classList.toggle('hide',x!==v));$('#lh').classList.toggle('hide',v!=='home')}
function refreshHome(){const s=store.get('s2t_sess');$('#lres').classList.toggle('hide',!(s&&users()[s]));counters()}
function showHome(sc){showView('home');refreshHome();if(sc){const el=$('#l-'+sc);el&&el.scrollIntoView({behavior:'smooth'})}else scrollTo(0,0);spyL()}
let mode='in';
function setMode(m){mode=m;const f=$('#af');document.querySelectorAll('.tabs button[data-m]').forEach(x=>x.classList.toggle('on',x.dataset.m===m));
$('#nl').classList.toggle('hide',m==='in');$('#cl').classList.toggle('hide',m==='in');$('#rr').classList.toggle('hide',m==='up');$('#dh').classList.toggle('hide',m==='up');
f.n.required=f.p2.required=m==='up';f.p.autocomplete=m==='up'?'new-password':'current-password';$('#ab').textContent=m==='in'?'Login':'Sign Up';$('#am').textContent=''}
function showAuth(m){showView('auth');setMode(m);scrollTo(0,0)}
document.querySelectorAll('.tabs button[data-m]').forEach(b=>b.onclick=()=>setMode(b.dataset.m));
const rem=store.get('s2t_email');if(rem){$('#af').e.value=rem;$('#af').r.checked=true}
$('#fp').onclick=e=>{e.preventDefault();const em=$('#af').e.value.trim().toLowerCase(),m=$('#am');m.style.color=users()[em]?'var(--ok)':'var(--warn)';m.textContent=!em?'اكتب الإيميل الأول.':users()[em]?'هيوصلك رابط إعادة تعيين كلمة المرور (تجريبي: مفيش إرسال فعلي).':'الإيميل ده مش مسجّل.'};
function start(email,name,remember){S.user={name,email};load(email);S.cmp=D.slice(0,3).map(d=>d.id);S.chat=[{r:'a',t:'أهلًا '+name+'! اسألني عن أداء حملاتك أو ميزانيتك، أو اختر اقتراح من تحت.'}];S.tab='prof';S.q='';S.fs='';S.fp='';
remember?store.set('s2t_sess',email):store.del('s2t_sess');showView('app');go('dashboard')}
function resume(){const e=store.get('s2t_sess'),u=users();if(e&&u[e])start(e,u[e].name,true)}
async function authSubmit(f){const em=f.e.value.trim().toLowerCase(),pw=f.p.value,m=$('#am'),u=users(),err=t=>{m.style.color='var(--bad)';m.textContent=t};
if(mode==='up'){const n=f.n.value.trim();if(!n)return err('اكتب الاسم.');if(pw!==f.p2.value)return err('كلمتا المرور مش متطابقتين.');if(u[em])return err('الإيميل ده مسجّل قبل كده، سجّل دخول.');
u[em]={name:n,h:await hs(em+':'+pw)};saveUsers(u);store.set(dk(em),JSON.stringify({D:[],nid:1}));f.reset();start(em,n,false)}
else{if(!u[em])return err('الإيميل ده مش مسجّل. اعمل حساب جديد من Sign Up.');if(u[em].h!==await hs(em+':'+pw))return err('كلمة المرور غلط.');
f.r.checked?store.set('s2t_email',em):store.del('s2t_email');f.p.value='';start(em,u[em].name,f.r.checked)}}
(async()=>{const u=users(),d='demo@sawa2tlek.com';if(!u[d]){u[d]={name:'مستخدم تجريبي',h:await hs(d+':demo123')};saveUsers(u);store.set(dk(d),JSON.stringify({D:sample(),nid:9}))}showHome()})();

/* ========== الأحداث ========== */
document.addEventListener('click',e=>{
const l=e.target.closest('[data-l]');if(l){e.preventDefault();const v=l.dataset.l;if(v==='login')showAuth('in');else if(v==='signup')showAuth('up');else if(v==='home')showHome();else if(v==='app')resume();return}
const sc=e.target.closest('[data-sc]');if(sc){e.preventDefault();showHome(sc.dataset.sc);return}
const g=e.target.closest('[data-go]');if(g){e.preventDefault();go(g.dataset.go,g.dataset.id?+g.dataset.id:null);return}
const a=e.target.closest('[data-a]');
if(!a){if(S.dd&&!e.target.closest('.dd')){S.dd='';topbar()}return}
const k=a.dataset.a;
if(k==='theme')setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark');
else if(k==='menu'){$('#sb').classList.toggle('open');$('#ov').classList.toggle('on')}
else if(k==='bell'){S.dd=S.dd==='n'?'':'n';topbar()}
else if(k==='user'){S.dd=S.dd==='u'?'':'u';topbar()}
else if(k==='logout'){S.user=null;S.dd='';store.del('s2t_sess');D=[];showHome()}
else if(k==='cmp'){const id=+a.dataset.id;S.cmp=S.cmp.includes(id)?S.cmp.filter(x=>x!==id):S.cmp.length<3?[...S.cmp,id]:S.cmp;$('#cc').innerHTML=D.map(d=>`<button class="chip ${S.cmp.includes(d.id)?'on':''}" data-a="cmp" data-id="${d.id}">${d.n}</button>`).join('');$('#ct').innerHTML=cmpTable()}
else if(k==='tab'){S.tab=a.dataset.t;render()}
else if(k==='tfa'){S.tfa=!S.tfa;render()}
else if(k==='perm'){const r=a.dataset.r,i=+a.dataset.p;S.pm[r][i]=S.pm[r][i]?0:1;render()}
else if(k==='int'){S.int[a.dataset.k]=!S.int[a.dataset.k];render()}
else if(k==='ask'){const q=a.dataset.q,m={analysis:'تحليل الحملات insight',budget:'توصيات الميزانية budget',insight:'رؤى الأداء insight',compare:'مقارنة الحملات',report:'تقرير'}[q]||q;S.chat.push({r:'u',t:q in {analysis:1,budget:1,insight:1,compare:1,report:1}?a.textContent:q},{r:'a',t:ai(m)});$('#chat').innerHTML=chatHTML();$('#chat').scrollTop=1e5}
else if(k==='sample'){D=sample();nid=9;S.cmp=D.slice(0,3).map(d=>d.id);save();render()}
else if(k==='pdf')print();
else if(k==='csv'){const x=rep(),c='\ufeff'+[x.h,...x.r].map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n'),l=document.createElement('a');l.href=URL.createObjectURL(new Blob([c],{type:'text/csv'}));l.download='report-'+S.rt+'.csv';l.click()}
});
document.addEventListener('input',e=>{const id=e.target.id;
if(id==='cq'){S.q=e.target.value;$('#ctb').innerHTML=campTable()}
else if(id==='gs'){S.gq=e.target.value;$('#sr').classList.toggle('hide',!S.gq);$('#sr').innerHTML=srHTML(D.filter(d=>(d.n+d.pr+d.c).toLowerCase().includes(S.gq.toLowerCase())).slice(0,5))}
else if(id==='rf'||id==='rto'){S[id]=e.target.value;$('#rp').innerHTML=repHTML()}});
document.addEventListener('change',e=>{const id=e.target.id;
if(id==='fs'||id==='fp'){S[id]=e.target.value;$('#ctb').innerHTML=campTable()}
else if(id==='rt'){S.rt=e.target.value;$('#rp').innerHTML=repHTML()}});
document.addEventListener('keydown',e=>{if(e.target.id==='gs'&&e.key==='Enter'){S.q=S.gq;go('campaigns')}});
document.addEventListener('submit',e=>{e.preventDefault();const f=e.target,id=f.id;
if(id==='af')authSubmit(f);
else if(id==='lc'){$('#lm').textContent='شكرًا '+f.n.value+'، وصلت رسالتك وهنرد عليك قريبًا.';f.reset()}
else if(id==='nf'){if(f.ed.value<f.sd.value){$('#nm').textContent='تاريخ النهاية لازم يكون بعد البداية.';return}
D.push({id:nid,n:f.n.value,pr:f.pr.value,ob:f.ob.value,au:f.au.value,c:f.c.value,b:+f.b.value,s:0,i:0,k:0,v:0,r:0,st:'نشطة',sd:f.sd.value,ed:f.ed.value,ds:f.ds.value||'—'});go('detail',nid++);save()}
else if(id==='cf'){const q=$('#ci').value.trim();if(!q)return;S.chat.push({r:'u',t:q},{r:'a',t:ai(q)});$('#chat').innerHTML=chatHTML();$('#chat').scrollTop=1e5;$('#ci').value=''}
else if(id==='pf'){S.user.name=f.n.value||S.user.name;const u=users();if(u[S.user.email]){u[S.user.email].name=S.user.name;saveUsers(u)}topbar();$('#pm').textContent='تم الحفظ ✓'}
else if(id==='sf'){$('#sm').textContent='تم تغيير كلمة المرور (تجريبي) ✓';f.reset()}
else if(id==='uf'){S.users.push([f.n.value,f.e.value,f.r.value]);render()}});

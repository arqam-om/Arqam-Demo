import React, { useState } from 'react';
import { ArqamData as D } from '../data/arqam';
import { Icon } from './Icons';
import { Pill, StatCard, Breadcrumbs } from './Shell';
import { useToast } from '../context';
import type { ScreenBag } from '../context';

type SBag = ScreenBag;

export function SupervisorHome({ nav }: SBag) {
  const scope = D.supervisorScope;
  const avgOfAvgs = Math.round(scope.reduce((a,b)=>a+b.avg,0)/scope.length);
  return (
    <div className="col gap-5">
      <div className="page-header">
        <div>
          <h1 className="page-title">السلام عليكم، أ. حسن</h1>
          <p className="page-sub">نطاق الإشراف: التربية الإسلامية — الصفوف 10، 11، 12 · <span className="num">6</span> شعب · <span className="num">3</span> معلمين</p>
        </div>
      </div>

      <div className="row gap-4 wrap">
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.Users} label="المعلمون في نطاقي" value="3" sub="6 شعب إجمالاً"/></div>
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.School} label="إجمالي الطلاب" value="132" sub="موزعة على 6 شعب"/></div>
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.TrendingUp} label="متوسط النطاق" value={avgOfAvgs+'%'} sub="مستقر مقارنة بالشهر الماضي"/></div>
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.AlertTriangle} label="تنبيهات" value="2" sub="تحتاج مراجعتك" accent="var(--warning-500)" onClick={()=>nav('reports')}/></div>
      </div>

      <div className="card" style={{background:'var(--warning-900)', borderColor:'color-mix(in oklab, var(--warning-500) 30%, transparent)'}}>
        <div className="row gap-3 items-start">
          <Icon.AlertTriangle size={20} style={{color:'var(--warning-500)', flexShrink:0, marginTop:2}}/>
          <div className="col grow">
            <div style={{fontSize:14, fontWeight:700, color:'var(--warning-500)'}}>مؤشر يحتاج متابعة</div>
            <p style={{margin:'6px 0 10px', fontSize:13, lineHeight:1.7}}>متوسط درجات الصف <b>12أ</b> في التربية الإسلامية (<span className="num">68%</span>) أقل من الشعب الموازية (<span className="num">78%</span>) بفارق <span className="num">10</span> نقاط. المعلم: أ. سليمان الشبلي. آخر درس منشور: منذ أسبوعين.</p>
            <div className="row gap-2">
              <button className="btn primary sm" onClick={()=>nav('teachers')}>فتح ملف المعلم</button>
              <button className="btn secondary sm" onClick={()=>nav('note-compose')}>تسجيل ملاحظة</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row gap-5 wrap items-start">
        <div className="card grow" style={{flex:'2 1 520px'}}>
          <div className="section-head"><h2>الشعب في نطاقي</h2><button className="btn link" onClick={()=>nav('courses')}>عرض التفاصيل</button></div>
          <table className="tbl">
            <thead><tr><th>الشعبة</th><th>المعلم</th><th>المتوسط</th><th>الوسيط</th><th>الحالة</th></tr></thead>
            <tbody>
              {scope.map(s => (
                <tr key={s.cls}>
                  <td><b>{s.cls}</b></td>
                  <td>{s.teacher}</td>
                  <td><span className={'num ' + (s.avg>=85?'band-high':s.avg>=75?'band-mid-high':s.avg>=65?'band-mid':'band-low')} style={{fontWeight:700}}>{s.avg}%</span></td>
                  <td className="num">{s.median}%</td>
                  <td>{s.anomaly ? <Pill kind="late">تحتاج مراجعة</Pill> : <Pill kind="graded">طبيعي</Pill>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card" style={{flex:'1 1 320px'}}>
          <div className="section-head"><h2>آخر ملاحظاتي</h2><button className="btn link" onClick={()=>nav('notes')}>عرض الكل</button></div>
          <div className="col gap-3">
            {D.supervisorNotes.slice(0,3).map((n,i) => (
              <div key={i} className="col gap-1" style={{paddingTop:i>0?12:0, borderTop:i>0?'1px solid var(--border-subtle)':'none'}}>
                <div className="row between items-center">
                  <div style={{fontSize:13, fontWeight:600}}>{n.subject}</div>
                  <Pill kind={n.status==='إيجابية'?'graded':n.status==='متابعة مطلوبة'?'late':'pending'}>{n.status}</Pill>
                </div>
                <p style={{margin:0, fontSize:12, color:'var(--text-secondary)', lineHeight:1.6, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'} as React.CSSProperties}>{n.body}</p>
                <div style={{fontSize:11, color:'var(--text-tertiary)'}}>{n.ago}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SupervisorTeachers({ nav, setTeacherFocus }: SBag) {
  const teachers = [
    { id:'t_ig', name:'أ. إبراهيم الغيلاني', scope:'10أ، 10ب', students:44, avg:80, lessons:14, graded:'41/44', state:'ok' },
    { id:'t_ah', name:'أ. أحمد الحارثي',     scope:'11أ، 11ب', students:44, avg:83, lessons:14, graded:'42/44', state:'ok' },
    { id:'t_ss', name:'أ. سليمان الشبلي',    scope:'12أ، 12ب', students:44, avg:73, lessons:8,  graded:'39/44', state:'alert' },
  ];
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">المعلمون في نطاقي</h1><p className="page-sub"><span className="num">3</span> معلمين · <span className="num">132</span> طالب</p></div></div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(340px, 1fr))', gap:16}}>
        {teachers.map(t => (
          <div key={t.id} className={'card clickable' + (t.state==='alert'?' alert-card':'')} onClick={()=>{setTeacherFocus(t.id); nav('teacher-detail');}}>
            <div className="row gap-3 items-start">
              <div className="avatar lg">{t.name.split(' ')[1][0]}</div>
              <div className="col grow" style={{gap:3}}>
                <div style={{fontSize:15, fontWeight:600}}>{t.name}</div>
                <div style={{fontSize:12, color:'var(--text-tertiary)'}}>{t.scope}</div>
              </div>
              {t.state==='alert' && <Pill kind="late"><Icon.AlertTriangle size={12}/>تنبيه</Pill>}
            </div>
            <div className="muqarnas-div"/>
            <div className="row between items-center" style={{fontSize:12}}>
              <div className="col"><span style={{color:'var(--text-tertiary)'}}>الطلاب</span><span className="num" style={{fontSize:15, fontWeight:600}}>{t.students}</span></div>
              <div className="col"><span style={{color:'var(--text-tertiary)'}}>المتوسط</span><span className={'num ' + (t.avg>=85?'band-high':t.avg>=75?'band-mid-high':t.avg>=65?'band-mid':'band-low')} style={{fontSize:15, fontWeight:700}}>{t.avg}%</span></div>
              <div className="col"><span style={{color:'var(--text-tertiary)'}}>الدروس</span><span className="num" style={{fontSize:15, fontWeight:600}}>{t.lessons}</span></div>
              <div className="col"><span style={{color:'var(--text-tertiary)'}}>المصحَّح</span><span className="num" style={{fontSize:15, fontWeight:600}}>{t.graded}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SupervisorTeacherDetail({ nav }: SBag) {
  return (
    <div className="col gap-5">
      <Breadcrumbs items={[{label:'المعلمون', onClick:()=>nav('teachers')},{label:'أ. سليمان الشبلي'}]}/>
      <div className="page-header">
        <div className="row gap-3 items-center">
          <div className="avatar xl">س</div>
          <div className="col"><h1 className="page-title">أ. سليمان الشبلي</h1><p className="page-sub">التربية الإسلامية — الصفوف 12أ، 12ب · <span className="num">44</span> طالب</p></div>
        </div>
        <div className="row gap-2"><button className="btn secondary" onClick={()=>nav('note-compose')}><Icon.Edit size={14}/>ملاحظة</button></div>
      </div>
      <div className="row gap-4 wrap">
        <div style={{flex:'1 1 200px'}}><StatCard icon={Icon.TrendingUp} label="متوسط الشعب" value="73%" sub="أقل بـ 10 من النطاق" accent="var(--warning-500)"/></div>
        <div style={{flex:'1 1 200px'}}><StatCard icon={Icon.BookOpen} label="دروس منشورة" value="8" sub="آخرها قبل أسبوعين"/></div>
        <div style={{flex:'1 1 200px'}}><StatCard icon={Icon.ClipboardList} label="واجبات مُصحَّحة" value="39/44" sub="5 بانتظار"/></div>
        <div style={{flex:'1 1 200px'}}><StatCard icon={Icon.Clock} label="آخر نشاط" value="أمس" sub="نشر إعلاناً لـ 12ب"/></div>
      </div>
      <div className="card">
        <div className="section-head"><h2>الشعب</h2></div>
        <table className="tbl">
          <thead><tr><th>الشعبة</th><th>الطلاب</th><th>المتوسط</th><th>الوسيط</th><th>المصحَّح</th><th></th></tr></thead>
          <tbody>
            <tr><td><b>12أ</b></td><td className="num">22</td><td><span className="num band-mid" style={{fontWeight:700}}>68%</span> <Pill kind="late">شاذ</Pill></td><td className="num">70%</td><td>18/22</td><td><button className="btn ghost sm" onClick={()=>nav('course-drill')}>تفاصيل</button></td></tr>
            <tr><td><b>12ب</b></td><td className="num">22</td><td><span className="num band-mid-high" style={{fontWeight:700}}>78%</span></td><td className="num">79%</td><td>21/22</td><td><button className="btn ghost sm" onClick={()=>nav('course-drill')}>تفاصيل</button></td></tr>
          </tbody>
        </table>
      </div>
      <div className="card">
        <div className="section-head"><h2>الدروس المنشورة مؤخراً</h2></div>
        <div className="col gap-2">
          {[
            {n:8, t:'التوبة وأثرها على المسلم', d:'منذ أسبوعين'},
            {n:7, t:'الصيام في الإسلام', d:'منذ 3 أسابيع'},
            {n:6, t:'الزكاة وأحكامها', d:'منذ 4 أسابيع'},
          ].map(l => (
            <div key={l.n} className="lesson-row">
              <div className="lesson-num">{l.n}</div>
              <div className="col grow"><div style={{fontSize:14, fontWeight:600}}>{l.t}</div><div style={{fontSize:12, color:'var(--text-tertiary)'}}>نُشر {l.d}</div></div>
              <Pill kind="published">منشور</Pill>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SupervisorCourseDrill({ nav }: SBag) {
  return (
    <div className="col gap-5">
      <Breadcrumbs items={[
        {label:'المعلمون', onClick:()=>nav('teachers')},
        {label:'أ. سليمان الشبلي', onClick:()=>nav('teacher-detail')},
        {label:'الصف 12أ — التربية الإسلامية'}
      ]}/>
      <div className="page-header">
        <div><h1 className="page-title">الصف 12أ — التربية الإسلامية</h1><p className="page-sub">أ. سليمان الشبلي · <span className="num">22</span> طالب · متوسط <span className="num band-mid">68%</span></p></div>
      </div>
      <div className="row gap-4 wrap">
        <div style={{flex:'1 1 180px'}}><StatCard icon={Icon.TrendingUp} label="المتوسط" value="68%" accent="var(--warning-500)"/></div>
        <div style={{flex:'1 1 180px'}}><StatCard icon={Icon.BarChart} label="الوسيط" value="70%"/></div>
        <div style={{flex:'1 1 180px'}}><StatCard icon={Icon.Award} label="أعلى درجة" value="92%"/></div>
        <div style={{flex:'1 1 180px'}}><StatCard icon={Icon.AlertTriangle} label="أقل من 60%" value="6 طلاب" accent="var(--danger-500)"/></div>
      </div>
      <div className="card">
        <div className="section-head"><h2>توزيع الدرجات — الواجب الثاني</h2></div>
        <div className="hist-wrap">
          {[
            {range:'90–100', v:2}, {range:'80–89', v:4}, {range:'70–79', v:6},
            {range:'60–69', v:4}, {range:'50–59', v:4}, {range:'<50', v:2},
          ].map((b,i) => (
            <div key={i} className="hist-row">
              <div className="hist-label num">{b.range}</div>
              <div className="hist-bar-wrap"><div className="hist-bar" style={{width:(b.v/6*100)+'%', background: i<2?'var(--success-500)':i<4?'var(--accent-500)':'var(--warning-500)'}}/></div>
              <div className="num" style={{width:28, textAlign:'center', fontWeight:600}}>{b.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="section-head"><h2>الطلاب</h2></div>
        <table className="tbl">
          <thead><tr><th>الطالب</th><th>المتوسط</th><th>الواجب 1</th><th>الواجب 2</th><th>الحالة</th></tr></thead>
          <tbody>
            {[
              {n:'عبدالله الكلباني', i:'ع', avg:92, g1:19, g2:24, warn:false},
              {n:'صالح الريامي',     i:'ص', avg:84, g1:17, g2:21, warn:false},
              {n:'جابر الفارسي',    i:'ج', avg:76, g1:15, g2:19, warn:false},
              {n:'نواف البوسعيدي',  i:'ن', avg:68, g1:13, g2:17, warn:true},
              {n:'فيصل الحبسي',    i:'ف', avg:58, g1:12, g2:14, warn:true},
              {n:'سمير الغافري',    i:'س', avg:52, g1:11, g2:13, warn:true},
            ].map((s,i) => (
              <tr key={i}>
                <td className="row gap-2 items-center"><div className="avatar sm">{s.i}</div><span>{s.n}</span></td>
                <td><span className={'num ' + (s.avg>=85?'band-high':s.avg>=75?'band-mid-high':s.avg>=65?'band-mid':'band-low')} style={{fontWeight:700}}>{s.avg}%</span></td>
                <td className="num">{s.g1}/20</td>
                <td className="num">{s.g2}/25</td>
                <td>{s.warn ? <Pill kind="late">يحتاج متابعة</Pill> : <Pill kind="graded">طبيعي</Pill>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SupervisorReports() {
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">التقارير والمؤشرات</h1><p className="page-sub">نظرة عامة على نطاق إشرافك</p></div></div>
      <div className="row gap-4 wrap">
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.TrendingUp} label="متوسط النطاق" value="78%"/></div>
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.CheckCircle} label="الواجبات المصحّحة في الوقت" value="92%"/></div>
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.BookOpen} label="متوسط الدروس/الشعبة" value="13"/></div>
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.Users} label="طلاب دون 60%" value="11" accent="var(--warning-500)"/></div>
      </div>
      <div className="card">
        <div className="section-head"><h2>المتوسطات حسب الشعبة</h2></div>
        <div className="col gap-3">
          {D.supervisorScope.map(s => (
            <div key={s.cls} className="row gap-3 items-center">
              <div style={{width:40, fontWeight:700}}>{s.cls}</div>
              <div style={{flex:1, height:8, background:'var(--bg-surface-2)', borderRadius:4, overflow:'hidden'}}>
                <div style={{width:s.avg+'%', height:'100%', background: s.avg>=80?'var(--success-500)':s.avg>=70?'var(--accent-500)':'var(--warning-500)', borderRadius:4}}/>
              </div>
              <div className="num" style={{width:60, textAlign:'end', fontWeight:700}}>{s.avg}%</div>
              <div style={{fontSize:12, color:'var(--text-tertiary)', width:140}}>{s.teacher}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SupervisorNotes({ nav }: SBag) {
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">ملاحظاتي</h1><p className="page-sub">ملاحظاتك الخاصة عن المعلمين والطلاب في نطاقك — خاصة بك فقط</p></div><button className="btn primary" onClick={()=>nav('note-compose')}><Icon.Plus size={14}/>ملاحظة جديدة</button></div>
      <div className="col gap-3">
        {D.supervisorNotes.map((n,i) => (
          <div key={i} className="card">
            <div className="row between items-start mb-2">
              <div className="row gap-3 items-center">
                <span className="stat-ico" style={{background: n.type==='teacher'?'var(--primary-900)':'var(--warning-900)', color: n.type==='teacher'?'var(--primary-300)':'var(--warning-500)'}}>
                  {n.type==='teacher'?<Icon.User size={16}/>:<Icon.School size={16}/>}
                </span>
                <div className="col">
                  <div style={{fontSize:15, fontWeight:600}}>{n.subject}</div>
                  <div style={{fontSize:11, color:'var(--text-tertiary)'}}>{n.ago} · {n.type==='teacher'?'ملاحظة على معلم':'ملاحظة على طالب'}</div>
                </div>
              </div>
              <Pill kind={n.status==='إيجابية'?'graded':n.status==='متابعة مطلوبة'?'late':'pending'}>{n.status}</Pill>
            </div>
            <p style={{margin:0, fontSize:14, color:'var(--text-secondary)', lineHeight:1.8}}>{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SupervisorNoteCompose({ nav }: SBag) {
  const t = useToast();
  return (
    <div className="col gap-5">
      <Breadcrumbs items={[{label:'الملاحظات', onClick:()=>nav('notes')},{label:'ملاحظة جديدة'}]}/>
      <div className="page-header"><div><h1 className="page-title">ملاحظة جديدة</h1><p className="page-sub">هذه الملاحظة خاصة بك فقط — لا يراها أحد غيرك</p></div></div>
      <div className="card">
        <div className="col gap-4">
          <div className="field">
            <label>نوع الملاحظة</label>
            <div className="row gap-2">
              <label className="row gap-2 items-center"><input type="radio" name="type" defaultChecked/><span>ملاحظة على معلم</span></label>
              <label className="row gap-2 items-center"><input type="radio" name="type"/><span>ملاحظة على طالب</span></label>
            </div>
          </div>
          <div className="field">
            <label>الشخص</label>
            <select className="select"><option>أ. سليمان الشبلي</option><option>أ. إبراهيم الغيلاني</option><option>أ. أحمد الحارثي</option></select>
          </div>
          <div className="field">
            <label>الحالة</label>
            <div className="row gap-2">
              {['إيجابية','متابعة','متابعة مطلوبة'].map((x,i) => (
                <label key={i} className="row gap-2 items-center"><input type="radio" name="status" defaultChecked={i===1}/><span>{x}</span></label>
              ))}
            </div>
          </div>
          <div className="field"><label>نص الملاحظة</label><textarea className="textarea" rows={8} placeholder="اكتب ملاحظتك بوضوح…"/></div>
        </div>
      </div>
      <div className="row end gap-2">
        <button className="btn secondary" onClick={()=>nav('notes')}>إلغاء</button>
        <button className="btn primary" onClick={()=>{t.showToast('حُفظت الملاحظة.'); nav('notes');}}>حفظ الملاحظة</button>
      </div>
    </div>
  );
}

export function SupervisorStudentsList() {
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">طلاب نطاقي</h1><p className="page-sub"><span className="num">132</span> طالب · <span className="num">11</span> يحتاجون متابعة</p></div></div>
      <div className="card">
        <table className="tbl">
          <thead><tr><th>الطالب</th><th>الشعبة</th><th>المعلم</th><th>المتوسط</th><th>الحالة</th></tr></thead>
          <tbody>
            {D.roster11A.slice(0,10).map(s => (
              <tr key={s.id}>
                <td className="row gap-2 items-center"><div className="avatar sm">{s.initial}</div><span>{s.short}</span></td>
                <td>11أ</td>
                <td>أ. أحمد الحارثي</td>
                <td><span className={'num ' + (s.avg>=85?'band-high':s.avg>=75?'band-mid-high':s.avg>=65?'band-mid':'band-low')} style={{fontWeight:700}}>{s.avg}%</span></td>
                <td>{s.avg<70 ? <Pill kind="late">يحتاج متابعة</Pill> : <Pill kind="graded">طبيعي</Pill>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SupervisorAnnouncements({ nav }: SBag) {
  const ann = D.announcements.filter(a => a.role==='supervisor' || a.scope==='teachers-only');
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">الإعلانات</h1><p className="page-sub">إعلاناتك للمعلمين في نطاقك</p></div><button className="btn primary" onClick={()=>nav('announce-compose')}><Icon.Plus size={14}/>إعلان جديد</button></div>
      <div className="col gap-3">
        {ann.map((a,i) => (
          <div key={i} className="ann-card">
            <span className={'ann-ico '+a.color}><Icon.Users size={18}/></span>
            <div className="col grow">
              <div className="row between items-center"><div style={{fontSize:15, fontWeight:600}}>{a.title}</div><div style={{fontSize:12, color:'var(--text-tertiary)'}}>{a.ago}</div></div>
              <p style={{margin:'6px 0 0', fontSize:14, color:'var(--text-secondary)', lineHeight:1.8}}>{a.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SupervisorProfile() {
  const u = D.cast.supervisor;
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">ملفي الشخصي</h1></div></div>
      <div className="row gap-5 items-start wrap">
        <div className="card" style={{flex:'1 1 280px'}}>
          <div className="col center gap-3" style={{padding:'8px 0 16px'}}><div className="avatar xl">ح</div><div className="col center"><div style={{fontSize:17, fontWeight:700}}>{u.name}</div><div style={{fontSize:13, color:'var(--text-secondary)'}}>مشرف</div></div></div>
          <div className="muqarnas-div"/>
          <div className="col gap-3" style={{fontSize:13}}>
            <div className="row between"><span style={{color:'var(--text-tertiary)'}}>البريد</span><span className="latin">{u.email}</span></div>
            <div className="row between"><span style={{color:'var(--text-tertiary)'}}>نطاق الإشراف</span><span style={{textAlign:'end', maxWidth:200}}>{u.scope}</span></div>
            <div className="row between"><span style={{color:'var(--text-tertiary)'}}>المعلمون</span><span className="num">3</span></div>
            <div className="row between"><span style={{color:'var(--text-tertiary)'}}>الشعب</span><span className="num">6</span></div>
          </div>
        </div>
        <div className="card grow" style={{flex:'2 1 480px'}}>
          <h3 style={{margin:'0 0 16px'}}>التفضيلات</h3>
          <div className="col gap-4">
            <div className="field"><label>اللغة</label><select className="select"><option>العربية</option></select></div>
            <div className="field"><label>إشعارات</label>
              <div className="col gap-2" style={{fontSize:14}}>
                <label className="row gap-2 items-center"><input type="checkbox" defaultChecked/><span>تنبيهات الأداء الشاذ</span></label>
                <label className="row gap-2 items-center"><input type="checkbox" defaultChecked/><span>الإعلانات العامة من الإدارة</span></label>
                <label className="row gap-2 items-center"><input type="checkbox"/><span>ملخص أسبوعي لنطاق الإشراف</span></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

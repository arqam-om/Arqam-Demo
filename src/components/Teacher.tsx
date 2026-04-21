import React, { useState } from 'react';
import { ArqamData as D } from '../data/arqam';
import { Icon, IconByName } from './Icons';
import { Pill, StatCard, Tabs, Breadcrumbs, Modal } from './Shell';
import { useToast } from '../context';
import type { ScreenBag } from '../context';

type TBag = ScreenBag;

export function TeacherHome({ nav, setCourseId }: TBag) {
  return (
    <div className="col gap-5">
      <div className="page-header">
        <div>
          <h1 className="page-title">السلام عليكم، أستاذ أحمد</h1>
          <p className="page-sub">{D.institution.todayHijri} · الحصة الثانية تبدأ بعد 15 دقيقة</p>
        </div>
      </div>

      <div className="row gap-4 wrap">
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.ClipboardList} label="واجبات تحتاج تصحيحاً" value="17" sub="موزعة على 3 شعب" accent="var(--warning-500)" onClick={()=>nav('grading')}/></div>
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.BookOpen} label="الدروس المسودّة" value="5" sub="تحتاج نشراً"/></div>
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.Users} label="إجمالي طلابك" value="88" sub="في 4 شعب"/></div>
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.Clock} label="حصصك اليوم" value="1" sub="القادمة: 11أ - 07:50"/></div>
      </div>

      <div className="row gap-5 wrap items-start">
        <div className="card grow" style={{flex:'2 1 520px'}}>
          <div className="section-head"><h2>شعبك التدريسية</h2><button className="btn link" onClick={()=>nav('courses')}>عرض الكل</button></div>
          <div className="col gap-3">
            {[
              {id:'c1', n:'التربية الإسلامية 1 - الصف 11أ', k:'22 طالب · 7 دروس منشورة · 3 واجبات', p:7, warn:'3 طلاب لم يسلّموا'},
              {id:'c1b', n:'التربية الإسلامية 1 - الصف 11ب', k:'22 طالب · 7 دروس منشورة · 3 واجبات', p:6, warn:null},
              {id:'c1c', n:'التربية الإسلامية 2 - الصف 11أ', k:'22 طالب · 6 دروس منشورة · 2 واجبات', p:9, warn:null},
              {id:'c1d', n:'التربية الإسلامية 2 - الصف 11ب', k:'22 طالب · 6 دروس منشورة · 2 واجبات', p:5, warn:null},
            ].map((c,i) => (
              <div key={i} className="card clickable" style={{padding:14}} onClick={()=>{setCourseId('c1'); nav('course');}}>
                <div className="row between items-center gap-3">
                  <div className="col" style={{gap:3}}>
                    <div style={{fontSize:15, fontWeight:600}}>{c.n}</div>
                    <div style={{fontSize:12, color:'var(--text-tertiary)'}}>{c.k}</div>
                  </div>
                  <div className="row gap-3 items-center">
                    {c.warn && <span className="pill" style={{background:'var(--warning-900)', color:'var(--warning-500)'}}><Icon.AlertTriangle size={12}/>{c.warn}</span>}
                    <Pill kind="accent">{c.p} للتصحيح</Pill>
                    <Icon.ChevronLeft size={16} style={{color:'var(--text-tertiary)'}}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{flex:'1 1 320px'}}>
          <div className="section-head"><h2>النشاط الأخير</h2></div>
          <div className="col gap-3">
            {D.teacherActivity.map((a,i) => (
              <div key={i} className="row gap-3 items-start" style={{padding:'10px 0', borderTop: i>0?'1px solid var(--border-subtle)':'none'}}>
                <div className="avatar sm" style={{background: a.who==='أنت'?'var(--primary-900)':'var(--bg-surface-3)', color:a.who==='أنت'?'var(--primary-300)':'var(--text-secondary)'}}>{a.who[0]}</div>
                <div className="col grow" style={{gap:2}}>
                  <div style={{fontSize:13}}><b style={{fontWeight:600}}>{a.who}</b> {a.what}</div>
                  <div style={{fontSize:11, color:'var(--text-tertiary)'}}>{a.ago}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-head"><h2>جدولك اليوم</h2><button className="btn link" onClick={()=>nav('timetable')}>عرض الأسبوع</button></div>
        <div className="col gap-2">
          {D.periods
            .map((p, i) => ({ p, cell: D.timetable11A[1][i] }))
            .filter(({ cell }) => cell.t?.includes('الحارثي'))
            .map(({ p, cell }) => (
              <div key={p.n} className="row gap-3 items-center" style={{padding:'12px 14px', borderRadius:8, background: cell.now?'var(--primary-900)':'var(--bg-surface-2)'}}>
                <div className="num" style={{width:104, fontSize:13, color:'var(--text-secondary)', fontWeight:600, display:'inline-flex', alignItems:'center', gap:6, direction:'ltr'}}>
                  <span>{p.time}</span>
                  <span style={{opacity:0.4, fontWeight:400}}>│</span>
                  <span>{p.end}</span>
                </div>
                <div style={{width:28, height:28, borderRadius:6, background:'var(--primary-500)', color:'var(--text-inverse)', display:'grid', placeItems:'center', fontSize:12, fontWeight:700, fontFamily:'Inter'}}>{p.n}</div>
                <div className="col grow" style={{gap:2}}>
                  <div style={{fontSize:14, fontWeight:600}}>{cell.s} - الصف 11أ</div>
                  <div style={{fontSize:12, color:'var(--text-tertiary)'}}>قاعة 204</div>
                </div>
                {cell.now && <Pill kind="accent">الآن</Pill>}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export function TeacherCourses({ nav, setCourseId }: TBag) {
  const courses = [
    {id:'c1',  n:'التربية الإسلامية 1 - الصف 11أ', s:22, l:7, a:3, g:7,  avg:82},
    {id:'c1b', n:'التربية الإسلامية 1 - الصف 11ب', s:22, l:7, a:3, g:6,  avg:84},
    {id:'c2a', n:'التربية الإسلامية 2 - الصف 11أ', s:22, l:6, a:2, g:9,  avg:86},
    {id:'c2b', n:'التربية الإسلامية 2 - الصف 11ب', s:22, l:6, a:2, g:5,  avg:85},
  ];
  return (
    <div className="col gap-5">
      <div className="page-header">
        <div><h1 className="page-title">موادي التدريسية</h1><p className="page-sub">4 شعب - 88 طالب - الفصل الدراسي الثاني</p></div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:16}}>
        {courses.map(c => (
          <div key={c.id} className="card clickable" onClick={()=>{setCourseId(c.id); nav('course');}}>
            <div className="row gap-3 items-start">
              <div style={{width:40, height:40, borderRadius:10, background:'var(--bg-surface-3)', color:'var(--primary-300)', display:'grid', placeItems:'center'}}><Icon.BookOpen size={20}/></div>
              <div className="col grow" style={{gap:2}}>
                <div style={{fontSize:15, fontWeight:600, lineHeight:1.4}}>{c.n}</div>
                <div style={{fontSize:12, color:'var(--text-tertiary)'}}><span className="num">{c.s}</span> طالب</div>
              </div>
              {c.g>0 && <Pill kind="accent"><span className="num">{c.g}</span> للتصحيح</Pill>}
            </div>
            <div className="muqarnas-div"/>
            <div className="row between" style={{fontSize:12, color:'var(--text-tertiary)'}}>
              <span>الدروس: <span className="num" style={{color:'var(--text-secondary)'}}>{c.l}</span></span>
              <span>الواجبات: <span className="num" style={{color:'var(--text-secondary)'}}>{c.a}</span></span>
              <span>المتوسط: <span className="num band-mid-high">{c.avg}%</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeacherCourseWorkspace({ nav }: TBag) {
  const [tab, setTab] = useState('lessons');
  return (
    <div className="col gap-5">
      <Breadcrumbs items={[{label:'مواد التدريس', onClick:()=>nav('courses')},{label:'التربية الإسلامية 1 - الصف 11أ'}]}/>
      <div className="page-header">
        <div>
          <h1 className="page-title">التربية الإسلامية 1 - الصف 11أ</h1>
          <p className="page-sub"><span className="num">22</span> طالب · متوسط الشعبة <span className="num band-mid-high">82%</span></p>
        </div>
        <div className="row gap-2">
          <button className="btn secondary" onClick={()=>nav('announce-compose')}><Icon.Megaphone size={14}/>إعلان للشعبة</button>
          <button className="btn primary" onClick={()=>nav('lesson-compose')}><Icon.Plus size={14}/>درس جديد</button>
        </div>
      </div>

      <Tabs active={tab} onChange={setTab} tabs={[
        {key:'lessons', label:'الدروس', count:12},
        {key:'assignments', label:'الواجبات', count:4},
        {key:'gradebook', label:'دفتر الدرجات'},
        {key:'students', label:'الطلاب', count:22},
        {key:'announcements', label:'الإعلانات', count:3},
      ]}/>

      {tab==='lessons' && <TeacherLessonsTab nav={nav}/>}
      {tab==='assignments' && <TeacherAssignmentsTab nav={nav}/>}
      {tab==='gradebook' && <GradeBook/>}
      {tab==='students' && <TeacherStudentsTab/>}
      {tab==='announcements' && <TeacherAnnouncementsTab/>}
    </div>
  );
}

function TeacherLessonsTab({ nav }: { nav: (k:string)=>void }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter==='published' ? D.lessons.filter(l=>l.state==='published')
    : filter==='draft' ? D.lessons.filter(l=>l.state==='draft')
    : D.lessons;
  return (
    <div className="col gap-3">
      <div className="row between items-center">
        <div className="row gap-2">
          {[['all','الكل',D.lessons.length],['published','منشور',7],['draft','مسودّة',5]].map(([k,l,c])=>(
            <button key={k} className={'tab-chip'+(filter===k?' active':'')} onClick={()=>setFilter(String(k))}>{l} · <span className="num">{c}</span></button>
          ))}
        </div>
        <button className="btn primary sm" onClick={()=>nav('lesson-compose')}><Icon.Plus size={14}/>إنشاء درس</button>
      </div>
      <div className="col gap-2">
        {filtered.map(l => (
          <div key={l.n} className="lesson-row">
            <div className="lesson-num">{l.n}</div>
            <div className="col grow" style={{gap:2}}>
              <div style={{fontSize:15, fontWeight:600}}>{l.title}</div>
              <div className="row gap-3" style={{fontSize:12, color:'var(--text-tertiary)'}}>
                <span>{l.state==='published' ? 'نُشر '+l.publishedAgo : 'تعديل '+l.editedAgo}</span>
                {l.attachments.length>0 && <span className="row gap-1 items-center"><Icon.Paperclip size={12}/> {l.attachments.length} مرفقات</span>}
              </div>
            </div>
            <Pill kind={l.state==='published'?'published':'draft'}>{l.state==='published'?'منشور':'مسودّة'}</Pill>
            <button className="arq-iconbtn sm" aria-label="تعديل الدرس"><Icon.Edit size={14}/></button>
            <button className="arq-iconbtn sm" aria-label="خيارات"><Icon.MoreVertical size={14}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeacherAssignmentsTab({ nav }: { nav: (k:string)=>void }) {
  return (
    <div className="col gap-3">
      <div className="row end"><button className="btn primary sm" onClick={()=>nav('asn-compose')}><Icon.Plus size={14}/>إنشاء واجب</button></div>
      <div className="col gap-2">
        {D.assignments.map(a => (
          <div key={a.n} className="asn-row">
            <div style={{width:40, height:40, borderRadius:10, background:'var(--bg-surface-3)', color:'var(--primary-300)', display:'grid', placeItems:'center'}}><Icon.ClipboardList size={18}/></div>
            <div className="col grow" style={{gap:3}}>
              <div style={{fontSize:15, fontWeight:600}}>{a.title}</div>
              <div className="row gap-3" style={{fontSize:12, color:'var(--text-tertiary)'}}>
                <span>{a.deadlineText}</span>
                <span>الدرجة القصوى: <span className="num">{a.max}</span></span>
                {a.state==='open' && <span>مسلّم: <span className="num" style={{color:'var(--text-secondary)'}}>{a.submittedCount}/22</span></span>}
              </div>
            </div>
            {a.state==='graded' && <Pill kind="graded">تم التصحيح</Pill>}
            {a.state==='open' && <>
              <Pill kind="accent"><span className="num">{22 - (a.submittedCount||0)}</span> لم يسلّم</Pill>
              <button className="btn primary sm" onClick={()=>nav('inbox')}>مراجعة التسليمات</button>
            </>}
            {a.state==='upcoming' && <Pill kind="pending">قادم</Pill>}
          </div>
        ))}
      </div>
    </div>
  );
}

function TeacherStudentsTab() {
  return (
    <div className="card">
      <table className="tbl">
        <thead><tr><th>الطالب</th><th>المتوسط</th><th>الواجبات المسلّمة</th><th>المعدل الشعبي</th><th></th></tr></thead>
        <tbody>
          {D.roster11A.map(s => (
            <tr key={s.id}>
              <td className="row gap-3 items-center"><div className="avatar sm">{s.initial}</div><span>{s.short}</span></td>
              <td><span className={'num ' + (s.avg>=85?'band-high':s.avg>=75?'band-mid-high':s.avg>=65?'band-mid':'band-low')} style={{fontWeight:700}}>{s.avg}%</span></td>
              <td><span className="num">{s.missing?'1/2':'2/2'}</span></td>
              <td><span className="num">{s.rank}</span> من <span className="num">22</span></td>
              <td><button className="arq-iconbtn sm" aria-label="عرض الطالب"><Icon.Eye size={14}/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TeacherAnnouncementsTab() {
  const list = D.announcements.filter(a => a.courseName?.includes('التربية الإسلامية'));
  return (
    <div className="col gap-3">
      {list.map((a,i) => (
        <div key={i} className="ann-card">
          <span className={'ann-ico '+a.color}><IconByName name={a.icon} size={18}/></span>
          <div className="col grow">
            <div className="row between items-center"><div style={{fontSize:15, fontWeight:600}}>{a.title}</div><div style={{fontSize:12, color:'var(--text-tertiary)'}}>{a.ago}</div></div>
            <p style={{margin:'6px 0 0', fontSize:14, color:'var(--text-secondary)'}}>{a.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LessonComposer({ nav }: TBag) {
  const [title, setTitle] = useState('الصيام وأسراره الروحية');
  const [content, setContent] = useState('الصيام عبادة عظيمة من شعائر الإسلام، وركن من أركانه الخمسة. فرضه الله على عباده المؤمنين في السنة الثانية للهجرة.\n\nللصيام أسرار روحية عظيمة، منها: تربية النفس على الصبر، وتعويدها على كبح الشهوات، وترويضها على مخالفة الهوى في سبيل طاعة الله.');
  const t = useToast();

  return (
    <div className="col gap-5">
      <Breadcrumbs items={[
        {label:'موادي', onClick:()=>nav('courses')},
        {label:'التربية الإسلامية 1 - الصف 11أ', onClick:()=>nav('course')},
        {label:'درس جديد'}
      ]}/>
      <div className="page-header">
        <div>
          <div className="row gap-2 items-center mb-2"><Pill kind="draft">مسودّة · حُفظت تلقائياً</Pill></div>
          <h1 className="page-title">إنشاء درس جديد</h1>
        </div>
        <div className="row gap-2">
          <button className="btn secondary" onClick={()=>{t.showToast('حُفظت المسودّة.'); nav('course');}}><Icon.Save size={14}/>حفظ كمسودّة</button>
          <button className="btn primary" onClick={()=>{t.showToast('تم نشر الدرس. الطلاب سيتلقّون إشعاراً.'); nav('course');}}><Icon.Upload size={14}/>نشر الدرس</button>
        </div>
      </div>

      <div className="row gap-5 items-start wrap">
        <div className="col gap-4 grow" style={{flex:'2 1 520px'}}>
          <div className="card">
            <div className="field mb-4"><label>عنوان الدرس</label><input className="input" value={title} onChange={e=>setTitle(e.target.value)}/></div>
            <div className="field">
              <label>محتوى الدرس</label>
              <div className="row gap-1 mb-2" style={{padding:8, background:'var(--bg-surface-2)', borderRadius:6}}>
                {['B','I','U','H1','H2','"','•','1.','🔗'].map((x,i)=>(<button key={i} className="arq-iconbtn sm" style={{width:30, fontSize:12, fontWeight:600}}>{x}</button>))}
              </div>
              <textarea className="textarea" rows={10} value={content} onChange={e=>setContent(e.target.value)} style={{minHeight:220, lineHeight:1.9}}/>
              <div className="row between" style={{fontSize:12, color:'var(--text-tertiary)', marginTop:4}}>
                <span>يدعم تنسيق النصوص الأساسية</span>
                <span><span className="num">{content.length}</span> حرف</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{margin:'0 0 12px', fontSize:16}}>المرفقات (PDF)</h3>
            <div className="col gap-2">
              {[{n:'ملخص_الصيام.pdf', s:'1.8 MB'},{n:'فضل_الصيام_في_القرآن.pdf', s:'2.1 MB'}].map((f,i) => (
                <div key={i} className="file-chip">
                  <span className="file-ico"><Icon.FileText size={18}/></span>
                  <div className="col grow" style={{gap:2}}><div className="latin" style={{fontSize:14, fontWeight:500}}>{f.n}</div><div style={{fontSize:12, color:'var(--text-tertiary)'}}><span className="num">{f.s}</span></div></div>
                  <button className="arq-iconbtn sm" aria-label="إزالة الملف"><Icon.X size={16}/></button>
                </div>
              ))}
              <label className="dropzone" style={{padding:16}}>
                <Icon.Upload size={20}/>
                <div style={{fontSize:13}}>إضافة ملف PDF - الحد الأقصى <span className="num">20 MB</span></div>
              </label>
            </div>
          </div>

          <div className="card">
            <h3 style={{margin:'0 0 12px', fontSize:16}}>روابط خارجية</h3>
            <div className="col gap-2">
              <div className="file-chip">
                <span className="file-ico" style={{background:'var(--info-900)', color:'var(--info-500)'}}><Icon.Link size={18}/></span>
                <div className="col grow"><div className="latin" style={{fontSize:13}}>youtube.com/watch?v=xxx</div><div style={{fontSize:12, color:'var(--text-tertiary)'}}>محاضرة عن فضل الصيام</div></div>
                <button className="arq-iconbtn sm" aria-label="إزالة الرابط"><Icon.X size={16}/></button>
              </div>
              <div className="row gap-2"><input className="input latin" placeholder="https://..."/><button className="btn secondary">إضافة</button></div>
            </div>
          </div>
        </div>

        <aside className="col gap-4" style={{flex:'1 1 280px'}}>
          <div className="card">
            <h3 style={{margin:'0 0 12px', fontSize:14, fontWeight:600}}>معلومات النشر</h3>
            <div className="col gap-3">
              <div className="field"><label>الشعبة</label><select className="select"><option>الصف 11أ</option><option>الصف 11ب</option></select></div>
              <div className="field"><label>رقم الدرس</label><input className="input num" defaultValue="8"/></div>
              <div className="field">
                <label>الحالة عند الحفظ</label>
                <div className="col gap-2" style={{fontSize:14}}>
                  <label className="row gap-2 items-center"><input type="radio" name="state" defaultChecked/><span>نشر فوراً للطلاب</span></label>
                  <label className="row gap-2 items-center"><input type="radio" name="state"/><span>حفظ كمسودّة</span></label>
                </div>
              </div>
              <div className="field"><label>إشعار الطلاب</label>
                <label className="row gap-2 items-center" style={{fontSize:13}}><input type="checkbox" defaultChecked/><span>إرسال إشعار عند النشر</span></label>
              </div>
            </div>
          </div>
          <div className="card" style={{background:'var(--primary-900)', borderColor:'color-mix(in oklab, var(--primary-500) 20%, transparent)'}}>
            <div className="row gap-2 items-center mb-2" style={{color:'var(--primary-300)'}}><Icon.Sparkles size={16}/><div style={{fontSize:14, fontWeight:600}}>نصيحة</div></div>
            <p style={{margin:0, fontSize:13, color:'var(--text-secondary)', lineHeight:1.7}}>ابدأ دروسك دائماً بآية قرآنية أو حديث نبوي لربط الطلاب بالمصدر. اختصر المحتوى في أقسام قصيرة يسهل استيعابها.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function AssignmentComposer({ nav }: TBag) {
  const t = useToast();
  return (
    <div className="col gap-5">
      <Breadcrumbs items={[
        {label:'موادي', onClick:()=>nav('courses')},
        {label:'التربية الإسلامية 1 - الصف 11أ', onClick:()=>nav('course')},
        {label:'واجب جديد'}
      ]}/>
      <div className="page-header">
        <div><h1 className="page-title">إنشاء واجب جديد</h1><p className="page-sub">حدّد تفاصيل الواجب والموعد النهائي</p></div>
        <div className="row gap-2">
          <button className="btn secondary">حفظ كمسودّة</button>
          <button className="btn primary" onClick={()=>{t.showToast('تم نشر الواجب. الطلاب سيتلقّون إشعاراً.'); nav('course');}}>نشر الواجب</button>
        </div>
      </div>
      <div className="row gap-5 items-start wrap">
        <div className="card grow" style={{flex:'2 1 520px'}}>
          <div className="col gap-4">
            <div className="field"><label>عنوان الواجب</label><input className="input" defaultValue="الواجب الرابع - تحليل حديث نبوي"/></div>
            <div className="field"><label>التعليمات التفصيلية</label><textarea className="textarea" rows={6} defaultValue="اختر حديثاً نبوياً شريفاً من الأربعين النووية، وحلّله من ثلاث جوانب: (1) درجته، (2) شرح معناه، (3) تطبيقه في حياة المسلم اليومية. لا يقل البحث عن 400 كلمة."/></div>
            <div className="field"><label>الشروط (اختياري)</label><textarea className="textarea" rows={2} defaultValue="يُرفع الواجب بصيغة PDF. الحد الأقصى لحجم الملف 10 ميجابايت."/></div>
            <div className="row gap-4 wrap">
              <div className="field grow"><label>الموعد النهائي</label><input className="input latin" defaultValue="2025-10-12 - 23:59"/></div>
              <div className="field grow"><label>الدرجة القصوى</label><input className="input num" defaultValue="25"/></div>
            </div>
          </div>
        </div>
        <aside className="card" style={{flex:'1 1 260px'}}>
          <h3 style={{margin:'0 0 12px', fontSize:14, fontWeight:600}}>خيارات</h3>
          <div className="col gap-3">
            <div className="field"><label>الشعبة</label><select className="select"><option>الصف 11أ</option></select></div>
            <div className="col gap-2" style={{fontSize:13}}>
              <label className="row gap-2 items-center"><input type="checkbox" defaultChecked/><span>السماح بالرفع المتأخر (مع تنبيه)</span></label>
              <label className="row gap-2 items-center"><input type="checkbox"/><span>السماح بإعادة الرفع قبل الموعد</span></label>
              <label className="row gap-2 items-center"><input type="checkbox" defaultChecked/><span>إشعار الطلاب عند النشر</span></label>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function GradeBook() {
  const [editing, setEditing] = useState<{row:number;col:string}|null>(null);
  const [vals, setVals] = useState<Record<string,number>>({});
  const [search, setSearch] = useState('');

  const cols = [
    {key:'g1',   label:'الواجب 1', max:20},
    {key:'g2',   label:'الواجب 2', max:25, current:true},
    {key:'g3',   label:'الواجب 3', max:30, pending:true},
    {key:'exam', label:'الاختبار', max:25, pending:true},
  ];
  const students = D.roster11A.filter(s => !search || s.short.includes(search));

  const getVal = (row: typeof D.roster11A[0], key: string): number|null => {
    const k = String(row.id)+key;
    if (vals[k] !== undefined) return vals[k];
    if (key==='g1') return row.g1;
    if (key==='g2') return row.missing ? null : row.grade;
    return null;
  };

  return (
    <div className="col gap-4">
      <div className="row between wrap gap-3">
        <div className="row gap-2 items-center">
          <div style={{position:'relative'}}>
            <Icon.Search size={14} style={{position:'absolute', insetInlineStart:10, top:9, color:'var(--text-tertiary)'}}/>
            <input className="input" style={{paddingInlineStart:32, height:36}} placeholder="ابحث عن طالب…" value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
        </div>
        <div className="row gap-2">
          <span style={{fontSize:13, color:'var(--text-secondary)'}}>متوسط الشعبة: <span className="num band-mid-high" style={{fontWeight:700}}>82%</span></span>
          <button className="btn secondary sm"><Icon.Download size={14}/>تصدير CSV</button>
          <button className="btn primary sm"><Icon.CheckCircle size={14}/>اعتماد الدرجات</button>
        </div>
      </div>

      <div style={{overflow:'auto', borderRadius:'var(--radius-md)', border:'1px solid var(--border-subtle)'}}>
        <table className="gb-table">
          <thead>
            <tr>
              <th className="sticky-name">الطالب</th>
              {cols.map(c => <th key={c.key} style={{textAlign:'center', minWidth:120}}>{c.label}<br/><span className="num" style={{fontSize:11, color:'var(--text-tertiary)', fontWeight:400}}>/{c.max}</span></th>)}
              <th style={{textAlign:'center'}}>المتوسط</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td className="sticky-name"><div className="row gap-2 items-center"><div className="avatar sm">{s.initial}</div><span>{s.short}</span></div></td>
                {cols.map(c => {
                  const v = getVal(s, c.key);
                  const isEditing = editing?.row===s.id && editing?.col===c.key;
                  const isMissing = c.key==='g2' && s.missing;
                  const isLate = c.key==='g2' && s.lateOn===2;
                  return (
                    <td key={c.key}
                      className={'gb-cell' + (isMissing?' missing':'') + (isLate?' late':'') + (isEditing?' editing':'') + (c.pending?' pending':'')}
                      onClick={()=>{ if (c.pending) return; setEditing({row:s.id, col:c.key}); }}>
                      {isEditing ? (
                        <input className="gb-editor" autoFocus defaultValue={v||''}
                          onBlur={(e)=>{ const v2 = +(e.target as HTMLInputElement).value || 0; setVals({...vals, [String(s.id)+c.key]: v2}); setEditing(null); }}
                          onKeyDown={(e)=>{ if (e.key==='Enter') (e.target as HTMLInputElement).blur(); if (e.key==='Escape') setEditing(null); }}/>
                      ) : c.pending ? <span>-</span> : isMissing ? <span>غائب</span> : <>{isLate && <span className="late-dot"/>}<span className="num" style={{fontWeight:600}}>{v ?? '-'}</span></>}
                    </td>
                  );
                })}
                <td style={{textAlign:'center'}}><span className={'num ' + (s.avg>=85?'band-high':s.avg>=75?'band-mid-high':s.avg>=65?'band-mid':'band-low')} style={{fontWeight:700}}>{s.avg}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row gap-4 items-center" style={{fontSize:12, color:'var(--text-tertiary)'}}>
        <span className="row gap-1 items-center"><span style={{width:6, height:6, borderRadius:'50%', background:'var(--warning-500)'}}/>متأخر</span>
        <span style={{padding:'2px 8px', background:'color-mix(in oklab, var(--danger-900) 60%, transparent)', color:'var(--danger-500)', borderRadius:4}}>غائب</span>
        <span>اضغط على أي خلية لتحرير الدرجة</span>
      </div>
    </div>
  );
}

export function SubmissionInbox({ nav }: TBag) {
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState('pending');
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const t = useToast();

  const subs = [
    {id:1, name:'أحمد بن سالم الكندي',    short:'أحمد الكندي',    initial:'أ', submittedAt:'الثلاثاء 22:42', onTime:true,  graded:false, grade:0},
    {id:2, name:'يوسف بن علي المعمري',    short:'يوسف المعمري',   initial:'ي', submittedAt:'الثلاثاء 19:10', onTime:true,  graded:false, grade:0},
    {id:3, name:'سيف بن حمدان الخروصي',   short:'سيف الخروصي',   initial:'س', submittedAt:'الثلاثاء 16:25', onTime:true,  graded:false, grade:0},
    {id:4, name:'عمر بن يحيى الحجري',     short:'عمر الحجري',    initial:'ع', submittedAt:'الإثنين 20:15', onTime:true,  graded:false, grade:0},
    {id:5, name:'طارق بن سعيد المقبالي',  short:'طارق المقبالي', initial:'ط', submittedAt:'الإثنين 14:30', onTime:true,  graded:true,  grade:24},
    {id:6, name:'سعود بن خالد الحبسي',   short:'سعود الحبسي',   initial:'س', submittedAt:'الأحد 21:50',    onTime:true,  graded:true,  grade:22},
    {id:7, name:'خالد بن راشد الزدجالي', short:'خالد الزدجالي', initial:'خ', submittedAt:'الخميس 23:47', onTime:false, graded:false, grade:0},
  ];
  const filtered = filter==='all' ? subs : filter==='pending' ? subs.filter(s=>!s.graded) : subs.filter(s=>s.graded);
  const cur = filtered[selected] || filtered[0];

  return (
    <div className="col gap-4">
      <Breadcrumbs items={[
        {label:'موادي', onClick:()=>nav('courses')},
        {label:'التربية الإسلامية 1 - الصف 11أ', onClick:()=>nav('course')},
        {label:'الواجب الثالث - التسليمات'}
      ]}/>
      <div className="page-header">
        <div>
          <h1 className="page-title">تسليمات الواجب الثالث</h1>
          <p className="page-sub">بحث في مفهوم التوحيد · الدرجة القصوى <span className="num">30</span> · <span className="num">7</span> مُسلَّم / <span className="num">22</span></p>
        </div>
        <button className="btn secondary" onClick={()=>nav('grade-release')}><Icon.CheckCircle size={14}/>اعتماد ونشر</button>
      </div>

      <div className="row gap-4 items-stretch" style={{minHeight:600}}>
        <aside className="card" style={{width:340, flexShrink:0, padding:0, overflow:'hidden', display:'flex', flexDirection:'column'}}>
          <div className="row gap-1" style={{padding:'12px 16px', borderBottom:'1px solid var(--border-subtle)'}}>
            {[['pending','للتصحيح',4],['graded','مصحّح',2],['all','الكل',7]].map(([k,l,c])=>(
              <button key={k} className={'tab-chip'+(filter===k?' active':'')} onClick={()=>{setFilter(String(k)); setSelected(0);}}>{l} · <span className="num">{c}</span></button>
            ))}
          </div>
          <div style={{overflow:'auto', flex:1}}>
            {filtered.map((s,i) => (
              <button key={s.id} onClick={()=>setSelected(i)} style={{display:'flex', alignItems:'center', gap:12, padding:14, width:'100%', background:i===selected?'var(--primary-900)':'transparent', border:'none', borderBottom:'1px solid var(--border-subtle)', color:'inherit', cursor:'pointer', textAlign:'start', fontFamily:'inherit'}}>
                <div className="avatar md">{s.initial}</div>
                <div className="col grow" style={{gap:3}}>
                  <div style={{fontSize:14, fontWeight:600}}>{s.short}</div>
                  <div style={{fontSize:11, color:'var(--text-tertiary)'}}>{s.submittedAt}</div>
                </div>
                {!s.onTime && <Pill kind="late">متأخر</Pill>}
                {s.graded ? <Pill kind="graded"><span className="num">{s.grade}</span></Pill> : <span style={{width:8, height:8, borderRadius:'50%', background:'var(--accent-500)'}}/>}
              </button>
            ))}
          </div>
        </aside>

        {cur && (
          <div className="col grow gap-4" style={{minWidth:0}}>
            <div className="card" style={{flex:1, display:'flex', flexDirection:'column'}}>
              <div className="row between items-center mb-3">
                <div className="row gap-3 items-center">
                  <div className="avatar md">{cur.initial}</div>
                  <div className="col"><div style={{fontWeight:600}}>{cur.name}</div><div style={{fontSize:12, color:'var(--text-tertiary)'}}>سُلِّم {cur.submittedAt}{!cur.onTime?' · متأخر':''}</div></div>
                </div>
                <div className="row gap-2">
                  <button className="btn secondary sm"><Icon.Download size={14}/>تحميل</button>
                  <button className="btn ghost sm"><Icon.ChevronLeft size={14}/>السابق</button>
                  <button className="btn ghost sm">التالي<Icon.ChevronRight size={14}/></button>
                </div>
              </div>
              <div className="pdf-preview" style={{flex:1, minHeight:300}}>
                <Icon.FileText size={48}/>
                <div style={{fontSize:14}} className="latin">بحث_التوحيد_{cur.short.split(' ')[1]||'طالب'}.pdf</div>
                <div style={{fontSize:12, color:'var(--text-tertiary)'}}>معاينة ملف PDF - <span className="num">3.7 MB</span> · <span className="num">7</span> صفحات</div>
                <div className="row gap-2 mt-3"><button className="btn secondary sm">صفحة سابقة</button><span style={{fontSize:13}} className="num">1 / 7</span><button className="btn secondary sm">صفحة تالية</button></div>
              </div>
            </div>
            <div className="card">
              <h3 style={{margin:'0 0 12px', fontSize:14, fontWeight:600}}>التصحيح</h3>
              <div className="row gap-3 items-end wrap">
                <div className="field" style={{flex:'0 0 140px'}}><label>الدرجة (من <span className="num">30</span>)</label><input className="input num" value={grade} onChange={e=>setGrade(e.target.value)} placeholder="-"/></div>
                <div className="field grow" style={{minWidth:260}}><label>ملاحظة للطالب (اختياري)</label><textarea className="textarea" rows={3} value={feedback} onChange={e=>setFeedback(e.target.value)} placeholder="اكتب ملاحظة قصيرة للطالب…"/></div>
                <div className="row gap-2">
                  <button className="btn secondary">حفظ كمسودّة</button>
                  <button className="btn primary" onClick={()=>t.showToast('حُفظت الدرجة. ستظهر للطالب عند الاعتماد والنشر.')}>حفظ الدرجة</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function GradeReleaseScreen({ nav }: TBag) {
  const t = useToast();
  return (
    <div className="col gap-5">
      <Breadcrumbs items={[
        {label:'موادي', onClick:()=>nav('courses')},
        {label:'التربية الإسلامية 1 - الصف 11أ', onClick:()=>nav('course')},
        {label:'اعتماد ونشر الدرجات'}
      ]}/>
      <div className="page-header">
        <div><h1 className="page-title">اعتماد ونشر درجات الواجب الثالث</h1><p className="page-sub">راجع الدرجات قبل إرسالها للطلاب. بمجرد الاعتماد، ستظهر الدرجات في صفحات الطلاب ويتم إرسال إشعارات.</p></div>
      </div>
      <div className="row gap-4 wrap">
        <div style={{flex:'1 1 200px'}}><StatCard icon={Icon.CheckCircle} label="مصحّح" value="5 / 7" sub="بانتظار تصحيح 2"/></div>
        <div style={{flex:'1 1 200px'}}><StatCard icon={Icon.TrendingUp} label="متوسط الدرجات" value="84%" sub="أعلى من الواجب 2"/></div>
        <div style={{flex:'1 1 200px'}}><StatCard icon={Icon.AlertTriangle} label="لم يسلّموا" value="15" sub="سيُسجَّل صفر" accent="var(--warning-500)"/></div>
        <div style={{flex:'1 1 200px'}}><StatCard icon={Icon.Clock} label="تسليمات متأخرة" value="1" sub="مع خصم موعد"/></div>
      </div>
      <div className="card" style={{padding:0, overflow:'hidden'}}>
        <table className="tbl">
          <thead><tr><th>الطالب</th><th>الحالة</th><th>الدرجة</th><th>النسبة</th></tr></thead>
          <tbody>
            {[
              {n:'أحمد الكندي',  i:'أ', s:'مصحّح', g:'26/30', p:87, color:'band-mid-high'},
              {n:'يوسف المعمري', i:'ي', s:'مصحّح', g:'28/30', p:93, color:'band-high'},
              {n:'سيف الخروصي',  i:'س', s:'مصحّح', g:'25/30', p:83, color:'band-mid-high'},
              {n:'طارق المقبالي',i:'ط', s:'مصحّح', g:'29/30', p:97, color:'band-high'},
              {n:'سعود الحبسي', i:'س', s:'مصحّح', g:'24/30', p:80, color:'band-mid-high'},
              {n:'خالد الزدجالي',i:'خ', s:'متأخر - بانتظار', g:'-', p:null, color:''},
              {n:'عمر الحجري',   i:'ع', s:'بانتظار', g:'-', p:null, color:''},
            ].map((r,i) => (
              <tr key={i}>
                <td className="row gap-2 items-center"><div className="avatar sm">{r.i}</div><span>{r.n}</span></td>
                <td>{r.s.includes('مصحّح')?<Pill kind="graded">مصحّح</Pill>:<Pill kind="pending">{r.s}</Pill>}</td>
                <td><span className="num" style={{fontWeight:600}}>{r.g}</span></td>
                <td>{r.p!==null ? <span className={'num '+r.color} style={{fontWeight:700}}>{r.p}%</span> : <span style={{color:'var(--text-tertiary)'}}>-</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card" style={{background:'var(--warning-900)', borderColor:'color-mix(in oklab, var(--warning-500) 30%, transparent)'}}>
        <div className="row gap-3 items-start">
          <Icon.AlertTriangle size={20} style={{color:'var(--warning-500)', flexShrink:0, marginTop:2}}/>
          <div className="col grow" style={{gap:6}}>
            <div style={{fontSize:14, fontWeight:600, color:'var(--warning-500)'}}>تنبيه</div>
            <p style={{margin:0, fontSize:13, lineHeight:1.7}}>لم يُسلّم 15 طالباً الواجب حتى الآن. عند الاعتماد سيُسجَّل لهم صفر ويمكنك تعديله لاحقاً يدوياً.</p>
          </div>
        </div>
      </div>
      <div className="row between items-center">
        <button className="btn ghost" onClick={()=>nav('inbox')}><Icon.ArrowRight size={14}/>رجوع إلى التصحيح</button>
        <div className="row gap-2">
          <button className="btn secondary">حفظ بدون اعتماد</button>
          <button className="btn primary lg" onClick={()=>{t.showToast('تم اعتماد ونشر الدرجات. ١٨ طالباً سيتلقّون إشعاراً.'); nav('course');}}>
            <Icon.CheckCircle size={16}/>اعتماد ونشر
          </button>
        </div>
      </div>
    </div>
  );
}

export function TeacherAnnouncements({ nav }: TBag) {
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">الإعلانات</h1><p className="page-sub">إعلاناتك ومستلموها</p></div><button className="btn primary" onClick={()=>nav('announce-compose')}><Icon.Plus size={14}/>إعلان جديد</button></div>
      <div className="col gap-3">
        {D.announcements.filter(a=>a.role==='teacher'||a.role==='admin').map((a,i) => (
          <div key={i} className="ann-card">
            <span className={'ann-ico '+a.color}><IconByName name={a.icon} size={18}/></span>
            <div className="col grow">
              <div className="row between items-center"><div style={{fontSize:15, fontWeight:600}}>{a.title}</div><div style={{fontSize:12, color:'var(--text-tertiary)'}}>{a.ago}</div></div>
              <p style={{margin:'6px 0 8px', fontSize:14, color:'var(--text-secondary)'}}>{a.body}</p>
              <div className="row gap-3" style={{fontSize:12, color:'var(--text-tertiary)'}}>
                <span>{a.scope==='institution'?'المعهد كله':a.courseName||a.audienceText}</span>
                {a.role==='teacher' && <><span>·</span><span>قرأه <span className="num">18</span>/<span className="num">22</span></span></>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeacherTimetable() {
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">جدولي الأسبوعي</h1><p className="page-sub">4 شعب · 24 حصة أسبوعياً</p></div></div>
      <div style={{overflow:'auto'}}>
        <table className="timetable">
          <thead><tr><th style={{width:108}}>الحصة</th>{D.days.map(d => <th key={d}>{d}</th>)}</tr></thead>
          <tbody>
            {D.periods.map((p, pi) => (
              <React.Fragment key={p.n}>
                {pi === 4 && (
                  <tr className="break-row">
                    <td className="period-h break-time">
                      <div className="num" style={{fontSize:10, color:'var(--accent-500)', display:'inline-flex', alignItems:'center', gap:4, direction:'ltr', justifyContent:'center'}}>
                        <span>{D.breakPeriod.from}</span>
                        <span style={{opacity:0.5}}>│</span>
                        <span>{D.breakPeriod.to}</span>
                      </div>
                    </td>
                    <td colSpan={D.days.length} className="break-label">{D.breakPeriod.label}</td>
                  </tr>
                )}
                <tr>
                  <td className="period-h">
                    <div className="col center" style={{gap:3}}>
                      <div className="num" style={{fontWeight:700, fontSize:14}}>{p.n}</div>
                      <div className="num" style={{fontSize:10, color:'var(--text-tertiary)', display:'inline-flex', alignItems:'center', gap:4, direction:'ltr'}}>
                        <span>{p.time}</span>
                        <span style={{opacity:0.45}}>│</span>
                        <span>{p.end}</span>
                      </div>
                    </div>
                  </td>
                  {D.days.map((d, di) => {
                    const cell = D.timetable11A[di][pi];
                    const mine = cell.t?.includes('الحارثي');
                    return (
                      <td key={d}>
                        <div className={'tt-cell'+(mine?' hero':'')+(cell.now&&mine?' now':'')+(mine?'':' flex')}>
                          <div className="subj">{mine ? cell.s : '-'}</div>
                          {mine && <div className="teach" style={{color:'var(--primary-300)', opacity:0.85}}>الصف 11أ · قاعة 204</div>}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TeacherProfile() {
  const u = D.cast.teacher;
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">ملفي الشخصي</h1></div></div>
      <div className="row gap-5 items-start wrap">
        <div className="card" style={{flex:'1 1 280px'}}>
          <div className="col center gap-3" style={{padding:'8px 0 16px'}}>
            <div className="avatar xl">أ</div>
            <div className="col center"><div style={{fontSize:17, fontWeight:700}}>{u.name}</div><div style={{fontSize:13, color:'var(--text-secondary)'}}>{u.title}</div></div>
          </div>
          <div className="muqarnas-div"/>
          <div className="col gap-3" style={{fontSize:13}}>
            <div className="row between"><span style={{color:'var(--text-tertiary)'}}>البريد</span><span className="latin" style={{color:'var(--text-secondary)'}}>{u.email}</span></div>
            <div className="row between"><span style={{color:'var(--text-tertiary)'}}>المشرف</span><span>أ. حسن البلوشي</span></div>
            <div className="row between"><span style={{color:'var(--text-tertiary)'}}>الشعب</span><span className="num">4</span></div>
            <div className="row between"><span style={{color:'var(--text-tertiary)'}}>الطلاب</span><span className="num">88</span></div>
          </div>
        </div>
        <div className="card grow" style={{flex:'2 1 480px'}}>
          <h3 style={{margin:'0 0 16px'}}>التفضيلات</h3>
          <div className="col gap-4">
            <div className="field"><label>اللغة</label><select className="select"><option>العربية</option><option>English</option></select></div>
            <div className="field"><label>إشعارات</label>
              <div className="col gap-2" style={{fontSize:14}}>
                <label className="row gap-2 items-center"><input type="checkbox" defaultChecked/><span>عند رفع طالب لواجب</span></label>
                <label className="row gap-2 items-center"><input type="checkbox" defaultChecked/><span>الإعلانات العامة من الإدارة</span></label>
                <label className="row gap-2 items-center"><input type="checkbox"/><span>تذكير يومي بالحصص</span></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TeacherGradingList({ nav }: TBag) {
  const items = [
    { c:'التربية الإسلامية 1 - 11أ', a:'الواجب الثالث - بحث في التوحيد', n:7 },
    { c:'التربية الإسلامية 1 - 11ب', a:'الواجب الثالث - بحث في التوحيد', n:6 },
    { c:'التربية الإسلامية 2 - 11أ', a:'مقال قصير عن العبادات',          n:9 },
    { c:'التربية الإسلامية 2 - 11ب', a:'مقال قصير عن العبادات',          n:5 },
  ];
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">للتصحيح</h1><p className="page-sub"><span className="num">27</span> تسليمات بانتظارك - موزّعة على 4 شعب</p></div></div>
      <div className="col gap-3">
        {items.map((it,i) => (
          <div key={i} className="card clickable" onClick={()=>nav('inbox')}>
            <div className="row between items-center">
              <div className="col" style={{gap:3}}><div style={{fontSize:15, fontWeight:600}}>{it.a}</div><div style={{fontSize:12, color:'var(--text-tertiary)'}}>{it.c}</div></div>
              <div className="row gap-3 items-center">
                <Pill kind="accent"><span className="num">{it.n}</span> بانتظار التصحيح</Pill>
                <button className="btn primary sm">ابدأ</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

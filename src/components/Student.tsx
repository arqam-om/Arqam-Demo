import React, { useState } from 'react';
import { ArqamData as D } from '../data/arqam';
import { Icon, IconByName } from './Icons';
import { Pill, EmptyState, StatCard, ProgressRing, Tabs, Breadcrumbs } from './Shell';
import { useToast } from '../context';
import type { ScreenBag } from '../context';

type SBag = Pick<ScreenBag, 'nav' | 'setCourseId' | 'setLessonN' | 'setAssignmentN' | 'courseId' | 'lessonN' | 'assignmentN'>;

const icoFor = (s: string) => ({
  'book-open': Icon.BookOpen, 'pen-tool': Icon.PenTool, languages: Icon.Languages,
  sigma: Icon.Sigma, leaf: Icon.Leaf, flask: Icon.Flask, atom: Icon.Atom,
  globe: Icon.Globe, compass: Icon.Compass,
} as Record<string, React.ComponentType<{size?:number}>>)[s] || Icon.BookOpen;

export function StudentHome({ nav }: SBag) {
  const todayPeriods = D.timetable11A[1];
  return (
    <div className="col gap-5">
      <div className="page-header">
        <div>
          <h1 className="page-title">أهلاً، أحمد</h1>
          <p className="page-sub">{D.institution.todayHijri} · {D.institution.todayGregorian}</p>
        </div>
        <div className="row gap-2 items-center" style={{color:'var(--text-secondary)', fontSize:13}}>
          <Icon.Cloud size={18}/><span>مسقط · <span className="num">28°</span></span>
        </div>
      </div>

      <div className="row gap-4 wrap">
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.Clock} label="حصصك اليوم" value="8" sub="تبدأ 07:05" onClick={()=>nav('timetable')}/></div>
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.ClipboardList} label="واجبات معلّقة" value="2" sub="الأقرب: بعد 3 أيام" accent="var(--warning-500)" onClick={()=>nav('assignments')}/></div>
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.Award} label="درجات جديدة" value="3" sub="آخرها: التربية الإسلامية 1" onClick={()=>nav('grades')}/></div>
        <div style={{flex:'1 1 220px'}}><StatCard icon={Icon.Megaphone} label="إعلانات جديدة" value="2" sub="آخرها: جدول الاختبارات" onClick={()=>nav('announcements')}/></div>
      </div>

      <div className="row gap-5 wrap items-start">
        <div className="card grow" style={{flex:'2 1 480px'}}>
          <div className="section-head"><h2>جدول اليوم</h2><button className="btn link" onClick={()=>nav('timetable')}>عرض الجدول الكامل</button></div>
          <div className="col gap-2">
            {D.periods.map((p,i) => (
              <React.Fragment key={i}>
                {i === 4 && (
                  <div className="break-chip">
                    <span className="num">{D.breakPeriod.from} – {D.breakPeriod.to}</span>
                    <span>{D.breakPeriod.label}</span>
                  </div>
                )}
                <div style={{display:'flex', alignItems:'center', gap:12, padding:'10px 12px', borderRadius:8, background: i===1?'var(--accent-900)':'transparent'}}>
                  <div className="num" style={{width:104, fontSize:13, fontWeight:600, color:'var(--text-secondary)', display:'inline-flex', alignItems:'center', gap:6, direction:'ltr'}}>
                    <span>{p.time}</span>
                    <span style={{opacity:0.4, fontWeight:400}}>│</span>
                    <span>{p.end}</span>
                  </div>
                  <div style={{width:28, height:28, borderRadius:6, background: i===1?'var(--accent-500)':'var(--bg-surface-3)', color: i===1?'var(--text-inverse)':'var(--text-secondary)', display:'grid', placeItems:'center', fontSize:12, fontWeight:700, fontFamily:'Inter'}}>{p.n}</div>
                  <div className="col grow" style={{gap:2}}>
                    <div style={{fontSize:14, fontWeight:500}}>{todayPeriods[i].s}</div>
                    <div style={{fontSize:12, color:'var(--text-tertiary)'}}>{todayPeriods[i].t}</div>
                  </div>
                  {i===1 && <Pill kind="accent">الآن</Pill>}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="card grow" style={{flex:'1 1 320px'}}>
          <div className="section-head"><h2>الواجبات القادمة</h2></div>
          <div className="col gap-3">
            {[
              {t:'الواجب الثالث - بحث في مفهوم التوحيد', c:'التربية الإسلامية 1', d:'بعد 3 أيام', warn:true},
              {t:'واجب الكيمياء - تقرير التجربة', c:'الكيمياء', d:'بعد 5 أيام', warn:false},
              {t:'واجب اللغة الإنجليزية - Essay', c:'اللغة الإنجليزية', d:'بعد 7 أيام', warn:false},
            ].map((a,i) => (
              <div key={i} className="col gap-1" style={{padding:14, borderRadius:8, background:'var(--bg-surface-2)', border:'1px solid var(--border-subtle)'}}>
                <div style={{fontSize:14, fontWeight:600, lineHeight:1.45}}>{a.t}</div>
                <div className="row between items-center">
                  <div style={{fontSize:12, color:'var(--text-tertiary)'}}>{a.c}</div>
                  <div style={{fontSize:12, color: a.warn?'var(--warning-500)':'var(--text-secondary)'}}>{a.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-head"><h2>آخر الإعلانات</h2><button className="btn link" onClick={()=>nav('announcements')}>عرض الكل</button></div>
        <div className="col gap-3">
          {D.announcements.filter(a=>a.scope!=='teachers-only').slice(0,3).map((a,i) => (
            <div key={i} className="row gap-3 items-start" style={{padding:'12px 0', borderTop: i>0?'1px solid var(--border-subtle)':'none'}}>
              <span className={'ann-ico '+a.color} style={{width:32, height:32}}><IconByName name={a.icon} size={16}/></span>
              <div className="col grow" style={{gap:2}}>
                <div className="row between items-start gap-3">
                  <div style={{fontSize:14, fontWeight:600}}>{a.title}</div>
                  <div style={{fontSize:12, color:'var(--text-tertiary)', whiteSpace:'nowrap'}}>{a.ago}</div>
                </div>
                <div style={{fontSize:13, color:'var(--text-secondary)', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'} as React.CSSProperties}>{a.body}</div>
                <div style={{fontSize:12, color:'var(--text-tertiary)'}}>{a.from}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StudentCourses({ nav, setCourseId }: SBag) {
  return (
    <div className="col gap-5">
      <div className="page-header">
        <div><h1 className="page-title">موادي الدراسية</h1><p className="page-sub">الفصل الدراسي الثاني · 1447–1448هـ · 11 مادة</p></div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:16}}>
        {D.courses11A.map((c,i) => {
          const Ico = icoFor(c.icon);
          const band = c.avg>=90?'high':c.avg>=80?'mid-high':c.avg>=70?'mid':'low';
          return (
            <div key={i} className="card clickable" onClick={()=>{setCourseId(c.id); nav('course');}}>
              <div className="row between items-start gap-3">
                <div className="row gap-3 items-center">
                  <div style={{width:40, height:40, borderRadius:10, background:'var(--bg-surface-3)', color:'var(--primary-300)', display:'grid', placeItems:'center'}}><Ico size={20}/></div>
                  <div className="col" style={{gap:2}}>
                    <h3 style={{margin:0, fontSize:16, fontWeight:600}}>{c.name}</h3>
                    <div style={{fontSize:12, color:'var(--text-tertiary)'}}>{c.teacher}</div>
                  </div>
                </div>
                <Pill kind="accent"><span className={'num band-'+band} style={{fontWeight:700}}>{c.avg}%</span></Pill>
              </div>
              <div className="muqarnas-div"/>
              <div className="row between items-center">
                <span style={{fontSize:12, color:'var(--text-tertiary)'}}>آخر درجة: <span className="num" style={{color:'var(--text-secondary)'}}>{c.recent}</span></span>
                <span style={{fontSize:12, color:'var(--text-tertiary)'}}>نشاط منذ يومين</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StudentCourseWorkspace({ nav, courseId, setLessonN, setAssignmentN }: SBag) {
  const [tab, setTab] = useState('lessons');
  const course = D.courses11A.find(c => c.id===courseId) || D.courses11A[0];
  const isHero = course.id === 'c1';
  const lessons = isHero ? D.lessons.filter(l => l.state==='published') : [];
  const assignments = isHero ? D.assignments : [];

  return (
    <div className="col gap-5">
      <Breadcrumbs items={[{label:'موادي', onClick:()=>nav('courses')},{label:course.name}]}/>
      <div className="page-header">
        <div>
          <h1 className="page-title">{course.name}</h1>
          <p className="page-sub">{course.teacher} · الصف الحادي عشر - الشعبة أ</p>
        </div>
        <Pill kind="accent">المعدل: <span className="num" style={{fontWeight:700, marginInlineStart:4}}>{course.avg}%</span></Pill>
      </div>

      <Tabs active={tab} onChange={setTab} tabs={[
        {key:'lessons', label:'الدروس', count: lessons.length || 7},
        {key:'assignments', label:'الواجبات', count: assignments.length || 4},
        {key:'grades', label:'درجاتي'},
        {key:'announcements', label:'الإعلانات'},
      ]}/>

      {tab==='lessons' && (isHero ? (
        <div className="col gap-2">
          {lessons.map(l => (
            <div key={l.n} className="lesson-row">
              <div className="lesson-num">{l.n}</div>
              <div className="col grow" style={{gap:2}}>
                <div style={{fontSize:15, fontWeight:600}}>{l.title}</div>
                <div className="row gap-3" style={{fontSize:12, color:'var(--text-tertiary)'}}>
                  <span>نُشر {l.publishedAgo}</span>
                  {l.attachments.length>0 && <span className="row gap-1 items-center"><Icon.Paperclip size={12}/> {l.attachments.length} مرفقات</span>}
                </div>
              </div>
              <button className="btn secondary sm" onClick={()=>{setLessonN(l.n); nav('lesson');}}>
                <Icon.Eye size={14}/>اطّلع
              </button>
            </div>
          ))}
        </div>
      ) : <EmptyState title="قريباً" body="ستظهر دروس هذه المادة هنا عند نشرها من قبل المعلم."/>)}

      {tab==='assignments' && (isHero ? (
        <div className="col gap-3">
          {assignments.map(a => (
            <div key={a.n} className="asn-row">
              <div style={{width:44, height:44, borderRadius:10, background:'var(--bg-surface-3)', color:'var(--primary-300)', display:'grid', placeItems:'center'}}><Icon.ClipboardList size={20}/></div>
              <div className="col grow" style={{gap:4}}>
                <div style={{fontSize:15, fontWeight:600}}>{a.title}</div>
                <div className="row gap-3" style={{fontSize:12, color:'var(--text-tertiary)'}}>
                  <span>{a.deadlineText}</span>
                  <span>الدرجة القصوى: <span className="num">{a.max}</span></span>
                  {a.state==='graded' && <span>درجتك: <span className="num" style={{color:'var(--success-500)'}}>{a.myGrade}/{a.max} ({a.myPct}%)</span></span>}
                </div>
              </div>
              {a.state==='graded' && <Pill kind="graded"><Icon.Check size={12}/>تم التصحيح</Pill>}
              {a.state==='open' && <><Pill kind="published">مفتوح</Pill><button className="btn primary sm" onClick={()=>{setAssignmentN(a.n); nav('assignment');}}><Icon.Upload size={14}/>رفع الواجب</button></>}
              {a.state==='upcoming' && <Pill kind="pending">قادم</Pill>}
            </div>
          ))}
        </div>
      ) : <EmptyState title="لا توجد واجبات حالياً" body="عند إنشاء واجب في هذه المادة سيظهر هنا."/>)}

      {tab==='grades' && (
        <div className="card">
          <div className="section-head"><h2>درجاتك في {course.name}</h2></div>
          <table className="tbl">
            <thead><tr><th>الواجب</th><th>الدرجة</th><th>النسبة</th><th>الحالة</th></tr></thead>
            <tbody>
              {isHero ? [
                {t:'الواجب الأول - تعريف العقيدة', g:'18/20', p:90},
                {t:'الواجب الثاني - مقال توحيد الربوبية', g:'23/25', p:92},
              ].map((r,i) => (
                <tr key={i}><td>{r.t}</td><td><span className="num">{r.g}</span></td><td><span className="num band-high" style={{fontWeight:600}}>{r.p}%</span></td><td><Pill kind="graded">تم التصحيح</Pill></td></tr>
              )) : (<tr><td colSpan={4} style={{padding:24, color:'var(--text-tertiary)'}}>لا توجد درجات حتى الآن.</td></tr>)}
            </tbody>
          </table>
        </div>
      )}

      {tab==='announcements' && (
        <div className="col gap-3">
          {D.announcements.filter(a => a.courseName?.includes(course.name)).map((a,i) => (
            <div key={i} className="ann-card">
              <span className={'ann-ico '+a.color}><IconByName name={a.icon} size={18}/></span>
              <div className="col grow">
                <div className="row between items-center"><div style={{fontSize:15, fontWeight:600}}>{a.title}</div><div style={{fontSize:12, color:'var(--text-tertiary)'}}>{a.ago}</div></div>
                <div style={{fontSize:13, color:'var(--text-secondary)', marginTop:6, lineHeight:1.7}}>{a.body}</div>
                <div style={{fontSize:12, color:'var(--text-tertiary)', marginTop:8}}>{a.from}</div>
              </div>
            </div>
          ))}
          {D.announcements.filter(a => a.courseName?.includes(course.name)).length===0 && <EmptyState title="لا توجد إعلانات" body="لم يُنشر أي إعلان في هذه المادة بعد."/>}
        </div>
      )}
    </div>
  );
}

export function LessonViewer({ nav, lessonN }: SBag) {
  const l = D.lessons.find(x => x.n===lessonN) || D.lessons[4];
  const others = D.lessons.filter(x => x.state==='published' && x.n !== l.n).slice(0, 6);
  return (
    <div className="col gap-5">
      <Breadcrumbs items={[
        {label:'موادي', onClick:()=>nav('courses')},
        {label:'التربية الإسلامية 1', onClick:()=>nav('course')},
        {label:`الدرس ${l.n} - ${l.title}`}
      ]}/>
      <div className="row gap-5 items-start wrap">
        <div className="col gap-5 grow" style={{flex:'2 1 520px'}}>
          <div className="page-header" style={{marginBottom:0}}>
            <div>
              <div className="row gap-2 items-center mb-2"><Pill kind="published">منشور</Pill><span style={{fontSize:12, color:'var(--text-tertiary)'}}>الدرس <span className="num">{l.n}</span> من <span className="num">12</span> · نُشر {l.publishedAgo}</span></div>
              <h1 className="page-title">{l.title}</h1>
            </div>
            <button className="btn ghost sm" onClick={()=>nav('course')}><Icon.ArrowRight size={14}/>رجوع</button>
          </div>

          <div className="card">
            <div className="col gap-4">
              <p className="t-body-lg" style={{margin:0}}>نواقض الإيمان هي الأمور التي تُخرج الإنسان من الإسلام أو تُنقص إيمانه. وقد عني علماء العقيدة بضبط هذه النواقض وبيانها حفاظاً على المسلم من الزلل، ورحمةً به أن يقع في ما يُخرجه من الإسلام وهو لا يشعر.</p>
              <p className="t-body-lg" style={{margin:0}}>وأعظم النواقض: الشرك بالله تعالى، وهو اتخاذ نِدٍّ لله في عبادته أو ربوبيته أو أسمائه وصفاته. قال تعالى: ﴿إِنَّ اللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَاءُ﴾.</p>
              <p className="t-body-lg" style={{margin:0}}>ومن نواقض الإيمان: التكذيب بشيء مما جاء به النبي ﷺ مع العلم، والاستهزاء بالدين أو شيء من شعائره، ومحبة ما أبغض الله ورسوله. ومن أهم ما على الطالب: أن يعرف هذه النواقض لا ليقع فيها، بل ليجتنبها ويُحذِّر منها.</p>
            </div>
          </div>

          <div className="card">
            <div className="section-head"><h2>المرفقات</h2></div>
            <div className="col gap-2">
              {l.attachments.map((att, i) => (
                <div key={i} className="file-chip">
                  <span className="file-ico" style={att.type==='link'?{background:'var(--info-900)', color:'var(--info-500)'}:{}}>
                    {att.type==='link'?<Icon.Link size={18}/>:<Icon.FileText size={18}/>}
                  </span>
                  <div className="col grow" style={{gap:2}}>
                    <div style={{fontSize:14, fontWeight:500}} className={att.type==='link'?'':'latin'}>{att.name||'ملف نصي'}</div>
                    {att.size && <div style={{fontSize:12, color:'var(--text-tertiary)'}}><span className="num">{att.size}</span></div>}
                    {att.type==='link' && <div style={{fontSize:12, color:'var(--text-tertiary)'}} className="latin">youtube.com</div>}
                  </div>
                  {att.type==='link' ? <button className="btn secondary sm">افتح الرابط</button> : <>
                    <button className="btn secondary sm"><Icon.Download size={14}/>تحميل</button>
                    <button className="btn primary sm"><Icon.Eye size={14}/>عرض</button>
                  </>}
                </div>
              ))}
            </div>
          </div>

          <div className="pdf-preview">
            <Icon.FileText size={40}/>
            <div style={{fontSize:14}}>معاينة الملف: <span className="latin">{l.attachments[0]?.name||'الملف'}</span></div>
            <div style={{fontSize:12, color:'var(--text-tertiary)'}}>اضغط «عرض» في المرفقات أعلاه لتصفح الملف داخل المتصفح</div>
          </div>
        </div>

        <aside className="card" style={{flex:'1 1 280px', position:'sticky', top:84}}>
          <div className="section-head"><h2>دروس أخرى في المادة</h2></div>
          <div className="col gap-2">
            {others.map(o => (
              <button key={o.n} className="lesson-row" style={{textAlign:'start', background:'none', border:'none', color:'inherit', width:'100%', cursor:'pointer', fontFamily:'inherit'}}>
                <div className="lesson-num">{o.n}</div>
                <div className="col grow"><div style={{fontSize:13, fontWeight:500}}>{o.title}</div><div style={{fontSize:11, color:'var(--text-tertiary)'}}>{o.publishedAgo}</div></div>
                <Icon.ChevronLeft size={14}/>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export function AssignmentSubmission({ nav, assignmentN }: SBag) {
  const a = D.assignments.find(x => x.n===assignmentN) || D.assignments[2];
  const [file, setFile] = useState<{name:string;size:string}|null>(null);
  const [submitted, setSubmitted] = useState(a.state === 'graded');
  const isGraded = a.state === 'graded';
  const t = useToast();

  return (
    <div className="col gap-5">
      <Breadcrumbs items={[
        {label:'موادي', onClick:()=>nav('courses')},
        {label:'التربية الإسلامية 1', onClick:()=>nav('course')},
        {label:a.title}
      ]}/>
      <div className="page-header" style={{marginBottom:0}}>
        <div>
          <div className="row gap-2 items-center mb-2">
            {submitted ? (isGraded ? <Pill kind="graded"><Icon.Check size={12}/>تم التصحيح</Pill> : <Pill kind="submitted"><Icon.Check size={12}/>تم التسليم</Pill>) : <Pill kind="published">مفتوح</Pill>}
            <span style={{fontSize:12, color:'var(--text-tertiary)'}}>الواجب <span className="num">{a.n}</span> · الدرجة القصوى <span className="num">{a.max}</span></span>
          </div>
          <h1 className="page-title">{a.title}</h1>
        </div>
        {!submitted && <span className="countdown"><Icon.Clock size={14}/>باقي <span className="num">2 يومان و 14 ساعة</span></span>}
      </div>

      <div className="row gap-5 items-start wrap">
        <div className="col gap-4 grow" style={{flex:'2 1 520px'}}>
          <div className="card">
            <h3 style={{margin:'0 0 8px', fontSize:16, fontWeight:600}}>التعليمات</h3>
            <p className="t-body" style={{color:'var(--text-primary)', lineHeight:1.9, margin:0}}>{a.instructions || 'اكتب بحثاً علمياً موجزاً وفق التوجيهات المُرفقة.'}</p>
            <div className="muqarnas-div"/>
            <div className="col gap-2">
              {a.conditions && <div className="row gap-2 items-start"><div style={{fontSize:13, color:'var(--text-secondary)', minWidth:100}}>الشروط</div><div style={{fontSize:13}}>{a.conditions}</div></div>}
              {a.deadlineAbs && <div className="row gap-2 items-start"><div style={{fontSize:13, color:'var(--text-secondary)', minWidth:100}}>آخر موعد</div><div style={{fontSize:13, fontWeight:500}}>{a.deadlineAbs}</div></div>}
              <div className="row gap-2 items-start"><div style={{fontSize:13, color:'var(--text-secondary)', minWidth:100}}>الدرجة القصوى</div><div style={{fontSize:13, fontWeight:500}} className="num">{a.max} درجة</div></div>
            </div>
          </div>

          {!submitted ? (
            <div className="card">
              <h3 style={{margin:'0 0 12px', fontSize:16, fontWeight:600}}>رفع الواجب</h3>
              {!file ? (
                <label className="dropzone" htmlFor="file-input">
                  <Icon.Upload size={28}/>
                  <div style={{fontSize:15, fontWeight:500, color:'var(--text-primary)'}}>اسحب الملف هنا أو اضغط للتصفح</div>
                  <div style={{fontSize:13}}>PDF فقط · الحد الأقصى <span className="num">10 MB</span></div>
                  <input id="file-input" type="file" style={{display:'none'}} onChange={()=>setFile({name:'بحث_التوحيد_أحمد_الكندي.pdf', size:'3.7 MB'})}/>
                </label>
              ) : (
                <div className="col gap-3">
                  <div className="file-chip">
                    <span className="file-ico"><Icon.FileText size={18}/></span>
                    <div className="col grow" style={{gap:2}}><div className="latin" style={{fontSize:14, fontWeight:500}}>{file.name}</div><div style={{fontSize:12, color:'var(--text-tertiary)'}}><span className="num">{file.size}</span></div></div>
                    <button className="arq-iconbtn sm" onClick={()=>setFile(null)}><Icon.X size={16}/></button>
                  </div>
                  <button className="btn primary lg block" onClick={()=>{setSubmitted(true); t.showToast('تم رفع الواجب بنجاح.');}}>
                    <Icon.Upload size={18}/>رفع الواجب
                  </button>
                  <div style={{fontSize:12, color:'var(--text-tertiary)', textAlign:'center'}}>برفعك هذا الواجب فإنك تُقرّ بأن المحتوى من عملك الخاص.</div>
                </div>
              )}
            </div>
          ) : (
            <div className="card">
              <div className="row gap-3 items-center mb-3">
                <span className="ann-ico primary"><Icon.CheckCircle size={18}/></span>
                <div className="col" style={{gap:2}}><div style={{fontSize:15, fontWeight:600}}>سُلِّم يوم الثلاثاء 12 ربيع الأول 1447هـ</div><div style={{fontSize:12, color:'var(--text-tertiary)'}}>الساعة <span className="num">10:42</span> مساءً - قبل الموعد النهائي</div></div>
              </div>
              <div className="file-chip">
                <span className="file-ico"><Icon.FileText size={18}/></span>
                <div className="col grow" style={{gap:2}}><div className="latin" style={{fontSize:14, fontWeight:500}}>بحث_التوحيد_أحمد_الكندي.pdf</div><div style={{fontSize:12, color:'var(--text-tertiary)'}}><span className="num">3.7 MB</span></div></div>
                <button className="btn secondary sm"><Icon.Eye size={14}/>عرض</button>
              </div>
              {isGraded ? (
                <div className="feedback-card mt-4">
                  <div className="row between items-center mb-3">
                    <div style={{fontSize:13, color:'var(--primary-300)'}}>درجتك</div>
                    <div className="row gap-3 items-end"><div className="num" style={{fontSize:32, fontWeight:700, color:'var(--primary-100)'}}>23</div><div className="num" style={{color:'var(--primary-300)', fontSize:15}}>/ 25</div><Pill kind="graded"><span className="num">92%</span></Pill></div>
                  </div>
                  <div style={{fontSize:13, color:'var(--primary-100)', opacity:0.9, marginBottom:8, fontWeight:500}}>ملاحظة المعلم</div>
                  <p style={{margin:0, color:'var(--text-primary)', lineHeight:1.9, fontSize:15}}>بحث جيد يا أحمد. التسلسل المنطقي واضح والاستشهادات القرآنية ملائمة. أتمنى في المرة القادمة أن تتوسع أكثر في الجانب التطبيقي للعقيدة في حياة المسلم اليومية.</p>
                </div>
              ) : (
                <div className="mt-4" style={{padding:16, background:'var(--bg-surface-2)', borderRadius:10, fontSize:14, color:'var(--text-secondary)', textAlign:'center'}}>
                  <Icon.Clock size={16} style={{verticalAlign:'middle', marginInlineEnd:6}}/>بانتظار تصحيح المعلم
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="col gap-3" style={{flex:'1 1 260px'}}>
          <div className="card">
            <h3 style={{margin:'0 0 12px', fontSize:14, fontWeight:600}}>دروس مرتبطة</h3>
            <div className="col gap-2">
              {[2,3,4].map(n => (
                <div key={n} className="row gap-2 items-center" style={{padding:8, borderRadius:6, background:'var(--bg-surface-2)'}}>
                  <div className="lesson-num" style={{width:24, height:24, fontSize:11}}>{n}</div>
                  <div style={{fontSize:13}}>{D.lessons[n-1].title}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="row gap-2 items-center mb-2" style={{color:'var(--primary-300)'}}>
              <Icon.Sparkles size={16}/><div style={{fontSize:14, fontWeight:600}}>نصيحة</div>
            </div>
            <p style={{margin:0, fontSize:13, color:'var(--text-secondary)', lineHeight:1.7}}>راجع الدروس المنشورة عن أقسام التوحيد قبل البدء بالبحث. اذكر مصادرك بعناية.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function StudentGrades() {
  const [expanded, setExpanded] = useState(-1);
  const scoreOf30 = (pct: number) => Math.round(pct * 30 / 100);
  const totalScore = D.studentGrades.reduce((sum, g) => sum + scoreOf30(g.pct), 0);
  const maxTotal = D.studentGrades.length * 30;
  const courseIconMap = Object.fromEntries(D.courses11A.map(c => [c.name, c.icon]));

  return (
    <div className="col gap-5">
      <div className="page-header">
        <div>
          <h1 className="page-title">درجاتي</h1>
          <p className="page-sub">الفصل الدراسي الثاني · 1447–1448هـ</p>
        </div>
        <button className="btn secondary"><Icon.Download size={14}/>تصدير PDF</button>
      </div>

      {/* Hero summary — editorial split with decorative gold corner */}
      <div className="card" style={{
        padding:'32px 36px',
        background:'linear-gradient(225deg, rgba(42,157,147,0.07) 0%, rgba(212,175,55,0.04) 50%, var(--bg-surface-1) 100%)',
        border:'1px solid rgba(212,175,55,0.14)',
        position:'relative',
        overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', insetInlineStart:-40, top:-40,
          width:180, height:180, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
          pointerEvents:'none',
        }}/>
        <div className="row between items-center wrap gap-5" style={{position:'relative'}}>
          <div className="col" style={{gap:6}}>
            <div style={{fontSize:11, color:'var(--text-tertiary)', fontWeight:600, letterSpacing:'0.1em'}}>مجموع درجات المعلم</div>
            <div style={{display:'flex', alignItems:'baseline', gap:6, direction:'ltr'}}>
              <span className="num" style={{fontSize:58, fontWeight:700, lineHeight:1, fontFamily:'var(--font-heading)', color:'var(--text-primary)'}}>{totalScore}</span>
              <span className="num" style={{fontSize:26, color:'var(--text-tertiary)', fontWeight:400}}>/ {maxTotal}</span>
            </div>
            <div style={{fontSize:13, color:'var(--text-secondary)'}}>
              عبر <span className="num" style={{color:'var(--text-primary)', fontWeight:600}}>{D.studentGrades.length}</span> مواد دراسية
            </div>
          </div>

          {/* Progress ring on the left — percentage of total */}
          <div className="col center" style={{gap:8}}>
            <ProgressRing pct={Math.round(totalScore/maxTotal*100)} size={104} stroke={7} color="var(--accent-500)"/>
            <div style={{fontSize:11, color:'var(--text-tertiary)', fontWeight:600, letterSpacing:'0.08em'}}>النسبة المئوية</div>
          </div>
        </div>
      </div>

      {/* Section header */}
      <div className="row between items-center" style={{padding:'0 4px'}}>
        <h2 style={{margin:0, fontSize:16, fontWeight:600}}>تفاصيل المواد</h2>
        <span style={{fontSize:12, color:'var(--text-tertiary)'}}>اضغط على أي مادة لعرض التفاصيل</span>
      </div>

      <div className="card" style={{padding:0, overflow:'hidden'}}>
        {D.studentGrades.map((g, i) => {
          const score = scoreOf30(g.pct);
          const pctFill = (score / 30) * 100;
          const iconName = courseIconMap[g.course] || 'book-open';
          const Ico = icoFor(iconName);
          const isLast = i === D.studentGrades.length - 1;
          const isOpen = expanded === i;

          return (
            <div key={i} style={{borderBottom: !isLast ? '1px solid var(--border-subtle)' : 'none'}}>
              <button
                onClick={()=>setExpanded(isOpen ? -1 : i)}
                style={{
                  width:'100%', display:'flex', alignItems:'center', gap:16,
                  padding:'18px 22px',
                  background: isOpen ? 'var(--bg-surface-2)' : 'transparent',
                  border:'none', color:'inherit', cursor:'pointer',
                  textAlign:'start', fontFamily:'inherit',
                  position:'relative',
                  transition:'background var(--motion-fast)',
                }}>
                {/* Course icon */}
                <div style={{
                  width:44, height:44, borderRadius:11,
                  background:'var(--bg-surface-3)', color:'var(--primary-300)',
                  border:'1px solid var(--border-subtle)',
                  display:'grid', placeItems:'center', flexShrink:0,
                }}>
                  <Ico size={20}/>
                </div>
                {/* Course meta */}
                <div className="col grow" style={{gap:3, minWidth:0}}>
                  <div style={{fontSize:15, fontWeight:600}}>{g.course}</div>
                  <div style={{fontSize:12, color:'var(--text-tertiary)'}}>آخر درجة صادرة</div>
                </div>
                {/* Score */}
                <div className="num" style={{
                  fontFamily:'var(--font-heading)', fontSize:24, fontWeight:700,
                  color:'var(--text-primary)', lineHeight:1,
                }}>
                  {score}
                  <span style={{fontSize:13, color:'var(--text-tertiary)', fontWeight:400, marginInlineStart:2}}>/ 30</span>
                </div>
                {/* Chevron */}
                <Icon.ChevronDown size={16} style={{
                  color:'var(--text-tertiary)',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition:'transform 220ms cubic-bezier(0.25,0,0,1)',
                  flexShrink:0,
                }}/>
                {/* Subtle progress track at bottom of row */}
                <div style={{
                  position:'absolute', bottom:0, insetInlineStart:0, insetInlineEnd:0,
                  height:2, background:'rgba(42,157,147,0.06)', pointerEvents:'none',
                }}>
                  <div style={{
                    height:'100%', width:pctFill+'%',
                    background:'linear-gradient(to left, var(--primary-500), var(--primary-300))',
                    opacity:0.55,
                    transition:'width 700ms cubic-bezier(0.25,0,0,1)',
                  }}/>
                </div>
              </button>
              {isOpen && (
                <div style={{padding:'22px 26px', background:'var(--bg-base)'}}>
                  {i===0 ? (
                    <div className="col gap-4">
                      <div className="row gap-3 items-center wrap">
                        <div style={{fontSize:13, color:'var(--text-tertiary)', fontWeight:500}}>آخر واجب مُصحَّح:</div>
                        <div style={{fontSize:14, fontWeight:600}}>الواجب الثاني — مقال عن توحيد الربوبية</div>
                        <div className="num" style={{fontWeight:700, fontSize:14}}>23/25</div>
                        <Pill kind="graded">تم التصحيح</Pill>
                      </div>
                      <div className="feedback-card" style={{padding:18}}>
                        <div className="row gap-2 items-center" style={{marginBottom:10}}>
                          <Icon.Sparkles size={14} style={{color:'var(--primary-300)'}}/>
                          <span style={{fontSize:12, color:'var(--primary-300)', fontWeight:600}}>ملاحظة من الأستاذ أحمد الحارثي</span>
                        </div>
                        <p style={{margin:0, fontSize:14, lineHeight:1.9, color:'var(--text-primary)'}}>
                          بحث جيد يا أحمد. التسلسل المنطقي واضح والاستشهادات القرآنية ملائمة. أتمنى في المرة القادمة أن تتوسع أكثر في الجانب التطبيقي للعقيدة في حياة المسلم اليومية.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="row between items-center wrap gap-3" style={{fontSize:13, color:'var(--text-secondary)'}}>
                      <span>آخر درجة صادرة: <span className="num" style={{color:'var(--text-primary)', fontWeight:600, marginInlineStart:4}}>{score}/30</span></span>
                      <span style={{color:'var(--text-tertiary)', fontSize:12}}>لم يُصدَر تفصيل الواجبات بعد</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StudentAnnouncements() {
  const visible = D.announcements.filter(a => a.scope !== 'teachers-only');
  return (
    <div className="col gap-5">
      <div className="page-header">
        <div><h1 className="page-title">الإعلانات</h1><p className="page-sub">{visible.length} إعلانات · <span className="num">2</span> غير مقروءة</p></div>
      </div>
      <div className="col gap-3">
        {visible.map((a,i) => (
          <div key={i} className="ann-card" style={{borderColor: a.unread?'color-mix(in oklab, var(--primary-500) 30%, transparent)':'var(--border-subtle)'}}>
            <span className={'ann-ico '+a.color}><IconByName name={a.icon} size={18}/></span>
            <div className="col grow">
              <div className="row between items-start gap-3">
                <div className="col" style={{gap:2}}>
                  <div className="row gap-2 items-center">
                    <div style={{fontSize:15, fontWeight:600}}>{a.title}</div>
                    {a.unread && <span style={{width:8, height:8, borderRadius:'50%', background:'var(--primary-500)'}}/>}
                  </div>
                  <div style={{fontSize:12, color:'var(--text-tertiary)'}}>{a.from}{a.courseName?<> · {a.courseName}</>:a.scope==='institution'?<> · معهد</>:null}</div>
                </div>
                <div style={{fontSize:12, color:'var(--text-tertiary)'}}>{a.ago}</div>
              </div>
              <p style={{margin:'10px 0 0', fontSize:14, color:'var(--text-primary)', lineHeight:1.8}}>{a.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimetableGrid({ heroOnly=false }: { heroOnly?: boolean }) {
  return (
    <div style={{overflow:'auto'}}>
      <table className="timetable">
        <thead>
          <tr>
            <th style={{width:108}}>الحصة</th>
            {D.days.map(d => <th key={d}>{d}</th>)}
          </tr>
        </thead>
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
                {D.days.map((d) => {
                  const cell = D.timetable11A[D.days.indexOf(d)][pi];
                  const render = heroOnly && !cell.hero ? {s:'خارج التدريس', t:'', k:'flex', hero:false, now:false} : cell;
                  return (
                    <td key={d}>
                      <div className={'tt-cell' + (render.hero?' hero':'') + (render.k==='flex'?' flex':'') + (render.now?' now':'')}>
                        <div className="subj">{render.s}</div>
                        {render.t && <div className="teach">{render.t}</div>}
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
  );
}

export function StudentTimetable() {
  return (
    <div className="col gap-5">
      <div className="page-header">
        <div><h1 className="page-title">الجدول الأسبوعي</h1><p className="page-sub">الصف الحادي عشر - الشعبة أ · الأسبوع الحالي</p></div>
        <div className="row gap-2">
          <button className="arq-iconbtn" aria-label="الأسبوع السابق"><Icon.ChevronLeft size={16}/></button>
          <button className="btn secondary sm">هذا الأسبوع</button>
          <button className="arq-iconbtn" aria-label="الأسبوع التالي"><Icon.ChevronRight size={16}/></button>
        </div>
      </div>
      <TimetableGrid/>
    </div>
  );
}

export function StudentProfile() {
  const u = D.cast.student;
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">الملف الشخصي</h1><p className="page-sub">معلوماتك وتفضيلاتك</p></div></div>
      <div className="row gap-5 items-start wrap">
        <div className="card" style={{flex:'1 1 280px'}}>
          <div className="col center gap-3" style={{padding:'8px 0 16px'}}>
            <div className="avatar xl" style={{background:'var(--primary-900)', color:'var(--primary-300)'}}>أ</div>
            <div className="col center" style={{gap:2}}>
              <div style={{fontSize:17, fontWeight:700}}>{u.name}</div>
              <div style={{fontSize:13, color:'var(--text-secondary)'}}>الصف الحادي عشر - الشعبة أ</div>
            </div>
          </div>
          <div className="muqarnas-div"/>
          <div className="col gap-3" style={{fontSize:13}}>
            <div className="row between"><span style={{color:'var(--text-tertiary)'}}>البريد</span><span className="latin" style={{color:'var(--text-secondary)'}}>{u.email}</span></div>
            <div className="row between"><span style={{color:'var(--text-tertiary)'}}>الرقم الأكاديمي</span><span className="num" style={{color:'var(--text-secondary)'}}>11A-0012</span></div>
            <div className="row between"><span style={{color:'var(--text-tertiary)'}}>العام الدراسي</span><span>1447–1448هـ</span></div>
          </div>
        </div>
        <div className="col gap-5 grow" style={{flex:'2 1 480px'}}>
          <div className="card">
            <h3 style={{margin:'0 0 16px', fontSize:16}}>التفضيلات</h3>
            <div className="col gap-4">
              <div className="field"><label>اللغة</label><select className="select"><option>العربية</option><option>English</option></select></div>
              <div className="field"><label>إشعارات البريد الإلكتروني</label>
                <div className="col gap-2" style={{fontSize:14}}>
                  <label className="row gap-2 items-center"><input type="checkbox" defaultChecked/><span>عند نشر درس أو واجب جديد</span></label>
                  <label className="row gap-2 items-center"><input type="checkbox" defaultChecked/><span>عند إصدار درجاتي</span></label>
                  <label className="row gap-2 items-center"><input type="checkbox"/><span>الإعلانات العامة</span></label>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 style={{margin:'0 0 16px', fontSize:16}}>تغيير كلمة المرور</h3>
            <div className="col gap-3">
              <div className="field"><label>كلمة المرور الحالية</label><input type="password" className="input"/></div>
              <div className="field"><label>كلمة المرور الجديدة</label><input type="password" className="input"/></div>
              <div className="field"><label>تأكيد كلمة المرور</label><input type="password" className="input"/></div>
              <div className="row end"><button className="btn primary">حفظ</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StudentAssignmentsAgg({ nav, setAssignmentN }: SBag) {
  const rows = [
    { n:3, title:'الواجب الثالث - بحث في مفهوم التوحيد', c:'التربية الإسلامية 1', deadline:'بعد 3 أيام', state:'open' },
    { n:0, title:'واجب الكيمياء - تقرير التجربة', c:'الكيمياء', deadline:'بعد 5 أيام', state:'open' },
    { n:0, title:'واجب اللغة الإنجليزية - Essay', c:'اللغة الإنجليزية', deadline:'بعد 7 أيام', state:'open' },
    { n:0, title:'واجب الفيزياء', c:'الفيزياء', deadline:'بعد 10 أيام', state:'upcoming' },
    { n:2, title:'الواجب الثاني - مقال توحيد الربوبية', c:'التربية الإسلامية 1', deadline:'منتهي', state:'graded', g:'23/25' },
    { n:1, title:'الواجب الأول - تعريف العقيدة', c:'التربية الإسلامية 1', deadline:'منتهي', state:'graded', g:'18/20' },
  ];
  const [filter, setFilter] = useState('all');
  const filtered = filter==='all' ? rows : rows.filter(r => r.state===filter);
  return (
    <div className="col gap-5">
      <div className="page-header">
        <div><h1 className="page-title">الواجبات</h1><p className="page-sub">جميع واجباتك عبر 11 مادة</p></div>
      </div>
      <div className="row gap-2 wrap">
        {[['all','الكل',rows.length],['open','مفتوح',3],['upcoming','قادم',1],['graded','تم التصحيح',2]].map(([k,l,c]) => (
          <button key={k} className={'tab-chip'+(filter===k?' active':'')} onClick={()=>setFilter(String(k))}>{l} · <span className="num">{c}</span></button>
        ))}
      </div>
      <div className="col gap-2">
        {filtered.map((a,i) => (
          <div key={i} className="asn-row">
            <div style={{width:40, height:40, borderRadius:10, background:'var(--bg-surface-3)', color:'var(--primary-300)', display:'grid', placeItems:'center'}}><Icon.ClipboardList size={18}/></div>
            <div className="col grow" style={{gap:3}}>
              <div style={{fontSize:15, fontWeight:600}}>{a.title}</div>
              <div className="row gap-3" style={{fontSize:12, color:'var(--text-tertiary)'}}><span>{a.c}</span><span>·</span><span>{a.deadline}</span></div>
            </div>
            {'g' in a && a.g && <div className="num" style={{fontWeight:700, color:'var(--success-500)'}}>{a.g}</div>}
            {a.state==='open' && <><Pill kind="published">مفتوح</Pill>{a.n===3 && <button className="btn primary sm" onClick={()=>{setAssignmentN(3); nav('assignment');}}>رفع الواجب</button>}</>}
            {a.state==='upcoming' && <Pill kind="pending">قادم</Pill>}
            {a.state==='graded' && <Pill kind="graded">تم التصحيح</Pill>}
          </div>
        ))}
      </div>
    </div>
  );
}

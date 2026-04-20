import React, { useState } from 'react';
import { ArqamData as D } from '../data/arqam';
import { Icon } from './Icons';
import { Pill, StatCard, Breadcrumbs, Modal, ConfirmDialog } from './Shell';
import { useToast } from '../context';
import type { ScreenBag } from '../context';

type ABag = ScreenBag;

export function AdminHome({ nav }: ABag) {
  return (
    <div className="col gap-5">
      <div className="page-header">
        <div><h1 className="page-title">لوحة الإدارة</h1><p className="page-sub">{D.institution.name} · {D.institution.year}</p></div>
      </div>
      <div className="row gap-4 wrap">
        <div style={{flex:'1 1 200px'}}><StatCard icon={Icon.School} label="إجمالي الطلاب" value="384" sub="22 شعبة"/></div>
        <div style={{flex:'1 1 200px'}}><StatCard icon={Icon.User} label="المعلمون" value="42" sub="11 مواد دراسية"/></div>
        <div style={{flex:'1 1 200px'}}><StatCard icon={Icon.Users} label="المشرفون" value="6" sub="حسب المواد"/></div>
        <div style={{flex:'1 1 200px'}}><StatCard icon={Icon.Grid} label="الشعب" value="22" sub="الصفوف 10–12"/></div>
      </div>
      <div className="row gap-5 wrap items-start">
        <div className="card grow" style={{flex:'2 1 520px'}}>
          <div className="section-head"><h2>إجراءات سريعة</h2></div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:12}}>
            {[
              {i:Icon.Plus,      l:'إضافة مستخدم',  k:'users'},
              {i:Icon.Grid,      l:'إنشاء شعبة',     k:'grades'},
              {i:Icon.BookOpen,  l:'إنشاء مادة',     k:'subjects'},
              {i:Icon.Link,      l:'إسناد معلم',     k:'assignments'},
              {i:Icon.Calendar,  l:'تعديل الجدول',   k:'timetable'},
              {i:Icon.Megaphone, l:'إعلان عام',      k:'announce-compose'},
            ].map((q,i) => (
              <button key={i} className="quick-action" onClick={()=>nav(q.k)}>
                <span className="stat-ico"><q.i size={18}/></span>
                <span style={{fontSize:14, fontWeight:500}}>{q.l}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="card" style={{flex:'1 1 320px'}}>
          <div className="section-head"><h2>النشاط الأخير</h2></div>
          <div className="col gap-3">
            {[
              {w:'أ. أحمد الحارثي',    a:'نشر درس جديد في 11أ',         t:'قبل ساعة'},
              {w:'أ. حسن البلوشي',    a:'أضاف ملاحظة خاصة',             t:'قبل 3 ساعات'},
              {w:'أنت',               a:'أنشأت مستخدم: سالم الفارسي',    t:'أمس'},
              {w:'أ. سليمان الشبلي', a:'نشر إعلاناً لشعبة 12ب',        t:'أمس'},
            ].map((it,i) => (
              <div key={i} className="row gap-3 items-start" style={{paddingTop:i>0?12:0, borderTop:i>0?'1px solid var(--border-subtle)':'none'}}>
                <div className="avatar sm">{it.w[it.w.length-1]}</div>
                <div className="col grow"><div style={{fontSize:13}}><b>{it.w}</b> {it.a}</div><div style={{fontSize:11, color:'var(--text-tertiary)'}}>{it.t}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminSettings() {
  const t = useToast();
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">إعدادات المعهد</h1></div></div>
      <div className="row gap-5 wrap items-start">
        <div className="card grow" style={{flex:'2 1 520px'}}>
          <h3 style={{margin:'0 0 16px'}}>الهوية</h3>
          <div className="col gap-4">
            <div className="field"><label>اسم المعهد</label><input className="input" defaultValue="معهد مسقط للعلوم الإسلامية"/></div>
            <div className="field"><label>الاسم المختصر</label><input className="input" defaultValue="م.م.ع.إ"/></div>
            <div className="field"><label>العنوان</label><input className="input" defaultValue="شارع السلام، مسقط، سلطنة عُمان"/></div>
            <div className="field"><label>بريد التواصل</label><input className="input latin" defaultValue="info@arqam.edu.om"/></div>
            <div className="field"><label>الشعار</label><button className="btn secondary"><Icon.Upload size={14}/>تحميل شعار</button></div>
          </div>
        </div>
        <div className="card" style={{flex:'1 1 320px'}}>
          <h3 style={{margin:'0 0 16px'}}>العام الدراسي</h3>
          <div className="col gap-4">
            <div className="field"><label>العام الهجري</label><input className="input num" defaultValue="1447–1448هـ"/></div>
            <div className="field"><label>العام الميلادي</label><input className="input num" defaultValue="2025–2026م"/></div>
            <div className="field"><label>الفصل الحالي</label><select className="select"><option>الفصل الدراسي الأول</option><option selected>الفصل الدراسي الثاني</option></select></div>
            <div className="field"><label>بداية الفصل</label><input className="input" defaultValue="1 ربيع الأول 1447هـ"/></div>
            <div className="field"><label>نهاية الفصل</label><input className="input" defaultValue="30 جمادى الآخرة 1447هـ"/></div>
          </div>
        </div>
      </div>
      <div className="row end gap-2">
        <button className="btn secondary">إلغاء التغييرات</button>
        <button className="btn primary" onClick={()=>t.showToast('حُفظت الإعدادات.')}><Icon.Save size={14}/>حفظ الإعدادات</button>
      </div>
    </div>
  );
}

export function AdminGrades({ nav }: ABag) {
  const sections = [
    {g:'الصف 10', secs:[{n:'10أ',s:22,t:'أ. سالم المعمري'},{n:'10ب',s:22,t:'أ. سالم المعمري'}]},
    {g:'الصف 11', secs:[{n:'11أ',s:22,t:'أ. أحمد الحارثي'},{n:'11ب',s:22,t:'أ. أحمد الحارثي'}]},
    {g:'الصف 12', secs:[{n:'12أ',s:22,t:'أ. سليمان الشبلي'},{n:'12ب',s:22,t:'أ. سليمان الشبلي'}]},
  ];
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">الصفوف والشعب</h1><p className="page-sub">3 صفوف · 22 شعبة · 384 طالب</p></div><button className="btn primary"><Icon.Plus size={14}/>إضافة شعبة</button></div>
      <div className="col gap-4">
        {sections.map((g,i) => (
          <div key={i} className="card">
            <div className="row between items-center mb-3"><h3 style={{margin:0}}>{g.g}</h3><span style={{fontSize:12, color:'var(--text-tertiary)'}}>{g.secs.length} شعب</span></div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:12}}>
              {g.secs.map((s,j) => (
                <div key={j} className="card clickable" style={{padding:14, background:'var(--bg-surface-2)'}} onClick={()=>nav('enrollment')}>
                  <div className="row between items-center">
                    <div className="col"><div style={{fontSize:16, fontWeight:700}}>{s.n}</div><div style={{fontSize:12, color:'var(--text-tertiary)'}}>{s.t}</div></div>
                    <div className="col end"><div className="num" style={{fontSize:18, fontWeight:700}}>{s.s}</div><div style={{fontSize:11, color:'var(--text-tertiary)'}}>طالب</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminEnrollment({ nav }: ABag) {
  const avail = [
    {n:'خميس بن ناصر اللواتي',      e:'khamees.lawati@arqam.edu.om',  i:'خ'},
    {n:'حمود بن سعيد الهنائي',       e:'hamood.hinai@arqam.edu.om',     i:'ح'},
    {n:'يعقوب بن عادل البوسعيدي',    e:'yaqoub.busaidi@arqam.edu.om',   i:'ي'},
  ];
  return (
    <div className="col gap-5">
      <Breadcrumbs items={[{label:'الصفوف والشعب', onClick:()=>nav('grades')},{label:'الصف 11أ — التسجيلات'}]}/>
      <div className="page-header"><div><h1 className="page-title">إدارة التسجيلات — الصف 11أ</h1><p className="page-sub"><span className="num">22</span>/24 طالب — <span className="num">2</span> مقاعد شاغرة</p></div></div>
      <div className="row gap-5 items-start">
        <div className="card grow" style={{flex:'3 1 0'}}>
          <div className="section-head"><h2>الطلاب المسجّلون</h2><button className="btn secondary sm"><Icon.Download size={14}/>تصدير قائمة</button></div>
          <table className="tbl">
            <thead><tr><th>#</th><th>الطالب</th><th>البريد</th><th>تاريخ التسجيل</th><th></th></tr></thead>
            <tbody>
              {D.roster11A.slice(0,8).map((s,i) => (
                <tr key={s.id}>
                  <td className="num">{i+1}</td>
                  <td className="row gap-2 items-center"><div className="avatar sm">{s.initial}</div><span>{s.short}</span></td>
                  <td className="latin" style={{fontSize:12, color:'var(--text-secondary)'}}>{s.short.split(' ').join('.').toLowerCase()}@arqam.edu.om</td>
                  <td className="latin num" style={{fontSize:12, color:'var(--text-tertiary)'}}>2025-09-01</td>
                  <td><button className="btn ghost sm" style={{color:'var(--danger-500)'}}>إزالة</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card" style={{flex:'2 1 0'}}>
          <div className="section-head"><h2>إضافة طالب</h2></div>
          <div className="field"><label>ابحث عن طالب…</label><div style={{position:'relative'}}><Icon.Search size={14} style={{position:'absolute', insetInlineStart:10, top:10, color:'var(--text-tertiary)'}}/><input className="input" style={{paddingInlineStart:32}} placeholder="اسم أو بريد إلكتروني…"/></div></div>
          <div className="col gap-2 mt-3">
            <div style={{fontSize:12, color:'var(--text-tertiary)'}}>طلاب غير مسجّلين في الصف 11:</div>
            {avail.map((a,i) => (
              <div key={i} className="file-chip">
                <div className="avatar sm">{a.i}</div>
                <div className="col grow"><div style={{fontSize:14, fontWeight:500}}>{a.n}</div><div className="latin" style={{fontSize:11, color:'var(--text-tertiary)'}}>{a.e}</div></div>
                <button className="btn primary sm"><Icon.Plus size={12}/>إضافة</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminSubjects() {
  const subj = [
    {n:'التربية الإسلامية 1', g:'10, 11, 12', s:6, t:3},
    {n:'التربية الإسلامية 2', g:'11, 12',     s:4, t:2},
    {n:'اللغة العربية 1',     g:'10, 11, 12', s:6, t:3},
    {n:'اللغة العربية 2',     g:'11, 12',     s:4, t:2},
    {n:'اللغة الإنجليزية',    g:'10, 11, 12', s:6, t:3},
    {n:'الرياضيات البحتة',    g:'10, 11, 12', s:6, t:2},
    {n:'الفيزياء',            g:'11, 12',     s:4, t:2},
    {n:'الكيمياء',            g:'11, 12',     s:4, t:2},
    {n:'الأحياء',             g:'11, 12',     s:4, t:2},
    {n:'الدراسات الاجتماعية', g:'10, 11, 12', s:6, t:2},
    {n:'التوجيه المهني',      g:'11, 12',     s:4, t:1},
  ];
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">المواد الدراسية</h1><p className="page-sub"><span className="num">11</span> مادة — كتالوج المعهد</p></div><button className="btn primary"><Icon.Plus size={14}/>إضافة مادة</button></div>
      <div className="card">
        <table className="tbl">
          <thead><tr><th>المادة</th><th>الصفوف</th><th>الشعب</th><th>المعلمون</th><th></th></tr></thead>
          <tbody>
            {subj.map((s,i) => (
              <tr key={i}>
                <td><div className="row gap-2 items-center"><span className="stat-ico"><Icon.BookOpen size={14}/></span><b>{s.n}</b></div></td>
                <td className="num">{s.g}</td>
                <td className="num">{s.s}</td>
                <td className="num">{s.t}</td>
                <td><button className="arq-iconbtn sm" aria-label="تعديل المادة"><Icon.Edit size={14}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminUsers({ nav }: ABag) {
  const [role, setRole] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const roleMap: Record<string,string> = {student:'طالب', teacher:'معلم', supervisor:'مشرف', admin:'إداري'};
  const filtered = role==='all' ? D.userList : D.userList.filter(u => u.role === roleMap[role]);
  return (
    <div className="col gap-5">
      <div className="page-header">
        <div><h1 className="page-title">المستخدمون</h1><p className="page-sub">إجمالي <span className="num">{D.userList.length+420}</span> مستخدم</p></div>
        <button className="btn primary" onClick={()=>setShowCreate(true)}><Icon.Plus size={14}/>مستخدم جديد</button>
      </div>
      <div className="row between wrap gap-3">
        <div className="row gap-2">
          {[['all','الكل'],['student','طلاب'],['teacher','معلمون'],['supervisor','مشرفون'],['admin','إداريون']].map(([k,l]) => (
            <button key={k} className={'tab-chip'+(role===k?' active':'')} onClick={()=>setRole(k)}>{l}</button>
          ))}
        </div>
        <div className="row gap-2">
          <div style={{position:'relative'}}><Icon.Search size={14} style={{position:'absolute', insetInlineStart:10, top:9, color:'var(--text-tertiary)'}}/><input className="input" style={{paddingInlineStart:32, height:36, width:240}} placeholder="ابحث بالاسم أو البريد…"/></div>
          <button className="btn secondary sm"><Icon.Download size={14}/>تصدير</button>
        </div>
      </div>
      <div className="card" style={{padding:0, overflow:'hidden'}}>
        <table className="tbl">
          <thead><tr><th>الاسم</th><th>الدور</th><th>البريد</th><th>تاريخ الإنشاء</th><th>آخر دخول</th><th></th></tr></thead>
          <tbody>
            {filtered.map((u,i) => (
              <tr key={i}>
                <td><div className="row gap-2 items-center"><div className="avatar sm">{u.name.split(' ').pop()![0]}</div><span>{u.name}</span></div></td>
                <td><Pill kind="pending">{u.role}</Pill></td>
                <td className="latin" style={{fontSize:12, color:'var(--text-secondary)'}}>{u.email}</td>
                <td className="latin num" style={{fontSize:12, color:'var(--text-tertiary)'}}>{u.created}</td>
                <td style={{fontSize:12, color:'var(--text-tertiary)'}}>{u.lastLogin}</td>
                <td className="row gap-1">
                  <button className="arq-iconbtn sm" aria-label="تعديل المستخدم"><Icon.Edit size={14}/></button>
                  <button className="arq-iconbtn sm" aria-label="خيارات إضافية"><Icon.MoreVertical size={14}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showCreate && <CreateUserModal onClose={()=>setShowCreate(false)}/>}
    </div>
  );
}

function CreateUserModal({ onClose }: { onClose: ()=>void }) {
  const t = useToast();
  const [role, setRole] = useState('student');
  return (
    <Modal title="إنشاء مستخدم جديد" onClose={onClose} width={620}
      footer={<>
        <button className="btn secondary" onClick={onClose}>إلغاء</button>
        <button className="btn primary" onClick={()=>{t.showToast('تم إنشاء المستخدم. تم إرسال بيانات الدخول للبريد.'); onClose();}}>إنشاء وإرسال الدعوة</button>
      </>}>
      <div className="col gap-4">
        <div className="field">
          <label>الدور</label>
          <div className="row gap-2">
            {[['student','طالب'],['teacher','معلم'],['supervisor','مشرف']].map(([k,l]) => (
              <label key={k} className={'role-pick'+(role===k?' active':'')} onClick={()=>setRole(k)}>
                <input type="radio" name="role" checked={role===k} onChange={()=>{}} readOnly/>
                <span>{l}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="row gap-3">
          <div className="field grow"><label>الاسم الكامل</label><input className="input" placeholder="مثال: أحمد بن سالم الكندي"/></div>
          <div className="field grow"><label>الاسم المختصر</label><input className="input" placeholder="مثال: أحمد الكندي"/></div>
        </div>
        <div className="field"><label>البريد الإلكتروني</label><input className="input latin" placeholder="name@arqam.edu.om"/></div>
        {role==='student' && (
          <div className="row gap-3">
            <div className="field grow"><label>الصف</label><select className="select"><option>الصف 10</option><option>الصف 11</option><option>الصف 12</option></select></div>
            <div className="field grow"><label>الشعبة</label><select className="select"><option>الشعبة أ</option><option>الشعبة ب</option></select></div>
          </div>
        )}
        {role==='teacher' && (
          <div className="field"><label>المواد التي يُدرّسها</label>
            <div className="row gap-2 wrap">
              {['التربية الإسلامية 1','التربية الإسلامية 2','اللغة العربية 1','الرياضيات البحتة'].map((m,i)=>(
                <label key={i} className="row gap-2 items-center" style={{padding:'6px 10px', background:'var(--bg-surface-2)', borderRadius:6, fontSize:13}}>
                  <input type="checkbox"/><span>{m}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        {role==='supervisor' && (
          <div className="field"><label>نطاق الإشراف</label><input className="input" placeholder="مثال: التربية الإسلامية — الصفوف 10، 11، 12"/></div>
        )}
        <div className="field"><label>كلمة المرور</label>
          <div className="col gap-2">
            <label className="row gap-2 items-center" style={{fontSize:13}}><input type="radio" name="pw" defaultChecked/><span>توليد كلمة مرور عشوائية وإرسالها للبريد</span></label>
            <label className="row gap-2 items-center" style={{fontSize:13}}><input type="radio" name="pw"/><span>تعيين كلمة مرور يدوياً</span></label>
          </div>
        </div>
        <div className="row gap-2 items-center" style={{padding:12, background:'var(--primary-900)', borderRadius:8, fontSize:13, color:'var(--text-secondary)'}}>
          <Icon.Mail size={16} style={{color:'var(--primary-300)'}}/>
          <span>سيتلقّى المستخدم بريداً بتفاصيل الدخول ورابط تفعيل الحساب.</span>
        </div>
      </div>
    </Modal>
  );
}

export function AdminAssignments() {
  const list = [
    {t:'أ. أحمد الحارثي',       s:'التربية الإسلامية 1', sec:'11أ، 11ب'},
    {t:'أ. أحمد الحارثي',       s:'التربية الإسلامية 2', sec:'11أ، 11ب'},
    {t:'أ. خالد السيابي',       s:'اللغة العربية 1',      sec:'11أ'},
    {t:'أ. سعيد الهنائي',       s:'اللغة العربية 2',      sec:'11أ'},
    {t:'أ. فيصل الزعابي',       s:'الرياضيات البحتة',    sec:'11أ'},
    {t:'أ. يوسف المعمري',       s:'اللغة الإنجليزية',    sec:'11أ'},
    {t:'أ. طارق المحرزي',       s:'الكيمياء',             sec:'11أ'},
    {t:'أ. مازن الفارسي',        s:'الفيزياء',             sec:'11أ'},
    {t:'أ. عبدالعزيز الخليلي',  s:'الأحياء',              sec:'11أ'},
    {t:'أ. سليمان الشبلي',       s:'التربية الإسلامية 1', sec:'12أ، 12ب'},
  ];
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">إسناد المعلمين للمواد</h1><p className="page-sub">ربط كل معلم بالمواد والشعب التي يُدرّسها</p></div><button className="btn primary"><Icon.Plus size={14}/>إسناد جديد</button></div>
      <div className="card">
        <table className="tbl">
          <thead><tr><th>المعلم</th><th>المادة</th><th>الشعب</th><th></th></tr></thead>
          <tbody>
            {list.map((a,i) => (
              <tr key={i}>
                <td className="row gap-2 items-center"><div className="avatar sm">{a.t.split(' ')[1][0]}</div><span>{a.t}</span></td>
                <td>{a.s}</td>
                <td>{a.sec}</td>
                <td><button className="btn ghost sm">تعديل</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminSupervisors() {
  const list = [
    {n:'أ. حسن البلوشي',     scope:'التربية الإسلامية — الصفوف 10، 11، 12',       t:3, s:132},
    {n:'أ. محمد الشكيلي',    scope:'اللغة العربية — الصفوف 10، 11، 12',           t:3, s:132},
    {n:'أ. خليل الجابري',    scope:'الرياضيات والفيزياء — الصف 12',                t:2, s:44},
    {n:'أ. راشد السعدي',     scope:'اللغة الإنجليزية — الصفوف 10، 11، 12',       t:3, s:132},
    {n:'أ. نايف السليماني',  scope:'الكيمياء والأحياء — الصفوف 11، 12',           t:2, s:88},
    {n:'أ. محسن الفارسي',    scope:'الدراسات الاجتماعية والتوجيه المهني',          t:2, s:88},
  ];
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">نطاقات الإشراف</h1><p className="page-sub">ربط المشرفين بالمواد والصفوف</p></div><button className="btn primary"><Icon.Plus size={14}/>مشرف جديد</button></div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(340px, 1fr))', gap:16}}>
        {list.map((s,i) => (
          <div key={i} className="card">
            <div className="row gap-3 items-start">
              <div className="avatar lg">{s.n.split(' ')[1][0]}</div>
              <div className="col grow"><div style={{fontSize:15, fontWeight:600}}>{s.n}</div><div style={{fontSize:12, color:'var(--text-secondary)', lineHeight:1.6}}>{s.scope}</div></div>
            </div>
            <div className="muqarnas-div"/>
            <div className="row between" style={{fontSize:13}}>
              <span>معلمون: <span className="num" style={{fontWeight:700}}>{s.t}</span></span>
              <span>طلاب: <span className="num" style={{fontWeight:700}}>{s.s}</span></span>
              <button className="btn ghost sm">تعديل النطاق</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminTimetable() {
  const t = useToast();
  return (
    <div className="col gap-5">
      <div className="page-header">
        <div><h1 className="page-title">الجدول الأسبوعي</h1><p className="page-sub">الصف 11أ · الفصل الدراسي الثاني</p></div>
        <div className="row gap-2">
          <select className="select" style={{height:36}}><option>الصف 11أ</option><option>الصف 11ب</option></select>
          <button className="btn primary" onClick={()=>t.showToast('حُفظ الجدول.')}><Icon.Save size={14}/>حفظ</button>
        </div>
      </div>
      <div style={{overflow:'auto'}}>
        <table className="timetable">
          <thead><tr><th style={{width:80}}>الحصة</th>{D.days.map(d => <th key={d}>{d}</th>)}</tr></thead>
          <tbody>
            {D.periods.map((p, pi) => (
              <tr key={p.n}>
                <td className="period-h"><div className="col" style={{gap:2}}><div className="num" style={{fontWeight:700}}>{p.n}</div><div style={{fontSize:11, color:'var(--text-tertiary)'}} className="num">{p.time}</div></div></td>
                {D.days.map((d, di) => {
                  const cell = D.timetable11A[di][pi];
                  return (
                    <td key={d}>
                      <div className={'tt-cell editable' + (cell.hero?' hero':'') + (cell.k==='flex'?' flex':'')}>
                        <div className="subj">{cell.s}</div>
                        <div className="teach">{cell.t}</div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminAnnouncements({ nav }: ABag) {
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">الإعلانات العامة</h1><p className="page-sub">إعلانات إدارة المعهد</p></div><button className="btn primary" onClick={()=>nav('announce-compose')}><Icon.Plus size={14}/>إعلان جديد</button></div>
      <div className="col gap-3">
        {D.announcements.filter(a=>a.role==='admin').map((a,i) => (
          <div key={i} className="ann-card">
            <span className={'ann-ico '+a.color}><Icon.Megaphone size={18}/></span>
            <div className="col grow">
              <div className="row between items-center"><div style={{fontSize:15, fontWeight:600}}>{a.title}</div><div style={{fontSize:12, color:'var(--text-tertiary)'}}>{a.ago}</div></div>
              <p style={{margin:'6px 0 8px', fontSize:14, color:'var(--text-secondary)', lineHeight:1.8}}>{a.body}</p>
              <div className="row gap-3" style={{fontSize:12, color:'var(--text-tertiary)'}}>
                <span>المعهد كله</span><span>·</span><span>وصل <span className="num">384</span> طالب + <span className="num">42</span> معلم</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminProfile() {
  const u = D.cast.admin;
  const t = useToast();
  return (
    <div className="col gap-5">
      <div className="page-header"><div><h1 className="page-title">ملفي الشخصي</h1></div></div>

      <div className="row gap-5 items-start wrap">

        {/* Identity card */}
        <div className="card" style={{flex:'1 1 260px'}}>
          <div className="col center gap-4" style={{padding:'12px 0 20px'}}>
            <div className="avatar xl" style={{fontSize:28}}>س</div>
            <div className="col center gap-1">
              <div style={{fontSize:17, fontWeight:700}}>{u.name}</div>
              <div style={{fontSize:13, color:'var(--text-secondary)'}}>{D.institution.name}</div>
              <span className="pill graded" style={{marginTop:4}}>إدارة كاملة</span>
            </div>
          </div>
          <div className="muqarnas-div"/>
          <div className="col gap-3" style={{fontSize:13}}>
            <div className="row between items-center">
              <span style={{color:'var(--text-tertiary)'}}>البريد</span>
              <span className="latin" style={{color:'var(--text-secondary)', fontSize:12}}>{u.email}</span>
            </div>
            <div className="row between items-center">
              <span style={{color:'var(--text-tertiary)'}}>الدور</span>
              <span>إداري</span>
            </div>
            <div className="row between items-center">
              <span style={{color:'var(--text-tertiary)'}}>المعهد</span>
              <span>م.م.ع.إ</span>
            </div>
          </div>
        </div>

        {/* Settings column */}
        <div className="col gap-4" style={{flex:'2 1 480px'}}>

          {/* Password section */}
          <div className="card">
            <div className="section-head"><h2>كلمة المرور</h2></div>
            <div className="col gap-3">
              <div className="field">
                <label>كلمة المرور الحالية</label>
                <input type="password" className="input" placeholder="••••••••"/>
              </div>
              <div className="row gap-3">
                <div className="field grow">
                  <label>كلمة المرور الجديدة</label>
                  <input type="password" className="input"/>
                </div>
                <div className="field grow">
                  <label>تأكيد كلمة المرور</label>
                  <input type="password" className="input"/>
                </div>
              </div>
              <div className="row end">
                <button className="btn primary" onClick={()=>t.showToast('تم تحديث كلمة المرور.')}>حفظ</button>
              </div>
            </div>
          </div>

          {/* Security settings */}
          <div className="card">
            <div className="section-head"><h2>الأمان</h2></div>
            <div className="col" style={{gap:0}}>
              {/* 2FA row */}
              <div className="row between items-center" style={{padding:'14px 0', borderBottom:'1px solid var(--border-subtle)'}}>
                <div className="col" style={{gap:3}}>
                  <div style={{fontSize:14, fontWeight:500}}>المصادقة الثنائية</div>
                  <div style={{fontSize:12, color:'var(--text-tertiary)'}}>طبقة حماية إضافية عند تسجيل الدخول</div>
                </div>
                <button className="btn secondary sm">تفعيل</button>
              </div>
              {/* Admin log row */}
              <div className="row between items-center" style={{padding:'14px 0'}}>
                <div className="col" style={{gap:3}}>
                  <div style={{fontSize:14, fontWeight:500}}>سجل العمليات الإدارية</div>
                  <div style={{fontSize:12, color:'var(--text-tertiary)'}}>عرض تاريخ جميع الإجراءات المنفَّذة على النظام</div>
                </div>
                <button className="btn ghost sm"><Icon.Eye size={14}/>عرض السجل</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { ArqamLogo, ArqamBrand } from './Shell';
import { Icon } from './Icons';
import type { Role } from '../context';

// ═══════════════════════════════════════════════════════════════
// ROTATING QUOTES - copy & paste new entries to add more.
// Each entry: { text: 'Arabic quote', source: 'Attribution' }
// ═══════════════════════════════════════════════════════════════
const QUOTES = [
  {
    text: '﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾',
    source: 'سورة طه، الآية 114',
  },
  {
    text: 'طلبُ العلمِ فريضةٌ على كلِّ مسلمٍ',
    source: 'رواه ابن ماجه',
  },
  {
    text: '﴿يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ﴾',
    source: 'سورة المجادلة، الآية 11',
  },
  {
    text: 'مَن سَلَكَ طريقًا يلتمسُ فيهِ علمًا سهَّلَ اللهُ له به طريقًا إلى الجنَّةِ',
    source: 'رواه مسلم',
  },
  {
    text: '﴿اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ﴾',
    source: 'سورة العلق، الآية 1',
  },
  {
    text: 'خيرُكم مَن تعلَّمَ القرآنَ وعلَّمَهُ',
    source: 'رواه البخاري',
  },
  {
    text: '﴿إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ﴾',
    source: 'سورة فاطر، الآية 28',
  },
  {
    text: 'مَن يُرِدِ اللهُ بهِ خيرًا يُفَقِّهْهُ في الدِّينِ',
    source: 'متفق عليه',
  },
  {
    text: 'العلمُ إمامُ العملِ، والعملُ تابعُهُ',
    source: 'معاذ بن جبل رضي الله عنه',
  },
  {
    text: 'تعلَّموا العلمَ فإنَّ تعلُّمَهُ للهِ خشيةٌ، وطلبَهُ عبادةٌ، ومذاكرتَهُ تسبيحٌ',
    source: 'معاذ بن جبل رضي الله عنه',
  },
];

const roles = [
  { k: 'student',    l: 'طالب',         e: 'ahmed.kindi@arqam.edu.om'    },
  { k: 'teacher',    l: 'معلم',         e: 'ahmed.harithi@arqam.edu.om'  },
  { k: 'supervisor', l: 'مشرف',         e: 'hassan.balushi@arqam.edu.om' },
  { k: 'admin',      l: 'إداري',        e: 'said.ameri@arqam.edu.om'     },
  { k: 'dualAdmin',  l: 'إداري / مشرف', e: 'khaled.rahbi@arqam.edu.om'   },
];

export function LoginScreen({ onLogin }: { onLogin: (castKey: string) => void }) {
  const [castKey, setCastKey]   = useState('student');
  const [email, setEmail]       = useState('ahmed.kindi@arqam.edu.om');
  const [pwd, setPwd]           = useState('••••••••');
  const [showPwd, setShowPwd]   = useState(false);
  const [remember, setRemember] = useState(true);
  const [view, setView]         = useState<'login'|'forgot'|'sent'|'reset'|'success'>('login');
  const quote = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)], []);

  const chooseRole = (r: typeof roles[0]) => { setCastKey(r.k); setEmail(r.e); };

  if (view === 'forgot')  return <ForgotScreen  onBack={()=>setView('login')}  onSent={()=>setView('sent')}/>;
  if (view === 'sent')    return <SentScreen     onBack={()=>setView('login')}  onOpen={()=>setView('reset')}/>;
  if (view === 'reset')   return <ResetScreen    onDone={()=>setView('success')}/>;
  if (view === 'success') return <ResetDoneScreen onContinue={()=>setView('login')}/>;

  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="auth-brand-inner">
          <ArqamBrand size={72}/>

          {/* Divider */}
          <div style={{display:'flex', alignItems:'center', gap:14, width:260}}>
            <div style={{flex:1, height:1, background:'linear-gradient(to left, rgba(212,175,55,0.3), transparent)'}}/>
            <div style={{width:5, height:5, borderRadius:'50%', background:'#D4AF37', boxShadow:'0 0 6px rgba(212,175,55,0.6)'}}/>
            <div style={{flex:1, height:1, background:'linear-gradient(to right, rgba(212,175,55,0.3), transparent)'}}/>
          </div>

          {/* Rotating quote */}
          <div style={{maxWidth:300, textAlign:'center', display:'flex', flexDirection:'column', gap:10}}>
            <p style={{
              margin:0, lineHeight:1.85,
              fontFamily:'var(--font-heading)',
              fontSize: quote.text.length > 60 ? 15 : 17,
              color:'var(--text-primary)',
              fontWeight:500,
            }}>
              {quote.text}
            </p>
            <span style={{fontSize:12, color:'var(--text-tertiary)', fontStyle:'normal'}}>
              - {quote.source}
            </span>
          </div>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <div className="col gap-2 mb-5">
            <h2 className="t-h1" style={{margin:0}}>تسجيل الدخول</h2>
            <p className="t-body" style={{margin:0, color:'var(--text-secondary)'}}>أهلاً بك في أرقم. سجّل الدخول للمتابعة.</p>
          </div>

          <div className="col gap-4">
            <div className="field">
              <label>الدور</label>
              <div className="row gap-2 wrap">
                {roles.map(r => (
                  <button key={r.k} type="button"
                    className={'tab-chip' + (castKey===r.k?' active':'')}
                    onClick={()=>chooseRole(r)}>{r.l}</button>
                ))}
              </div>
              <span className="help">اختر دورك لعرض لوحة التحكم المناسبة (عرض تجريبي).</span>
            </div>

            <div className="field">
              <label htmlFor="email">البريد الإلكتروني</label>
              <div style={{position:'relative'}}>
                <Icon.Mail size={16} style={{position:'absolute', insetInlineStart:12, top:12, color:'var(--text-tertiary)'}}/>
                <input id="email" className="input latin" style={{paddingInlineStart:40}} value={email} onChange={e=>setEmail(e.target.value)}/>
              </div>
            </div>

            <div className="field">
              <label htmlFor="pwd">كلمة المرور</label>
              <div style={{position:'relative'}}>
                <Icon.Lock size={16} style={{position:'absolute', insetInlineStart:12, top:12, color:'var(--text-tertiary)'}}/>
                <input id="pwd" type={showPwd?'text':'password'} className="input"
                  style={{paddingInlineStart:40, paddingInlineEnd:40}}
                  value={pwd} onChange={e=>setPwd(e.target.value)}/>
                <button type="button" onClick={()=>setShowPwd(v=>!v)} className="arq-iconbtn sm"
                  style={{position:'absolute', insetInlineEnd:6, top:6}} aria-label="إظهار/إخفاء كلمة المرور">
                  {showPwd ? <Icon.EyeOff size={16}/> : <Icon.Eye size={16}/>}
                </button>
              </div>
            </div>

            <div className="row between items-center" style={{fontSize:13}}>
              <label className="row gap-2 items-center" style={{cursor:'pointer'}}>
                <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/>
                <span>تذكّرني</span>
              </label>
              <button type="button" className="btn link" onClick={()=>setView('forgot')}>نسيت كلمة المرور؟</button>
            </div>

            <button className="btn primary lg block" onClick={()=>onLogin(castKey)}>تسجيل الدخول</button>
          </div>

          <div className="muqarnas-div"/>
          <div className="col gap-2 center" style={{fontSize:12, color:'var(--text-tertiary)', textAlign:'center'}}>
            <span>للحصول على حساب، تواصل مع إدارة المعهد.</span>
            <span>© 1447هـ أرقم - المنصة الرقمية للمعاهد الإسلامية</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForgotScreen({ onBack, onSent }: { onBack: ()=>void; onSent: ()=>void }) {
  const [email, setEmail] = useState('ahmed.kindi@arqam.edu.om');
  return (
    <div className="auth-page">
      <div className="auth-brand"><div className="auth-brand-inner"><ArqamBrand size={64}/></div></div>
      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <button className="btn link mb-3" onClick={onBack}><Icon.ArrowRight size={14}/>رجوع إلى تسجيل الدخول</button>
          <h2 className="t-h1" style={{margin:'0 0 8px'}}>استعادة كلمة المرور</h2>
          <p className="t-body mb-5" style={{color:'var(--text-secondary)', margin:0}}>أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور.</p>
          <div className="col gap-4 mt-5">
            <div className="field">
              <label>البريد الإلكتروني</label>
              <input className="input latin" value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
            <button className="btn primary lg block" onClick={onSent}>إرسال رابط الاستعادة</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SentScreen({ onBack, onOpen }: { onBack: ()=>void; onOpen: ()=>void }) {
  return (
    <div className="auth-page">
      <div className="auth-brand"><div className="auth-brand-inner"><ArqamBrand size={64}/></div></div>
      <div className="auth-form-panel">
        <div className="auth-form-inner col center gap-4" style={{textAlign:'center'}}>
          <div style={{width:72,height:72,borderRadius:'50%',background:'var(--primary-900)',color:'var(--primary-300)',display:'grid',placeItems:'center'}}>
            <Icon.Mail size={32}/>
          </div>
          <h2 className="t-h1" style={{margin:0}}>تفقد بريدك الإلكتروني</h2>
          <p className="t-body" style={{color:'var(--text-secondary)',margin:0,maxWidth:360}}>
            أرسلنا رابط إعادة التعيين إلى{' '}
            <span className="latin" style={{color:'var(--text-primary)'}}>ahmed.kindi@arqam.edu.om</span>.
            {' '}يصلح الرابط لمدة ساعة واحدة.
          </p>
          <button className="btn secondary mt-3" onClick={onOpen}>محاكاة فتح الرابط</button>
          <button className="btn link" onClick={onBack}>رجوع إلى تسجيل الدخول</button>
        </div>
      </div>
    </div>
  );
}

function ResetScreen({ onDone }: { onDone: ()=>void }) {
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const strong = p1.length >= 8 && /[A-Z]/.test(p1) && /[0-9]/.test(p1);
  const match = p1 && p1 === p2;
  return (
    <div className="auth-page">
      <div className="auth-brand"><div className="auth-brand-inner"><ArqamBrand size={64}/></div></div>
      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <h2 className="t-h1" style={{margin:'0 0 8px'}}>كلمة مرور جديدة</h2>
          <p className="t-body mb-5" style={{color:'var(--text-secondary)',margin:0}}>اختر كلمة مرور قوية لا يقل طولها عن 8 أحرف وتحتوي على حرف كبير ورقم.</p>
          <div className="col gap-4 mt-5">
            <div className="field">
              <label>كلمة المرور الجديدة</label>
              <input type="password" className="input" value={p1} onChange={e=>setP1(e.target.value)}/>
              {p1 && <span className="help" style={{color:strong?'var(--success-500)':'var(--warning-500)'}}>
                {strong?'قوية':'اجعلها أقوى: ٨ أحرف على الأقل + حرف كبير + رقم'}
              </span>}
            </div>
            <div className="field">
              <label>تأكيد كلمة المرور</label>
              <input type="password" className="input" value={p2} onChange={e=>setP2(e.target.value)}/>
              {p2 && <span className="help" style={{color:match?'var(--success-500)':'var(--danger-500)'}}>
                {match?'مطابقة':'غير متطابقة'}
              </span>}
            </div>
            <button className="btn primary lg block" disabled={!strong || !match} onClick={onDone}>حفظ كلمة المرور الجديدة</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResetDoneScreen({ onContinue }: { onContinue: ()=>void }) {
  return (
    <div className="auth-page">
      <div className="auth-brand"><div className="auth-brand-inner"><ArqamBrand size={64}/></div></div>
      <div className="auth-form-panel">
        <div className="auth-form-inner col center gap-4" style={{textAlign:'center'}}>
          <div style={{width:72,height:72,borderRadius:'50%',background:'var(--success-900)',color:'var(--success-500)',display:'grid',placeItems:'center'}}>
            <Icon.CheckCircle size={36}/>
          </div>
          <h2 className="t-h1" style={{margin:0}}>تم تغيير كلمة المرور</h2>
          <p className="t-body" style={{color:'var(--text-secondary)',margin:0,maxWidth:360}}>يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.</p>
          <button className="btn primary lg mt-3" onClick={onContinue}>الذهاب إلى تسجيل الدخول</button>
        </div>
      </div>
    </div>
  );
}

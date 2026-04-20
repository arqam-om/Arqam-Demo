import React, { useState, useEffect, Fragment } from 'react';
import { Icon, IconByName } from './Icons';
import { ToastCtx, useToast } from '../context';
import type { AuthUser, NavItem } from '../context';

// ===== Logo =====
export function ArqamLogo({ size = 28 }: { size?: number }) {
  return (
    <div className="row gap-2 items-center">
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-label="شعار أرقم">
        <path d="M20 3 C 12 3, 6 9, 6 18 L 6 34 L 34 34 L 34 18 C 34 9, 28 3, 20 3 Z"
              stroke="#3EA89E" strokeWidth="2.2" fill="none"/>
        <path d="M12 20 L 20 16 L 28 20 L 28 30 L 20 28 L 12 30 Z" fill="#C9A961" opacity="0.95"/>
        <line x1="20" y1="16" x2="20" y2="28" stroke="#0A0F0F" strokeWidth="1.2"/>
      </svg>
      <span style={{fontSize:18, fontWeight:700, color:'var(--text-primary)'}}>أرقم</span>
    </div>
  );
}

// ===== Topbar =====
function Topbar({ user, onOpenNotifications, onOpenSearch, unread = 0, onLogout }: {
  user: AuthUser; onOpenNotifications: () => void; onOpenSearch: () => void;
  unread?: number; onLogout: () => void;
}) {
  return (
    <header className="arq-topbar">
      <div className="row gap-3 items-center">
        <ArqamLogo size={26} />
        <div style={{width:1,height:20,background:'var(--border-default)'}}/>
        <span style={{fontSize:14,color:'var(--text-primary)',fontWeight:500}}>معهد مسقط للعلوم الإسلامية</span>
      </div>
      <button className="arq-search-trigger" onClick={onOpenSearch} aria-label="البحث">
        <Icon.Search size={16}/>
        <span>ابحث في أرقم…</span>
        <span className="row gap-1" style={{marginInlineStart:'auto'}}>
          <kbd>Ctrl</kbd><kbd>K</kbd>
        </span>
      </button>
      <div className="row gap-2 items-center" style={{marginInlineStart:'auto'}}>
        <button className="arq-iconbtn" onClick={onOpenNotifications} aria-label="الإشعارات">
          <Icon.Bell size={18}/>
          {unread > 0 && <span className="arq-unread num">{unread}</span>}
        </button>
        <div className="arq-user">
          <div className="avatar md">{user.avatarInitial}</div>
          <div className="col" style={{gap:0}}>
            <span style={{fontSize:13,fontWeight:500,lineHeight:1.3}}>{user.shortName}</span>
            <span style={{fontSize:11,color:'var(--text-secondary)',lineHeight:1.3}}>{roleLabel(user.role)}</span>
          </div>
          <button className="arq-iconbtn sm" onClick={onLogout} aria-label="تسجيل الخروج" title="تسجيل الخروج">
            <Icon.Logout size={16}/>
          </button>
        </div>
      </div>
    </header>
  );
}

export function roleLabel(r: string) {
  return ({student:'طالب',teacher:'معلم',supervisor:'مشرف',admin:'إداري'} as Record<string,string>)[r] || '';
}

// ===== Sidebar =====
function Sidebar({ activeKey, onNav, items }: { activeKey: string; onNav: (k: string) => void; items: NavItem[] }) {
  return (
    <aside className="arq-sidebar" aria-label="التنقل الرئيسي">
      <nav>
        {items.map(it => (
          <button key={it.key}
            className={'sb-item' + (activeKey === it.key ? ' active' : '')}
            onClick={() => onNav(it.key)}>
            <span className="sb-icon"><it.icon size={18}/></span>
            <span className="sb-label">{it.label}</span>
            {it.badge ? <span className="sb-badge num">{it.badge}</span> : null}
          </button>
        ))}
      </nav>
      <div className="sb-footer">
        <div className="row gap-2 items-center sb-tagline">
          <Icon.StarOrnament size={16}/>
          <div>المنصة الرقمية للمدارس الإسلامية</div>
        </div>
      </div>
    </aside>
  );
}

// ===== Notifications Panel =====
function NotificationsPanel({ onClose, role }: { onClose: () => void; role: string }) {
  const [tab, setTab] = useState('all');
  const items =
    role === 'student' ? [
      { icon: Icon.Award,         color:'var(--primary-500)', title:'تم إصدار درجة الواجب الثاني — التربية الإسلامية 1',      ago:'قبل دقائق',  unread:true  },
      { icon: Icon.Megaphone,     color:'var(--info-500)',    title:'إعلان جديد من إدارة المعهد: جدول اختبارات منتصف الفصل', ago:'قبل ساعتين', unread:true  },
      { icon: Icon.BookOpen,      color:'var(--primary-500)', title:'تم نشر درس جديد: الصيام وأسراره الروحية',               ago:'قبل يوم',    unread:false },
      { icon: Icon.Bell,          color:'var(--accent-500)',  title:'الأستاذ أحمد الحارثي: تذكير بموعد تسليم بحث التوحيد',  ago:'قبل يوم',    unread:false },
      { icon: Icon.ClipboardList, color:'var(--primary-500)', title:'تم نشر واجب جديد: الواجب الثالث — بحث في مفهوم التوحيد', ago:'قبل 3 أيام', unread:false },
    ] : role === 'teacher' ? [
      { icon: Icon.Upload,   color:'var(--primary-500)', title:'أحمد الكندي قام برفع الواجب الثالث',              ago:'قبل ساعتين', unread:true  },
      { icon: Icon.Upload,   color:'var(--primary-500)', title:'سيف الخروصي قام برفع الواجب الثالث',             ago:'قبل 4 ساعات', unread:true  },
      { icon: Icon.Upload,   color:'var(--primary-500)', title:'يوسف المعمري قام برفع الواجب الثالث',            ago:'قبل 6 ساعات', unread:true  },
      { icon: Icon.Megaphone, color:'var(--info-500)',   title:'إعلان من الإدارة: جدول اختبارات منتصف الفصل',   ago:'قبل يومين',   unread:false },
    ] : role === 'supervisor' ? [
      { icon: Icon.AlertTriangle, color:'var(--warning-500)', title:'مؤشر: متوسط الصف 12أ في التربية الإسلامية أقل من الشعب الموازية', ago:'قبل يوم',   unread:true  },
      { icon: Icon.BarChart,      color:'var(--primary-500)', title:'تم إصدار درجات الواجب الثاني — الصف 11أ',                         ago:'قبل يومين', unread:false },
    ] : [
      { icon: Icon.User,      color:'var(--primary-500)', title:'طلب إعادة تعيين كلمة المرور — يوسف المعمري',  ago:'قبل 3 ساعات', unread:true  },
      { icon: Icon.Megaphone, color:'var(--info-500)',    title:'إعلانك "اجتماع أولياء الأمور" وصل 302 مستخدم', ago:'قبل 3 أيام',  unread:false },
    ];

  const filtered = tab === 'unread' ? items.filter(i => i.unread) : items;

  return (
    <>
      <div className="arq-overlay" onClick={onClose}/>
      <div className="arq-drawer" role="dialog" aria-label="الإشعارات">
        <div className="row between items-center" style={{padding:'16px 20px', borderBottom:'1px solid var(--border-subtle)'}}>
          <h2 className="t-h3" style={{margin:0}}>الإشعارات</h2>
          <div className="row gap-2">
            <button className="btn ghost sm">وضع الكل مقروءاً</button>
            <button className="arq-iconbtn sm" onClick={onClose} aria-label="إغلاق"><Icon.X size={16}/></button>
          </div>
        </div>
        <div className="row gap-1" style={{padding:'8px 20px', borderBottom:'1px solid var(--border-subtle)'}}>
          {[['all','الكل'],['unread','غير مقروء']].map(([k,l]) => (
            <button key={k} className={'tab-chip' + (tab===k?' active':'')} onClick={()=>setTab(k)}>{l}</button>
          ))}
        </div>
        <div className="col" style={{overflow:'auto', flex:1}}>
          {filtered.length === 0 ? (
            <div className="empty">
              <Icon.StarOrnament size={40}/>
              <h3>لا توجد إشعارات جديدة</h3>
              <p>سيظهر هنا أي نشاط يخصك.</p>
            </div>
          ) : filtered.map((n, i) => (
            <div key={i} className="notif-item">
              <span className="notif-ico" style={{color:n.color, background:`color-mix(in oklab, ${n.color} 15%, transparent)`}}>
                <n.icon size={16}/>
              </span>
              <div className="col grow" style={{gap:2}}>
                <div style={{fontSize:14, fontWeight:500}}>{n.title}</div>
                <div style={{fontSize:12, color:'var(--text-tertiary)'}}>{n.ago}</div>
              </div>
              {n.unread && <span style={{width:8,height:8,borderRadius:'50%',background:'var(--primary-500)'}}/>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ===== Global Search =====
function GlobalSearch({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('');
  const groups = [
    { label:'المواد', items:[
      { icon:Icon.BookOpen, title:'التربية الإسلامية 1 — الصف 11أ', sub:'الأستاذ أحمد الحارثي' },
      { icon:Icon.BookOpen, title:'اللغة العربية 1 — الصف 11أ',     sub:'الأستاذ خالد السيابي' },
    ]},
    { label:'الدروس', items:[
      { icon:Icon.FileText, title:'نواقض الإيمان',          sub:'التربية الإسلامية 1 — الدرس 5' },
      { icon:Icon.FileText, title:'أهمية الصلاة وأحكامها', sub:'التربية الإسلامية 1 — الدرس 6' },
    ]},
    { label:'الواجبات', items:[
      { icon:Icon.ClipboardList, title:'الواجب الثالث — بحث في مفهوم التوحيد', sub:'يُسلَّم بعد 3 أيام' },
    ]},
    { label:'الإعلانات', items:[
      { icon:Icon.Megaphone, title:'جدول اختبارات منتصف الفصل الدراسي الثاني', sub:'إدارة المعهد — قبل يومين' },
    ]},
  ];
  const _ = q; // prevent unused warning
  return (
    <>
      <div className="arq-overlay" onClick={onClose}/>
      <div className="arq-search-palette" role="dialog" aria-label="البحث العام">
        <div className="row gap-2 items-center" style={{padding:'12px 16px', borderBottom:'1px solid var(--border-subtle)'}}>
          <Icon.Search size={16}/>
          <input autoFocus className="arq-search-input" placeholder="ابحث في المواد، الدروس، الواجبات، الإعلانات…" value={q} onChange={e=>setQ(e.target.value)}/>
          <kbd>Esc</kbd>
        </div>
        <div style={{maxHeight:'50vh', overflow:'auto'}}>
          {groups.map((g, gi) => (
            <div key={gi}>
              <div className="search-group-label">{g.label}</div>
              {g.items.map((it,i) => (
                <button key={i} className="search-row" onClick={onClose}>
                  <span className="notif-ico"><it.icon size={14}/></span>
                  <div className="col grow items-start" style={{gap:0}}>
                    <span style={{fontSize:14}}>{it.title}</span>
                    <span style={{fontSize:12, color:'var(--text-tertiary)'}}>{it.sub}</span>
                  </div>
                  <Icon.ChevronLeft size={14}/>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="row gap-3" style={{padding:'10px 16px', borderTop:'1px solid var(--border-subtle)', fontSize:12, color:'var(--text-tertiary)'}}>
          <span><kbd>↑↓</kbd> تنقل</span>
          <span><kbd>↵</kbd> فتح</span>
          <span><kbd>Esc</kbd> إغلاق</span>
        </div>
      </div>
    </>
  );
}

// ===== Shell =====
export function Shell({ user, navItems, activeKey, onNav, onLogout, children }: {
  user: AuthUser; navItems: NavItem[]; activeKey: string;
  onNav: (k: string) => void; onLogout: () => void; children: React.ReactNode;
}) {
  const [showNotif, setShowNotif] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [toast, setToast] = useState<{msg:string;kind:string;id:number}|null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setShowSearch(true); }
      if (e.key === 'Escape') { setShowSearch(false); setShowNotif(false); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const ctx = {
    showToast: (msg: string, kind: 'success'|'error' = 'success') => {
      setToast({ msg, kind, id: Date.now() });
      setTimeout(() => setToast(null), 3500);
    }
  };

  const unread = user.role === 'student' ? 2 : user.role === 'teacher' ? 3 : 1;

  return (
    <ToastCtx.Provider value={ctx}>
      <div className="arq-shell">
        <Topbar user={user} onOpenNotifications={()=>setShowNotif(true)}
          onOpenSearch={()=>setShowSearch(true)} onLogout={onLogout} unread={unread}/>
        <div className="arq-body">
          <Sidebar activeKey={activeKey} onNav={onNav} items={navItems}/>
          <main className="arq-main">{children}</main>
        </div>
        {showNotif && <NotificationsPanel onClose={()=>setShowNotif(false)} role={user.role}/>}
        {showSearch && <GlobalSearch onClose={()=>setShowSearch(false)}/>}
        {toast && (
          <div className="toast-wrap">
            <div className={'toast' + (toast.kind==='error'?' error':'')}>
              {toast.kind === 'error' ? <Icon.AlertTriangle size={16}/> : <Icon.CheckCircle size={16}/>}
              <span>{toast.msg}</span>
            </div>
          </div>
        )}
      </div>
    </ToastCtx.Provider>
  );
}

// ===== Shared UI Components =====
export function Pill({ kind, children, dot=false }: { kind: string; children: React.ReactNode; dot?: boolean }) {
  return <span className={'pill ' + kind}>{dot && <span className="dot"/>}{children}</span>;
}

export function EmptyState({ title, body, action }: { title: string; body?: string; action?: React.ReactNode }) {
  return (
    <div className="empty">
      <Icon.StarOrnament size={48}/>
      <h3>{title}</h3>
      {body && <p>{body}</p>}
      {action}
    </div>
  );
}

export function StatCard({ icon: IconC, label, value, sub, onClick, accent }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: React.ComponentType<any>; label: string; value: string|number;
  sub?: string; onClick?: () => void; accent?: string;
}) {
  return (
    <div className={'card' + (onClick?' clickable':'')} onClick={onClick} style={{padding:20}}>
      <div className="row between items-start">
        <div className="col gap-1">
          <div style={{fontSize:13, color:'var(--text-secondary)', fontWeight:500}}>{label}</div>
          <div className="num" style={{fontSize:28, fontWeight:700, color: accent||'var(--text-primary)'}}>{value}</div>
          {sub && <div style={{fontSize:12, color:'var(--text-tertiary)'}}>{sub}</div>}
        </div>
        {IconC && <span className="stat-ico"><IconC size={18}/></span>}
      </div>
    </div>
  );
}

export function ProgressRing({ pct, size=80, stroke=6, color }: { pct:number; size?:number; stroke?:number; color?:string }) {
  const r = (size-stroke)/2;
  const c = 2*Math.PI*r;
  const col = color || (pct>=90?'var(--success-500)':pct>=80?'var(--accent-500)':pct>=70?'var(--warning-500)':'var(--danger-500)');
  return (
    <div className="ring-wrap" style={{width:size, height:size}}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} stroke="var(--border-subtle)" strokeWidth={stroke} fill="none"/>
        <circle cx={size/2} cy={size/2} r={r} stroke={col} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={c*(1-pct/100)} strokeLinecap="round"/>
      </svg>
      <span className="ring-val num" style={{fontSize:size*0.3, fontWeight:700}}>{pct}%</span>
    </div>
  );
}

export function Modal({ title, onClose, children, footer, width=520 }: {
  title: string; onClose: () => void; children: React.ReactNode;
  footer?: React.ReactNode; width?: number;
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);
  return (
    <>
      <div className="arq-overlay" onClick={onClose}/>
      <div className="arq-modal" style={{maxWidth:width}} role="dialog" aria-label={title}>
        <div className="row between items-center" style={{padding:'16px 20px', borderBottom:'1px solid var(--border-subtle)'}}>
          <h2 className="t-h3" style={{margin:0}}>{title}</h2>
          <button className="arq-iconbtn sm" onClick={onClose} aria-label="إغلاق"><Icon.X size={16}/></button>
        </div>
        <div style={{padding:20, maxHeight:'70vh', overflow:'auto'}}>{children}</div>
        {footer && <div className="row gap-2 end" style={{padding:'12px 20px', borderTop:'1px solid var(--border-subtle)'}}>{footer}</div>}
      </div>
    </>
  );
}

export function Tabs({ tabs, active, onChange }: {
  tabs: {key:string; label:string; count?:number}[]; active: string; onChange: (k:string) => void;
}) {
  return (
    <div className="arq-tabs" role="tablist">
      {tabs.map(t => (
        <button key={t.key} role="tab" aria-selected={active===t.key}
          className={'arq-tab' + (active===t.key?' active':'')} onClick={()=>onChange(t.key)}>
          {t.label}
          {typeof t.count === 'number' && <span className="tab-count num">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: {label:string; onClick?:()=>void}[] }) {
  return (
    <nav className="arq-crumbs" aria-label="breadcrumb">
      {items.map((it, i) => (
        <Fragment key={i}>
          {i > 0 && <Icon.ChevronLeft size={12}/>}
          {it.onClick ? (
            <button className="crumb-link" onClick={it.onClick}>{it.label}</button>
          ) : (
            <span className={'crumb' + (i===items.length-1?' current':'')}>{it.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

export function ConfirmDialog({ title, body, confirmLabel='تأكيد', danger=false, onConfirm, onClose }: {
  title: string; body: string; confirmLabel?: string; danger?: boolean;
  onConfirm: () => void; onClose: () => void;
}) {
  return (
    <Modal title={title} onClose={onClose} width={420}
      footer={<>
        <button className="btn secondary" onClick={onClose}>إلغاء</button>
        <button className={'btn ' + (danger?'danger':'primary')} onClick={()=>{onConfirm();onClose();}}>{confirmLabel}</button>
      </>}>
      <p style={{margin:0, fontSize:14, color:'var(--text-secondary)', lineHeight:1.7}}>{body}</p>
    </Modal>
  );
}

// AnnouncementCompose — shared across teacher, supervisor, admin
export function AnnouncementCompose({ nav, role }: { nav: (k:string)=>void; role: string }) {
  const t = useToast();
  const audiences = role==='teacher'
    ? ['الصف 11أ — التربية الإسلامية 1', 'الصف 11ب — التربية الإسلامية 1', 'الصف 11أ — التربية الإسلامية 2']
    : role==='supervisor'
    ? ['معلمو التربية الإسلامية — الصفوف 10، 11، 12', 'معلمو قسم التربية الإسلامية — الصف 12']
    : ['المعهد كله', 'جميع المعلمين', 'جميع الطلاب', 'الصفوف 10، 11، 12'];
  return (
    <div className="col gap-5">
      <Breadcrumbs items={[{label:'الإعلانات', onClick:()=>nav('announcements')},{label:'إعلان جديد'}]}/>
      <div className="page-header"><div><h1 className="page-title">إعلان جديد</h1></div></div>
      <div className="card">
        <div className="col gap-4">
          <div className="field">
            <label>الجمهور المستهدف</label>
            <select className="select">
              {audiences.map((a,i) => <option key={i}>{a}</option>)}
            </select>
          </div>
          <div className="field"><label>عنوان الإعلان</label><input className="input" placeholder="اكتب عنواناً واضحاً…"/></div>
          <div className="field"><label>نص الإعلان</label><textarea className="textarea" rows={8} placeholder="اكتب نص الإعلان هنا…"/></div>
        </div>
      </div>
      <div className="row end gap-2">
        <button className="btn secondary" onClick={()=>nav('announcements')}>إلغاء</button>
        <button className="btn primary" onClick={()=>{t.showToast('تم نشر الإعلان.'); nav('announcements');}}>
          <Icon.Megaphone size={14}/>نشر الإعلان
        </button>
      </div>
    </div>
  );
}

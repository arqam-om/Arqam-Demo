export interface Institution {
  name: string; year: string; term: string;
  todayHijri: string; todayGregorian: string; now: string;
}
export interface CastMember {
  id: string; name: string; shortName: string; role: string;
  email: string; avatarInitial: string;
  title?: string; scope?: string; grade?: string; section?: string;
}
export interface RosterStudent {
  id: number; name: string; short: string; initial: string;
  grade: number | null; g1: number; g3: number | null;
  avg: number; rank: number; note?: string; lateOn?: number; missing?: boolean;
}
export interface Course {
  id: string; name: string; teacher: string; avg: number; recent: string; icon: string;
}
export interface Lesson {
  n: number; title: string; state: 'published' | 'draft';
  publishedAgo?: string; editedAgo?: string;
  attachments: { type: string; name?: string; size?: string }[];
}
export interface Assignment {
  n: number; title: string; state: 'graded' | 'open' | 'upcoming';
  deadlineText: string; deadlineAbs?: string; max: number;
  myGrade?: number; myPct?: number; instructions?: string; conditions?: string;
  submittedOnTime?: number; submittedLate?: number; missing?: number; submittedCount?: number;
}
export interface Announcement {
  id: number; scope: string; from: string; role: string; ago: string;
  title: string; body: string; unread: boolean; icon: string; color: string;
  courseName?: string; audienceText?: string;
}
export interface Period { n: number; time: string; end: string; }
export interface TimetableCell {
  s: string; t: string; hero?: boolean; now?: boolean; k?: string;
}
export interface SupervisorScope {
  cls: string; teacher: string; avg: number; median: number;
  graded: string; anomaly?: boolean;
}
export interface SupervisorNote {
  type: string; subject: string; ago: string; status: string; body: string;
}
export interface UserRecord {
  name: string; role: string; email: string; created: string; lastLogin: string;
}
export interface StudentGrade {
  course: string; pct: number; recent: string; band: string;
}
export interface TeacherActivity {
  who: string; what: string; ago: string;
}

export const ArqamData = {
  institution: {
    name: 'معهد مسقط للعلوم الإسلامية',
    year: '1447–1448 هـ / 2025–2026 م',
    term: 'الفصل الدراسي الثاني',
    todayHijri: 'الإثنين، 15 ربيع الأول 1447هـ',
    todayGregorian: 'الإثنين، 22 سبتمبر 2025م',
    now: 'الإثنين 09:15',
  } as Institution,

  cast: {
    student: { id:'s1', name:'أحمد بن سالم الكندي', shortName:'أحمد الكندي', role:'student', grade:'الصف الحادي عشر', section:'الشعبة أ', email:'ahmed.kindi@arqam.edu.om', avatarInitial:'أ' },
    teacher: { id:'t1', name:'الأستاذ أحمد بن خالد الحارثي', shortName:'أ. أحمد الحارثي', role:'teacher', title:'أستاذ التربية الإسلامية', email:'ahmed.harithi@arqam.edu.om', avatarInitial:'أ' },
    supervisor: { id:'sv1', name:'الأستاذ حسن بن عبدالله البلوشي', shortName:'أ. حسن البلوشي', role:'supervisor', email:'hassan.balushi@arqam.edu.om', scope:'التربية الإسلامية - الصفوف 10، 11، 12', avatarInitial:'ح' },
    admin: { id:'a1', name:'الأستاذ سعيد بن ناصر العامري', shortName:'أ. سعيد العامري', role:'admin', email:'said.ameri@arqam.edu.om', avatarInitial:'س' },
    dualAdmin: { id:'da1', name:'الأستاذ خالد بن عمر الرحبي', shortName:'أ. خالد الرحبي', role:'admin', secondaryRole:'supervisor', email:'khaled.rahbi@arqam.edu.om', scope:'اللغة الإنجليزية - الصفوف 10، 11، 12', avatarInitial:'خ' },
  } as Record<string, CastMember>,

  roster11A: [
    { id:1,  name:'أحمد بن سالم الكندي',     short:'أحمد الكندي',     initial:'أ', grade:23, g1:18, g3:null, avg:92, rank:2 },
    { id:2,  name:'سعود بن خالد الحبسي',     short:'سعود الحبسي',     initial:'س', grade:22, g1:17, g3:null, avg:88, rank:5 },
    { id:3,  name:'محمد بن ناصر البلوشي',    short:'محمد البلوشي',    initial:'م', grade:21, g1:16, g3:null, avg:84, rank:8 },
    { id:4,  name:'يوسف بن علي المعمري',     short:'يوسف المعمري',    initial:'ي', grade:24, g1:18, g3:null, avg:93, rank:1 },
    { id:5,  name:'حمد بن سليمان البوسعيدي', short:'حمد البوسعيدي',   initial:'ح', grade:19, g1:15, g3:null, avg:76, rank:14 },
    { id:6,  name:'عبدالله بن خلفان الرواحي', short:'عبدالله الرواحي', initial:'ع', grade:17, g1:14, g3:null, avg:68, rank:20 },
    { id:7,  name:'سلطان بن مبارك الشكيلي',  short:'سلطان الشكيلي',  initial:'س', grade:22, g1:17, g3:null, avg:86, rank:6 },
    { id:8,  name:'خالد بن راشد الزدجالي',   short:'خالد الزدجالي',   initial:'خ', grade:20, g1:16, g3:null, avg:80, rank:10 },
    { id:9,  name:'فهد بن حمود الغافري',     short:'فهد الغافري',     initial:'ف', grade:15, g1:13, g3:null, avg:62, lateOn:2, rank:21 },
    { id:10, name:'طارق بن سعيد المقبالي',   short:'طارق المقبالي',   initial:'ط', grade:25, g1:19, g3:null, avg:95, note:'ممتاز', rank:1 },
    { id:11, name:'ماجد بن عبدالله الحارثي', short:'ماجد الحارثي',    initial:'م', grade:21, g1:17, g3:null, avg:84, rank:7 },
    { id:12, name:'راشد بن ياسر الهنائي',    short:'راشد الهنائي',    initial:'ر', grade:18, g1:15, g3:null, avg:74, rank:15 },
    { id:13, name:'سيف بن حمدان الخروصي',    short:'سيف الخروصي',    initial:'س', grade:23, g1:18, g3:null, avg:90, rank:3 },
    { id:14, name:'ناصر بن صالح الجابري',    short:'ناصر الجابري',    initial:'ن', grade:20, g1:16, g3:null, avg:79, rank:11 },
    { id:15, name:'سالم بن إبراهيم الفارسي', short:'سالم الفارسي',    initial:'س', grade:19, g1:15, g3:null, avg:76, rank:13 },
    { id:16, name:'طلال بن أحمد الكلباني',   short:'طلال الكلباني',   initial:'ط', grade:14, g1:12, g3:null, avg:58, lateOn:2, rank:22 },
    { id:17, name:'هلال بن عزان الشعيلي',    short:'هلال الشعيلي',    initial:'ه', grade:16, g1:14, g3:null, avg:68, lateOn:2, rank:19 },
    { id:18, name:'أيمن بن منصور العيسائي',  short:'أيمن العيسائي',   initial:'أ', grade:22, g1:17, g3:null, avg:86, rank:4 },
    { id:19, name:'زيد بن عادل البرواني',    short:'زيد البرواني',    initial:'ز', grade:null, missing:true, g1:14, g3:null, avg:52, rank:22 },
    { id:20, name:'بدر بن قيس السليماني',    short:'بدر السليماني',   initial:'ب', grade:21, g1:17, g3:null, avg:82, rank:9 },
    { id:21, name:'مازن بن غسان الريامي',    short:'مازن الريامي',    initial:'م', grade:null, missing:true, g1:13, g3:null, avg:48, rank:22 },
    { id:22, name:'عمر بن يحيى الحجري',      short:'عمر الحجري',      initial:'ع', grade:23, g1:18, g3:null, avg:90, rank:3 },
  ] as RosterStudent[],

  courses11A: [
    { id:'c1',  name:'التربية الإسلامية 1',  teacher:'الأستاذ أحمد الحارثي',      avg:92, recent:'23/25', icon:'book-open' },
    { id:'c2',  name:'اللغة العربية 1',       teacher:'الأستاذ خالد السيابي',       avg:88, recent:'44/50', icon:'pen-tool' },
    { id:'c3',  name:'التربية الإسلامية 2',  teacher:'الأستاذ أحمد الحارثي',      avg:90, recent:'18/20', icon:'book-open' },
    { id:'c4',  name:'اللغة العربية 2',       teacher:'الأستاذ سعيد الهنائي',       avg:85, recent:'17/20', icon:'pen-tool' },
    { id:'c5',  name:'اللغة الإنجليزية',      teacher:'الأستاذ يوسف المعمري',       avg:82, recent:'41/50', icon:'languages' },
    { id:'c6',  name:'الرياضيات البحتة',      teacher:'الأستاذ فيصل الزعابي',       avg:94, recent:'47/50', icon:'sigma' },
    { id:'c7',  name:'الأحياء',               teacher:'الأستاذ عبدالعزيز الخليلي',  avg:91, recent:'45.5/50', icon:'leaf' },
    { id:'c8',  name:'الكيمياء',              teacher:'الأستاذ طارق المحرزي',       avg:89, recent:'44.5/50', icon:'flask' },
    { id:'c9',  name:'الفيزياء',              teacher:'الأستاذ مازن الفارسي',        avg:96, recent:'48/50', icon:'atom' },
    { id:'c10', name:'الدراسات الاجتماعية',  teacher:'الأستاذ نبيل اللواتي',       avg:87, recent:'26/30', icon:'globe' },
    { id:'c11', name:'التوجيه المهني',        teacher:'الأستاذ حميد الشكيلي',       avg:90, recent:'9/10', icon:'compass' },
  ] as Course[],

  lessons: [
    { n:1,  title:'مقدمة في أصول العقيدة الإسلامية', state:'published', publishedAgo:'منذ 6 أسابيع', attachments:[{type:'pdf',name:'مقدمة_العقيدة.pdf',size:'2.4 MB'},{type:'text'}] },
    { n:2,  title:'توحيد الربوبية',                   state:'published', publishedAgo:'منذ 5 أسابيع', attachments:[{type:'pdf',name:'توحيد_الربوبية.pdf',size:'1.9 MB'}] },
    { n:3,  title:'توحيد الألوهية',                   state:'published', publishedAgo:'منذ 4 أسابيع', attachments:[{type:'pdf',name:'توحيد_الألوهية.pdf',size:'2.1 MB'},{type:'link',name:'محاضرة على YouTube'}] },
    { n:4,  title:'توحيد الأسماء والصفات',             state:'published', publishedAgo:'منذ 3 أسابيع', attachments:[{type:'pdf',name:'الأسماء_والصفات.pdf',size:'2.8 MB'}] },
    { n:5,  title:'نواقض الإيمان',                    state:'published', publishedAgo:'منذ أسبوعين',  attachments:[{type:'pdf',name:'نواقض_الإيمان.pdf',size:'2.2 MB'},{type:'text'}] },
    { n:6,  title:'أهمية الصلاة وأحكامها',             state:'published', publishedAgo:'منذ 10 أيام',  attachments:[{type:'pdf',name:'أحكام_الصلاة.pdf',size:'3.1 MB'},{type:'pdf',name:'شرح_أحكام_الطهارة.pdf',size:'1.7 MB'}] },
    { n:7,  title:'الزكاة: أحكامها ومصارفها',         state:'published', publishedAgo:'منذ 5 أيام',   attachments:[{type:'pdf',name:'أحكام_الزكاة.pdf',size:'2.5 MB'}] },
    { n:8,  title:'الصيام وأسراره الروحية',            state:'draft',     editedAgo:'منذ يومين',       attachments:[] },
    { n:9,  title:'الحج: مناسكه وحكمه',               state:'draft',     editedAgo:'منذ 4 أيام',      attachments:[] },
    { n:10, title:'الأخلاق الإسلامية: الصدق والأمانة', state:'draft',     editedAgo:'منذ أسبوع',       attachments:[] },
    { n:11, title:'بر الوالدين وصلة الرحم',            state:'draft',     editedAgo:'منذ أسبوعين',     attachments:[] },
    { n:12, title:'حقوق الجار في الإسلام',             state:'draft',     editedAgo:'منذ 3 أسابيع',    attachments:[] },
  ] as Lesson[],

  assignments: [
    { n:1, title:'الواجب الأول - تعريف العقيدة ومكوناتها', state:'graded', deadlineText:'منتهي ومُصحَّح', max:20, myGrade:18, myPct:90 },
    { n:2, title:'الواجب الثاني - مقال قصير عن توحيد الربوبية', state:'graded', deadlineText:'منتهي ومُصحَّح', max:25, myGrade:23, myPct:92, submittedOnTime:17, submittedLate:3, missing:2 },
    { n:3, title:'الواجب الثالث - بحث في مفهوم التوحيد', state:'open', deadlineText:'بعد 3 أيام', deadlineAbs:'الخميس، 18 ربيع الأول 1447هـ - 11:59 مساءً', max:30,
      instructions:'اكتب بحثاً في 400–500 كلمة عن مفهوم التوحيد وأقسامه الثلاثة (الربوبية، الألوهية، الأسماء والصفات). استشهد بثلاث آيات قرآنية على الأقل وحديثَين نبويَّين صحيحَين، واذكر مصادرك.',
      conditions:'يُرفع البحث بصيغة PDF. الحد الأقصى لحجم الملف 10 ميجابايت.',
      submittedCount:7 },
    { n:4, title:'الواجب الرابع - تحليل حديث نبوي', state:'upcoming', deadlineText:'بعد 12 يوماً', max:25 },
  ] as Assignment[],

  announcements: [
    { id:1, scope:'institution', from:'إدارة معهد مسقط للعلوم الإسلامية', role:'admin', ago:'قبل يومين',
      title:'جدول اختبارات منتصف الفصل الدراسي الثاني',
      body:'أبناءنا الطلبة الأعزاء، يسر إدارة المعهد إعلامكم بأن اختبارات منتصف الفصل الدراسي الثاني ستبدأ يوم الأحد الموافق 22 ربيع الأول 1447هـ، وتنتهي يوم الخميس الموافق 26 ربيع الأول 1447هـ. الجدول التفصيلي مرفق. نسأل الله التوفيق للجميع.',
      unread:true, icon:'megaphone', color:'info' },
    { id:2, scope:'course', courseName:'التربية الإسلامية 1 - الصف 11أ', from:'الأستاذ أحمد الحارثي', role:'teacher', ago:'قبل يوم',
      title:'تذكير بموعد تسليم بحث التوحيد',
      body:'السلام عليكم ورحمة الله وبركاته. أذكّركم بأن موعد تسليم بحث التوحيد هو يوم الخميس القادم قبل منتصف الليل. من لديه استفسار فليراجعني في ساعات المكتب يوم الثلاثاء بعد الحصة الرابعة. وفقكم الله.',
      unread:true, icon:'bell', color:'primary' },
    { id:3, scope:'course', courseName:'التربية الإسلامية 1 - الصف 11أ', from:'الأستاذ أحمد الحارثي', role:'teacher', ago:'قبل 5 أيام',
      title:'رفع ملخص درس الزكاة',
      body:'تم رفع ملخص الدرس السابع في أحكام الزكاة ومصارفها. يرجى الاطلاع عليه قبل الحصة القادمة استعداداً للمناقشة.',
      unread:false, icon:'file-text', color:'primary' },
    { id:4, scope:'course', courseName:'الكيمياء - الصف 11أ', from:'الأستاذ طارق المحرزي', role:'teacher', ago:'قبل 3 أيام',
      title:'تأجيل التجربة العملية',
      body:'الطلاب الأعزاء، تم تأجيل التجربة العملية المقررة يوم الثلاثاء إلى يوم الأربعاء القادم. الرجاء إحضار المعاطف المخبرية ونظارات الأمان. الحضور إلزامي.',
      unread:false, icon:'flask', color:'warning' },
    { id:5, scope:'teachers-only', audienceText:'معلمو التربية الإسلامية', from:'الأستاذ حسن البلوشي (المشرف)', role:'supervisor', ago:'قبل 4 أيام',
      title:'اجتماع قسم التربية الإسلامية',
      body:'إلى زملائي المعلمين الكرام في قسم التربية الإسلامية: سيُعقد اجتماع القسم يوم الثلاثاء القادم في الساعة الثانية بعد الظهر في قاعة الاجتماعات لمناقشة جدول الاختبارات ومراجعة الخطة الدراسية للنصف الثاني من الفصل. الحضور مطلوب.',
      unread:false, icon:'users', color:'info' },
    { id:6, scope:'institution', from:'إدارة معهد مسقط للعلوم الإسلامية', role:'admin', ago:'قبل أسبوع',
      title:'موعد الاجتماع الربع-سنوي لأولياء الأمور',
      body:'يُعقد اللقاء الربع-سنوي لأولياء الأمور يوم السبت 14 ربيع الأول 1447هـ من الساعة التاسعة صباحاً حتى الواحدة ظهراً. يمكن لأولياء الأمور حجز مواعيد الاجتماع مع المعلمين عبر إدارة المعهد.',
      unread:false, icon:'calendar', color:'info' },
    { id:7, scope:'course', courseName:'اللغة العربية 1 - الصف 11أ', from:'الأستاذ خالد السيابي', role:'teacher', ago:'قبل 10 أيام',
      title:'قائمة المراجع لمادة اللغة العربية',
      body:'تم نشر قائمة المراجع المُوصى بها لهذا الفصل الدراسي. المراجع متاحة في مكتبة المعهد وبعضها متوفر كنسخ رقمية في قسم الموارد.',
      unread:false, icon:'book', color:'accent' },
  ] as Announcement[],

  // Day 07:05 → 13:35. Break 10:05–10:20.
  // 45-min periods. Before break: no gaps. After break: 5-min gaps between.
  periods: [
    { n:1, time:'07:05', end:'07:50' },
    { n:2, time:'07:50', end:'08:35' },
    { n:3, time:'08:35', end:'09:20' },
    { n:4, time:'09:20', end:'10:05' },
    { n:5, time:'10:20', end:'11:05' },
    { n:6, time:'11:10', end:'11:55' },
    { n:7, time:'12:00', end:'12:45' },
    { n:8, time:'12:50', end:'13:35' },
  ] as Period[],
  breakPeriod: { from: '10:05', to: '10:20', label: 'استراحة' },

  days: ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس'],

  timetable11A: [
    // Sunday
    [ {s:'الإنجليزية',t:'أ. يوسف المعمري'}, {s:'العربية 1',t:'أ. خالد السيابي'}, {s:'الإسلامية 1',t:'أ. أحمد الحارثي',hero:true}, {s:'الكيمياء',t:'أ. طارق المحرزي'}, {s:'الرياضيات البحتة',t:'أ. فيصل الزعابي'}, {s:'الفيزياء',t:'أ. مازن الفارسي'}, {s:'الإنجليزية',t:'أ. يوسف المعمري'}, {s:'العربية 1',t:'أ. خالد السيابي'} ],
    // Monday
    [ {s:'الرياضيات البحتة',t:'أ. فيصل الزعابي',now:true}, {s:'الإسلامية 1',t:'أ. أحمد الحارثي',hero:true,now:true}, {s:'العربية 2',t:'أ. سعيد الهنائي'}, {s:'الأحياء',t:'أ. عبدالعزيز الخليلي'}, {s:'الإنجليزية',t:'أ. يوسف المعمري'}, {s:'الدراسات الاجتماعية',t:'أ. نبيل اللواتي'}, {s:'التوجيه المهني',t:'أ. حميد الشكيلي'}, {s:'الأحياء',t:'أ. عبدالعزيز الخليلي'} ],
    // Tuesday
    [ {s:'الإنجليزية',t:'أ. يوسف المعمري'}, {s:'الفيزياء',t:'أ. مازن الفارسي'}, {s:'الأحياء',t:'أ. عبدالعزيز الخليلي'}, {s:'العربية 1',t:'أ. خالد السيابي'}, {s:'الرياضيات البحتة',t:'أ. فيصل الزعابي'}, {s:'الإسلامية 2',t:'أ. أحمد الحارثي'}, {s:'العربية 2',t:'أ. سعيد الهنائي'}, {s:'الكيمياء',t:'أ. طارق المحرزي'} ],
    // Wednesday
    [ {s:'الرياضيات البحتة',t:'أ. فيصل الزعابي'}, {s:'الدراسات الاجتماعية',t:'أ. نبيل اللواتي'}, {s:'الإنجليزية',t:'أ. يوسف المعمري'}, {s:'الإسلامية 1',t:'أ. أحمد الحارثي',hero:true}, {s:'الكيمياء',t:'أ. طارق المحرزي'}, {s:'العربية 2',t:'أ. سعيد الهنائي'}, {s:'الفيزياء',t:'أ. مازن الفارسي'}, {s:'الإسلامية 2',t:'أ. أحمد الحارثي'} ],
    // Thursday
    [ {s:'العربية 1',t:'أ. خالد السيابي'}, {s:'الرياضيات البحتة',t:'أ. فيصل الزعابي'}, {s:'الكيمياء',t:'أ. طارق المحرزي'}, {s:'الإسلامية 2',t:'أ. أحمد الحارثي'}, {s:'الأحياء',t:'أ. عبدالعزيز الخليلي'}, {s:'الدراسات الاجتماعية',t:'أ. نبيل اللواتي'}, {s:'التوجيه المهني',t:'أ. حميد الشكيلي'}, {s:'الدراسات الاجتماعية',t:'أ. نبيل اللواتي'} ],
  ] as TimetableCell[][],

  supervisorScope: [
    { cls:'10أ', teacher:'أ. إبراهيم الغيلاني', avg:79, median:80, graded:'20/22' },
    { cls:'10ب', teacher:'أ. إبراهيم الغيلاني', avg:81, median:82, graded:'21/22' },
    { cls:'11أ', teacher:'أ. أحمد الحارثي',     avg:82, median:82, graded:'20/22' },
    { cls:'11ب', teacher:'أ. أحمد الحارثي',     avg:84, median:85, graded:'22/22' },
    { cls:'12أ', teacher:'أ. سليمان الشبلي',    avg:68, median:70, graded:'18/22', anomaly:true },
    { cls:'12ب', teacher:'أ. سليمان الشبلي',    avg:78, median:79, graded:'21/22' },
  ] as SupervisorScope[],

  supervisorNotes: [
    { type:'teacher', subject:'أ. سليمان الشبلي', ago:'قبل أسبوعين', status:'متابعة مطلوبة',
      body:'لاحظت تأخراً في نشر الدروس لصف 12أ - لم يُنشر درس جديد منذ أسبوعين. سأتواصل معه هذا الأسبوع لمناقشة الخطة الدراسية. كذلك متوسط الدرجات منخفض مقارنة بالشعب الموازية.' },
    { type:'student', subject:'بدر السليماني - الصف 11أ', ago:'قبل 5 أيام', status:'متابعة',
      body:'أشار الأستاذ أحمد الحارثي إلى أن الطالب متأخر في الواجبات الأخيرة رغم أنه كان من الطلاب المتميزين في الفصل الدراسي الأول. أقترح التواصل مع ولي الأمر ومراجعة الحالة الأكاديمية.' },
    { type:'teacher', subject:'أ. أحمد الحارثي', ago:'قبل أسبوع', status:'إيجابية',
      body:'ملاحظة إيجابية - محتوى الدروس المنشورة في مادة التربية الإسلامية 1 للصف 11أ ممتاز ومُعد بعناية. نسبة مشاركة الطلاب عالية ومتوسط الدرجات مستقر. يُستحسن مشاركة نماذج من تصميم دروسه في الاجتماع القادم.' },
  ] as SupervisorNote[],

  userList: [
    { name:'أحمد بن سالم الكندي',         role:'طالب',  email:'ahmed.kindi@arqam.edu.om',    created:'2025-09-01', lastLogin:'اليوم 09:15' },
    { name:'سعود بن خالد الحبسي',         role:'طالب',  email:'saud.habsi@arqam.edu.om',      created:'2025-09-01', lastLogin:'أمس 14:22' },
    { name:'يوسف بن علي المعمري',         role:'طالب',  email:'yousuf.mamari@arqam.edu.om',   created:'2025-09-01', lastLogin:'اليوم 07:45' },
    { name:'الأستاذ أحمد بن خالد الحارثي', role:'معلم',  email:'ahmed.harithi@arqam.edu.om',   created:'2025-08-15', lastLogin:'اليوم 08:03' },
    { name:'الأستاذ خالد بن محمد السيابي', role:'معلم',  email:'khaled.siyabi@arqam.edu.om',   created:'2025-08-15', lastLogin:'اليوم 07:20' },
    { name:'الأستاذ حسن بن عبدالله البلوشي', role:'مشرف', email:'hassan.balushi@arqam.edu.om', created:'2025-08-10', lastLogin:'اليوم 08:30' },
    { name:'الأستاذ سعيد بن ناصر العامري', role:'إداري', email:'said.ameri@arqam.edu.om',      created:'2025-08-01', lastLogin:'اليوم 09:00' },
    { name:'الأستاذ طارق بن عبدالله المحرزي', role:'معلم', email:'tariq.mahruqi@arqam.edu.om', created:'2025-08-15', lastLogin:'أمس 13:10' },
    { name:'الأستاذ سليمان بن حمد الشبلي', role:'معلم', email:'suleiman.shibli@arqam.edu.om', created:'2025-08-15', lastLogin:'قبل 4 أيام' },
    { name:'طارق بن سعيد المقبالي',        role:'طالب', email:'tariq.maqbali@arqam.edu.om',   created:'2025-09-01', lastLogin:'اليوم 06:55' },
    { name:'سيف بن حمدان الخروصي',         role:'طالب', email:'saif.kharusi@arqam.edu.om',    created:'2025-09-01', lastLogin:'أمس 20:11' },
    { name:'أيمن بن منصور العيسائي',       role:'طالب', email:'ayman.esaei@arqam.edu.om',     created:'2025-09-01', lastLogin:'اليوم 08:40' },
  ] as UserRecord[],

  teacherActivity: [
    { who:'أحمد الكندي',  what:'قام برفع الواجب الثالث',                        ago:'قبل ساعتين' },
    { who:'سيف الخروصي', what:'قام برفع الواجب الثالث',                        ago:'قبل 4 ساعات' },
    { who:'يوسف المعمري', what:'قام برفع الواجب الثالث',                       ago:'قبل 6 ساعات' },
    { who:'أنت',          what:'أعلنتَ: تذكير بموعد تسليم بحث التوحيد',        ago:'قبل يوم' },
    { who:'طارق المقبالي', what:'اطّلع على الدرس السابع',                      ago:'قبل يوم' },
    { who:'سعود الحبسي',  what:'قام برفع الواجب الثالث',                       ago:'قبل يومين' },
    { who:'أنت',          what:'نشرتَ الدرس السابع: الزكاة: أحكامها ومصارفها', ago:'قبل 5 أيام' },
  ] as TeacherActivity[],

  studentGrades: [
    { course:'التربية الإسلامية 1', pct:92, recent:'23/25 (92%)', band:'high' },
    { course:'اللغة العربية 1',      pct:88, recent:'44/50 (88%)', band:'mid-high' },
    { course:'التربية الإسلامية 2', pct:90, recent:'18/20 (90%)', band:'high' },
    { course:'اللغة العربية 2',      pct:85, recent:'17/20 (85%)', band:'mid-high' },
    { course:'اللغة الإنجليزية',     pct:82, recent:'41/50 (82%)', band:'mid-high' },
    { course:'الرياضيات البحتة',     pct:94, recent:'47/50 (94%)', band:'high' },
    { course:'الأحياء',              pct:91, recent:'45.5/50 (91%)', band:'high' },
    { course:'الكيمياء',             pct:89, recent:'44.5/50 (89%)', band:'mid-high' },
    { course:'الفيزياء',             pct:96, recent:'48/50 (96%)', band:'high' },
    { course:'الدراسات الاجتماعية', pct:87, recent:'26/30 (87%)', band:'mid-high' },
    { course:'التوجيه المهني',       pct:90, recent:'9/10 (90%)',  band:'high' },
  ] as StudentGrade[],

  studentTermAvg: 90,
};

import { Icon } from './Icons';
import type { NavItem } from '../context';

export const NAV: Record<string, NavItem[]> = {
  student: [
    { key:'home',          label:'الرئيسية',       icon: Icon.Home },
    { key:'courses',       label:'موادي',           icon: Icon.BookOpen },
    { key:'assignments',   label:'الواجبات',        icon: Icon.ClipboardList, badge: 2 },
    { key:'grades',        label:'درجاتي',          icon: Icon.Award },
    { key:'announcements', label:'الإعلانات',       icon: Icon.Megaphone, badge: 2 },
    { key:'timetable',     label:'الجدول',          icon: Icon.Calendar },
    { key:'profile',       label:'الملف الشخصي',    icon: Icon.User },
  ],
  teacher: [
    { key:'home',          label:'الرئيسية',        icon: Icon.Home },
    { key:'courses',       label:'موادي التدريسية', icon: Icon.BookOpen },
    { key:'grading',       label:'للتصحيح',         icon: Icon.ClipboardList, badge: 17 },
    { key:'announcements', label:'الإعلانات',       icon: Icon.Megaphone },
    { key:'timetable',     label:'الجدول',          icon: Icon.Calendar },
    { key:'profile',       label:'الملف الشخصي',    icon: Icon.User },
  ],
  supervisor: [
    { key:'home',          label:'الرئيسية',          icon: Icon.Home },
    { key:'teachers',      label:'المعلمون', icon: Icon.Users },
    { key:'courses',       label:'المواد',            icon: Icon.BookOpen },
    { key:'students',      label:'الطلاب',            icon: Icon.School },
    { key:'reports',       label:'التقارير',          icon: Icon.BarChart },
    { key:'notes',         label:'الملاحظات',         icon: Icon.FileText },
    { key:'announcements', label:'الإعلانات',         icon: Icon.Megaphone },
    { key:'profile',       label:'الملف الشخصي',      icon: Icon.User },
  ],
  admin: [
    { key:'home',          label:'الرئيسية',         icon: Icon.Home },
    { key:'settings',      label:'إعدادات المعهد',   icon: Icon.Settings },
    { key:'users',         label:'المستخدمون',       icon: Icon.Users },
    { key:'grades',        label:'الصفوف والشعب',    icon: Icon.Grid },
    { key:'subjects',      label:'المواد الدراسية',  icon: Icon.BookOpen },
    { key:'assignments',   label:'إسناد المعلمين',   icon: Icon.Link },
    { key:'supervisors',   label:'المشرفون',         icon: Icon.User },
    { key:'timetable',     label:'الجدول الأسبوعي', icon: Icon.Calendar },
    { key:'announcements', label:'الإعلانات',        icon: Icon.Megaphone },
    { key:'profile',       label:'الملف الشخصي',     icon: Icon.User },
  ],
};

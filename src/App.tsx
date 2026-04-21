import React, { useState, useEffect } from 'react';
import { Shell, AnnouncementCompose } from './components/Shell';
import { LoginScreen } from './components/Auth';
import { NAV } from './components/Nav';
import {
  StudentHome, StudentCourses, StudentCourseWorkspace, LessonViewer,
  AssignmentSubmission, StudentAssignmentsAgg, StudentGrades,
  StudentAnnouncements, StudentTimetable, StudentProfile,
} from './components/Student';
import {
  TeacherHome, TeacherCourses, TeacherCourseWorkspace, LessonComposer,
  AssignmentComposer, SubmissionInbox, GradeReleaseScreen, TeacherGradingList,
  TeacherAnnouncements, TeacherTimetable, TeacherProfile,
} from './components/Teacher';
import {
  SupervisorHome, SupervisorTeachers, SupervisorTeacherDetail,
  SupervisorCourses, SupervisorCourseDrill, SupervisorReports, SupervisorNotes,
  SupervisorNoteCompose, SupervisorStudentsList, SupervisorAnnouncements,
  SupervisorProfile,
} from './components/Supervisor';
import {
  AdminHome, AdminSettings, AdminGrades, AdminEnrollment, AdminSubjects,
  AdminUsers, AdminAssignments, AdminSupervisors, AdminTimetable,
  AdminAnnouncements, AdminProfile,
} from './components/Admin';
import { ArqamData } from './data/arqam';
import type { Role, AuthUser, ScreenBag } from './context';

type Screen = string;

const screenToNavKey = (s: Screen): string => ({
  course: 'courses', lesson: 'courses', assignment: 'assignments',
  'teacher-detail': 'teachers', 'course-drill': 'teachers',
  'note-compose': 'notes', enrollment: 'grades',
  grading: 'grading', inbox: 'courses', 'grade-release': 'courses',
  'lesson-compose': 'courses', 'asn-compose': 'courses',
  'announce-compose': 'announcements',
} as Record<string,string>)[s] || s;

export default function App() {
  const [auth, setAuth] = useState<{ user: AuthUser } | null>(null);
  const [viewRole, setViewRole] = useState<Role>('admin');
  const [screen, setScreen] = useState<Screen>('home');
  const [courseId, setCourseId] = useState('c1');
  const [lessonN, setLessonN] = useState(5);
  const [assignmentN, setAssignmentN] = useState(3);
  const [teacherFocus, setTeacherFocus] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = (typeof localStorage !== 'undefined') ? localStorage.getItem('arqam-theme') : null;
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('arqam-theme', theme); } catch { /* ignore */ }
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  if (!auth) {
    return (
      <LoginScreen onLogin={(castKey: string) => {
        const user = ArqamData.cast[castKey] as AuthUser;
        setAuth({ user });
        setViewRole(user.role);
        setScreen('home');
      }}/>
    );
  }

  const { user } = auth;
  // For dual-role users, active role is viewRole; otherwise user.role
  const activeRole: Role = user.secondaryRole ? viewRole : user.role;
  const navItems = NAV[activeRole];
  const activeKey = screenToNavKey(screen);

  const onSwitchRole = user.secondaryRole ? () => {
    const next = viewRole === user.role ? user.secondaryRole! : user.role;
    setViewRole(next);
    setScreen('home');
  } : undefined;

  const bag: ScreenBag = {
    nav: setScreen,
    setCourseId,
    setLessonN,
    setAssignmentN,
    setTeacherFocus,
    courseId,
    lessonN,
    assignmentN,
    teacherFocus,
  };

  const onLogout = () => { setAuth(null); setScreen('home'); };

  let content: React.ReactNode = null;

  if (activeRole === 'student') {
    content = screen==='home'         ? <StudentHome {...bag}/>
      : screen==='courses'            ? <StudentCourses {...bag}/>
      : screen==='course'             ? <StudentCourseWorkspace {...bag}/>
      : screen==='lesson'             ? <LessonViewer {...bag}/>
      : screen==='assignment'         ? <AssignmentSubmission {...bag}/>
      : screen==='assignments'        ? <StudentAssignmentsAgg {...bag}/>
      : screen==='grades'             ? <StudentGrades/>
      : screen==='announcements'      ? <StudentAnnouncements/>
      : screen==='timetable'          ? <StudentTimetable/>
      : screen==='profile'            ? <StudentProfile/>
      : <StudentHome {...bag}/>;
  } else if (activeRole === 'teacher') {
    content = screen==='home'         ? <TeacherHome {...bag}/>
      : screen==='courses'            ? <TeacherCourses {...bag}/>
      : screen==='course'             ? <TeacherCourseWorkspace {...bag}/>
      : screen==='lesson-compose'     ? <LessonComposer {...bag}/>
      : screen==='asn-compose'        ? <AssignmentComposer {...bag}/>
      : screen==='inbox'              ? <SubmissionInbox {...bag}/>
      : screen==='grade-release'      ? <GradeReleaseScreen {...bag}/>
      : screen==='grading'            ? <TeacherGradingList {...bag}/>
      : screen==='announcements'      ? <TeacherAnnouncements {...bag}/>
      : screen==='announce-compose'   ? <AnnouncementCompose nav={bag.nav} role="teacher"/>
      : screen==='timetable'          ? <TeacherTimetable/>
      : screen==='profile'            ? <TeacherProfile/>
      : <TeacherHome {...bag}/>;
  } else if (activeRole === 'supervisor') {
    content = screen==='home'         ? <SupervisorHome {...bag}/>
      : screen==='teachers'           ? <SupervisorTeachers {...bag}/>
      : screen==='teacher-detail'     ? <SupervisorTeacherDetail {...bag}/>
      : screen==='course-drill'       ? <SupervisorCourseDrill {...bag}/>
      : screen==='courses'            ? <SupervisorCourses {...bag}/>
      : screen==='reports'            ? <SupervisorReports/>
      : screen==='notes'              ? <SupervisorNotes {...bag}/>
      : screen==='note-compose'       ? <SupervisorNoteCompose {...bag}/>
      : screen==='students'           ? <SupervisorStudentsList/>
      : screen==='announcements'      ? <SupervisorAnnouncements {...bag}/>
      : screen==='announce-compose'   ? <AnnouncementCompose nav={bag.nav} role="supervisor"/>
      : screen==='profile'            ? <SupervisorProfile/>
      : <SupervisorHome {...bag}/>;
  } else if (activeRole === 'admin') {
    content = screen==='home'         ? <AdminHome {...bag}/>
      : screen==='settings'           ? <AdminSettings/>
      : screen==='grades'             ? <AdminGrades {...bag}/>
      : screen==='enrollment'         ? <AdminEnrollment {...bag}/>
      : screen==='subjects'           ? <AdminSubjects/>
      : screen==='users'              ? <AdminUsers {...bag}/>
      : screen==='assignments'        ? <AdminAssignments/>
      : screen==='supervisors'        ? <AdminSupervisors/>
      : screen==='timetable'          ? <AdminTimetable/>
      : screen==='announcements'      ? <AdminAnnouncements {...bag}/>
      : screen==='announce-compose'   ? <AnnouncementCompose nav={bag.nav} role="admin"/>
      : screen==='profile'            ? <AdminProfile/>
      : <AdminHome {...bag}/>;
  }

  return (
    <Shell user={user} viewRole={activeRole} navItems={navItems} activeKey={activeKey}
      onNav={setScreen} onLogout={onLogout} onSwitchRole={onSwitchRole}
      theme={theme} onToggleTheme={toggleTheme}>
      {content}
    </Shell>
  );
}

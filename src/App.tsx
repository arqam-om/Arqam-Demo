import React, { useState } from 'react';
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
  SupervisorCourseDrill, SupervisorReports, SupervisorNotes,
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
  const [auth, setAuth] = useState<{ role: Role; user: AuthUser } | null>(null);
  const [screen, setScreen] = useState<Screen>('home');
  const [courseId, setCourseId] = useState('c1');
  const [lessonN, setLessonN] = useState(5);
  const [assignmentN, setAssignmentN] = useState(3);
  const [teacherFocus, setTeacherFocus] = useState<string | null>(null);

  if (!auth) {
    return (
      <LoginScreen onLogin={(role: Role) => {
        setAuth({ role, user: ArqamData.cast[role] as AuthUser });
        setScreen('home');
      }}/>
    );
  }

  const { user } = auth;
  const navItems = NAV[user.role];
  const activeKey = screenToNavKey(screen);

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

  if (user.role === 'student') {
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
  } else if (user.role === 'teacher') {
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
  } else if (user.role === 'supervisor') {
    content = screen==='home'         ? <SupervisorHome {...bag}/>
      : screen==='teachers'           ? <SupervisorTeachers {...bag}/>
      : screen==='teacher-detail'     ? <SupervisorTeacherDetail {...bag}/>
      : screen==='course-drill'       ? <SupervisorCourseDrill {...bag}/>
      : screen==='courses'            ? <SupervisorTeachers {...bag}/>
      : screen==='reports'            ? <SupervisorReports/>
      : screen==='notes'              ? <SupervisorNotes {...bag}/>
      : screen==='note-compose'       ? <SupervisorNoteCompose {...bag}/>
      : screen==='students'           ? <SupervisorStudentsList/>
      : screen==='announcements'      ? <SupervisorAnnouncements {...bag}/>
      : screen==='announce-compose'   ? <AnnouncementCompose nav={bag.nav} role="supervisor"/>
      : screen==='profile'            ? <SupervisorProfile/>
      : <SupervisorHome {...bag}/>;
  } else if (user.role === 'admin') {
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
    <Shell user={user} navItems={navItems} activeKey={activeKey} onNav={setScreen} onLogout={onLogout}>
      {content}
    </Shell>
  );
}

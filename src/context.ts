import { createContext, useContext } from 'react';

export interface ToastCtxType {
  showToast: (msg: string, kind?: 'success' | 'error') => void;
}

export const ToastCtx = createContext<ToastCtxType>({ showToast: () => {} });
export const useToast = () => useContext(ToastCtx);

export type Role = 'student' | 'teacher' | 'supervisor' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  shortName: string;
  role: Role;
  email: string;
  avatarInitial: string;
  title?: string;
  scope?: string;
  grade?: string;
  section?: string;
}

export interface NavItem {
  key: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  badge?: number;
}

export interface ScreenBag {
  nav: (key: string) => void;
  setCourseId: (id: string) => void;
  setLessonN: (n: number) => void;
  setAssignmentN: (n: number) => void;
  setTeacherFocus: (id: string | null) => void;
  courseId: string;
  lessonN: number;
  assignmentN: number;
  teacherFocus: string | null;
}

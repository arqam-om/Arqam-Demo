import {
  ChevronLeft as LChevronLeft, ChevronRight as LChevronRight,
  ArrowLeft as LArrowLeft, ArrowRight as LArrowRight,
  ChevronDown, ChevronUp,
  Home, BookOpen, Book, FileText, Calendar, Clock, Bell, Search,
  Settings, User, Users, Check, X, Plus, Megaphone, Upload, Download,
  Eye, EyeOff, Lock, Mail, Filter, MoreHorizontal, MoreVertical,
  Edit, Trash, Save, Paperclip, Link, Globe, Star, AlertTriangle,
  CheckCircle, Sigma, Leaf, Atom, Compass, Languages, PenTool,
  LogOut, GripVertical, Award, TrendingUp, BarChart, ClipboardList,
  Grid, School, Sparkles, Command, Cloud, BookMarked,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import React from 'react';

// Directional icons flip in RTL via CSS transform
const flipped = (C: React.ComponentType<LucideProps>) =>
  (props: LucideProps) => React.createElement(C, { ...props, style: { transform: 'scaleX(-1)', ...(props.style as object || {}) } });

// 8-point star ornament (custom SVG)
const StarOrnament = ({ size = 40, className = '' }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.25} className={className}>
    <polygon points="24,4 28,14 38,10 34,20 44,24 34,28 38,38 28,34 24,44 20,34 10,38 14,28 4,24 14,20 10,10 20,14" />
  </svg>
);

// Flask custom (Lucide's Flask doesn't always match)
const Flask = (props: LucideProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size||20} height={props.size||20}
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}
    strokeLinecap="round" strokeLinejoin="round" className={props.className as string}>
    <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/>
    <path d="M8.5 2h7"/><path d="M7 16h10"/>
  </svg>
);

export const Icon = {
  ChevronLeft: flipped(LChevronLeft),
  ChevronRight: flipped(LChevronRight),
  ArrowLeft: flipped(LArrowLeft),
  ArrowRight: flipped(LArrowRight),
  ChevronDown, ChevronUp,
  Home, BookOpen, Book, FileText, Calendar, Clock, Bell, Search,
  Settings, User, Users, Check, X, Plus, Megaphone, Upload, Download,
  Eye, EyeOff, Lock, Mail, Filter, MoreHorizontal, MoreVertical,
  Edit, Trash, Save, Paperclip, Link, Globe, Star, AlertTriangle,
  CheckCircle, Sigma, Leaf, Atom, Compass, Languages, PenTool,
  Logout: flipped(LogOut),
  GripVertical, Award, TrendingUp, BarChart, ClipboardList,
  Grid, School, Sparkles, Command, Cloud, BookMarked,
  Flask,
  StarOrnament,
};

// Map icon string names from data to components
const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  megaphone: Megaphone, bell: Bell, 'file-text': FileText,
  flask: Flask as React.ComponentType<LucideProps>,
  users: Users, calendar: Calendar, book: Book, clock: Clock,
  'book-open': BookOpen, 'clipboard-list': ClipboardList,
  award: Award, 'alert-triangle': AlertTriangle, 'pen-tool': PenTool,
  sigma: Sigma, leaf: Leaf, atom: Atom, compass: Compass,
  languages: Languages, globe: Globe,
};

export function IconByName({ name, size = 18 }: { name: string; size?: number }) {
  const C = iconMap[name] || Megaphone;
  return React.createElement(C as React.ComponentType<LucideProps>, { size });
}

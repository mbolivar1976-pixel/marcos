export type SectionType =
  | 'paragraph'
  | 'heading'
  | 'subheading'
  | 'highlight'
  | 'code'
  | 'list'
  | 'numbered_list'
  | 'formula'
  | 'comparison'
  | 'tip'
  | 'warning'
  | 'example';

export interface LessonSection {
  type: SectionType;
  content: string | string[];
  label?: string;
}

export interface KeyTerm {
  term: string;
  definition: string;
}

export interface ExternalResource {
  title: string;
  url: string;
  description: string;
  type: 'video' | 'article' | 'document' | 'tool';
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  sections: LessonSection[];
  keyTerms: KeyTerm[];
  summary: string;
  resources?: ExternalResource[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'básico' | 'intermedio' | 'avanzado';
  points: number;
}

export type ModuleLevel = 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  level: ModuleLevel;
  icon: string;
  color: string;
  accentColor: string;
  estimatedHours: number;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

export interface QuizResult {
  score: number;
  total: number;
  answers: number[];
  date: string;
}

export interface Progress {
  completedLessons: string[];
  quizResults: Record<string, QuizResult>;
}

export type AppView =
  | { name: 'dashboard' }
  | { name: 'module'; moduleId: string }
  | { name: 'lesson'; moduleId: string; lessonIndex: number }
  | { name: 'quiz'; moduleId: string }
  | { name: 'results'; moduleId: string; result: QuizResult };

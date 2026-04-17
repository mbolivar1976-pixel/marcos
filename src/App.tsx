import { useState, useCallback } from 'react'
import { modules } from './data/curriculum'
import Dashboard from './components/Dashboard'
import ModuleOverview from './components/ModuleOverview'
import LessonView from './components/LessonView'
import QuizView from './components/QuizView'
import ResultsView from './components/ResultsView'
import type { AppView, Progress, QuizResult } from './types'

const STORAGE_KEY = 'cgp-progress-v1'

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Progress
  } catch { /* ignore */ }
  return { completedLessons: [], quizResults: {} }
}

function saveProgress(p: Progress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)) } catch { /* ignore */ }
}

export default function App() {
  const [view, setView] = useState<AppView>({ name: 'dashboard' })
  const [progress, setProgress] = useState<Progress>(loadProgress)

  const updateProgress = useCallback((updater: (p: Progress) => Progress) => {
    setProgress(prev => {
      const next = updater(prev)
      saveProgress(next)
      return next
    })
  }, [])

  function completeLesson(moduleId: string, lessonId: string) {
    const key = `${moduleId}:${lessonId}`
    updateProgress(p => ({
      ...p,
      completedLessons: p.completedLessons.includes(key) ? p.completedLessons : [...p.completedLessons, key],
    }))
  }

  function saveQuizResult(moduleId: string, result: QuizResult) {
    updateProgress(p => ({ ...p, quizResults: { ...p.quizResults, [moduleId]: result } }))
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <span style={{ fontSize: '1.4rem' }}>📊</span>
          <div>
            <div className="header-logo">Control de Gestión y Presupuestario</div>
            <div className="header-subtitle">UNIR — Preparación Examen Maestría</div>
          </div>
        </div>
        {view.name !== 'dashboard' && (
          <button className="btn btn-ghost btn-sm" onClick={() => setView({ name: 'dashboard' })}>
            🏠 Inicio
          </button>
        )}
        <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
          {progress.completedLessons.length} lecciones · {Object.keys(progress.quizResults).length} quizzes
        </div>
      </header>

      <main className="main">
        {view.name === 'dashboard' && (
          <Dashboard
            progress={progress}
            onSelectModule={id => setView({ name: 'module', moduleId: id })}
          />
        )}

        {view.name === 'module' && (
          <ModuleOverview
            moduleId={view.moduleId}
            progress={progress}
            onStartLesson={i => setView({ name: 'lesson', moduleId: view.moduleId, lessonIndex: i })}
            onStartQuiz={() => setView({ name: 'quiz', moduleId: view.moduleId })}
            onBack={() => setView({ name: 'dashboard' })}
          />
        )}

        {view.name === 'lesson' && (
          <LessonView
            moduleId={view.moduleId}
            lessonIndex={view.lessonIndex}
            progress={progress}
            onComplete={completeLesson}
            onNext={() => setView({ name: 'lesson', moduleId: view.moduleId, lessonIndex: view.lessonIndex + 1 })}
            onPrev={() => setView({ name: 'lesson', moduleId: view.moduleId, lessonIndex: view.lessonIndex - 1 })}
            onBack={() => setView({ name: 'module', moduleId: view.moduleId })}
          />
        )}

        {view.name === 'quiz' && (
          <QuizView
            moduleId={view.moduleId}
            onFinish={result => {
              saveQuizResult(view.moduleId, result)
              setView({ name: 'results', moduleId: view.moduleId, result })
            }}
            onBack={() => setView({ name: 'module', moduleId: view.moduleId })}
          />
        )}

        {view.name === 'results' && (
          <ResultsView
            moduleId={view.moduleId}
            result={view.result}
            onRepeat={() => setView({ name: 'quiz', moduleId: view.moduleId })}
            onNextModule={() => {
              const idx = modules.findIndex(m => m.id === view.moduleId)
              if (idx + 1 < modules.length) {
                setView({ name: 'module', moduleId: modules[idx + 1].id })
              }
            }}
            onDashboard={() => setView({ name: 'dashboard' })}
          />
        )}
      </main>
    </div>
  )
}


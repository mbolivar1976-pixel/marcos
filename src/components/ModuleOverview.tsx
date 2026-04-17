import { getModule } from '../data/curriculum'
import type { Progress } from '../types'

interface Props {
  moduleId: string
  progress: Progress
  onStartLesson: (index: number) => void
  onStartQuiz: () => void
  onBack: () => void
}

export default function ModuleOverview({ moduleId, progress, onStartLesson, onStartQuiz, onBack }: Props) {
  const mod = getModule(moduleId)
  if (!mod) return null

  const isLessonDone = (lessonId: string) => progress.completedLessons.includes(`${moduleId}:${lessonId}`)
  const doneLessons = mod.lessons.filter(l => isLessonDone(l.id)).length
  const quizResult = progress.quizResults[moduleId]
  const canQuiz = doneLessons >= 1

  return (
    <div>
      <div className="module-hero" style={{ background: mod.color }} data-icon={mod.icon}>
        <button className="btn btn-ghost btn-sm" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 16 }} onClick={onBack}>
          ← Volver al inicio
        </button>
        <h1>{mod.icon} {mod.title}</h1>
        <p>{mod.description}</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className={`badge ${mod.level === 'Básico' ? 'badge-basic' : mod.level === 'Intermedio' ? 'badge-intermedio' : mod.level === 'Avanzado' ? 'badge-avanzado' : 'badge-experto'}`}>{mod.level}</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>⏱ {mod.estimatedHours} horas estimadas</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>📚 {mod.lessons.length} lecciones</span>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>❓ {mod.quiz.length} preguntas de examen</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'start' }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16, color: 'var(--primary)' }}>Lecciones del módulo</h2>
          <div className="lessons-list">
            {mod.lessons.map((lesson, i) => {
              const done = isLessonDone(lesson.id)
              return (
                <div key={lesson.id} className={`lesson-item${done ? ' completed' : ''}`} onClick={() => onStartLesson(i)}>
                  <div className={`lesson-number${done ? ' done' : ''}`}>
                    {done ? '✓' : i + 1}
                  </div>
                  <div className="lesson-info">
                    <h3>{lesson.title}</h3>
                    <p>{lesson.keyTerms.length} conceptos clave · {lesson.resources?.length ?? 0} recursos externos</p>
                  </div>
                  <span className="lesson-duration">⏱ {lesson.duration} min</span>
                  <button className={`btn btn-sm ${done ? 'btn-secondary' : 'btn-primary'}`}>
                    {done ? 'Repasar' : 'Iniciar'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ minWidth: 220 }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>📝</div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>Quiz del Módulo</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: 16 }}>
              {mod.quiz.length} preguntas tipo examen de maestría
            </p>
            {quizResult && (
              <div style={{ marginBottom: 12, padding: '8px 12px', background: 'var(--bg)', borderRadius: 8 }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>
                  {Math.round((quizResult.score / quizResult.total) * 100)}%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                  {quizResult.score}/{quizResult.total} puntos
                </div>
              </div>
            )}
            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={!canQuiz}
              onClick={onStartQuiz}
            >
              {quizResult ? '🔁 Repetir Quiz' : '▶ Hacer Quiz'}
            </button>
            {!canQuiz && (
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: 8 }}>
                Completa al menos 1 lección primero
              </p>
            )}
            <div className="progress-wrap" style={{ marginTop: 16 }}>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${Math.round((doneLessons / mod.lessons.length) * 100)}%` }} />
              </div>
              <span className="progress-label">{doneLessons}/{mod.lessons.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

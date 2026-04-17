import { modules } from '../data/curriculum'
import type { Module, Progress } from '../types'

interface Props {
  progress: Progress
  onSelectModule: (moduleId: string) => void
}

function getLevelClass(level: string) {
  if (level === 'Básico') return 'badge badge-basic'
  if (level === 'Intermedio') return 'badge badge-intermedio'
  if (level === 'Avanzado') return 'badge badge-avanzado'
  return 'badge badge-experto'
}

function getModuleProgress(mod: Module, progress: Progress) {
  const done = mod.lessons.filter(l => progress.completedLessons.includes(`${mod.id}:${l.id}`)).length
  return { done, total: mod.lessons.length, pct: Math.round((done / mod.lessons.length) * 100) }
}

function isUnlocked(_mod: Module, progress: Progress, index: number): boolean {
  if (index === 0) return true
  const prev = modules[index - 1]
  const prevProg = getModuleProgress(prev, progress)
  const prevQuiz = progress.quizResults[prev.id]
  return prevProg.done >= 1 || (prevQuiz !== undefined && prevQuiz.score / prevQuiz.total >= 0.5)
}

function getResourceTypeIcon(type: string) {
  if (type === 'video') return '▶️'
  if (type === 'document') return '📄'
  if (type === 'tool') return '🛠️'
  return '📰'
}

export default function Dashboard({ progress, onSelectModule }: Props) {
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0)
  const doneLessons = progress.completedLessons.length
  const completedModules = modules.filter(m => {
    const p = getModuleProgress(m, progress)
    return p.done === p.total && progress.quizResults[m.id] !== undefined
  }).length
  const scores = Object.values(progress.quizResults)
  const avgScore = scores.length ? Math.round(scores.reduce((s, r) => s + (r.score / r.total) * 100, 0) / scores.length) : 0

  return (
    <div>
      <div className="dashboard-hero">
        <h1>Control de Gestión y Presupuestario</h1>
        <p>Plataforma de preparación para el examen de maestría — UNIR</p>
      </div>

      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-number">{doneLessons}/{totalLessons}</div>
          <div className="stat-label">Lecciones completadas</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedModules}/{modules.length}</div>
          <div className="stat-label">Módulos completados</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{avgScore > 0 ? `${avgScore}%` : '—'}</div>
          <div className="stat-label">Puntuación media quiz</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{modules.reduce((s, m) => s + m.estimatedHours, 0)}h</div>
          <div className="stat-label">Horas de estudio</div>
        </div>
      </div>

      <div className="module-grid">
        {modules.map((mod, i) => {
          const { done, total, pct } = getModuleProgress(mod, progress)
          const locked = !isUnlocked(mod, progress, i)
          const quiz = progress.quizResults[mod.id]
          const quizPct = quiz ? Math.round((quiz.score / quiz.total) * 100) : null

          return (
            <div
              key={mod.id}
              className={`module-card${locked ? ' locked' : ''}`}
              onClick={() => !locked && onSelectModule(mod.id)}
            >
              <div className="module-card-header" style={{ background: mod.color }}>
                {locked && <span style={{ position: 'absolute', top: 16, right: 16, fontSize: '1.2rem' }}>🔒</span>}
                <span className="module-icon">{mod.icon}</span>
                <div className="module-title">{mod.title}</div>
                <div className="module-subtitle">{mod.subtitle}</div>
              </div>
              <div className="module-card-body">
                <p className="module-desc">{mod.description}</p>
                <div className="module-meta">
                  <span className={getLevelClass(mod.level)}>{mod.level}</span>
                  <span className="text-muted text-xs">⏱ {mod.estimatedHours}h</span>
                  <span className="text-muted text-xs">📚 {total} lecciones</span>
                  {quizPct !== null && (
                    <span className={`badge ${quizPct >= 75 ? 'badge-success' : quizPct >= 60 ? 'badge-warning' : 'badge-danger'}`}>
                      Quiz: {quizPct}%
                    </span>
                  )}
                </div>
                <div className="progress-wrap">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="progress-label">{done}/{total}</span>
                </div>
                <button
                  className={`btn ${done === total ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                  disabled={locked}
                  style={{ alignSelf: 'flex-start', marginTop: 4 }}
                >
                  {locked ? '🔒 Bloqueado' : done === 0 ? 'Comenzar' : done === total ? 'Revisar' : 'Continuar'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { getResourceTypeIcon, getLevelClass, getModuleProgress, isUnlocked }

import { getModule } from '../data/curriculum'
import type { QuizResult } from '../types'
import { modules } from '../data/curriculum'

interface Props {
  moduleId: string
  result: QuizResult
  onRepeat: () => void
  onNextModule: () => void
  onDashboard: () => void
}

function getGrade(pct: number) {
  if (pct >= 90) return { label: 'Sobresaliente', cls: 'grade-A', emoji: '🏆' }
  if (pct >= 75) return { label: 'Notable', cls: 'grade-B', emoji: '🎯' }
  if (pct >= 60) return { label: 'Aprobado', cls: 'grade-C', emoji: '✅' }
  return { label: 'Suspenso', cls: 'grade-D', emoji: '📚' }
}

export default function ResultsView({ moduleId, result, onRepeat, onNextModule, onDashboard }: Props) {
  const mod = getModule(moduleId)
  if (!mod) return null

  const pct = Math.round((result.score / result.total) * 100)
  const grade = getGrade(pct)
  const nextModuleIndex = modules.findIndex(m => m.id === moduleId) + 1
  const hasNextModule = nextModuleIndex < modules.length
  const conic = `${pct * 3.6}deg`

  const byDifficulty = ['básico', 'intermedio', 'avanzado'].map(d => {
    const qs = mod.quiz.filter(q => q.difficulty === d)
    const correct = qs.filter((q) => result.answers[mod.quiz.indexOf(q)] === q.correctIndex).length
    return { d, correct, total: qs.length }
  }).filter(x => x.total > 0)

  return (
    <div>
      <div className="results-hero">
        <div
          className="score-circle"
          style={{ '--pct': conic } as React.CSSProperties}
        >
          <div className="score-inner">
            <span className="score-number">{result.score}</span>
            <span className="score-denom">/{result.total} pts</span>
          </div>
        </div>
        <div className={`grade-label ${grade.cls}`}>{grade.emoji} {grade.label}</div>
        <p style={{ color: 'var(--muted)', marginBottom: 8 }}>{pct}% de acierto — {mod.title}</p>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
          {result.answers.filter((a, i) => a === mod.quiz[i].correctIndex).length} correctas de {mod.quiz.length} preguntas
        </p>

        {byDifficulty.length > 0 && (
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
            {byDifficulty.map(({ d, correct, total }) => (
              <div key={d} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{correct}/{total}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'capitalize' }}>{d}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="review-section">
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16, color: 'var(--primary)' }}>Revisión de respuestas</h2>
        {mod.quiz.map((q, i) => {
          const userAnswer = result.answers[i]
          const correct = userAnswer === q.correctIndex
          return (
            <div key={q.id} className={`review-item ${correct ? 'correct-review' : 'wrong-review'}`}>
              <div className="review-q">{i + 1}. {q.question}</div>
              <div className="review-answers">
                {!correct && userAnswer >= 0 && (
                  <div className="review-wrong-ans">✗ Tu respuesta: {q.options[userAnswer]}</div>
                )}
                {!correct && userAnswer < 0 && (
                  <div className="review-wrong-ans">✗ Sin respuesta (tiempo agotado)</div>
                )}
                <div className="review-correct-ans">✓ Respuesta correcta: {q.options[q.correctIndex]}</div>
              </div>
              <div className="review-explanation">{q.explanation}</div>
            </div>
          )
        })}
      </div>

      <div className="results-actions">
        <button className="btn btn-secondary" onClick={onDashboard}>← Dashboard</button>
        <button className="btn btn-ghost" onClick={onRepeat}>🔁 Repetir quiz</button>
        {hasNextModule && (
          <button className="btn btn-primary" onClick={onNextModule}>
            Siguiente módulo: {modules[nextModuleIndex].icon} {modules[nextModuleIndex].title} →
          </button>
        )}
      </div>
    </div>
  )
}

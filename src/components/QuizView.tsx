import { useState, useEffect, useCallback } from 'react'
import { getModule } from '../data/curriculum'
import type { QuizResult } from '../types'

interface Props {
  moduleId: string
  onFinish: (result: QuizResult) => void
  onBack: () => void
}

export default function QuizView({ moduleId, onFinish, onBack }: Props) {
  const mod = getModule(moduleId)
  if (!mod) return null

  const questions = mod.quiz
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)

  const q = questions[current]

  const advance = useCallback(() => {
    const nextAnswers = [...answers, selected ?? -1]
    const nextScore = score + ((selected === q.correctIndex) ? q.points : 0)
    if (current + 1 >= questions.length) {
      const totalPoints = questions.reduce((s, qq) => s + qq.points, 0)
      onFinish({ score: nextScore, total: totalPoints, answers: nextAnswers, date: new Date().toISOString() })
    } else {
      setAnswers(nextAnswers)
      setScore(nextScore)
      setCurrent(c => c + 1)
      setSelected(null)
      setAnswered(false)
      setTimeLeft(30)
    }
  }, [answers, selected, score, current, q, questions, onFinish])

  useEffect(() => {
    if (answered) return
    if (timeLeft <= 0) {
      setAnswered(true)
      setTimeout(advance, 1500)
      return
    }
    const t = setTimeout(() => setTimeLeft(tl => tl - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, answered, advance])

  function select(idx: number) {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
  }

  function difficultyColor(d: string) {
    if (d === 'básico') return 'badge-basic'
    if (d === 'intermedio') return 'badge-intermedio'
    return 'badge-avanzado'
  }

  const totalPoints = questions.reduce((s, qq) => s + qq.points, 0)
  const pct = Math.round((current / questions.length) * 100)
  const timerPct = (timeLeft / 30) * 100

  return (
    <div>
      <div className="quiz-header">
        <button className="btn btn-ghost btn-sm" style={{ marginBottom: 16 }} onClick={onBack}>← Volver al módulo</button>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>{mod.icon} Quiz — {mod.title}</h2>
        <div className="quiz-progress-info">
          <span className="quiz-q-label">Pregunta {current + 1} de {questions.length}</span>
          <span className="quiz-score-live">Puntos: {score}/{totalPoints}</span>
        </div>
        <div className="progress-bar" style={{ marginBottom: 8 }}>
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="timer-bar">
          <div className={`timer-fill${timeLeft <= 8 ? ' urgent' : ''}`} style={{ width: `${timerPct}%` }} />
        </div>
        <div style={{ fontSize: '0.75rem', color: timeLeft <= 8 ? 'var(--danger)' : 'var(--muted)', textAlign: 'right', marginTop: 4 }}>
          ⏱ {timeLeft}s
        </div>
      </div>

      <div className="quiz-card">
        <div className="quiz-difficulty">
          <span className={`badge ${difficultyColor(q.difficulty)}`}>{q.difficulty} · {q.points} {q.points === 1 ? 'punto' : 'puntos'}</span>
        </div>
        <p className="quiz-question">{q.question}</p>
        <div className="quiz-options">
          {q.options.map((opt, i) => {
            let cls = 'quiz-option'
            if (answered) {
              if (i === q.correctIndex) cls += ' correct'
              else if (i === selected) cls += ' wrong'
            } else if (i === selected) {
              cls += ' selected'
            }
            return (
              <button key={i} className={cls} onClick={() => select(i)} disabled={answered}>
                <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                <span>{opt}</span>
              </button>
            )
          })}
        </div>
        {answered && (
          <div className="explanation-box">
            <strong>{selected === q.correctIndex ? '✅ ¡Correcto!' : '❌ Incorrecto'}</strong>
            <br />{q.explanation}
          </div>
        )}
      </div>

      {answered && (
        <div className="quiz-actions">
          <button className="btn btn-primary" onClick={advance}>
            {current + 1 >= questions.length ? 'Ver resultados →' : 'Siguiente pregunta →'}
          </button>
        </div>
      )}
    </div>
  )
}

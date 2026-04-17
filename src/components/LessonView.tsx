import { useState } from 'react'
import { getModule } from '../data/curriculum'
import type { LessonSection, Progress } from '../types'

interface Props {
  moduleId: string
  lessonIndex: number
  progress: Progress
  onComplete: (moduleId: string, lessonId: string) => void
  onNext: () => void
  onPrev: () => void
  onBack: () => void
}

function SectionRenderer({ section }: { section: LessonSection }) {
  const content = section.content

  switch (section.type) {
    case 'paragraph':
      return <p className="s-paragraph">{content as string}</p>
    case 'heading':
      return <h2 className="s-heading">{content as string}</h2>
    case 'subheading':
      return <h3 className="s-subheading">{content as string}</h3>
    case 'highlight':
      return <div className="s-highlight">{content as string}</div>
    case 'tip':
      return <div className="s-tip">{content as string}</div>
    case 'warning':
      return <div className="s-warning">{content as string}</div>
    case 'example':
      return (
        <div className="s-example">
          <div className="s-example-label">Ejemplo práctico</div>
          {(content as string)}
        </div>
      )
    case 'code':
      return <pre className="s-code">{content as string}</pre>
    case 'formula':
      return <pre className="s-formula">{content as string}</pre>
    case 'list':
      return (
        <ul className="s-list">
          {(content as string[]).map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )
    case 'numbered_list':
      return (
        <ol className="s-numbered">
          {(content as string[]).map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      )
    default:
      return <p className="s-paragraph">{content as string}</p>
  }
}

function ResourceTypeIcon({ type }: { type: string }) {
  if (type === 'video') return <>▶️</>
  if (type === 'document') return <>📄</>
  if (type === 'tool') return <>🛠️</>
  return <>📰</>
}

export default function LessonView({ moduleId, lessonIndex, progress, onComplete, onNext, onPrev, onBack }: Props) {
  const mod = getModule(moduleId)
  if (!mod) return null
  const lesson = mod.lessons[lessonIndex]
  if (!lesson) return null

  const [flippedTerms, setFlippedTerms] = useState<Set<string>>(new Set())
  const isDone = progress.completedLessons.includes(`${moduleId}:${lesson.id}`)

  function toggleTerm(term: string) {
    setFlippedTerms(prev => {
      const next = new Set(prev)
      next.has(term) ? next.delete(term) : next.add(term)
      return next
    })
  }

  return (
    <div>
      <div className="lesson-header">
        <div className="lesson-nav">
          <button className="btn btn-ghost btn-sm" onClick={onBack}>← Módulo</button>
          <span>/</span>
          <span>{mod.title}</span>
          <span>/</span>
          <span style={{ color: 'var(--text)' }}>Lección {lessonIndex + 1}</span>
        </div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{lesson.title}</h1>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
          <span className="text-muted text-sm">⏱ {lesson.duration} min de lectura</span>
          {isDone && <span className="badge badge-success">✓ Completada</span>}
        </div>
      </div>

      <div className="lesson-content">
        {lesson.sections.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}
      </div>

      {lesson.keyTerms.length > 0 && (
        <div className="key-terms">
          <h2>📖 Conceptos Clave — haz clic para ver la definición</h2>
          <div className="terms-grid">
            {lesson.keyTerms.map(kt => (
              <div
                key={kt.term}
                className={`term-card${flippedTerms.has(kt.term) ? ' flipped' : ''}`}
                onClick={() => toggleTerm(kt.term)}
              >
                <div className="term-name">{kt.term}</div>
                {flippedTerms.has(kt.term) && (
                  <div className="term-definition">{kt.definition}</div>
                )}
                {!flippedTerms.has(kt.term) && (
                  <div className="term-definition" style={{ color: 'var(--border)' }}>Clic para ver definición</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {lesson.resources && lesson.resources.length > 0 && (
        <div className="resources-section">
          <h2>🔗 Recursos Externos Recomendados</h2>
          <div className="resources-grid">
            {lesson.resources.map((res, i) => (
              <div key={i} className="resource-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ResourceTypeIcon type={res.type} />
                  <span className="badge badge-intermedio" style={{ fontSize: '0.68rem' }}>{res.type}</span>
                </div>
                <div className="resource-title">{res.title}</div>
                <div className="resource-desc">{res.description}</div>
                <div className="resource-footer">
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    onClick={e => e.stopPropagation()}
                  >
                    Abrir recurso →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="divider" />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 16, marginBottom: 24 }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 6, color: 'var(--primary)' }}>📌 Resumen de la lección</h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>{lesson.summary}</p>
      </div>

      <div className="lesson-footer">
        <button className="btn btn-secondary" onClick={onPrev} disabled={lessonIndex === 0}>
          ← Lección anterior
        </button>
        <div style={{ display: 'flex', gap: 12 }}>
          {!isDone && (
            <button className="btn btn-success" onClick={() => onComplete(moduleId, lesson.id)}>
              ✓ Marcar como completada
            </button>
          )}
          {lessonIndex < mod.lessons.length - 1 ? (
            <button className="btn btn-primary" onClick={onNext}>
              Siguiente lección →
            </button>
          ) : (
            <button className="btn btn-primary" onClick={onBack}>
              Ir al quiz del módulo →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

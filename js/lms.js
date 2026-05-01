/* ── TOPICS DATA ──────────────────────────────────────────────────── */
const TOPICS = [
  {
    id: 'tema1', label: 'Tema 1', title: 'Solidez y Equilibrio Patrimonial', icon: '📊',
    lessons: [
      { id: 't1l1', title: 'El Balance: Concepto y Estructura', file: 'lessons/tema1/leccion1.html' },
      { id: 't1l2', title: 'Análisis del Activo y del Pasivo', file: 'lessons/tema1/leccion2.html' },
      { id: 't1l3', title: 'Equilibrio Patrimonial y Tipos de Empresa', file: 'lessons/tema1/leccion3.html' },
      { id: 't1l4', title: 'Ratios y Diagnóstico Financiero', file: 'lessons/tema1/leccion4.html' },
    ]
  },
  {
    id: 'tema2', label: 'Tema 2', title: 'Contabilidad Analítica y Resultados', icon: '📈',
    lessons: [
      { id: 't2l1', title: 'Contabilidad Financiera vs. Analítica', file: 'lessons/tema2/leccion1.html' },
      { id: 't2l2', title: 'Estado de Resultados y Costes', file: 'lessons/tema2/leccion2.html' },
      { id: 't2l3', title: 'Resultado Analítico y Marginalidad', file: 'lessons/tema2/leccion3.html' },
      { id: 't2l4', title: 'El BAT y Análisis de Rentabilidad', file: 'lessons/tema2/leccion4.html' },
    ]
  },
  {
    id: 'tema3', label: 'Tema 3', title: 'Sistemas de Control de Costes', icon: '🎯',
    lessons: [
      { id: 't3l1', title: 'Tipos de Costes y Contabilidad Analítica', file: 'lessons/tema3/leccion1.html' },
      { id: 't3l2', title: 'Full Cost, Direct Costing e Histórico', file: 'lessons/tema3/leccion2.html' },
      { id: 't3l3', title: 'Costes Estándar y ABC', file: 'lessons/tema3/leccion3.html' },
      { id: 't3l4', title: 'Punto Muerto y Umbral de Rentabilidad', file: 'lessons/tema3/leccion4.html' },
    ]
  },
  {
    id: 'tema4', label: 'Tema 4', title: 'Gestión Presupuestaria', icon: '💼',
    lessons: [
      { id: 't4l1', title: 'Planificación y Alineamiento Estratégico', file: 'lessons/tema4/leccion1.html' },
      { id: 't4l2', title: 'Fases, Tipos y Seguimiento Presupuestario', file: 'lessons/tema4/leccion2.html' },
      { id: 't4l3', title: 'Planning Presupuestario y Sistemas (ZBB, ABB)', file: 'lessons/tema4/leccion3.html' },
      { id: 't4l4', title: 'Forecasting, Rolling Forecast y Presupuesto Flexible', file: 'lessons/tema4/leccion4.html' },
    ]
  }
];

/* ── STATE ────────────────────────────────────────────────────────── */
const State = {
  currentLesson: null,
  done: JSON.parse(localStorage.getItem('lms_done') || '[]'),
  theme: localStorage.getItem('lms_theme') || 'light',

  markDone(id) {
    if (!this.done.includes(id)) {
      this.done.push(id);
      localStorage.setItem('lms_done', JSON.stringify(this.done));
    }
    UI.updateProgress();
  },
  isDone(id) { return this.done.includes(id); },
  totalLessons() { return TOPICS.reduce((n, t) => n + t.lessons.length, 0); }
};

/* ── UI ───────────────────────────────────────────────────────────── */
const UI = {
  buildNav() {
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = '';

    // Home link
    const homeItem = document.createElement('div');
    homeItem.className = 'nav-topic';
    homeItem.innerHTML = `<span class="nav-topic-icon">🏠</span><span class="nav-topic-text">Inicio</span>`;
    homeItem.onclick = () => LMS.showHome();
    nav.appendChild(homeItem);

    TOPICS.forEach(topic => {
      const group = document.createElement('div');
      group.className = 'nav-group';
      group.id = `group-${topic.id}`;

      const topicBtn = document.createElement('div');
      topicBtn.className = 'nav-topic';
      topicBtn.id = `nav-${topic.id}`;
      topicBtn.innerHTML = `
        <span class="nav-topic-icon">${topic.icon}</span>
        <span class="nav-topic-text">${topic.label} · ${topic.title}</span>
        <span class="nav-topic-arrow">›</span>
      `;
      topicBtn.onclick = () => UI.toggleTopic(topic.id);

      const lessonList = document.createElement('div');
      lessonList.className = 'nav-lessons';
      lessonList.id = `lessons-${topic.id}`;

      topic.lessons.forEach((lesson, i) => {
        const item = document.createElement('div');
        item.className = 'nav-lesson';
        item.id = `nav-${lesson.id}`;
        item.innerHTML = `
          <span class="lesson-check">${State.isDone(lesson.id) ? '✓' : '○'}</span>
          <span>${i + 1}. ${lesson.title}</span>
        `;
        item.onclick = () => LMS.loadLesson(topic, lesson);
        lessonList.appendChild(item);
      });

      group.appendChild(topicBtn);
      group.appendChild(lessonList);
      nav.appendChild(group);
    });
  },

  toggleTopic(topicId) {
    const btn = document.getElementById(`nav-${topicId}`);
    const list = document.getElementById(`lessons-${topicId}`);
    const isOpen = list.classList.contains('open');
    // close all
    document.querySelectorAll('.nav-lessons').forEach(el => el.classList.remove('open'));
    document.querySelectorAll('.nav-topic').forEach(el => el.classList.remove('open'));
    if (!isOpen) {
      list.classList.add('open');
      btn.classList.add('open');
    }
  },

  setActiveLesson(lessonId) {
    document.querySelectorAll('.nav-lesson').forEach(el => el.classList.remove('active'));
    const el = document.getElementById(`nav-${lessonId}`);
    if (el) el.classList.add('active');
  },

  markNavDone(lessonId) {
    const el = document.getElementById(`nav-${lessonId}`);
    if (el) {
      el.classList.add('done');
      el.querySelector('.lesson-check').textContent = '✓';
    }
  },

  updateProgress() {
    const total = State.totalLessons();
    const done = State.done.length;
    const pct = Math.round((done / total) * 100);
    document.getElementById('progress-bar').style.width = pct + '%';
    document.getElementById('progress-pct').textContent = pct + '%';
  },

  setBreadcrumb(text) {
    document.getElementById('breadcrumb').textContent = text;
  },

  showHome() {
    document.getElementById('home-section').classList.remove('hidden');
    document.getElementById('lesson-section').classList.add('hidden');
    UI.setBreadcrumb('Inicio');
  },

  showLesson() {
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('lesson-section').classList.remove('hidden');
  }
};

/* ── LMS CORE ─────────────────────────────────────────────────────── */
const LMS = {
  allLessons: TOPICS.flatMap(t => t.lessons.map(l => ({ topic: t, lesson: l }))),

  async loadLesson(topic, lesson) {
    UI.showLesson();
    UI.setActiveLesson(lesson.id);
    UI.toggleTopic(topic.id);
    State.currentLesson = lesson.id;

    document.getElementById('lesson-meta').textContent =
      `${topic.label} · ${topic.title}`;
    document.getElementById('lesson-title').textContent = lesson.title;
    UI.setBreadcrumb(`${topic.label} › ${lesson.title}`);

    const body = document.getElementById('lesson-body');
    body.innerHTML = '<p style="color:var(--muted)">Cargando lección…</p>';

    try {
      const res = await fetch(lesson.file);
      if (!res.ok) {
        body.innerHTML = `
          <div class="callout callout-warning">
            <div class="callout-title">⚠ Lección en construcción</div>
            <p>Esta lección aún no está disponible. El contenido se publicará próximamente.</p>
          </div>`;
      } else {
        body.innerHTML = await res.text();
      }
    } catch {
      body.innerHTML = `
        <div class="callout callout-warning">
          <div class="callout-title">⚠ Lección en construcción</div>
          <p>Esta lección estará disponible próximamente.</p>
        </div>`;
    }

    window.scrollTo(0, 0);
    State.markDone(lesson.id);
    UI.markNavDone(lesson.id);

    // nav buttons
    const idx = this.allLessons.findIndex(x => x.lesson.id === lesson.id);
    document.getElementById('btn-prev').style.visibility = idx > 0 ? 'visible' : 'hidden';
    document.getElementById('btn-next').textContent =
      idx < this.allLessons.length - 1 ? 'Siguiente →' : '✓ Finalizar tema';
  },

  goToFirstLesson() {
    const { topic, lesson } = this.allLessons[0];
    this.loadLesson(topic, lesson);
  },

  prevLesson() {
    const idx = this.allLessons.findIndex(x => x.lesson.id === State.currentLesson);
    if (idx > 0) {
      const { topic, lesson } = this.allLessons[idx - 1];
      this.loadLesson(topic, lesson);
    }
  },

  nextLesson() {
    const idx = this.allLessons.findIndex(x => x.lesson.id === State.currentLesson);
    if (idx < this.allLessons.length - 1) {
      const { topic, lesson } = this.allLessons[idx + 1];
      this.loadLesson(topic, lesson);
    } else {
      UI.showHome();
    }
  },

  showHome() { UI.showHome(); }
};

/* ── SIDEBAR TOGGLE ───────────────────────────────────────────────── */
document.getElementById('sidebar-toggle').addEventListener('click', () => {
  const sb = document.getElementById('sidebar');
  const main = document.getElementById('main');
  sb.classList.toggle('collapsed');
  main.classList.toggle('expanded');
});

document.getElementById('topbar-menu').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('mobile-open');
});

/* ── THEME TOGGLE ─────────────────────────────────────────────────── */
document.getElementById('theme-toggle').addEventListener('click', () => {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark');
  localStorage.setItem('lms_theme', dark ? 'light' : 'dark');
});

/* ── INIT ─────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (State.theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  UI.buildNav();
  UI.updateProgress();
  document.getElementById('stat-temas').textContent = TOPICS.length;
  document.getElementById('stat-lecciones').textContent = State.totalLessons();
});

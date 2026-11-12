'use strict';

// El último examen es el 10/12/2026. No se asume una hora de finalización.
// La zona horaria es explícita para que el calendario no cambie al viajar.
const EXAM_DAY = '2026-12-10';
const EXAM_START = Date.parse(`${EXAM_DAY}T00:00:00-03:00`);
const VACATION_START = Date.parse('2026-12-11T00:00:00-03:00');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const $ = (selector) => document.querySelector(selector);

function countdownState(now) {
  if (now >= VACATION_START) return { mode: 'vacations', days: 0, hours: 0, minutes: 0, seconds: 0 };
  if (now >= EXAM_START) return { mode: 'today', days: 0, hours: 0, minutes: 0, seconds: 0 };
  const seconds = Math.ceil((EXAM_START - now) / 1000);
  return { mode: 'waiting', days: Math.floor(seconds / 86400), hours: Math.floor(seconds % 86400 / 3600), minutes: Math.floor(seconds % 3600 / 60), seconds: seconds % 60 };
}

const EXAMS = [
  { date: '2026-11-05', subject: 'Fundamentos' },
  { date: '2026-11-11', subject: 'Anatomía' },
  { date: '2026-11-12', subject: 'Fundamentos' },
  { date: '2026-11-16', subject: 'Microbiología' },
  { date: '2026-11-20', subject: 'Psicología' },
  { date: '2026-11-25', subject: 'Inglés' }
];
const examsByDate = new Map(EXAMS.map((exam) => [exam.date, exam]));

function renderExamList() {
  const list = $('#exam-list');
  EXAMS.forEach((exam) => {
    const item = document.createElement('li');
    item.dataset.examDate = exam.date;
    const date = document.createElement('time');
    date.dateTime = exam.date;
    date.textContent = `${exam.date.slice(8)}/${exam.date.slice(5, 7)}`;
    const subject = document.createElement('span');
    subject.textContent = exam.subject;
    item.append(date, subject);
    list.append(item);
  });
}

function argentinaDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(date);
  const value = (type) => parts.find((part) => part.type === type).value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

let lastCalendarDay;
function updateCalendars() {
  const today = argentinaDateKey();
  if (today === lastCalendarDay) return;
  lastCalendarDay = today;
  document.querySelectorAll('.calendar-day[data-date]').forEach((day) => {
    const past = day.dataset.date < today;
    const current = day.dataset.date === today;
    const exam = examsByDate.get(day.dataset.date);
    day.classList.toggle('day-past', past);
    day.classList.toggle('exam-day', Boolean(exam));
    if (current) day.setAttribute('aria-current', 'date');
    else day.removeAttribute('aria-current');
    day.setAttribute('aria-label', `${day.dataset.label}${exam ? `, parcial de ${exam.subject}` : ''}${current ? ', hoy' : past ? ', día pasado' : ''}`);
  });
  document.querySelectorAll('[data-exam-date]').forEach((item) => {
    item.classList.toggle('exam-past', item.dataset.examDate < today);
    if (item.dataset.examDate === today) item.setAttribute('aria-current', 'date');
    else item.removeAttribute('aria-current');
  });
}

let lastMode;
function updateCountdown() {
  updateCalendars();
  const state = countdownState(Date.now());
  $('#days').textContent = String(state.days).padStart(2, '0');
  $('#hours').textContent = String(state.hours).padStart(2, '0');
  $('#minutes').textContent = String(state.minutes).padStart(2, '0');
  $('#seconds').textContent = String(state.seconds).padStart(2, '0');
  $('#countdown').setAttribute('aria-label', state.mode === 'waiting'
    ? `Faltan ${state.days} días, ${state.hours} horas, ${state.minutes} minutos y ${state.seconds} segundos para el 10 de diciembre.`
    : state.mode === 'today' ? 'Llegó el último día de exámenes.' : 'Modo vacaciones.');
  if (state.mode === lastMode) return;
  lastMode = state.mode;
  if (state.mode === 'today') {
    $('#countdown-title').innerHTML = 'Es hoy.<br><em>El último examen.</em>';
    $('#countdown-description').textContent = '10 de diciembre, por fin. Después me contás cómo te fue.';
    $('#countdown-status').textContent = 'Te mando un beso para antes de entrar. ♡';
  } else if (state.mode === 'vacations') {
    $('#countdown-title').innerHTML = 'Modo vacaciones.<br><em>Ahora, a descansar.</em>';
    $('#countdown-description').textContent = 'Ya pasó el 10 de diciembre. Por fin podés dejar los apuntes un rato.';
    $('#countdown-status').textContent = 'Bueno, ¿qué hacemos ahora? ☀';
  }
}
renderExamList();
updateCountdown();
setInterval(updateCountdown, 1000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) updateCountdown(); });

const letterButton = $('#open-letter');
const letter = $('#letter-content');
let opening = false;
letterButton.addEventListener('click', () => {
  if (opening) return;
  opening = true;
  letterButton.classList.remove('returning');
  letterButton.setAttribute('aria-expanded', 'true');
  letterButton.classList.add('opening');
  setTimeout(() => {
    letterButton.hidden = true;
    letter.classList.remove('closing');
    letter.hidden = false;
    letter.focus({ preventScroll: true });
    opening = false;
  }, reducedMotion.matches ? 0 : 500);
});
$('#close-letter').addEventListener('click', () => {
  if (opening) return;
  opening = true;
  letter.classList.add('closing');
  setTimeout(() => {
    letter.hidden = true;
    letter.classList.remove('closing');
    letterButton.hidden = false;
    letterButton.classList.remove('opening');
    letterButton.classList.add('returning');
    letterButton.setAttribute('aria-expanded', 'false');
    letterButton.focus({ preventScroll: true });
    opening = false;
  }, reducedMotion.matches ? 0 : 400);
});

document.querySelectorAll('.note').forEach((note) => {
  let turning = false;
  note.addEventListener('click', () => {
    if (turning) return;
    const open = note.getAttribute('aria-expanded') !== 'true';
    const showFace = () => {
      note.setAttribute('aria-expanded', String(open));
      note.querySelector('.note-back').setAttribute('aria-hidden', String(!open));
      note.querySelector('.note-front').setAttribute('aria-hidden', String(open));
      note.querySelector('.note-doodle').hidden = open;
    };
    if (reducedMotion.matches) {
      showFace();
      return;
    }
    turning = true;
    note.classList.add('turning-out');
    setTimeout(() => {
      showFace();
      note.classList.remove('turning-out');
      note.classList.add('turning-in');
      setTimeout(() => {
        note.classList.remove('turning-in');
        turning = false;
      }, 240);
    }, 180);
  });
});

function petals(count = 22, flowersAndHearts = false) {
  if (reducedMotion.matches) return;
  const container = $('#petals');
  const burst = [];
  const pastelColors = ['#d5a2ae', '#b6c3a4', '#e6c6a6', '#c8b9d5', '#a9d8d0', '#f0c4d8'];
  const brightColors = ['#e75288', '#ef795e', '#e8ad29', '#30a99e', '#9370d5', '#df629f'];
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    if (flowersAndHearts) {
      petal.className = 'petal symbol';
      petal.textContent = ['♡', '✿', '♥', '❀'][i % 4];
      petal.style.setProperty('--size', `${22 + Math.random() * 17}px`);
    } else {
      petal.className = i % 4 === 0 ? 'petal heart' : 'petal';
      if (i % 4 === 0) petal.textContent = '♡';
    }
    petal.style.setProperty('--x', `${Math.random() * 100}%`);
    const palette = i % 2 === 0 ? pastelColors : brightColors;
    petal.style.setProperty('--c', palette[Math.floor(Math.random() * palette.length)]);
    petal.style.setProperty('--duration', `${(flowersAndHearts ? 4 : 3) + Math.random() * 2}s`);
    petal.style.setProperty('--delay', `${Math.random() * (flowersAndHearts ? 1.6 : .7)}s`);
    petal.style.setProperty('--drift', `${Math.random() * 100 - 50}px`);
    container.append(petal);
    burst.push(petal);
  }
  // Cada toque conserva las lluvias anteriores y limpia solo su propia tanda.
  setTimeout(() => burst.forEach((petal) => petal.remove()), flowersAndHearts ? 8000 : 6000);
  // Mantener fluidez en el teléfono incluso con muchísimos toques seguidos.
  while (container.childElementCount > 900) container.firstElementChild.remove();
}

document.querySelectorAll('.love-button').forEach((button) => {
  let labelTimer;
  button.addEventListener('click', () => {
    button.classList.add('loved');
    clearTimeout(labelTimer);
    labelTimer = setTimeout(() => button.classList.remove('loved'), 3200);
    petals(36, true);
  });
});

$('#hug-button').addEventListener('click', () => {
  petals(72, true);
});

// El contenido permanece visible si el navegador no soporta esta animación.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  document.documentElement.classList.add('reveal-ready');
}

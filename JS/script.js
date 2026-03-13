const STORAGE_KEY = 'minha_lista_de_tarefas_v1';

const form = document.querySelector('#form');
const input = document.querySelector('#texto');
const lista = document.querySelector('#lista');
const msg = document.querySelector('#msg');
const counterEl = document.querySelector('#counter');
const lastAddedEl = document.querySelector('#lastAdded');

let tarefas = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas)); }

function updateCounter() {
  if (!counterEl) return; // counter removed from DOM — no-op
  counterEl.textContent = tarefas.length;
}

function render() {
  lista.innerHTML = '';
  tarefas.forEach((t, idx) => {
    const li = document.createElement('li');
    li.className = 'tarefa' + (t.done ? ' completed' : '');

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = t.text;
    // toggle done on click of text
    span.addEventListener('click', () => {
      t.done = !t.done;
      save();
      render();
    });

    const btn = document.createElement('button');
    btn.className = 'remove';
    btn.title = 'Remover';
    btn.textContent = '✕';
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      tarefas.splice(idx, 1);
      save();
      render();
    });

    li.appendChild(span);
    li.appendChild(btn);
    lista.appendChild(li);
  });
  updateCounter();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = (input.value || '').trim();
  if (!texto) {
    msg.textContent = 'Digite algo!';
    return;
  }
  msg.textContent = '';
  const tarefa = { text: texto, done: false };
  tarefas.push(tarefa);
  save();
  render();
  input.value = '';
  // show last added
  lastAddedEl.textContent = `Você adicionou: ${texto}`;
});

// initial render
render();
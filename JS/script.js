const tarefas = [];

const form = document.querySelector("#form");
const input = document.querySelector("#texto");
const lista = document.querySelector("#lista");
const msg = document.querySelector("#msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const texto = input.value;

  if (texto.trim() === "") {
    msg.textContent = "Digite algo!";
    msg.classList.add("error");
    return;
  }

  msg.textContent = "";
  msg.classList.remove("error");

  tarefas.push(texto);

  input.value = "";

  lista.innerHTML = "";

  tarefas.forEach(function (tarefa) {
    const li = document.createElement("li");
    li.textContent = tarefa;
    li.classList.add("tarefa");
    lista.appendChild(li);
  });
});
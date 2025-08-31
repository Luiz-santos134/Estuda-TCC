let frase = document.querySelector(".frase-motivacional");
let ultimaFrase = "";
gerarFrase();

function gerarFrase() {
  const frases = [
    "A vida é uma aventura ousada ou não é nada.",
    "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    "A felicidade não é algo pronto. Ela vem de suas próprias ações.",
    "A única maneira de fazer um excelente trabalho é amar o que você faz.",
    "A vida é 10% o que acontece conosco e 90% como reagimos a isso.",
  ];

  let novaFrase;
  do {
    novaFrase = frases[Math.floor(Math.random() * frases.length)];
  } while (novaFrase === ultimaFrase);

  ultimaFrase = novaFrase;
  if (frase) frase.innerText = novaFrase;
}

function excluirTarefa(index) {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  if (index >= 0 && index < tarefas.length) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      tarefas.splice(index, 1);
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
      atualizarListaTarefas();
    }
  }
}

function abrirModal() {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");

  modal.style.display = "flex";
  overlay.style.display = "block";

  document.body.classList.add("no-scroll");
}

function fecharModal() {
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");

  modal.style.display = "none";
  overlay.style.display = "none";

  document.body.classList.remove("no-scroll");
}

function enviarTH(event) {
    event.preventDefault();

    const input = document.getElementById("tituloTarefa");
    const titulo = input.value.trim();

    if (titulo === "") return;

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefas.push({ titulo: titulo, concluida: false });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    input.value = "";
    location.reload();
    fecharModal();
    atualizarListaTarefas();
    mostrarTarefas();
}

function atualizarListaTarefas() {
  const listaPendentes = document.querySelector("#listaTarefasPendentes");
  const listaConcluidas = document.querySelector(".tasksDones ul");

  if (listaPendentes) listaPendentes.innerHTML = "";
  if (listaConcluidas) listaConcluidas.innerHTML = "";

  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  let concluidas = 0;

  if (!tarefas.length) {
    const li = document.createElement("li");
    li.innerHTML = "<p>Nenhuma tarefa pendente.</p>";
    li.style.textAlign = "center";
    li.style.color = "#888";
    listaPendentes.appendChild(li);

    document.querySelector(".tasksPendentes h2 span").textContent = 0;
    document.querySelector(".tasksDones h2 span").textContent = 0;
    document.querySelector(".numTask").textContent = 0;
    document.querySelector(".numConcluidas").textContent = 0;
    document.querySelector(".numPendentes").textContent = 0;
    return;
  }

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");

    const taskItem = document.createElement("div");
    taskItem.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `tarefa_${index}`;
    checkbox.checked = tarefa.concluida;

    checkbox.addEventListener("change", () => {
      tarefas[index].concluida = checkbox.checked;
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
      atualizarListaTarefas();
    });

    const label = document.createElement("label");
    label.setAttribute("for", `tarefa_${index}`);
    label.textContent = tarefa.titulo;

    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.onclick = () => excluirTarefa(index);

    li.appendChild(taskItem);
    li.appendChild(deleteBtn);

    if (tarefa.concluida) {
      listaConcluidas.appendChild(li);
      concluidas++;
    } else {
      listaPendentes.appendChild(li);
    }
  });

  const numTask = tarefas.length;
  const numConcluidas = concluidas;
  const numPendentes = numTask - concluidas;

  document.querySelector(".tasksPendentes h2 span").textContent = numPendentes;
  document.querySelector(".tasksDones h2 span").textContent = numConcluidas;
  document.querySelector(".numTask").textContent = numTask;
  document.querySelector(".numConcluidas").textContent = numConcluidas;
  document.querySelector(".numPendentes").textContent = numPendentes;
}

window.addEventListener("load", function () {
  atualizarListaTarefas();
});

function limparTarefas() {
  if (confirm("Tem certeza que deseja excluir todas as tarefas?")) {
    localStorage.removeItem("tarefas");
    atualizarListaTarefas();
  }
}

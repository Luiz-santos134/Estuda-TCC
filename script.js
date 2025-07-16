let frase = document.querySelector('.frase-motivacional');
let ultimaFrase = "";

function gerarFrase() {
    const frases = [
        "A vida é uma aventura ousada ou não é nada.",
        "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
        "A felicidade não é algo pronto. Ela vem de suas próprias ações.",
        "A única maneira de fazer um excelente trabalho é amar o que você faz.",
        "A vida é 10% o que acontece conosco e 90% como reagimos a isso."
    ];

    let novaFrase;
    do {
        novaFrase = frases[Math.floor(Math.random() * frases.length)];
    } while (novaFrase === ultimaFrase);

    ultimaFrase = novaFrase;
    frase.innerText = novaFrase;
}

gerarFrase();

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
    event.preventDefault(); // impede o envio padrão do form

    const input = document.getElementById("tituloTarefa");
    const titulo = input.value.trim();

    if (titulo === "") return;

    // Recupera tarefas salvas (ou cria array vazio)
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    // Adiciona nova tarefa
    tarefas.push({ titulo: titulo });

    // Salva no localStorage
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    input.value = ""; // limpa o campo
    fecharModal(); // fecha o modal se quiser
    atualizarListaTarefas(); // função que você pode criar para mostrar na tela

    let tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
    console.log(tarefasSalvas);
}

function atualizarListaTarefas() {
    const lista = document.querySelector(".tasksPendentes ul");
    lista.innerHTML = ""; // limpa a lista antes de atualizar

    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `tarefa_${index}`;
        checkbox.name = `tarefa_${index}`;

        const label = document.createElement("label");
        label.setAttribute("for", `tarefa_${index}`);
        label.textContent = tarefa.titulo;

        li.appendChild(checkbox);
        li.appendChild(label);
        lista.appendChild(li);
    });

    // Atualiza o número de tarefas pendentes no título
    const contador = document.querySelector(".tasksPendentes h2 span");
    contador.textContent = tarefas.length;
}

console.log(localStorage.getItem("tarefas"));


document.addEventListener("DOMContentLoaded", () => {
    atualizarListaTarefas();
});

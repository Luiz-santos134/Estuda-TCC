let frase = document.querySelector('.frase-motivacional');
let ultimaFrase = "";
gerarFrase();
atualizarListaTarefas();

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
    tarefas.push({ titulo: titulo, concluida: false });

    // Salva no localStorage
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    input.value = ""; // limpa o campo
    fecharModal(); // fecha o modal se quiser
    atualizarListaTarefas(); // função que você pode criar para mostrar na tela
    mostrarTarefas()
}

function atualizarListaTarefas() {
    const lista = document.querySelector(".tasksPendentes ul");
    lista.innerHTML = "";

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    let concluidas = 0;

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement("li");

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

        li.appendChild(checkbox);
        li.appendChild(label);
        lista.appendChild(li);

        if (tarefa.concluida) concluidas++;
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

// Chama a função ao abrir a página
window.addEventListener("load", atualizarListaTarefas);

function mostrarTarefas() {
    const botao = document.getElementById("mostrarTasks");
    const limpar = document.getElementById("limpar");

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    if (tarefas.length === 0) {
        alert("Nenhuma tarefa pendente.");
        botao.style.display = "block";
        return;
    }
    else {
        botao.style.display = "none";
        limpar.style.display = "block";
    }
    atualizarListaTarefas();
}


// Função para limpar tudo
function limparTarefas() {
    localStorage.removeItem("tarefas");
    atualizarListaTarefas(); // Atualiza a lista após limpar
}
function gerarFrase() {
    const frases = [
        "A vida é uma aventura ousada ou não é nada.",
        "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
        "A felicidade não é algo pronto. Ela vem de suas próprias ações.",
        "A única maneira de fazer um excelente trabalho é amar o que você faz.",
        "A vida é 10% o que acontece conosco e 90% como reagimos a isso."
    ];

    document.querySelector('.frase-motivacional').innerText = frases[Math.floor(Math.random() * frases.length)];
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


function enviarTH(idBotao) {
    let container;
    if (idBotao === 'enviar_tarefa') {
        container = document.querySelector('.tarefasPendentes');
    } else if (idBotao === 'enviar_habito') {
        container = document.querySelector('.habitos_hoje');
    } else {
        return;
    }

    const modal = container.querySelector('.modal');
    const input = modal.querySelector('input');
    const valor = input.value.trim();

    function criarItem(valor, classe) {
        const novaDiv = document.createElement('div');
        novaDiv.classList.add(classe);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const p = document.createElement('p');
        p.innerText = valor;

        novaDiv.appendChild(checkbox);
        novaDiv.appendChild(p);

        return novaDiv;
    }

    if (idBotao === 'enviar_tarefa') {
        const itensTarefas = container.querySelector('.itens');
        const novaTarefa = criarItem(valor, 'tarefa');
        itensTarefas.appendChild(novaTarefa);
    } else if (idBotao === 'enviar_habito') {
        const itensHabitos = container.querySelector('.itensHabitos');
        const novoHabito = criarItem(valor, 'habitos');
        itensHabitos.appendChild(novoHabito);
    }

    console.log(`Tarefa/Hábito adicionado: ${valor}`);

    input.value = '';
    fecharModal(modal.querySelector('.fechar'));
}



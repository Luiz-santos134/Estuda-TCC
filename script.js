let btnMenu = document.querySelector('.menuBars');
let menu = document.querySelector('.menu');

menu.style.display = 'none';
menu.style.transform = 'translateX(-50px)';

function abrirMenu() {
    if (menu.style.display == 'none' || menu.style.display == '') {
        menu.style.display = 'block';
        menu.style.transition = 'transform 0.5s ease-in-out';
        menu.style.transform = 'translateX(-50px)'; // Começa fora da tela (ex: -100%)
        setTimeout(() => {
            menu.style.transform = 'translateX(0px)';
        }, 10); // Espera 10ms antes de aplicar o movimento
    } else {
        menu.style.transition = 'transform 0.5s ease-in-out';
        menu.style.transform = 'translateX(-50px)';
        setTimeout(() => {
            menu.style.display = 'none';
        }, 500); // Espera a animação acabar para esconder
    }
}

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

function abrirModal(idModal) {
    let container;
    if (idModal === 'addTarefas') {
        container = document.querySelector('.tarefasPendentes');
    } else if (idModal === 'addHabitos') {
        container = document.querySelector('.habitos_hoje');
    } else {
        return;
    }

    const modal = container.querySelector('.modal');
    modal.style.display = 'flex';
    modal.style.opacity = '1';

    const modal_content = modal.querySelector('.modal-content');
    const titulo = modal_content.querySelector('h2');
    const placeholder = modal_content.querySelector('input');

    if (idModal === 'addTarefas') {
        placeholder.placeholder = 'Digite a tarefa';
        titulo.innerText = 'Adicionar Tarefas';
        modal_content.style.backgroundColor = 'rgb(74, 85, 247)';
    } else if (idModal === 'addHabitos') {
        placeholder.placeholder = 'Digite o hábito';
        titulo.innerText = 'Adicionar Hábitos';
        modal_content.style.backgroundColor = 'red';
    }
}

function fecharModal(el) {
    const modal = el.closest('.modal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500);
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



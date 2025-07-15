// Atualizado para usar 5 questões por matéria em todas as condições
let Random = document.getElementById("Random");
let Enem = document.getElementById("Enem");
let Pas = document.getElementById("Pas");

let tipoSimulado = document.getElementById("tipoSimulado");
let estruturaSimulado = document.querySelector(".estruturaSimulado")
let folhaSimulado = document.querySelector(".FolhaSimulado")

let questaoAtual = null;
let questoesSelecionadas = [];
let questaoIndex = 0;
let acertos = 0;

let alterUm = document.getElementById("alterUm")
let alterDois = document.getElementById("alterDois")
let alterTres = document.getElementById("alterTres")
let alterQuatro = document.getElementById("alterQuatro")

let main = document.querySelector('main');
const materias = document.querySelectorAll('.materia input');
let numPorcent = document.getElementById("numPorcent");

function sortearAleatorios(lista, quantidade) {
    const embaralhado = [...lista].sort(() => Math.random() - 0.5);
    return embaralhado.slice(0, quantidade);
}

function gerarSimulado() {
    estruturaSimulado.style.display = "none";
    folhaSimulado.style.display = "flex";
    main.style.transform = 'translateY(-2%)';

    questoesSelecionadas = [];
    questaoIndex = 0;
    acertos = 0;

    let materiasEscolhidas = [];
    for (let i = 0; i < materias.length; i++) {
        if (materias[i].checked) {
            materiasEscolhidas.push(materias[i].value);
            materias[i].checked = false;
        }
    }

    if (materiasEscolhidas.length < 2) {
        alert("Selecione pelo menos duas matérias");
        estruturaSimulado.style.display = "flex";
        folhaSimulado.style.display = "none";
        return;
    }

    let base = null;
    if (Random.checked) {
        tipoSimulado.innerText = 'Aleatórias';
        base = 'aleatorias';
    } else if (Enem.checked) {
        tipoSimulado.innerText = 'ENEM';
        base = 'enem';
    } else if (Pas.checked) {
        tipoSimulado.innerText = 'PAS';
        base = 'pas';
    } else {
        alert('Selecione um tipo de simulado');
        estruturaSimulado.style.display = "flex";
        folhaSimulado.style.display = "none";
        return;
    }

    fetch('questoes.json')
    .then(res => res.json())
    .then(bancoQuestoes => {
        const porMateria = 5;
        const totalQuestoes = materiasEscolhidas.length * porMateria;

        materiasEscolhidas.forEach((materia) => {
            if (bancoQuestoes[base][materia]) {
                let questoes = bancoQuestoes[base][materia];
                let sorteadas = sortearAleatorios(questoes, porMateria);
                questoesSelecionadas.push(...sorteadas);
            }
        });

        // Embaralha todas as questões
        questoesSelecionadas = sortearAleatorios(questoesSelecionadas, questoesSelecionadas.length);

        mostrarQuestao();
    });
}

function mostrarQuestao() {
    if (questaoIndex >= questoesSelecionadas.length) {
        alert("Simulado finalizado! Você acertou " + acertos + " de " + questoesSelecionadas.length + " questões.");

        estruturaSimulado.style.display = "flex";
        folhaSimulado.style.display = "none";

        numPorcent.innerText = ((acertos / questoesSelecionadas.length) * 100).toFixed(0);
        return;
        //tenho que salvar o numporcent para mostrar na pagina do simulado, e tenho que gerar o resumo do simulado
    }

    questaoAtual = questoesSelecionadas[questaoIndex];

    document.querySelector(".FolhaSimulado p span").innerText = questaoIndex + 1;
    document.getElementById("Pergunta").innerText = questaoAtual.pergunta;
    alterUm.innerText = questaoAtual.alternativas[0];
    alterDois.innerText = questaoAtual.alternativas[1];
    alterTres.innerText = questaoAtual.alternativas[2];
    alterQuatro.innerText = questaoAtual.alternativas[3];
}

function responder(id) {
    const botaoClicado = document.getElementById(id);
    const respostaEscolhida = botaoClicado.innerText;

    if (!questaoAtual) return;

    const correta = questaoAtual.resposta;

    if (respostaEscolhida === correta) {
        botaoClicado.style.backgroundColor = "green";
        acertos++;
    } else {
        botaoClicado.style.backgroundColor = "red";
        [alterUm, alterDois, alterTres, alterQuatro].forEach(btn => {
            if (btn.innerText === correta) btn.style.backgroundColor = "green";
        });
    }

    setTimeout(() => {
        botaoClicado.style.backgroundColor = "";
        [alterUm, alterDois, alterTres, alterQuatro].forEach(btn => {
            btn.style.backgroundColor = "";
        });
        questaoIndex++;
        mostrarQuestao();
    }, 1000);
}

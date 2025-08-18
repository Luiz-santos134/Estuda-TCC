let Random = document.getElementById("Random");
let Enem = document.getElementById("Enem");
let Pas = document.getElementById("Pas");

let tipoSimulado = document.getElementById("tipoSimulado");
let estruturaSimulado = document.querySelector(".estruturaSimulado");
let folhaSimulado = document.querySelector(".FolhaSimulado");
let content = document.querySelector(".content");

let questaoAtual = null;
let questoesSelecionadas = [];
let questaoIndex = 0;
let acertos = 0;

let alterUm = document.getElementById("alterUm");
let alterDois = document.getElementById("alterDois");
let alterTres = document.getElementById("alterTres");
let alterQuatro = document.getElementById("alterQuatro");

let main = document.querySelector('main');
const materias = document.querySelectorAll('.materia input');
let numPorcent = document.getElementById("numPorcent");

let materiasEscolhidas = [];

let tempoInicio = null;
let timerInterval;
let segundosDecorridos = 0;

function sortearAleatorios(lista, quantidade) {
    const embaralhado = [...lista].sort(() => Math.random() - 0.5);
    return embaralhado.slice(0, quantidade);
}

function gerarSimulado() {
    tempoInicio = new Date(); // Inicia o cronômetro
    iniciarTemporizador();
    estruturaSimulado.style.display = "none";
    content.style.display = "none";
    folhaSimulado.style.display = "flex";
    main.style.transform = 'translateY(-2%)';

    questoesSelecionadas = [];
    questaoIndex = 0;
    acertos = 0;
    materiasEscolhidas = [];

    const TOTAL_QUESTOES = parseInt(document.getElementById("numQuestoes").value);

    for (let i = 0; i < materias.length; i++) {
        if (materias[i].checked) {
            materiasEscolhidas.push(materias[i].value);
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
            const QUESTOES_POR_MATERIA = Math.floor(TOTAL_QUESTOES / materiasEscolhidas.length);

            materiasEscolhidas.forEach((materia) => {
                if (bancoQuestoes[base][materia]) {
                    let questoes = bancoQuestoes[base][materia];
                    let sorteadas = sortearAleatorios(questoes, QUESTOES_POR_MATERIA);
                    questoesSelecionadas.push(...sorteadas);
                }
            });

            // Completa o total com questões aleatórias, se precisar
            if (questoesSelecionadas.length < TOTAL_QUESTOES) {
                const faltam = TOTAL_QUESTOES - questoesSelecionadas.length;
                const todasQuestoes = materiasEscolhidas.flatMap(materia => bancoQuestoes[base][materia] || []);
                const extras = sortearAleatorios(todasQuestoes, faltam);
                questoesSelecionadas.push(...extras);
            }
            questoesSelecionadas = sortearAleatorios(questoesSelecionadas, TOTAL_QUESTOES);
            
            document.getElementById("totalQuestoes").textContent = questoesSelecionadas.length;
            
            mostrarQuestao();
        });
}

function mostrarQuestao() {
    if (questaoIndex >= questoesSelecionadas.length) {
        const tempoFim = new Date();
        const tempoDecorrido = Math.floor((tempoFim - tempoInicio) / 1000); // em segundos
        
        let porcentagem = ((acertos / questoesSelecionadas.length) * 100).toFixed(0);
        
        estruturaSimulado.style.display = "flex";
        folhaSimulado.style.display = "none";
        numPorcent.innerText = porcentagem;

        adicionarTarefaFeita(porcentagem, tipoSimulado.innerText, materiasEscolhidas, tempoDecorrido);
        
        alert(`Simulado finalizado em ${formatarTempo(tempoDecorrido)}! Você acertou ${acertos} de ${questoesSelecionadas.length} questões.`);
        return;
    }

    questaoAtual = questoesSelecionadas[questaoIndex];

    const configSimu = document.querySelector('.configSimu');
    if (configSimu) {
        configSimu.style.display = 'flex';
        configSimu.style.justifyContent = 'space-between';
        configSimu.style.alignItems = 'center';
        configSimu.style.width = '100%';
        configSimu.style.padding = '10px 15px';
        configSimu.style.marginBottom = '20px';
    }
    document.getElementById("questaoAtual").innerText = questaoIndex + 1;
    document.getElementById("Pergunta").innerText = questaoAtual.pergunta;
    alterUm.innerText = questaoAtual.alternativas[0];
    alterDois.innerText = questaoAtual.alternativas[1];
    alterTres.innerText = questaoAtual.alternativas[2];
    alterQuatro.innerText = questaoAtual.alternativas[3];
}

function adicionarTarefaFeita(porcentagem, tipo, materias, tempoDecorrido) {
    const listaFeitos = document.querySelector(".feitos ul");
    const tempoFormatado = formatarTempo(tempoDecorrido);
    const qtdErros = questoesSelecionadas.length - acertos;

    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    let simuladosFinalizados = JSON.parse(localStorage.getItem('simuladosFinalizados')) || [];

    const novoSimulado = {
        porcentagem: porcentagem,
        data: dataFormatada,
        tipo: tipo,
        materias: materias,
        tempo: tempoFormatado  // Adiciona o tempo formatado
    };

    simuladosFinalizados.push(novoSimulado);
    localStorage.setItem('simuladosFinalizados', JSON.stringify(simuladosFinalizados));

    listaFeitos.innerHTML = '';
    simuladosFinalizados.forEach(simulado => {
        const li = document.createElement('li');
        li.innerHTML = `
            <p>
                ${simulado.data} - ${simulado.tipo} | 
                Acertos: ${simulado.porcentagem}% | 
                Tempo: ${simulado.tempo} | 
                Matérias: ${simulado.materias.join(', ')}
            </p>`;
        listaFeitos.appendChild(li);
    });
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

function iniciarTemporizador() {
    segundosDecorridos = 0;
    atualizarTempoDisplay();
    timerInterval = setInterval(() => {
        segundosDecorridos++;
        atualizarTempoDisplay();
    }, 1000);
}

function pararTemporizador() {
    clearInterval(timerInterval);
}

function atualizarTempoDisplay() {
    const minutos = Math.floor(segundosDecorridos / 60);
    const segundos = segundosDecorridos % 60;
    document.getElementById("tempoDecorrido").textContent = 
        `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}m ${segundosRestantes}s`;
}

function voltarParaConfiguracao() {
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    const listaFeitos = document.querySelector(".feitos ul");
    let simuladosFinalizados = JSON.parse(localStorage.getItem('simuladosFinalizados')) || [];
    listaFeitos.innerHTML = '';
    simuladosFinalizados.forEach(simulado => {
        const li = document.createElement('li');
        li.innerHTML = `
            <p>
                ${simulado.data} - ${simulado.tipo} | 
                Acertos: ${simulado.porcentagem}% | 
                Tempo: ${simulado.tempo || 'N/A'} | 
                Matérias: ${simulado.materias.join(', ')}
            </p>`;
        listaFeitos.appendChild(li);
    });
});
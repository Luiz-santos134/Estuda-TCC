let Random = document.getElementById("Random");
let Enem = document.getElementById("Enem");
let Pas = document.getElementById("Pas");

let tipoSimulado = document.getElementById("tipoSimulado");
let Pergunta = document.getElementById("Pergunta").value;

let estruturaSimulado = document.querySelector(".estruturaSimulado")
let folhaSimulado = document.querySelector(".FolhaSimulado")

let alterUm = document.getElementById("alterUm")
let alterDois = document.getElementById("alterDois")
let alterTres = document.getElementById("alterTres")
let alterQuatro = document.getElementById("alterQuatro")

let main = document.querySelector('main');

const materias = document.querySelectorAll('.materia input');

function gerarSimulado() {

    estruturaSimulado.style.display = "none";
    folhaSimulado.style.display = "flex";

    main.style.transform = 'translateY(-2%)';

    // main.innerHTML = `
    //     <div class="FolhaSimulado">
    //         <p>Questão <span>1</span> de 10</p>
    //         <p>Questões do <span id="tipoSimulado"></span>:</p>
    //         <p id="Pergunta">Quanto é 2x2?</p>

    //         <div class="respostas">
    //             <button class="resposta" onclick="responder(1)">A) 4</button>
    //             <button class="resposta" onclick="responder(2)">B) 5</button>
    //             <button class="resposta" onclick="responder(3)">C) 6</button>
    //             <button class="resposta" onclick="responder(4)">D) 7</button>
    //         </div>
    //     </div>
    // `;

    let materiasEscolhidas = [];

    if (Random.checked) {
        console.log('🎲 Random selecionado');

        for (let i = 0; i < materias.length; i++) {
            materiasEscolhidas.push(materias[i].value);
            materias[i].checked = false; // desmarca todas
        }

        // Sorteia 5 matérias
        function sortearAleatorios(lista, quantidade) {
            const embaralhado = lista.sort(() => Math.random() - 0.5);
            return embaralhado.slice(0, quantidade);
        }

        const sorteadas = sortearAleatorios(materiasEscolhidas, 5);
        materiasEscolhidas = sorteadas;

        tipoSimulado.innerText = 'Aleatórias';
        console.log("🎯 Matérias sorteadas:", materiasEscolhidas);

        fetch('questoes.json')
        .then(res => res.json())
        .then(bancoQuestoes => {
            const todasQuestoes = [];

            // materiasEscolhidas deve existir e estar preenchida
            materiasEscolhidas.forEach(materia => {
            if (bancoQuestoes.aleatorias[materia]) {
                todasQuestoes.push(...bancoQuestoes.aleatorias[materia]);
            }
            });

            // Sorteia uma questão aleatória entre todas as selecionadas
            const questao = todasQuestoes[Math.floor(Math.random() * todasQuestoes.length)];

            // Atualiza a pergunta e as alternativas
            document.getElementById("Pergunta").innerText = questao.pergunta;
            document.getElementById("alterUm").innerText = questao.alternativas[0];
            document.getElementById("alterDois").innerText = questao.alternativas[1];
            document.getElementById("alterTres").innerText = questao.alternativas[2];
            document.getElementById("alterQuatro").innerText = questao.alternativas[3];
        });


        return;
    }
    
    if (Enem.checked) {
        console.log('📘 ENEM selecionado');

        let algumaMateriaSelecionada = false;
        for (let i = 0; i < materias.length; i++) {
            const input = materias[i];
            if (input.checked) {
                algumaMateriaSelecionada = true;
                materiasEscolhidas.push(input.value);
            }
        }

        if (!algumaMateriaSelecionada) {
            alert('Selecione pelo menos uma matéria');
            console.log('Nenhuma matéria foi marcada');
            return;
        }

        tipoSimulado.innerText = 'ENEM';
        console.log("🎯 Matérias escolhidas:", materiasEscolhidas);

        fetch('questoes.json')
        .then(res => res.json())
        .then(bancoQuestoes => {
            const todasQuestoes = [];

            materiasEscolhidas.forEach(materia => {
            if (bancoQuestoes.enem[materia]) {
                todasQuestoes.push(...bancoQuestoes.enem[materia]); // adiciona todas as questões dessa matéria
            }
            });

            // Sorteia uma questão aleatória entre todas as selecionadas
            const questao = todasQuestoes[Math.floor(Math.random() * todasQuestoes.length)];

            document.getElementById("Pergunta").innerText = questao.pergunta;
        });
    } else if (Pas.checked) {
        console.log('📗 PAS selecionado');

        let algumaMateriaSelecionada = false;
        for (let i = 0; i < materias.length; i++) {
            const input = materias[i];
            if (input.checked) {
                algumaMateriaSelecionada = true;
                materiasEscolhidas.push(input.value);
            }
        }

        if (!algumaMateriaSelecionada) {
            alert('Selecione pelo menos uma matéria');
            console.log('Nenhuma matéria foi marcada');
            return;
        }

        tipoSimulado.innerText = 'PAS';
        console.log("🎯 Matérias escolhidas:", materiasEscolhidas);

        fetch('questoes.json')
        .then(res => res.json())
        .then(bancoQuestoes => {
            const todasQuestoes = [];

            materiasEscolhidas.forEach(materia => {
            if (bancoQuestoes.pas[materia]) {
                todasQuestoes.push(...bancoQuestoes.pas[materia]); // adiciona todas as questões dessa matéria
            }
            });

            // Sorteia uma questão aleatória entre todas as selecionadas
            const questao = todasQuestoes[Math.floor(Math.random() * todasQuestoes.length)];

            document.getElementById("Pergunta").innerText = questao.pergunta;
        });

    } else {
        alert('Selecione um tipo de simulado');
        console.log('Nenhum simulado selecionado');
        return;
    }
}


// adicionar a opcao de escolher as materias de forma aleatória, e escolher
// o numero de questões


let numPorcent = document.getElementById("numPorcent");
let acertos = 5

numPorcent.innerText = (acertos/10)*100
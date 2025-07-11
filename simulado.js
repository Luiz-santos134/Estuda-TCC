let Random = document.getElementById("Random");
let Enem = document.getElementById("Enem");
let Pas = document.getElementById("Pas");
let tipoSimulado = document.getElementById("tipoSimulado");
let Pergunta = document.getElementById("Pergunta").value;
let estruturaSimulado = document.querySelector(".estruturaSimulado")
let folhaSimulado = document.querySelector(".FolhaSimulado")

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

        tipoSimulado.innerText = 'Aleatório';
        console.log("🎯 Matérias sorteadas:", materiasEscolhidas);

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
            const questoesMatEnem = bancoQuestoes.enem.matematica;
            const questao = questoesMatEnem[Math.floor(Math.random() * questoesMatEnem.length)];
            document.getElementById("Pergunta").innerText = questao.pergunta;
            // console.log(questao.pergunta);
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
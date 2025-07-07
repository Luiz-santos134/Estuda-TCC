let Random = document.getElementById("Random");
let Enem = document.getElementById("Enem");
let Pas = document.getElementById("Pas");

let main = document.querySelector('main');

const materias = document.querySelectorAll('.materia input');

function gerarSimulado() {

    main.style.transform = 'translateY(-2%)';

    main.innerHTML = `
    <div class="FolhaSimulado">
            <h2>Simulado</h2>
            <ul>
                <li>Matéria 1</li>
                <li>Matéria 2</li>
                <li>Matéria 3</li>
                <li>Matéria 4</li>
                <li>Matéria 5</li>
            </ul>
        </div>
    `;

    const materiasEscolhidas = []

    if (Enem.checked) {
        console.log('Enem selecionado');
    }else if (Pas.checked) {
        console.log('Pas selecionado');
    }else if (Random.checked) {
        console.log('Random selecionado');

        for (let i = 0; i < materias.length; i++) {
            const input = materias[i];
            if (input.checked) {
                input.checked = false; // Desmarca a matéria
            }
        }

        for (let i = 0; i < materias.length; i++) {
            const input = materias[i];
            if (!input.checked) {
                materiasEscolhidas.push(input.value);
            }
        }

        function sortearAleatorios(lista, quantidade) {
            const embaralhado = lista.sort(() => Math.random() - 0.5);
            return embaralhado.slice(0, quantidade);
        }

        const sorteadas = sortearAleatorios(materiasEscolhidas, 5);

        console.log("🎯 Matérias sorteadas:");
        console.log(sorteadas);
        
    }else{
        alert('Selecione um tipo de simulado');
        console.log('Nenhum simulado selecionado');
        return;
    }

    // for (let i = 0; i < materias.length; i++) {
    //     const input = materias[i];
    //     if (input.checked) {
    //         console.log('Selecionado:', input.value);
    //         materiasEscolhidas.push(input.value);
    //     }
    //     console.log('Materias Escolhidas:', materiasEscolhidas);
    // }
}

// adicionar a opcao de escolher as materias de forma aleatória, e escolher
// o numero de questões


let numPorcent = document.getElementById("numPorcent");
let acertos = 5

numPorcent.innerText = (acertos/10)*100
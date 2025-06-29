let IA = document.getElementById("usarIA");
let Enem = document.getElementById("Enem");
let Pas = document.getElementById("Pas");

const materias = document.querySelectorAll('.materia input');

function gerarSimulado() {

    let materiasEscolhidas = []

    for (let i = 0; i < materias.length; i++) {
        const input = materias[i];
        if (input.checked) {
            console.log('Selecionado:', input.value);
            materiasEscolhidas.push(input.value);
        }
        console.log('Materias Escolhidas:', materiasEscolhidas);
    }
}

// adicionar a opcao de escolher as naterias de forma aleatória, e escolher
// o numero de questões

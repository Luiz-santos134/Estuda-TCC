let modalCriarTurma = document.querySelector('.modalCriarTurma')
let meioContent = document.querySelector('.meio');
let inputNome = document.querySelector('.container label #nomeTurma');
let inputMateria = document.querySelector('.container label #materiaTurma');


function fecharModal(id) {
    if (id == "fecharModalTurma") {
        modalCriarTurma.style.display = "none";
    }
}

function abrirModal(id){
    inputNome.value='';
    inputMateria.value='';

    let inputImgMateria = document.querySelector('.container label #imgMateria');
    inputImgMateria.value='';

    let inputImgMateriaPrevia = document.querySelector('.container #imgPrevia');
    inputImgMateriaPrevia.src=''
    
    if(id == "criarTurma"){
        modalCriarTurma.style.display = "flex";
        document.querySelector('body').style.overflow ='hidden';
    }
}

function infosModal() {
    const imgPrevia = document.getElementById('imgPrevia');
    const imgFile = document.getElementById('imgMateria');
    const arquivo = imgFile.files && imgFile.files[0];

    if (!arquivo) {
        console.warn('Nenhum arquivo selecionado.');
        imgPrevia.src = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        imgPrevia.src = e.target.result; // Data URL (permanente)
    };
    reader.onerror = function (err) {
        console.error('Erro ao ler o arquivo com FileReader', err);
    };
    reader.readAsDataURL(arquivo);

}

function creatTurma(identify){
    if(identify == 'creatTurma'){
        const imgPrevia = document.getElementById('imgPrevia'); 
        
        if (!imgPrevia) {
            console.error('Elemento #imgPrevia não encontrado em creatTurma.');
            return;
        }

        modalCriarTurma.style.display = 'none';

        let turmaCriadaDiv = document.createElement('div');
        turmaCriadaDiv.classList='turmaCriada';
        let imagemTurma = document.createElement('img');
        imagemTurma.classList='imagemTurmaCriada';
        imagemTurma.src = imgPrevia.src; 
        let tituloTurma = document.createElement('p');
        tituloTurma.classList='tituloTurma';
        tituloTurma.textContent = inputNome.value;
        
        turmaCriadaDiv.appendChild(imagemTurma);
        turmaCriadaDiv.appendChild(tituloTurma)
        meioContent.appendChild(turmaCriadaDiv);
    }
}


document.getElementById('imgMateria').addEventListener('change', infosModal);

window.addEventListener("load", function () {
    let user = JSON.parse(this.localStorage.getItem(""))
    let meio = this.document.querySelector('.meio')

    if (meio.textContent === "") {
        meio.style.justifyContent = 'center'
        let p = document.createElement('p');
        p.textContent = "Você não está em nenhuma Turma";
        meio.appendChild(p);
    }
    
});
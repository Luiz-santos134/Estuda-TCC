let modalCriarTurma = document.querySelector('.modalCriarTurma');
let modalEntrarTurma = document.querySelector('.modalEntrarTurma');
let meioContent = document.querySelector('.meio');
let inputNome = document.querySelector('.container label #nomeTurma');
let inputMateria = document.querySelector('.container label #materiaTurma');
let identifyTurma = Math.floor(1000 + Math.random() * 9000).toString();

// === Carregar turmas existentes ===
let turmas = JSON.parse(localStorage.getItem("turmas") || "[]");
renderTurmas();

function fecharModalTurma(id) {
    
    if (id == 'fecharModalTurmaEntrar'){
        modalEntrarTurma.style.display = "none";
    }
    else if (id == 'fecharModalTurma'){
        modalCriarTurma.style.display = "none";
    }

    document.body.style.overflow = 'auto';
}

function abrirModalTurma(id){
    inputNome.value='';
    inputMateria.value='';
    let inputImgMateria = document.querySelector('.container label #imgMateria');
    inputImgMateria.value='';
    let inputImgMateriaPrevia = document.querySelector('.container #imgPrevia');
    inputImgMateriaPrevia.src='';

    let idTurma = document.getElementById('idTurma');
    if (!idTurma) {
        console.error("Element with id 'idTurma' not found in the DOM.");
        return;
    }
    
    if(id == "criarTurma"){
        modalCriarTurma.style.display = "flex";
        document.body.style.overflow ='hidden';

        idTurma.textContent = identifyTurma;
    }

    if(id == 'entrarTurma'){
        modalEntrarTurma.style.display = "flex";
        document.body.style.overflow ='hidden';
    }
}

function infosModal() {
    const imgPrevia = document.getElementById('imgPrevia');
    const imgFile = document.getElementById('imgMateria');
    const arquivo = imgFile.files && imgFile.files[0];

    if (!arquivo) {
        imgPrevia.src = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        imgPrevia.src = e.target.result;
    };
    reader.readAsDataURL(arquivo);
}

document.getElementById('imgMateria').addEventListener('change', infosModal);

function creatTurma(identify) {
    if (identify == 'creatTurma') {
        const imgPrevia = document.getElementById('imgPrevia'); 
        if (!imgPrevia) return alert('Erro ao criar turma.');

        if (!inputNome.value || !inputMateria.value)
            return alert("Preencha o nome e a matéria!");

        modalCriarTurma.style.display = 'none';
        document.body.style.overflow = 'auto';

        let imagemFinal = imgPrevia.src && imgPrevia.src.startsWith("data:image")
            ? imgPrevia.src
            : `${window.location.origin}/imgCurso.svg`;


        let novaTurma = {
            id: identifyTurma,
            nome: inputNome.value,
            materia: inputMateria.value,
            imagem: imagemFinal
        };

        turmas.push(novaTurma);
        localStorage.setItem("turmas", JSON.stringify(turmas));

        renderTurmas();
    }

    if (identify == 'entrarTurma') {
        // lógica de entrar na turma ainda será feita
    }
}

function renderTurmas() {
    meioContent.innerHTML = '';

    if (turmas.length === 0) {
        meioContent.style.justifyContent = 'center';
        let p = document.createElement('p');
        p.textContent = "Você não está em nenhuma Turma";
        meioContent.appendChild(p);
        return;
    }
    meioContent.style.justifyContent = 'flex-start';
    
    turmas.forEach(t => {
        let turmaCriadaDiv = document.createElement('div');
        turmaCriadaDiv.classList.add('turmaCriada');

        let imagemTurma = document.createElement('img');
        imagemTurma.classList.add('imagemTurmaCriada');
        imagemTurma.src = t.imagem;

        let tituloTurma = document.createElement('p');
        tituloTurma.classList.add('tituloTurma');
        tituloTurma.textContent = t.nome;

        let nomeMateriaVw = document.createElement('p');
        nomeMateriaVw.classList.add('nomeMateriaView');
        nomeMateriaVw.textContent = t.materia;

        // Exibir ID da turma
        let idTurmaVw = document.createElement('p');
        idTurmaVw.classList.add('idTurmaView');
        idTurmaVw.textContent = "ID: " + t.id;

        let infosTurmaCriada = document.createElement('div');
        infosTurmaCriada.classList.add('infosTurmaCriada');

        
        infosTurmaCriada.appendChild(tituloTurma);
        infosTurmaCriada.appendChild(idTurmaVw);

        turmaCriadaDiv.appendChild(imagemTurma);
        turmaCriadaDiv.appendChild(infosTurmaCriada);
        turmaCriadaDiv.appendChild(nomeMateriaVw);

        meioContent.appendChild(turmaCriadaDiv);
    });
}

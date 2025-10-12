let modalCriarTurma = document.querySelector('.modalCriarTurma')

function fecharModal(id) {
    if (id == "fecharModalTurma") {
        modalCriarTurma.style.display = "none";
    }
}

function abrirModal(id){
    if(id == "criarTurma"){
        modalCriarTurma.style.display = "flex";
        document.querySelector('body').style.overflow ='hidden';
    }
}
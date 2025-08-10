document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll(".menu-link");
    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    let areaSimuladosFeitos = document.querySelector('.feitos');

    if (areaSimuladosFeitos && areaSimuladosFeitos.textContent.trim() === ""){
        areaSimuladosFeitos.innerHTML = `
            <i class="fas fa-file-alt"></i>
            Nenhum simulado realizado ainda.
            <br>
            Que tal fazer o primeiro?
             `
    }

    const imgPerfil = document.getElementById('foto_perfil');
    const fotoSalva = localStorage.getItem('fotoPerfil');

    if (fotoSalva) {
        imgPerfil.src = fotoSalva;
    }

    atualizarListaHome();
    atualizarSimuladoHome();
});


function atualizarListaHome() {
    const lista = document.querySelector(".tarefasPendentes .itens");
    if (!lista){ 
        return;
    }else{
        document.getElementById("fraseSumir").style.display = "none";
    }
    lista.innerHTML = "";

    let tarefas = [];
    try {
        tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    } catch (e) {
        tarefas = [];
    }
    let concluidas = 0;

    // Pega só as 3 primeiras
    let primeirasTarefas = tarefas.slice(0, 3);

    primeirasTarefas.forEach((tarefa, index) => {
        if (!tarefa || !tarefa.titulo) return; // Evita erro se tarefa nao existir
        const divTarefa = document.createElement("div");
        divTarefa.classList.add("tarefa");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefa.concluida || false;

        checkbox.addEventListener("change", () => {
            // Pega pelo índice no array 
            const posicao = tarefas.findIndex(t => t.titulo === tarefa.titulo);
            if (posicao > -1) {
                tarefas[posicao].concluida = checkbox.checked;
                localStorage.setItem("tarefas", JSON.stringify(tarefas));
                atualizarListaHome();
            }
        });

        const p = document.createElement("p");
        p.textContent = tarefa.titulo;

        divTarefa.appendChild(checkbox);
        divTarefa.appendChild(p);
        lista.appendChild(divTarefa);

        if (tarefa.concluida) concluidas++;
    });

    let tasksConcluidas = 0;
    
    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].concluida == true){
            tasksConcluidas++
            console.log(tasksConcluidas)
        }
    }

    const numTaskElem = document.querySelector(".numTask");
    if (numTaskElem) numTaskElem.textContent = tasksConcluidas;
}

function atualizarSimuladoHome(){
    let simulado = JSON.parse(localStorage.getItem("simuladosFinalizados")) || [];
    const NumeSimulado = document.querySelector(".numSimulado");
    NumeSimulado.textContent = simulado.length;
}

let modal = document.querySelector(".modalOpcoesProvas")
modal.style.display = "none";

function abrirOpcoesProvas(){
    if (!modal) return;
    if(modal.style.display == "none") {
        modal.style.display = "flex";
        document.querySelector("body").style.overflow = "hidden"
    }
    else if(modal.style.display == "flex"){
        modal.style.display = "none";
        document.querySelector("body").style.overflow = "auto"
    } 
}
document.addEventListener("DOMContentLoaded", () => {
    // ======== Ativa o link do menu ========
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll(".menu-link");
    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // ======== Mensagem de simulados feitos ========
    let areaSimuladosFeitos = document.querySelector('.feitos');
    if (areaSimuladosFeitos && areaSimuladosFeitos.textContent.trim() === "") {
        areaSimuladosFeitos.innerHTML = `
            <i class="fas fa-file-alt"></i>
            Nenhum simulado realizado ainda.
            <br>
            Que tal fazer o primeiro?
        `;
    }

    // ======== Checa usuário logado apenas em páginas que requerem login ========
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
    const bodyRequerLogin = document.body.classList.contains("requer-login");

    if (bodyRequerLogin && !usuarioSalvo) {
        console.log("Nenhum usuário logado");
        window.location.href = "login.html";
    }

    // ======== Atualiza informações do perfil se houver usuário ========
    if (usuarioSalvo) {
        const elementoNome = document.querySelector('.infoPerfil p');
        if (elementoNome) {
            elementoNome.textContent = usuarioSalvo.nome;
        }

        const imgPerfil = document.getElementById('img_perfil');
        if (imgPerfil) {
            const fotoSalva = localStorage.getItem('fotoPerfil');
            if (fotoSalva) {
                imgPerfil.src = fotoSalva;
            }
        }
    }

    // ======== Atualizações da home ========
    atualizarListaHome();
    atualizarSimuladoHome();
});

// ================= Função para atualizar lista de tarefas na home =================
function atualizarListaHome() {
    const lista = document.querySelector(".tarefasPendentes .itens");
    const fraseSumir = document.getElementById("fraseSumir");
    
    if (!lista) return;

    lista.innerHTML = "";

    let tarefas = [];
    try {
        tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    } catch (e) {
        tarefas = [];
    }

    if (tarefas.length === 0 && fraseSumir) {
        fraseSumir.style.display = "block";
    } else if (fraseSumir) {
        fraseSumir.style.display = "none";
    }

    let concluidas = 0;

    // Pega só as 3 primeiras tarefas
    let primeirasTarefas = tarefas.slice(0, 3);

    primeirasTarefas.forEach((tarefa, index) => {
        if (!tarefa || !tarefa.titulo) return;
        
        const divTarefa = document.createElement("div");
        divTarefa.classList.add("tarefa");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefa.concluida || false;

        checkbox.addEventListener("change", () => {
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

    const numTaskElem = document.querySelector(".numTask");
    if (numTaskElem) numTaskElem.textContent = concluidas;
}

// ================= Função para atualizar simulados =================
function atualizarSimuladoHome() {
    let simulado = JSON.parse(localStorage.getItem("simuladosFinalizados")) || [];
    const NumeSimulado = document.querySelector(".numSimulado");
    if (NumeSimulado) NumeSimulado.textContent = simulado.length;
}

// ================= Modais =================
let modalProvas = document.querySelector(".modalOpcoesProvas");
if (modalProvas) modalProvas.style.display = "none";

function abrirOpcoesProvas() {
    if (!modalProvas) return;

    if (modalProvas.style.display === "none") {
        modalProvas.style.display = "flex";
        document.body.style.overflow = "hidden";
    } else {
        modalProvas.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

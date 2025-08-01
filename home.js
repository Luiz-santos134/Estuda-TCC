const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll(".menu-link");
    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

let areaSimuladosFeitos = document.querySelector('.feitos')

if (areaSimuladosFeitos.textContent.trim() === ""){
    areaSimuladosFeitos.innerHTML = `
        <i class="fas fa-file-alt"></i>
        Nenhum simulado realizado ainda.
        <br>
        Que tal fazer o primeiro?
         `
}


function alternarTema(tema) {
    const root = document.documentElement;

    if (tema === "claro") {
        root.classList.add("tema-claro");
        document.getElementById("temaClaro").style.display = "none";
        document.getElementById("temaEscuro").style.display = "block";
        temaAtual = "claro";
    } else {
        root.classList.remove("tema-claro");
        document.getElementById("temaEscuro").style.display = "none";
        document.getElementById("temaClaro").style.display = "block";
        temaAtual = "escuro";
    }
    salvarTema()
}

function salvarTema() {
    localStorage.setItem("tema", temaAtual);
}

window.onload = () => {
    const temaSalvo = localStorage.getItem("tema");
    alternarTema(temaSalvo);
};

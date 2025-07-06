const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll(".menu-link");
    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

let areaSimuladosFeitos = document.querySelector('.feitos p')

if (areaSimuladosFeitos.textContent.trim() === ""){
    areaSimuladosFeitos.innerHTML = `
        <i class="fas fa-file-alt"></i> <br>
        Nenhum simulado realizado ainda.
        <br>
        Que tal fazer o primeiro?
         `
}
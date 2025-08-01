const modal = document.querySelector('.modal')

function abrirModal()
{
    modal.style.display = "flex";

    document.body.style.overflow = "hidden";
}

function fecharModal()
{
    modal.style.display = "none";
    document.body.style.overflow = "";
}

const select = document.getElementById('opcoes')

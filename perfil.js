window.onload = function() {
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioSalvo) {
        alert("Nenhum usuário cadastrado.");
        return;
    }

    const nomeUsuario = document.getElementById('nomeInput');
    nomeUsuario.placeholder = usuarioSalvo.nome;
}

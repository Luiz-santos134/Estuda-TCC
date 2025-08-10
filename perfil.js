window.onload = function () {
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioSalvo) {
        alert("Nenhum usuário cadastrado.");
        window.location.href = "index.html";
        return;
    }

    const nomeUsuario = document.getElementById('nomeInput');
    const emailUsuario = document.getElementById('emailInput');

    nomeUsuario.placeholder = usuarioSalvo.nome;
    emailUsuario.placeholder = usuarioSalvo.email;

    const imgPerfil = document.getElementById('foto_perfil');
    const fotoSalva = localStorage.getItem('fotoPerfil');
    if (fotoSalva) {
        imgPerfil.src = fotoSalva;
    }
};

function editarUsuario() {
    const editarBtn = document.getElementById('editarBtn');
    editarBtn.style.display = 'none';
    const botaoSalvar = document.getElementById('salvarBtn');
    botaoSalvar.style.display = 'block';
    const cancelarBtn = document.getElementById('cancelarBtn');
    cancelarBtn.style.display = 'block';

    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    let nomeInput = document.getElementById('nomeInput');
    let emailInput = document.getElementById('emailInput');

    nomeInput.value = usuarioSalvo.nome;
    nomeInput.readOnly = false;

    emailInput.value = usuarioSalvo.email;
    emailInput.readOnly = false;


    const imgPerfil = document.getElementById('foto_perfil')
    const iconUserSelf = document.getElementById('iconUserSelf')

    imgPerfil.src = '';
    imgPerfil.alt = '';
    iconUserSelf.style.display = 'flex';

    iconUserSelf.addEventListener('mouseenter', function() {
        iconUserSelf.style.fontSize = '110px';
    });
    iconUserSelf.addEventListener('mouseleave', function() {
        iconUserSelf.style.fontSize = '';
    });

    const fotoInput = document.getElementById('fotoInput');

    fotoInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                imgPerfil.src = reader.result;
                localStorage.setItem('fotoPerfil', reader.result);
            };
            reader.readAsDataURL(file);
        }
    });

    
    botaoSalvar.addEventListener('click', function() {

        const body = document.querySelector('body');
        const nomeUsuario = document.getElementById('nomeInput');
        const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

        if (usuarioSalvo) {
            usuarioSalvo.nome = nomeUsuario.value;
            usuarioSalvo.email = document.getElementById('emailInput').value;
            localStorage.setItem("usuario", JSON.stringify(usuarioSalvo));
            alert("Perfil atualizado com sucesso!");
        } else {
            alert("Nenhum usuário encontrado para atualizar.");
        }
        window.location.reload();
    });
}

function cancelarEdicao() {
    window.location.reload();
}

function sair()
{
    window.location.href = "index.html";
}

function deletarConta()
{
    const confirmar = confirm("Tem certeza que deseja deletar sua conta?");
    if (confirmar) {
        localStorage.removeItem("usuario");
        alert("Conta deletada com sucesso!");
        window.location.href = "cadastrar.html";
    }
}
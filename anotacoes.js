const modal = document.querySelector('.modal');

function abrirModal(elemento = null) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    
    // Se receber um elemento, preenche os campos
    if (elemento) {
        const anotacao = elemento.closest('.anotacao');
        const index = anotacao.getAttribute('data-id');
        const anotacoes = JSON.parse(localStorage.getItem('anotacoes')) || [];
        const anotacaoEditar = anotacoes[index];
        
        document.getElementById('tituloAnotacao').value = anotacaoEditar.titulo;
        document.getElementById('opcoes').value = anotacaoEditar.categoria;
        document.getElementById('anotacao').value = anotacaoEditar.textoAnotacao;
        
        // Adiciona um atributo para saber que esta editando
        modal.setAttribute('data-editing', index);
    } else {
        // Remove o atributo se for uma anotação noca
        modal.removeAttribute('data-editing');
    }
}

function fecharModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
}

function adicionarAnotacao() {
    const titulo = document.getElementById('tituloAnotacao').value;
    const categoria = document.getElementById('opcoes').value;
    const textoAnotacao = document.getElementById('anotacao').value;

    if (!titulo || !textoAnotacao) {
        alert('Preencha os campos obrigatórios');
        return;
    }

    const data = new Date().toLocaleDateString('pt-BR');
    const novaAnotacao = {
        titulo,
        categoria,
        textoAnotacao,
        data
    };

    let anotacoes = JSON.parse(localStorage.getItem('anotacoes')) || [];
    
    // Verifica se está editando
    const editingIndex = modal.getAttribute('data-editing');
    if (editingIndex !== null) {
        // Atualiza a anotação existente
        anotacoes[editingIndex] = novaAnotacao;
    } else {
        // Adiciona nova anotação
        anotacoes.push(novaAnotacao);
    }
    
    localStorage.setItem('anotacoes', JSON.stringify(anotacoes));
    
    document.querySelector('.todas').innerHTML = '';
    anotacoes.forEach((item, i) => criarElementoAnotacao(item, i));

    // Limpa os input e fecha o modal
    document.getElementById('tituloAnotacao').value = '';
    document.getElementById('opcoes').value = '';
    document.getElementById('anotacao').value = '';
    
    fecharModal();
}

function criarElementoAnotacao({ titulo, categoria, textoAnotacao, data }, index) {
    const anotacao = document.createElement('div');
    anotacao.className = 'anotacao';
    anotacao.setAttribute('data-id', index);

    // Dentro da função criarElementoAnotacao, atualize a linha do ícone de edição:
    anotacao.innerHTML = `
        <div class="tituloAnotacaoCriada">
            <p>${titulo}</p>
            <div class="icons">
                <i class="fa fa-edit" onclick="abrirModal(this)"></i>
                <i class="fa fa-trash" onclick="excluirAnotacao(this)"></i>
            </div>
        </div>
        <div class="tag_Data">
            <p class="tag">${categoria}</p>
            <p>${data}</p>
        </div>
        <input type="text" readonly value="${textoAnotacao}">
    `;

    document.querySelector('.todas').appendChild(anotacao);
}

function excluirAnotacao(elemento) {
    const anotacao = elemento.closest('.anotacao');
    const index = anotacao.getAttribute('data-id');

    let anotacoes = JSON.parse(localStorage.getItem('anotacoes')) || [];

    anotacoes.splice(index, 1);
    localStorage.setItem('anotacoes', JSON.stringify(anotacoes));

    document.querySelector('.todas').innerHTML = '';
    anotacoes.forEach((item, i) => criarElementoAnotacao(item, i));
}

window.addEventListener('DOMContentLoaded', () => {
    const anotacoes = JSON.parse(localStorage.getItem('anotacoes')) || [];
    anotacoes.forEach((item, index) => criarElementoAnotacao(item, index));
});

function filtrarCategoria(cat) {
    const anotacoes = document.querySelectorAll('.anotacao');

    anotacoes.forEach(item => {
        const categoria = item.querySelector('.tag').textContent.trim();

        if (cat === 'todas' || cat.toLowerCase() === categoria.toLowerCase()) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function pesquisarAnotacoes() {
    const termo = document.getElementById('pesquisa').value.toLowerCase();
    const anotacoes = document.querySelectorAll('.anotacao');

    anotacoes.forEach(item => {
        const titulo = item.querySelector('.tituloAnotacaoCriada p').textContent.toLowerCase();
        if (titulo.includes(termo)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

const barraPesquisa = document.getElementById('pesquisa');
if (barraPesquisa) {
    barraPesquisa.addEventListener('input', pesquisarAnotacoes);
}

const modal = document.querySelector('.modal');

function abrirModal(editar)
{
    modal.style.display = "flex";

    document.body.style.overflow = "hidden";

    // if (editar){
    //   alert(editar)
    //   document.querySelector('.tituloTaskCriada p') = 
    // }
}

function fecharModal()
{
    modal.style.display = "none";
    document.body.style.overflow = "";
}

function adicionarTask() {
  const titulo = document.getElementById('tituloTarefa').value;
  const categoria = document.getElementById('opcoes').value;
  const textTask = document.getElementById('anotacao').value;

  if (!titulo || !textTask) {
    alert('Preencha os campos');
    return;
  }

  const data = new Date().toLocaleDateString('pt-BR');

  const novaTask = {
    titulo,
    categoria,
    textTask,
    data
  };

  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas.push(novaTask);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));

  criarTaskElemento(novaTask, tarefas.length - 1); // ← índice da nova tarefa

  // Limpa os inputs
  document.getElementById('tituloTarefa').value = '';
  document.getElementById('opcoes').value = '';
  document.getElementById('anotacao').value = '';

  fecharModal();
}

function criarTaskElemento({ titulo, categoria, textTask, data }, index) {
  const task = document.createElement('div');
  task.className = 'task';
  task.setAttribute('data-id', index); // para saber qual a tarefa

  task.innerHTML = `
    <div class="tituloTaskCriada">
      <p>${titulo}</p>
      <div class="icons">
        <i class="fa fa-edit" onclick="abrirModal(this.id)"></i>
        <i class="fa fa-trash" onclick="excluirTask(this)"></i>
      </div>
    </div>
    <div class="tag_Data">
      <p class="tag">${categoria}</p>
      <p>${data}</p>
    </div>
    <input type="text" readonly value="${textTask}">
  `;

  document.querySelector('.todas').appendChild(task);
}

function excluirTask(elemento) {
  const task = elemento.closest('.task');
  const index = task.getAttribute('data-id');

  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

  tarefas.splice(index, 1); // ← remove 1 item no índice certo
  localStorage.setItem('tarefas', JSON.stringify(tarefas));

  // Limpa a lista e recria tudo com os índices atualizados
  document.querySelector('.todas').innerHTML = '';
  tarefas.forEach((tarefa, i) => criarTaskElemento(tarefa, i));
}


window.addEventListener('DOMContentLoaded', () => {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas.forEach((tarefa, index) => criarTaskElemento(tarefa, index));
});

function filtrarCategoria(cat) {
  const tarefas = document.querySelectorAll('.task');

  tarefas.forEach(task => {
    const categoria = task.querySelector('.tag').textContent.trim();

    if (cat === 'todas' || cat.toLowerCase() === categoria.toLowerCase()) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
// Função para pesquisar tarefas pelo título
function pesquisarTarefas() {
  const termo = document.getElementById('pesquisa').value.toLowerCase();
  const tarefas = document.querySelectorAll('.task');

  tarefas.forEach(task => {
    const titulo = task.querySelector('.tituloTaskCriada p').textContent.toLowerCase();
    if (titulo.includes(termo)) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// Adiciona evento à barra de pesquisa
const barraPesquisa = document.getElementById('pesquisa');
if (barraPesquisa) {
  barraPesquisa.addEventListener('input', pesquisarTarefas);
}
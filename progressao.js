document.addEventListener("DOMContentLoaded", () => {
    const barra = document.getElementById("barra");

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    let tasksConcluidas = tarefas.filter(task => task.concluida).length;

    barra.max = tarefas.length;
    barra.value = tasksConcluidas;

    const numPorcentagem = document.getElementById("numPorcentagem");

    const porcentagem = barra.max > 0 ? (barra.value / barra.max) * 100 : 0;
    numPorcentagem.textContent = `${Math.round(porcentagem)}%`;
});

document.addEventListener("change", () => {
    const barra = document.getElementById("barra");

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    let tasksConcluidas = tarefas.filter(task => task.concluida).length;

    barra.max = tarefas.length;
    barra.value = tasksConcluidas;

    const numPorcentagem = document.getElementById("numPorcentagem");

    const porcentagem = barra.max > 0 ? (barra.value / barra.max) * 100 : 0;
    numPorcentagem.textContent = `${Math.round(porcentagem)}%`;
});


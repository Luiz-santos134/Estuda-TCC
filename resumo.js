// No seu resumo.js
const ctx = document.getElementById('graficoLinha').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
            label: 'Desempenho nos Simulados',
            data: [45, 50, 55, 60, 65, 70],
            borderColor: '#3a6eff',
            backgroundColor: 'rgba(58, 110, 255, 0.1)',
            tension: 0.3,
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#f5f5f5'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#aaaaaa'
                },
                grid: {
                    color: '#2b2b2b'
                }
            },
            x: {
                ticks: {
                    color: '#aaaaaa'
                },
                grid: {
                    color: '#2b2b2b'
                }
            }
        }
    }
});


document.addEventListener("DOMContentLoaded", () => {
    carregarSimulados()
});

function carregarSimulados(){
    let SimuladosPlace = document.querySelector(".containerBloco1")

    let simulados = JSON.parse(localStorage.getItem("simuladosFinalizados")) || [];
    const NumeSimulado = document.querySelector(".simuFeitos span");
    NumeSimulado.textContent = simulados.length;

    let simulado = document.createElement("div")
    simulado.classList.add("simulado")

    SimuladosPlace.appendChild(simulado)
}

// Carrega simulados finalizados ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    let SimuladosPlace = document.querySelector(".containerBloco1 .placeSimulados")

    let simuladosFinalizados = JSON.parse(localStorage.getItem('simuladosFinalizados')) || [];
    SimuladosPlace.innerHTML = '';
    simuladosFinalizados.forEach(simulado => {
        const li = document.createElement('li');
        li.innerHTML = `<p>${simulado.data} - ${simulado.tipo} - Acertos: ${simulado.porcentagem}%</p>`;
        SimuladosPlace.appendChild(li);
    });
});
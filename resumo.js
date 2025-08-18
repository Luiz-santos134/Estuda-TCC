// No seu resumo.js
const ctx = document.getElementById('graficoLinha').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
        datasets: [{
            label: 'Desempenho nos Simulados',
            data: [0, 50, 10, 60, 65, 70, 85],
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

// Carrega simulados finalizados ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    let SimuladosPlace = document.querySelector(".containerBloco1 .placeSimulados");

    let simuladosFinalizados = JSON.parse(localStorage.getItem('simuladosFinalizados')) || [];
    SimuladosPlace.innerHTML = '';

    simuladosFinalizados.forEach(simulado => {
        const li = document.createElement('li');
        li.classList.add('simulado-item');

        li.innerHTML = `
            <span class="data">${simulado.data}</span>
            <span class="tipo">${simulado.tipo}</span>
            <span class="porcentagem">${simulado.porcentagem}%</span>
            <span class="erro">${(100 - simulado.porcentagem)/10}</span>
        `;
        
        SimuladosPlace.appendChild(li);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Recupera os simulados do localStorage
    const simuladosFinalizados = JSON.parse(localStorage.getItem('simuladosFinalizados')) || [];
    
    // Ordena por data (do mais antigo para o mais recente)
    simuladosFinalizados.sort((a, b) => new Date(a.data.split('/').reverse().join('-')) - new Date(b.data.split('/').reverse().join('-')));
    
    // Prepara os dados para o gráfico
    const labels = simuladosFinalizados.map(simulado => {
        // Formata a data para exibição (dd/mm)
        const [dia, mes] = simulado.data.split('/');
        return `${dia}/${mes}`;
    });
    
    const dados = simuladosFinalizados.map(simulado => simulado.porcentagem);
    
    // Cria o gráfico
    const ctx = document.getElementById('graficoLinha').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Desempenho nos Simulados (%)',
                data: dados,
                borderColor: '#3a6eff',
                backgroundColor: 'rgba(58, 110, 255, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#3a6eff',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#f5f5f5',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const index = context.dataIndex;
                            const simulado = simuladosFinalizados[index];
                            return `Matérias: ${simulado.materias.join(', ')}\nTempo: ${simulado.tempo}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: Math.max(0, Math.min(...dados) - 10),
                    max: Math.min(100, Math.max(...dados) + 10),
                    ticks: {
                        color: '#aaaaaa',
                        callback: function(value) {
                            return value + '%';
                        }
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
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });

    // Atualiza a lista de simulados (se necessário)
    let SimuladosPlace = document.querySelector(".containerBloco1 .placeSimulados");
    if (SimuladosPlace) {
        SimuladosPlace.innerHTML = '';
        
        simuladosFinalizados.forEach(simulado => {
            const li = document.createElement('li');
            li.classList.add('simulado-item');
            
            // Calcula erros considerando o número de questões (assumindo 10 questões por simulado)
            const qtdErros = ((100 - simulado.porcentagem)/10).toFixed(1);
            
            li.innerHTML = `
                <span class="data">${simulado.data}</span>
                <span class="tipo">${simulado.tipo}</span>
                <span class="porcentagem">${simulado.porcentagem}%</span>
                <span class="erro">${qtdErros} erros</span>
                <span class="tempo">${simulado.tempo}</span>
            `;
            
            SimuladosPlace.appendChild(li);
        });
    }
});
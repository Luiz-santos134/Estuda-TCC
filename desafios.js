document.addEventListener("DOMContentLoaded", () => {
    const primeiraVezContainer = document.querySelector(".primeiraVez");
    const mainContainer = document.querySelector("main");

    if (!localStorage.getItem("primeiraVez")) {
        localStorage.setItem("primeiraVez", "true");
        primeiraVezContainer.style.display = "flex";
        mainContainer.style.display = "none";
    } else {
        mainContainer.style.display = "flex";
        primeiraVezContainer.style.display = "none";
    }
    
    const titulo = document.querySelector(".containerProgressao span");
    const descricao = document.querySelector(".containerProgressao p");
    const listaHabilidades = document.querySelector(".containerProgressao ul");
    const desafiosUL = document.querySelector(".desafios ul");
    const selectCarreira = document.querySelector("select");

    fetch('desafiosBancoDados.json')
        .then(res => res.json())
        .then(data => {
            const desafios = data.desafiosBancoDados;
            const progressaoCarreira = data.progressaoCarreira;
            
            desafios.forEach(desafio => {
                let li = document.createElement("li");
                let div = document.createElement("div");
                div.classList = "desafioItem";
                
                let tituloDesafio = document.createElement("span");
                tituloDesafio.innerHTML = desafio.titulo;

                let descricaoDesafio = document.createElement("p");
                descricaoDesafio.innerHTML = desafio.descricao;

                div.appendChild(tituloDesafio);
                div.appendChild(descricaoDesafio);
                li.appendChild(div);
                desafiosUL.appendChild(li);
            });

            function carregarCarreira(nomeCarreira) {
                listaHabilidades.innerHTML = "";

                const carreira = progressaoCarreira.find(c => c.titulo === nomeCarreira);
                if (carreira) {
                    titulo.innerText = carreira.titulo;
                    if (descricao) descricao.innerText = carreira.descricao;
                    
                    carreira.competencias.forEach(competencia => {
                        const li = document.createElement("li");
                        li.innerText = competencia;
                        listaHabilidades.appendChild(li);
                    });
                }
            }

            const carreiraSalva = localStorage.getItem("carreiraSelecionada");
            if (carreiraSalva) {
                selectCarreira.value = carreiraSalva;
                carregarCarreira(carreiraSalva);
            } else {
                selectCarreira.value = progressaoCarreira[0].titulo;
                carregarCarreira(progressaoCarreira[0].titulo);
            }

            selectCarreira.addEventListener("change", e => {
                const carreiraSelecionada = e.target.value;
                localStorage.setItem("carreiraSelecionada", carreiraSelecionada);
                carregarCarreira(carreiraSelecionada);
            });

            const selectPrimeiraVez = document.querySelector("#carreiraSelect");
            if (selectPrimeiraVez) {
                selectPrimeiraVez.addEventListener("change", function() {
                    localStorage.setItem("carreiraSelecionada", this.value);
                    localStorage.setItem("primeiraVez", "false");
                    primeiraVezContainer.style.display = "none";
                    mainContainer.style.display = "flex";
                    
                    selectCarreira.value = this.value;
                    carregarCarreira(this.value);
                });
            }
        })
        .catch(err => console.error("Erro ao carregar JSON:", err));
});


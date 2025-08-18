document.addEventListener("DOMContentLoaded", () => {
    const titulo = document.querySelector(".containerProgressao span")
    const descricao = document.querySelector(".containerProgressao p")
    const listaHabilidades = document.querySelector(".containerProgressao ul")

    fetch('carreira.json')
        .then(response => response.json())
        .then(data => {
            const titulos = data.desafiosBancoDados.map(desafio => desafio.titulo);
            console.log(titulos); // ["Desafio 1", "Desafio 2"]
            
            // Se quiser usar os títulos individualmente:
            titulos.forEach(titulo => {
            console.log(titulo);
            console.log(titulo)
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os desafios:', error);
        });
});
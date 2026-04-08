document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.querySelector('.cards-container');
    const campoBusca = document.getElementById('campo-busca');
    const noResultsMessage = document.getElementById('no-results-message');
    let allGenres = [];

    function renderizarCards(genres) {
        cardsContainer.innerHTML = '';

// Verifica se a lista de gêneros está vazia
        if (genres.length === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }

//Cria e adiciona cada card de gênero
        genres.forEach(genre => {
            const article = document.createElement('article');
            article.classList.add('card');
            article.innerHTML = `
                <h2>${genre.titulo}</h2>
                <p>
                    <strong>Definição:</strong> ${genre.definicao}
                    <br><a href="${genre.link}"><strong>Saiba mais...</strong></a>
                </p>
            `;
            cardsContainer.appendChild(article);
        });
    }

    async function carregarGeneros() {
        try {
            const response = await fetch('generos.json');
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON.');
            }
            allGenres = await response.json();
            renderizarCards(allGenres);
        } catch (error) {
            console.error(error);
            cardsContainer.innerHTML = '<p style="text-align: center; color: red;">Falha ao carregar os gêneros. Tente novamente mais tarde.</p>';
        }
    }

    function iniciarBusca() {
        const termoBusca = campoBusca.value.toLowerCase();
        
        const resultados = allGenres.filter(genre => {
            const textoArtigo = (genre.titulo + ' ' + genre.definicao).toLowerCase();
            return textoArtigo.includes(termoBusca);
        });

        renderizarCards(resultados);
    }

    if (campoBusca) {
        campoBusca.addEventListener('keyup', iniciarBusca);
    }

    carregarGeneros();
});
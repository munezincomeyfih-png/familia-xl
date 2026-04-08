document.addEventListener('DOMContentLoaded', () => {

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
        });
    }
//animação do scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

// trailer modal
    const trailerButtons = document.querySelectorAll('.trailer-button');
    const modal = document.getElementById('trailerModal');
    const closeButton = document.querySelector('.modal-close-button');
    const trailerContainer = document.getElementById('trailerContainer');

    if (modal) { 
        function openModal(trailerUrl) {
            let videoId;
            try {
                const url = new URL(trailerUrl);
                if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
                    videoId = url.searchParams.get('v');
                } else if (url.hostname === 'youtu.be') {
                    videoId = url.pathname.substring(1);
                }
            } catch (e) {
                console.error("URL do trailer inválida:", trailerUrl, e);
                return;
            }

            if (videoId) {
                trailerContainer.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                modal.style.display = 'flex';
            }
        }

        function closeModal() {
            modal.style.display = 'none';
            trailerContainer.innerHTML = '';
        }

        trailerButtons.forEach(button => {
            button.addEventListener('click', () => {
                const trailerUrl = button.dataset.trailerId;
                openModal(trailerUrl);
            });
        });

        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    initializeRatingSystem();
});

//busca
/*function iniciarBusca() {
    const termoBusca = document.getElementById('campo-busca').value.toLowerCase();
    const artigos = document.querySelectorAll('main section article');

    artigos.forEach(artigo => {
        const textoArtigo = artigo.textContent.toLowerCase();
        if (textoArtigo.includes(termoBusca)) {
            artigo.style.display = 'block';
        } else {
            artigo.style.display = 'none';
        }
    });
}*/
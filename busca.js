function iniciarBusca() {
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
        }
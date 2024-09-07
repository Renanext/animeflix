// Adicionando animes aos favoritos
document.querySelectorAll('.add-to-favorites').forEach(button => {
    button.addEventListener('click', function() {
        const animeTitle = this.dataset.title;
        const animeImage = this.dataset.image;
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (!favorites.some(fav => fav.title === animeTitle)) {
            favorites.push({ title: animeTitle, image: animeImage });
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert(`${animeTitle} foi adicionado aos favoritos!`);
        } else {
            alert(`${animeTitle} já está na lista de favoritos.`);
        }
    });
});

// Carregar favoritos na página "My List"
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteListElement = document.getElementById('favoriteList');

    favoriteListElement.innerHTML = ''; // Limpar a lista

    if (favorites.length === 0) {
        favoriteListElement.innerHTML = '<p>Nenhum anime adicionado aos favoritos.</p>';
        return;
    }

    favorites.forEach(favorite => {
        const listItem = document.createElement('div');
        listItem.className = 'anime-card';
        listItem.innerHTML = `
            <img src="${favorite.image}" alt="${favorite.title}" class="favorite-img">
            <span>${favorite.title}</span>
            <button class="btn btn-danger btn-remove-favorite">Remover</button>
        `;
        favoriteListElement.appendChild(listItem);

        // Remover dos favoritos
        listItem.querySelector('.btn-remove-favorite').addEventListener('click', function() {
            removeFavorite(favorite.title);
            listItem.remove(); // Remover o item da lista visualmente
        });
    });
}

// Remover anime dos favoritos
function removeFavorite(animeTitle) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.title !== animeTitle);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Carregar a lista de favoritos ao carregar a página "My List"
if (window.location.pathname.includes('my_list.html')) {
    loadFavorites();
}

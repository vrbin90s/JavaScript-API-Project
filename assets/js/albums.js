async function init(){
    const albums = await fetch(`https://jsonplaceholder.typicode.com/albums?_embed=photos&_expand=user`);
    const albumData = await albums.json();

    const banner = document.querySelector('.banner');
    banner.classList.add('page-title');
    const pageTitle = document.createElement('h1');
    pageTitle.textContent = 'Albums';
    banner.append(pageTitle);

    const contentElement = document.querySelector('#content');
    const albumCards = createAlbumList(albumData);
    contentElement.append(banner, albumCards);

}



function createAlbumList(albums) {

    const albumWrapper = document.createElement('div');
    albumWrapper.classList.add('album-wrapper');


    albums.forEach(album => {

        const albumCard = document.createElement('div');
        albumCard.classList.add('album-card');
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('album-card-header');
        const cardBody = document.createElement('div');
        cardBody.classList.add('album-card-body');
        const title = document.createElement('h4');
        title.textContent = album.title;
        
        const author = document.createElement('span');
        author.textContent = album.user.name;

        const authorLink = document.createElement('a');
        authorLink.textContent = `by: `;
        authorLink.href = `./user.html?id=${album.user.id}`;
        authorLink.append(author);
        
        const photoCountElement = document.createElement('small');
        photoCountElement.classList.add('album-image-count');
        photoCountElement.textContent = `Total photos: ${album.photos.length}`;
        
        const photoElement = document.createElement('img');
        photoElement.classList.add('album-thumbnail');
        photoElement.src = album.photos[1].url;

        const imageLink = document.createElement('a');
        imageLink.classList.add('image-link');
        imageLink.href = `./album.html?id=${album.id}`;
        imageLink.append(photoElement);
        
        cardHeader.append(imageLink);
        cardBody.append(title, authorLink, photoCountElement);
        albumCard.append(cardHeader, cardBody);
        albumWrapper.append(albumCard);
    });

    return albumWrapper;

}

init();
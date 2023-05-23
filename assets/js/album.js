async function init(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const users = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}/?_embed=photos&_expand=user`);
    const albumData = await users.json();
    const contentElement = document.querySelector('#content');

    const banner = document.querySelector('.banner');
    banner.classList.add('page-title');
    const pageTitle = document.createElement('h1');
    pageTitle.textContent = 'Album';
    banner.append(pageTitle);

    if(id) {
        const albumElement = createAlbum(albumData);
        contentElement.append(albumElement);
    } else {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = `Album not found`;
        const usersLink = document.createElement('a');
        usersLink.href = './albums.html';
        usersLink.textContent = 'Back to albums page';
        contentElement.append(errorMessage, usersLink);
    }

    lightGallery(document.getElementById('light-gallery'), {
        thumbnail:true
    });

}   

function createAlbum(album){
    const albumElement = document.createElement('div');
    albumElement.classList.add('album');
    const innerAlbumWrapper = document.createElement('div');
    innerAlbumWrapper.classList.add('inner-album-container');
    const title = document.createElement('h3');
    const body = document.createElement('p');
    const author = document.createElement('div');
    const authorLink = document.createElement('a');
    const authorSpan = document.createElement('span');
    const morePostsFromAuthorLink = document.createElement('a');
    morePostsFromAuthorLink.innerHTML = 'More albums from this Author &rarr;';
    morePostsFromAuthorLink.href = `./albums.html?id=${album.user.id}`;

    const lightGallery = document.createElement('div');
    lightGallery.id = 'light-gallery';

    album.photos.forEach(photo => {
        const galleryLink = document.createElement('a');
        galleryLink.href = photo.url;
        const image = document.createElement('img');
        image.src = photo.thumbnailUrl;

        galleryLink.append(image);

        lightGallery.append(galleryLink);

    });

   

    authorLink.href = (`./user.html?id=${album.user.id}`);
    
    title.textContent = album.title;
    authorSpan.textContent = `by: `;
    body.textContent = album.body;
    authorLink.textContent = album.user.name;
    
 
    author.append(authorSpan, authorLink);
    innerAlbumWrapper.append(title, author, body);
    albumElement.append(innerAlbumWrapper, lightGallery);
    return albumElement;
}

init();
import { createHTMLElement, fetchData, getUrlParamValue, selectHTMLElement } from "./functions.js";
import header from "./navigation.js";

async function init(){

    const id = getUrlParamValue('id');

    const albumData = await fetchData(`https://jsonplaceholder.typicode.com/albums/${id}/?_embed=photos&_expand=user`);
    const contentElement = selectHTMLElement('#content');
    const banner = selectHTMLElement('.banner', 'page-title');
    const pageTitle = createHTMLElement('h1', null, 'Album');

    banner.append(pageTitle);
    banner.before(header());
    
    if(id) {
        const albumElement = createAlbum(albumData);
        contentElement.append(albumElement);
    } else {
        const errorMessage = createHTMLElement('p', 'error-message', 'Album not found');
        const usersLink = createHTMLElement('a', 'users-link', 'Back to albums page');
        usersLink.href = './albums.html';
        contentElement.append(errorMessage, usersLink);
    }
    
    lightGallery(selectHTMLElement('#light-gallery'), {
        thumbnail: true,
        width: '100%'
    });
    
}   

function createAlbum(album){
    const albumElement = createHTMLElement('div', 'album');
    const innerAlbumWrapper = createHTMLElement('div', 'inner-album-container');
    const title = createHTMLElement('h3', 'album-title', album.title);
    const body = createHTMLElement('p', 'album-body', album.body);
    const authorLink = createHTMLElement('a', 'auhotr-link', `by: ${album.user.name}`);
    authorLink.href = (`./user.html?id=${album.user.id}`);

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

    innerAlbumWrapper.append(title, authorLink, body);
    albumElement.append(innerAlbumWrapper, lightGallery);
    
    return albumElement;
}

init();
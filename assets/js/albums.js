import { createHTMLElement, fetchData, getUrlParamValue, selectHTMLElement } from "./functions.js";
import header from "./navigation.js";
async function init(){
    const id = getUrlParamValue('id');

    const albumData = await fetchData(`https://jsonplaceholder.typicode.com/albums?_embed=photos&_expand=user${id ? '&userId=' + id : ''}`);

    const banner = selectHTMLElement('.banner', 'page-title');
    const pageTitle = createHTMLElement('h1', 'Albums');
    banner.append(pageTitle);

    const contentElement = selectHTMLElement('#content');
    const albumCards = createAlbumList(albumData);
    contentElement.append(banner, albumCards);
    contentElement.before(header());

}



function createAlbumList(albums) {

    const albumWrapper = createHTMLElement('div', 'album-wrapper');

    albums.forEach(album => {

        const albumCard = createHTMLElement('div', 'album-card');
        const cardHeader = createHTMLElement('div', 'album-card-header');
        const cardBody = createHTMLElement('div', 'album-card-body');
        
        const title = createHTMLElement('h4', 'album-title', album.title);
        const authorLink = createHTMLElement('a', 'author-link', `by: ${album.user.name}`);
        authorLink.href = `./user.html?id=${album.user.id}`;
        
        const photoCountElement = createHTMLElement('small', 'album-image-count', `Total photos: ${album.photos.length}`);
        const photoElement = createHTMLElement('img', 'album-thumbnail');
        photoElement.src = album.photos[1].url;

        const imageLink = createHTMLElement('a', 'image-link');
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
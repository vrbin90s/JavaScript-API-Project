import { createHTMLElement, getUrlParamValue } from "./functions.js";
import header from "./navigation.js";

async function init() {
    const id = getUrlParamValue('id');

    const photoData = await fetchData(`https://jsonplaceholder.typicode.com/photos?id=${id}`);

    const contentElement = selectHTMLElement('#content');

    if(id) {
        const postElement = createPhoto(photoData);
        contentElement.append(postElement);
    } else {
        const errorMessage = createHTMLElement('p', 'error-message', 'Photo not found');
        const usersLink = createHTMLElement('a', 'normal-link', 'Go to album page');
        usersLink.href = './albums.html';

        contentElement.append(errorMessage, usersLink);
    }
    contentElement.before(header());


}

function createPhoto(photo){
    const photoWrapper = createHTMLElement('div', 'photo-wrapper');
    const imageTitle = createHTMLElement('h3', 'image-title', photo.title);
    const imageElement = createHTMLElement('img', 'single-image');
    imageElement.src = photo.url;

    photoWrapper.append(imageTitle, imageElement);
    return photoWrapper;
}
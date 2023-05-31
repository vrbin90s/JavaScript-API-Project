import { createHTMLElement, fetchData, getUrlParamValue, selectHTMLElement } from "./functions.js";
import header from "./navigation.js";

async function init(){
    
    const id = getUrlParamValue('id');

    const userData = await fetchData(`https://jsonplaceholder.typicode.com/users/${id}/?_embed=posts&_embed=albums`);

    const banner = selectHTMLElement('.banner', 'page-title');

    const pageTitle = createHTMLElement('h1', 'page-title-text', 'User Info');
    banner.append(pageTitle);

    const contentElement = selectHTMLElement('#content');

    if(id) {
        const userElement = createUser(userData);
        contentElement.append(banner, userElement);
    } else {
        const errorMessage = createHTMLElement('p', 'error-message', `User not found`);
        const usersLink = createHTMLElement('a', 'user-link', 'Back to user list');
        usersLink.href = './users.html';
        contentElement.append(errorMessage, usersLink);
    }
    contentElement.before(header());


}

function createUser(user){
    const userWrapper = createHTMLElement('div', 'user-wrapper');
    const userTable = createHTMLElement('table', 'user-table');

    const createRow = (headingText , bodyElement) => {
        const row = createHTMLElement('tr');

        const heading = createHTMLElement('th', 'table-heading', headingText);
        row.append(heading);

        const body = createHTMLElement('td');
        body.append(bodyElement);
        row.append(body);

        return row;
    }

    const phoneLink = createHTMLElement('a', 'user-phone-link', user.phone);
    phoneLink.href = `tel:${user.phone}`;

    const addressLink = createHTMLElement('a', 'user-address-link', `${user.address.street},  ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`)
    addressLink.href = `https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`;
    addressLink.target = '_blank';

    const webLink = createHTMLElement('a', 'user-web-link', user.website);
    webLink.href = `https://${user.website}`;

    const nameRow = createRow('User', user.name);
    const userNameRow = createRow('Username', user.username);
    const emailRow = createRow('Email', user.email);
    const addressRow = createRow('Address', addressLink);
    const phoneRow = createRow('Phone', phoneLink);
    const webRow = createRow('Website', webLink);
    const companyRow = createRow('Company', user.company.name);
        
    userTable.append(nameRow, userNameRow, emailRow, addressRow, phoneRow, webRow, companyRow);
    userWrapper.append(userTable);

    if(user.posts) {
        
        const postList = createHTMLElement('ul', 'user-posts');
        const titleElement = createHTMLElement('h3', 'user-post-title', `User Posts (${user.posts.length}):`);
        let count = 1;
        user.posts.forEach(post => {
            const liElement = createHTMLElement('li');
            const postLink = createHTMLElement('a', 'post-link', `${count++} - ${post.title}`);
            postLink.href = `./post.html?id=${post.id}`;
            liElement.append(postLink);
            postList.append(liElement);
        });

        userWrapper.append(titleElement, postList);
    }

    if(user.albums) {
        const albumList = createHTMLElement('ul', 'user-albums');
        const titleElement = createHTMLElement('h3', 'user-album-title', `User albums (${user.albums.length}):`);

        let count = 1;
        user.albums.forEach(album => {
            const liElement = createHTMLElement('li');
            const albumLink = createHTMLElement('a', 'album-link', `${count++} - ${album.title}`);
            albumLink.href = `./album.html?id=${album.id}`;
            liElement.append(albumLink);
            albumList.append(liElement);
            
        });

        userWrapper.append(titleElement, albumList);
    }

    return userWrapper;
}

init();
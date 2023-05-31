import { createHTMLElement, fetchData, selectHTMLElement } from "./functions.js";
import header from "./navigation.js";

async function init() {
    const contentElement = selectHTMLElement('#content');

    const postData = await fetchData(`https://jsonplaceholder.typicode.com/posts?_expand=user`);
    const albumData = await fetchData(`https://jsonplaceholder.typicode.com/albums?_embed=photos&_expand=user`);
    const userData = await fetchData(`https://jsonplaceholder.typicode.com/users?_embed=posts&_embed=albums`);

    const contentWrapper = createHTMLElement('div', 'content-wrapper');
    contentWrapper.append(getLatestPosts(postData.slice(-5), 'posts'), getLatestAlbums(albumData.slice(-5), 'albums'), getLatestUsers(userData.slice(-5), 'users'));

    contentElement.before(header());
    contentElement.append(contentWrapper);
   
}

function getLatestPosts(data, typeText){
    const blockWrapper = createHTMLElement('div', 'block-wrapper');
    const contentTitle = createHTMLElement('h2', 'home-section-title', `5 latest ${typeText}`)
    const innerWrapper = createHTMLElement('div', 'inner-content');
    blockWrapper.append(contentTitle);
    innerWrapper.append(blockWrapper);

    data.forEach(post => {
        const title = createHTMLElement('a', 'item-link', post.title)
        title.href = `./post.html?id=${post.id}`;
        const author = createHTMLElement('a', 'item-link', `by: ${post.user.name}`);
        author.href = `./user.html?id=${post.user.id}`;
        const postBody = createHTMLElement('p', 'item-body-text', post.body);
        const postWrapper = createHTMLElement('div', 'item-wrapper');
        const moreAuthorPostsLink = createHTMLElement('a', 'more-posts-link', `more posts from: ${post.user.name}`);
        moreAuthorPostsLink.href = `./posts.html?id=${post.user.id}`;
        postWrapper.append(title, author, postBody, moreAuthorPostsLink);
        
        blockWrapper.append(postWrapper);
    });

    return innerWrapper;

}

function getLatestAlbums(data, typeText){
    const blockWrapper = createHTMLElement('div', 'block-wrapper');
    const contentTitle = createHTMLElement('h2', 'home-section-title', `5 latest ${typeText}`)
    const innerWrapper = createHTMLElement('div', 'inner-content');
    blockWrapper.append(contentTitle);
    innerWrapper.append(blockWrapper);

    data.forEach(album => {
        const title = createHTMLElement('p', 'item-link', album.title)
        const author = createHTMLElement('a', 'item-link', `by: ${album.user.name}`);
        author.href = `./user.html?id=${album.user.id}`;
        const albumPhoto= createHTMLElement('img', 'album-photo');
        albumPhoto.src = album.photos[0].thumbnailUrl;
        const albumLink = createHTMLElement('a', 'item-link');
        albumLink.href = `./album.html?id=${album.id}`;
        albumLink.append(albumPhoto);
        const albumWrapper = createHTMLElement('div', 'item-wrapper');
        const moreAuthorAlbumsLink = createHTMLElement('a', 'more-posts-link', `more albums from: ${album.user.name}`);
        moreAuthorAlbumsLink.href = `./albums.html?id=${album.user.id}`;
        albumWrapper.append(title, author, albumLink, moreAuthorAlbumsLink);
        
        blockWrapper.append(albumWrapper);
    });

    return innerWrapper;

}

function getLatestUsers(data, typeText){
    const blockWrapper = createHTMLElement('div', 'block-wrapper');
    const contentTitle = createHTMLElement('h2', 'home-section-title', `5 latest ${typeText}`)
    const innerWrapper = createHTMLElement('div', 'inner-content');
    blockWrapper.append(contentTitle);
    innerWrapper.append(blockWrapper);

    data.forEach(user => {
        console.log(user);
        const title = createHTMLElement('p', 'item-link', user.name)
        const userWrapper = createHTMLElement('div', 'item-wrapper');
        const moreUserInfoLink = createHTMLElement('a', 'more-posts-link', `more info about: ${user.name}`);
        const userInfo = createHTMLElement('p', 'item-body', `
        Nicname: ${user.username} from ${user.address.city}. Has ${user.albums.length} albums and ${user.posts.length} posts. 
        
        `);
        moreUserInfoLink.href = `./user.html?id=${user.id}`;
        userWrapper.append(title, userInfo, moreUserInfoLink);
        
        blockWrapper.append(userWrapper);
    });

    return innerWrapper;

}

init();
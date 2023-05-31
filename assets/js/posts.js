import { createHTMLElement, fetchData, selectHTMLElement, getUrlParamValue } from "./functions.js";
import header from "./navigation.js";

async function init(){

    const id = getUrlParamValue('id');

    const postCount = `?_start=0&_end=100`;
    
    const postData = await fetchData(`https://jsonplaceholder.typicode.com/posts${postCount}&_embed=comments&_expand=user${id ? '&userId=' + id : ''}`);
    
    const contentElement = selectHTMLElement('#content');
    const banner = selectHTMLElement('.banner, page-title');

    const pageTitle = createHTMLElement('h1', 'page-title-text', 'Posts');
    banner.append(pageTitle);

    const postCards = createPostList(postData);
    contentElement.append(banner, postCards);
    contentElement.before(header());

}

function createPostList(posts) {

    const postsWrapper = createHTMLElement('div', 'posts-wrapper');

    posts.forEach((post) => {
  
        const postCard = createHTMLElement('div', 'post-card');
        const title = createHTMLElement('h4');
        const author = createHTMLElement('h6');
        const comments = createHTMLElement('small', 'comment-count');
        
        const titleElement = createHTMLElement('a', 'post-title', post.title);
        titleElement.href = `./post.html?id=${post.id}`;

        const authorElement = createHTMLElement('a', 'author-title', `Author:  ${ post.user.name }`);
        authorElement.href = `./user.html?id=${post.user.id}`;

        title.append(titleElement);
        author.append(authorElement);
        comments.textContent = `Comments: ${post.comments.length}`;

        postCard.append(title, author, comments);
        postsWrapper.append(postCard);
    });

    return postsWrapper;

}

init();
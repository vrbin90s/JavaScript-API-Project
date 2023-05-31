import { createHTMLElement, fetchData, selectHTMLElement, getUrlParamValue } from "./functions.js";
import header from "./navigation.js";

async function init(){
    
    const id = getUrlParamValue('id');

    const postData = await fetchData(`https://jsonplaceholder.typicode.com/posts/${id}/?_embed=comments&_expand=user`);

    const contentElement = selectHTMLElement('#content');

    if(id) {
        const postElement = createPost(postData);
        contentElement.append(postElement);
    } else {
        const errorMessage = createHTMLElement('p', 'error-message', 'Post not found');
        const usersLink = createHTMLElement('a', 'normal-link', 'Back to post page');
        usersLink.href = './posts.html';

        contentElement.append(errorMessage, usersLink);
    }
    contentElement.before(header());


}   

function createPost(post){
    const postElement = createHTMLElement('article', 'post');
    const innerPostWrapper = createHTMLElement('div', 'inner-post-wrapper');
    const title = createHTMLElement('h3', 'post-title', post.title);
    const body = createHTMLElement('p', 'post-body', post.body);
    const authorLink = createHTMLElement('a', 'author-link', `by: ${post.user.name}`);
    authorLink.href = (`./user.html?id=${post.id}`);
    
    const morePostsFromAuthorLink = createHTMLElement('a');
    morePostsFromAuthorLink.innerHTML = 'More posts from this Author 	&rarr;';
    morePostsFromAuthorLink.href = `./posts.html?id=${post.user.id}`;

    const commentList = createHTMLElement('div', 'comments-container');
    const heading = createHTMLElement('h4', 'comment-heading');
    
    if(post.comments) {
        commentList.prepend(heading);
        post.comments.forEach(comment => {
            
            const wrapper = createHTMLElement('div', 'comment-wrapper');
            const titleWrapper = createHTMLElement('div', 'title-wrapper');
            const title = createHTMLElement('h4', 'comment-title', comment.name);
            const body = createHTMLElement('p', 'comment-body', comment.body);
            const email = createHTMLElement('small', 'commenter-email', `User email: ${comment.email}`);
            
            heading.textContent = 'Comments';

            titleWrapper.append(title);
            wrapper.append(titleWrapper, body, email);
            commentList.append(wrapper);
        });
    }
 
    innerPostWrapper.append(title, authorLink, body, morePostsFromAuthorLink);
    postElement.append(innerPostWrapper, commentList);
    return postElement;
}

init();
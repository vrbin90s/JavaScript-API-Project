async function init(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const users = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/?_embed=comments&_expand=user`);
    const postData = await users.json();
    console.log(postData);
    const contentElement = document.querySelector('#content');

    if(id) {
        const postElement = createUser(postData);
        contentElement.append(postElement);
    } else {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = `Post not found`;
        const usersLink = document.createElement('a');
        usersLink.href = './posts.html';
        usersLink.textContent = 'Back to post page';
        contentElement.append(errorMessage, usersLink);
    }

}   

function createUser(post){
    const postElement = document.createElement('article');
    postElement.classList.add('post');
    const title = document.createElement('h3');
    const body = document.createElement('p');
    const author = document.createElement('div');
    const authorLink = document.createElement('a');
    const authorSpan = document.createElement('span');
    const morePostsFromAuthorLink = document.createElement('a');
    morePostsFromAuthorLink.textContent = 'More Posts From this Author';
    morePostsFromAuthorLink.href = `./posts.html?id=${post.user.id}`;

    authorLink.href = (`./user.html?id=${post.id}`);
    const commentList = document.createElement('div');
    commentList.classList.add('post-comments-wrapper');
    
    title.textContent = post.title;
    authorSpan.textContent = `Author: `;
    body.textContent = post.body;
    authorLink.textContent = post.user.name;
    

    if(post.comments) {
        post.comments.forEach(comment => {
            const title = document.createElement('h4');
            const body = document.createElement('p');
            const email = document.createElement('small');
            console.log(comment);
            title.textContent = comment.name;
            body.textContent = comment.body;
            email.textContent = `User email: ${comment.email}`;
            commentList.append(title, body, email);
        });
    }
 
    author.append(authorSpan, authorLink);
    postElement.append(title, author, body, commentList, morePostsFromAuthorLink);

    return postElement;
}

init();

console.log('veikia');
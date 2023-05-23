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
    const innerPostWrapper = document.createElement('div');
    innerPostWrapper.classList.add('inner-post-wrapper');
    const title = document.createElement('h3');
    const body = document.createElement('p');
    const author = document.createElement('div');
    const authorLink = document.createElement('a');
    const authorSpan = document.createElement('span');
    const morePostsFromAuthorLink = document.createElement('a');
    morePostsFromAuthorLink.innerHTML = 'More posts from this Author 	&rarr;';
    morePostsFromAuthorLink.href = `./posts.html?id=${post.user.id}`;

    authorLink.href = (`./user.html?id=${post.id}`);
    const commentList = document.createElement('div');
    commentList.classList.add('comments-container');
    
    title.textContent = post.title;
    authorSpan.textContent = `by: `;
    body.textContent = post.body;
    authorLink.textContent = post.user.name;
    
    const heading = document.createElement('h4');
    

    if(post.comments) {
        commentList.prepend(heading);
        post.comments.forEach(comment => {
            
            const wrapper = document.createElement('div');
            const titleWrapper = document.createElement('div');
            titleWrapper.classList.add('title-wrapper');
            const title = document.createElement('h4');
            const body = document.createElement('p');
            const email = document.createElement('small');
            
            heading.textContent = 'Comments';
            wrapper.classList.add('comment-wrapper');
            title.textContent = comment.name;
            body.textContent = comment.body;
            email.textContent = `User email: ${comment.email}`;
            titleWrapper.append(title);
            wrapper.append(titleWrapper, body, email);
            commentList.append(wrapper);
        });
    }
 
    author.append(authorSpan, authorLink);
    innerPostWrapper.append(title, author, body, morePostsFromAuthorLink);
    postElement.append(innerPostWrapper, commentList);
    return postElement;
}

init();
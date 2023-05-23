async function init(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const apiUrl = `https://jsonplaceholder.typicode.com/`;
    const apiQuery = `posts${id ? '?userId=' + id + '&' : '?' }_embed=comments&_expand=user`;
    const posts = await fetch(apiUrl + apiQuery);
    const postData = await posts.json();
    
    const contentElement = document.querySelector('#content');
    
    const banner = document.querySelector('.banner');
    banner.classList.add('page-title');

    const pageTitle = document.createElement('h1');
    pageTitle.textContent = 'Posts';
    banner.append(pageTitle);

    const postCards = createPostList(postData);
    contentElement.append(banner, postCards);
    
}

function createPostList(posts) {

    const postsWrapper = document.createElement('div');
    postsWrapper.classList.add('posts-wrapper');


    posts.forEach((post) => {
  
        const postCard = document.createElement('div');
        postCard.classList.add('post-card');
        const title = document.createElement('h4');
        const author = document.createElement('h6');
        const comments = document.createElement('small');

        const titleElement = document.createElement('a');
        titleElement.textContent = post.title;
        titleElement.href = `./post.html?id=${post.id}`;

        const authorElement = document.createElement('a');
        authorElement.textContent = `Author:  ${ post.user.name }`;
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
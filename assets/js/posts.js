async function init(){
    const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?_embed=comments&_expand=user`);
    const postData = await posts.json();

    const contentElement = document.querySelector('#content');
    const userListelement = createPostList(postData);
    contentElement.append(userListelement);
}

function createPostList(posts) {

    const postList = document.createElement('ul');
    postList.classList.add('users-list');

    posts.forEach((post) => {
  

        const liElement = document.createElement('li');
        liElement.classList.add('post-list');

        const linkElement = document.createElement('a');
        linkElement.textContent = `${ post.title } - [Comments: ${ post.comments.length }]`;
        linkElement.href = `./post.html`;

        const authorElement = document.createElement('div');
        authorElement.classList.add('post-author');

        const authorLink = document.createElement('a');
        authorLink.textContent = `Author:  ${ post.user.name }`;
        authorLink.href = `./user.html`;

        authorElement.append(authorLink);

        liElement.append(linkElement, authorElement);

        postList.append(liElement);
    });

    return postList;

}

init();
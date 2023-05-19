function init(){
    const userList = document.querySelector('#user-list');
    const postList = document.querySelector('#posts-list');
    const userDataList = document.querySelector('#user-data');
    getUsers(userList);
    getPosts(postList);
}

init();

async function getUsers(userList){


    const users = await fetch(`https://jsonplaceholder.typicode.com/users?_embed=posts`);
    const data = await users.json();

    if(userList) {

        data.forEach(async (data) => {
            const liElement = document.createElement('li');
            const linkElement = document.createElement('a');
            const userID = data.id;
            const userName = data.name;
            const totalPosts = data.posts.length;
            liElement.appendChild(linkElement);
            linkElement.setAttribute('href', `user.html?id=${userID}`);
            linkElement.textContent = `${userName} (${totalPosts})`;
            
            userList.append(liElement);
        });
    }

    
}

async function getPosts(postList) {
    const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?_expand=user`);
    const data = await posts.json();

    if(postList) {

        let count = 1;

        data.forEach(async (data) => {

            const liElement = document.createElement('li');
            const linkElement = document.createElement('a');
            const authorElement = document.createElement('span');
            const authorLink = document.createElement('a');
 
            
            authorLink.setAttribute('href', './user.html');
            linkElement.setAttribute('href', './post.html');
            authorElement.appendChild(authorLink);
            authorElement.classList.add('author');
            
            liElement.append(linkElement, authorElement);
           
            const postTitle = data.title;
            const author = data.user.name;
            linkElement.textContent = `[${count++}] - by ${postTitle}`;
            authorLink.textContent = ` - by ${author}`;
    
            postList.append(liElement);
        });
    }

}


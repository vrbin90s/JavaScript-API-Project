function init(){
    const userList = document.querySelector('#user-list');
    const userDataList = document.querySelector('#user-data');
    getUsers(userList);
    getUserData(userDataList);
}

init();

async function getUsers(userList){


    const users = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await users.json();

    data.forEach(async data => {
        const liElement = document.createElement('li');
        const linkElement = document.createElement('a');

        const userID = data.id;
        const userName = data.name;
        const totalPosts = await getUserPosts(userID);
        liElement.appendChild(linkElement);
        linkElement.setAttribute('href', `user.html?${userID}`);
        linkElement.textContent = `${userName} (${totalPosts})`;
        
        userList.append(liElement);
    });
    
}

async function getUserPosts(userID){
    const posts = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}/posts`);
    const data = await posts.json();
    const totalPosts = data.length;
    
    return totalPosts;
}


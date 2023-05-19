function init(){
    const userList = document.querySelector('#user-list');
    const userDataList = document.querySelector('#user-data');
    getUsers(userList);
    getUserData(userDataList);
}

init();

async function getUsers(userList){


    const users = await fetch(`https://jsonplaceholder.typicode.com/users?_embed=posts`);
    const data = await users.json();

    data.forEach(async data => {
        const liElement = document.createElement('li');
        const linkElement = document.createElement('a');
        console.log(data);
        const userID = data.id;
        const userName = data.name;
        const totalPosts = data.posts.length;
        liElement.appendChild(linkElement);
        linkElement.setAttribute('href', `user.html?id=${userID}`);
        linkElement.textContent = `${userName} (${totalPosts})`;
        
        userList.append(liElement);
    });
    
}


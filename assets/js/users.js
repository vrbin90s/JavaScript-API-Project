async function init(){
    const users = await fetch(`https://jsonplaceholder.typicode.com/users?_embed=posts`);
    const userData = await users.json();

    const contentElement = document.querySelector('#content');
    const userListelement = createUserList(userData);
    contentElement.append(userListelement);

}

function createUserList(users){

    const userList = document.createElement('ul');
    userList.classList.add('user-list');

    users.forEach(user => {
        const liElement = document.createElement('li');
        liElement.classList.add('user-list');

        const linkElement = document.createElement('a');
        linkElement.href = `user.html?id=${user.id}`;
        linkElement.textContent = `${user.name} - [total posts ${user.posts.length}]`;
       
        liElement.append(linkElement);
        userList.append(liElement);
    });  

    return userList;
}

init();
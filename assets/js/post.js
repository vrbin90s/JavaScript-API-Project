// async function init(){
//     const urlParams = new URLSearchParams(window.location.search);
//     const id = urlParams.get('id');

//     const users = await fetch(`https://jsonplaceholder.typicode.com/posts?&_expand=user/${id}`);
//     const postData = await users.json();

//     const contentElement = document.querySelector('#content');
//     const userElement = createUser(postData);
//     contentElement.append(userElement);

// }

// function createUser(user){
//     const userWrapper = document.createElement('div');
//     userWrapper.classList.add('post-wrapper');
    
   
//     const nameElement = document.createElement('li');
//     const userNameElement = document.createElement('li');
//     const emailElement = document.createElement('li');
//     const addressElement = document.createElement('li');

//     nameElement.textContent = `Name: ${user.name}`;
//     userNameElement.textContent = `Username: ${user.username}`;
//     emailElement.textContent = `Email: ${user.email}`;
//     addressElement.textContent = `${user.name}`;

//     const postList = document.createElement('ul');

//     user.posts.forEach(post => {
//         const liElement = document.createElement('li');
//         const postLink = document.createElement('a');
//         postLink.textContent = post.title;
//         postLink.href = `./post.html?id=${post.id}`;
//         liElement.append(postLink);
//         postList.append(liElement);
//     });

//     userDataList.append(nameElement, userNameElement, emailElement, addressElement, postList);
    

//     userWrapper.append(userDataList);

//     return userWrapper;
// }

// init();
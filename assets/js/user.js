async function init(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const users = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/?_embed=posts&_embed=albums`);
    const userData = await users.json();

    const contentElement = document.querySelector('#content');

    if(id) {
        const userElement = createUser(userData);
        contentElement.append(userElement);
    } else {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = `User not found`;
        const usersLink = document.createElement('a');
        usersLink.href = './users.html';
        usersLink.textContent = 'Back to user list';
        contentElement.append(errorMessage, usersLink);
    }

}

function createUser(user){
    const userWrapper = document.createElement('div');
    userWrapper.classList.add('user-wrapper');
    const userDataList = document.createElement('ul');
    userDataList.classList.add('user-data-list');

   
    const name = document.createElement('li');
    const userName = document.createElement('li');
    const email = document.createElement('li');
    const address = document.createElement('li');
    const phone = document.createElement('li');
    const website = document.createElement('li');
    const company = document.createElement('li');
    const googleMapsLink = document.createElement('a');
    const websiteLink = document.createElement('a');


    name.textContent = `Name: ${user.name}`;
    userName.textContent = `Username: ${user.username}`;
    email.textContent = `Email: ${user.email}`;
    googleMapsLink.textContent = `${user.address.street},  ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
    googleMapsLink.href = `https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`;
    googleMapsLink.target = `_blank`;
    phone.textContent = `Phone: ${user.phone}`;
    websiteLink.textContent = user.website;
    websiteLink.href = user.website;
    company.textContent = `Company: ${user.company.name}`;
    website.innerHTML = `<span>Website:</span> `;
    address.innerHTML = `<span>Adress:</span> `
    
    address.append(googleMapsLink);
    website.append(websiteLink);
    userDataList.append(name, userName, email, address, phone, website, company);
    
    userWrapper.append(userDataList);

    if(user.posts) {
        const postList = document.createElement('ul');
        postList.classList.add('user-posts');
        const titleElement = document.createElement('h3');
        titleElement.textContent = 'User Posts:'

        user.posts.forEach(post => {
            const liElement = document.createElement('li');
            const postLink = document.createElement('a');
            postLink.textContent = post.title;
            postLink.href = `./post.html?id=${post.id}`;
            liElement.append(postLink);
            postList.append(liElement);
        });

        userWrapper.append(titleElement, postList);
    }

    if(user.albums) {
        const albumList = document.createElement('ul');
        albumList.classList.add('user-albums');
        const titleElement = document.createElement('h3');
        titleElement.textContent = 'User albums:'

        user.albums.forEach(album => {
            const liElement = document.createElement('li');
            const albumLink = document.createElement('a');
            albumLink.textContent = album.title;
            albumLink.href = `./album.html?id=${album.id}`;
    
            liElement.append(albumLink);
            albumList.append(liElement);
            
        });

        userWrapper.append(titleElement, albumList);
    }

    return userWrapper;
}

init();
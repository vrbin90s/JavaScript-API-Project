async function init(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const users = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/?_embed=posts&_embed=albums`);
    const userData = await users.json();

    const banner = document.querySelector('.banner');
    banner.classList.add('page-title');

    const pageTitle = document.createElement('h1');
    pageTitle.textContent = 'User Info';
    banner.append(pageTitle);

    const contentElement = document.querySelector('#content');

    if(id) {
        const userElement = createUser(userData);
        contentElement.append(banner, userElement);
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
    const userTable = document.createElement('table');
    userTable.classList.add('user-table');

    const createRow = (headingText , bodyElement) => {
        const row = document.createElement('tr');

        const heading = document.createElement('th');
        heading.textContent = headingText;
        row.append(heading);

        const body = document.createElement('td');
        body.append(bodyElement);
        row.append(body);

        return row;
    }

    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${user.phone}`;
    phoneLink.textContent = user.phone;

    const addressLink = document.createElement('a')
    addressLink.href = `https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`;
    addressLink.target = '_blank';
    addressLink.textContent = `${user.address.street},  ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

    const webLink = document.createElement('a');
    webLink.href = `https://${user.website}`;
    webLink.textContent = user.website;

    const nameRow = createRow('User', user.name);
    const userNameRow = createRow('Username', user.username);
    const emailRow = createRow('Email', user.email);
    const addressRow = createRow('Address', addressLink);
    const phoneRow = createRow('Phone', phoneLink);
    const webRow = createRow('Website', webLink);
    const companyRow = createRow('Company', user.company.name);
        
    userTable.append(nameRow, userNameRow, emailRow, addressRow, phoneRow, webRow, companyRow);
    userWrapper.append(userTable);

    if(user.posts) {
        
        const postList = document.createElement('ul');
        postList.classList.add('user-posts');
        const titleElement = document.createElement('h3');
        titleElement.textContent = `User Posts (${user.posts.length}):`;

        let count = 1;
        user.posts.forEach(post => {
            const liElement = document.createElement('li');
            const postLink = document.createElement('a');
            postLink.textContent = `${count++} - ${post.title}`;
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
        titleElement.textContent = `User albums (${user.albums.length}):`;

        let count = 1;
        user.albums.forEach(album => {
            const liElement = document.createElement('li');
            const albumLink = document.createElement('a');
            albumLink.textContent = `${count++} - ${album.title}`;
            albumLink.href = `./album.html?id=${album.id}`;
    
            liElement.append(albumLink);
            albumList.append(liElement);
            
        });

        userWrapper.append(titleElement, albumList);
    }

    return userWrapper;
}

init();
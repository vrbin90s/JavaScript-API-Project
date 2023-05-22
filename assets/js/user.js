async function init(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const users = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/?_embed=posts&_embed=albums`);
    const userData = await users.json();
    console.log(userData);
    const contentElement = document.querySelector('#content');
    const userElement = createUser(userData);
    contentElement.append(userElement);

    

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
    
    const postList = document.createElement('ul');

    user.posts.forEach(post => {
        const liElement = document.createElement('li');
        const postLink = document.createElement('a');
        postLink.textContent = post.title;
        postLink.href = `./post.html?id=${post.id}`;
        liElement.append(postLink);
        postList.append(liElement);
    });

    const albumList = document.createElement('ul');

    user.albums.forEach(album => {
        const liElement = document.createElement('li');
        const albumLink = document.createElement('a');
        albumLink.textContent = album.title;
        albumLink.href = `./album.html?id=${album.id}`;

        liElement.append(albumLink);
        albumList.append(liElement);
    });

    userWrapper.append(userDataList, postList, albumList);


    return userWrapper;
}

init();
async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search").toLowerCase();
  console.log(searchQuery);

  const apiUrl = `https://jsonplaceholder.typicode.com/db`;
  const searchRequest = await fetch(apiUrl);
  const searchData = await searchRequest.json();
  console.log(searchData);
  
  const banner = document.querySelector('.banner');
  banner.classList.add('page-title');
  const pageTitle = document.createElement('h1');
  pageTitle.textContent = 'Search results';
  banner.append(pageTitle);

  const contentElement = document.querySelector('#content');
  contentElement.append(banner, createSearchResults(searchData, searchQuery));


}

init();

function createSearchResults(database, searchQuery) {
    const resultElement = document.createElement('div');
    resultElement.classList.add('search-result-container');
    const postResultTitle = document.createElement('h4');
    postResultTitle.classList.add('result-title');
    const albumResultTitle = document.createElement('h4');
    albumResultTitle.classList.add('result-title');
    const userResultTitle = document.createElement('h4');
    userResultTitle.classList.add('result-title');

    let postCounter = 0;
    
    resultElement.append(postResultTitle);
    database.posts.forEach(post => {
        const title = post.title.toLowerCase();
        
        if(title.includes(searchQuery)) {
            
            resultElement.append(createPostsResults(post));
            postCounter++;
            postResultTitle.textContent = `Total posts found: ${postCounter}`;
        }
    });

    

    resultElement.append(albumResultTitle);
    let albumCounter = 0;

    database.albums.forEach(album => {
        const title = album.title.toLowerCase();

        if(title.includes(searchQuery)) {
            resultElement.append(createAlbumResults(album));
            albumCounter++;
            albumResultTitle.textContent = `Total albums found: ${albumCounter}`;
        }
    })

    resultElement.append(userResultTitle);
    let userCounter = 0;

    database.users.forEach(user => {
        const name = user.name.toLowerCase();

        if(name.includes(searchQuery)) {
            resultElement.append(createUserResults(user));
            userCounter++;
            userResultTitle.textContent = `Total users found: ${userCounter}`;
        }
       
    });

    if(postCounter === 0 && albumCounter === 0 && userCounter === 0) {
        const noResultsElement = document.createElement('h3');
        noResultsElement.textContent = `No results found`;
        resultElement.append(noResultsElement);
    } 

    return resultElement;
}

function createPostsResults(post){
    const outputElement = document.createElement('div');
    outputElement.classList.add('result-wrapper');
    
    const postTitle = document.createElement('h3');
    postTitle.textContent = `${post.title} - Post`;
    
    const postLink = document.createElement('a');
    postLink.classList.add('search-result-link');
    postLink.href = `./post.html?id=${post.id}`;
    postLink.append(postTitle);
    
    outputElement.append(postLink);

    return outputElement;
}

function createAlbumResults(album){
    const outputElement = document.createElement('div');
    outputElement.classList.add('result-wrapper');
    
    const albumTitle = document.createElement('h3');
    albumTitle.textContent = `${album.title} - Album`;
    
    const albumLink = document.createElement('a');
    albumLink.classList.add('search-result-link');
    albumLink.href = `./album.html?id=${album.id}`;
    albumLink.append(albumTitle);
    
    outputElement.append(albumLink);

    return outputElement;
}

function createUserResults(user){
    const outputElement = document.createElement('div');
    outputElement.classList.add('result-wrapper');
    
    const userTitle = document.createElement('h3');
    userTitle.textContent = `${user.name} - User`;
    
    const userLink = document.createElement('a');
    userLink.classList.add('search-result-link');
    userLink.href = `./user.html?id=${user.id}`;
    userLink.append(userTitle);
    
    outputElement.append(userLink);

    return outputElement;
}

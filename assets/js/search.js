import { SEARCH_CATEGORIES } from "./config.js";
import { createHTMLElement, fetchData, searchResults, selectHTMLElement, getUrlParamValue, setNewUrlParamValue } from "./functions.js";
import header from "./navigation.js";

async function init() {
    const contentElement = selectHTMLElement('#content');
    const searchQuery = getUrlParamValue('search');
    const categoryQuery = getUrlParamValue('category');

    const banner = selectHTMLElement('.banner', 'page-title');
    const pageTitle = createHTMLElement('h1', 'page-title-text', 'Search results');
    banner.append(pageTitle);


    contentElement.append(banner, createSearchForm(searchQuery));
    contentElement.append(await createSearchResults(searchQuery, categoryQuery));
    contentElement.before(header());


}



async function createSearchResults(searchQuery) {
    
    
    
    const outputElement  = createHTMLElement('div', 'search-result-container');
    const searchForm = selectHTMLElement('.main-search-form');
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.target;
        const newSearchQuery = form['search'].value;

        const postData = await fetchData(`https://jsonplaceholder.typicode.com/posts?q=${newSearchQuery}`);
        const albumData = await fetchData(`https://jsonplaceholder.typicode.com/albums?q=${newSearchQuery}`);
        const userData = await fetchData(`https://jsonplaceholder.typicode.com/users?q=${newSearchQuery}`);
        const commentData = await fetchData(`https://jsonplaceholder.typicode.com/comments?q=${newSearchQuery}`);
        const photoData = await fetchData(`https://jsonplaceholder.typicode.com/photos?q=${newSearchQuery}`);

        setNewUrlParamValue(newSearchQuery);

        const postResults = searchResults(postData, './post.html', 'Post', 'Total posts found:');
        const albumResults = searchResults(albumData, './album.html', 'Album', 'Total albums found:');
        const userResults = searchResults(userData, './user.html', 'User', 'Total users found:');
        const commentResults = searchResults(commentData, './comment.html', 'Comment', 'Total comments found:');
        const photoResults = searchResults(photoData, './photo.html', 'Photo', 'Total photos found:');

        const selectedCategory = form['select-field'].value.toLowerCase();

        outputElement.innerHTML = '';


        if(postData.length > 0 && selectedCategory === 'posts') {
            
            outputElement.append(postResults);
        }

        if(albumData.length > 0 && selectedCategory === 'albums') {
    
            outputElement.append(albumResults);
        }

        if(userData.length > 0 && selectedCategory === 'users') {
            outputElement.append(userResults);
        }

        if(commentData.length > 0 && selectedCategory === 'comments') {
            outputElement.append(commentResults);
        }

        if(photoData.length > 0 && selectedCategory === 'photos') {
            outputElement.append(photoResults);
        }
        if(selectedCategory === 'all'){
            outputElement.append(postResults, albumResults, userResults, commentResults, photoResults);
        }
        
    });


    if(searchQuery) {

        const postData = await fetchData(`https://jsonplaceholder.typicode.com/posts?q=${searchQuery}`);
        const albumData = await fetchData(`https://jsonplaceholder.typicode.com/albums?q=${searchQuery}`);
        const userData = await fetchData(`https://jsonplaceholder.typicode.com/users?q=${searchQuery}`);
        const commentData = await fetchData(`https://jsonplaceholder.typicode.com/comments?q=${searchQuery}`);
        const photoData = await fetchData(`https://jsonplaceholder.typicode.com/photos?q=${searchQuery}`);

        const selectField = searchForm['select-field'];
        const previousPageLocation = document.referrer;

        if(postData.length > 0 && previousPageLocation.endsWith('posts.html') || previousPageLocation.endsWith('index.html')) {
            const postResults = searchResults(postData, './post.html', 'Post', 'Total posts found:');
            selectField.value = 'Posts';
            outputElement.append(postResults);
            
        } 

        if(albumData.length > 0 && previousPageLocation.endsWith('albums.html') || previousPageLocation.endsWith('index.html')) {
            const albumResults = searchResults(albumData, './album.html' ,'Album', 'Total albums found:');
            selectField.value = 'Albums';
            outputElement.append(albumResults);
        } 

        if(userData.length > 0 && previousPageLocation.endsWith('users.html') || previousPageLocation.endsWith('index.html')) {
            const userResults = searchResults(userData, './user.html' ,'User', 'Total users found:');
            selectField.value = 'Users';
            outputElement.append(userResults);
        }
        if(commentData.length > 0 && previousPageLocation.endsWith('index.html')) {
            const commentResults = searchResults(commentData, './comment.html' ,'Comments', 'Total comments found:');
            selectField.value = 'All';
            outputElement.append(commentResults);
        } 
        if(photoData.length > 0 && previousPageLocation.endsWith('index.html')) {
            const photoResults = searchResults(photoData, './photo.html' ,'Photos', 'Total photos found:');
            selectField.value = 'All';
            outputElement.append(photoResults);
        }  
        
    }
    
    return outputElement;
}



function createSearchForm(searchQuery) {
    const formWrapper = createHTMLElement('div', 'search-form-wrapper');
    const form = createHTMLElement('form', 'main-search-form');
    
    const inputText = createHTMLElement('input', 'text-field');
    inputText.placeholder = 'Search for...';
    inputText.name = 'search';
    inputText.value =  searchQuery;
    
    const button = createHTMLElement('button', 'submit-button', 'Search');
    button.type = 'submit';

    const icon = createHTMLElement("span", "search-icon");
    icon.innerHTML = `<i class="fa fa-search" aria-hidden="true"></i>`;

    const selectElement = createHTMLElement('select', 'select-field');
    selectElement.id = 'select-field';
    form.append(inputText, selectElement, button);
    formWrapper.append(icon,form);

    SEARCH_CATEGORIES.forEach(category => {
        const catElement = createHTMLElement('option', 'select-options', category);
        catElement.value = category;
        selectElement.append(catElement);
    });

    return formWrapper;
}

init();



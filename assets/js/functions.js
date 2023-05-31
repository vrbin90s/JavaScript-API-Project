export async function fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export function getUrlParamValue(value) {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get(value);
    return paramValue;
} 

export function setNewUrlParamValue(value) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('search', value);

    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    history.pushState(null, '', newUrl);
}

export function createHTMLElement(type, className, text) {
    const element = document.createElement(type);
    if(className) {
        element.classList.add(className);
    }
    
    if(text && typeof text === 'string') {
        element.textContent = text;
    } else if(typeof text === 'object' && text instanceof HTMLElement) {
        element.append(text);
    }

    return element;
}

export function selectHTMLElement(selector, className) {
    const element = document.querySelector(selector);

    if(className) {
        element.classList.add(className);
    }
    return element;
    
}

export function searchResults(searchData, pageLink, name, totalTitle){
    
    const resultElement = createHTMLElement('div', 'result-wrapper');  

    let counter = 0;

    searchData.forEach(data => {
        const title = createHTMLElement('h3', 'result-item', `${data.title ? data.title : data.name} - ${name}`);
        const link = createHTMLElement('a', 'search-result-link');
        link.href = `${pageLink}?id=${data.id}`;
        link.append(title);  
        resultElement.append(link);
        counter++;
        
    });

    const itemTitle = createHTMLElement('h4', 'result-title', `${totalTitle} ${counter}`);
    resultElement.prepend(itemTitle);
    return resultElement;

}


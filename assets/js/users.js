import { createHTMLElement, fetchData, selectHTMLElement } from "./functions.js";
import header from "./navigation.js";


async function init(){
    
    const userData = await fetchData(`https://jsonplaceholder.typicode.com/users?_embed=posts`);

    const banner = selectHTMLElement('.banner', 'page-title');
    const pageTitle = createHTMLElement('h1', 'page-title-text', 'Users');
    banner.append(pageTitle);

    const contentElement = selectHTMLElement('#content');
    const userTable = createUserList(userData);
    contentElement.append(banner, userTable);
    contentElement.before(header());


}

function createUserList(users){

    const table = createHTMLElement('table');
    const thead = createHTMLElement('thead');
    const tbody = createHTMLElement('tbody');

    const headingRow = createHTMLElement('tr');
    
    const headings = ['User Name', 'Total Posts'];

    headings.forEach((heading) => {
        const headingCell = createHTMLElement('th', 'user-table-heading', heading);
        headingRow.append(headingCell);
        thead.append(headingRow);
        
    })

    users.forEach(user => {

        const row = createHTMLElement('tr');
        const nameCell = createHTMLElement('td', 'name-table-cell');
        const postsCell = createHTMLElement('td', 'count-table-cell')
        postsCell.textContent = user.posts.length;
        const linkElement = createHTMLElement('a', 'link-element', user.name);
        linkElement.href = `user.html?id=${user.id}`;
       
        nameCell.append(linkElement);
        row.append(nameCell, postsCell);
        tbody.append(row);
        
    });  

    table.append(thead, tbody);

    return table;
}

init();
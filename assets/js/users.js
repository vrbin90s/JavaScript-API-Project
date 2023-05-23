async function init(){
    const users = await fetch(`https://jsonplaceholder.typicode.com/users?_embed=posts`);
    const userData = await users.json();

    const banner = document.querySelector('.banner');
    banner.classList.add('page-title');
    const pageTitle = document.createElement('h1');
    pageTitle.textContent = 'Users';
    banner.append(pageTitle);

    const contentElement = document.querySelector('#content');
    const userTable = createUserList(userData);
    contentElement.append(banner, userTable);

}

function createUserList(users){

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headingRow = document.createElement('tr');
    
    const headings = ['User Name', 'Total Posts'];

    headings.forEach((heading) => {
        const headingCell = document.createElement('th');
        headingCell.textContent = heading;
        headingRow.append(headingCell);
        thead.append(headingRow);
        
    })

    users.forEach(user => {

        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const postsCell = document.createElement('td');
        postsCell.classList.add('post-count');
        postsCell.textContent = user.posts.length;

        const linkElement = document.createElement('a');
        linkElement.href = `user.html?id=${user.id}`;
        linkElement.textContent = user.name;

        nameCell.append(linkElement);
        row.append(nameCell, postsCell);
        tbody.append(row);
        
    });  

    table.append(thead, tbody);

    return table;
}

init();
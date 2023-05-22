async function init(){
    const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?_embed=comments&_expand=user`);
    const postData = await posts.json();

    const contentElement = document.querySelector('#content');
    const postTable = createPostList(postData);
    contentElement.append(postTable);
}

function createPostList(posts) {

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headingRow = document.createElement('tr');
    
    const headings = ['Posts', 'Author', 'Comments'];

    headings.forEach((heading) => {
        const headingCell = document.createElement('th');
        headingCell.textContent = heading;
        headingRow.append(headingCell);
        thead.append(headingRow);
        
    })


    posts.forEach((post) => {
  
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        const authorCell = document.createElement('td');
        const commentsCell = document.createElement('td');

        const titleElement = document.createElement('a');
        titleElement.textContent = post.title;
        titleElement.href = `./post.html`;

        const authorElement = document.createElement('a');
        authorElement.textContent = `Author:  ${ post.user.name }`;
        authorElement.href = `./user.html`;

        titleCell.append(titleElement);
        authorCell.append(authorElement);
        commentsCell.textContent = post.comments.length;

        row.append(titleCell, authorCell, commentsCell);
        tbody.append(row);
    });

    table.append(thead, tbody);

    return table;

}

init();
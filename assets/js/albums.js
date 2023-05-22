async function init(){
    const albums = await fetch(`https://jsonplaceholder.typicode.com/albums?_embed=photos&_expand=user`);
    const albumData = await albums.json();

    const contentElement = document.querySelector('#content');
    const albumTable = createAlbumList(albumData);
    contentElement.append(albumTable);

}

function createAlbumList(albums) {

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headingRow = document.createElement('tr');

    const headings = ['Albums', 'Thumbnail', 'Total Photos'];

    headings.forEach((heading) => {
        const headingCell = document.createElement('th');
        headingCell.textContent = heading;
        headingRow.append(headingCell);
        thead.append(headingRow);
        
    })

    albums.forEach(album => {
        const row = document.createElement('tr');
        const albumCell = document.createElement('td');
        const photoCell = document.createElement('td');
        const imageCell = document.createElement('td');

        imageCell.classList.add('image-cell');


        const photoElement = document.createElement('img');
        photoElement.classList.add('album-image');
        photoElement.src = album.photos[1].url;

        const linkElement = document.createElement('a');
        linkElement.textContent = album.title;
        linkElement.href = `./album.html?id=${album.id}`;

        albumCell.append(linkElement);
        photoCell.textContent = album.photos.length;
        imageCell.append(photoElement);

        row.append(albumCell, imageCell, photoCell);
        tbody.append(row);
    });


    table.append(thead, tbody);

    return table;

}

init();
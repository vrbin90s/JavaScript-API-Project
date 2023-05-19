async function init(){
    const albums = await fetch(`https://jsonplaceholder.typicode.com/albums?_embed=photos&_expand=user`);
    const albumData = await albums.json();

    const contentElement = document.querySelector('#content');
    const userListelement = createAlbumList(albumData);
    contentElement.append(userListelement);

}

function createAlbumList(albums) {
    const albumList = document.createElement('div');
    albumList.classList.add('album-list');

    albums.forEach(album => {
        const liElement = document.createElement('div');
        liElement.classList.add('list-item');
        liElement.textContent = `${album.title} by: ${album.user.name}. Total photos in album ${album.photos.length}`;

        console.log(album);
        const photoElement = document.createElement('img');
        photoElement.src = album.photos[1].url;

        const linkElement = document.createElement('a');
        linkElement.href = '#';
        linkElement.append(photoElement);

        liElement.append(linkElement);

        albumList.append(liElement);
    });

    return albumList;

}

init();
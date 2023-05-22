function init(){
    
    const headerElement = document.querySelector('.header');
    const navigation = document.createElement('nav');
    navigation.classList.add('navigation');

    const menuLinks = [
        {
            name: 'users',
            url: './users.html'
        },
        {
            name: 'posts',
            url: './posts.html'
        },
        {
            name: 'albums',
            url: './albums.html'
        }

    ];

    headerElement.append(navigation);
    navigation.append(createMenuItems(menuLinks));

}

function createMenuItems(menuLinks){
    const menuList = document.createElement('ul');
    menuList.classList.add('menu-list');

    menuLinks.forEach(link => {
        const menuItem = document.createElement('li');
        menuItem.classList.add('menu-item');

        const linkItem = document.createElement('a');
        linkItem.classList.add('menu-link');
        linkItem.textContent = link.name;
        linkItem.href = link.url;

        menuItem.append(linkItem);
        menuList.append(menuItem);
        
        const currentUrl = window.location.href;
 
        if(currentUrl === linkItem.href) {
            linkItem.classList.add('active');
        }
    
    });

    return menuList;
}

init();
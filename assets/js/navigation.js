function init(){
    
    const headerElement = document.querySelector('.header');
    const navigation = document.createElement('nav');
    const logo = document.createElement('img');
    logo.src = './assets/images/api.png';
    const logoLink = document.createElement('a');
    logoLink.href = './index.html';
    logoLink.append(logo);

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

    headerElement.append(logoLink, navigation);
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
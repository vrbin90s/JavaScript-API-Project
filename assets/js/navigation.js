function init() {
  const headerElement = document.querySelector(".header");
  const navigation = document.createElement("nav");
  const mobileNavToggle = document.createElement("button");
  mobileNavToggle.classList.add("mobile-nav-toggle");
  mobileNavToggle.setAttribute("aria-control", "primary-navigation");
  mobileNavToggle.ariaExpanded = false;

  const logo = document.createElement("img");
  logo.src = "./assets/images/api.png";
  const logoLink = document.createElement("a");
  logoLink.href = "./index.html";
  logoLink.append(logo);

  navigation.classList.add("navigation");

  const menuLinks = [
    {
      name: "users",
      url: "./users.html",
    },
    {
      name: "posts",
      url: "./posts.html",
    },
    {
      name: "albums",
      url: "./albums.html",
    },
  ];

  mobileNavToggle.addEventListener("click", () => {
    const primaryNav = navigation.querySelector(".primary-navigation");
    const visibility = primaryNav.getAttribute("data-visable");

    if (visibility === "false") {
      primaryNav.setAttribute("data-visable", true);
      mobileNavToggle.ariaExpanded = true;
    } else if (visibility === "true") {
      primaryNav.setAttribute("data-visable", false);
      mobileNavToggle.ariaExpanded = false;
    }

    console.log(visibility);
  });

  const searchForm = document.createElement("form");
  searchForm.classList.add("search-form");
  const searchInput = document.createElement("input");
  searchInput.name = "search";
  searchInput.id = "search-input";
  const icon = document.createElement("span");
  icon.classList.add("search-icon");
  icon.innerHTML = `<i class="fa fa-search" aria-hidden="true"></i>`;

  searchForm.append(icon, searchInput);

  searchForm.addEventListener("submit", (event) => {

    const form = event.target;
    form.action = './search.html';
    
  });

  headerElement.append(logoLink, searchForm, navigation, mobileNavToggle);
  navigation.append(createMenuItems(menuLinks));
}

function createMenuItems(menuLinks) {
  const menuList = document.createElement("ul");
  menuList.classList.add("primary-navigation");
  menuList.setAttribute("data-visable", false);

  menuLinks.forEach((link) => {
    const menuItem = document.createElement("li");
    menuItem.classList.add("menu-item");

    const linkItem = document.createElement("a");
    linkItem.classList.add("menu-link");
    linkItem.textContent = link.name;
    linkItem.href = link.url;

    menuItem.append(linkItem);
    menuList.append(menuItem);

    const currentUrl = window.location.href;

    if (currentUrl === linkItem.href) {
      linkItem.classList.add("active");
    }
  });

  return menuList;
}

init();

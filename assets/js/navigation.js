import { MAIN_MENU_ITEMS } from "./config.js";
import { createHTMLElement, getUrlParamValue } from "./functions.js";

const searchQuery = getUrlParamValue("search");

export default function header() {
  // const searchQuery = getUrlParamValue('search');
  const headerElement = createHTMLElement("header", "header");
  const navigation = createHTMLElement("nav", "navigation");

  if (!location.pathname.endsWith("search.html")) {
    navigation.append(createSearchForm());
  }

  navigation.append(createMenuItems());
  headerElement.append(createLogo(), navigation, createMobileMenu(navigation));
  
  return headerElement;
}

function createLogo() {
  const logo = createHTMLElement("img");
  logo.src = "./assets/images/api.png";
  const logoLink = createHTMLElement("a");
  logoLink.href = "./index.html";
  logoLink.append(logo);
  return logoLink;
}

function createMobileMenu(navigation) {
  const mobileNavToggle = createHTMLElement("button", "mobile-nav-toggle");
  mobileNavToggle.setAttribute("aria-control", "primary-navigation");
  mobileNavToggle.ariaExpanded = false;

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
  });

  return mobileNavToggle;
}

function createMenuItems() {
  const menuList = createHTMLElement("ul", "primary-navigation");
  menuList.setAttribute("data-visable", false);

  MAIN_MENU_ITEMS.forEach((link) => {
    const menuItem = createHTMLElement("li", "menu-item");
    const linkItem = createHTMLElement("a", "menu-link", link.name);
    linkItem.href = link.url;

    menuItem.append(linkItem);
    menuList.append(menuItem);

    const currentUrl = window.location.href;

    if (currentUrl.includes(linkItem.href)) {
      linkItem.classList.add("active");
    }
  });

  return menuList;
}

function createSearchForm() {
  const searchForm = createHTMLElement("form", "search-form");
  const searchInput = createHTMLElement("input", "search-text-input");
  searchInput.name = "search";
  searchInput.id = "search-input";
  searchInput.placeholder = "Search for..";


  const icon = createHTMLElement("span", "search-icon");
  icon.innerHTML = `<i class="fa fa-search" aria-hidden="true"></i>`;

  searchForm.append(icon, searchInput);

  searchForm.addEventListener("submit", (event) => {
    const form = event.target;
    if(form)
    form.action = `./search.html`;
  });

  return searchForm;
}

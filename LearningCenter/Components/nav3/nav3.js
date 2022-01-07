const navHeaders = document.querySelectorAll('.navbar-header--title');
const navMenuContainer = document.querySelector('.navbar-menu');
const navMenus = document.querySelectorAll('.navigation-component');
const mousetrap = document.querySelector('.mousetrap');
navHeaders.forEach(header => header.addEventListener('mouseenter', (e) => {
    showMenu(e);
}));


function showMenu(el) {
    removeAllClasses();
    // make a div that sits under the navigation larger than the navigation.
    mousetrap.classList.add('set');
    mousetrap.addEventListener('mouseenter', removeAllClasses);
    // if mouse enters/over that div remove all classes
    // make navbarcontainer slide down
    navMenuContainer.classList.add('hoverActive');
    // find the matching data attribute for the menu 
    navMenus.forEach(menu => menu.firstElementChild.dataset.menu == el.currentTarget.dataset.title ? addClass(menu) : console.log('wrong class mate'));
}

function addClass(el) {
    console.log('class added');
    el.classList.add('active');
}

function removeAllClasses() {
    mousetrap.classList.remove('set');
    navMenus.forEach(menu => menu.classList.remove('active'));
    navMenuContainer.classList.remove('hoverActive');
    mousetrap.removeEventListener("mouseenter", removeAllClasses);
}
const navHeaders = document.querySelectorAll('.nav');
const navMenuContainer = document.querySelector('.nav--bar-menus');
const navMenus = document.querySelectorAll('.nav-menu');
const mousetrap = document.querySelector('.mouse-trap');
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
    navMenuContainer.classList.add('showContainer');
    // find the matching data attribute for the menu 
    navMenus.forEach(menu => menu.dataset.menu == el.currentTarget.dataset.title ? addClass(menu) : null);
}

function addClass(el) {
    console.log('class added');
    el.classList.add('showMenu');
}

function removeAllClasses() {
    mousetrap.classList.remove('set');
    navMenus.forEach(menu => menu.classList.remove('showMenu'));
    navMenuContainer.classList.remove('showContainer');
    mousetrap.removeEventListener("mouseenter", removeAllClasses);
}


// NAV
// IF MOUSE OVER ELEMENT NAV HEADER REMOVE CLASS FROM ALL OTHER ELEMENTS
// IF MOUSE OVER ELEMENT ADD OVERLAY AREA OF MENU... IF MOUSE OUT OF RECTANGLE REMOVE CLASSES
// IF MENU IS TRIGGERED SET MENU ACTIVE FOR THAT ELEMENT
// IF MENU IS ACTIVE ADD EVENT LISTENER TO BODY.. IF MOUSE ENTERS BODY.. DEACTIVATE MENU
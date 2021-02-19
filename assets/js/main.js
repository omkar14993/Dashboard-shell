/** Logic to expand/collapse Sidebar */
var shouldOpen = true;

function toggleSidebar() {
    if (shouldOpen) {
        //console.log("opening sidebar");
        document.getElementById("navbar").style.width = "250px";
        shouldOpen = false;
    } else {
        //console.log("closing sidebar");
        document.getElementById("navbar").style.width = "85px";
        shouldOpen = true;
    }
}
/** End of logic for expand/collapse sidebar  */





/** Logic to expand/collapse the sub-menus inside Sidebar */
/** LINK ACTIVE */
const linkColor = document.querySelectorAll('.nav__link')

function colorLink() {
    linkColor.forEach(l => l.classList.remove('active'))
    this.classList.add('active')
}
linkColor.forEach(l => l.addEventListener('click', colorLink))


/* COLLAPSE MENU */
const linkCollapse = document.getElementsByClassName('collapse__link')
var i;

for (i = 0; i < linkCollapse.length; i++) {
    linkCollapse[i].addEventListener('click', function() {
        const collapseMenu = this.nextElementSibling
        collapseMenu.classList.toggle('showCollapse')

        const rotate = collapseMenu.previousElementSibling
        rotate.classList.toggle('rotate')
    })
}
/** End of logic for sub-menu expand/collapse */




/* Routing logic for SPA */

const HomePage = {
    render: () => {
        return `
          <h1>Home Page</h1>
          <p>This is Home Page</p>
      `;
    }
}

const DashboaardPage = {
    render: () => {
        return `
          <h1>Dashboard Page</h1>
          <p>This is Dashboard</p>
      `;
    }
}

const BugPage = {
    render: () => {
        return `
          <h1>Bug Page</h1>
          <p>This is Bug</p>
      `;
    }
}

const EpicPage = {
    render: () => {
        return `
          <h1>Epic Page</h1>
          <p>This is Epic</p>
      `;
    }
}

const DefaultComponent = {
    render: () => {
        return `
          <p>Default Page</p>
      `;
    }
}

const routes = [
    { path: '/', component: DefaultComponent },
    { path: '/home', component: HomePage, },
    { path: '/dashboard', component: DashboaardPage, },
    { path: '/bug', component: BugPage, },
    { path: '/epic', component: EpicPage, },
];


/** extract the location from location.hash or document.location.hash and trim the # part of url */
const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

/** Find the component matching the location url and return the component name or undefined */
const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
    const path = parseLocation();
    const { component = DefaultComponent } = findComponentByPath(path, routes) || {};
    // now that we have the component name, render the component on the UI.
    document.getElementById('section').innerHTML = component.render();
};

// Event listener to watch for location changes and load default page for 1st time.
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
/** End of Routing logic */
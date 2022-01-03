/* THIS MODULE PASSES THE MAIN CONTAINER FOR THE NOTE COMPONENT
    PASSES ROOT ELEMENT INTO THE APP.JS CONSTRUCTOR
    INITIALIZES THE APP CLASS & ITS CONSTRUCTOR
*/

import App from "./App.js"

const root = document.getElementById("app");

const app = new App(root);

import {sManager} from "./states.js";

let home_button = document.querySelector("button#home");
home_button.addEventListener("click", () => {
    sManager.Update('home');
    sManager.Render();
})

let world_button = document.querySelector("button#world");
world_button.addEventListener("click", () => {
    sManager.Update('world');
    sManager.Render();
})

let main_menu_button = document.querySelector("button#main-menu");
main_menu_button.addEventListener("click", () => {
    sManager.Update('main');
    sManager.Render();
})

let item_menu_button = document.querySelector("button#item-menu");
item_menu_button.addEventListener("click", () => {
    sManager.Update('item');
    sManager.Render();
})

let modal_close_button = document.querySelectorAll("span.modal-close");
modal_close_button.forEach(e => {
    e.addEventListener("click", () => {
        sManager.Update('close');
    })
})

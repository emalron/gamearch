import {sManager, home_state} from "./states.js";
import {statMonitor} from "./watchers.js";
import {combatManager} from "./combat.js";
import {Player, Item} from "./characters.js";

let player = new Player("Jes");
let sword = new Item("Sword", 5);
player.items.push(sword);

sManager.Change(home_state);
sManager.Render();
statMonitor.Notify(player)
combatManager.SetPlayer(player);

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

let hunting_button = document.querySelector("button#hunting");
console.log(hunting_button);
hunting_button.addEventListener("click", () => {
    combatHunting();
});

function combatHunting() {
    combatManager.Combat("Orc");
}
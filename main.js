import {sManager, town_state} from "./states.js";
import {statMonitor} from "./watchers.js";
import {combatManager} from "./combat.js";
import {Player, Item} from "./characters.js";

let player = new Player("Jes");
let sword = new Item("Sword", 5);
player.items.push(sword);

sManager.Change(town_state);
sManager.Render();
statMonitor.Notify(player)
combatManager.SetPlayer(player);

const town_button = document.querySelector("button#town");
town_button.addEventListener("click", () => {
    sManager.Update('town');
    sManager.Render();
})
const world_button = document.querySelector("button#world");
world_button.addEventListener("click", () => {
    sManager.Update('world');
    sManager.Render();
})
const home_button = document.querySelector("button#home");
home_button.addEventListener("click", () => {
    sManager.Update('home-modal', player);
    sManager.Render();
})
const forest_button = document.querySelector("button#forest");
forest_button.addEventListener("click", () => {
    sManager.Update('forest-modal');
    sManager.Render();
})
const cave_button = document.querySelector("button#cave");
cave_button.addEventListener("click", () => {
    sManager.Update('cave-modal');
    sManager.Render();
})
const tower_button = document.querySelector("button#tower");
tower_button.addEventListener("click", () => {
    sManager.Update('tower-modal');
    sManager.Render();
})
const modal_close_button = document.querySelectorAll("span.modal-close");
modal_close_button.forEach(e => {
    e.addEventListener("click", () => {
        sManager.Update('close');
    })
})
const combat_close_button = document.querySelectorAll(".combat-close");
combat_close_button.forEach(e => {
    e.addEventListener("click", () => {
        sManager.Update('close');
    })
})

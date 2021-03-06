import {sManager, town_state} from "./states.js";
import {statMonitor} from "./watchers.js";
import {combatManager} from "./combat.js";
import {Player, Item} from "./characters.js";

let player = new Player("Jes");
let sword = new Item("Sword", 4);
player.items.push(sword);
player.key = 200;

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
const guild_button = document.querySelector("button#guild");
guild_button.addEventListener("click", () => {
    sManager.Update('guild-modal', player);
    sManager.Render();
})
const blacksmith_button = document.querySelector("button#blacksmith");
blacksmith_button.addEventListener("click", () => {
    sManager.Update('blacksmith-modal', player);
    sManager.Render();
})
const forest_button = document.querySelector("button#forest");
forest_button.addEventListener("click", () => {
    sManager.Update('forest-modal', player);
    sManager.Render();
})
const cave_button = document.querySelector("button#cave");
cave_button.addEventListener("click", () => {
    sManager.Update('cave-modal', player);
    sManager.Render();
})
const tower_button = document.querySelector("button#tower");
tower_button.addEventListener("click", () => {
    sManager.Update('tower-modal', player);
    sManager.Render();
})
const shop_button = document.querySelector("button#shop");
shop_button.addEventListener("click", () => {
    console.log('shop');
    sManager.Update('shop-modal');
    sManager.Render();
});
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
const combat_eatfood_button = document.querySelectorAll(".combat-eatfood");
combat_eatfood_button.forEach(e => {
    e.addEventListener("click", () => {
        player.hp = player.max_hp;
        player.food--;
        sManager.Update('fight', player)
        sManager.Render();
    })
})
const guild_accept_button = document.querySelectorAll("button#quest-accept");
guild_accept_button.forEach(e => {
    e.addEventListener("click", () => {
        sManager.Update('processing', player);
        sManager.Render();
    })
})
const guild_reward_button = document.querySelectorAll("button#quest-reward");
guild_reward_button.forEach(e => {
    e.addEventListener("click", () => {
        sManager.Update('completed', player);
        sManager.Render();
    })
})
const shop_buy_button = document.querySelectorAll("button#shop-buy");
shop_buy_button.forEach(e => {
    e.addEventListener("click", () => {
        console.log('shop-buy');
        sManager.Update('buy', player);
        sManager.Render();
    })
})
const blacksmith_upgrade_button = document.querySelector("button#blacksmith-upgrade");
blacksmith_upgrade_button.addEventListener("click", () => {
    sManager.Update('upgrade', player);
    sManager.Render();
})


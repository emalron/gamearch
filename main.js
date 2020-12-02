import {State, StateManager} from './helpers.js';
import {Player, Item, Monster} from './characters.js';
import {combatNews} from './watchers.js';

let main_menu_state = new State("main");
let home_state = new State("home");
let world_state = new State("world");
const sManager = new StateManager();

home_state.Update = function(key) {
    switch(key) {
        case 'menu': // open main menu
            sManager.Push(main_menu_state);
            break;
        case 'world': // enter the world
            sManager.Change(world_state);
            break;
    }
}

main_menu_state.Update = function(key) {
    switch(key) {
        case 'close': // close main menu
            sManager.Pop();
            break;
        case 'item': // open item menu
            sManager.Push(item_menu_state);
            break;
    }
}
main_menu_state.Render = function() {
    console.log(this.element);
    this.element.style.display = "block";
}

world_state.Update = function(key) {
    switch(key) {
        case 'menu':
            sManager.Push(main_menu_state);
            break;
        case 'home':
            sManager.Change(home_state);
            break;
    }
}

let places = [
    () => { sManager.Change(home_state); },
    () => { sManager.Change(world_state); },
    () => { 
        sManager.Push(main_menu_state);
    },
]

// button settings
let buttons = document.querySelectorAll("div.control button");
for(let i=0; i<3; i++) {
    buttons[i].addEventListener("click", () => {
        places[i]();
        sManager.Render();
    })
}
let modal_close_button = document.querySelectorAll("span.close");
modal_close_button.forEach(e => {
    e.addEventListener("click", () => {
        let modal = e.parentElement.parentElement;
        modal.style.display = "none";
        sManager.Pop(); // 하 ... 커플링 넘 심한데 어떻게 고쳐야되지??? 일단 ㄱ
    })
})

let player = new Player("Jes");
let sword = new Item("Sword", 5);
player.items.push(sword);

let monster = new Monster("Orc", 20, 2, 1, 0);

function combat(player, monster) {
    let combatants = [player, monster];
    let turn = 0;
    let side = 0;
    while(player.hp > 0 && monster.hp > 0) {
        side = turn % 2;
        let attacker = combatants[side];
        let defender = combatants[(side+1)%2];
        let damage = attacker.GetPower();
        defender.TakeDamage(damage);
        turn++;
        combatNews.Notify({type: 'ATTACK', actors: [attacker.name, defender.name], detail: {damage: damage, hp: defender.hp}});
    }
    let player_win = monster.hp <= 0 && player.hp > 0;
    if(player_win) {
        let token_ = monster.GetToken();
        player.xp += monster.xp;
        player.token += token_;
        combatNews.Notify({type: 'KILL', actors: [player.name, monster.name], detail: {xp: monster.xp, token: token_}});
    }
    return;
}

combat(player, monster);
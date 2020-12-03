import {State, StateManager} from "./helpers.js"

let main_menu_state = new State("main");
let home_state = new State("home");
let world_state = new State("world");
let item_menu_state = new State("item");
const sManager = new StateManager();

home_state.Update = function(key) {
    switch(key) {
        case 'main': // open main menu
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

item_menu_state.Update = function(key) {
    switch(key) {
        case 'close': // close main menu
            sManager.Pop();
            break;
    }
}

world_state.Update = function(key) {
    switch(key) {
        case 'main':
            sManager.Push(main_menu_state);
            break;
        case 'home':
            sManager.Change(home_state);
            break;
    }
}

export {sManager, home_state, world_state, main_menu_state, item_menu_state};
import {State, StateManager} from "./helpers.js"

const town_state = new State("town");
const blacksmith_modal_state = new State("blacksmith-modal");
const guild_modal_state = new State("guild-modal");
const shop_modal_state = new State("shop-modal");
const home_modal_state = new State("home-modal");
const world_state = new State("world");
const forest_modal_state = new State("forest-modal");
const cave_modal_state = new State("cave-modal");
const tower_modal_state = new State("tower-modal");
const sManager = new StateManager();
town_state.Update = (key) => {
    switch(key) {
        case 'home-modal':
            sManager.Push(home_modal_state);
            break;
        case 'shop-modal':
            sManager.Push(shop_modal_state);
            break;
        case 'guild-modal':
            sManager.Push(guild_modal_state);
            break;
        case 'blacksmith-modal':
            sManager.Push(blacksmith_modal_state);
            break;
        case 'world':
            sManager.Change(world_state);
            break;
    }
}
world_state.Update = (key) => {
    switch(key) {
        case 'forest-modal':
            sManager.Push(forest_modal_state);
            break;
        case 'cave-modal':
            sManager.Push(cave_modal_state);
            break;
        case 'tower-modal':
            sManager.Push(tower_modal_state);
            break;
        case 'town':
            sManager.Change(town_state);
            break;
    }
}
home_modal_state.Update = (key) => {
    switch(key) {
        case 'close':
            sManager.Pop();
            break;
    }
}
forest_modal_state.Update = (key) => {
    switch(key) {
        case 'close':
            sManager.Pop();
            break;
    }
}
cave_modal_state.Update = (key) => {
    switch(key) {
        case 'close':
            sManager.Pop();
            break;
    }
}
tower_modal_state.Update = (key) => {
    switch(key) {
        case 'close':
            sManager.Pop();
            break;
    }
}
export {sManager, town_state};
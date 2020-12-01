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

/*
    Scenario
    Home, menu -> Main Menu, close -> Home, world -> World, menu
    -> Main menu, item -> Item, buy -> Item, close -> Main Menu, close
    -> World, home -> Home
*/
function test_enter(e, place) {
    enter(place);
    sManager.Render();
}

function enter(place) {
    switch(place) {
        case 'home':
            sManager.Change(home_state);
            break;
        case 'world':
            sManager.Change(world_state);
            break;
    }
}
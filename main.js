let main_menu_state = new State("Main menu");
let item_menu_state = new State("Item menu");
let home_state = new State("Home");
let world_state = new State("World");
let combat_state = new State("Combat");
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

item_menu_state.Update = function(key) {
    switch(key) {
        case 'close': // close main
            sManager.Pop();
            break;
        case 'buy':
            console.log(`someone bought something!`)
            break;
    }
}

/*
    Scenario
    Home, menu -> Main Menu, close -> Home, world -> World, menu
    -> Main menu, item -> Item, buy -> Item, close -> Main Menu, close
    -> World, home -> Home
*/
sManager.Change(home_state);
sManager.Render();
sManager.Update('menu');
sManager.Render();
sManager.Update('close');
sManager.Render();
sManager.Update('world');
sManager.Render();
sManager.Update('menu');
sManager.Update('item');
sManager.Render();
sManager.Update('buy');
sManager.Update('close');
sManager.Update('close');
sManager.Render();
sManager.Update('home');
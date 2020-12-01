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
        console.log(`${attacker.name} attacked: ${defender.name} has ${defender.hp} Hit points`)
        turn++;
    }
    let player_win = monster.hp <= 0 && player.hp > 0;
    if(player_win) {
        player.xp += monster.xp;
        const token_ = monster.GetToken();
        player.token += token_;
        console.log(`${player.name} got ${monster.xp} XP`)
        if(token_ > 0) 
            console.log(`${player.name} got ${token_} tokens`)
    }
    return;
}

combat(player, monster);
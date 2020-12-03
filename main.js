import {sManager, home_state} from "./states.js";
import {Player, Monster, Item} from "./characters.js";
import {combatNews} from "./watchers.js";

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


sManager.Change(home_state);
sManager.Render();
combat(player, monster);
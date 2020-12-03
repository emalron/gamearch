import {combatNews, statMonitor} from "./watchers.js";
import {MonsterFactory} from "./characters.js";

class CombatManager {
    constructor() {
        this.player = null;
    }
    SetPlayer(player) {
        this.player = player;
    }
    Combat(name) {
        let player = this.player;
        let monster = MonsterFactory.Generate(name);
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
            statMonitor.Notify(player);
        }
        return;
    }
}

let combatManager = new CombatManager();

export {combatManager};
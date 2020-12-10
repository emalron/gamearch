import {statMonitor, combatMonitor} from "./watchers.js";
import {MonsterFactory} from "./characters.js";

class CombatManager {
    constructor() {
        this.player = null;
    }
    SetPlayer(player) {
        this.player = player;
    }
    SetStage(monsters) {
        this.killed = 0;
        this.monsters = monsters;
    }
    Combat() {
        const player = this.player;
        const monster = this.monsters[this.killed];
        const combatants = [player, monster];
        let turn = 0;
        let side = 0;
        while(player.hp > 0 && monster.hp > 0) {
            side = turn % 2;
            let attacker = combatants[side];
            let defender = combatants[(side+1)%2];
            let damage = attacker.GetPower();
            defender.TakeDamage(damage);
            turn++;
            combatMonitor.Notify({type: 'ATTACK', actors: [attacker.name, defender.name], detail: {damage: damage, hp: defender.hp}});
        }
        const player_win = monster.hp <= 0 && player.hp > 0;
        if(player_win) {
            const token_ = monster.GetToken();
            player.xp += monster.xp;
            player.token += token_;
            combatMonitor.Notify({type: 'KILL', actors: [player.name, monster.name], detail: {xp: monster.xp, token: token_}});
        } else {
            combatMonitor.Notify({type: 'DEFEATED', actors: [player.name]})
        }
        statMonitor.Notify(player);
        return;
    }
    async Marathon() {
        let monster_display = '';
        while(this.player.hp > 0 && this.killed < this.monsters.length) {
            this.Combat();
            this.killed++;
            await new Promise( r => setTimeout(r, 500));
            this.draw(monster_display);
        }
    }
    draw(monster_display) {
        for(let i=0; i<this.killed; i++) {
            monster_display += '❌';
        }
        for(let j=this.killed; j<this.monsters.length; j++) {
            monster_display += this.monsters[j].name;
        }
        monster_display += '🏆';
        if(this.killed == this.monsters.length) {
            console.log('🏆🏆🏆🏆🏆')
        }
        combatMonitor.draw(monster_display);
    }

}

let combatManager = new CombatManager();

export {combatManager};
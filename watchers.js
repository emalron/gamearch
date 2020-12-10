import {Monitor} from './helpers.js'

let statMonitor = new Monitor();
statMonitor.Notify = function(player) {
    let {name: name, hp: hp, xp: xp, items: [item], food: food, gold: gold, token: token, key: key, quest: quest} = player;
    let power = player.GetPower();
    let data = new Map();
    data.set("name", name);
    data.set("hp", hp);
    data.set("power", power);
    data.set("xp", xp);
    data.set("item", item.GetName());
    data.set("food", food);
    data.set("gold", gold);
    data.set("token", token);
    data.set("key", key);
    data.set("quest", quest);
    this.Update(data);
}
statMonitor.Set("name", document.querySelector("div.character span.name"))
statMonitor.Set("hp", document.querySelector("div.character span.hp"))
statMonitor.Set("power", document.querySelector("div.character span.power"))
statMonitor.Set("xp", document.querySelector("div.character span.xp"))
statMonitor.Set("item", document.querySelector("div.character span.item"))
statMonitor.Set("food", document.querySelector("div.character span.food"))
statMonitor.Set("gold", document.querySelector("div.character span.gold"))
statMonitor.Set("token", document.querySelector("div.character span.token"))
statMonitor.Set("key", document.querySelector("div.character span.key"))
statMonitor.Set("quest", document.querySelector("div.character span.quest"))

let combatMonitor = new Monitor();
combatMonitor.Notify = function(msg) {
    let {type, actors, detail} = msg;
    let self, target, result;
    if(this.history) {} else {
        this.history = '';
    }
    switch(type) {
        case 'ATTACK':
            [self, target] = actors;
            let {damage: damage, hp: targetHP} = detail;
            result = `${self} ${damage} 💪 > ${target} has ${targetHP} 🧡\n`;
            this.history += result;
            break;
        case 'KILL':
            [self, target] = actors;
            let {xp: xp, token: token} = detail;
            result = `  ${target} ❌ > ${xp} 🥇, ${token} 🦷\n\n`
            this.history += result;
            break;
        case 'DEFEATED':
            [self] = actors;
            result = `${self} ❌\n\n`;
            this.history += result;
            break;
    }
}
combatMonitor.finish = function(monsters) {
    const data = new Map();
    data.set("combat", this.history);
    data.set("monsters", monsters);
    this.history = '';
    this.Update(data);
}
combatMonitor.draw = function(monsters) {
    const data = new Map();
    data.set("combat", this.history);
    data.set("monsters", monsters);
    this.Update(data);    
}
combatMonitor.clear = function() {
    const data = new Map();
    data.set("combat", "");
    data.set("monsters", "");
    this.history = '';
    this.Update(data);
}
combatMonitor.Set("combat", document.querySelector("div.combat-content"));
combatMonitor.Set("monsters", document.querySelector("div.combat-monsters"));

let worldMonitor = new Monitor();
worldMonitor.Notify = function(unlocks) {
    let forest, cave, tower;
    if(unlocks.forest) {
        forest = `forest`;
    } else {
        forest = `Unlock 0 🏆`;
    }
    if(unlocks.cave) {
        cave = `cave`;
    } else {
        cave = `Unlock 1 🏆`;
    }
    if(unlocks.tower) {
        tower = `tower`;
    } else {
        tower = `Unlock 100 🏆`;
    }
    const data = new Map();
    data.set("forest", forest);
    data.set("cave", cave);
    data.set("tower", tower);
    this.Update(data);
}
worldMonitor.Set("forest", document.querySelector("button#forest"));
worldMonitor.Set("cave", document.querySelector("button#cave"));
worldMonitor.Set("tower", document.querySelector("button#tower"));

export {statMonitor, combatMonitor, worldMonitor};
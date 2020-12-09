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
    data.set("item", item.name);
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
            result = `${self} attacked ${damage} damage: ${target} has ${targetHP} hit points\n`;
            this.history += result;
            break;
        case 'KILL':
            [self, target] = actors;
            let {xp: xp, token: token} = detail;
            result = `${self} killed ${target}: ${xp} xp, ${token} tokens\n`
            this.history += result;
            break;
        case 'DEFEATED':
            [self] = actors;
            result = `${self} lose...\n`;
            this.history += result;
            break;
    }
}
combatMonitor.finish = function() {
    const data = new Map();
    data.set("combat", this.history);
    this.history = '';
    this.Update(data);
}
combatMonitor.clear = function() {
    const data = new Map();
    data.set("combat", "");
    this.Update(data);
}
combatMonitor.Set("combat", document.querySelector("div.combat-content"));

export {statMonitor, combatMonitor};
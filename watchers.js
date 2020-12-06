import {Monitor} from './helpers.js'

let statMonitor = new Monitor();
statMonitor.Notify = function(player) {
    let {name: name, hp: hp, xp: xp, items: [item], gold: gold, token: token, key: key} = player;
    let power = player.GetPower();
    let data = new Map();
    data.set("name", name);
    data.set("hp", hp);
    data.set("power", power);
    data.set("xp", xp);
    data.set("item", item.name);
    data.set("gold", gold);
    data.set("token", token);
    data.set("key", key);
    this.Update(data);
}
statMonitor.Set("name", document.querySelector("div.character span.name"))
statMonitor.Set("hp", document.querySelector("div.character span.hp"))
statMonitor.Set("power", document.querySelector("div.character span.power"))
statMonitor.Set("xp", document.querySelector("div.character span.xp"))
statMonitor.Set("item", document.querySelector("div.character span.item"))
statMonitor.Set("gold", document.querySelector("div.character span.gold"))
statMonitor.Set("token", document.querySelector("div.character span.token"))
statMonitor.Set("key", document.querySelector("div.character span.key"))

let combatMonitor = new Monitor();
combatMonitor.Set("combat", document.querySelector("div.combat-content"));
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
            result = `${self} killed ${target}: ${xp} xp, ${token} tokens`
            this.history += result;
            this.finish();
            break;
        case 'DEFEATED':
            [self] = actors;
            result = `${self} lose...`;
            this.history += result;
            this.finish();
            break;
    }
}
combatMonitor.finish = function() {
    const data = new Map();
    data.set("combat", this.history);
    this.history = '';
    this.Update(data);
}

export {statMonitor, combatMonitor};
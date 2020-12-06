import {Observer, Monitor} from './helpers.js'

let combatNews = new Observer();
combatNews.Notify = function(msg) {
    let {type, actors, detail} = msg;
    let self, target, result;
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
            break;
        case 'DEFEATED':
            [self] = actors;
            result = `${self} lose...`;
            this.history += result;
    }
}.bind(combatNews);
combatNews.Broadcast = function() {
    const output = this.history;
    this.history = "";
    return output;
}.bind(combatNews);

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
}.bind(statMonitor);
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
    const data = new Map();
    data.set("combat", msg);
    this.Update(data);
}.bind(combatMonitor);

export {combatNews, statMonitor, combatMonitor};
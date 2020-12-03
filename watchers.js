import {Observer, Monitor} from './helpers.js'

let combatNews = new Observer();
combatNews.Notify = (msg) => {
    let {type, actors, detail} = msg;
    let self, target, result;
    switch(type) {
        case 'ATTACK':
            [self, target] = actors;
            let {damage: damage, hp: targetHP} = detail;
            result = `${self} attacked ${damage} damage: ${target} has ${targetHP} hit points`;
            console.log(result);
            break;
        case 'KILL':
            [self, target] = actors;
            let {xp: xp, token: token} = detail;
            result = `${self} killed ${target}: ${xp} xp, ${token} tokens`
            console.log(result);
            break;
    }
}

let statMonitor = new Monitor();
statMonitor.Set("name", document.querySelector("div.player-stat span.name"))
statMonitor.Set("hp", document.querySelector("div.player-stat span.hp"))
statMonitor.Set("power", document.querySelector("div.player-stat span.power"))
statMonitor.Set("xp", document.querySelector("div.player-stat span.xp"))
statMonitor.Set("item", document.querySelector("div.player-stat span.item"))
statMonitor.Set("gold", document.querySelector("div.player-stat span.gold"))
statMonitor.Set("token", document.querySelector("div.player-stat span.token"))
statMonitor.Set("key", document.querySelector("div.player-stat span.key"))

export {combatNews, statMonitor};
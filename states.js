import {State, StateManager, showSnackbar} from "./helpers.js"
import {combatManager} from "./combat.js";
import {guildManager} from "./guild.js";
import {worldManager} from "./world.js";
import {combatMonitor, statMonitor, worldMonitor} from "./watchers.js";
import { MonsterFactory } from "./characters.js";

const town_state = new State("town");
const blacksmith_modal_state = new State("blacksmith-modal");
const guild_modal_state = new State("guild-modal");
const shop_modal_state = new State("shop-modal");
const home_modal_state = new State("home-modal");
const world_state = new State("world");
const forest_modal_state = new State("forest-modal");
const cave_modal_state = new State("cave-modal");
const tower_modal_state = new State("tower-modal");
const sManager = new StateManager();
town_state.Update = (key, params) => {
    switch(key) {
        case 'home-modal':
            sManager.Push(home_modal_state, params);
            break;
        case 'shop-modal':
            sManager.Push(shop_modal_state, params);
            break;
        case 'guild-modal':
            sManager.Push(guild_modal_state, params);
            break;
        case 'blacksmith-modal':
            sManager.Push(blacksmith_modal_state, params);
            break;
        case 'world':
            sManager.Change(world_state, params);
            break;
    }
}
world_state.Update = (key, params) => {
    switch(key) {
        case 'forest-modal':
            sManager.Push(forest_modal_state, params);
            break;
        case 'cave-modal':
            sManager.Push(cave_modal_state, params);
            break;
        case 'tower-modal':
            sManager.Push(tower_modal_state, params);
            break;
        case 'town':
            sManager.Change(town_state);
            break;
    }
}
world_state.OnEnter = function(params) {
    worldMonitor.Notify(worldManager.GetUnlocks());
    world_state.Update('normal', params);
}

home_modal_state.Update = (key) => {
    switch(key) {
        case 'close':
            sManager.Pop();
            break;
    }
}
home_modal_state.OnEnter = function(params) {
    const player = params;
    player.hp = player.max_hp;
    showSnackbar('You are fully healed');
    statMonitor.Notify(player);
    sManager.Pop();
}
guild_modal_state.Update = function(key, params) {
    let button, quest, text, player;
    let accept_button = this.element.querySelector("button#quest-accept");
    let reward_button = this.element.querySelector("button#quest-reward");
    let output_span = this.element.querySelector("span#quest-output");
    switch(key) {
        case 'close':
            sManager.Pop();
            break;
        case 'accept':
            quest = guildManager.MakeQuest();
            text = quest.GetDescription('condition');
            accept_button.textContent = text;
            accept_button.style.display = "block";
            reward_button.style.display = "none";
            output_span.style.display = "none";
            break;
        case 'processing':
            player = params;
            quest = guildManager.quest;
            player.quest = quest.GetDescription("condition")
            text = quest.GetDescription('reward');
            reward_button.textContent = text;
            if(guildManager.HasComplated(player)) {
                reward_button.disabled = false;
            } else {
                reward_button.disabled = true;
            }
            accept_button.style.display = "none";
            reward_button.style.display = "block";
            statMonitor.Notify(player);
            break;
        case 'reward':
            button = this.element.querySelector("button#quest-reward");
            quest = guildManager.quest;
            text = quest.GetDescription('reward');
            button.textContent = text;
            button.disabled = false;
            accept_button.style.display = "none";
            reward_button.style.display = "block";
            output_span.style.display = "none";
            break;
        case 'completed':
            player = params;
            quest = guildManager.quest;
            const reward = quest.GetReward();
            text = `you got ${quest.GetDescription('reward')}`;
            player.token -= quest.quantity;
            player.gold += reward;
            guildManager.quest = null;
            showSnackbar(text);
            player.quest = "";
            accept_button.style.display = "none";
            reward_button.style.display = "none";
            statMonitor.Notify(player);
            sManager.Pop();
            break;
    }
}
guild_modal_state.OnEnter = (params) => {
    const player = params;
    if(guildManager.HasQuest()) {
        if(guildManager.HasComplated(player)) {
            sManager.Update('reward', player);
            sManager.Render();
            return;
        }
        sManager.Update('processing', player);
        sManager.Render();
        return;
    }
    sManager.Update('accept', player);
    sManager.Render();
    return;
}
shop_modal_state.Update = function(key, params) {
    const player = params;
    switch(key) {
        case 'close':
            sManager.Pop();
            break;
        case 'buy':
            const has_enough_gold = player.gold >= 1;
            if(has_enough_gold) {
                player.gold--;
                player.food++;
                showSnackbar("you got 🍗");
                statMonitor.Notify(player);
            } else {
                showSnackbar("not enough 💰");
            }
            break;
    }
}
blacksmith_modal_state.Update = function(key, params) {
    const player = params;
    let msg, upgrade_button;
    switch(key) {
        case 'close':
            sManager.Pop();
            break;
        case 'inside':
            msg = `Upgrade your ${player.items[0].GetName()}`;
            upgrade_button = this.element.querySelector("button#blacksmith-upgrade");
            upgrade_button.textContent = msg;
            break;
        case 'upgrade':
            const has_enough_gold = player.gold >= 10;
            if(has_enough_gold) {
                const item = player.items[0];
                item.Enhance();
                player.gold -= 10;
                msg = `Upgrade your ${player.items[0].GetName()}`;
                upgrade_button = this.element.querySelector("button#blacksmith-upgrade");
                upgrade_button.textContent = msg;
                statMonitor.Notify(player);
            } else {
                showSnackbar("not enough 💰");
            }
            break;
    }
}
blacksmith_modal_state.OnEnter = function(params) {
    const player = params;
    sManager.Update('inside', player);
}
forest_modal_state.Update = function(key, params) {
    const player = params;
    switch(key) {
        case 'close':
            sManager.Pop();
            break;
        case 'eat':
            const msg = `Eat 🍗`;
            const eat_food_button = this.element.querySelector("button.combat-eatfood");
            eat_food_button.textContent = msg;
            if(player.food <= 0) {
                eat_food_button.disabled = true;
            } else {
                eat_food_button.disabled = false;
            }
            break;
        case 'fight':
            let has_hp = player.hp > 0;
            if(has_hp) {
                combatManager.Marathon();
                sManager.Update('eat', player);
                return;
            }
            showSnackbar("I have no 🧡 to fight");
            break;
        case 'win':
            player.key++;
            showSnackbar("you got 🏆");
            sManager.Pop();
            break;
    }
}
forest_modal_state.OnEnter = function(player) {
    const not_yet_unlock = !worldManager.LockCheck("forest");
    if(not_yet_unlock) {
        const forest_key = 0;
        const not_enough_key = player.key < forest_key;
        if(not_enough_key) {
            showSnackbar("not enough 🔑");
            return;
        }
        worldManager.Unlock("forest");
        player.key -= forest_key;
        statMonitor.Notify(player);
        worldMonitor.Notify(worldManager.GetUnlocks());
    }
    combatMonitor.clear();
    let monsters = [];
    for(let i=0; i<10; i++) {
        monsters.push(MonsterFactory.Generate("Zombie"));
    }
    combatManager.SetStage(monsters);
    sManager.Update('fight', player);
}

cave_modal_state.Update = (key) => {
    switch(key) {
        case 'close':
            sManager.Pop();
            break;
    }
}
cave_modal_state.OnEnter = function(player) {
    const not_yet_unlock = !worldManager.LockCheck("cave");
    if(not_yet_unlock) {
        const key = 1;
        const not_enough_key = player.key < key;
        if(not_enough_key) {
            showSnackbar("not enough 🔑");
            sManager.Pop();
            return;
        }
        worldManager.Unlock("cave");
        player.key -= key;
        statMonitor.Notify(player);
        worldMonitor.Notify(worldManager.GetUnlocks());
    }
    sManager.Update('fight', player);
}

tower_modal_state.Update = (key) => {
    switch(key) {
        case 'close':
            sManager.Pop();
            break;
    }
}
tower_modal_state.OnEnter = function(player) {
    const not_yet_unlock = !worldManager.LockCheck("tower");
    if(not_yet_unlock) {
        const key = 100;
        const not_enough_key = player.key < key;
        if(not_enough_key) {
            showSnackbar("not enough 🔑");
            sManager.Pop();
            return;
        }
        worldManager.Unlock("tower");
        player.key -= key;
        statMonitor.Notify(player);
        worldMonitor.Notify(worldManager.GetUnlocks());
    }
    sManager.Update('fight', player);
}
export {sManager, town_state};

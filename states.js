import {State, StateManager, showSnackbar} from "./helpers.js"
import {combatManager} from "./combat.js";
import {guildManager} from "./guild.js";
import {statMonitor} from "./watchers.js";

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
world_state.Update = (key) => {
    switch(key) {
        case 'forest-modal':
            sManager.Push(forest_modal_state);
            break;
        case 'cave-modal':
            sManager.Push(cave_modal_state);
            break;
        case 'tower-modal':
            sManager.Push(tower_modal_state);
            break;
        case 'town':
            sManager.Change(town_state);
            break;
    }
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
    statMonitor.Notify(player);
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
            reward_button.disabled = true;
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
            text = `you took ${quest.GetDescription('reward')}`;
            player.token -= quest.quantity;
            player.gold += reward;
            guildManager.quest = null;
            output_span.textContent = text;
            accept_button.style.display = "none";
            reward_button.style.display = "none";
            output_span.style.display = "block";
            statMonitor.Notify(player);
            break;
    }
}
guild_modal_state.OnEnter = (params) => {
    const player = params;
    if(guildManager.HasQuest()) {
        if(guildManager.HasComplated(player)) {
            sManager.Update('reward');
            sManager.Render();
            return;
        }
        sManager.Update('processing', player);
        sManager.Render();
        return;
    }
    sManager.Update('accept');
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
                statMonitor.Notify(player);
            } else {
                showSnackbar("not enough gold");
            }
            break;
    }
}
            
forest_modal_state.Update = (key) => {
    switch(key) {
        case 'close':
            sManager.Pop();
            break;
    }
}
forest_modal_state.OnEnter = function() {
    combatManager.Combat("Orc");
}

cave_modal_state.Update = (key) => {
    switch(key) {
        case 'close':
            sManager.Pop();
            break;
    }
}
tower_modal_state.Update = (key) => {
    switch(key) {
        case 'close':
            sManager.Pop();
            break;
    }
}
export {sManager, town_state};

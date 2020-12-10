import {getRandomArbitary} from "./helpers.js"

class Quest {
    constructor(params) {
        const {item: item, quantity: quantity, reward: reward} = params;
        this.item = item;
        this.quantity = quantity;
        this.reward = reward;
    }
    GetDescription(type) {
        let output = ''
        switch(type) {
            case 'condition':
                output = `Collect ${this.quantity} ${this.item}`;
                break;
            case 'reward':
                output = `${this.reward} 💰`
                break;
        }
        return output
    }
    IsMeet(player) {
        let quantity = player.token;
        if(quantity >= this.quantity) {
            console.log(`quest condition is meeted`)
            return true;
        }
        console.log(`quest condition isn't meeted`)
        return false;
    }
    GetReward() {
        return this.reward;
    }
}

class GuildManager {
    constructor() {
        this.quest = null;
    }
    HasQuest() {
        if(this.quest) {
            return true;
        }
        return false;
    }
    HasComplated(player) {
        return this.quest.IsMeet(player);
    }
    MakeQuest() {
        const random = getRandomArbitary(1, 3);
        const quest = new Quest({item: "🦷", quantity: random, reward: random});
        this.quest = quest;
        return quest;
    }
}

const guildManager = new GuildManager();
export {guildManager};
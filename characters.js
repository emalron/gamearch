import {getRandomArbitary} from "./helpers.js"

class Entity {
    constructor(hp) {
        this.hp = hp;
        this.max_hp = hp;
        this.subscribes = [];
    }
    TakeDamage(dam) {
        let actual_damage = dam;
        if(dam > this.hp) {
            actual_damage = this.hp;
        }
        this.hp -= actual_damage;
    }
}

class Player extends Entity {
    constructor(name) {
        super(10);
        this.name = name;
        this.xp = 0;
        this.token = 0;
        this.items = [];
        this.key = 0;
        this.gold = 0;
        this.food = 0;
        this.quest = '';
    }
    GetPower() {
        return this.items.map(e=>e.power).reduce((acc,cur) => acc+cur);
    }
}

class Item {
    constructor(name, power) {
        this.name = name;
        this.power = power;
        this.enhance = 0;
    }
    GetName() {
        if(this.enhance) {
            return `+${this.enhance} ${this.name}`;
        }
        return this.name;
    }
    Enhance() {
        this.enhance++;
        this.power += 2;
    }
}

class Monster extends Entity {
    constructor(monster) {
        let {name: name, hp: hp, power: power, xp: xp, token: token} = monster;
        super(hp);
        this.name = name;
        this.power = power;
        this.xp = xp;
        this.token = token;
    }
    GetPower() {
        return this.power;
    }
    GetToken() {
        const random = getRandomArbitary(0, 10);
        const win = this.xp >= random;
        if(win) {
            return this.token;
        }
        return 0;
    }

}

class MonsterFactory {
    constructor() {}
    static Generate(name) {
        console.log(name);
        let monster = null;
        switch(name) {
            case "Zombie":
                monster = new Monster({name: '🧟‍♂️', hp: 10, power: 2, xp: 1, token: 1});
                break;
            case "Vampire":
                monster = new Monster({name: '🧛‍♀️', hp: 20, power: 4, xp: 5, token: 3});
                break;
            case "Demon":
                monster = new Monster({name: '👿', hp: 100, power: 20, xp: 25, token: 5});
                break;
        }
        return monster;
    }
}

class Boss extends Entity {
    constructor(name, hp, power, xp, key) {
        super(hp)
        this.name = name;
        this.power = power;
        this.xp = xp;
        this.key = key;
    }
    GetPower() {
        return this.power;
    }
}

export {Player, Item, MonsterFactory};
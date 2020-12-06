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
    }
    GetPower() {
        return this.items.map(e=>e.power).reduce((acc,cur) => acc+cur);
    }
}

class Item {
    constructor(name, power) {
        this.name = name;
        this.power = power;
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
        const random = this.getRandomArbitary(0, 10);
        const win = this.xp >= random;
        if(win) {
            return this.token;
        }
        return 0;
    }
    getRandomArbitary(min, max) {
        const min_ = Math.ceil(min);
        const max_ = Math.floor(max);
        return Math.floor(Math.random()*(max_ - min_)) + min_;
    }
}

class MonsterFactory {
    constructor() {}
    static Generate(name) {
        let monster = null;
        switch(name) {
            case "Orc":
                monster = new Monster({name: name, hp: 10, power: 2, xp: 1, token: 1});
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
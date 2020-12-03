class Entity {
    constructor(hp) {
        this.hp = hp;
        this.subscribes = [];
    }
    TakeDamage(dam) {
        let actual_damage = dam;
        if(dam > this.hp) {
            actual_damage = this.hp;
        }
        this.hp -= actual_damage;
    }
    Subscribe(observer) {
        this.subscribes.push(observer);
    }
    OnNotify(msg) {
        this.subscribes.forEach(e => {
            e.Notify(msg);
        })
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
    constructor(name, hp, power, xp, token) {
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
        return this.token;
    }
}

class MonsterFactory {
    constructor() {}
    static Generate(name) {
        let monster = null;
        switch(name) {
            case "Orc":
                monster = new Monster(name, 10, 2, 1, 0);
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
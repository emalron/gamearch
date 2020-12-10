class WorldManager {
    constructor() {
        this.unlocks = new Map();
        this.unlocks.set("forest", false);
        this.unlocks.set("cave", false);
        this.unlocks.set("tower", false);
    }
    Unlock(place) {
        this.unlocks.set(place, true);
    }
    LockCheck(place) {
        return this.unlocks.get(place);
    }
    GetUnlocks() {
        const output = {};
        for(let item of this.unlocks) {
            output[item[0]] = item[1];
        }
        return output;
    }
}

let worldManager = new WorldManager();

export {worldManager};
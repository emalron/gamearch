class State {
    constructor(name) {
        this.name = name;
        const selector = "." + name;
        this.element = document.querySelector(selector);
    }
    Render() {
        const e_style = window.getComputedStyle(this.element); // css에 세팅된 값을 읽어온다
        const is_invisible = e_style.getPropertyValue("display") == "none"; // css에 세팅된 값은 inline 값 element.style.display 와 다르기 때문에.
        if(is_invisible) {
            this.element.style.display = "block";
        }
    }
    Update(data) {
        this.data = data;
    }
    OnEnter = () => { console.log(`${this.name} enter...`)};
    OnLeave = () => { 
        console.log(`${this.name} leave...`)
        this.element.style.display = "none";
    };
}

class StateManager {
    constructor() {
        this.current_state = null;
        this.states = [];
        this.map = new Map();
        this.top = -1;
    }
    Change(state) {
        if(this.top <= -1) {
            this.states[++this.top] = state;
            this.current_state = this.states[this.top];
        } else {
            this.current_state.OnLeave();
            this.current_state = state;
            this.states[this.top] = state;
        }
        this.current_state.OnEnter();
    }
    Render() {
        this.current_state.Render();
    }
    Update(data) {
        this.current_state.Update(data);
    }
    Push(state) {
        this.states[++this.top] = state;
        this.current_state = this.states[this.top];
        this.states[this.top].OnEnter();
    }
    Pop() {
        this.states[this.top--].OnLeave();
        if(this.top <= -1) {
            return 
        }
        this.current_state = this.states[this.top];
    }
}

class Observer {
    constructor() {}
    Notify() {}
}

class Combat {
    process(actors) {
        let [player, monster] = actors;
        let result = this.battle(player, monster);
        if(result) {
            reward(player, monster);
        } else {
            penalty(player);
        }
    }
    battle(player, monster) {

    }
    reward(player, monster) {

    }
    penalty(player) {

    }
}

export {State, StateManager, Observer};
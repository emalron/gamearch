class State {
    constructor(name) {
        this.name = name;
        const selector = "." + name;
        this.element = document.querySelector(selector);
    }
    Render() {
        console.log(this);
        const e_style = window.getComputedStyle(this.element); // css에 세팅된 값을 읽어온다
        const is_invisible = e_style.getPropertyValue("display") == "none"; // css에 세팅된 값은 inline 값 element.style.display 와 다르기 때문에.
        if(is_invisible) {
            this.element.style.display = "block";
        }
    }
    Update(data, params) {}
    OnEnter = () => { this.element.focus(); console.log(`${this.name} enter...`)};
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
    Update(data, params) {
        this.current_state.Update(data, params);
    }
    Push(state, params) {
        this.states[++this.top] = state;
        this.current_state = this.states[this.top];
        this.states[this.top].OnEnter(params);
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
class Monitor extends Observer {
    constructor() {
        super()
        this.map = new Map();
    }
    Set(name, element) {
        this.map.set(name, element);
    }
    Update(stats) {
        for(let key of stats.keys()) {
            let value = stats.get(key);
            let elem = this.map.get(key);
            elem.innerText = value;
        }
    }
    Notify(data) {}
}

function getRandomArbitary(min, max) {
    const min_ = Math.ceil(min);
    const max_ = Math.floor(max);
    return Math.floor(Math.random()*(max_ - min_)) + min_;
}

var collect = function() {
    const record = new Map();
    for(let i=0; i<2000; i++) {
        let num = 1;
        while(true) {
            const win = 25 >= prob(0, 100);
            if(win) {
                if(record.has(num)) {
                    record.set(num, record.get(num)+1);
                } else {
                    record.set(num, 1);
                }
                break;
            }
            num++;
        }
        console.log(`hit ${num}`);
    }
    console.log(record);
    return record;
}

var showSnackbar = function(msg) {
    const element = document.querySelector("div#snackbar");
    element.textContent = msg;
    element.className = "show";
    setTimeout(() => { element.className = element.className.replace("show", "") }, 3000);
}

export {State, StateManager, Observer, Monitor, getRandomArbitary, showSnackbar};

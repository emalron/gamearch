function State(name) {
    this.name = name;
    this.data = null;
    this.Render = function() {
        console.log(`${this.name}: ${this.data}`);
    }
    this.Update = function(data) {
        this.data = data;
    }
    this.OnEnter = () => { console.log(`${this.name} enter...`)};
    this.OnLeave = () => { console.log(`${this.name} leave...`)};
}

function StateManager() {
    this.current_state = null;
    this.states = [];
    this.map = new Map();
    this.top = -1;
    this.Change = function(state) {
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
    this.Render = function() {
        this.current_state.Render();
    }
    this.Update = function(data) {
        this.current_state.Update(data);
    }
    this.Push = function(state) {
        this.states[++this.top] = state;
        this.current_state = this.states[this.top];
        this.states[this.top].OnEnter();
    }
    this.Pop = function() {
        this.states[this.top--].OnLeave();
        if(this.top <= -1) {
            return 
        }
        this.current_state = this.states[this.top];
    }
}
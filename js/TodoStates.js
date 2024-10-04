const TODO_STATES = {
    UNCHECKED: 0,
    CHECKED: 1,
    EDITING: 2,
};
Object.freeze(TODO_STATES);

class TodoStates {
    states = [];
    constructor() {
        this.#add(TODO_STATES.EDITING);
    }

    #add(state) {
        this.states.push({
            value: state,
            time: new Date().setMilliseconds(0), // always set 0 milli seconds..
        });
    }

    #validate_state(state) {
        if (!Object.values(TODO_STATES).includes(state)) {
            throw new Error(`the state code '${state}' is not a valid state`);
        }
    }

    set(state) {
        this.#validate_state(state);
        this.#add(state)
    }

    get() {
        return this.states[this.states.length - 1].value;
    }

    pop() {
        this.states.pop().value;
    }

    is(state) {
        this.#validate_state(state);
        return this.states[this.states.length - 1].value === state;
    }

    state_name() {
        const state = this.get();
        if (state === TODO_STATES.UNCHECKED) return 'UNCHECKED';
        if (state === TODO_STATES.CHECKED) return 'CHECKED';
        if (state === TODO_STATES.EDITING) return 'EDITING';
        throw new Error(`the state code '${state}' is not a valid state`);
    }

    load_saved_states(states) {
        this.states = new Array();
        for (const state of states) {
            this.states.push({
                value: state.value,
                time: new Date(state.time),
            });
        }
    }
}

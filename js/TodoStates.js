const TODO_STATES = {
    UNCHECKED: 0,
    CHECKED: 1,
    EDITING: 2,
};
Object.seal(TODO_STATES);

class TodoStates {
    states = [];
    constructor() {
        this.#add(TODO_STATES.EDITING);
    }

    #add(state) {
        this.states.push({
            value: state,
            time: new Date(),
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

    class_name() {
        const state = this.get();
        if (state === TODO_STATES.CHECKED) return 'todo-entry-checked';
        if (state === TODO_STATES.UNCHECKED) return 'todo-entry-unchecked';
        if (state === TODO_STATES.EDITING) return 'todo-entry-edit';
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

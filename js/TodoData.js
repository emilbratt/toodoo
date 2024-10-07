// About preserving data.
// For now, we are using 'localStorage' from the 'Web Storage API'.
// I might experiement with the 'IndexedDB API' in the future, or in another project..
// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

class _TodoData {
    #data = {};

    constructor() {
        const json = localStorage.getItem('data');
        if (json === null) {
            this.reset();
        } else {
            this.load_from_json(json);
        }

        if (this.#is_empty()) {
            this.reset();
        }
    }

    #update_local_store() {
        localStorage.setItem('data', JSON.stringify(this.#data));
    }

    #is_empty() {
        return this.#data.entries.length === 0;
    }

    reset() {
        localStorage.removeItem('data');

        this.#data = {};
        this.#data.new_id = 0;
        this.#data.entries = new Array();

        this.#update_local_store();
    }

    sort(reverse) {
        if (reverse) this.#data.entries.sort((a, b) => b.id > a.id);
        else this.#data.entries.sort((a, b) => b.id < a.id);
    }

    entries() {
        return this.#data.entries;
    }

    new_entry() {
        return {
            id:    this.#data.new_id,
            state: new TodoStates(),
            text:  '',
        };
    }

    save_entry(entry) {
        const index = this.#data.entries.indexOf(entry);
        if (index !== -1) {
            // existing entries are edited in events.js, so this block can be omitted.
            // I will leave it here just for clarity as it..
            this.#data.entries[index] = entry; // this does not affect the program..
        } else {
            this.#data.entries.push(entry);
            this.#data.new_id += 1;
        }

        // always keep local storage in sync with in memory data..
        this.#update_local_store();
    }

    delete_by_id(id) {
        this.#data.entries = this.#data.entries.filter((entry) => entry.id !== id)

        if (this.#is_empty()) {
            this.reset();
        } else {
            this.#update_local_store();
        }
    }

    save_to_json() {
        return JSON.stringify(this.#data);
    }

    load_from_json(json) {
        const data = JSON.parse(json);
        for (const entry of data.entries) {
            const states = new TodoStates();
            states.load_saved_states(entry.state.states);
            entry.state = states;
        }

        this.#data = data;
        this.#update_local_store();
    }
}

class TodoData  {
    static instance;

    static get_instance() {
        if (this.instance === undefined) {
            this.instance = new _TodoData;
        }
        return this.instance;
    }
};

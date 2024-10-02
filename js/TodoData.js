class _TodoData {
    #data = {};

    constructor() {
        const json = localStorage.getItem('data');
        if (json === null) {
            this.#data = {};
            this.#data.new_id = 0;
            this.#data.entries = new Array();
        } else {
            this.load_from_json(json);
        }
    }

    #update_local_store() {
        localStorage.setItem('data', JSON.stringify(this.#data));
    }

    sort(reverse) {
        if (reverse) this.#data.entries.sort((a, b) => b.id > a.id);
        else this.#data.entries.sort((a, b) => b.id < a.id);
    }

    entries() {
        return this.#data.entries;
    }

    // entry: TodoEntry;
    new_entry() {
        return {
            id:    this.#data.new_id,
            state: new TodoStates(),
            text:  '',
        };
    }

    get_entry(id) {
        const entry = this.#data.entries.filter((entry) => entry.id === id);
        if (entry.length === 0) {
            throw new Error(`could not find entry with id '${id}'`);
        }
        if (entry.length > 1) {
            throw new Error(`found possible duplicate entries with id '${id}'`);
        }
        return entry[0];
    }

    update_entry(entry) {
        for (let e of this.#data.entries) {
            if (e.i === entry.id) {
                e.state = entry.state;
                e.text = entry.text;
            }
        }

        this.#update_local_store();
    }

    save_entry(entry) {
        this.#data.entries.push(entry);
        this.#data.new_id += 1;
        this.#update_local_store();
    }

    delete_entry(entry) {
        this.#data.entries.splice(
            this.#data.entries.findIndex((kv) => kv.id === entry.id),
            1,
        );

        this.#update_local_store();
        if (this.is_empty()) {
            localStorage.removeItem('data');
        }
    }

    is_empty() {
        return this.#data.entries.length === 0;
    }

    // download
    to_json() {
        return JSON.stringify(this.#data);
    }

    // upload
    load_from_json(json) {
        const data = JSON.parse(json);
        for (const entry of data.entries) {
            const states = new TodoStates();
            states.load_saved_states(entry.state.states);
            entry.state = states;
        }
        this.#data = data;
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

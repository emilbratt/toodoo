class _TodoData {
    #data = {};

    constructor() {
        this.#data.new_id = 0;
        this.#data.entries = new Array();/*TodoEntry*/
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
        const entry = {
            id:    this.#data.new_id,
            state: new TodoStates(),
            text:  '',
        };
        this.#data.entries.push(entry);
        this.#data.new_id += 1;

        return entry;
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

    save_entry(entry) {
        let id = entry.id;
        const e = this.#data.entries.filter((kv) => kv.id === id);
        if (e.length === 0) {
            this.#data.entries.push(entry);
        } else {
            e = entry;
        }
    }

    delete_entry(entry) {
        // this.#data.entries = this.#data.entries.filter((item) => item.id !== entry.id);
        this.#data.entries.splice(
            this.#data.entries.findIndex((kv) => kv.id === entry.id),
            1,
        );
    }

    // download
    to_json() {
        return JSON.stringify(this.#data);
    }

    // upload
    from_json(json) {
        const data = JSON.parse(json);
        for (const entry of data.entries) {
            let states = new TodoStates();
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

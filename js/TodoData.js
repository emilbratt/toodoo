class _TodoData {
    data = {};

    constructor() {
        this.data.new_id = 0;
        this.data.entries = new Array();/*TodoEntry*/
    }

    sort() {
        this.data.entries.sort((a, b) => b.id > a.id);
    }

    // entry: TodoEntry;
    new_entry(text) {
        const entry = {
            id:    this.data.new_id,
            state: new TodoStates(),
            text:  text,
        };
        this.data.entries.push(entry);
        this.data.new_id += 1;

        return entry;
    }

    get_entry(id) {
        const entry = this.data.entries.filter((entry) => entry.id === id);
        if (entry.length === 0) {
            throw new Error(`could not find entry with id '${id}'`);
        }
        if (entry.length > 1) {
            throw new Error(`found possible duplicate entries with id '${id}'`);
        }
        return entry[0];
    }

    // download
    to_json() {
        return JSON.stringify(this.data);
    }

    // upload
    from_json(json) {
        const data = JSON.parse(json);
        for (const entry of data.entries) {
            let states = new TodoStates();
            states.load_saved_states(entry.state.states);
            entry.state = states;
        }
        this.data = data;
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

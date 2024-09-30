class _TodoData {
    data = {};

    constructor() {
        this.data.show_completed = false;
        this.data.show_deleted = false;
        this.data.new_id = 0;
        this.data.entries = new Array();/*TodoEntry*/
    }

    sort() {
        this.data.entries.sort((a, b) => b.id > a.id);
    }

    toggle_show_completed() {
        const b = !this.data.show_completed;
        this.data.show_completed = b;
        TodoRender.get_instance().show_completed = b;
    }

    toggle_show_deleted() {
        const b = !this.data.show_deleted;
        this.data.show_deleted = b;
        TodoRender.get_instance().show_deleted = b;
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

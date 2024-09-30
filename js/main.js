"use strict"

document.addEventListener("DOMContentLoaded", main);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    await sleep(700);

    let render = new TodoRender();

    let state = new TodoEntryState();
    state.checked();
    state.edit_mode();
    state.deleted();

    if (state.is_deleted()) {
        console.log('is deleted');
    } else {
        console.log('not deleted');
    }

    // id, checked, deleted, edit_mode, todo_text
    let entry_1 = new TodoEntry(0, false, false, false, 'Call bob');
    let entry_2 = new TodoEntry(1, false, true, true, 'Take a shower');
    let entry_3 = new TodoEntry(2, false, false, false, 'Take a shower');
    let entry_4 = new TodoEntry(3, false, false, false, 'Take a shower');
    render.display(entry_1);
    render.display(entry_2);
    render.display(entry_3);
    render.display(entry_4);
}

// might scrap this one..
class TodoEntryState {
    #history = [];
    #value;
    #date;

    constructor() {
        this.#value = 'un_checked';
        this.#date = new Date();
    }

    #add_hist() {
        let v = [this.#date, this.#value];
        this.#history.push(v);

        // keep last 10 states
        while (this.#history.length > 10) {
            this.#history.shift();
        }
    }

    un_checked() {
        this.#add_hist();
        this.#value = 'un_checked';
        this.#date = new Date();
    }

    checked() {
        this.#add_hist();
        this.#value = 'checked';
        this.#date = new Date();
   }

    edit_mode() {
        this.#add_hist();
        this.#value = 'edit_mode';
        this.#date = new Date();
    }

    deleted() {
        this.#add_hist();
        this.#value = 'deleted';
        this.#date = new Date();
   }

    is_deleted() {
        return this.#value === 'deleted';
    }

    toString() {
        return this.#value;
    }
}

class TodoRender {
    #todo_rows = document.getElementById('todo-rows');

    #row_reset(id) {
        let row = document.getElementById(id);
        if (row) {
            row.remove();
        }
    }

    #todo_p(text) {
        let div = document.createElement('div');
        let p = document.createElement('p');
        p.textContent = text;
        p.classList.add('todo-text');
        div.appendChild(p);
        return div;
    }

    #todo_textarea(text) {
        let div = document.createElement('div');
        let p = document.createElement('textarea');
        p.textContent = text;
        p.classList.add('todo-text');
        div.appendChild(p);
        return div;
    }

    #todo_button_checked() {
        let div = document.createElement('div');
        let btn = document.createElement('button');
        btn.textContent = '✓';
        btn.classList.add('button-check');
        div.appendChild(btn);
        return div;
    }

    #todo_button_delete() {
        let div = document.createElement('div');
        let btn = document.createElement('button');
        btn.textContent = 'X';
        btn.classList.add('button-delete');
        div.appendChild(btn);
        return div;
    }

    #display_default(entry) {
        let row = document.createElement('div');
        row.id = entry.id;
        row.classList.add('todo-row');

        row.appendChild(this.#todo_p(entry.text));
        row.appendChild(this.#todo_button_checked());
        row.appendChild(this.#todo_button_delete());

        this.#todo_rows.append(row);
    }

    #display_edit(entry) {
        let row = document.createElement('div');
        row.id = entry.id;
        row.classList.add('todo-row-edit');

        row.appendChild(this.#todo_textarea(entry.text));
        row.appendChild(this.#todo_button_checked());
        row.appendChild(this.#todo_button_delete());

        this.#todo_rows.append(row);
    }

    // entry: TodoEntry
    display(entry) {
        this.#row_reset(entry.id);
        if (entry.edit_mode) {
            this.#display_edit(entry);
        } else {
            this.#display_default(entry);
        }
    }
}

class TodoEntry {
    id;
    checked;
    deleted;
    edit_mode;
    text;

    constructor(id, checked, deleted, edit_mode, text) {
        this.id = id;
        this.checked = checked;
        this.deleted = deleted;
        this.edit_mode = edit_mode;
        this.text = text;
    }

    consoleLog() {
        console.log('TodoEntry.consoleLog(): ', this);
    }

    toggle_check() {
        this.checked = true
    }
}

class DataBase {
    constructor() {
        this.entries = [];
    }

    // entry: TodoEntry;
    from_entry(entry) {
        this.entries.push(entry);
    }

    // download
    to_json() {
        return JSON.stringify(this.entries);
    }

    // upload
    from_json(entries) {
        this.entries = JSON.parse(entries);
    }
}

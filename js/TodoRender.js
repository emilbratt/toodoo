class _TodoRender {
    show_completed;
    show_deleted;
    #todo_entries;

    constructor() {
        this.show_completed = false;
        this.show_deleted = false;
        this.#todo_entries = document.getElementById('todo-entries');
    }

    #el_reset(id) {
        let row = document.getElementById(id);
        if (row) row.remove();
    }

    #div(child) {
        let div = document.createElement('div');
        div.appendChild(child);
        return div;
    }

    #text_deleted(text) {
        let p = document.createElement('p');
        p.textContent = text;
        p.classList.add('todo-text');
        return this.#div(p)
    }

    #text_unchecked(text) {
        let p = document.createElement('p');
        p.textContent = text;
        p.classList.add('todo-text');
        return this.#div(p)
    }

    #text_checked(text) {
        let p = document.createElement('p');
        let s = document.createElement('s');
        s.textContent = text;
        p.classList.add('todo-text');
        p.appendChild(s);
        return this.#div(p);
    }

    #todo_textarea(text) {
        let p = document.createElement('textarea');
        p.textContent = text;
        p.classList.add('todo-text');
        return this.#div(p);
    }

    #todo_button_check() {
        let btn = document.createElement('button');
        btn.textContent = '✓';
        btn.classList.add('button-check');
        return this.#div(btn);
    }

    #todo_button_uncheck() {
        let btn = document.createElement('button');
        btn.textContent = 'Uncheck';
        btn.classList.add('button-uncheck');
        return this.#div(btn);
    }

    #todo_button_delete() {
        let btn = document.createElement('button');
        btn.textContent = 'X';
        btn.classList.add('button-delete');
        return this.#div(btn);
    }

    #todo_button_restore() {
        let btn = document.createElement('button');
        btn.textContent = 'Restore';
        btn.classList.add('button-restore');
        return this.#div(btn);
    }

    todo_rows(entry) {
        let row = document.createElement('div');
        row.id = entry.id;

        if (entry.state.is(TODO_STATES.UNCHECKED)) {
            row.classList.add('todo-entry-unchecked');
            row.appendChild(this.#text_unchecked(entry.text));
            row.appendChild(this.#todo_button_check());
        }
        if (entry.state.is(TODO_STATES.CHECKED)) {
            if (!this.show_completed) {
                return;
            }
            row.classList.add('todo-entry-checked');
            row.appendChild(this.#text_checked(entry.text));
            row.appendChild(this.#todo_button_uncheck());
        }
        if (entry.state.is(TODO_STATES.DELETED)) {
            if (!this.show_deleted) {
                return;
            }
            row.classList.add('todo-entry-deleted');
            row.appendChild(this.#text_deleted(entry.text));
            row.appendChild(this.#todo_button_restore());
        }
        if (entry.state.is(TODO_STATES.EDITING)) {
            row.classList.add('todo-entry-edit');
            row.appendChild(this.#todo_textarea(entry.text));
            row.appendChild(this.#todo_button_check());
            row.appendChild(this.#todo_button_delete());
        }

        switch (entry.state.get()) {
            case TODO_STATES.DELETED:
            case TODO_STATES.CHECKED:
                // put these on bottom
                this.#todo_entries.appendChild(row);
                break;
            default:
                this.#todo_entries.prepend(row);
        }
    }
}

class TodoRender  {
    static instance;

    static get_instance() {
        if (this.instance === undefined) {
            this.instance = new _TodoRender;
        }
        return this.instance;
    }
};

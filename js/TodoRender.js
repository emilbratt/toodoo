class _TodoRender {
    show_completed;
    #todo_entries;

    constructor() {
        this.show_completed = false;
        this.#todo_entries = document.getElementById('todo-entries');
    }

    #remove_by_id(id) {
        let el = document.getElementById(id);
        if (el) {
            el.remove();
        }
    }

    #div(child) {
        const div = document.createElement('div');
        div.appendChild(child);
        return div;
    }

    #todo_text(text) {
        const p = document.createElement('p');
        p.textContent = text;
        p.classList.add('todo-text');
        return this.#div(p)
    }

    #todo_textarea(text) {
        const p = document.createElement('textarea');
        p.textContent = text;
        p.classList.add('todo-text');
        return this.#div(p);
    }

    #todo_button_check() {
        const btn = document.createElement('button');
        btn.textContent = '✓';
        btn.classList.add('button-check');
        return this.#div(btn);
    }

    #todo_button_save() {
        const btn = document.createElement('button');
        btn.textContent = 'Save';
        btn.classList.add('button-save');
        return this.#div(btn);
    }

    #todo_button_uncheck() {
        const btn = document.createElement('button');
        btn.textContent = 'Uncheck';
        btn.classList.add('button-uncheck');
        return this.#div(btn);
    }

    #todo_button_cancel() {
        const btn = document.createElement('button');
        btn.textContent = 'Cancel';
        btn.classList.add('button-cancel');
        return this.#div(btn);
    }

    #todo_button_delete() {
        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.classList.add('button-delete');
        return this.#div(btn);
    }

    #todo_button_delete_perma() {
        const btn = document.createElement('button');
        btn.textContent = 'Delete permanently';
        btn.classList.add('button-delete-perma');
        return this.#div(btn);
    }

    #todo_button_restore() {
        const btn = document.createElement('button');
        btn.textContent = 'Restore';
        btn.classList.add('button-restore');
        return this.#div(btn);
    }

    todo_rows(entry) {
        const row = document.createElement('div');
        row.id = entry.id;

        if (entry.state.is(TODO_STATES.UNCHECKED)) {
            row.classList.add('todo-entry-unchecked');
            row.appendChild(this.#todo_text(entry.text));
            row.appendChild(this.#todo_button_check());
        }
        if (entry.state.is(TODO_STATES.CHECKED)) {
            if (!this.show_completed) {
                return;
            }
            row.classList.add('todo-entry-checked');
            row.appendChild(this.#todo_text(entry.text));
            row.appendChild(this.#todo_button_uncheck());
        }
        if (entry.state.is(TODO_STATES.EDITING)) {
            row.classList.add('todo-entry-edit');
            row.appendChild(this.#todo_textarea(entry.text));
            row.appendChild(this.#todo_button_save());
            row.appendChild(this.#todo_button_cancel());
            row.appendChild(this.#todo_button_delete());
        }

        switch (entry.state.get()) {
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

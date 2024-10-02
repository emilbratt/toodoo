class _RenderTodoEntries {
    show_checked;
    #todo_entries;

    constructor() {
        this.show_checked = false;
        this.#todo_entries = document.getElementById('todo-entries');
    }

    #into_div(child) {
        const div = document.createElement('div');
        div.appendChild(child);
        return div;
    }

    #todo_text(text) {
        const p = document.createElement('p');
        p.textContent = text;
        return this.#into_div(p)
    }

    #todo_textarea(text, id) {
        const p = document.createElement('textarea');
        p.textContent = text;
        p.id = id;
        p.placeholder = `New todo\nTap this box to start writing..\n\nHello there! :)`;
        p.setAttribute("onfocus", "this.select()");
        return this.#into_div(p);
    }

    #todo_button_check(checked) {
        const btn = document.createElement('button');
        if (checked) {
            btn.textContent = 'Uncheck';
            btn.className = 'button-uncheck';
        } else {
            btn.textContent = '✓';
            btn.className = 'button-check';
        }
        return this.#into_div(btn);
    }

    #todo_button_save() {
        const btn = document.createElement('button');
        btn.textContent = 'Save';
        btn.className = 'button-save';
        return this.#into_div(btn);
    }

    #todo_button_cancel() {
        const btn = document.createElement('button');
        btn.textContent = 'Cancel';
        btn.className = 'button-cancel';
        return this.#into_div(btn);
    }

    #todo_button_delete() {
        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.className = 'button-delete';
        return this.#into_div(btn);
    }

    #get_row(entry) {
        let row = document.getElementById(entry.id);
        if (row) {
            // reset current todo row
            row.textContent = '';
        } else {
            // add new todo row
            row = document.createElement('div');
            row.id = entry.id;
            if (entry.state.is(TODO_STATES.CHECKED)) {
                // put these on bottom
                this.#todo_entries.appendChild(row);
            } else {
                this.#todo_entries.prepend(row);
            }
        }
        row.className = entry.state.class_name();
        return row;
    }

    all_entries() {
        let todo = TodoData.get_instance();
        for (const entry of todo.entries()) {
            this.show_entry(entry);
        }
    }

    remove_entry(entry) {
        let el = document.getElementById(entry.id);
        if (el) {
            el.remove();
        }
    }

    show_entry(entry) {
        if (entry.state.is(TODO_STATES.CHECKED) && !this.show_checked) {
            this.remove_entry(entry);
            return;
        }

        let row = this.#get_row(entry);

        let btn;
        let text_field;
        switch (entry.state.get()) {
            case TODO_STATES.CHECKED:
            case TODO_STATES.UNCHECKED:
                text_field = this.#todo_text(entry.text);
                text_field.addEventListener("mousedown", (e) => e_todo_entry_edit(entry, e));
                row.appendChild(text_field);

                btn = this.#todo_button_check(entry.state.is(TODO_STATES.CHECKED));
                btn.addEventListener("mousedown", (e) => e_todo_entry_check(entry, e));
                row.appendChild(btn);
                break;

            case TODO_STATES.EDITING:
                text_field = this.#todo_textarea(entry.text, 'edit'.concat(entry.id));
                row.appendChild(text_field);

                btn = this.#todo_button_save();
                btn.addEventListener("mousedown", (e) => e_todo_entry_save(entry, e));
                row.appendChild(btn);

                btn = this.#todo_button_cancel();
                btn.addEventListener("mousedown", (e) => e_todo_entry_cancel(entry, e));
                row.appendChild(btn);

                btn = this.#todo_button_delete();
                btn.addEventListener("mousedown", (e) => e_todo_entry_delete(entry, e));
                row.appendChild(btn);
                break;

            default:
                throw new Error(`state '${entry.state.get()}' is not recognized`);
        }
    }
}

class RenderTodoEntries  {
    static instance;

    static get_instance() {
        if (this.instance === undefined) {
            this.instance = new _RenderTodoEntries;
        }
        return this.instance;
    }
};

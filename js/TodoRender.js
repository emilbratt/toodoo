class _TodoRender {
    show_checked;
    #todo_entries;

    constructor() {
        this.show_checked = false;

        this.#todo_entries = document.getElementById('todo-entries');

        const btn_new_todo = document.getElementById('button-new-todo');
        btn_new_todo.addEventListener("mousedown", (e) => e_todo_new(e));

        const btn_show_checked = document.getElementById('button-show-checked');
        btn_show_checked.addEventListener("mousedown", (e) => e_show_checked(e));
    }

    #div(child) {
        const div = document.createElement('div');
        div.appendChild(child);
        return div;
    }

    #todo_text(text) {
        const p = document.createElement('p');
        p.textContent = text;
        return this.#div(p)
    }

    #todo_textarea(text, id) {
        const p = document.createElement('textarea');
        p.textContent = text;
        p.id = id;
        p.setAttribute("onfocus", "this.select()");
        return this.#div(p);
    }

    #todo_button_check() {
        const btn = document.createElement('button');
        btn.textContent = '✓';
        btn.className = 'button-check';
        return this.#div(btn);
    }

    #todo_button_save() {
        const btn = document.createElement('button');
        btn.textContent = 'Save';
        btn.className = 'button-save';
        return this.#div(btn);
    }

    #todo_button_uncheck() {
        const btn = document.createElement('button');
        btn.textContent = 'Uncheck';
        btn.className = 'button-uncheck';
        return this.#div(btn);
    }

    #todo_button_cancel() {
        const btn = document.createElement('button');
        btn.textContent = 'Cancel';
        btn.className = 'button-cancel';
        return this.#div(btn);
    }

    #todo_button_delete() {
        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.className = 'button-delete';
        return this.#div(btn);
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

        let row = document.getElementById(entry.id);
        if (row) {
            // reset current element
            row.textContent = '';
        } else {
            // add new element
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

        if (entry.state.is(TODO_STATES.UNCHECKED)) {
            const todo_text = this.#todo_text(entry.text);
            todo_text.addEventListener("mousedown", (e) => e_todo_entry_edit(entry, e));
            row.appendChild(todo_text);

            let btn = this.#todo_button_check();
            btn.addEventListener("mousedown", (e) => e_todo_entry_check(entry, e));
            row.appendChild(btn);
        }
        if (entry.state.is(TODO_STATES.CHECKED)) {
            const todo_text = this.#todo_text(entry.text);
            todo_text.addEventListener("mousedown", (e) => e_todo_entry_edit(entry, e));
            row.appendChild(todo_text);

            let btn = this.#todo_button_uncheck();
            btn.addEventListener("mousedown", (e) => e_todo_entry_uncheck(entry, e));
            row.appendChild(btn);
        }
        if (entry.state.is(TODO_STATES.EDITING)) {
            row.appendChild(this.#todo_textarea(entry.text, 'edit'.concat(entry.id)));

            let btn = this.#todo_button_save();
            btn.addEventListener("mousedown", (e) => e_todo_entry_save(entry, e));
            row.appendChild(btn);

            btn = this.#todo_button_cancel();
            btn.addEventListener("mousedown", (e) => e_todo_entry_cancel(entry, e));
            row.appendChild(btn);

            btn = this.#todo_button_delete();
            btn.addEventListener("mousedown", (e) => e_todo_entry_delete(entry, e));
            row.appendChild(btn);
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

class _RenderAppOptions {
    #app_options;
    #btn_new_todo;
    #btn_show_checked;

    constructor() {
        this.#app_options = document.getElementById('app-options');

        this.#btn_new_todo = document.createElement('button');
        this.#btn_new_todo.id = 'button-new-todo';
        this.#btn_new_todo.textContent = 'New';
        this.#btn_new_todo.className = 'button-new-todo';

        this.#btn_show_checked = document.createElement('button');
        this.#btn_show_checked.id = 'button-show-checked';
        this.#btn_show_checked.textContent = 'Show Completed';
    }

    #into_div(child) {
        const div = document.createElement('div');
        div.appendChild(child);
        return div;
    }

    button_show_checked(yes) {
        this.#btn_show_checked.className = yes ? 'button-show-checked' : '';
    }

    init() {
        const div = document.createElement('div');
        div.className = 'todo-options';

        this.#btn_new_todo.addEventListener("mousedown", (e) => e_todo_new(e));
        div.appendChild(this.#into_div(this.#btn_new_todo));

        this.#btn_show_checked.addEventListener("mousedown", (e) => e_opt_show_checked(e));
        div.appendChild(this.#into_div(this.#btn_show_checked));

        this.#app_options.appendChild(div);
    }
}

class RenderAppOptions  {
    static instance;

    static get_instance() {
        if (this.instance === undefined) {
            this.instance = new _RenderAppOptions;
        }
        return this.instance;
    }
};

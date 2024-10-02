class _RenderAppOptions {
    #app_options;

    #row_todo_options;
    #btn_new_todo;
    #btn_show_checked;
    #btn_hamburger;

    #row_page_options;
    #btn_download;

    show_app_options;

    constructor() {
        this.show_app_options = false;

        this.#app_options = document.getElementById('app-options');

        this.#btn_new_todo = this.#new_button('button-new-todo', 'button-new-todo', 'New', );
        this.#btn_show_checked = this.#new_button('button-show-checked', 'button-show-checked-off', 'Show Completed');
        this.#btn_hamburger = this.#new_button('button-hamburger', 'button-hamburger-off', '☰');

        this.#row_todo_options = this.#new_row('todo-options', 'todo-options');
        this.#row_todo_options.appendChild(this.#into_div(this.#btn_new_todo));
        this.#row_todo_options.appendChild(this.#into_div(this.#btn_show_checked));
        this.#row_todo_options.appendChild(this.#into_div(this.#btn_hamburger));

        this.#btn_download = this.#new_button('button-download', 'button-download', 'Download');
    }

    #into_div(child) {
        const div = document.createElement('div');
        div.appendChild(child);
        return div;
    }

    #new_row(id, _class) {
        const row = document.createElement('div');
        row.className = id;
        row.id = _class;
        return row;
    }

    #new_button(id, _class, text_content) {
        const btn = document.createElement('button');
        btn.id = id;
        btn.className = _class;
        btn.textContent = text_content;
        return btn;
    }

    #add_event_listeners() {
        this.#btn_new_todo.addEventListener("mousedown", (e) => e_todo_new(e));
        this.#btn_show_checked.addEventListener("mousedown", (e) => e_toggle_show_checked(e));
        this.#btn_hamburger.addEventListener("mousedown", (e) => e_toggle_show_app_options(e));
        this.#btn_download.addEventListener("mousedown", (e) => e_download(e));
    }

    button_show_checked_highlight(yes) {
        this.#btn_show_checked.className = yes ? 'button-show-checked' : 'button-show-checked-off';
    }

    button_hmburger_highlight(yes) {
        this.#btn_hamburger.className = yes ? 'button-hamburger' : 'button-hamburger-off';
    }

    show_page_options() {
        this.#row_page_options = this.#new_row('page-options', 'page-options');
        this.#row_page_options.appendChild(this.#into_div(this.#btn_download));
        this.#app_options.appendChild(this.#row_page_options);
    }

    remove_page_options() {
        if (this.#row_page_options) this.#row_page_options.remove();
    }

    init() {
        this.#add_event_listeners();
        this.#app_options.appendChild(this.#row_todo_options);
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

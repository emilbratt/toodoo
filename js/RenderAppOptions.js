class _RenderAppOptions {
    #app_options;

    #row_todo_options;
    #btn_new_todo;
    #btn_show_checked;
    #btn_hamburger;

    #row_hamburger_menu;
    #btn_download;
    #btn_upload;
    #btn_delete_checked;

    row_hamburger_menu_visible;

    constructor() {
        this.row_hamburger_menu_visible = false;

        this.#app_options = document.getElementById('app-options');

        this.#btn_new_todo = this.#new_button('button-new-todo', 'button-new-todo', 'New', );
        this.#btn_show_checked = this.#new_button('button-show-checked', 'button-show-checked-off', 'Show Completed');
        this.#btn_hamburger = this.#new_button('button-hamburger', 'button-hamburger-off', '☰');

        this.#row_todo_options = this.#new_row('todo-options', 'todo-options');
        this.#row_todo_options.appendChild(this.#into_div(this.#btn_new_todo));
        this.#row_todo_options.appendChild(this.#into_div(this.#btn_show_checked));
        this.#row_todo_options.appendChild(this.#into_div(this.#btn_hamburger));

        this.#btn_download = this.#new_button('button-download', 'button-download', 'Download');
        this.#btn_upload = this.#new_button('button-upload', 'button-upload', 'Upload');
        this.#btn_delete_checked = this.#new_button('button-delete-checked', 'button-delete-checked', 'Delete Completed');
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
        this.#btn_hamburger.addEventListener("mousedown", (e) => e_toggle_hamburger_menu(e));
        this.#btn_download.addEventListener("mousedown", (e) => e_download_data(e));
        this.#btn_upload.addEventListener("mousedown", (e) => e_upload_data(e));
        this.#btn_delete_checked.addEventListener("click", (e) => e_delete_checked(e));
    }

    #btn_upload_hack() {
        // https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#using_hidden_file_input_elements_using_the_click_method
        const ugly = document.createElement('input');
        ugly.style.display = 'none';
        ugly.id = 'ugly-button-upload';
        ugly.accept = 'application/json';
        ugly.type = 'file';
        ugly.onchange = (e) => e_handle_upload(e);
        return ugly;
    }

    btn_show_checked_toggle_highlight(yes) {
        this.#btn_show_checked.className = yes ? 'button-show-checked' : 'button-show-checked-off';
    }

    btn_hmburger_toggle_highlight(yes) {
        this.#btn_hamburger.className = yes ? 'button-hamburger' : 'button-hamburger-off';
    }

    show_hamburger_menu() {
        this.row_hamburger_menu_visible = true;
        this.#row_hamburger_menu = this.#new_row('hamburger-options', 'hamburger-options');
        this.#row_hamburger_menu.appendChild(this.#into_div(this.#btn_download));
        this.#row_hamburger_menu.appendChild(this.#into_div(this.#btn_upload));
        this.#row_hamburger_menu.appendChild(this.#into_div(this.#btn_delete_checked));
        this.#app_options.appendChild(this.#row_hamburger_menu);
        this.btn_hmburger_toggle_highlight(true);
    }

    remove_hamburger_menu() {
        if (this.#row_hamburger_menu) {
            this.#row_hamburger_menu.remove();
        }
        this.btn_hmburger_toggle_highlight(false);
        this.row_hamburger_menu_visible = false;
    }

    init() {
        this.#add_event_listeners();
        this.#app_options.appendChild(this.#row_todo_options);
        this.#app_options.appendChild(this.#btn_upload_hack());
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

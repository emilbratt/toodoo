"use strict"

function e_first_page_load() {
    // enable debug stuff if on local pc..
    switch (location.hostname) {
        case "127.0.0.1":
        case "localhost":
            DEBUG_ENABLE.TODO_DATA = true;

            debug_add_dummy_data();
            debug_enable_hamburger_menu();
            debug_enable_show_checked();
    }

    // init page
    RenderAppOptions.get_instance().init();
    RenderTodoEntries.get_instance().init();

    debug_todo_data('e_first_page_load');
}

function e_toggle_hamburger_menu(e) {
    if (e.button !== 0) return;

    const options = RenderAppOptions.get_instance();
    if (options.row_hamburger_menu_visible) {
        options.remove_hamburger_menu();
    } else {
        options.show_hamburger_menu();
    }

    debug_todo_data('e_toggle_hamburger_menu');
}

function e_todo_new(e) {
    if (e.button !== 0) return;

    const todo = TodoData.get_instance();
    const entry = todo.new_entry();

    RenderTodoEntries.get_instance().show_entry(entry);

    debug_todo_data('e_todo_new');
}

function e_todo_entry_edit(entry, e) {
    if (e.button !== 0) return;

    entry.state.set(TODO_STATES.EDITING);

    RenderTodoEntries.get_instance().show_entry(entry);
    TodoData.get_instance().save_entry(entry);

    debug_todo_data('e_todo_entry_edit');
}

function e_todo_toggle_check(entry, e) {
    if (e.button !== 0) return;

    if (!entry.state.is(TODO_STATES.CHECKED)) {
        entry.state.set(TODO_STATES.CHECKED);
    } else {
        entry.state.set(TODO_STATES.UNCHECKED);
    }

    RenderTodoEntries.get_instance().show_entry(entry);
    TodoData.get_instance().save_entry(entry);

    debug_todo_data('e_todo_toggle_check');
}

function e_todo_entry_save(entry, text_filed_id, e) {
    if (e.button !== 0) return;

    entry.state.set(TODO_STATES.UNCHECKED);

    const edit_field = document.getElementById(text_filed_id);
    if (!edit_field) {
        throw new Error(`could not find text_filed_id '${text_filed_id}'`);
    }

    const render = RenderTodoEntries.get_instance();

    entry.text = edit_field.value;

    if (entry.text.length === 0) {
        render.remove_entry(entry);
        TodoData.get_instance().delete_by_id(entry.id);
    } else {
        render.show_entry(entry);
        TodoData.get_instance().save_entry(entry);
    }

    debug_todo_data('e_todo_entry_save');
}

function e_todo_entry_cancel(entry, e) {
    if (e.button !== 0) return;

    const render = RenderTodoEntries.get_instance();

    if (entry.text.length === 0) {
        render.remove_entry(entry);
        TodoData.get_instance().delete_by_id(entry.id);
    } else {
        entry.state.pop();
        render.show_entry(entry);
        TodoData.get_instance().save_entry(entry);
    }

    debug_todo_data('e_todo_entry_cancel');
}

function e_todo_entry_delete(entry, e) {
    if (e.button !== 0) return;

    RenderTodoEntries.get_instance().remove_entry(entry);
    TodoData.get_instance().delete_by_id(entry.id);

    debug_todo_data('e_todo_entry_delete');
}

function e_toggle_show_checked(e) {
    if (e.button !== 0) return;

    const render_todo = RenderTodoEntries.get_instance();
    render_todo.show_checked = !render_todo.show_checked;
    render_todo.all_entries();

    RenderAppOptions.get_instance().btn_show_checked_toggle_highlight(render_todo.show_checked);

    debug_todo_data('e_toggle_show_checked');
}

function e_delete_checked(e) {
    if (e.button !== 0) return;

    const todo = TodoData.get_instance();

    for (const entry of todo.entries()) {
        if (entry.state.is(TODO_STATES.CHECKED)) {
            todo.delete_by_id(entry.id);
            RenderTodoEntries.get_instance().remove_entry(entry);
        }
    }

    debug_todo_data('e_delete_checked');
}

function e_download_data(e) {
    if (e.button !== 0) return;

    const data = TodoData.get_instance().save_to_json();

    const a = document.createElement('a');
    a.setAttribute('href', 'data:application/json; charset=utf-8,' + encodeURIComponent(data));
    a.setAttribute('download', 'data.toodoo.'.concat(window.location.hostname).concat('.json'));
    a.click();
    a.remove();

    debug_todo_data('e_download_data');
}

function e_upload_data(is_file_input, e) {
    debug_todo_data('e_handle_upload');

    if (!is_file_input) {
        // The upload button was pressed.
        // Lets make it press the hidden file input to make it trigger the browsers file upload event.
        document.getElementById("ugly-input-upload").click();
    } else {
        // The hidden file input was pressed.
        // lets handle the browsers file upload event.
        try {
            if (e.target.files.length === 0) {
                alert('No file selected!');
                return;
            }

            const reader = new FileReader();

            const file = e.target.files[0];
            reader.readAsText(file);

            reader.onload = (text) => {
                TodoData.get_instance().load_from_json(text.target.result);
                RenderTodoEntries.get_instance().all_entries();
            };
        } catch (err) {
            console.error(err);
        }
    }
}

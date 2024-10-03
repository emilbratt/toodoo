"use strict"

function e_first_page_load() {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        DEBUG_ENABLE.TODO_DATA = true;
        // DEBUG_ENABLE.ADD_DUMMY_DATA = true;
    }

    // if (TodoData.get_instance().is_empty()) {
    //     // show splash!
    //     RenderAppSplash.get_instance().init();
    //     return;
    // }

    // init page
    RenderAppSplash.get_instance().remove();
    RenderAppOptions.get_instance().init();
    RenderTodoEntries.get_instance().all_entries();

    debug_add_dummy_data();
    debug_todo_data('e_first_page_load');
}

function e_splash_start(e) {
    if (e.button !== 0) return;

    RenderAppSplash.get_instance().remove();
    RenderAppOptions.get_instance().init();
    RenderTodoEntries.get_instance().all_entries();

    debug_todo_data('e_splash_start');
}

function e_toggle_show_app_options(e) {
    if (e.button !== 0) return;

    const options = RenderAppOptions.get_instance()
    options.show_app_options = !options.show_app_options;
    if (options.show_app_options) {
        options.show_page_options();
    } else {
        options.remove_page_options();
    }
    options.button_hmburger_highlight(options.show_app_options);

    debug_todo_data('e_toggle_show_app_options');
}

function e_todo_new(e) {
    if (e.button !== 0) return;

    const todo = TodoData.get_instance();
    const entry = todo.new_entry();

    RenderTodoEntries.get_instance().show_entry(entry);

    debug_todo_data('e_todo_new');
}

function e_download(e) {
    if (e.button !== 0) return;

    console.log('download');

    debug_todo_data('e_download');
}

function e_todo_entry_edit(entry, e) {
    if (e.button !== 0) return;

    entry.state.set(TODO_STATES.EDITING);

    RenderTodoEntries.get_instance().show_entry(entry);
    TodoData.get_instance().save_entry(entry);

    debug_todo_data('e_todo_entry_edit');
}

function e_todo_entry_check(entry, e) {
    if (e.button !== 0) return;

    if (!entry.state.is(TODO_STATES.CHECKED)) {
        entry.state.set(TODO_STATES.CHECKED);
    } else {
        entry.state.set(TODO_STATES.UNCHECKED);
    }

    RenderTodoEntries.get_instance().show_entry(entry);
    TodoData.get_instance().save_entry(entry);

    debug_todo_data('e_todo_entry_check');
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
        TodoData.get_instance().delete_entry(entry.id);
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
        TodoData.get_instance().delete_entry(entry.id);
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
    TodoData.get_instance().delete_entry(entry.id);

    debug_todo_data('e_todo_entry_delete');
}

function e_toggle_show_checked(e) {
    if (e.button !== 0) return;

    const render_todo = RenderTodoEntries.get_instance();
    render_todo.show_checked = !render_todo.show_checked;
    render_todo.all_entries();

    RenderAppOptions.get_instance().button_show_checked_highlight(render_todo.show_checked);

    debug_todo_data('e_toggle_show_checked');
}

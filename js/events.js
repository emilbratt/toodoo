"use strict"

function e_first_page_load() {
    const render = RenderAppOptions.get_instance();
    render.init();
}

function e_todo_new(e) {
    const todo = TodoData.get_instance();
    const entry = todo.new_entry('write');

    RenderTodoEntries.get_instance().show_entry(entry);
}

function e_todo_entry_edit(entry, e) {
    if (e.button !== 0) return;

    entry.state.set(TODO_STATES.EDITING);

    RenderTodoEntries.get_instance().show_entry(entry);
}

function e_todo_entry_check(entry, e) {
    if (e.button !== 0) return;

    if (!entry.state.is(TODO_STATES.CHECKED)) {
        entry.state.set(TODO_STATES.CHECKED);
    } else {
        entry.state.set(TODO_STATES.UNCHECKED);
    }

    RenderTodoEntries.get_instance().show_entry(entry);
}

function e_todo_entry_save(entry, e) {
    if (e.button !== 0) return;

    entry.state.set(TODO_STATES.UNCHECKED);

    const edit_id = 'edit'.concat(entry.id);
    const edit_field = document.getElementById(edit_id);
    if (!edit_field) {
        throw new Error(`could not find element by id '${edit_id}'`);
    }

    const render = RenderTodoEntries.get_instance();

    entry.text = edit_field.value;

    if (entry.text.length === 0) {
        render.remove_entry(entry);
        TodoData.get_instance().delete_entry(entry);
    } else {
        render.show_entry(entry);
    }
}

function e_todo_entry_cancel(entry, e) {
    if (e.button !== 0) return;

     // remove last added state making the previous state now the current one
    entry.state.pop();

    const render = RenderTodoEntries.get_instance();

    if (entry.text.length === 0) {
        render.remove_entry(entry);
        TodoData.get_instance().delete_entry(entry);
    } else {
        render.show_entry(entry);
    }
}

function e_todo_entry_delete(entry, e) {
    console.log('e_todo_entry_save:', entry, 'mouse: ', e);

    RenderTodoEntries.get_instance().remove_entry(entry);
    TodoData.get_instance().delete_entry(entry);
}

function e_opt_show_checked(e) {
    console.log('e_show_checked:', 'mouse: ', e);

    const render_todo = RenderTodoEntries.get_instance();
    render_todo.show_checked = !render_todo.show_checked;
    render_todo.all_entries();

    RenderAppOptions.get_instance().button_show_checked(render_todo.show_checked);
}

function e_add_dummy_data() {
    let todo = TodoData.get_instance();

    let breakfast = todo.new_entry();
    breakfast.text = 'Eat breakfast';
    breakfast.state.set(TODO_STATES.CHECKED);
    breakfast.state.set(TODO_STATES.EDITING);

    let dinner = todo.new_entry();
    dinner.text = 'Make dinner';
    dinner.state.set(TODO_STATES.CHECKED);

    let bathroom = todo.new_entry();
    bathroom.text = 'Clean bathroom';
    bathroom.state.set(TODO_STATES.UNCHECKED);

    let bob = todo.new_entry();
    bob.text = 'Call Bob';
    bob.state.set(TODO_STATES.CHECKED);

    let j = todo.to_json();
    todo.data = {};
    todo.from_json(j);

    // todo.sort(true);
    let render = RenderTodoEntries.get_instance();
    // render.show_checked = true;

    for (const entry of todo.entries()) {
        render.show_entry(entry);
    }
}

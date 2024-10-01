function e_todo_new(e) {
    console.log('e_todo_new:', 'mouse: ', e);

    const todo = TodoData.get_instance();
    const entry = todo.new_entry('write');

    const render = TodoRender.get_instance();
    render.show_entry(entry);
}

function e_todo_entry_edit(entry, e) {
    console.log('e_todo_entry_edit:', entry, e);
    if (e.button !== 0) return;
    if (entry.state.is(TODO_STATES.EDITING)) return;

    entry.state.set(TODO_STATES.EDITING);

    const render = TodoRender.get_instance();
    render.show_entry(entry);
}

function e_todo_entry_check(entry, e) {
    console.log('e_todo_entry_check:', entry, 'mouse: ', e);
    if (e.button !== 0) return;
    if (entry.state.is(TODO_STATES.CHECKED)) return;

    entry.state.set(TODO_STATES.CHECKED);

    const render = TodoRender.get_instance();
    render.show_entry(entry);
}

function e_todo_entry_uncheck(entry, e) {
    console.log('e_todo_entry_uncheck:', entry, 'mouse: ', e);
    if (e.button !== 0) return;
    if (entry.state.is(TODO_STATES.UNCHECKED)) return;

    entry.state.set(TODO_STATES.UNCHECKED);

    const render = TodoRender.get_instance();
    render.show_entry(entry);
}

function e_todo_entry_save(entry, e) {
    console.log('e_todo_entry_save:', entry, 'mouse: ', e);
    if (e.button !== 0) return;

    entry.state.set(TODO_STATES.UNCHECKED);

    const edit_id = 'edit'.concat(entry.id);
    const edit_field = document.getElementById(edit_id);
    if (!edit_field) {
        throw new Error(`could not find element by id '${edit_id}'`);
    }

    const render = TodoRender.get_instance();

    entry.text = edit_field.value;

    if (entry.text.length === 0) {
        const todo = TodoData.get_instance();
        render.remove_entry(entry);
        todo.delete_entry(entry);
    } else {
        render.show_entry(entry);
    }
}

function e_todo_entry_cancel(entry, e) {
    console.log('cancel:', entry, 'mouse: ', e);
    if (e.button !== 0) return;

    entry.state.pop();

    const render = TodoRender.get_instance();

    if (entry.text.length === 0) {
        const todo = TodoData.get_instance();
        render.remove_entry(entry);
        todo.delete_entry(entry);
    }

    render.show_entry(entry);
}

function e_todo_entry_delete(entry, e) {
    console.log('e_todo_entry_save:', entry, 'mouse: ', e);

    const render = TodoRender.get_instance();
    render.remove_entry(entry);

    const todo = TodoData.get_instance();
    todo.delete_entry(entry);
}

function e_show_checked(e) {
    console.log('e_show_checked:', 'mouse: ', e);

    const render = TodoRender.get_instance();
    render.show_checked = !render.show_checked;
    render.all_entries();
}

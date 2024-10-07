"use strict"

const DEBUG_ENABLE = {
    TODO_DATA: false,
};

function debug_enable_hamburger_menu() {
    console.log('\nDEBUG:', 'debug_enable_hamburger_menu()');

    const options = RenderAppOptions.get_instance();
    options.show_hamburger_menu_buttons;
    options.show_hamburger_menu();
}

function debug_enable_show_checked() {
    console.log('\nDEBUG:', 'debug_enable_show_checked()');
    RenderTodoEntries.get_instance().show_checked = true;

    RenderAppOptions.get_instance().btn_show_checked_toggle_highlight(true);

    debug_todo_data('e_toggle_show_checked');
}

function debug_todo_data(caller) {
    if (!DEBUG_ENABLE.TODO_DATA) return;

    console.log(`\nDEBUG '${caller}()'`)

    const todo = TodoData.get_instance();

    const json = localStorage.getItem('data');
    if (json === null) {
        console.log('LOCAL STORAGE IS NULL');
        console.assert(todo.entries().length === 0);
        return;
    } else if (caller === 'e_first_page_load') {
        console.log(`LOCAL STORAGE\n${json}`);
    }

    const local_storage = JSON.parse(json);
    console.assert(local_storage.entries.length === todo.entries().length);

    for (let i = 0; i < local_storage.entries.length; i++) {
        let local_entry = local_storage.entries[i];
        let s_local_entry = JSON.stringify(local_entry);

        let mem_entry = todo.entries()[i];
        let s_mem_entry = JSON.stringify(mem_entry);

        console.assert(
            (s_local_entry === s_mem_entry),
            '\ns_local_entry', s_local_entry,
            '\ns_mem_entry', s_mem_entry,
        );

        console.log(mem_entry.state.state_name());
        console.log('local', local_entry);
        console.log('mem', mem_entry);

        console.log();
    }
}

function debug_add_dummy_data() {
    console.log('\nDEBUG:', 'debug_add_dummy_data()');

    let todo = TodoData.get_instance();
    todo.reset();

    let breakfast = todo.new_entry();
    breakfast.text = 'Eat breakfast';
    breakfast.state.set(TODO_STATES.CHECKED);
    todo.save_entry(breakfast);

    let dinner = todo.new_entry();
    dinner.text = 'Make dinner';
    dinner.state.set(TODO_STATES.CHECKED);
    todo.save_entry(dinner);

    let bathroom = todo.new_entry();
    bathroom.text = 'Clean bathroom';
    bathroom.state.set(TODO_STATES.UNCHECKED);
    todo.save_entry(bathroom);

    let bob = todo.new_entry();
    bob.text = 'Call Bob';
    bob.state.set(TODO_STATES.UNCHECKED);
    todo.save_entry(bob);

    let j = todo.save_to_json();
    todo.load_from_json(j);

    // todo.sort(true);

    let render = RenderTodoEntries.get_instance();
    // render.show_checked = true;
    render.all_entries();
}

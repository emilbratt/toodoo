"use strict"

document.addEventListener("DOMContentLoaded", main);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    // await sleep(700);

    let todo = TodoData.get_instance();

    todo.toggle_show_completed();
    todo.toggle_show_deleted();

    let build_bedrom = todo.new_entry('Build bedroom');
    build_bedrom.state.set(TODO_STATES.EDITING);

    let build_kitchen = todo.new_entry('Build kitchen');
    build_kitchen.state.set(TODO_STATES.DELETED);

    let build_house = todo.new_entry('Build house');
    build_house.state.set(TODO_STATES.CHECKED);

    todo.new_entry('Call Bob');
    todo.new_entry('Build wc');

    // todo.sort();
    let render = TodoRender.get_instance();
    for (const entry of todo.data.entries) {
        render.todo_rows(entry);
    }
}

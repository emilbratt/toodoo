"use strict"

document.addEventListener("DOMContentLoaded", main);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    // await sleep(700);

    let todo = TodoData.get_instance();

    let build_bedrom = todo.new_entry('Build bedroom');
    build_bedrom.state.set(TODO_STATES.EDITING);

    let build_kitchen = todo.new_entry('Build kitchen');
    build_kitchen.state.set(TODO_STATES.CHECKED);

    let build_house = todo.new_entry('Build house');
    build_house.state.set(TODO_STATES.CHECKED);

    todo.new_entry('Call Bob');
    todo.new_entry('Build wc');

    let j = todo.to_json();
    todo.data = {};
    todo.from_json(j);

    // todo.sort();
    let render = TodoRender.get_instance();
    render.show_completed = true;

    for (const entry of todo.data.entries) {
        render.todo_rows(entry);
    }
}

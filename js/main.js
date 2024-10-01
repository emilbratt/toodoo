"use strict"

document.addEventListener("DOMContentLoaded", main);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    // await sleep(700);

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
    let render = TodoRender.get_instance();
    render.show_checked = true;

    for (const entry of todo.entries()) {
        render.show_entry(entry);
    }
}

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentEditIndex = null;
let currentDeleteIndex = null;

function render(task = 'all') {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    let checktodos = [];
if (task === 'all') {
    checktodos = todos;
} else if (task === 'done') {
    checktodos = todos.filter(todo => todo.done);
} else if (task === 'todo') {
    checktodos = todos.filter(todo => !todo.done);
}
if (checktodos.length === 0) {
    todoList.innerHTML = 'No Tasks 📝';
    return;
}
    checktodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.done ? 'done' : ''}`;
        li.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-actions">
                <button class="toggle" onclick="toggle(${index})">${todo.done ? '<i class="fa-regular fa-square-check"></i>' : '<i class="fa-regular fa-square"></i>'}</button>
                <button class="edit" onclick="openedit(${index})"><i class="fa-solid fa-pen"></i></button>
                <button class="delete" onclick="deleteTodo(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        todoList.appendChild(li);
    });
}
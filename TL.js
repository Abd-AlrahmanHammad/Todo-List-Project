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
function msgshow(message) {
    const container = document.querySelector('.container');
    const existingMessageBox = container.querySelector('.message-box');
    if (existingMessageBox) {container.removeChild(existingMessageBox);}
    const messageBox = document.createElement('div');
    messageBox.className = 'message-box';

    const successMessages = [
        'Task added successfully 🎉',
        'Task has been deleted.',
        'Task has been edited.'
    ];
    if (successMessages.includes(message)) {
        messageBox.style.backgroundColor = '#d4edda';
        messageBox.style.color = '#155724';
        messageBox.style.border = '1px solid #c3e6cb';
    }
    messageBox.textContent = message;
    container.appendChild(messageBox);
    setTimeout(() => { container.removeChild(messageBox);}, 3000);
}
function add() {
    const todoInput = document.getElementById('newTodo');
    const errorMessage = document.getElementById('error-message');
    const taskText = todoInput.value.trim();
    if (taskText === '') {
        errorMessage.textContent = '⛔ Task cannot be empty';
        return;
    }
    if (taskText.length < 5) {
        errorMessage.textContent = '⛔ Task must be at least 5 characters long';
        return;
    }

    if (taskText[0] >= '0' && taskText[0] <= '9') {
        errorMessage.textContent = '⛔ Task cannot start with a number';
        return;
    }
    if (!/^[a-zA-Z0-9\s.,'!?-]+$/.test(taskText)) {
        errorMessage.textContent = '⛔ Task must contain only English characters';
        return;}
    errorMessage.textContent = '';
    todos.push({ text: taskText, done: false });
    saveTodos();
    todoInput.value = '';
    render();
    msgshow('Task added successfully 🎉');
}
function toggle(index) {
    todos[index].done = !todos[index].done;
    saveTodos();
    render();
}
function deleteTodo(index) {
    currentDeleteIndex = index;
    document.getElementById('deleteModal').style.display = 'flex';
}
function confirmDeleteTodo() {
    todos.splice(currentDeleteIndex, 1);
    closeDeleteModal();
    msgshow("Task has been deleted.");
    saveTodos();
    render();
}
function deleteDoneTodos() {
    todos = todos.filter(todo => !todo.done);
    saveTodos();
    render();
}
function deleteDoneTodos() {
    const doneTasks = todos.filter(todo => todo.done);
    if (doneTasks.length === 0) {
        msgshow("No done tasks to delete.");
        return;
    }
    document.getElementById('deleteAllDoneModal').style.display = 'flex';
}
function deleteAllTodos() {
    todos = [];
    saveTodos();
    render();
}
function deleteAllTodos() {
    if (todos.length === 0) {
        msgshow("No tasks to delete.");
        return;
    }
    document.getElementById('deleteAllModal').style.display = 'flex';
}
function confirmDeleteTodo() {
    todos.splice(currentDeleteIndex, 1);
    closeDeleteModal();
    msgshow("Task has been deleted.");
    saveTodos();
    render();
}
function closeDeleteAllModal() {
    document.getElementById('deleteAllModal').style.display = 'none';
}
function confirmDeleteAllDone() {
    todos = todos.filter(todo => !todo.done);
    closeDeleteAllDoneModal();
    msgshow("All done Tasks has been deleted.");
    saveTodos();
    render();
}
function closeDeleteAllDoneModal() {
    document.getElementById('deleteAllDoneModal').style.display = 'none';
}
function filterTodos(task) {
    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(button => button.classList.remove('active'));
    document.querySelector(`.filter-buttons button[onclick="filterTodos('${task}')"]`).classList.add('active');
    render(task);
}
function openedit(index) {
    currentEditIndex = index;
    const editTodoInput = document.getElementById('editTodoInput');
    const errorMessage = document.getElementById('edit-error-message');
    errorMessage.textContent = '';
    editTodoInput.value = todos[index].text;
    document.getElementById('editModal').style.display = 'flex';
}
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}
function saveEditTodo() {
    const editTodoInput = document.getElementById('editTodoInput');
    const errorMessage = document.getElementById('edit-error-message');
    const newText = editTodoInput.value.trim();
    if (newText.length < 5) {
        errorMessage.textContent = '⛔ Task must be at least 5 characters long';
        return;
    }
    todos[currentEditIndex].text = newText;
    msgshow("Task has been edited.");
    saveTodos();
    closeEditModal();
    render();
}
function closeDeleteModal() {document.getElementById('deleteModal').style.display = 'none';}
function saveTodos() {localStorage.setItem('todos', JSON.stringify(todos));}
document.addEventListener('DOMContentLoaded', () => {render();});
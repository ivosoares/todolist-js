// Array onde sera salvo as tarefas
let todoItems = [];


// Funcao que adiciona uma tarefa dentro do array de tarefas
function addTodo(text) {
    // Objeto da tarefa
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    // Enviar tarefa para lista de tarefas
    todoItems.push(todo);
    renderTodo(todo);
    console.log('Lista de Tarefas', todoItems);
}

// Buscar elemento formulario do DOM
const form = document.querySelector('.js-form');

// Logica do evento submit do formulario
form.addEventListener('submit', event => {
    event.preventDefault();

    // buscar elemento do input do DOM (tracker)
    const input = document.querySelector('.js-todo-input');
    // Buscando valor que o usuario digita no input.
    const text = input.value.trim();

    if(text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
})



// Funcao que renderiza os todos na tela
function renderTodo(todo) {
    console.log(todo);
    // Tracker a lista onde deve ser incluida os todos.
    const list = document.querySelector('.js-todo-list');

    const listItem = document.createElement("li");

    listItem.innerHTML = `<span>${todo.text}</span>`;

    list.append(listItem);

}
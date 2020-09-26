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

    // cria o elemento li no DOM dentro da UL
    const listItem = document.createElement("li");

    listItem.setAttribute('class', `todo-item`);
    listItem.setAttribute('data-key', `${todo.id}`);

    listItem.innerHTML = `
        <input id="${todo.id}" type="checkbox"/>
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <button class="delete-todo js-delete-todo">
            <svg><use href="#delete-icon"></use></svg>
        </button>
    `;

    list.append(listItem);

}


// marcar tarefa como concluida
// selecionar lista de tarefas
const list = document.querySelector('.js-todo-list');

list.addEventListener('click', event => {
    console.log(event.target);
    if(event.target.classList.contains('js-tick')){
        // buscar o data data customizavel e chamar a funcao que marca a tarefa como concluida.
    }else {
        
    }
})
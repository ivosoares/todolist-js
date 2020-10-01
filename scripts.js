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


// Funcao que marca a tarefa como concluida
function toggleDone(key) {
    // buscando o indice ta tarefa dentro do array de tarefas de acordo com o key recebida.

    const index = todoItems.findIndex(function(item) {
        return item.id === Number(key);
    })

    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
}


function deleteTodo(key) {
    const index = todoItems.findIndex(function(item) {
        return item.id === Number(key);
    })

    const todo = {
        deleted: true,
        ...todoItems[index]
    }

    todoItems = todoItems.filter(item => item.id !== Number(key));

    console.log(todoItems);
    renderTodo(todo);
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

    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
})



// Funcao que renderiza os todos na tela
function renderTodo(todo) {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));

    // Tracker a lista onde deve ser incluida os todos.
    const list = document.querySelector('.js-todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`)

    // cria o elemento li no DOM dentro da UL
    const listItem = document.createElement("li");

    const isChecked = todo.checked ? 'done' : '';

    if (todo.deleted) {
        item.remove();
        return
    }


    listItem.setAttribute('class', `todo-item ${isChecked}`);
    listItem.setAttribute('data-key', `${todo.id}`);

    listItem.innerHTML = `
        <input id="${todo.id}" type="checkbox"/>
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <button class="delete-todo js-delete-todo">
            <svg><use href="#delete-icon"></use></svg>
        </button>
    `;

    if (item) {
        list.replaceChild(listItem, item);
    } else {
        list.append(listItem);
    }
}


// marcar tarefa como concluida
// selecionar lista de tarefas
const list = document.querySelector('.js-todo-list');

list.addEventListener('click', event => {
    // console.log(event.target);
    if (event.target.classList.contains('js-tick')) {
        // buscar o data data customizavel e chamar a funcao que marca a tarefa como concluida
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    // IF responsavel por saber se o usuario clicou no botao de delete e salva o id(key) do elemento clicado

    if (event.target.classList.contains('js-delete-todo')) {
        // buscar o data data customizavel e chamar a funcao que marca a tarefa como concluida
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const lista = localStorage.getItem('todoItems');

    if (lista) {
        todoItems = JSON.parse(lista);
        todoItems.forEach(todo => {
            renderTodo(todo);
        });
    }
})
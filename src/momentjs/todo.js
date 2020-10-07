const todoForm = document.querySelector('.js-todo-form');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.js-todo-list');

const TODOS_LS = 'todos';

let todos = [];

function handleDeleteTodo(event){
  const parentLI = event.target.parentElement;
  todos = todos.filter(todo => todo.id !== parseFloat(parentLI.id));
  parentLI.remove();
  saveTodos();
}

function updateTodo(todo){
  todos.push(todo);
}

function paintTodo(text){
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  delBtn.innerHTML = "🙅‍♂️";
  delBtn.addEventListener('click', handleDeleteTodo);
  const span = document.createElement('span');
  const newId = todos.length + 1;
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  todoList.appendChild(li);
  updateTodo({
    text: text,
    id: newId,
  });
}

function saveTodos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function handleTodoSubmit(event){
  event.preventDefault();
  const currentValue = todoInput.value;
  paintTodo(currentValue)
  todoInput.value = '';
  todoInput.focus();
  saveTodos();
}

function loadTodos(){
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if(loadedTodos){
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach(todo => paintTodo(todo.text));
  }
}

function todoInit(){
  loadTodos();
  todoForm.addEventListener('submit', handleTodoSubmit);
}

todoInit();
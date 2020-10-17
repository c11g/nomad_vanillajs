const todoForm = document.querySelector('.js-todo-form');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.js-todo-list');

const TODOS_LS = 'todos';

let todos = [];

function handleDeleteTodo(event){
  const parentLI = event.target.parentElement;
  todos = todos.filter(todo => todo.id !== parseFloat(parentLI.id));
  renderTodo();
  saveTodos();
}

function handleToggleTodo(event){
  const { target } = event;
  let status;
  switch (target.dataset.status) {
    case "is_ready": 
      status = "is_progress";
    break;
    case "is_progress": 
      status = "is_done";
    break;
    default:
      status = "is_ready";
  }
  target.dataset.status = status;
  todos = todos.map(todo => {
    if (todo.id === parseFloat(target.id)) {
      todo.status = status;
    }
    return todo;
  });
  renderTodo();
  saveTodos();
}

function addTodo(todo){
  todos.push(todo);
}

function paintTodo({id, text, status}){
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  delBtn.classList.add("delete");
  delBtn.innerHTML = "del";
  delBtn.addEventListener('click', handleDeleteTodo);
  const span = document.createElement('span');
  span.classList.add("task");
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.classList.add("item");
  li.id = id;
  li.dataset.status = status;
  li.addEventListener('click', handleToggleTodo);
  todoList.appendChild(li);
}

function saveTodos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function handleTodoSubmit(event){
  event.preventDefault();
  const todoObj = {
    id: Date.now(),
    text: todoInput.value,
    status: "is_ready"
  }
  addTodo(todoObj);
  renderTodo();
  saveTodos();
  todoInput.value = '';
  todoInput.focus();
}

function renderTodo() {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    paintTodo(todo)
  })
}

function loadTodos(){
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if(loadedTodos){
    const parsedTodos = JSON.parse(loadedTodos);
    todos = parsedTodos;
  }
}

function todoInit(){
  loadTodos();
  renderTodo();
  todoForm.addEventListener('submit', handleTodoSubmit);
}

todoInit();
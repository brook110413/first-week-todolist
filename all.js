let todoData = JSON.parse(localStorage.getItem('todoList')) || [];
let newTodo = document.querySelector('#newTodo');
let addTodo = document.querySelector('#addTodo');
let todoList = document.querySelector('#todoList');
let taskCount = document.querySelector('#taskCount');
let clearTaskBtn = document.querySelector('#clearTask');

addTodo.addEventListener('click', addTodoData);
clearTaskBtn.addEventListener('click', clearTask);
todoList.addEventListener('click', removeTodo);
todoList.addEventListener('click', completedTodo);
updateList();

// 增加資料到data
function addTodoData() {
  if (newTodo.value.trim() !== '') {
    todoData.push({
      id: Math.floor(Date.now()),
      title: document.getElementById('newTodo').value,
      completed: false,
    })
    localStorage.setItem('todoList', JSON.stringify(todoData));
  }
  updateList();
}

// 更新畫面
function updateList() {
  let str = '';
  todoData.forEach(function (item) {
    str += `<li class="list-group-item">
    <div class="d-flex">
    <div class="form-check">
    <input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : ''} data-action="complete" data-id="${item.id}">
    <label class="form-check-label ${item.completed ? 'completed' : ''}" data-action="complete" data-id="${item.id}"> ${item.title}</label>
    </div>
    <button type="button" class="close ml-auto" aria-label="Close">
    <span aria-hidden="true" data-action="remove" data-id="${item.id}">&times;</span>
    </button>
    </div>
    </li>`
  })
  todoList.innerHTML = str;
  taskCount.textContent = todoData.length;
  newTodo.value = '';
}

// 清除所有toDoList
function clearTask(e) {
  e.preventDefault();
  todoData = [];
  localStorage.setItem('todoList', JSON.stringify(todoData));
  updateList();
}

// 移除todo
function removeTodo(e) {
  let newIndex = 0;
  if (e.target.dataset.action == 'remove') {
    todoData.forEach(function (item, key) {
      if (e.target.dataset.id == item.id) {
        newIndex = key;
      }
    })
    todoData.splice(newIndex, 1);
    localStorage.setItem('todoList', JSON.stringify(todoData));
    updateList();
  }
}

// 完成todo
function completedTodo(e) {
  if (e.target.dataset.action == 'complete') {
    todoData.forEach(function (item) {
      if (e.target.dataset.id == item.id) {
        if (item.completed) {
          item.completed = false;
        } else {
          item.completed = true;
        }
      }
    })
  }
  updateList();
}
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const pendingCount = document.getElementById("pending-count");
const storageKey = "mi-lista-tareas";

let tasks = JSON.parse(localStorage.getItem(storageKey) || "[]");

function saveTasks() {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function updatePendingCount() {
  const pendingTasks = tasks.filter(function (task) {
    return !task.completed;
  }).length;
  pendingCount.textContent = `Tareas pendientes: ${pendingTasks}`;
}

function createTaskElement(task, taskIndex) {
  const taskItem = document.createElement("li");
  const taskTextElement = document.createElement("span");
  const deleteButton = document.createElement("button");

  taskTextElement.textContent = task.text;
  deleteButton.type = "button";
  deleteButton.textContent = "Eliminar";

  if (task.completed) {
    taskItem.classList.add("completed");
  }

  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    tasks.splice(taskIndex, 1);
    taskItem.remove();
    saveTasks();
    renderTasks();
  });

  taskItem.addEventListener("click", function () {
    task.completed = !task.completed;
    taskItem.classList.toggle("completed", task.completed);
    saveTasks();
    updatePendingCount();
  });

  taskItem.append(taskTextElement, deleteButton);
  return taskItem;
}

function renderTasks() {
  taskList.replaceChildren();

  tasks.forEach(function (task, taskIndex) {
    taskList.appendChild(createTaskElement(task, taskIndex));
  });

  updatePendingCount();
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  tasks.push({ text: taskText, completed: false });
  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
});

renderTasks();

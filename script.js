const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const taskList = document.getElementById("task-list");
const pendingCount = document.getElementById("pending-count");
const storageKey = "mi-lista-tareas";
const priorityLabels = {
  urgent: "Urgente",
  normal: "Normal",
  low: "Baja"
};

let tasks = JSON.parse(localStorage.getItem(storageKey) || "[]");

tasks.forEach(function (task) {
  if (!priorityLabels[task.priority]) {
    task.priority = "normal";
  }
});

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
  const taskDetails = document.createElement("div");
  const taskTextElement = document.createElement("span");
  const taskPrioritySelect = document.createElement("select");
  const deleteButton = document.createElement("button");

  taskTextElement.textContent = task.text;
  taskDetails.className = "task-details";
  taskPrioritySelect.className = `priority priority-${task.priority}`;
  taskPrioritySelect.setAttribute("aria-label", `Prioridad de ${task.text}`);

  Object.entries(priorityLabels).forEach(function ([value, label]) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    option.selected = task.priority === value;
    taskPrioritySelect.appendChild(option);
  });

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

  taskPrioritySelect.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  taskPrioritySelect.addEventListener("change", function () {
    task.priority = taskPrioritySelect.value;
    taskPrioritySelect.className = `priority priority-${task.priority}`;
    saveTasks();
  });

  taskDetails.append(taskTextElement, taskPrioritySelect);
  taskItem.append(taskDetails, deleteButton);
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

  tasks.push({
    text: taskText,
    completed: false,
    priority: prioritySelect.value
  });
  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
});

renderTasks();

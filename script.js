const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const dueDateInput = document.getElementById("due-date");
const taskList = document.getElementById("task-list");
const pendingCount = document.getElementById("pending-count");
const storageKey = "mi-lista-tareas";
const priorityLabels = {
  urgent: "Urgente",
  normal: "Normal",
  low: "Baja",
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

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isOverdue(task) {
  return Boolean(task.dueDate) && !task.completed && task.dueDate < getTodayDate();
}

function formatDueDate(dueDate) {
  const [year, month, day] = dueDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es-ES");
}

function createTaskElement(task, taskIndex) {
  const taskItem = document.createElement("li");
  const taskDetails = document.createElement("div");
  const taskTextElement = document.createElement("span");
  const taskDueDateElement = document.createElement("small");
  const taskPrioritySelect = document.createElement("select");
  const deleteButton = document.createElement("button");

  taskTextElement.textContent = task.text;
  if (task.dueDate) {
    taskDueDateElement.className = "task-due-date";
    taskDueDateElement.textContent = `Fecha límite: ${formatDueDate(task.dueDate)}`;
  }
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

  if (isOverdue(task)) {
    taskItem.classList.add("overdue");
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

  taskDetails.append(taskTextElement, taskDueDateElement, taskPrioritySelect);
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
    priority: prioritySelect.value,
    dueDate: dueDateInput.value,
  });
  saveTasks();
  renderTasks();

  taskInput.value = "";
  dueDateInput.value = "";
  taskInput.focus();
});

renderTasks();

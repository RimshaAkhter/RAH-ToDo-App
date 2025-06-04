let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task counter
function updateCounter() {
  const count = document.querySelectorAll('.task-item').length;
  document.getElementById('task-count').innerText = count;
}

// Render all tasks based on filter
function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (currentFilter === 'completed' && !task.completed) return;
    if (currentFilter === 'pending' && task.completed) return;

    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-buttons">
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    list.appendChild(li);
  });

  updateCounter();
}

// Add a new task
function addTask() {
  const input = document.getElementById('task-input');
  const text = input.value.trim();
  if (!text) {
    alert("Please enter a task.");
    return;
  }

  tasks.push({ text, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

// Delete task by index
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Toggle task completed
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Filter tasks (All / Completed / Pending)
function filterTasks(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.filters button[onclick*="${filter}"]`).classList.add('active');
  renderTasks();
}

// Toggle dark/light mode
document.getElementById('toggle-theme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  document.getElementById('toggle-theme').textContent = isDark ? '☀️' : '🌙';
});

// Initial rendering on page load
renderTasks();

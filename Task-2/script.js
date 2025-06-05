let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

const formatDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${date} ${time}`;
};

const setFilter = (newFilter) => {
  filter = newFilter;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('font-semibold'));
  document.getElementById(`filter-${newFilter}`).classList.add('font-semibold');
  renderTasks();
};

const clearCompleted = () => {
  tasks = tasks.filter(task => !task.completed);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
};

const renderTasks = () => {
  const list = document.getElementById('todoList');
  list.innerHTML = '';

  // Filter tasks
  let filteredTasks = [];
  if (filter === 'all') filteredTasks = tasks;
  else if (filter === 'completed') filteredTasks = tasks.filter(t => t.completed);
  else if (filter === 'pending') filteredTasks = tasks.filter(t => !t.completed);

  filteredTasks.forEach((task, index) => {
    const originalIndex = tasks.indexOf(task);

    const li = document.createElement('li');
    li.className = 'flex justify-between items-start p-4 bg-gray-100 rounded-md shadow-sm flex-col sm:flex-row sm:items-center sm:gap-4';

    // Priority color
    let priorityColor = '';
    switch (task.priority) {
      case 'High': priorityColor = 'text-red-600'; break;
      case 'Medium': priorityColor = 'text-yellow-600'; break;
      case 'Low': priorityColor = 'text-green-600'; break;
    }

    li.innerHTML = `
          <div class="flex-1">
            <p onclick="toggleComplete(${originalIndex})"
              class="cursor-pointer ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'} font-medium ${priorityColor}">
              ${task.text}
            </p>
            <p class="text-sm text-gray-500">${task.timestamp}</p>
          </div>
          <div class="flex gap-2 mt-2 sm:mt-0">
            <button onclick="toggleComplete(${originalIndex})"
              class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
              ${task.completed ? 'Undo' : 'Done'}
            </button>
            <button onclick="editTask(${originalIndex})"
              class="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">
              Edit
            </button>
            <button onclick="deleteTask(${originalIndex})"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        `;

    list.appendChild(li);
    gsap.from(li, { opacity: 0, y: 20, duration: 0.4 });
  });

  updateTaskCount();
};

const updateTaskCount = () => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  document.getElementById('taskCount').textContent = `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
};

const addTask = () => {
  const input = document.getElementById('todoInput');
  const priority = document.getElementById('prioritySelect').value;
  const taskText = input.value.trim();
  if (taskText === '') return;

  tasks.push({
    text: taskText,
    completed: false,
    timestamp: formatDateTime(),
    priority: priority
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  input.value = '';
  renderTasks();
};

const deleteTask = (index) => {
  const list = document.getElementById('todoList');
  const item = list.children[index];
  gsap.to(item, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    onComplete: () => {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  });
};

const toggleComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
};

const editTask = (index) => {
  const newText = prompt('Edit your task:', tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim() || tasks[index].text;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
};


document.getElementById('todoInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTask();
});


setFilter('all');
renderTasks();
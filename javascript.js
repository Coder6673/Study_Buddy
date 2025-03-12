// Toggle expandable card
document.querySelector(".expandable-card")?.addEventListener("click", function () {
    this.classList.toggle("expanded");
});

// Toggle content insertion
const insertButton = document.getElementById('insertButton');
const contentArea = document.getElementById('contentArea');

insertButton?.addEventListener('click', function () {
    if (contentArea) {
        if (!contentArea.classList.contains('hidden')) {
            contentArea.classList.add('hidden');
            contentArea.innerHTML = '';
        } else {
            contentArea.innerHTML = `
                <h2>Inserted Content</h2>
                <p>This is dynamically inserted content.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            `;
            contentArea.classList.remove('hidden');
        }
    }
});

// Toggle dark mode
const toggleButton = document.getElementById('dark-mode-toggle');
toggleButton?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Task management
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Function to add a task
function addTask(task) {
    if (task) {
        const li = document.createElement('li');
        li.textContent = task;
        li.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });
        taskList.appendChild(li);
        saveTasks();
    }
}
// Function to add a task
function addTask(task) {
    if (task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <button class="complete-btn">Mark as Complete</button>
            <button class="delete-btn">Delete</button>
        `;
        li.querySelector('.complete-btn').addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            saveTasks();
        });
        taskList.appendChild(li);
        saveTasks();
    }
}

// Save tasks to local storage
function saveTasks() {
    const tasks = Array.from(taskList.children).map(li => ({
        text: li.querySelector('span').textContent,
        completed: li.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text);
        if (task.completed) {
            const lastLi = taskList.lastChild;
            lastLi.classList.add('completed');
        }
    });
}


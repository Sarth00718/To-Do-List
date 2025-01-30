const addButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');

loadTasks();

function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        createTaskElement(task);
        saveTasks();
        taskInput.value = '';
    } else {
        alert('Please enter a task');
    }
}

addButton.addEventListener('click', addTask);

function createTaskElement(task) {
    const listitem = document.createElement('li');
    listitem.className = "flex justify-between items-center p-2 border-b border-gray-300 bg-gray-100 hover:bg-gray-200 rounded mb-2";
    listitem.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'text-red-600 hover:text-red-800 font-semibold';

    listitem.appendChild(deleteBtn);
    taskList.append(listitem);

    deleteBtn.addEventListener('click', function () {
        taskList.removeChild(listitem);
        saveTasks();
    });

    listitem.addEventListener('click', function () {
        listitem.classList.toggle('line-through');
        saveTasks();
    });
}

function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll('li').forEach(function (item) {
        tasks.push(item.firstChild.textContent.trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(createTaskElement);
}
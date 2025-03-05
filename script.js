document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        addTaskToList(task);
    });

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToList(taskText);
            taskInput.value = '';
            saveTasksToLocalStorage();
        }
    });

    function addTaskToList(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTasksToLocalStorage();
        });

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasksToLocalStorage();
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    function saveTasksToLocalStorage() {
        const tasks = Array.from(taskList.children).map(li => {
            return {
                text: li.textContent,
                completed: li.classList.contains('completed')
            };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks when page loads
window.onload = function () {
    displayTasks();
};

// Add Task
function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    input.value = "";
    saveTasks();
}

// Display Tasks
function displayTasks(filteredTasks = tasks) {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    filteredTasks.forEach((task, index) => {

        let li = document.createElement("li");
        li.className = task.completed ? "task completed" : "task";

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">

                <button class="doneBtn" onclick="toggleTask(${index})">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="editBtn" onclick="editTask(${index})">
                    Edit
                </button>

                <button class="deleteBtn" onclick="deleteTask(${index})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

// Edit Task
function editTask(index) {

    let updatedTask = prompt("Edit Task", tasks[index].text);

    if (updatedTask !== null && updatedTask.trim() !== "") {
        tasks[index].text = updatedTask.trim();
        saveTasks();
    }
}

// Delete Task
function deleteTask(index) {

    if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        saveTasks();
    }
}

// Mark Complete
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
}

// Search Task
function searchTask() {

    let keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    let filtered = tasks.filter(task =>
        task.text.toLowerCase().includes(keyword)
    );

    displayTasks(filtered);
}

// Filter Tasks
function filterTasks() {

    let value = document.getElementById("filter").value;

    if (value === "completed") {

        displayTasks(tasks.filter(task => task.completed));

    } else if (value === "pending") {

        displayTasks(tasks.filter(task => !task.completed));

    } else {

        displayTasks(tasks);

    }
}

// Update Dashboard Cards
function updateStats() {

    let total = tasks.length;

    let completed = tasks.filter(task => task.completed).length;

    let pending = total - completed;

    document.getElementById("totalTasks").innerText = total;

    document.getElementById("completedTasks").innerText = completed;

    document.getElementById("pendingTasks").innerText = pending;
}

// Save to LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}
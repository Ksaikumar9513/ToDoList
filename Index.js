
const todoForm = document.getElementById("todoForm");
        const taskInput = document.getElementById("taskInput");
        const taskList = document.getElementById("taskList");

        const total = document.getElementById("totalCount");
        const completed = document.getElementById("completedCount");
        const pending = document.getElementById("pendingCount");

        let tasks = JSON.parse(localStorage.getItem("tasks"));

        displayTasks();

        todoForm.addEventListener("submit", function (e) {

            e.preventDefault();

            let task = taskInput.value.trim();

            if (task === "") {
                alert("Please enter a task");
                return;
            }

            tasks.push({
                text: task,
                completed: false
            });

            saveTasks();

            displayTasks();

            taskInput.value = "";

        });

        function displayTasks() {

            taskList.innerHTML = "";

            tasks.forEach((task, index) => {

                let li = document.createElement("li");

                li.className = "list-group-item d-flex justify-content-between align-items-center";

                let span = document.createElement("span");

                span.innerText = task.text;

                if (task.completed) {
                    span.classList.add("completed");
                }

                let btnGroup = document.createElement("div");

                let completeBtn = document.createElement("button");

                completeBtn.className = "btn btn-success btn-sm";

                completeBtn.innerHTML = "✔";

                completeBtn.onclick = function () {

                    tasks[index].completed = !tasks[index].completed;

                    saveTasks();

                    displayTasks();

                };

                let editBtn = document.createElement("button");

                editBtn.className = "btn btn-warning btn-sm";

                editBtn.innerHTML = "✏";

                editBtn.onclick = function () {

                    let updated = prompt("Edit Task", task.text);

                    if (updated !== null && updated.trim() !== "") {
                        tasks[index].text = updated.trim();

                        saveTasks();

                        displayTasks();
                    }

                };

                let deleteBtn = document.createElement("button");

                deleteBtn.className = "btn btn-danger btn-sm";

                deleteBtn.innerHTML = "🗑";

                deleteBtn.onclick = function () {

                    if (confirm("Delete this task?")) {

                        tasks.splice(index, 1);

                        saveTasks();

                        displayTasks();

                    }

                };

                btnGroup.appendChild(completeBtn);
                btnGroup.appendChild(editBtn);
                btnGroup.appendChild(deleteBtn);

                li.appendChild(span);

                li.appendChild(btnGroup);

                taskList.appendChild(li);

            });

            updateCounter();

        }

        function updateCounter() {

            let completedTasks = tasks.filter(task => task.completed).length;

            total.innerText = tasks.length;

            completed.innerText = completedTasks;

            pending.innerText = tasks.length - completedTasks;

        }

        function saveTasks() {

            localStorage.setItem("tasks", JSON.stringify(tasks));

        }

        const themeBtn = document.getElementById("themeBtn");

        // Check saved theme
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            themeBtn.innerHTML = "☀️ Light Mode";
        }

        themeBtn.addEventListener("click", function () {

            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {

                localStorage.setItem("theme", "dark");
                themeBtn.innerHTML = "☀️ Light Mode";

            } else {

                localStorage.setItem("theme", "light");
                themeBtn.innerHTML = "🌙 Dark Mode";

            }

        });

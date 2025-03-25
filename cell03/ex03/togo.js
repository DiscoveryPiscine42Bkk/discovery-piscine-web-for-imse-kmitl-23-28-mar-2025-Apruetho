document.addEventListener("DOMContentLoaded", loadTasks);
function addTask()
{
    let taskText = prompt("Enter a new task:");
    if (taskText) createTask(taskText);
}

function createTask(text)
{
    let li = document.createElement("li");
    li.className = "task";
    li.innerHTML = `<div class='checkbox' onclick='toggleCheckbox(this)'></div> <span class='task-text' onclick='confirmDelete(this.parentElement)'>${text}</span>`;
    document.getElementById("ft_list").prepend(li);
    saveTasks();
}
        
function toggleCheckbox(box)
{
    box.classList.toggle("green");
    let taskItem = box.parentElement;
    taskItem.classList.toggle("checked-task", box.classList.contains("green"));
    saveTasks();
}

function confirmDelete(task)
{
    if (confirm("Delete: yes/no"))
    {
        task.remove();
        saveTasks();
    }
}

function saveTasks()
{
    let tasks = [];
    document.querySelectorAll(".task").forEach(task => 
    {
        let isChecked = task.querySelector(".checkbox").classList.contains("green");
        tasks.push({ text: task.querySelector(".task-text").textContent.trim(), checked: isChecked });
    });
    localStorage.setItem("ft_list", JSON.stringify(tasks));
}

function loadTasks()
{
    let savedTasks = JSON.parse(localStorage.getItem("ft_list")) || [];
    savedTasks.forEach(task => 
    {
        let li = document.createElement("li");
        li.className = "task" + (task.checked ? " checked-task" : "");
        li.innerHTML = `<div class='checkbox ${task.checked ? 'green' : ''}' onclick='toggleCheckbox(this)'></div> <span class='task-text' onclick='confirmDelete(this.parentElement)'>${task.text}</span>`;
        document.getElementById("ft_list").prepend(li);
    });
}
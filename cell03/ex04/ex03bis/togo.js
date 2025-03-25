$(document).ready(function ()
{
    loadTasks();
    $('#newTaskBtn').click(function ()
    {
        let taskText = prompt("Enter a new task:");
        if (taskText)
        {
            createTask(taskText);
        }
    });

    function createTask(text)
    {
        const taskItem = $('<li>', { class: 'task' });

        const checkbox = $('<div>', { class: 'checkbox' }).click(function ()
        {
            toggleCheckbox($(this));
        });

        const taskText = $('<span>', { class: 'task-text' }).text(text).click(function ()
        {
            confirmDelete(taskItem);
        });

        taskItem.append(checkbox).append(taskText);
        $('#ft_list').prepend(taskItem);
        saveTasks();
    }

    function toggleCheckbox(checkbox)
    {
        checkbox.toggleClass('green');
        const taskItem = checkbox.parent();
        taskItem.toggleClass('checked-task', checkbox.hasClass('green'));
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
        const tasks = [];
        $('.task').each(function () 
        {
            const isChecked = $(this).find('.checkbox').hasClass('green');
            tasks.push
            ({
                text: $(this).find('.task-text').text().trim(),
                checked: isChecked
            });
        });
        localStorage.setItem("ft_list", JSON.stringify(tasks));
    }

    function loadTasks() 
    {
        const savedTasks = JSON.parse(localStorage.getItem("ft_list")) || [];
        savedTasks.forEach(function (task) 
        {
            const taskItem = $('<li>', { class: 'task' }).addClass(task.checked ? 'checked-task' : '');

            const checkbox = $('<div>', { class: 'checkbox' }).click(function ()
            {
                toggleCheckbox($(this));
            });

            if (task.checked) 
            {
                checkbox.addClass('green');
            }

            const taskText = $('<span>', { class: 'task-text' }).text(task.text).click(function ()
            {
                confirmDelete(taskItem);
            });

            taskItem.append(checkbox).append(taskText);
            $('#ft_list').prepend(taskItem);
        });
    }
});